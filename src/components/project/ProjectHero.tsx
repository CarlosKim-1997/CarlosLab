import { Badge } from "@/components/ui/Badge";
import { ProjectCoverImage } from "@/components/project/ProjectCoverImage";
import { projectKindLabels, projectStatusLabels } from "@/lib/i18n/labels";
import type { ProjectMeta } from "@/lib/project/types";

type ProjectHeroProps = {
  project: ProjectMeta;
};

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <header className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="status">{projectStatusLabels[project.status]}</Badge>
          <Badge variant="kind">{projectKindLabels[project.kind]}</Badge>
          <Badge variant="accent">{project.year}</Badge>
          {project.featured && <Badge variant="accent">추천</Badge>}
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          {project.title}
        </h1>
        <p className="text-lg text-zinc-400">{project.subtitle}</p>
      </div>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 lg:aspect-[16/10]">
        <ProjectCoverImage
          src={project.media.cover}
          alt={`${project.title} 썸네일`}
          priority
        />
      </div>
    </header>
  );
}
