---
schema: state/v1
status: READY
areas:
  - global
---
# Current Project State

## Current Position

Thinking Map v1 is merged into `main` at `b6149024ce6f456a56c9abb6d8469e3defb35d03`.

The monthly pipeline architecture is designed. The human owner ratified D-003 (hybrid local-first runtime boundary) and D-004 (bounded/redacted semantic-analysis privacy mode) on 2026-09-25. OQ-001 and OQ-002 are resolved.

T-003 should implement the deterministic pipeline core in a dedicated private repository. No LLM semantic analyzer is part of T-003.

## Active Work

No implementation Task is active inside CarlosLab.

Next planned Task:
- T-003 — Deterministic Pipeline Core, to live in the dedicated private pipeline repository.

External prerequisite:
- create the dedicated private GitHub repository for the pipeline.

## Blockers

The currently connected GitHub repository API can mutate existing repositories but does not expose repository creation. Therefore the private pipeline repository must be created through another authorized GitHub surface before T-003 code can begin there.

This is an environment/tooling blocker only; product/runtime decisions are resolved.

## Material Risks

- Do not place private pipeline implementation or raw processing state in public CarlosLab as a workaround.
- Raw export ZIP, full normalized transcripts, and raw prompts remain local-only under D-003.
- Semantic cloud calls remain outside T-003 and must later obey D-004.
- CarlosLab remains publication authority for public Thinking Map state.

## Verification Basis

Thinking Map v1 merge: `b6149024ce6f456a56c9abb6d8469e3defb35d03`.

Monthly design branch passed Governance, public-data validation, and application build in PR run #29 before ratification changes.

D-003 and D-004 reflect explicit human approval in the current session on 2026-09-25.
