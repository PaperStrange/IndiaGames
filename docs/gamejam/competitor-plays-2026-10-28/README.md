# Small Hours — demo records + competitor plays, 2026-10-28

Reviewed package from the 2026-10-28 play session (plus the 2026-10-30
PhotoHacks retry where noted in the Vivid coverage). Observations, not
conclusions: the one-page critique is not filed here.

## Contents

- `records/` — the demo's five original records: journey, art, coverage,
  decision, session (markdown). Embeds resolve within this tree.
- `evidence/moments/` — per-beat PNG frames + text dumps for the demo play.
- `evidence/competitors/` — competitor studies cited by the coverage record:
  drawasaurus, drawize, gartic-phone, skribbl-io (task reports, renders, captures).
- `market-research/` — desk sweeps behind the coverage record.
- `notes/` — the plural-review trail for this package (adversarial +
  mistake-hunt reviews and applied fixes, rectification logs, display audit).

## Evidence classes

[REAL] = frame- or text-layer-verified captures. [SECONDARY] = browser-task
prose (competitor live rounds). [OPEN] = unfinished, listed below and in the
session record. Unsuccessful and contradictory experiences are preserved, not
cleaned up. Filenames in places differ from content (audited 2026-10-29);
captions describe the frame, not the filename.

## Still open for this demo

six-pair human gate; true two-person play (needs humans); Gartic Normal multi-human session; Drawasaurus agent drawing turn; Drawize agent drawing turn + submitted guess.

## Notes on this filing

- Play scripts and logs intentionally NOT filed (local only); neither are HTML
  review copies, the one-page critique, or live browser-task PDFs (cited by
  task ID in-record).
- Local path mapping: the records' original `play-2026-10-28/<demo>/` and
  `play-2026-10-28/competitors/` prefixes map to `evidence/<demo>/` and
  `evidence/competitors/` here.
- Companion packages: Bell on the-thirteenth-bell, Keeper's Frame on vivid-2.5d-photo-game.

## Derived documents and raw captures

How the non-record files relate to `records/`:

- `critique--one-page-2026-10-28.md` — conclusions drawn FROM the records
  (the one-page report). The same file is filed on all three branches; it is
  package-wide, so its embeds point at `evidence/` paths that resolve fully
  only across the three branches together (each branch holds its own demo's
  evidence). The self-contained HTML beside it resolves fully on every branch.
- `html/` — self-contained renderings of the markdown (base64-embedded
  images) for readers whose viewer cannot render markdown image embeds. Content
  is identical to the markdown: the critique plus this branch's coverage
  record. The markdown in `records/` remains the original.
- `evidence/competitors/<game>/pdf/<task-uuid>/` — the raw browser-task PDF
  captures BEHIND the competitor records, original filenames, one subdir per
  cited task. The renders in the parent dir are conversions of these pages.
  Shells and black frames are preserved, not cleaned: a canvas that prints
  blank stays blank here, and the records say so. Morning-round tasks are not
  duplicated: their beat PDFs are already filed in curated form in the parent
  dir (verified byte-identical). Tranquility captures are not filed: no task
  ID for them is cited in the filed records (the failure is recorded in prose
  in the Vivid coverage).
