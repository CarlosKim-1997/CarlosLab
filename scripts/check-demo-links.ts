import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { projectMetaSchema } from "../src/lib/project/schema";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src/content/projects");

async function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log("No projects directory found.");
    return;
  }

  const directories = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  let checked = 0;

  for (const dirName of directories) {
    const metaPath = path.join(CONTENT_DIR, dirName, "meta.ts");
    if (!fs.existsSync(metaPath)) continue;

    const mod = await import(pathToFileURL(metaPath).href);
    const meta = projectMetaSchema.parse(mod.default ?? mod);

    if (meta.demo.mode === "iframe") {
      console.log(`[${meta.slug}] iframe → ${meta.demo.url}`);
      checked += 1;
    }

    if (meta.links.demo) {
      console.log(`[${meta.slug}] external demo link → ${meta.links.demo}`);
      checked += 1;
    }
  }

  console.log(`\nChecked ${checked} demo link(s). Manual HTTP verification is future work.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
