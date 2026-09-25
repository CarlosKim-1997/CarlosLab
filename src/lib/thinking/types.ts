export type PublicThinkingType =
  | "idea"
  | "insight"
  | "principle"
  | "hypothesis"
  | "system";

export type PublicMaturity = "seed" | "developing" | "adopted" | "validated";

export type ThinkingEntry = {
  id: string;
  title: string;
  summary: string;
  domain: string;
  type: PublicThinkingType;
  maturity: PublicMaturity;
  firstSeen: string;
  lastSeen?: string;
  lineageIds: string[];
  patternIds: string[];
};

export type ThinkingPattern = {
  id: string;
  name: string;
  description: string;
  featured: boolean;
  evidenceEntryIds: string[];
};

export type ThinkingLineage = {
  id: string;
  name: string;
  summary: string;
  entryIds: string[];
};

export type ThinkingMapDataset = {
  schemaVersion: "1.0";
  snapshot: string;
  generatedAt: string;
  exportCutoff: string;
  stats: {
    entryCount: number;
    conversationCountScanned: number;
    sourceSessionsUsed: number;
    domainCounts: Record<string, number>;
  };
  patterns: ThinkingPattern[];
  lineages: ThinkingLineage[];
  entries: ThinkingEntry[];
  method: {
    summary: string;
    privacy: string;
    review: string;
  };
};
