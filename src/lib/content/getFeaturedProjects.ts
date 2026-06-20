import { getListedProjects } from "./getProjects";
import { sortProjectsByPriority } from "@/lib/project/sort";
import type { ProjectMeta } from "@/lib/project/types";

export function getFeaturedProjects(limit = 3): ProjectMeta[] {
  const featured = getListedProjects().filter((p) => p.featured);
  return sortProjectsByPriority(featured).slice(0, limit);
}

export function getPlayableProjects(): ProjectMeta[] {
  return getListedProjects().filter((p) => {
    const mode = p.demo.mode;
    return (
      mode === "iframe" || mode === "local-component" || mode === "video"
    );
  });
}

export function getRecentProjects(limit = 6): ProjectMeta[] {
  return getListedProjects().slice(0, limit);
}
