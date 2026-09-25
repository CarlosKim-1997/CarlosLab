---
schema: state/v1
status: IN_PROGRESS
areas:
  - global
---
# Current Project State

## Current Position

Thinking Map v1 is integrated on `main`.

The dedicated private `thinking-map-pipeline` repository now exists and has progressed through its integrated no-mutation monthly orchestration dry-run. CarlosLab remains the public publication authority.

T-003 is upgrading the public `/ideas` experience from a report-like Thinking Map into a visual atlas on `feat/thinking-map-visual-atlas-v2`.

## Active Work

- T-003 — Thinking Map visual atlas v2.

## Blockers

No known implementation blocker.

Monthly production automation remains an upstream/private-pipeline concern and is not required for this UI Task.

## Material Risks

- turning frequency into an apparent quality ranking;
- making lineage graphics imply causality stronger than the archived relationship supports;
- sacrificing mobile/readable text for visual novelty;
- adding a chart dependency that increases bundle/runtime cost unnecessarily;
- exposing private provenance while trying to make relationships richer.

## Verification Basis

Thinking Map v1 already validates 202 public entries, nine domains, nine lineages, public schema integrity, and private-provenance deny checks.

T-003 will preserve that data contract and add presentation-only derivations.
