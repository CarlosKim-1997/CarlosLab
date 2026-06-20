"use client";

import { useState, useTransition } from "react";
import { checkDeployStatusOnly, runDeploySync } from "@/app/lab/actions";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { DeployCacheStatus, DeploySyncSummary } from "@/lib/deploy/types";

const statusLabels: Record<DeployCacheStatus, string> = {
  ready: "준비됨",
  stale: "업데이트 필요",
  missing: "배포 없음",
  building: "배포 중",
  failed: "실패",
  skipped: "대상 아님",
  unknown: "확인 불가",
};

const statusVariant: Record<
  DeployCacheStatus,
  "default" | "status" | "kind" | "accent"
> = {
  ready: "accent",
  stale: "status",
  missing: "status",
  building: "kind",
  failed: "status",
  skipped: "default",
  unknown: "default",
};

function shortSha(sha: string | null): string {
  if (!sha) return "—";
  return sha.slice(0, 7);
}

export function DeploySyncPanel() {
  const [summary, setSummary] = useState<DeploySyncSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function runCheck(triggerDeploy: boolean) {
    setError(null);
    startTransition(async () => {
      try {
        const result = triggerDeploy
          ? await runDeploySync()
          : await checkDeployStatusOnly();
        setSummary(result);
      } catch (err) {
        setError(String(err));
      }
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-2 text-lg font-semibold text-zinc-100">데모 pre-warm</h2>
        <p className="mb-5 text-sm leading-relaxed text-zinc-400">
          GitHub repo와 iframe 데모 URL을 검사합니다. 캐시가 없거나 repo가
          업데이트된 프로젝트는 deploy hook으로 백그라운드 배포를 트리거할 수
          있습니다. 프로젝트를 사이트에 추가한 뒤 여기서 한 번 눌러 주세요.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="secondary"
            disabled={isPending}
            onClick={() => runCheck(false)}
          >
            {isPending ? "검사 중…" : "상태 검사"}
          </Button>
          <Button
            type="button"
            disabled={isPending}
            onClick={() => runCheck(true)}
          >
            {isPending ? "처리 중…" : "검사 + 배포 트리거"}
          </Button>
        </div>
        <p className="mt-4 text-xs text-zinc-600">
          deploy hook은 meta.ts의 <code className="text-zinc-400">deploy.hookEnvKey</code>
          또는 .env.local에 설정하세요.
        </p>
      </Card>

      {error && (
        <Card className="border-red-500/30 bg-red-950/20">
          <p className="text-sm text-red-300">{error}</p>
        </Card>
      )}

      {summary && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="accent">준비 {summary.summary.ready}</Badge>
            <Badge variant="status">업데이트 필요 {summary.summary.stale}</Badge>
            <Badge variant="status">없음 {summary.summary.missing}</Badge>
            <Badge variant="kind">배포중 {summary.summary.building}</Badge>
            <Badge>제외 {summary.summary.skipped}</Badge>
            {summary.triggerDeploy && (
              <Badge variant="kind">트리거 {summary.summary.deploysTriggered}</Badge>
            )}
          </div>

          {summary.persistenceNote && (
            <p className="text-sm text-amber-400/90">{summary.persistenceNote}</p>
          )}

          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-zinc-900/80 text-xs uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="px-4 py-3">프로젝트</th>
                  <th className="px-4 py-3">상태</th>
                  <th className="px-4 py-3">GitHub</th>
                  <th className="px-4 py-3">데모</th>
                  <th className="px-4 py-3">메시지</th>
                </tr>
              </thead>
              <tbody>
                {summary.results.map((row) => (
                  <tr key={row.slug} className="border-b border-white/5">
                    <td className="px-4 py-3">
                      <p className="font-medium text-zinc-200">{row.title}</p>
                      <p className="text-xs text-zinc-600">{row.slug}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[row.status]}>
                        {statusLabels[row.status]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                      <p>{shortSha(row.latestGithubCommit)}</p>
                      <p className="text-zinc-600">
                        캐시 {shortSha(row.lastDeployedCommit)}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-400">
                      {row.demoReachable ? "응답함" : "미응답"}
                      {row.deployHookConfigured ? " · hook 설정됨" : " · hook 없음"}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-xs text-zinc-500">
                      {row.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-zinc-600">
            마지막 검사: {new Date(summary.checkedAt).toLocaleString("ko-KR")}
          </p>
        </div>
      )}
    </div>
  );
}
