import type { ThinkingEntry } from "@/lib/thinking/types";
import { domainColor } from "./visualPalette";

function monthKey(date: string) {
  return date.slice(0, 7);
}

function nextMonth(month: string) {
  const [year, value] = month.split("-").map(Number);
  const next = new Date(Date.UTC(year, value, 1));
  return (
    next.getUTCFullYear() +
    "-" +
    String(next.getUTCMonth() + 1).padStart(2, "0")
  );
}

function monthRange(start: string, end: string) {
  const months: string[] = [];
  let current = start;

  while (current <= end) {
    months.push(current);
    current = nextMonth(current);
  }

  return months;
}

export function ThinkingTimeline({ entries }: { entries: ThinkingEntry[] }) {
  const sortedDates = entries.map((entry) => entry.firstSeen).sort();
  const start = monthKey(sortedDates[0]);
  const end = monthKey(sortedDates.at(-1)!);
  const months = monthRange(start, end);

  const counts = new Map<string, number>();
  const domainCounts = new Map<string, Map<string, number>>();

  for (const entry of entries) {
    const month = monthKey(entry.firstSeen);
    counts.set(month, (counts.get(month) ?? 0) + 1);

    const perDomain = domainCounts.get(month) ?? new Map<string, number>();
    perDomain.set(entry.domain, (perDomain.get(entry.domain) ?? 0) + 1);
    domainCounts.set(month, perDomain);
  }

  const max = Math.max(...months.map((month) => counts.get(month) ?? 0), 1);
  const activeMonths = months.filter((month) => (counts.get(month) ?? 0) > 0);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/10 p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300">
            {start} → {end}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            막대 높이는 그 달에 처음 등장한 공개 사고 단위 수입니다. 색은 그 달에
            가장 많이 등장한 도메인을 표시합니다.
          </p>
        </div>
        <p className="font-mono text-xs text-zinc-600">
          {activeMonths.length} active months · peak {max}
        </p>
      </div>

      <div className="overflow-x-auto pb-2">
        <div
          className="grid h-64 min-w-[820px] items-end gap-1.5"
          style={{
            gridTemplateColumns:
              "repeat(" + months.length + ", minmax(20px, 1fr))",
          }}
        >
          {months.map((month) => {
            const count = counts.get(month) ?? 0;
            const perDomain = domainCounts.get(month);
            const dominant = perDomain
              ? [...perDomain.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]
              : undefined;
            const height = count === 0 ? 2 : Math.max(8, (count / max) * 100);
            const showLabel =
              month.endsWith("-01") || month === start || month === end;

            return (
              <div key={month} className="flex h-full flex-col justify-end">
                <div className="relative flex flex-1 items-end">
                  <div
                    className="w-full rounded-t-md opacity-80 transition hover:opacity-100"
                    style={{
                      height: height + "%",
                      backgroundColor: count
                        ? domainColor(dominant ?? "")
                        : "rgba(255,255,255,0.05)",
                    }}
                    title={
                      count
                        ? month +
                          ": " +
                          count +
                          "개 · " +
                          (dominant ?? "도메인 없음")
                        : month + ": 새 항목 없음"
                    }
                  />
                </div>
                <div className="mt-2 h-7 text-center font-mono text-[10px] text-zinc-700">
                  {showLabel ? month.replace("-", ".") : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
