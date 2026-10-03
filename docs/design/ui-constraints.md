# Carlos Lab UI constraints (de-AI / Dark Ink)

## Intent

The site should read as a personal workshop catalog, not an AI-agent or SaaS landing page.

## Color

- **Lab chrome:** warm ink + stone accent (`--accent-lab`). No cyan/emerald as global accents.
- **Portfolio channel:** violet only (`PortfolioPdfLink`, `#portfolio` section). Do not reuse violet for Lab nav or cards.
- Avoid gradient hero blobs and glow shadows on cards.

## Typography

- Section titles: sans semibold, sentence case Korean or plain labels. No `font-mono uppercase tracking-widest` for section eyebrows.
- Mono: code, IDs in data tables, optional log/markers — not marketing labels.

## Layout

- Prefer flat surfaces (`border`, subtle bg). Limit `backdrop-blur` on cards.
- Three-column grids are allowed for project catalogs; avoid identical “feature card” marketing copy above the fold.

## Copy (Lab surfaces)

- Lead copy describes outcomes and verification, not stack keyword lists (RAG, LLM, PoC) in the hero.
- Project pages may name technologies accurately in meta and body.
