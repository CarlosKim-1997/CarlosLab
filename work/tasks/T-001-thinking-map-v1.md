---
schema: task/v1
id: T-001
status: COMPLETE
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
- run deterministic validation and build checks,
- create and prepare a review pull request.

Not authorized by this Task:
- merge the pull request,
- mutate production outside the repository,
- publish private source data,
- ratify new product-policy choices that materially differ from D-001 or D-002.

## Constraints

C-001 and C-002 are binding. Preserve the existing CarlosLab visual language unless implementation needs a local extension. Keep public classification simpler than the private analytical archive.

## Verification

Satisfied on implementation commit `c833bdea73d6a02826d12f1a3ca1dc4e57aef99e` through GitHub Actions PR run #25:

- `node tooling/governance/check.mjs`: PASS.
- `npm run validate:thinking`: PASS for 202 entries, relation integrity, public schema, domain counts, and private-provenance deny checks.
- `npm run build`: PASS.
- branch diff contains no raw ChatGPT export, transcript, conversation-ID map, or private source-session map.
- `/ideas` implements framing → patterns → landscape → lineages → time view → evidence archive.
- desktop, mobile navigation, and homepage expose the Thinking Map route.

Vercel preview status is not used as completion evidence because repeated commits hit an external build-rate limit. The production Next.js build itself passed.

## Stop Conditions

This execution episode is closed.

Any later worker must stop and request human input if:
- asked to merge without explicit merge authority,
- public/private provenance cannot be separated safely,
- work requires changing D-001/D-002 meaning,
- a new public ontology would replace rather than extend the approved baseline,
- a destructive or production mutation becomes necessary.

## Completion Criteria

Satisfied. A new worker can recover intent and authority from repository files without chat history, inspect the complete sanitized baseline, run deterministic checks, and identify human PR review as the next valid action.
