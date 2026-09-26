---
schema: task/v1
id: T-006
status: IN_PROGRESS
areas:
  - global
depends_on:
  - T-005
---
# AI readability baseline v0

## Objective

Establish a 14-day observation-only baseline for CarlosLab before any AI-readability optimization, so later semantic and agent-facing interventions can be compared against a stable starting point.

## Scope

In scope:
- add privacy-minimized request observation for known AI/search crawlers;
- add Vercel Web Analytics page-view instrumentation for ordinary traffic/referrer baseline;
- preserve the current public UI, content, metadata semantics, robots policy, sitemap behavior, and information architecture;
- record the baseline start artifact and measurement boundary;
- keep the measurement apparatus stable through later intervention phases where practical.

Out of scope:
- AI-oriented content rewriting;
- JSON-LD or semantic-HTML optimization beyond existing behavior;
- `llms.txt`, machine knowledge endpoints, concept graphs, MCP, or WebMCP;
- crawler allow/deny policy changes;
- paid observability upgrades or other cost-incurring platform changes;
- collection of IP addresses, cookies, full user-agent strings, or private identifiers in repository-managed logs.

## Authority

Authorized:
- edit observability/instrumentation code on `feat/ai-readability-baseline-v0`;
- add the Vercel Web Analytics package and root instrumentation;
- add request middleware that records only matched crawler family, category, and public request path;
- update this Task and Current State;
- open, verify, merge, and deploy this bounded baseline instrumentation after checks pass.

Not authorized:
- alter public content meaning or Thinking Map semantics;
- change robots/crawler access policy;
- enable paid add-ons or otherwise incur new platform cost;
- persist private visitor data;
- begin the v1 semantic intervention before the 14-day baseline review.

## Constraints

- C-001 remains binding for all public and observed data;
- C-002 remains binding for any future semantically generated Thinking Map publication;
- observation must not intentionally present different content to crawlers and humans;
- crawler classification is descriptive only and does not authenticate a requester;
- measurement code should remain small enough that it does not become a material product feature.

## Stop Conditions

Stop if the instrumentation requires a paid upgrade, changes public content/crawl policy, collects private identifiers, breaks static/public routes, or materially changes the portfolio experience.

## Verification

Pending:
- Repository Governance checker;
- public Thinking Map validation;
- Next.js production build;
- preview deployment readiness;
- production deployment readiness;
- observed crawler logging path and Web Analytics script presence.

## Completion Criteria

The baseline has run for 14 days from the verified production start, after which collected observations are reviewed before any AI-readability semantic intervention begins.
