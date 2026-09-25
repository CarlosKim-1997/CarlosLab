---
schema: decision/v1
id: D-001
status: ACTIVE
areas:
  - thinking-map
---
# Thinking Map v1 public architecture

## Decision

CarlosLab's `/ideas` area will become a public Thinking Map rather than a flat idea board.

The v1 public experience will present, in order:

1. a concise "How I Think" framing,
2. recurring thinking patterns,
3. a domain landscape,
4. thought lineages,
5. time/change views when enough snapshots exist,
6. the full sanitized archive as searchable evidence.

The public projection uses nine current domains, five public entry types (Idea, Insight, Principle, Hypothesis, System/Project), four maturity states (Seed, Developing, Adopted, Validated), and stable entry IDs. The richer private archive remains the upstream analytical source.

## Context

The initial ChatGPT export review produced 202 deduplicated idea/insight units and revealed that the useful portfolio signal is not the raw count but repeated reasoning structures and idea lineages. The repository already had an empty `/ideas` route and content directory.

The human owner approved proceeding with the recommended Thinking Map direction on 2026-09-25.

## Rationale

A first-time visitor should understand the recurring reasoning style quickly, while retaining the ability to inspect the underlying archive as evidence. A fixed public projection also gives future monthly updates a stable comparison target.

## Consequences

- Do not optimize the landing experience around showing all entries at once.
- Preserve stable IDs and the baseline ontology unless a later human-ratified Decision changes them.
- Keep private provenance outside the public projection.
- New UI and automation should consume the public projection rather than raw ChatGPT exports.
