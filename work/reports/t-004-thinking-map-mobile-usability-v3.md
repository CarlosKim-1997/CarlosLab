# T-004 Thinking Map mobile usability v3 verification

Date: 2026-09-26

This report is Work provenance, not publication authority.

## Goal

Reduce interaction cost on narrow screens while preserving the public Thinking Map ontology, chronology, and evidence archive.

## Changes

### Mobile lineage map

Below `md`, lineage identity is now rendered above each compact chronology rail.

The former combined `260px label + 980px timeline` table is reserved for larger screens.

Mobile users therefore see:
- lineage ID;
- lineage name;
- membership count;
- first-to-last month;
- compressed chronology rail;

without horizontal scrolling.

### Tablet/desktop lineage map

The wide chronology remains for larger screens.

When the viewport cannot show the full rail, the component adds:
- a right-edge fade;
- `← 좌우로 밀어 전체 시간축 보기 →`.

### Monthly timeline

The linear bar scale is preserved.

The chart now:
- reserves headroom for labels;
- directly labels the most recent three months and the peak month;
- adds a right-edge fade on mobile;
- adds `← 좌우로 밀어 월별 흐름 보기 →`.

### Lineage detail density

The first three lineage detail cards remain immediately visible.

The remaining six are placed in native HTML `details/summary`, preserving accessibility and avoiding client-side state.

## Verification

GitHub Actions PR run #37:
- Repository Governance: PASS;
- public Thinking Map validation: PASS;
- Next.js production build: PASS.

Vercel preview for UI commit `d6951c0673ac662fca74d1b31e8243a647774bd9`:
- deployment state: READY;
- `/ideas`: HTTP 200;
- mobile lineage marker present;
- desktop lineage marker present;
- timeline swipe affordance present;
- existing 202-entry archive remains present.

The Vercel HTML fetch is suitable for structure/data verification but not a pixel screenshot. No pixel-perfect screenshot claim is made.

## Result

T-004 completion criteria are satisfied.

PR #4 is technically review-ready. Merge remains separately human-authorized under C-002.
