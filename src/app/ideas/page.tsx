import { ArchiveExplorer } from "@/components/thinking/ArchiveExplorer";
import { LineageMap } from "@/components/thinking/LineageMap";
import { ThinkingLandscape } from "@/components/thinking/ThinkingLandscape";
import { ThinkingTimeline } from "@/components/thinking/ThinkingTimeline";
import { Container } from "@/components/layout/Container";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getEntryMap, getThinkingMap } from "@/lib/thinking/getThinkingMap";

export const metadata = buildPageMetadata(
  "Thinking Map",
  "아이디어의 목록보다, 반복되는 사고 패턴과 시간이 지나며 연결된 생각의 계보를 보여주는 지도.",
);

function topDomainsForYear(
  entries: ReturnType<typeof getThinkingMap>["entries"],
  year: string,
) {
  const counts = new Map<string, number>();

  for (const entry of entries) {
    if (!entry.firstSeen.startsWith(year)) continue;
    counts.set(entry.domain, (counts.get(entry.domain) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
}

export default function IdeasPage() {
  const thinking = getThinkingMap();
  const entryMap = getEntryMap(thinking.entries);
  const featuredPatterns = thinking.patterns.filter((pattern) => pattern.featured);
  const years = ["2025", "2026"].map((year) => ({
    year,
    count: thinking.entries.filter((entry) => entry.firstSeen.startsWith(year)).length,
    topDomains: topDomainsForYear(thinking.entries, year),
  }));

  return (
    <>
      <section className="border-b border-white/10 py-16 sm:py-24">
        <Container>
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-violet-400">
            Thinking Map · {thinking.snapshot}
          </p>
          <h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
            무엇을 생각했는지보다,
            <br className="hidden sm:block" /> 어떻게 생각이 이어졌는지를 봅니다.
          </h1>
          <p className="mb-8 max-w-3xl text-lg leading-8 text-zinc-400">
            서로 다른 문제에서 반복되는 구조를 찾고, 역할과 환경을 다시 나누고,
            다음 반복을 더 쉽게 만드는 방향으로 생각해 왔습니다. 이 페이지는 그
            흐름을 대화 기록에서 추출한 데이터로 보여주는 공개 지도입니다.
          </p>

          <div className="grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Ideas & Insights", thinking.stats.entryCount],
              ["Domains", Object.keys(thinking.stats.domainCounts).length],
              ["Patterns", thinking.patterns.length],
              ["Lineages", thinking.lineages.length],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="rounded-2xl border border-white/10 bg-zinc-900/35 px-5 py-4"
              >
                <p className="text-2xl font-semibold text-zinc-100">{value}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-zinc-600">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
              Recurring patterns
            </p>
            <h2 className="mb-3 text-3xl font-bold text-zinc-50">
              분야가 달라도 반복되는 사고 습관
            </h2>
            <p className="leading-7 text-zinc-500">
              아래 패턴은 자기소개 문구가 아니라, 서로 다른 대화와 프로젝트에서
              반복해서 나타난 구조를 묶은 것입니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredPatterns.map((pattern) => (
              <article
                key={pattern.id}
                className="rounded-2xl border border-white/10 bg-zinc-900/25 p-6"
              >
                <p className="mb-3 font-mono text-xs text-cyan-400">{pattern.id}</p>
                <h3 className="mb-3 text-lg font-semibold leading-7 text-zinc-100">
                  {pattern.name}
                </h3>
                <p className="text-sm leading-6 text-zinc-400">
                  {pattern.description}
                </p>
                <p className="mt-5 font-mono text-xs text-zinc-600">
                  evidence · {pattern.evidenceEntryIds.join(" · ")}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-white/5 bg-zinc-900/20 py-16">
        <Container>
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
              Thinking landscape
            </p>
            <h2 className="mb-3 text-3xl font-bold text-zinc-50">
              생각이 머문 영역
            </h2>
            <p className="leading-7 text-zinc-500">
              하나의 전문 분야 순위가 아니라, 어떤 영역에서 사고 단위가 많이
              만들어졌는지를 보여줍니다.
            </p>
          </div>

          <ThinkingLandscape
            domainCounts={thinking.stats.domainCounts}
            total={thinking.stats.entryCount}
          />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-amber-400">
              Thought lineages
            </p>
            <h2 className="mb-3 text-3xl font-bold text-zinc-50">
              몇 달 뒤 다른 분야에서 다시 나타난 생각들
            </h2>
            <p className="leading-7 text-zinc-500">
              독립된 아이디어처럼 보였던 항목이 시간이 지나며 하나의 더 큰
              질문으로 합쳐진 계보입니다.
            </p>
          </div>

          <LineageMap entries={thinking.entries} lineages={thinking.lineages} />

          <div className="mt-6 space-y-4">
            {thinking.lineages.slice(0, 3).map((lineage, index) => {
              const examples = lineage.entryIds
                .map((id) => entryMap.get(id))
                .filter((entry) => entry !== undefined)
                .slice(0, 5);

              return (
                <article
                  key={lineage.id}
                  className="grid gap-5 rounded-2xl border border-white/10 bg-zinc-900/25 p-6 lg:grid-cols-[180px_1fr]"
                >
                  <div>
                    <p className="font-mono text-xs text-amber-400">
                      {String(index + 1).padStart(2, "0")} · {lineage.id}
                    </p>
                    <p className="mt-2 text-xs text-zinc-600">
                      {lineage.entryIds.length} connected entries
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-3 text-xl font-semibold text-zinc-100">
                      {lineage.name}
                    </h3>
                    <p className="max-w-4xl text-sm leading-7 text-zinc-400">
                      {lineage.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {examples.map((entry) => (
                        <span
                          key={entry!.id}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-500"
                        >
                          {entry!.id} · {entry!.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}

            <details className="group rounded-2xl border border-white/10 bg-black/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm text-zinc-400 transition hover:text-zinc-200">
                <span>
                  나머지 {Math.max(0, thinking.lineages.length - 3)}개 계보 상세 보기
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-zinc-600 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>

              <div className="space-y-4 border-t border-white/5 p-4 sm:p-5">
                {thinking.lineages.slice(3).map((lineage, offset) => {
                  const index = offset + 3;
                  const examples = lineage.entryIds
                    .map((id) => entryMap.get(id))
                    .filter((entry) => entry !== undefined)
                    .slice(0, 5);

                  return (
                    <article
                      key={lineage.id}
                      className="grid gap-5 rounded-2xl border border-white/10 bg-zinc-900/25 p-5 lg:grid-cols-[180px_1fr] lg:p-6"
                    >
                      <div>
                        <p className="font-mono text-xs text-amber-400">
                          {String(index + 1).padStart(2, "0")} · {lineage.id}
                        </p>
                        <p className="mt-2 text-xs text-zinc-600">
                          {lineage.entryIds.length} connected entries
                        </p>
                      </div>
                      <div>
                        <h3 className="mb-3 text-xl font-semibold text-zinc-100">
                          {lineage.name}
                        </h3>
                        <p className="max-w-4xl text-sm leading-7 text-zinc-400">
                          {lineage.summary}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {examples.map((entry) => (
                            <span
                              key={entry!.id}
                              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-500"
                            >
                              {entry!.id} · {entry!.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </details>
          </div>
        </Container>
      </section>

      <section className="border-y border-white/5 bg-zinc-900/20 py-16">
        <Container>
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-violet-400">
              Change over time
            </p>
            <h2 className="mb-3 text-3xl font-bold text-zinc-50">
              한 번의 성향 진단이 아니라 시간에 따른 기록
            </h2>
            <p className="leading-7 text-zinc-500">
              아직 월간 스냅샷은 하나뿐이므로 추세를 과장하지 않습니다. 우선
              아이디어가 처음 등장한 연도와 주된 영역만 보여주고, 이후 월간
              데이터가 쌓이면 변화량과 계보의 성장으로 확장합니다.
            </p>
          </div>

          <ThinkingTimeline entries={thinking.entries} />

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {years.map(({ year, count, topDomains }) => (
              <article
                key={year}
                className="rounded-2xl border border-white/10 bg-black/10 p-6"
              >
                <div className="mb-5 flex items-end justify-between">
                  <h3 className="text-3xl font-semibold text-zinc-100">{year}</h3>
                  <p className="font-mono text-sm text-zinc-600">
                    {count} first-seen entries
                  </p>
                </div>
                <div className="space-y-3">
                  {topDomains.map(([domain, domainCount]) => (
                    <div
                      key={domain}
                      className="flex items-center justify-between gap-4 border-t border-white/5 pt-3 text-sm"
                    >
                      <span className="text-zinc-400">{domain}</span>
                      <span className="font-mono text-zinc-600">{domainCount}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
              Evidence archive
            </p>
            <h2 className="mb-3 text-3xl font-bold text-zinc-50">
              202개의 실제 사고 단위
            </h2>
            <p className="leading-7 text-zinc-500">
              위의 요약을 믿어달라는 페이지가 되지 않도록, 공개 가능한 형태로
              정리한 전체 항목을 함께 둡니다. 성숙도는 우열 점수가 아니라 현재
              상태입니다.
            </p>
          </div>
          <ArchiveExplorer entries={thinking.entries} />
        </Container>
      </section>

      <section className="border-t border-white/10 py-12">
        <Container>
          <div className="max-w-3xl rounded-2xl border border-white/10 bg-zinc-900/25 p-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-zinc-600">
              Method & privacy
            </p>
            <p className="text-sm leading-6 text-zinc-400">
              {thinking.method.summary} {thinking.method.privacy}{" "}
              {thinking.method.review}
            </p>
            <p className="mt-4 font-mono text-xs text-zinc-600">
              export cutoff · {thinking.exportCutoff}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
