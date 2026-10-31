# Adversarial review — live-window update (boss/partner lens, 2026-10-29)

**Verdict: NOT CLEAN.** The demo verdicts stand, and most evidence labels survive
independent checking — but the package as filed contains one factual falsehood
(PhotoHacks "no gameplay"), two struck/superseded claims still asserted
unqualified in main bodies ("1 coal"; Birdography unlock defect), and three
headline overclaims in the delivery documents (Same Bullet "loop proven";
Night OClock "tutorial reached" unlabeled). Those must be fixed before delivery.
Nothing in this review edits a record; all fixes are listed at the end.

**Scope reviewed:** the "Live-window update 2026-10-29" sections in
`records/bell/coverage--bell-0.1.0-2026-10-28.md`,
`records/moments/coverage--small-hours-2026-10-28.md`,
`records/vivid/coverage--vivid-0.1.2-2026-10-28.md`, the three decision briefs
in the same directories, `critique--one-page-2026-10-28.md`, plus
`notes/fold-live-2026-10-29.md` and `notes/live-replay--status-2026-10-28.md`
as the source of truth.

**Method — independent verification, not re-reading the fold:**
- Text layers re-extracted with pdftotext from
  `~/workspace/.hatch-browser/outputs/browser-task:<id>/` for every [REAL]
  anchor cited in the appended sections. Confirmed: ROLLBACK "PROMISE";
  skribbl.io winner screen + 1015 points + "fry" + "sunset"; Gartic album +
  COOLNICKNAME8819; Pixel Harbor "CHARTED!" ×2; Reign Round 3 tokens + Trade +
  End turn; Same Bullet LOOP/ECHOES counters; last seen online Em chat +
  "IT'S ME, LIZ!!"; Drawize "WORD: FORK" + "GAME FINISHED"; Drawasaurus resumed
  "Gucci is drawing _ _ _ _ _ _ _" + "Sorry, you were AFK!".
- Reign demotion confirmed: zero matches for Cleo/Ada/Bram/Brick/Lumber/
  "glowing spot" across all Reign text layers — scores, trade, and prompt
  sentence are correctly [SECONDARY].
