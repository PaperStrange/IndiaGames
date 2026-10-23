# Rebuild review record — embedded galleries + organized structure (2026-10-22)

The records were rebuilt from complete checkouts of this branch: every record now carries an
embedded evidence gallery (66 images across the three packages; PDF captures rendered as page
views, PNG captures embedded as-is), and `captures/` was reorganized to `evidence/` (originals)
with `evidence/img/` (embedded views). The rebuild then went through the coordinator's own audit
plus two independent reviews (full reports in this folder: rebuild-review-A-adversarial.md,
rebuild-review-B-mistake-hunt.md).

Review B (mechanical): PASS on all checks — 66/66 embeds resolve, 63/63 capture originals
embedded or cited, zero stale `captures/` references outside notes/, change scope confined to
the package. Its one finding (Fireboy shell renders 02/03 and 04/05 are visually identical
pairs) is fixed by the disclosure note in the Fireboy record's gallery.

Review A (adversarial, caption-vs-image): NOT CLEAN as filed — 3 FAIL + 5 MUST-FIX across the
three packages; every item was verified against the files by the coordinator before fixing
(reviewer-claims-verified rule) and all fixes were applied before this rebuild was pushed.
This package's items:

- M3: Galatea's rendered views clip long transcript lines mid-word at the PDF's right edge
  (print artifact; the filed PDFs' text layer is complete). A note in the Galatea gallery
  states this plainly.
- M4: the Rhythm Doctor market record cited a non-resolving path for the access-check record.
  Citation corrected to ../records/rhythm-doctor--access-check-2026-10-20.md.
Coordinator's own audit (before the reviews) also rewrote the three Friday Night Funkin' shell
captions after inspecting every page of those captures (one prints completely blank) and
corrected the gallery intro wording in 23 files.
