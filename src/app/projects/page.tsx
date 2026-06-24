import { Container } from "@/components/layout/Container";
import { ProjectsFilter } from "@/components/project/ProjectsFilter";
import { getFeaturedProjects } from "@/lib/content/getFeaturedProjects";
import { getListedProjects } from "@/lib/content/getProjects";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(
  "프로젝트",
  "Carlos Lab 프로젝트 목록.",
);

export default function ProjectsPage() {
  const projects = getListedProjects();
  const featured = getFeaturedProjects();

  return (
    <Container className="py-12 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 font-mono text-sm uppercase tracking-widest text-cyan-400">
          프로젝트
        </p>
        <h1 className="mb-4 text-3xl font-bold text-zinc-50 sm:text-4xl">전체 목록</h1>
        <p className="text-zinc-400">
          상태·종류로 걸러 보고, 데모가 있으면 바로 실행할 수 있습니다.
        </p>
      </header>
      <ProjectsFilter projects={projects} featuredProjects={featured} />
    </Container>
  );
}
