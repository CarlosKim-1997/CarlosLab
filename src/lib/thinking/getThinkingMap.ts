import coreJson from "@/content/ideas/thinking-map-core.json";
import entries01 from "@/content/ideas/entries/01.json";
import entries02 from "@/content/ideas/entries/02.json";
import entries03 from "@/content/ideas/entries/03.json";
import entries04 from "@/content/ideas/entries/04.json";
import entries05 from "@/content/ideas/entries/05.json";
import entries06 from "@/content/ideas/entries/06.json";
import entries07 from "@/content/ideas/entries/07.json";
import entries08 from "@/content/ideas/entries/08.json";
import entries09 from "@/content/ideas/entries/09.json";
import type {
  ThinkingEntry,
  ThinkingLineage,
  ThinkingMapDataset,
  ThinkingPattern,
} from "./types";

const entries = [
  ...entries01,
  ...entries02,
  ...entries03,
  ...entries04,
  ...entries05,
  ...entries06,
  ...entries07,
  ...entries08,
  ...entries09,
] as ThinkingEntry[];

const core = coreJson as {
  schemaVersion: "1.0";
  snapshot: string;
  generatedAt: string;
  exportCutoff: string;
  stats: ThinkingMapDataset["stats"];
  patterns: ThinkingPattern[];
  lineages: ThinkingLineage[];
  method: ThinkingMapDataset["method"];
};

export function getThinkingMap(): ThinkingMapDataset {
  return {
    ...core,
    entries,
  };
}

export function getEntryMap(entriesToIndex = entries) {
  return new Map(entriesToIndex.map((entry) => [entry.id, entry]));
}