- Renders re-read with pdftoppm + visual read: Birdography journal frame
  (clipped "Black-Ca ped Chickade" heading, pixel-art chickadee, forest scene);
  Field Guide menu (island, Start/Gallery/Settings/Quit, orange creature);
  PhotoHacks title/language screen (all elements as captioned); Night OClock
  title (NIGHT O'CLOCK, lantern, Play, GMTK Jam 2025); Same Bullet -12 HUD
  (Loop 02, Echoes 01, Time 4.0 — the counter mapping in the coverage is correct).
- All 10 PhotoHacks PDFs rendered and read (see M1 — this is where the fold
  under-verified: it rendered one and generalized to ten).
- First-person grep (word-boundary) over all appended sections: zero hits.
  Full-file hits are all verbatim quotes (game dialogue, keepsake postcard
  text, Iona's letter, "I don't know" drawer scribble, UI labels).

## Verdicts — do the live results support them?

The demo verdicts stand. The live round changed no demo fact: no demo was
replayed, no demo fix was added, and no new demo defect was found. The
competitor partials and blockeds affect coverage depth, not demo readiness.

- **Small Hours "ready for the human gate": SUPPORTED.** The gate (six real
  pairs) is unrun, but "ready for the gate" means the gate can run, not that
  it passed — and the decision brief states exactly that. The skribbl.io
  completion strengthens, not weakens, the strangers lesson.
- **Vivid "ready for the human gate": SUPPORTED.** Same structure: the gate
  (unprompted returns, notch findability) is unrun and stated as unrun. The
  PhotoHacks correction (M1) changes Vivid's competitor evidence, not the
  demo verdict — but the decision brief's "menu/title only, no gameplay" line
  must still be corrected, because it misdescribes the evidence underneath
  the verdict.
- **Bell "proven end to end, conditional on one in-game line": SUPPORTED WITH
  A WORDING GAP (see S12).** The loop proof rests on the Oct-28 demo play,
  unchanged by the live round. The ROLLBACK patience-mirror lesson is fairly
  drawn. But the critique's verdict line carries only half the condition
  (the one-line fix, not the fresh-player re-test the decision brief requires).

No verdict runs ahead of its evidence at the demo level. The failures below
are in the competitor evidence underneath the verdicts — which is exactly
where the Oct-28 failure lived, and exactly what this review was asked to
catch.

## MUST-FIX

### M1 — PhotoHacks "no gameplay" is FALSE (factual falsehood, all 10 PDFs checked)

**Files:** `records/vivid/coverage--vivid-0.1.2-2026-10-28.md` line 59 and
line 63; `records/vivid/decision--vivid-0.1.2-2026-10-28.md` line 54;
`critique--one-page-2026-10-28.md` line 49; `notes/fold-live-2026-10-29.md`
item 10 (line 58); `notes/live-replay--status-2026-10-28.md` lines 143-147.

**What the renders actually show** (task `d5924a56-ef88-50a7-bb4e-550a335a11df`):
title/language screen (-18); Tutorial Step 1 of 18 (-8: park scene, camera
controls, "find the person in each assignment"); Tutorial Step 2 of 18 (-10,
-12, -15, -19: look-around instruction, AF confirmations, 1/40 F8.0); Paused
screens (-26, -21); black frames (-17, -20, byte-identical renders — the
renderer failing late). That is 5 tutorial gameplay captures, not zero.

**What must change:**
- Vivid coverage line 59: replace "The 10 PDFs carry empty text layers and
  show the title frame, not gameplay. The renderer then went unresponsive
  and no gameplay followed" with the true inventory above: title [REAL] +
  Tutorial Steps 1–2 captured [REAL by render] + pause screens + black frames
  as the renderer failed late. Keep "no assignment photo, no developed-photo
  report [OPEN]" — those stay true.
- Vivid coverage line 63 and Vivid decision line 54: "all three attempts
  blocked or failed" / "(menu/title only, no gameplay)" are wrong for
  PhotoHacks. Correct to: two blocked/failed (Field Guide menu only;
  Tranquility nothing) + one partial (PhotoHacks tutorial reached, core loop
  unplayed). State explicitly whether PhotoHacks counts toward "studied"
  (recommendation: keep studied at 6 with PhotoHacks noted as a partial whose
  core loop is unplayed — but decide and state it; do not leave "6 studied"
  sitting next to tutorial evidence without a word).
- Critique line 49: "PhotoHacks title screen only, no gameplay" →
  "PhotoHacks tutorial Steps 1–2 reached, assignment photo unplayed".
- Fold log item 10: "no gameplay beat exists" is false — tutorial beats
  exist; only the assignment photo/report are [OPEN].
- Status lines 143-147: "No gameplay reached, no beats captured" →
  tutorial Steps 1–2 captured; no assignment photo/report.

**Why this is MUST, not SHOULD:** the fold rendered one PDF (-18) and
generalized to all ten. A boss opening the captures finds tutorial gameplay
the package says does not exist. That is the same class of error as the
Oct-28 "no curtain" falsehood, in the opposite direction (under-claiming a
real beat instead of over-claiming one).

### M2 — The struck "1 coal" claim still stands unqualified in three main bodies

**Files:** `critique--one-page-2026-10-28.md` line 24 ("dug exactly 1 coal",
"at the 1-coal state"); `records/bell/coverage--bell-0.1.0-2026-10-28.md`
line 11 ("one tile yielded 1 COAL (HOLD 1/8) — the only completed beat",
"at the 1-coal state"); `records/bell/decision--bell-0.1.0-2026-10-28.md`
line 42 ("1 coal dug", "at the 1-coal state").

The appended corrections (critique line 47, Bell coverage live update, Bell
decision live update) strike the claim — but a reader who reads the main
body and stops leaves with the false fact. The critique is a one-page
delivery document; its main body is what gets read.

**What must change:** add an in-place strike annotation at EACH main-body
occurrence, e.g. "[STRUCK 2026-10-29 — HOLD 1/8 is not verified coal; see
Live-window update]". Append-only preservation of history is acceptable;
leaving the struck fact asserted without qualification in the body is not.
Note the Bell coverage row 2 occurrence also carries "the only completed
beat" — the annotation must cover that clause too, since the "completed
beat" framing dies with the coal claim (the beat is "HOLD 1/8, ore
unverified").

### M3 — The resolved Birdography defect still drives a lesson in the critique main body

**File:** `critique--one-page-2026-10-28.md` line 20.

The bullet asserts the journal "does not match what the player actually
photographed" and draws the lesson "Birdography shows what happens without
it [exactness]". The live update resolves the defect (fixed species order,
[SECONDARY]) — which removes the negative example the lesson leans on.
Birdography's feedback now matches what the player did; it no longer
demonstrates "what happens without exactness".

