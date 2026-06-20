import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { projectMetaSchema } from "../src/lib/project/schema";
import type { ProjectMeta } from "../src/lib/project/types";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src/content/projects");
const PUBLIC_DIR = path.join(ROOT, "public");

type ValidationIssue = {
  level: "error" | "warn";
  message: string;
};

const issues: ValidationIssue[] = [];

function addIssue(level: ValidationIssue["level"], message: string) {
  issues.push({ level, message });
}

function resolvePublicPath(assetPath: string): string {
  return path.join(PUBLIC_DIR, assetPath.replace(/^\//, ""));
}

function expectedMediaPrefix(slug: string): string {
  return `/media/projects/${slug}/`;
}

async function loadProjectMeta(slug: string): Promise<ProjectMeta> {
  const metaPath = path.join(CONTENT_DIR, slug, "meta.ts");
  const mod = await import(pathToFileURL(metaPath).href);
  return projectMetaSchema.parse(mod.default ?? mod);
}

function validateDemoFields(meta: ProjectMeta) {
  switch (meta.demo.mode) {
    case "iframe":
      if (!meta.demo.url) {
        addIssue("error", `[${meta.slug}] iframe demo requires url`);
      }
      break;
    case "video":
      if (!meta.demo.videoUrl) {
        addIssue("error", `[${meta.slug}] video demo requires videoUrl`);
      }
      break;
    case "local-component":
      if (!meta.demo.componentKey) {
        addIssue("error", `[${meta.slug}] local-component demo requires componentKey`);
      }
      break;
    default:
      break;
  }
}

function validateMediaPaths(meta: ProjectMeta) {
  const prefix = expectedMediaPrefix(meta.slug);

  if (!meta.media.cover.startsWith(prefix)) {
    addIssue(
      "error",
      `[${meta.slug}] cover path must start with ${prefix}`,
    );
  }

  const coverPath = resolvePublicPath(meta.media.cover);
  if (!fs.existsSync(coverPath)) {
    addIssue(
      "warn",
      `[${meta.slug}] cover file missing on disk: ${meta.media.cover}`,
    );
  }

  if (meta.media.og && !meta.media.og.startsWith(prefix)) {
    addIssue("error", `[${meta.slug}] og path must start with ${prefix}`);
  }

  for (const screenshot of meta.media.screenshots ?? []) {
    if (!screenshot.startsWith(prefix)) {
      addIssue(
        "error",
        `[${meta.slug}] screenshot path must start with ${prefix}: ${screenshot}`,
      );
    }
  }
}

async function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    addIssue("error", "Content directory not found: src/content/projects");
    report();
    process.exit(1);
  }

  const directories = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const slugs = new Set<string>();

  for (const dirName of directories) {
    const metaPath = path.join(CONTENT_DIR, dirName, "meta.ts");
    const mdxPath = path.join(CONTENT_DIR, dirName, "index.mdx");

    if (!fs.existsSync(metaPath)) {
      addIssue("error", `[${dirName}] missing meta.ts`);
      continue;
    }

    if (!fs.existsSync(mdxPath)) {
      addIssue("error", `[${dirName}] missing index.mdx`);
      continue;
    }

    try {
      const meta = await loadProjectMeta(dirName);

      if (meta.slug !== dirName) {
        addIssue(
          "error",
          `[${dirName}] slug "${meta.slug}" does not match directory name`,
        );
      }

      if (slugs.has(meta.slug)) {
        addIssue("error", `Duplicate slug detected: ${meta.slug}`);
      }
      slugs.add(meta.slug);

      validateDemoFields(meta);
      validateMediaPaths(meta);

      if (meta.visibility === "public") {
        if (!meta.title || !meta.summary) {
          addIssue("error", `[${meta.slug}] public project missing required copy`);
        }
      }
    } catch (error) {
      addIssue("error", `[${dirName}] meta validation failed: ${String(error)}`);
    }
  }

  report();
  const hasErrors = issues.some((issue) => issue.level === "error");
  process.exit(hasErrors ? 1 : 0);
}

function report() {
  if (issues.length === 0) {
    console.log("✓ All project content passed validation.");
    return;
  }

  for (const issue of issues) {
    const prefix = issue.level === "error" ? "✗" : "!";
    console.log(`${prefix} ${issue.message}`);
  }

  const errors = issues.filter((i) => i.level === "error").length;
  const warnings = issues.filter((i) => i.level === "warn").length;
  console.log(`\nValidation complete: ${errors} error(s), ${warnings} warning(s).`);
}

main();
