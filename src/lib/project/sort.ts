import type { ProjectMeta } from "./types";

export function sortProjectsByPriority(projects: ProjectMeta[]): ProjectMeta[] {
  return [...projects].sort((a, b) => {
    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }
    return b.year - a.year;
  });
}

export function sortProjectsByYear(projects: ProjectMeta[]): ProjectMeta[] {
  return [...projects].sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year;
    }
    return b.priority - a.priority;
  });
}
