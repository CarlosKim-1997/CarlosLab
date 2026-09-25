---
schema: decision/v1
id: D-002
status: ACTIVE
areas:
  - thinking-map
depends_on:
  - D-001
---
# Monthly update workflow

## Decision

Thinking Map updates will be incremental and review-gated.

A future monthly ingest pipeline should compare a new ChatGPT export with previously processed conversation state, analyze only new or materially changed conversations, classify changes against the existing Canon, produce a sanitized public delta and snapshot, and prepare a pull request.

The system must not publish or merge the monthly result automatically. Human review of the public diff is required before integration.

## Context

Full export analysis is expensive and unnecessary after the baseline exists. The ChatGPT export acquisition step is not currently a reliable fully automated API workflow, and automated semantic classification can drift or surface inappropriate private material.

The human owner approved the recommended human-gated monthly workflow on 2026-09-25.

## Rationale

Incremental analysis reduces cost and preserves continuity. Pull-request review makes semantic drift and privacy mistakes observable before publication.

## Consequences

- Processed-conversation state belongs in a private processing environment, not CarlosLab.
- Public monthly snapshots may be committed to CarlosLab after review.
- Significant ontology changes should be called out explicitly in the PR.
- A future automation may stop at PR creation without additional approval.
