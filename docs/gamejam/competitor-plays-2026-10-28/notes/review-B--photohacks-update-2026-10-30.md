# Review B (mistake-hunt) — PhotoHacks update 2026-10-30

Scope: the scoped 2026-10-30 update that moved PhotoHacks from "title + Tutorial
Steps 1–2 only" to "Arcade Level 1 assignment completed (photo 94/100, Level
cleared)" in two files only:
- `critique--one-page-2026-10-28.md`
- `records/vivid/coverage--vivid-0.1.2-2026-10-28.md`

New render: `competitors/photohacks/render-assignment.png`.
Reviewer did NOT edit any package file. Every finding below was verified against
disk in this session.

## Method

- Counted embeds with grep and resolved every path against its file's own base
  directory (package root for the critique, `records/vivid/` for the coverage).
- Decoded every `data:image` URI in both rebuilt HTMLs and compared bytes, in
  order, against the md embeds.
- Read `render-assignment.png` itself (100 DPI render of the retry result PDF).
- Read the retry briefing and cleared renders via the parent's 00:20 session
  reads (not re-read by this reviewer — see "Not verified by this reviewer").
- Extracted text layers from retry PDFs (briefing, result, tutorial-complete):
  they carry only the itch.io page text, not the game screens — the game canvas
  has no text layer. Game-screen claims therefore rest on renders + task prose,
  never on text layers.
- Diffed the Vivid coverage against `notes/coverage-pre-reorg-2026-10-29/vivid.md`.
  No critique backup exists, so critique collateral was checked by section-header
  inventory + full embed inventory instead.

## Verified OK

1. Critique embeds: 17 total, all resolve, no duplicates, no missing files.
   Composition is exactly 16 PNG + 1 GIF (the GIF is the Gartic album), so the
   L48 count line "17 items (16 PNG frames + 1 GIF)" is correct.
2. Vivid coverage embeds: 6 total, all resolve, no duplicates, no missing files.
3. `render-assignment.png` exists: 424,073 bytes, PNG 850×1100. It is the file
   both embeds point to (critique L76, Vivid L72, with the correct relative
   path for each file's base).
4. Both rebuilt HTMLs match their md files exactly: critique 17 `data:image`
   URIs = 17 md embeds, Vivid 6 = 6, and every URI is byte-identical to its md
   embed, in order. The assignment render sits at position 16/17 (critique)
   and 6/6 (Vivid).
5. Task IDs are exact in the Vivid bullet (L70): first attempt
   `browser-task:d5924a56-ef88-50a7-bb4e-550a335a11df`, retry
   `browser-task:77c5775a-843e-5f13-92a8-915d431284d2`, retry date 2026-10-30.
   The critique cites no browser-task IDs anywhere (0 occurrences) — its new
   bullet's lack of a task ID is consistent with the critique's own practice;
   traceability lives in the Vivid bullet. No finding.
6. Captions match the frame read by this reviewer: the result screen shows the
   park photograph (person in red beret, black shirt, red leggings, walking a
   small brown dog, full body), "94 / 100", 5 stars, "150 CREDITS",
   "24 mm · f/5.6 · 1/800 s · ISO 100 · Focus 10.81 m",
   "Best of the assignment: 94/100 · 4 shots left". Vivid caption L73 and
   critique alt text L76 both describe this frame accurately.
7. Vivid diff vs the pre-reorg backup shows exactly the expected scope: the
   2026-10-29 persuasiveness drops (tutorial embed → display note, pause embed
   removed), the PhotoHacks bullet rewrite + new embed + caption, and the new
   coverage-check bullet. No other section changed.
8. Critique structure intact: 6 section headers, unchanged order. The dropped
   files (Drawize FORK, Field Guide pause) remain absent from the critique's
   embeds; the pre-existing 42-reveal embed still carries its corrected
   caption ("private choice screen ... not the pair reveal").
9. No stale PhotoHacks reference remains elsewhere: the only PhotoHacks lines
   in the Vivid file are the display note (L52, still accurate — the tutorial
   render stays dropped, the assignment render is a different file), the bullet
   (L70), the embed + caption (L72–73), and the check bullet (L78). The only
   PhotoHacks lines in the critique are L48, L74, L76.

## MUST — 0

No factual error, broken reference, or miscount found. Nothing blocks the update.

## SHOULD — 2

### S1. Vivid L77 is stale next to the new L78 (internal contradiction in the check)

L77 still reads: "Studied count unchanged: 6 studied ... The expansion added
zero studied competitors — all three attempts blocked or failed. The
photo-family depth still rests on Birdography + Pixel Harbor." L78 (the update)
then states 6 → 7. A reader doing the arithmetic hits "unchanged / zero" and
then "6 → 7" in adjacent bullets.

Proposed fix (minimal, preserves the audit trail): reword L77 into past tense,
e.g. "Studied count through 2026-10-29: 6 studied ... The expansion had added
zero studied competitors until the PhotoHacks retry (see next bullet). The
photo-family depth rested on Birdography + Pixel Harbor."

### S2. Vivid L70 tag scope is imprecise in two small places

(a) "[REAL render, embedded below]" sits after "Level cleared", but the
embedded render is the RESULT screen; "Level cleared" itself lives in a
separate PDF (retry beat f30), cited by task ID, not embedded. Proposed fix:
"... result 94/100 + 150 credits [REAL render, embedded below], Level cleared
[PDF-cited via the retry task ID]."

(b) The briefing parenthetical details "navy shoulder bag; 5 shots, minimum
score 50" are not visible in the briefing render — the panel's right edge is
clipped by the PDF page itself, and the retry PDFs' text layers carry only the
itch page, not the game screens. Those three details rest on the retry task's
prose, not on a verified frame. Proposed fix: append a short scope note to
the bullet, e.g. "Briefing details and the tutorial step list rest on the
retry task's beat list; the embedded render verifies the photograph and its
result." (The payoff claims — photograph, 94/100, 150 credits, Level cleared —
are confirmed by renders + the beat list and are not in question.)

## Reclassification confirmation (L78: 6 → 7)

CONFIRMED as consistent. One complete assignment with a scored report meets
the same "completed activity" bar as the existing studied titles (Birdography
photo→journal ×2, Pixel Harbor 2 puzzles solved). Family cap holds: photo
puzzle now 2 (EOS + PhotoHacks), within the max-2 cap. Deep comparisons are
unaffected (Birdography + Pixel Harbor remain the deep pair). The
"pending plural-review confirmation" note is satisfied on the mistake-hunt
side by this review; the adversarial side's confirmation is still separate.

## Not verified by this reviewer (stated, not hidden)

- The tutorial-complete screen (retry beat f25) and the Level-cleared screen
  (retry beat f30): not re-read by this reviewer; they rest on the parent's
  00:20 reads + the retry task's beat list.
- The tutorial step list (Steps 1–7, 10–13, 15–17 completed; 8–9 skipped;
  14/18 unseen as separate dialogs): rests on the retry task's prose, as do
  all other live-window beats in the package. No contradiction found.
- The audit-note edit (`notes/photo-persuasiveness-audit-2026-10-29.md`) was
  outside this review's assigned scope and was not checked.

## Verdict

PASS WITH FIXES — 0 MUST, 2 SHOULD (S1 stale check sentence, S2 tag scope).
Apply S1 + S2, then the update is clean to file.
