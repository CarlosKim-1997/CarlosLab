import fs from "node:fs";
import path from "node:path";

type UnknownRecord = Record<string, unknown>;

const baseDir = path.join(process.cwd(), "src/content/ideas");
const corePath = path.join(baseDir, "thinking-map-core.json");
const shardDir = path.join(baseDir, "entries");

const coreRaw = fs.readFileSync(corePath, "utf8");
const shardFiles = fs
  .readdirSync(shardDir)
  .filter((name) => /^\d{2}\.json$/.test(name))
  .sort();
const shardRaws = shardFiles.map((name) => ({
  name,
  raw: fs.readFileSync(path.join(shardDir, name), "utf8"),
}));

const core = JSON.parse(coreRaw) as UnknownRecord;
const entries = shardRaws.flatMap(
  ({ raw }) => JSON.parse(raw) as UnknownRecord[],
);

const allowedDomains = new Set([
  "사고법·문제해결",
  "AI·에이전트·메모리",
  "제품·서비스",
  "게임·인터랙션",
  "Physical AI·로봇",
  "소설·세계관",
  "인간·인지·커뮤니케이션",
  "사회·경제·시스템",
  "기계·발명",
]);
const allowedTypes = new Set([
  "idea",
  "insight",
  "principle",
  "hypothesis",
  "system",
]);
const allowedMaturity = new Set([
  "seed",
  "developing",
  "adopted",
  "validated",
]);

const forbiddenPublicTokens = [
  "conversation_id",
  "conversationId",
  "source_indices",
  "\"source_sessions\":",
  "\"sourceSessions\":",
  "\"sources\":",
];

function fail(message: string): never {
  throw new Error(`[thinking-map] ${message}`);
}

for (const { name, raw } of [
  { name: "thinking-map-core.json", raw: coreRaw },
  ...shardRaws,
]) {
  for (const token of forbiddenPublicTokens) {
    if (raw.includes(token)) {
      fail(`${name}: forbidden private provenance token found: ${token}`);
    }
  }
}

if (core.schemaVersion !== "1.0") fail("schemaVersion must be 1.0");
if (!Array.isArray(core.patterns)) fail("patterns must be an array");
if (!Array.isArray(core.lineages)) fail("lineages must be an array");

const ids = new Set<string>();
const actualDomainCounts = new Map<string, number>();

for (const entry of entries) {
  const id = entry.id;
  if (typeof id !== "string" || !/^II-\d{3}$/.test(id)) {
    fail(`invalid entry id: ${String(id)}`);
  }
  if (ids.has(id)) fail(`duplicate entry id: ${id}`);
  ids.add(id);

  if (typeof entry.title !== "string" || !entry.title.trim()) {
    fail(`${id}: title required`);
  }
  if (typeof entry.summary !== "string" || !entry.summary.trim()) {
    fail(`${id}: summary required`);
  }
  if (typeof entry.domain !== "string" || !allowedDomains.has(entry.domain)) {
    fail(`${id}: invalid public domain: ${String(entry.domain)}`);
  }
  if (typeof entry.type !== "string" || !allowedTypes.has(entry.type)) {
    fail(`${id}: invalid public type: ${String(entry.type)}`);
  }
  if (
    typeof entry.maturity !== "string" ||
    !allowedMaturity.has(entry.maturity)
  ) {
    fail(`${id}: invalid maturity: ${String(entry.maturity)}`);
  }
  if (
    typeof entry.firstSeen !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(entry.firstSeen)
  ) {
    fail(`${id}: firstSeen must be YYYY-MM-DD`);
  }
  if (
    entry.lastSeen !== undefined &&
    (typeof entry.lastSeen !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(entry.lastSeen))
  ) {
    fail(`${id}: lastSeen must be YYYY-MM-DD when present`);
  }
  if (!Array.isArray(entry.lineageIds) || !Array.isArray(entry.patternIds)) {
    fail(`${id}: lineageIds and patternIds must be arrays`);
  }

  actualDomainCounts.set(
    entry.domain,
    (actualDomainCounts.get(entry.domain) ?? 0) + 1,
  );
}

const expectedIds = Array.from(
  { length: entries.length },
  (_, index) => `II-${String(index + 1).padStart(3, "0")}`,
);
for (const id of expectedIds) {
  if (!ids.has(id)) fail(`missing stable entry id: ${id}`);
}

for (const lineage of core.lineages as UnknownRecord[]) {
  if (!Array.isArray(lineage.entryIds)) {
    fail("lineage entryIds must be an array");
  }
  for (const id of lineage.entryIds as unknown[]) {
    if (typeof id !== "string" || !ids.has(id)) {
      fail(`lineage references missing entry: ${String(id)}`);
    }
  }
}

for (const pattern of core.patterns as UnknownRecord[]) {
  if (!Array.isArray(pattern.evidenceEntryIds)) {
    fail("pattern evidenceEntryIds must be an array");
  }
  for (const id of pattern.evidenceEntryIds as unknown[]) {
    if (typeof id !== "string" || !ids.has(id)) {
      fail(`pattern references missing entry: ${String(id)}`);
    }
  }
}

const stats = core.stats as UnknownRecord;
if (stats.entryCount !== entries.length) {
  fail(
    `stats.entryCount=${String(stats.entryCount)} but entries=${entries.length}`,
  );
}

const declaredDomainCounts = stats.domainCounts;
if (
  typeof declaredDomainCounts !== "object" ||
  declaredDomainCounts === null ||
  Array.isArray(declaredDomainCounts)
) {
  fail("stats.domainCounts must be an object");
}

for (const domain of allowedDomains) {
  const declared = (declaredDomainCounts as UnknownRecord)[domain];
  const actual = actualDomainCounts.get(domain) ?? 0;
  if (declared !== actual) {
    fail(
      `domain count mismatch for ${domain}: declared=${String(declared)} actual=${actual}`,
    );
  }
}

console.log(
  `[thinking-map] OK — ${entries.length} entries, ${(core.patterns as unknown[]).length} patterns, ${(core.lineages as unknown[]).length} lineages, privacy/schema checks passed`,
);
