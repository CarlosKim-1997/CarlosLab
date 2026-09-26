# T-006 — AI Readability Baseline v0 start record

Date opened: 2026-09-26  
Pre-instrumentation main SHA: `2c5fa4d929f576b8635d56e82c5a35f46120f621`

## Purpose

Preserve a practical before/after boundary for the CarlosLab AI-readability experiment. This phase changes observation only; it does not intentionally optimize what crawlers, answer engines, or agents can understand.

## Baseline boundary

At the pre-instrumentation SHA, CarlosLab had no repository-installed Vercel Web Analytics component and no repository-managed AI crawler request classifier.

The v0 measurement apparatus adds:
- normal page-view/referrer instrumentation through Vercel Web Analytics;
- server-side classification/logging for a small named set of AI/search crawler user agents;
- no crawler access-policy changes and no AI-specific content representation.

## Privacy boundary

Crawler observations retain only:
- crawler family name;
- broad category;
- public request path.

They intentionally omit:
- IP address;
- cookies;
- referrer;
- complete user-agent string;
- private identifiers.

## Experimental rule

Keep this measurement apparatus stable while later interventions are introduced one layer at a time. Treat crawler-name matching as observational evidence, not proof of requester identity.
