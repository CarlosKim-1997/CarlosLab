import fs from "fs";
import path from "path";

const slug = process.argv[2];

if (!slug) {
  console.error("Usage: npm run create:project -- <slug>");
  process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Slug must be kebab-case (e.g. my-new-project)");
  process.exit(1);
}

const ROOT = process.cwd();
const projectDir = path.join(ROOT, "src/content/projects", slug);
const mediaDir = path.join(ROOT, "public/media/projects", slug);

if (fs.existsSync(projectDir)) {
  console.error(`Project already exists: ${slug}`);
  process.exit(1);
}

const title = slug
  .split("-")
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join(" ");

const metaTemplate = `import type { ProjectMeta } from "@/lib/project/types";

const meta = {
  slug: "${slug}",
  title: "${title}",
  subtitle: "Short subtitle for ${title}.",
  status: "idea",
  kind: "other",
  year: ${new Date().getFullYear()},
  summary: "One-line summary for ${title}.",
  problem: "Describe the problem this project addresses.",
  solution: "Describe the approach you took.",
  highlights: ["Highlight one", "Highlight two"],
  stack: ["TypeScript"],
  links: {},
  demo: {
    mode: "none",
    warning: "Demo not configured yet.",
  },
  media: {
    cover: "/media/projects/${slug}/cover.webp",
    og: "/media/projects/${slug}/og.webp",
    screenshots: ["/media/projects/${slug}/screenshot-01.webp"],
  },
  visibility: "draft",
  featured: false,
  priority: 50,
  deploy: {
    enabled: true,
    branch: "main",
    hookEnvKey: "VERCEL_HOOK_${slug.toUpperCase().replace(/-/g, "_")}",
  },
} satisfies ProjectMeta;

export default meta;
`;

const mdxTemplate = `## What it does

Describe what visitors can do with ${title}.

## Why I made it

Explain the motivation.

## How it works

High-level mechanics.

## Technical decisions

- Decision one

## Hard parts

What was difficult.

## What I learned

Key takeaway.
`;

const REGISTRY_PATH = path.join(ROOT, "src/lib/content/projectRegistry.ts");

function registerProjectInRegistry(slug: string) {
  const importName = slug.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase()) + "Meta";
  const importLine = `import ${importName} from "@/content/projects/${slug}/meta";`;
  const registry = fs.readFileSync(REGISTRY_PATH, "utf-8");

  if (registry.includes(`/${slug}/meta`)) {
    return;
  }

  const updated = registry
    .replace(
      /(import type { ProjectMeta } from "@\/lib\/project\/types";)/,
      `$1\n${importLine}`,
    )
    .replace(
      /export const projectMetaEntries: ProjectMeta\[] = \[/,
      `export const projectMetaEntries: ProjectMeta[] = [\n  ${importName},`,
    );

  fs.writeFileSync(REGISTRY_PATH, updated, "utf-8");
}

fs.mkdirSync(projectDir, { recursive: true });
fs.mkdirSync(mediaDir, { recursive: true });
registerProjectInRegistry(slug);

fs.writeFileSync(path.join(projectDir, "meta.ts"), metaTemplate, "utf-8");
fs.writeFileSync(path.join(projectDir, "index.mdx"), mdxTemplate, "utf-8");
fs.writeFileSync(
  path.join(mediaDir, ".gitkeep"),
  `# Add cover.webp, og.webp, screenshots here\n`,
  "utf-8",
);

console.log(`Created project scaffold:
- src/content/projects/${slug}/meta.ts
- src/content/projects/${slug}/index.mdx
- public/media/projects/${slug}/

Next steps:
1. Edit meta.ts (set visibility to public when ready)
2. Add media assets under public/media/projects/${slug}/
3. Run npm run validate:content
`);