**What must change:** annotate line 20 in place ("Defect resolved
2026-10-29: journal entries sit in fixed species order — see Live-window
update") and reword the lesson so it rests on Vivid's own exactness
(marks→signal), not on Birdography as a cautionary tale. (The Vivid
coverage history row 1 still contains the defect text, but its own live
update explicitly supersedes it — acceptable there; the critique is the
delivery document, so the critique fix is mandatory.)

### M4 — "Same Bullet loop proven" overclaims what the captures prove

**Files:** `records/bell/coverage--bell-0.1.0-2026-10-28.md` line 56;
`records/bell/decision--bell-0.1.0-2026-10-28.md` line 54;
`critique--one-page-2026-10-28.md` line 48.

What the captures prove (verified by this review's own render of -12):
loop counters advanced, LOOP 01/ECHOES 00 → LOOP 02/ECHOES 01, with a bullet
in flight in Loop 02. What they do NOT prove: that the Loop 02 bullet is
the replayed echo of the Loop 01 shot, or the ricochet / pass-through
behavior. The Bell coverage hedges this in its second sentence (mechanic
description [SECONDARY]) — but the headline word "PROVEN" + [REAL] will be
the part quoted, and the decision brief and critique repeat "loop proven"
with no qualification at all.

**What must change (all three files):** "loop advance proven (counters
LOOP 01/ECHOES 00 → LOOP 02/ECHOES 01) [REAL]; echo-replay, ricochet, and
pass-through behavior [SECONDARY]". Room 1 uncleared stays [OPEN] as stated.

### M5 — Night OClock "tutorial reached" is unlabeled in the summary documents

**Files:** `critique--one-page-2026-10-28.md` line 48; `records/bell/decision--bell-0.1.0-2026-10-28.md` line 54.

Both state "tutorial reached" as flat fact. The only [REAL] Night OClock
capture is the title screen (verified by this review's render); corridor,
camera area, and tutorial are task prose. The Bell coverage (line 57)
labels this correctly ([SECONDARY], "prove nothing beyond the title
screen") — the summaries drop the label, which is precisely the Oct-28
pattern (confident summary over [SECONDARY] prose).

**What must change (both files):** "Night OClock tutorial reached
[SECONDARY — only the title screen is [REAL]]".

### M6 — Status file: Tranquility first-window paragraph is headerless and misfiled

**File:** `notes/live-replay--status-2026-10-28.md` lines 148-154.

The direct-embed Tranquility story (97% loader, 3h01m; itch retry blocked;
fallback rule) sits directly under the PhotoHacks entry with no header of
its own, while the proper Tranquility retry entry exists earlier in the
file. A reader attributes the 97% paragraph to PhotoHacks.

**What must change:** give lines 148-154 their own header ("- Vivid:
Tranquility (first window, direct embed) — FAILED") and move the paragraph
out from under the PhotoHacks entry.

## SHOULD-FIX

### S1 — State whether second-deep [OPEN] blocks the 20 November gate or is accepted

**Files:** `critique--one-page-2026-10-28.md` live update (line 52 area);
`records/bell/decision--bell-0.1.0-2026-10-28.md` live update;
`records/moments/decision--small-hours-2026-10-28.md` live update.

The live round tried to close the second deep comparison for Bell and
Moments and failed (all expansion plays partial). The documents record
[OPEN] but never say whether [OPEN] blocks the gate. The Bell decision's
condition is only the one-line fix + re-test, which implies second-deep
[OPEN] does not block the choose — but implication is not a decision.
**Change:** one explicit sentence in each of the three places: second-deep
[OPEN] is accepted as a known coverage gap that does not block the gate
(or, if it does block, say so and name the closing action).

### S2 — Carry the Moments cap breach into the critique (the delivery document)

**File:** `critique--one-page-2026-10-28.md` live update.

The nine-title draw-guess cap breach (skribbl.io, Drawize, Drawasaurus = 3)
is stated honestly in the Moments coverage (line 63) but appears nowhere
in the critique or the Moments decision. A boss reading only the critique
never learns the template was exceeded. **Change:** one line in the
critique live update noting the cap breach and that the cap still holds
for the original six.

### S3 — "Deliberately oversampled" overstates intent

**File:** `records/moments/coverage--small-hours-2026-10-28.md` line 63.

The three Moments expansion titles were the first three opened per demo,
not a deliberate oversampling strategy; the draw-guess concentration was
a consequence of play order. **Change:** drop "deliberately" ("the
expansion oversampled draw-guess while chasing the Moments gap") or
justify the word with evidence of a deliberate choice.

### S4 — Harmonize studied/attempted terminology across the three revised checks

**Files:** all three coverage live updates.

Vivid says "9 titles attempted, 6 studied"; Bell and Moments say "9
titles" with no split. A reader comparing files cannot tell whether
Bell/Moments claim 9 studied. **Change:** adopt one split everywhere —
e.g. Bell/Moments: "9 titles in the set (6 original + 3 partials; partials
count as studied, blocked attempts do not — cf. Vivid)". (After M1,
Vivid's split becomes "9 attempted: 6 studied + 1 partial (PhotoHacks
tutorial) + 2 blocked/failed".)

### S5 — Bell revised check should restate the browser-edition count

**File:** `records/bell/coverage--bell-0.1.0-2026-10-28.md` revised coverage
check.

The original check's "1 confirmed + 1 partial" browser-edition accounting
is left stale by the expansion. **Change:** restate — 5 first-hand browser
attempts (ROLLBACK complete; Core Rush, Same Bullet, Night OClock,
last seen online partial) — so the template's planned minimum of 2 reads
cleanly against the new set.

### S6 — last seen online coverage lacks the continuation's final stamp

**File:** `records/bell/coverage--bell-0.1.0-2026-10-28.md` last seen online
bullet.

The bullet covers the continuation's substance (windows closed, LoseAmp
alone, full Em chat re-read, no code) but not its final outcome: the
continuation FAILED final (2026-10-29 02:30 PDT, total run 4h28m), ZIP
window left open in t7 with 3142 entered, t6 also open. **Change:** add the
final stamp and tab state (both from the status file).

### S7 — Drawasaurus resumed paragraph omits the resumed run's later rounds

**File:** `records/moments/coverage--small-hours-2026-10-28.md` Drawasaurus
bullet.

The paragraph covers the receipt-verified beats (Gucci drawing, AFK
banner) but not the resumed run's later rounds from the status file
(Round 3/3 re-observation; SHOES/SCISSORS/LIP BALM rounds; Gucci CUPCAKE,
sunflower WAFFLES; sunflower 431, MuseWatcher 38) before the room closed
at "Room doesn't exist!". **Change:** one clause covering the later rounds
so the paragraph does not read as if the resumed run ended at the AFK banner.

### S8 — Reign "real play" needs its attribution (user placed the setup)

**Files:** `records/moments/coverage--small-hours-2026-10-28.md` line 55;
`records/moments/decision--small-hours-2026-10-28.md` line 53.

"Real play to Round 3" / "first real play" read as agent play. The status
file and interaction note establish the setup (2 settlements + 2 roads)
was placed by the user during takeover, and turns were played via
reference clicks. **Change:** one clause in each file attributing the
setup to the user takeover and the turns to reference clicks. This is
honesty about who played, not a downgrade of the Round 3 evidence (the
Round 3 tokens in the text layer are [REAL] either way).

### S9 — Field Guide menu render: note the clipped title, as the Birdography caption does

**File:** `records/vivid/coverage--vivid-0.1.2-2026-10-28.md` Field Guide
bullet.

The menu render clips the title's right edge ("Field Gui" visible); the
menu identification rests on the buttons + island + creature, which is
sufficient — but the Birdography caption honestly notes its own clipped
heading while the Field Guide caption does not note its clip. **Change:**
one clause noting the title clip. (Caption honesty is the standing
standard; this is symmetry, not a substantive doubt.)

### S10 — Fold log base directory is wrong

**File:** `notes/fold-live-2026-10-29.md` line 22.

"Base dir: `~/.hatch-browser/outputs/`" — that path contains nothing; the
captures live under `~/workspace/.hatch-browser/outputs/`. Anyone following
the stated path finds no evidence. **Change:** correct the path. (The
coverage files cite task IDs only and are unaffected.)

### S11 — Status file stale status line

**File:** `notes/live-replay--status-2026-10-28.md` line 162.

"Status as of 2026-10-29 00:37 PDT: all 9 working, none waiting on a
question" sits below 02:30 entries. It is dated, so it is not false — but
as the source of truth it misleads. **Change:** strike it or update it to
the final state.

### S12 — Critique Bell verdict line should carry both conditions

**File:** `critique--one-page-2026-10-28.md` verdicts section.

"What it needs is one in-game line stating its advance rule, not a
redesign" omits the fresh-player re-test that the decision brief requires
and that action 1 includes. **Change:** "one in-game line stating its
advance rule, then a fresh-player re-test" — so the headline condition
matches the brief.

## What the review confirms (for the record)

- **Tone: PASS.** Zero first-person hits in all appended sections; all
  full-file hits are verbatim quotes. No claim/evidence/label block in the
  appended sections is unlabeled prose, except the summary-bullet labels
  fixed by M4/M5.
- **Honesty strengths, stated plainly (not buried):** second-deep family
  [OPEN] in all three coverage updates, both affected decision briefs, and
  the critique; Drawasaurus drawing turn NEVER completed (coverage,
  decision, critique); last seen online gate [OPEN] with the 3124/1243/
  3142 distinction preserved ("no unlock observed", not "wrong"); Core Rush
  HOLD≠coal correction present in all three appended sections; official-site/
  video records stated as file-keeping only, never completing a slot
  (critique live update; fold log item 16); blocked plays stay [OPEN].
- **No blocked play is presented as completed.** No official-site/video
  record is used as verdict support (none were collected in this fold).
- **20 November actions:** the same five, correctly unchanged. The live
  round adds no new demo action and removes none. The tooling note
  (page_busy across canvas/WebGL boards) is a method observation, not a
  sixth action — but see S1 for the disposition it leaves open on the
  [OPEN] coverage items.

## Fixes required before delivery (exact list)

**MUST (delivery blocked until applied):** M1 (PhotoHacks correction in
5 files + studied-count disposition); M2 (in-place "1 coal" strike
annotations in critique line 24, Bell coverage line 11, Bell decision
line 42); M3 (critique line 20 annotation + lesson reword); M4 ("loop
advance proven" reword in Bell coverage line 56, Bell decision line 54,
critique line 48); M5 ([SECONDARY] + title-only note in critique line 48
and Bell decision line 54); M6 (status lines 148-154 header + move).

**SHOULD (apply with the MUST fixes; none blocks alone):** S1 (second-deep
disposition vs gate); S2 (cap breach line in critique); S3 (drop
"deliberately"); S4 (studied/attempted split everywhere); S5 (Bell
browser-edition restatement); S6 (last seen online final stamp); S7
(Drawasaurus later rounds clause); S8 (Reign setup attribution); S9
(Field Guide title-clip clause); S10 (fold log base path); S11 (status
stale line); S12 (critique Bell verdict line: fix + re-test).
