import type {
  ThinkingEntry,
  ThinkingLineage,
} from "@/lib/thinking/types";
import { domainColor } from "./visualPalette";

function dateValue(date: string) {
  return Date.parse(date + "T00:00:00Z");
}

function position(value: number, min: number, max: number) {
  if (max <= min) return 0;
  return ((value - min) / (max - min)) * 100;
}

type LineagePoint = ThinkingEntry;

function LineageRail({
  points,
  min,
  max,
  label,
  compact = false,
}: {
  points: LineagePoint[];
  min: number;
  max: number;
  label: string;
  compact?: boolean;
}) {
  const first = points[0];
  const last = points.at(-1)!;
  const firstPos = position(dateValue(first.firstSeen), min, max);
  const lastPos = position(dateValue(last.firstSeen), min, max);

  return (
    <div
      className={compact ? "relative h-10" : "relative h-12"}
      aria-label={label + "의 시간축"}
    >
      <div className="absolute inset-x-0 top-1/2 h-px bg-white/5" />
      <div
        className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-amber-300/20"
        style={{
          left: firstPos + "%",
          width: Math.max(0.7, lastPos - firstPos) + "%",
        }}
      />

      {points.map((entry) => {
        const left = position(dateValue(entry.firstSeen), min, max);

        return (
          <span
            key={entry.id}
            className={
              "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0b1019] shadow-[0_0_0_1px_rgba(255,255,255,0.12)] " +
              (compact ? "h-2.5 w-2.5" : "h-3 w-3")
            }
            style={{
              left: left + "%",
              backgroundColor: domainColor(entry.domain),
            }}
            title={entry.id + " · " + entry.firstSeen + " · " + entry.title}
          />
        );
      })}
    </div>
  );
}

export function LineageMap({
  entries,
  lineages,
}: {
  entries: ThinkingEntry[];
  lineages: ThinkingLineage[];
}) {
  const entryMap = new Map(entries.map((entry) => [entry.id, entry]));
  const lineageEntries = lineages.flatMap((lineage) =>
    lineage.entryIds
      .map((id) => entryMap.get(id))
      .filter((entry): entry is ThinkingEntry => Boolean(entry)),
  );
  const values = lineageEntries.map((entry) => dateValue(entry.firstSeen));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const minYear = new Date(min).getUTCFullYear();
  const maxYear = new Date(max).getUTCFullYear();

  const ticks = Array.from(
    { length: maxYear - minYear + 1 },
    (_, index) => minYear + index,
  )
    .map((year) => ({
      year,
      value: Date.UTC(year, 0, 1),
    }))
    .filter(({ value }) => value >= min && value <= max);

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/25 p-4 sm:p-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
            first-seen chronology
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            각 줄은 하나의 사고 계보입니다. 점은 그 계보에 속한 사고 단위가 처음
            등장한 시점이며, 색은 해당 항목의 도메인을 나타냅니다.
          </p>
        </div>
        <p className="font-mono text-xs text-zinc-600">
          {lineages.length} lineages · {lineageEntries.length} memberships
        </p>
      </div>

      <div className="md:hidden">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-zinc-700">
          <span>{new Date(min).toISOString().slice(0, 7)}</span>
          <span>{new Date(max).toISOString().slice(0, 7)}</span>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {lineages.map((lineage) => {
            const points = lineage.entryIds
              .map((id) => entryMap.get(id))
              .filter((entry): entry is ThinkingEntry => Boolean(entry))
              .sort((a, b) => a.firstSeen.localeCompare(b.firstSeen));

            return (
              <div key={lineage.id} className="py-4 first:pt-2 last:pb-0">
                <div className="mb-1 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-amber-300">
                        {lineage.id}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-700">
                        {points.length}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-5 text-zinc-300">
                      {lineage.name}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-zinc-700">
                    {points[0]?.firstSeen.slice(0, 7)} →{" "}
                    {points.at(-1)?.firstSeen.slice(0, 7)}
                  </span>
                </div>

                <LineageRail
                  points={points}
                  min={min}
                  max={max}
                  label={lineage.name}
                  compact
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative hidden md:block">
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[980px]">
            <div className="grid grid-cols-[260px_1fr] items-end gap-6 border-b border-white/5 pb-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-700">
                lineage
              </div>
              <div className="relative h-6">
                {ticks.map(({ year, value }) => (
                  <span
                    key={year}
                    className="absolute top-0 -translate-x-1/2 font-mono text-[10px] text-zinc-700"
                    style={{ left: position(value, min, max) + "%" }}
                  >
                    {year}
                  </span>
                ))}
                <span className="absolute left-0 top-0 font-mono text-[10px] text-zinc-700">
                  {new Date(min).toISOString().slice(0, 7)}
                </span>
                <span className="absolute right-0 top-0 font-mono text-[10px] text-zinc-700">
                  {new Date(max).toISOString().slice(0, 7)}
                </span>
              </div>
            </div>

            {lineages.map((lineage) => {
              const points = lineage.entryIds
                .map((id) => entryMap.get(id))
                .filter((entry): entry is ThinkingEntry => Boolean(entry))
                .sort((a, b) => a.firstSeen.localeCompare(b.firstSeen));

              return (
                <div
                  key={lineage.id}
                  className="grid min-h-20 grid-cols-[260px_1fr] items-center gap-6 border-b border-white/[0.04] last:border-b-0"
                >
                  <div className="pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-amber-300">
                        {lineage.id}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-700">
                        {points.length}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-zinc-300">
                      {lineage.name}
                    </p>
                  </div>

                  <LineageRail
                    points={points}
                    min={min}
                    max={max}
                    label={lineage.name}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#111620] to-transparent xl:hidden"
        />
        <p className="mt-2 text-right font-mono text-[10px] text-zinc-700 xl:hidden">
          ← 좌우로 밀어 전체 시간축 보기 →
        </p>
      </div>
    </div>
  );
}
