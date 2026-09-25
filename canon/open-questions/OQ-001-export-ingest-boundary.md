---
schema: open-question/v1
id: OQ-001
status: OPEN
areas:
  - thinking-map
depends_on:
  - D-002
---
# Where should monthly ChatGPT export ingest run?

## Question

Should the monthly raw-export ingestion and processed-conversation state live in a dedicated private GitHub repository, or remain a local/private script workflow until the pipeline stabilizes?

## Why It Matters

The choice affects secret handling, reproducibility, automation convenience, and the attack surface around raw personal conversation data. It does not block the public Thinking Map v1 UI.
