# Keeper's Frame 0.1.2 — demo records + competitor plays, 2026-10-28

Reviewed package from the October 28 play session, with the October 30 PhotoHacks retry and the raw captures filed on November 4. These are historical agent records, not human playtest results. Read the [November 4 adjudication and readiness handoff](../readiness-2026-11-04/README.md) before using the historical conclusions as implementation guidance.

## Contents

- `records/` — the demo's five original records: journey, art, coverage, decision and session. Their contents are preserved.
- `evidence/vivid/` — per-beat PNG frames and text dumps for the demo play.
- `evidence/competitors/` — Birdography, Field Guide, PhotoHacks and Pixel Harbor task reports, renders and captures.
- `market-research/` — desk sweeps behind the coverage record.
- `notes/` — the plural-review trail, applied fixes, rectification logs and display audit.
- [Shared historical critique](critique--one-page-2026-10-28.md) — the original conclusions with a dated historical notice and immutable image links to each owning branch.
- `html/` — historical self-contained critique and Vivid coverage renderings with embedded images. They preserve the October content and do not include the November 4 notice or current adjudication. The original Markdown in `records/` remains the historical record.
- `evidence/competitors/<game>/pdf/<task-uuid>/` — raw live browser-task PDFs, filed on November 4 with original filenames. Their page captures support the recorded observations; filing them is not a new play session.

## Evidence classes

Historical `[REAL]` means a frame- or text-layer-verified capture, not human validation. `[SECONDARY]` covers browser-task prose and desk material; `[OPEN]` marks unfinished or unproven work. The current adjudication distinguishes source behavior, visible captured states, task narration and human observations. Filenames sometimes differ from the visible state, so an `ending` filename is not proof of a canonical endpoint. Unsuccessful, contradictory and black captures remain preserved.

## Still open for this demo

Full canonical journeys over the supported HTTP delivery route and the shared alignment-helper layout check are tracked in the current handoff. Required human cohorts, physical-device/accessibility checks and independent human approval remain pending. Iona neutral is an optional additional cohort. Field Guide's creature photograph and populated gallery, Tranquility exploration/photo/album and the unplayed Pathipelago backup remain open research items.

## Filing and provenance

- Play scripts and step logs remain local and are not filed in this package. Their absence limits reconstruction of inputs and timing; it does not erase a visibly captured state.
- HTML review copies, the one-page critique and live browser-task PDFs **are filed**, as listed above. Earlier statements that they were absent were superseded by the November 4 upload.
- Original local `play-2026-10-28/<demo>/` and `play-2026-10-28/competitors/` prefixes map to `evidence/<demo>/` and `evidence/competitors/` here.
- The shared critique is filed across three branches. Its 17 image destinations now pin each asset to its immutable owning commit; the `skribbl-io` directory spelling is corrected. Original records, HTML and raw captures are unchanged.
- Morning-round PDFs are not duplicated where their curated copies are byte-identical. Tranquility PDFs are not filed because no task ID for them is cited in the original records; the failed attempts remain described in the coverage.
- Companion uploads: [Bell](https://github.com/PaperStrange/IndiaGames/tree/3d4e205c417272f00b87c76c00532f4456d31e38/docs/gamejam/competitor-plays-2026-10-28) and [Small Hours](https://github.com/PaperStrange/IndiaGames/tree/45042578e549d0aba3ee10702384d0a86c780aa9/docs/gamejam/competitor-plays-2026-10-28).

For current candidate identity and blank human handoff fields, use [HUMAN-HANDOFF](../readiness-2026-11-04/HUMAN-HANDOFF.md). A historical report saying “ready” is not a release approval.
