---
schema: task/v1
id: T-002
status: COMPLETE
areas:
  - thinking-map
depends_on:
  - T-001
implements:
  - D-002
related_to:
  - OQ-001
  - OQ-002
---
# Design the monthly Thinking Pipeline

## Objective

Produce a decision-ready technical design for turning future ChatGPT exports into incremental, sanitized Thinking Map update proposals without requiring a full re-analysis of the historical corpus each month.

## Scope

In scope:
- input and trust boundaries,
- conversation normalization and delta detection,
- candidate extraction and reconciliation,
- private/public state separation,
- stable public ID allocation,
- privacy and ontology gates,
- idempotent run state and retry behavior,
- sanitized CarlosLab PR generation,
- monthly snapshot design,
- failure and recovery semantics,
- options for OQ-001.

Out of scope:
- implementing the private runner,
- creating a new private repository,
- uploading raw ChatGPT exports,
- selecting or calling a production LLM provider,
- resolving OQ-001 or OQ-002 without human ratification,
- mutating CarlosLab public Thinking Map data.

## Authority

Authorized:
- inspect existing CarlosLab Governance/Canon and Thinking Map structure,
- create a design report,
- propose new Decisions or Open Questions,
- create design-only repository changes on the isolated design branch.

Not authorized:
- activate D-003 without human ratification,
- create or populate a private processing repository,
- send conversation text to an external model,
- merge this design branch,
- begin implementation of the monthly analyzer.

## Constraints

C-001 and C-002 remain binding.

The design must preserve:
- raw/private provenance outside CarlosLab,
- human review before publication,
- stable public ontology by default,
- recoverability by future agents,
- explicit distinction between published state and analysis proposals.

## Verification

Completed by reviewing the merged Thinking Map v1 data model, D-001/D-002, C-001/C-002, OQ-001, current public shard structure, and the Repository Governance recovery rules.

The resulting report defines:
- deterministic pipeline stages,
- an idempotent run key,
- delta semantics,
- proposal/finalization boundaries,
- privacy gates,
- failure recovery behavior,
- implementation phases and acceptance criteria.

## Stop Conditions

This design Task is closed.

Implementation must not begin until the human owner chooses a runtime boundary for OQ-001/D-003 and determines an acceptable policy for OQ-002 before real cloud semantic analysis is enabled.

## Completion Criteria

Satisfied. A future worker can implement the parser/delta/state machine from the design without reconstructing this chat, and the remaining human choices are explicit.
