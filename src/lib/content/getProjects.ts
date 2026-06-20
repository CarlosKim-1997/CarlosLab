import fs from "fs";
import path from "path";
import { projectMetaEntries } from "./projectRegistry";
import { parseProjectMeta } from "@/lib/project/schema";
import { sortProjectsByPriority } from "@/lib/project/sort";
import type { Project, ProjectMeta } from "@/lib/project/types";

const CONTENT_DIR = path.join(process.cwd(), "src/content/projects");

function loadProjectContent(slug: string): string {
  const mdxPath = path.join(CONTENT_DIR, slug, "index.mdx");
  return fs.readFileSync(mdxPath, "utf-8");
}

function isVisibleInProduction(meta: ProjectMeta): boolean {
  if (process.env.NODE_ENV === "production") {
    return meta.visibility !== "draft";
  }
  return true;
}

function isListed(meta: ProjectMeta): boolean {
  return meta.visibility === "public";
}

function loadAllMetas(): ProjectMeta[] {
  const metas = projectMetaEntries.map((entry) => parseProjectMeta(entry));
  return sortProjectsByPriority(metas);
}

export function getAllProjects(): Project[] {
  return loadAllMetas()
    .filter(isVisibleInProduction)
    .map((meta) => ({
      ...meta,
      content: loadProjectContent(meta.slug),
    }));
}

export function getListedProjects(): ProjectMeta[] {
  return loadAllMetas().filter(isListed);
}

export function getProjectSlugsForStaticParams(): string[] {
  return getAllProjects().map((p) => p.slug);
}
