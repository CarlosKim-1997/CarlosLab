import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { isPlayableDemo } from "@/lib/demo/demoModes";
import { projectKindLabels, projectStatusLabels } from "@/lib/i18n/labels";
import type { ProjectMeta } from "@/lib/project/types";

type ProjectCardProps = {
  project: ProjectMeta;
  featured?: boolean;
};

function CoverPlaceholder({ slug, title }: { slug: string; title: string }) {
  const hue = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;

  return (
    <div
      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(${hue}, 40%, 15%), hsl(${(hue + 60) % 360}, 50%, 25%))`,
      }}
      aria-label={`${title} 커버`}
    />
  );
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const playable = isPlayableDemo(project.demo);

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <Card hover className={`flex h-full flex-col ${featured ? "ring-1 ring-cyan-500/30" : ""}`}>
        <div className="relative mb-4 aspect-video overflow-hidden rounded-lg border border-white/5">
          <CoverPlaceholder slug={project.slug} title={project.title} />
          {featured && (
            <span className="absolute left-3 top-3 rounded-full bg-cyan-500/90 px-2 py-0.5 text-xs font-semibold text-zinc-950">
              추천
            </span>
          )}
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          <Badge variant="status">{projectStatusLabels[project.status]}</Badge>
          <Badge variant="kind">{projectKindLabels[project.kind]}</Badge>
          <Badge>{project.year}</Badge>
        </div>

        <h3 className="mb-1 text-lg font-semibold text-zinc-100 group-hover:text-cyan-300">
          {project.title}
        </h3>
        <p className="mb-3 text-sm text-zinc-500">{project.subtitle}</p>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-400">
          {project.summary}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <span className="text-sm font-medium text-cyan-400 group-hover:text-cyan-300">
          {playable ? "체험하기 →" : "자세히 보기 →"}
        </span>
      </Card>
    </Link>
  );
}
