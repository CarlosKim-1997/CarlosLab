import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PortfolioPdfLink } from "@/components/portfolio/PortfolioPdfLink";
import { PortfolioPreviewSection } from "@/components/portfolio/PortfolioPreviewSection";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  getFeaturedProjects,
  getPlayableProjects,
  getRecentProjects,
} from "@/lib/content/getFeaturedProjects";
import { demoModeLabels } from "@/lib/i18n/labels";

export default function HomePage() {
  const featured = getFeaturedProjects(3);
  const playable = getPlayableProjects().slice(0, 3);
  const recent = getRecentProjects(6);

  return (
    <>
      <section className="border-b border-white/10 py-16 sm:py-24">
        <Container>
          <p className="mb-4 text-sm font-medium text-stone-500">Carlos Lab</p>
          <h1 className="mb-4 max-w-3xl text-4xl font-bold tracking-tight text-stone-50 sm:text-5xl">
            만든 것들을 모아 두고, 브라우저에서 바로 써 볼 수 있게.
          </h1>
          <div className="mb-6">
            <PortfolioPdfLink variant="hero" />
          </div>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-stone-400">
            데스크톱 앱, 웹 실험, 자동화 도구처럼 README만 있는 결과물이 아니라,
            되는 것은 여기서 직접 확인할 수 있습니다.{" "}
            <Link
              href="#portfolio"
              className="text-stone-500 underline decoration-stone-600 underline-offset-2 transition hover:text-stone-300"
            >
              PDF 아래 해설
            </Link>
            에서 판단·케이스 요약도 볼 수 있습니다.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button href="/projects">프로젝트 둘러보기</Button>
            <span className="flex flex-wrap gap-x-4 text-sm text-stone-500">
              <Link href="/ideas" className="hover:text-stone-300">
                사고 지도
              </Link>
              <Link href="/about" className="hover:text-stone-300">
                소개
              </Link>
            </span>
          </div>
        </Container>
      </section>

      <PortfolioPreviewSection />

      <section className="py-14">
        <Container className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <SectionLabel>먼저 볼 만한 것</SectionLabel>
            <Link
              href="/projects"
              className="text-sm text-stone-500 hover:text-stone-300"
            >
              전체 보기 →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} featured />
            ))}
          </div>
        </Container>
      </section>

      {playable.length > 0 && (
        <section className="border-y border-white/5 bg-zinc-900/25 py-14">
          <Container className="space-y-6">
            <SectionLabel>브라우저에서 바로 실행</SectionLabel>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {playable.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="rounded-lg border border-white/10 bg-zinc-900/45 p-5 transition hover:border-stone-500/35"
                >
                  <p className="mb-1 font-medium text-stone-100">
                    {project.title}
                  </p>
                  <p className="text-sm text-stone-500">
                    {demoModeLabels[project.demo.mode] ?? project.demo.mode} 데모
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-14">
        <Container className="space-y-6">
          <SectionLabel className="text-stone-400">최근에 정리한 빌드</SectionLabel>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recent.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-14">
        <Container className="flex flex-wrap gap-6 text-sm">
          <a
            href="https://github.com/CarlosKim-1997"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-stone-300"
          >
            GitHub
          </a>
          <Link href="/about" className="text-stone-500 hover:text-stone-300">
            소개
          </Link>
        </Container>
      </section>
    </>
  );
}
