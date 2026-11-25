# Rectification — 2026-11-17 package, first version rejected (2026-11-24)

## What the owner found (2026-11-24)

The owner deleted all Drive uploads of the first 2026-11-17 version and named two mistakes:

1. **The records never obeyed the record template** — they were filled with all kinds of texts instead of following the template's shape.
2. **The folders never aligned with the remote** — the competitor folder held only two subfolders storing snapshots of the two own games, not competitors at all.

## What was actually wrong

- **Template:** the first version's records paraphrased the `templates/game-demo/` blank kit (02/04/05/06A/08) into invented sections. The record template that governs these records is the **October 28 filled records** — the shape the owner reviewed and filed (`docs/gamejam/competitor-plays-2026-10-28/records/`). The first version did not follow that shape in any of its ten files.
- **Folders:** the first version put the two own games under `evidence/competitors/<game>/`. On the remote, `evidence/competitors/` holds competitor games only (drawasaurus, drawize, gartic-phone, reign, skribbl-io, …); the own games live at `evidence/moments/` and `evidence/bell/` as numbered PNG + TXT pairs, with raw PDFs under `pdf/<task-uuid>/`.
- **Filenames:** the first version's Small Hours files wrongly carried `0.2.0` (the remote's Small Hours files carry no version: `art--small-hours-2026-10-28.md`); the Bell session file missed the version (the remote's is `session--bell-0.1.0-agent-2026-10-28.md`).
- **Package name:** the first version used `play-2026-11-17/`; the remote's dated packages are `competitor-plays-YYYY-MM-DD/`.

## What changed in this version

- All ten records rewritten to the October 28 filled-record shape: session (identity bullets, journey table, outcome table, shareable check, gallery), journey (identity, promise and arrival, event journals, coverage checklist, reactions, drawn route, what it does not claim, gallery), art (journey boards, art questions, evidence strips, gallery), coverage (six-title table carried from October 28, coverage check, what the coverage says, gallery), decision (§1, §2 competitor table, §3 three candidates, proposed decision, evidence ledger, gallery).
- Folders rebuilt to the remote layout: `competitor-plays-2026-11-17/`, `records/` flat with the remote's filenames, `evidence/moments/` + `evidence/bell/` as numbered PNG + TXT pairs, raw PDFs under `evidence/<game>/pdf/<task-uuid>/`, no `competitors/` directory (no competitors were studied this round), `html/` and `notes/` present per the remote shape.
- Evidence re-keyed: the numbered PNGs are page-1 renders of the same PDFs; the TXT files are the same PDFs' page-1 text layers; the keepsake SVGs are scene-named (`keepsake--museum-en.svg`, `keepsake--postcard-ja.svg`, `keepsake--weather-zh-hans.svg`) as in October 28.
- README + one-page critique written in the October 28 shape.

## What is preserved (unchanged)

- The play evidence: the same 4 Small Hours PDFs + 3 keepsake SVGs, the same 13 Bell PDFs, the same verified facts. No re-play was run.
- The verdicts: both games NOT ADVANCE on human-gate grounds; Vivid 0.2.0 unplayed.
- The first version's files (`play-2026-11-17/`) were deleted locally after this version was verified; its Drive copies were deleted by the owner on 2026-11-24. Nothing of the first version remains.
