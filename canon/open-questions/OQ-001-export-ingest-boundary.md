---
schema: open-question/v1
id: OQ-001
status: RESOLVED
areas:
  - thinking-map
resolved_by: D-003
---
# Where should monthly ChatGPT export ingest run?

## Question

Should the monthly raw-export ingestion and processed-conversation state live in a dedicated private GitHub repository, or remain a local/private script workflow until the pipeline stabilizes?

## Why It Matters

The choice affects secret handling, reproducibility, automation convenience, and the attack surface around raw personal conversation data. D-003 resolves this with a hybrid local-first boundary: durable software and compact non-raw state in a private repository, raw export/transcript data local-only.
