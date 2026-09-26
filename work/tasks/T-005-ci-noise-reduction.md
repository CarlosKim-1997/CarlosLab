---
schema: task/v1
id: T-005
status: IN_PROGRESS
areas:
  - global
depends_on:
  - T-004
---
# CI noise reduction

## Objective

Reduce duplicate GitHub Actions runs and notification noise without weakening repository verification.

## Scope

In scope:
- run CI on pull requests targeting `main`;
- run final verification on pushes to `main`;
- remove the obsolete `feat/thinking-map-v1` push trigger;
- cancel superseded runs for the same workflow/ref or pull request.

Out of scope:
- changing Governance checks;
- changing Thinking Map validation;
- changing the production build;
- changing Node/runtime versions;
- public content or schema changes.

## Constraints

- PR verification must remain mandatory-capable;
- `main` must still receive final verification after merge;
- manual `workflow_dispatch` must remain available;
- verification commands must remain unchanged.

## Stop Conditions

Stop if reducing notifications would skip PR verification, skip final `main` verification, or alter public Thinking Map semantics.

## Verification

Before COMPLETE:
- workflow syntax is accepted by GitHub Actions;
- PR run executes Governance and application jobs;
- no feature-branch push run is created for the maintenance branch;
- superseded same-PR runs are cancelable through concurrency.

## Completion Criteria

One logical feature update should normally produce one PR verification run and one final `main` verification run, rather than an extra feature-branch push run.
