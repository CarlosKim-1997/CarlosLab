import { getAllProjects } from "@/lib/content/getProjects";
import type { ProjectMeta } from "@/lib/project/types";
import { checkDemoUrlReachable, triggerDeployHook } from "./demoHealth";
import { loadDeployStatusStore, saveDeployStatusStore } from "./deployStatus";
import { fetchLatestCommit, parseGithubRepoUrl } from "./github";
import type {
  DeployCacheStatus,
  DeploySyncSummary,
  ProjectDeployState,
} from "./types";

type SyncOptions = {
  triggerDeploy: boolean;
};

function resolveDemoUrl(project: ProjectMeta): string | null {
  if (project.demo.mode === "iframe") {
    return project.demo.url;
  }
  return project.links.demo ?? null;
}

function resolveDeployHook(project: ProjectMeta): string | null {
  const deploy = project.deploy;
  if (!deploy) return null;

  if (deploy.hookEnvKey) {
    const fromEnv = process.env[deploy.hookEnvKey];
    if (fromEnv) return fromEnv;
  }

  return deploy.hookUrl ?? null;
}

function shouldSyncProject(project: ProjectMeta): boolean {
  if (project.deploy?.enabled === false) return false;
  if (!project.links.github) return false;

  const demoUrl = resolveDemoUrl(project);
  if (!demoUrl) return false;

  return project.demo.mode === "iframe" || project.deploy?.enabled === true;
}

function resolveBranch(project: ProjectMeta): string {
  return project.deploy?.branch ?? "main";
}

export async function syncAllProjects(
  options: SyncOptions,
): Promise<DeploySyncSummary> {
  const checkedAt = new Date().toISOString();
  const store = loadDeployStatusStore();
  const results: ProjectDeployState[] = [];
  let deploysTriggered = 0;
  let persistenceNote: string | null = null;

  for (const project of getAllProjects()) {
    if (!shouldSyncProject(project)) {
      results.push({
        slug: project.slug,
        title: project.title,
        status: "skipped",
        githubRepo: project.links.github ?? null,
        branch: resolveBranch(project),
        latestGithubCommit: null,
        latestGithubCommitAt: null,
        lastDeployedCommit: null,
        demoUrl: resolveDemoUrl(project),
        demoReachable: false,
        deployHookConfigured: Boolean(resolveDeployHook(project)),
        deployTriggered: false,
        message: "iframe + GitHub 데모가 아니면 pre-warm 대상에서 제외됩니다.",
        lastCheckedAt: checkedAt,
      });
      continue;
    }

    const githubRepo = parseGithubRepoUrl(project.links.github!);
    const branch = resolveBranch(project);
    const demoUrl = resolveDemoUrl(project)!;
    const hookUrl = resolveDeployHook(project);
    const previous = store.projects[project.slug];

    const latestCommit = githubRepo
      ? await fetchLatestCommit(githubRepo, branch)
      : null;
    const demoReachable = await checkDemoUrlReachable(demoUrl);

    let status: DeployCacheStatus = "unknown";
    let message = "";
    let deployTriggered = false;
    let lastDeployedCommit = previous?.lastDeployedCommit ?? null;

    if (!githubRepo) {
      status = "unknown";
      message = "GitHub URL 형식을 파싱할 수 없습니다.";
    } else if (!latestCommit) {
      status = "unknown";
      message =
        "GitHub 최신 커밋을 가져오지 못했습니다. repo 접근 권한 또는 GITHUB_TOKEN을 확인하세요.";
    } else if (!demoReachable && !lastDeployedCommit) {
      status = "missing";
      message = "데모 URL에 연결되지 않습니다. 배포가 필요합니다.";
    } else if (!demoReachable && lastDeployedCommit) {
      status = "building";
      message = "데모 URL이 아직 응답하지 않습니다. 배포 진행 중일 수 있습니다.";
    } else if (demoReachable && latestCommit.sha === lastDeployedCommit) {
      status = "ready";
      message = "캐시된 빌드가 최신 커밋과 일치합니다.";
    } else if (demoReachable && lastDeployedCommit && latestCommit.sha !== lastDeployedCommit) {
      status = "stale";
      message = "GitHub에 새 커밋이 있습니다. 데모를 다시 배포해야 합니다.";
    } else if (demoReachable && !lastDeployedCommit) {
      status = "ready";
      lastDeployedCommit = latestCommit.sha;
      message = "데모가 응답합니다. 최신 커밋으로 상태를 기록했습니다.";
    } else {
      status = "stale";
      message = "저장된 배포 커밋보다 GitHub가 앞서 있습니다.";
    }

    const needsDeploy =
      options.triggerDeploy && (status === "missing" || status === "stale");

    if (needsDeploy) {
      if (!hookUrl) {
        status = status === "missing" ? "missing" : "stale";
        message += " deploy hook이 설정되지 않아 자동 배포를 건너뜁니다.";
      } else {
        const trigger = await triggerDeployHook(hookUrl);
        deployTriggered = trigger.ok;
        if (trigger.ok) {
          deploysTriggered += 1;
          status = "building";
          message = `${trigger.message} 보통 1~2분 후 다시 검사하세요.`;
          store.projects[project.slug] = {
            lastCheckedAt: checkedAt,
            lastGithubCommit: latestCommit?.sha ?? null,
            lastDeployedCommit,
            demoReachable,
            status: "building",
            lastDeployTriggeredAt: checkedAt,
            message,
          };
        } else {
          status = "failed";
          message = trigger.message;
        }
      }
    }

    if (!deployTriggered) {
      if (status === "ready" && latestCommit) {
        lastDeployedCommit = latestCommit.sha;
      }

      store.projects[project.slug] = {
        lastCheckedAt: checkedAt,
        lastGithubCommit: latestCommit?.sha ?? null,
        lastDeployedCommit,
        demoReachable,
        status,
        lastDeployTriggeredAt: previous?.lastDeployTriggeredAt ?? null,
        message,
      };
    }

    results.push({
      slug: project.slug,
      title: project.title,
      status,
      githubRepo: githubRepo?.url ?? project.links.github ?? null,
      branch,
      latestGithubCommit: latestCommit?.sha ?? null,
      latestGithubCommitAt: latestCommit?.date ?? null,
      lastDeployedCommit,
      demoUrl,
      demoReachable,
      deployHookConfigured: Boolean(hookUrl),
      deployTriggered,
      message,
      lastCheckedAt: checkedAt,
    });
  }

  const saveResult = saveDeployStatusStore(store);
  if (saveResult.note) {
    persistenceNote = saveResult.note;
  }

  const summary = {
    total: results.length,
    ready: results.filter((r) => r.status === "ready").length,
    stale: results.filter((r) => r.status === "stale").length,
    missing: results.filter((r) => r.status === "missing").length,
    building: results.filter((r) => r.status === "building").length,
    skipped: results.filter((r) => r.status === "skipped").length,
    failed: results.filter((r) => r.status === "failed").length,
    unknown: results.filter((r) => r.status === "unknown").length,
    deploysTriggered,
  };

  return {
    checkedAt,
    triggerDeploy: options.triggerDeploy,
    results,
    summary,
    persistenceNote,
  };
}
