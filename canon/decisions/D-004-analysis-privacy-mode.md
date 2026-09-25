---
schema: decision/v1
id: D-004
status: ACTIVE
areas:
  - thinking-map
depends_on:
  - D-003
---
# Monthly semantic-analysis privacy mode

## Decision

For monthly semantic analysis:

1. process only NEW or MODIFIED visible conversation regions plus bounded surrounding context;
2. locally remove obvious direct identifiers before any cloud-model call;
3. do not send full historical exports or unchanged conversations to a cloud model;
4. conversations or regions flagged as high-risk sensitive material are not auto-sent to a cloud model and instead require manual review or an approved local-model path;
5. record the analysis policy, prompt/schema version, and model adapter version for every semantic run without persisting raw prompt payloads.

The human owner explicitly ratified this privacy mode on 2026-09-25.

## Context

The source export may include health, relationships, employment details, locations, account context, and other information unnecessary for a public Thinking Map. At the same time, durable idea/insight extraction benefits from capable semantic analysis.

OQ-002 asked what conversation text may cross the local/cloud boundary.

## Rationale

A bounded-delta approach limits both disclosure and cost. Local redaction reduces obvious identifier exposure, while sensitivity gating prevents the most private contexts from being sent automatically.

This retains access to strong cloud reasoning where appropriate without treating the entire personal conversation archive as routine model input.

## Consequences

- the deterministic core must expose changed regions separately from full conversations;
- a local redaction/sensitivity preflight is required before cloud semantic analysis is enabled;
- high-risk candidates default to blocked/manual rather than automatic transmission;
- changing this boundary materially requires a new human-ratified Decision.
