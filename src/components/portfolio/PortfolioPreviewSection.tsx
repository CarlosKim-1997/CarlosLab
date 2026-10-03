import { Container } from "@/components/layout/Container";
import { PortfolioPdfLink } from "@/components/portfolio/PortfolioPdfLink";
import { PORTFOLIO_CASES, PORTFOLIO_STAGES } from "@/lib/portfolio/constants";

export function PortfolioPreviewSection() {
  return (
    <section
      id="portfolio"
      className="border-b border-white/10 bg-gradient-to-b from-violet-950/20 via-transparent to-transparent py-14 sm:py-16"
      aria-labelledby="portfolio-heading"
    >
      <Container className="space-y-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="max-w-xl space-y-5">
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-violet-300">
              Portfolio · Preview
            </p>
            <div>
              <h2
                id="portfolio-heading"
                className="mb-2 text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl"
              >
                AI Problem Solving Portfolio
              </h2>
              <p className="text-lg text-violet-200/90">AI의 몫, 사람의 몫</p>
            </div>
            <p className="leading-relaxed text-zinc-400">
              Carlos Lab 전체를 하나씩 둘러보기 전에, 문제를 푸는 방식·대표
              케이스·기술 폭을 PDF 한 권으로 정리해 두었습니다. 아래는 그
              내용의 짧은 해설이고, 자세한 서사와 증거는 PDF에서 이어집니다.
            </p>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 pt-1">
              <PortfolioPdfLink />
              <span className="text-sm text-zinc-500">9페이지 · 약 580KB</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5 sm:p-6">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-500">
              7단계 프로세스 (요약)
            </h3>
            <ol className="grid gap-2 sm:grid-cols-2">
              {PORTFOLIO_STAGES.map((stage) => (
                <li
                  key={stage.step}
                  className="flex gap-3 rounded-lg border border-white/5 bg-zinc-950/40 px-3 py-2.5"
                >
                  <span className="font-mono text-xs tabular-nums text-violet-400">
                    {stage.step}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-200">
                      {stage.title}
                    </p>
                    <p className="text-xs text-zinc-500">{stage.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            대표 케이스 (PDF 목차)
          </h3>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PORTFOLIO_CASES.map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-white/10 bg-zinc-900/30 p-4"
              >
                <p className="mb-1 font-mono text-xs text-violet-400/90">
                  CASE {item.id}
                </p>
                <p className="mb-2 font-medium text-zinc-100">{item.title}</p>
                <p className="text-sm leading-snug text-zinc-500">
                  {item.summary}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-zinc-600">
            Lab 아래 프로젝트·데모는 실행 가능한 결과물 위주입니다. 위 케이스의
            배경·판단·검증 과정은 PDF에서 풀어 씁니다.
          </p>
        </div>
      </Container>
    </section>
  );
}
