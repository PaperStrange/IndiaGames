# Bell 0.1.0 — demo records + competitor plays, 2026-10-28

Reviewed package from the 2026-10-28 play session (plus the 2026-10-30
PhotoHacks retry where noted in the Vivid coverage). Original observations and
historical conclusions are filed together; their evidence limits remain visible.
For the current decision, start with the [November 4 readiness adjudication and
human handoff](../readiness-2026-11-04/README.md).

## Contents

- `records/` — the demo's five original records: journey, art, coverage,
  decision, session (markdown). Embeds resolve within this tree.
- `evidence/bell/` — per-beat PNG frames + text dumps for the demo play.
- `evidence/competitors/` — competitor studies cited by the coverage record:
  core-rush, last-seen-online, night-oclock, rollback, the-same-bullet (task reports, renders, captures).
- `market-research/` — desk sweeps behind the coverage record.
- `notes/` — the plural-review trail for this package (adversarial +
  mistake-hunt reviews and applied fixes, rectification logs, display audit).

## Evidence classes

[REAL] = frame- or text-layer-verified captures. [SECONDARY] = browser-task
prose (competitor live rounds). [OPEN] = unfinished, listed below and in the
session record. Unsuccessful and contradictory experiences are preserved, not
cleaned up. Filenames in places differ from content (audited 2026-10-29);
captions describe the frame, not the filename.

## Current open work

Technical phase/anchor/Fracture verification and real human studies remain separate workstreams; see the [readiness dashboard](../readiness-2026-11-04/README.md). The historical one-line advance-rule proposal is not an approved runtime patch: predictions are optional, map destinations are buttons, and the older patch spec quotes a different stage copy. No routine copy change is selected before human evidence unless an actual visible-control defect is reproduced.

The October 28 agent session did not cover Fracture 4 or a full Original run. That session limit is not a statement about all technical checks. Competitor gaps remain: ROLLBACK's other 7 endings; Core Rush's loop reset; Same Bullet Room 1; Night OClock carry-over; last seen online photos4em.zip (3124 reported wrong; 1243/3142 produced no observed unlock). The missing second completed deep comparison is a research gap, not an added release gate.

## Notes on this filing

- Play scripts and raw execution logs remain local only. The historical critique,
  self-contained HTML review copies and cited live browser-task PDFs are now filed
  below. Their presence improves inspectability; it does not add human results.
- Local path mapping: the records' original `play-2026-10-28/<demo>/` and
  `play-2026-10-28/competitors/` prefixes map to `evidence/<demo>/` and
  `evidence/competitors/` here.
- Companion packages: [Small Hours](https://github.com/PaperStrange/IndiaGames/tree/45042578e549d0aba3ee10702384d0a86c780aa9/docs/gamejam/competitor-plays-2026-10-28) and [Keeper's Frame](https://github.com/PaperStrange/IndiaGames/tree/b9e1560cc641691bc8d48b4254cab0bac73fe64c/docs/gamejam/competitor-plays-2026-10-28).

## Derived documents and raw captures

How the non-record files relate to `records/`:

- [Historical critique](critique--one-page-2026-10-28.md) — package-wide conclusions
  drawn from the records. Its claims remain historical; the readiness adjudication
  supplies current corrections. Images use pinned raw links to each owning branch
  so this Markdown is viewable independently.
- `html/` — self-contained renderings of the markdown (base64-embedded
  images) for readers whose viewer cannot render markdown image embeds. Content
  reflects the archived report and this branch's coverage record. These historical
  HTML bytes are preserved; the Markdown critique now adds a dated notice and
  repaired image destinations. The five Markdown files in `records/` remain original.
- `evidence/competitors/<game>/pdf/<task-uuid>/` — the raw browser-task PDF
  captures BEHIND the competitor records, original filenames, one subdir per
  cited task. The renders in the parent dir are conversions of these pages.
  Shells and black frames are preserved, not cleaned: a canvas that prints
  blank stays blank here, and the records say so. Morning-round tasks are not
  duplicated: their beat PDFs are already filed in curated form in the parent
  dir (verified byte-identical). Tranquility captures are not filed: no task
  ID for them is cited in the filed records (the failure is recorded in prose
  in the Vivid coverage).

