import { domainColor } from "./visualPalette";

type ThinkingLandscapeProps = {
  domainCounts: Record<string, number>;
  total: number;
};

export function ThinkingLandscape({
  domainCounts,
  total,
}: ThinkingLandscapeProps) {
  const domains = Object.entries(domainCounts).sort((a, b) => b[1] - a[1]);
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  let consumed = 0;

  return (
    <div className="grid gap-8 rounded-3xl border border-white/10 bg-zinc-900/25 p-6 lg:grid-cols-[320px_1fr] lg:p-8">
      <div className="flex items-center justify-center">
        <div className="relative h-[280px] w-[280px]">
          <svg
            viewBox="0 0 220 220"
            role="img"
            aria-label={total + "개의 공개 사고 단위가 9개 도메인에 분포한 도넛 차트"}
            className="h-full w-full -rotate-90"
          >
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="28"
            />
            {domains.map(([domain, count]) => {
              const length = (count / total) * circumference;
              const dashOffset = -consumed;
              consumed += length;

              return (
                <circle
                  key={domain}
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="none"
                  stroke={domainColor(domain)}
                  strokeWidth="28"
                  strokeDasharray={length + " " + (circumference - length)}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="butt"
                >
                  <title>
                    {domain}: {count}개 ({Math.round((count / total) * 100)}%)
                  </title>
                </circle>
              );
            })}
          </svg>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-4xl font-semibold tracking-tight text-zinc-50">
              {total}
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
              public units
            </p>
          </div>
        </div>
      </div>

      <div className="grid content-center gap-2 sm:grid-cols-2">
        {domains.map(([domain, count], index) => {
          const share = Math.round((count / total) * 100);

          return (
            <div
              key={domain}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/10 px-3 py-3"
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: domainColor(domain) }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-zinc-300">
                  {index + 1}. {domain}
                </p>
                <p className="mt-0.5 font-mono text-xs text-zinc-600">
                  {count} entries · {share}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
