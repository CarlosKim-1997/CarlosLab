---
schema: task/v1
id: T-004
status: IN_PROGRESS
areas:
  - thinking-map
depends_on:
  - T-003
implements:
  - D-001
  - C-001
  - C-002
---
# Thinking Map mobile usability v3

## Objective

Improve the mobile readability and interaction cost of the public `/ideas` visual atlas without changing its public data contract.

## Scope

In scope:
- mobile-first lineage layout that removes the 260px label column from narrow screens;
- horizontal-scroll affordance for the monthly timeline;
- count labels for recent/peak timeline months;
- collapsible lineage evidence/details using native HTML;
- responsive presentation-only changes;
- production build and public-data validation.

Out of scope:
- public ontology/schema changes;
- entry/lineage classification changes;
- private provenance;
- monthly pipeline automation;
- unrelated CarlosLab routes.

## Authority

Authorized:
- edit `feat/thinking-map-mobile-usability-v3`;
- derive responsive presentation only from already-public Thinking Map data;
- create a review pull request.

Not authorized:
- expose private upstream data;
- alter C-001/C-002;
- merge without separate human authority.

## Constraints

- mobile simplification must not remove textual lineage identity or chronology;
- horizontal scroll must advertise that more content exists;
- count labels must not change the underlying linear scale;
- lineage details must remain accessible without client-side JavaScript;
- existing searchable 202-entry archive must remain unchanged.

## Verification

Before COMPLETE:
- Governance passes;
- public Thinking Map validation passes;
- Next.js production build passes;
- no chart/runtime dependency is added;
- narrow-screen lineage layout does not require a 980px-wide combined label+timeline table;
- timeline includes explicit horizontal-scroll affordance;
- recent/peak counts are directly visible;
- lineage details are collapsible with native `details/summary`.

## Stop Conditions

Stop if mobile readability improvements require changing the public ontology/schema, exposing private provenance, adding a chart/runtime dependency, or hiding evidence behind client-only interaction.

## Completion Criteria

The first mobile viewport shows readable lineage identity and chronology without sacrificing a quarter of the viewport to a fixed label column, and the timeline communicates both scale and horizontal interaction more clearly.
