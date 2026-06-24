import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Button } from "@/components/ui/Button";
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
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-cyan-400">
            Carlos Lab
          </p>
          <h1 className="mb-6 max-w-3xl text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
            만든 것들을 모아 두고, 브라우저에서 바로 써 볼 수 있게.
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Streamlit PoC, 데스크톱 앱, 모바일 앱, RAG 실험 등. README만
            읽히는 게 아니라, 되는 것은 여기서 직접 돌려 봅니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/projects">프로젝트 둘러보기</Button>
            <Button href="/about" variant="secondary">
              소개
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400">
              추천
            </h2>
            <Link href="/projects" className="text-sm text-zinc-500 hover:text-zinc-300">
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
        <section className="border-y border-white/5 bg-zinc-900/20 py-14">
          <Container className="space-y-6">
            <h2 className="text-sm font-mono uppercase tracking-widest text-emerald-400">
              지금 체험 가능
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {playable.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="rounded-xl border border-white/10 bg-zinc-900/50 p-5 transition hover:border-emerald-500/30"
                >
                  <p className="mb-1 font-medium text-zinc-100">{project.title}</p>
                  <p className="text-sm text-zinc-500">
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
          <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500">
            최근 빌드
          </h2>
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
            className="text-zinc-400 hover:text-cyan-300"
          >
            GitHub
          </a>
          <Link href="/about" className="text-zinc-400 hover:text-cyan-300">
            소개
          </Link>
        </Container>
      </section>
    </>
  );
}
