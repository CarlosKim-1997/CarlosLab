---
schema: state/v1
status: IN_PROGRESS
areas:
  - global
---
# Current Project State

## Current Position

Thinking Map visual atlas v2 is integrated on `main`.

T-004 is improving mobile readability and interaction cost on `feat/thinking-map-mobile-usability-v3`.

The public data contract remains unchanged.

## Active Work

- T-004 — Thinking Map mobile usability v3.

## Blockers

No known implementation blocker.

## Material Risks

- over-compressing lineage chronology on narrow screens;
- adding labels that visually overstate recent activity;
- using interaction patterns that hide evidence too aggressively;
- accidentally turning presentation work into a schema change.

## Verification Basis

Production `/ideas` is reachable on Vercel and the v2 visual components are present.

T-004 is presentation-only and must preserve the existing 202-entry public projection.
