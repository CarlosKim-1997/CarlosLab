---
schema: task/v1
id: T-003
status: COMPLETE
areas:
  - thinking-map
depends_on:
  - T-001
implements:
  - D-001
  - C-001
  - C-002
---
# Thinking Map visual atlas v2

## Objective

Upgrade the existing report-like `/ideas` Thinking Map into a more immediately legible visual atlas while preserving the approved public ontology, sanitized dataset, and evidence archive.

## Scope

In scope:
- domain landscape visualization from existing domain counts;
- lineage timeline map using existing firstSeen dates and lineage memberships;
- monthly thought-activity timeline from existing public entry dates;
- responsive, accessible SVG/CSS rendering without chart dependencies;
- integration into the current `/ideas` information hierarchy;
- preservation of the searchable 202-entry evidence archive;
- deterministic validation and production build.

Out of scope:
- changing the public Thinking Map schema;
- changing entry classifications or stable IDs;
- adding private provenance;
- monthly pipeline publication automation;
- automatic semantic updates;
- redesigning unrelated CarlosLab routes.

## Authority

Authorized:
- edit `feat/thinking-map-visual-atlas-v2`;
- derive visual positions/aggregates only from already-public Thinking Map data;
- add UI components and local presentation helpers;
- create a review pull request.

Not authorized:
- publish private upstream data;
- change D-001/C-001/C-002 meaning;
- mutate the upstream private pipeline;
- merge the PR without separate human authority.

## Constraints

C-001 and C-002 are binding.

Visuals do not imply ranking or quality where the data only represents frequency, chronology, or relationship.

## Verification

Satisfied on implementation head `5d5a60a2fd4a75c2c53e57847038d847e00114f1` through GitHub Actions PR run #32:

- Repository Governance: PASS.
- Thinking Map public-data validator: PASS.
- Next.js production build: PASS.
- public dataset remains 202 stable sanitized entries;
- no public schema change;
- no chart/runtime dependency added;
- mobile navigation now exposes `/ideas`;
- new visuals derive only from public domain counts, entry dates, domains, and lineage membership.

Hosted visual preview could not be inspected because this PR did not expose a Vercel preview check and the connected Vercel account surface returned no accessible team/project. This is not treated as application-build evidence.

## Stop Conditions

This execution episode is closed.

Merge remains separately human-authorized under C-002.

## Completion Criteria

Satisfied. The branch is technically review-ready and presents the existing Thinking Map as a domain landscape, chronological lineage map, monthly timeline, and textual evidence archive.
