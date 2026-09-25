---
schema: constraint/v1
id: C-001
kind: HARD_CONSTRAINT
status: ACTIVE
areas:
  - thinking-map
overridable: false
---
# Public data boundary

## Constraint

CarlosLab must not contain raw ChatGPT exports, raw conversation transcripts, conversation IDs, private source-session maps, secrets, or personal/sensitive source material used to derive the Thinking Map.

Only a deliberately sanitized public projection may be committed to this public repository.

## Rationale

CarlosLab is public. The upstream conversations include private and potentially sensitive material that is unnecessary for explaining public reasoning patterns.

## Operational Effect

- Public data schemas must omit private source identifiers.
- Validation should fail on known private provenance fields.
- Raw export and processing state must live in a private repository or local/private storage.
- If a future worker cannot determine whether a field is safe to publish, stop and request human review.
