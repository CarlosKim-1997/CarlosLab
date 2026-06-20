export type DeployCacheStatus =
  | "ready"
  | "stale"
  | "missing"
  | "building"
  | "failed"
  | "skipped"
  | "unknown";

export type ProjectDeployConfig = {
  /** Pre-warm 대상 여부. 기본 true (iframe + github 있을 때) */
  enabled?: boolean;
  /** 감시할 branch. 기본 main */
  branch?: string;
  /**
   * Vercel/Netlify deploy hook URL.
   * 보안상 meta 대신 env 변수 사용을 권장 — hookEnvKey 사용.
   */
  hookUrl?: string;
  /** process.env[hookEnvKey] 에서 hook URL 로드 */
  hookEnvKey?: string;
};

export type ProjectDeployState = {
  slug: string;
  title: string;
  status: DeployCacheStatus;
  githubRepo: string | null;
  branch: string;
  latestGithubCommit: string | null;
  latestGithubCommitAt: string | null;
  lastDeployedCommit: string | null;
  demoUrl: string | null;
  demoReachable: boolean;
  deployHookConfigured: boolean;
  deployTriggered: boolean;
  message: string;
  lastCheckedAt: string;
};

export type DeployStatusStore = {
  updatedAt: string;
  projects: Record<
    string,
    {
      lastCheckedAt: string;
      lastGithubCommit: string | null;
      lastDeployedCommit: string | null;
      demoReachable: boolean;
      status: DeployCacheStatus;
      lastDeployTriggeredAt: string | null;
      message: string;
    }
  >;
};

export type DeploySyncSummary = {
  checkedAt: string;
  triggerDeploy: boolean;
  results: ProjectDeployState[];
  summary: {
    total: number;
    ready: number;
    stale: number;
    missing: number;
    building: number;
    skipped: number;
    failed: number;
    unknown: number;
    deploysTriggered: number;
  };
  persistenceNote: string | null;
};
