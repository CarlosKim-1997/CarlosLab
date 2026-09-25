---
schema: task/v1
id: T-003
status: IN_PROGRESS
areas:
  - thinking-map
depends_on:
  - T-001
implements:
  - D-001
  - C-001
  - C-002
---
# Thinking Map visual atlas v2

## Objective

Upgrade the existing report-like `/ideas` Thinking Map into a more immediately legible visual atlas while preserving the approved public ontology, sanitized dataset, and evidence archive.

## Scope

In scope:
- domain landscape visualization from existing domain counts;
- lineage timeline map using existing firstSeen dates and lineage memberships;
- monthly thought-activity timeline from existing public entry dates;
- responsive, accessible SVG/CSS rendering without chart dependencies;
- integration into the current `/ideas` information hierarchy;
- preservation of the searchable 202-entry evidence archive;
- deterministic validation and production build.

Out of scope:
- changing the public Thinking Map schema;
- changing entry classifications or stable IDs;
- adding private provenance;
- monthly pipeline publication automation;
- automatic semantic updates;
- redesigning unrelated CarlosLab routes.

## Authority

Authorized:
- edit `feat/thinking-map-visual-atlas-v2`;
- derive visual positions/aggregates only from already-public Thinking Map data;
- add UI components and local presentation helpers;
- create a review pull request.

Not authorized:
- publish private upstream data;
- change D-001/C-001/C-002 meaning;
- mutate the upstream private pipeline;
- merge the PR without separate human authority.

## Constraints

C-001 and C-002 are binding.

Visuals must not imply ranking or quality where the data only represents frequency, chronology, or relationship.

All visualization must degrade gracefully on narrow screens and retain textual context for accessibility.

## Verification

Before COMPLETE:
- `npm run validate:governance` passes;
- `npm run validate:thinking` passes;
- production Next.js build passes;
- visual components use only sanitized public data;
- no new runtime chart dependency is introduced;
- lineages remain inspectable as text/evidence, not only graphical marks;
- current archive search/filter remains functional.

## Stop Conditions

Stop if the visualization requires changing public ontology or exposing private provenance, or if a graph implies unsupported causality/importance.

## Completion Criteria

A first-time visitor can understand the main domains, lineages, and temporal development visually before descending into the full evidence archive.
