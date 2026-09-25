---
schema: task/v1
id: T-001
status: IN_PROGRESS
areas:
  - thinking-map
implements:
  - D-001
  - D-002
  - C-001
  - C-002
related_to:
  - OQ-001
---
# Implement Thinking Map v1 baseline

## Objective

Deliver the first reviewable public Thinking Map implementation on a feature branch, using the September 2026 baseline archive and a sanitized public data projection.

## Scope

In scope:
- public Thinking Map data types and baseline projection,
- `/ideas` experience,
- domain/pattern/lineage presentation,
- searchable/filterable public archive,
- deterministic public-data validation,
- repository-governance adoption needed for reliable agent handoff,
- build and structural verification,
- a reviewable pull request.

Out of scope:
- storing raw ChatGPT exports in CarlosLab,
- fully automated ChatGPT export acquisition,
- unattended monthly publication,
- resolving OQ-001,
- redesigning unrelated CarlosLab project pages.

## Authority

Authorized:
- inspect the repository and connected public project data,
- edit files on `feat/thinking-map-v1`,
- add project-owned Governance/Canon/Work records that reflect already ratified choices,
- run local deterministic validation and build checks,
- create a review pull request.

Not authorized by this Task:
- merge the pull request,
- mutate production outside the repository,
- publish private source data,
- ratify new product-policy choices that materially differ from D-001 or D-002.

## Constraints

C-001 and C-002 are binding. Preserve the existing CarlosLab visual language unless implementation needs a local extension. Keep public classification simpler than the private analytical archive.

## Verification

Before marking COMPLETE:
- `node tooling/governance/check.mjs` passes,
- `npm run validate:thinking` passes on all 202 baseline entries,
- `npm run build` succeeds,
- the branch diff contains no raw export, conversation IDs, or private source-session map,
- the `/ideas` page exposes the intended progressive disclosure structure.

## Stop Conditions

Stop and request human input if:
- public/private provenance cannot be separated safely,
- an implementation requires changing D-001/D-002 meaning,
- a new public ontology would replace rather than extend the approved baseline,
- unrelated repository work conflicts with the branch,
- a destructive or production mutation becomes necessary.

## Completion Criteria

A first-time reviewer can open the PR, recover project intent from repository authority without chat history, inspect the public Thinking Map baseline, run deterministic checks, and understand the next monthly-automation step.
