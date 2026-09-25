# Monthly Thinking Pipeline — Design v1

Date: 2026-09-25

Status: decision-ready design. This report is Work provenance, not normative authority.

## 1. Goal

Turn a newly downloaded ChatGPT export into a small, reviewable monthly Thinking Map update without re-reading the full historical corpus and without placing raw personal conversation data in CarlosLab.

The desired monthly human workflow is:

```text
download ChatGPT export ZIP
        ↓
run one local command
        ↓
incremental analysis + reconciliation
        ↓
review a compact monthly proposal
        ↓
create sanitized CarlosLab PR
        ↓
human review / merge
        ↓
finalize private processing state
```

The system should be resumable, idempotent, privacy-aware, and recoverable by another agent.

## 2. Non-goals

The v1 pipeline does not:
- automate ChatGPT export acquisition;
- publish or merge without human review;
- treat model-generated categories as Canon automatically;
- persist raw export data in CarlosLab;
- require a vector database or orchestration service;
- remove published entries merely because an old source conversation disappears from a later export.

## 3. Recommended runtime boundary

### Recommended: hybrid local-first

Use a dedicated **private pipeline repository** for durable software and handoff, while keeping the raw export local-only.

Tracked in private repo:
- CLI source code,
- schemas,
- prompt templates and prompt hashes,
- tests,
- pipeline version,
- compact processed-conversation manifest,
- private master metadata that does not require full raw transcript storage,
- immutable run metadata and decision/proposal summaries.

Never tracked:
- export ZIPs,
- full normalized transcripts,
- raw message caches,
- temporary prompt payloads containing private conversation text,
- API keys.

CarlosLab remains the publication target and contains only sanitized data.

This is recorded as D-003 PROPOSED. It does not become authoritative until human ratification.

## 4. Trust boundaries

### Boundary A — Raw input

Input is a ChatGPT export ZIP located outside the pipeline repository.

The runner reads it in place. It should not copy it into a tracked directory.

### Boundary B — Private analysis

Conversation IDs, message-node IDs, content hashes, candidate-to-source links, and rich reconciliation metadata are private.

### Boundary C — Public projection

Only these classes may cross into CarlosLab:
- stable public entry IDs,
- sanitized titles and summaries,
- approved public domain/type/maturity,
- public lineage and pattern relationships,
- aggregate counts,
- monthly delta statistics,
- non-sensitive methodology metadata.

### Boundary D — Publication

A pipeline may create a branch and PR. It may not merge or publish autonomously because C-002 requires human review.

## 5. Input normalization

The parser should support sharded ChatGPT export files and produce one normalized private representation per conversation.

Suggested normalized conversation:

```ts
type NormalizedConversation = {
  conversationId: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
  currentPath: NormalizedMessage[];
  offPathBranches: NormalizedMessage[][];
  fingerprint: string;
};

type NormalizedMessage = {
  nodeId: string;
  parentNodeId: string | null;
  role: "user" | "assistant";
  createdAt: string | null;
  visibleText: string;
  branch: "current" | "off-path";
  fingerprint: string;
};
```

Rules:
- include user messages and actually displayed assistant responses;
- preserve enough branch information to catch meaningful discarded/regenerated branches;
- exclude hidden/internal reasoning, tool internals, `thoughts`, and `reasoning_recap`-style artifacts;
- normalize whitespace/Unicode before hashing;
- do not perform OCR or image interpretation in the monthly v1 parser;
- flag multimodal conversations for optional later review rather than guessing their missing visual content.

## 6. Delta detection

Do not use timestamp alone.

Private processed manifest:

```ts
type ProcessedConversationState = {
  conversationId: string;
  lastSeenUpdatedAt: string;
  conversationFingerprint: string;
  currentPathFingerprint: string;
  offPathFingerprint: string;
  lastProcessedRunId: string;
};
```

For each new export classify conversations as:

- `NEW` — ID not previously seen;
- `MODIFIED` — known ID, content fingerprint changed;
- `UNCHANGED` — known ID and same fingerprint;
- `MISSING_FROM_EXPORT` — previously known ID absent from the new export.

`MISSING_FROM_EXPORT` never causes automatic public deletion. It only becomes a private provenance condition.

For MODIFIED conversations, compare message fingerprints to isolate changed/new regions and include only enough surrounding context for semantic interpretation.

## 7. Idempotent run identity

Every run should have a deterministic identity:

```text
run_id =
SHA256(
  export_file_sha256
  + public_main_sha
  + pipeline_version
  + analysis_config_hash
)
```

Re-running the same inputs should reuse the same run directory and not duplicate IDs or public changes.

Suggested private run layout:

```text
runs/<run-id>/
  manifest.json
  delta.json
  candidates.json
  reconciliation.json
  privacy-review.json
  public-proposal.json
  verification.json
```

Stage outputs are immutable once completed. A failed later stage resumes from the last valid artifact.

## 8. Semantic extraction

Only NEW/MODIFIED conversation regions should go through semantic extraction.

The extractor returns structured private candidates, not public copy.

