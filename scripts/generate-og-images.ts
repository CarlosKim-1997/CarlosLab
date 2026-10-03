import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const PROJECT_SLUGS = [
  "calmmail",
  "ai-workflow-orchestrator",
  "secure-hybrid-rag-enterprise-assistant",
  "bobkinator",
];

async function rasterizeSvg(svgPath: string, outPath: string, width: number, height: number) {
  const svg = fs.readFileSync(svgPath);
  await sharp(svg).resize(width, height, { fit: "cover" }).png().toFile(outPath);
}

async function main() {
  const siteSvg = path.join(ROOT, "public/og/carlos-lab.svg");
  const sitePng = path.join(ROOT, "public/og/carlos-lab.png");
  fs.mkdirSync(path.dirname(sitePng), { recursive: true });
  await rasterizeSvg(siteSvg, sitePng, 1200, 630);
  console.log("Wrote", path.relative(ROOT, sitePng));

  for (const slug of PROJECT_SLUGS) {
    const coverSvg = path.join(ROOT, "public/media/projects", slug, "cover.svg");
    const ogPng = path.join(ROOT, "public/media/projects", slug, "og.png");
    if (!fs.existsSync(coverSvg)) {
      console.warn("Skip (no cover.svg):", slug);
      continue;
    }
    await rasterizeSvg(coverSvg, ogPng, 1200, 630);
    console.log("Wrote", path.relative(ROOT, ogPng));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
