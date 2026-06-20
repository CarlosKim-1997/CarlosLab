import { Container } from "@/components/layout/Container";
import { ProjectsFilter } from "@/components/project/ProjectsFilter";
import { getFeaturedProjects } from "@/lib/content/getFeaturedProjects";
import { getListedProjects } from "@/lib/content/getProjects";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(
  "프로젝트",
  "인터랙티브 실험, 프로토타입, 아카이브 빌드를 탐색하세요.",
);

export default function ProjectsPage() {
  const projects = getListedProjects();
  const featured = getFeaturedProjects();

  return (
    <Container className="py-12 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 font-mono text-sm uppercase tracking-widest text-cyan-400">
          프로젝트 인덱스
        </p>
        <h1 className="mb-4 text-3xl font-bold text-zinc-50 sm:text-4xl">프로젝트</h1>
        <p className="text-zinc-400">
          정적인 페이지가 아니라 구조화된 객체입니다. 상태·종류로 필터링한 뒤
          데모로 바로 이동하세요.
        </p>
      </header>
      <ProjectsFilter projects={projects} featuredProjects={featured} />
    </Container>
  );
}
