"use client";

import { useCallback, useMemo, useState } from "react";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Badge } from "@/components/ui/Badge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  projectKindLabels,
  projectStatusLabels,
} from "@/lib/i18n/labels";
import type { ProjectKind, ProjectMeta, ProjectStatus } from "@/lib/project/types";

type ProjectsFilterProps = {
  projects: ProjectMeta[];
  featuredProjects: ProjectMeta[];
};

const ALL = "all";

export function ProjectsFilter({ projects, featuredProjects }: ProjectsFilterProps) {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | typeof ALL>(ALL);
  const [kindFilter, setKindFilter] = useState<ProjectKind | typeof ALL>(ALL);

  const statuses = useMemo(
    () => [...new Set(projects.map((p) => p.status))],
    [projects],
  );
  const kinds = useMemo(() => [...new Set(projects.map((p) => p.kind))], [projects]);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      if (statusFilter !== ALL && project.status !== statusFilter) return false;
      if (kindFilter !== ALL && project.kind !== kindFilter) return false;
      return true;
    });
  }, [projects, statusFilter, kindFilter]);

  const clearFilters = useCallback(() => {
    setStatusFilter(ALL);
    setKindFilter(ALL);
  }, []);

  const featuredSlugs = new Set(featuredProjects.map((p) => p.slug));
  const nonFeatured = filtered.filter((p) => !featuredSlugs.has(p.slug));

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-stone-500">필터</span>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as ProjectStatus | typeof ALL)
          }
          className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300"
        >
          <option value={ALL}>모든 상태</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {projectStatusLabels[status]}
            </option>
          ))}
        </select>
        <select
          value={kindFilter}
          onChange={(e) =>
            setKindFilter(e.target.value as ProjectKind | typeof ALL)
          }
          className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300"
        >
          <option value={ALL}>모든 종류</option>
          {kinds.map((kind) => (
            <option key={kind} value={kind}>
              {projectKindLabels[kind]}
            </option>
          ))}
        </select>
        {(statusFilter !== ALL || kindFilter !== ALL) && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-lab-accent hover:text-lab-accent-hover"
          >
            초기화
          </button>
        )}
        <Badge>{filtered.length}개</Badge>
      </div>

      {featuredProjects.length > 0 && statusFilter === ALL && kindFilter === ALL && (
        <section className="space-y-4">
          <SectionLabel>먼저 볼 만한 것</SectionLabel>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} featured />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <SectionLabel className="text-stone-400">전체 프로젝트</SectionLabel>
        {filtered.length === 0 ? (
          <p className="text-zinc-500">현재 필터에 맞는 프로젝트가 없습니다.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(statusFilter === ALL && kindFilter === ALL ? nonFeatured : filtered).map(
              (project) => (
                <ProjectCard key={project.slug} project={project} />
              ),
            )}
          </div>
        )}
      </section>
    </div>
  );
}