```ts
type Candidate = {
  candidateId: string;
  sourceConversationId: string;
  sourceNodeIds: string[];
  firstSeen: string;
  candidateKind:
    | "idea"
    | "insight"
    | "principle"
    | "hypothesis"
    | "system";
  privateTitle: string;
  privateSummary: string;
  suggestedDomain: string;
  sensitivityFlags: string[];
  confidence: number;
};
```

Extraction prompt and schema version must be recorded with each run.

## 9. Reconciliation against the master archive

Do not ask a model to freely rewrite the entire archive.

For each candidate, retrieve a small comparison set from existing private/public entries using inexpensive local similarity first:
- normalized title token overlap,
- summary trigram/BM25-style similarity,
- same domain/date hints,
- optional embeddings later if the archive grows enough to justify them.

A semantic reconciler then chooses one action:

- `NEW`
- `EXTEND`
- `EVIDENCE`
- `MERGE_CANDIDATE`
- `CONTRADICT`
- `NOISE`
- `SENSITIVE_SKIP`

Meaning:
- NEW: genuinely new durable thought unit;
- EXTEND: same idea developed materially;
- EVIDENCE: additional example without changing meaning;
- MERGE_CANDIDATE: two existing units may actually be one; never auto-merge published IDs;
- CONTRADICT: newer thought conflicts with an older one and needs review;
- NOISE: not archive-worthy;
- SENSITIVE_SKIP: useful privately but inappropriate for public projection.

Published IDs are never silently rewritten or reused.

## 10. Stable ID allocation

CarlosLab `main` is authoritative for published `II-###` IDs.

When generating a proposal:
1. read the maximum published ID from main;
2. sort approved NEW proposals deterministically by first-seen date then candidate hash;
3. allocate subsequent IDs;
4. write them only into the proposal branch;
5. gaps are acceptable if a proposal is later rejected;
6. never recycle an ID.

Private state is finalized only after the public PR is merged or explicitly abandoned.

## 11. Public ontology gate

D-001's baseline remains the default:
- nine public domains;
- five public entry types;
- four maturity states;
- existing patterns and lineages.

The monthly analyzer may propose:
- `NEW_PATTERN_CANDIDATE`
- `NEW_LINEAGE_CANDIDATE`
- `DOMAIN_CHANGE_CANDIDATE`

but must not silently create or redefine them.

A material ontology change should become a separate human-reviewed Decision.

## 12. Privacy gate

Privacy is layered rather than delegated to one LLM judgment.

### Deterministic deny checks

Reject public payload fields containing:
- conversation IDs,
- raw node/message IDs,
- source-session maps,
- raw transcripts,
- credentials,
- raw file paths containing private data.

### Semantic sensitivity review

Flag candidate material related to:
- health/medical context,
- intimate or relationship details,
- exact location/contact details,
- employer-confidential information,
- account/financial identifiers,
- secrets/credentials,
- other personally identifying source context.

Public transformation may abstract a general insight away from sensitive origin only when the idea remains accurate without revealing that origin.

If not, use `SENSITIVE_SKIP`.

Human PR review remains the final publication gate.

OQ-002 controls what raw/partially redacted text may be sent to a cloud model during this stage.

## 13. Public monthly snapshot

Add a compact public snapshot instead of duplicating the full archive.

Suggested path:

```text
src/content/ideas/snapshots/2026-10.json
```

Suggested data:

```ts
type MonthlySnapshot = {
  month: string;
  exportCutoff: string;
  publishedAt: string;
  totals: {
    entries: number;
    domains: Record<string, number>;
  };
  delta: {
    newEntryIds: string[];
    extendedEntryIds: string[];
    evidenceOnlyCount: number;
    sensitiveSkippedCount: number;
    lineageChanges: string[];
    patternChanges: string[];
  };
};
```

The website can later use these snapshots for true month-over-month visualization.

## 14. Proposed public mutation

The proposal stage should create a branch such as:

```text
automation/thinking-map-2026-10
```

Expected changes:
- affected entry shard(s);
- `thinking-map-core.json` counts/relationships if needed;
- one monthly snapshot;
- optionally a compact public update report.

The pipeline runs:
- public validator,
- Governance checker,
- application build.

Only after all checks pass may it create the PR.

The PR body should summarize:
- new entries;
- extensions;
- conflicts/merge candidates;
- sensitive exclusions;
- ontology candidates;
- validation result;
- model/prompt/pipeline versions without exposing raw text.

## 15. Transaction and finalization model

Do not mutate durable private state incrementally during analysis.

Use a proposal transaction:

```text
INGESTED
→ DELTA_READY
→ EXTRACTED
→ RECONCILED
→ SANITIZED
→ VERIFIED
→ PR_CREATED
→ MERGED | REJECTED | ABANDONED
→ FINALIZED
```

Only FINALIZED updates:
- last published export cutoff;
- processed-conversation manifest;
- private master archive;
- public-to-private provenance map.

`finalize` must verify the actual PR state and merge SHA before committing private publication state.

