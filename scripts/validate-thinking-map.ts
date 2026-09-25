import fs from "node:fs";
import path from "node:path";

type UnknownRecord = Record<string, unknown>;

const baseDir = path.join(process.cwd(), "src/content/ideas");
const core = JSON.parse(
  fs.readFileSync(path.join(baseDir, "thinking-map-core.json"), "utf8"),
) as UnknownRecord;
const shardDir = path.join(baseDir, "entries");
const entries = fs
  .readdirSync(shardDir)
  .filter((name) => /^\d{2}\.json$/.test(name))
  .sort()
  .flatMap((name) =>
    JSON.parse(fs.readFileSync(path.join(shardDir, name), "utf8")) as UnknownRecord[],
  );

function fail(message: string): never {
  throw new Error(`[thinking-map] ${message}`);
}

if (core.schemaVersion !== "1.0") fail("schemaVersion must be 1.0");
if (!Array.isArray(core.patterns)) fail("patterns must be an array");
if (!Array.isArray(core.lineages)) fail("lineages must be an array");

const ids = new Set<string>();
for (const entry of entries) {
  const id = entry.id;
  if (typeof id !== "string" || !/^II-\d{3}$/.test(id)) fail(`invalid entry id: ${String(id)}`);
  if (ids.has(id)) fail(`duplicate entry id: ${id}`);
  ids.add(id);
  if (typeof entry.title !== "string" || !entry.title.trim()) fail(`${id}: title required`);
  if (typeof entry.summary !== "string" || !entry.summary.trim()) fail(`${id}: summary required`);
  if ("conversation_id" in entry || "conversationId" in entry) fail(`${id}: private source identifier leaked`);
}

for (const lineage of core.lineages as UnknownRecord[]) {
  if (!Array.isArray(lineage.entryIds)) fail("lineage entryIds must be an array");
  for (const id of lineage.entryIds as unknown[]) {
    if (typeof id !== "string" || !ids.has(id)) fail(`lineage references missing entry: ${String(id)}`);
  }
}

for (const pattern of core.patterns as UnknownRecord[]) {
  if (!Array.isArray(pattern.evidenceEntryIds)) fail("pattern evidenceEntryIds must be an array");
  for (const id of pattern.evidenceEntryIds as unknown[]) {
    if (typeof id !== "string" || !ids.has(id)) fail(`pattern references missing entry: ${String(id)}`);
  }
}

const stats = core.stats as UnknownRecord;
if (stats.entryCount !== entries.length) {
  fail(`stats.entryCount=${String(stats.entryCount)} but entries=${entries.length}`);
}

console.log(
  `[thinking-map] OK — ${entries.length} entries, ${(core.patterns as unknown[]).length} patterns, ${(core.lineages as unknown[]).length} lineages`,
);
