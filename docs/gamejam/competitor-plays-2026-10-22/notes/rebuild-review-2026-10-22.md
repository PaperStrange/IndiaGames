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

- F1 (FAIL): the A Dark Room re-verification screenshot is a blank white frame (1 unique pixel
  value) captioned as a scene. Caption now discloses the blankness; the README count reads
  "4 legible screenshots + 1 blank capture"; the record's moment rests on the session account.
- F2 (FAIL): Anchorhead beat 3 claimed the day's "full scrollback"; the file is one page,
  349 words, Observatory segment only (0 hits for Verlac/File Room). Evidence line and caption
  corrected; the file renamed to anchorhead-beat3-hidden-observatory.pdf (study source synced).
- F3 (FAIL): Detective caption said "office door"; the image and the playtest journal both say
  bathroom, door "05". Caption corrected in both Detective records.
- M1: Outer Wilds / Into the Breach "about-sysreq" embeds showed page 1 (a second top view).
  Re-rendered from the actual About pages (OW p.2, SysReq p.3 noted; ItB p.2 holds both) and
  captions corrected.
- M2: the Detective replay record embedded the Oct-06 session's screenshots unattributed,
  against its own "eyewitness only" addenda. Attribution note added to its gallery.
Coordinator's own audit (before the reviews) also fixed: the missed-messages render filename
(zero-padded by a 10-page PDF), the HorrorGuessr "20 m" caption (frame reads 13 m), three
FNF shell captions, and the gallery intro wording in 23 files.
