---
schema: decision/v1
id: D-003
status: PROPOSED
areas:
  - thinking-map
related_to:
  - OQ-001
  - OQ-002
---
# Monthly Thinking Pipeline runtime boundary

## Decision

Adopt a hybrid local-first runtime for the monthly Thinking Map pipeline:

- maintain the pipeline source code, schemas, prompt versions, tests, and non-raw operational metadata in a dedicated private repository;
- accept the ChatGPT export ZIP only as a local filesystem input;
- never commit or upload the raw ZIP, normalized full transcript cache, or raw message text to GitHub;
- keep public publication output limited to the sanitized CarlosLab projection and human-reviewed pull requests;
- allow compact private processing state to be stored in the private repository only when it can be reconstructed without storing full conversation text.

This Decision is PROPOSED and has no normative effect until explicitly ratified by the human owner and canonically activated.

## Context

D-002 established that monthly Thinking Map updates should be incremental, sanitized, and review-gated. OQ-001 left the location of raw ingestion and processing state unresolved.

A purely local script minimizes exposure but makes agent handoff, versioning, and reproducibility weaker. Uploading raw exports into a private cloud repository improves automation but unnecessarily persists highly sensitive conversation data.

The hybrid option separates durable software from ephemeral raw input.

## Rationale

The raw export is the highest-sensitivity artifact and is already manually downloaded. There is little benefit in uploading it again merely to automate later stages.

A dedicated private repository still gives future agents a durable home for:
- the CLI implementation,
- private schemas,
- extraction/reconciliation prompts,
- pipeline versions,
- tests,
- compact processing manifests,
- recovery documentation.

The public CarlosLab repository remains a publication target, not a processing environment.

## Consequences

If activated:
- the first implementation should create a dedicated private pipeline repository;
- raw export paths must point outside tracked repository content;
- repository ignore rules and validation must reject raw export/transcript artifacts;
- cloud LLM use remains a separate privacy decision under OQ-002;
- loss of local raw input must not corrupt published public state;
- public CarlosLab remains authoritative for what has actually been published.
