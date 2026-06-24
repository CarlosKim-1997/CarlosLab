import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ProjectDemo } from "@/components/project/ProjectDemo";
import { ProjectDemoNote } from "@/components/project/ProjectDemoNote";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectMetaPanel } from "@/components/project/ProjectMetaPanel";
import { ProjectStack } from "@/components/project/ProjectStack";
import { Button } from "@/components/ui/Button";
import { compileMdxContent } from "@/lib/content/mdx";
import { getProjectBySlug } from "@/lib/content/getProjectBySlug";
import { getProjectSlugsForStaticParams } from "@/lib/content/getProjects";
import { buildProjectMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProjectSlugsForStaticParams().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildProjectMetadata(project);
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const mdxContent = await compileMdxContent(project.content);

  return (
    <Container className="py-10 sm:py-14">
      <div className="mb-10 space-y-10">
        <ProjectHero project={project} />

        {project.demoNote && <ProjectDemoNote note={project.demoNote} />}

        <ProjectDemo demo={project.demo} links={project.links} />

        <ProjectMetaPanel project={project} />

        <div>
          <h2 className="mb-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
            기술 스택
          </h2>
          <ProjectStack stack={project.stack} />
        </div>
      </div>

      <article className="prose-invert max-w-none border-t border-white/10 pt-10">
        {mdxContent}
      </article>

      <div className="mt-12 space-y-10 border-t border-white/10 pt-10">
        <ProjectGallery media={project.media} title={project.slug} />

        <div className="flex flex-wrap gap-3">
          <Button href="/projects" variant="secondary">
            ← 프로젝트 목록
          </Button>
          {project.links.github && (
            <Button href={project.links.github} external variant="ghost">
              소스 코드
            </Button>
          )}
          {project.links.article && (
            <Button href={project.links.article} external variant="ghost">
              관련 글
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}
