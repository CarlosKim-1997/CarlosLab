---
schema: open-question/v1
id: OQ-002
status: OPEN
areas:
  - thinking-map
related_to:
  - D-003
---
# What conversation text may be sent to a cloud LLM during monthly analysis?

## Question

When the monthly analyzer needs semantic extraction and reconciliation, should it:

1. send changed visible conversation text to a cloud LLM,
2. first locally redact obvious personal identifiers and sensitive spans before cloud analysis,
3. use a local model for sensitive conversations and a cloud model for the rest,
4. or require another privacy mode?

## Why It Matters

Raw conversation text may include health, relationships, employment context, exact personal details, and other material that is intentionally excluded from the public Thinking Map.

This does not block the pipeline's parser, delta detector, state machine, validation, or public projection design. It becomes material before enabling real semantic analysis against new exports.
