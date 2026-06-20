import fs from "fs";
import path from "path";
import { getAllProjects } from "./getProjects";
import type { Project } from "@/lib/project/types";

const CONTENT_DIR = path.join(process.cwd(), "src/content/projects");

export function getProjectBySlug(slug: string): Project | null {
  const project = getAllProjects().find((p) => p.slug === slug);
  if (project) {
    return project;
  }

  const projectDir = path.join(CONTENT_DIR, slug);
  if (!fs.existsSync(projectDir)) {
    return null;
  }

  return null;
}
