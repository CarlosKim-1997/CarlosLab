---
schema: constraint/v1
id: C-002
kind: HARD_CONSTRAINT
status: ACTIVE
areas:
  - thinking-map
overridable: false
---
# Human publication gate

## Constraint

No automated workflow may directly publish, merge, or deploy a semantically generated Thinking Map update without human review of the public-facing delta.

## Rationale

LLM-based extraction and classification can drift, misclassify private material, or change the represented meaning of the owner's work.

## Operational Effect

Automation may generate data, validation results, branches, commits, and pull requests. Integration into the publication branch requires an explicit human action.
