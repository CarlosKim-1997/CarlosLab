---
schema: open-question/v1
id: OQ-002
status: RESOLVED
areas:
  - thinking-map
resolved_by: D-004
related_to:
  - D-003
---
# What conversation text may be sent to a cloud LLM during monthly analysis?

## Question

What portion of new or changed conversation text may cross the local/cloud boundary during semantic extraction and reconciliation?

## Why It Matters

Raw conversation text may include health, relationships, employment context, exact personal details, and other material intentionally excluded from the public Thinking Map.

D-004 resolves this with bounded changed-region analysis, local direct-identifier stripping, and manual/local handling for high-risk sensitive material.