If a run is abandoned, it remains immutable provenance but does not advance the published baseline.

## 16. Failure and retry behavior

- Parser failure: no state mutation.
- LLM timeout/rate failure: resume the failed candidate batch.
- Reconciliation ambiguity: mark review-required, do not guess.
- Privacy uncertainty: block public projection for that candidate.
- GitHub PR creation failure: proposal files remain local and retryable.
- Interrupted external mutation: observe GitHub state before retrying.
- Public main changed after analysis: rebase/recompute public allocation and validation before proposing.
- Export older than or equal to last finalized cutoff: warn and require explicit override for diagnostic replay.

## 17. Command UX

Target UX:

```bash
thinking-map ingest ~/Downloads/chatgpt-export.zip
```

This runs through local proposal generation and prints:

```text
Run: 2026-10-<hash>
Export cutoff: 2026-10-28 21:14 KST

Conversations
  new:       31
  modified:   7
  unchanged: 474

Candidates
  new ideas/insights: 12
  extensions:          8
  evidence-only:      15
  contradictions:      1
  sensitive skipped:   6
  needs review:         3

No external mutation performed.
Review: runs/<run-id>/review.md
```

Then:

```bash
thinking-map propose <run-id>
```

creates the sanitized CarlosLab branch/PR after explicit user action.

After human merge:

```bash
thinking-map finalize <run-id> --pr <number>
```

verifies the merged PR and advances private state.

## 18. Recommended implementation language

TypeScript/Node is preferred for v1 because:
- CarlosLab is already TypeScript;
- Zod-style schema validation fits the JSON-heavy pipeline;
- GitHub/public projection tooling can share types;
- Node handles the expected export scale comfortably;
- future agents can work across both repositories with one ecosystem.

The parser and analysis adapters should remain modular enough to replace the semantic model provider independently.

## 19. Model strategy

Do not optimize cost prematurely.

Start with:
- deterministic local parsing/delta/retrieval;
- one capable semantic model for extraction and reconciliation;
- a second semantic pass only for ambiguity/privacy-sensitive candidates.

After two or three real monthly runs, measure:
- changed-conversation count,
- tokens/cost,
- candidate yield,
- false merge/new rates,
- human review corrections.

Only then consider cheaper routing, batching, embeddings, or local models.

## 20. Recovery and handoff

The private pipeline repository, if D-003 is activated, should itself adopt Repository Governance.

Its Canon should record:
- public/private boundary,
- publication transaction semantics,
- approved analysis privacy mode,
- public CarlosLab as publication authority,
- prompt/schema versioning rules.

A new agent should be able to rebuild private derived state from:
- current public CarlosLab,
- latest available export,
- compact finalized manifests,
without needing this chat.

## 21. Implementation phases

### P0 — Decision

Human resolves or ratifies:
- D-003 / OQ-001 runtime boundary;
- OQ-002 privacy mode before external semantic analysis.

### P1 — Deterministic core

Implement without any LLM:
- ZIP parser;
- visible-message normalizer;
- branch-aware extraction;
- content hashing;
- processed manifest;
- delta detector;
- run state machine;
- public repository reader;
- dry-run reporting.

### P2 — Semantic analyzer

Add:
- candidate schema;
- model adapter;
- extraction;
- local retrieval;
- reconciliation actions;
- ambiguity handling;
- prompt/model provenance.

### P3 — Privacy/public projection

Add:
- sensitivity flags;
- public sanitizer;
- ontology gate;
- stable ID allocator;
- monthly snapshot;
- full validation.

### P4 — GitHub proposal

Add:
- CarlosLab automation branch generation;
- PR body generation;
- checks;
- explicit `propose` command;
- no merge capability.

### P5 — Finalization

Add:
- merged-PR verification;
- finalized private state;
- recovery tests;
- month-over-month website visualization using snapshots.

## 22. Acceptance criteria for the first real monthly run

A successful first operational run should demonstrate:

1. the same export processed twice produces no duplicate proposal;
2. unchanged conversations are not semantically reprocessed;
3. modified conversations analyze only changed regions plus bounded context;
4. all 202 baseline public entries retain their IDs;
5. new public IDs are monotonic and never reused;
6. no raw transcript/provenance enters CarlosLab;
7. ontology changes require explicit review;
8. an interrupted run can resume;
9. a failed/abandoned PR does not advance private published state;
10. a merged PR can be finalized and the next export computes delta from it;
11. another agent can recover the pipeline from repository-owned state.

## 23. Human decisions now required

### Decision A — OQ-001 / D-003

Recommended answer:

**Adopt the hybrid local-first boundary.**

- private repo for durable pipeline code and compact state;
- raw export/transcript local-only and never committed.

### Decision B — OQ-002

Choose what text may reach a cloud semantic model.

A conservative default recommendation is:

**locally strip obvious direct identifiers first, send only NEW/MODIFIED visible regions with bounded context, and force sensitive/high-risk conversations into manual review or a local-model path.**

The core deterministic pipeline can be implemented before Decision B is finalized, but real semantic monthly analysis should wait for it.
