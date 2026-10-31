# Adversarial review — RECTIFIED package (boss/partner lens) — 2026-10-29

Reviewer: adversarial (boss/partner lens). Scope: the CURRENT state of
`~/workspace/gamejam-studies/play-2026-10-28/` — 15 records
(`records/{bell,moments,vivid}/{journey,art,coverage,decision,session}--*.md`)
+ `critique--one-page-2026-10-28.md` (79 lines, 16 embeds: 15 PNG + 1 GIF,
verified by grep count). This review covers the package AFTER the gallery
expansion (107 record embeds) and both rectification passes (docs + files
audit + follow-up addendum), not the overnight state. No record was edited;
only this report file was written. Nothing was filed, pushed, or committed.

Reference read (read-only): `notes/rectification-docs-2026-10-29.md` (both
passes + addendum), `notes/rectification-files-2026-10-29.md`,
`notes/gallery-expansion-2026-10-29.md`, `notes/fold-live-2026-10-29.md`.

## Independent verification performed by this reviewer (not trusted from logs)

- Read all 16 embeds' files exist (grep count) and read the two newest, highest-risk
  critique embeds visually: `competitors/night-oclock/render-corridor-1.png`
  (Unity corridor strip, timer 0:43, skull icon, WASD sign — caption accurate)
  and `competitors/field-guide/render-ingame-1.png` (low-poly island over water,
  red + green segmented bars top-left, no creature visible — caption accurate).
- Fresh-rendered the remaining Night OClock strip sources from the live task dir
  (`browser-task:cacaafa1-36fc-5dbb-81ce-05a5ef25e0eb`) and read each: -16a
  (0:16, clock item on corridor floor), -16b (0:19, WASD sign), -21 (0:20,
  SHIFT/RUN sign + character in corridor), -18 (0:02, green-lit corridor view).
  All five strip types in the critique's claim are now confirmed by this
  reviewer's own reads, not only by the files audit's strip list.
- Fresh-rendered Field Guide live PDF -5 (`browser-task:193f9044-…`) and read it:
  pause menu (Resume / Main Menu / Settings / Quit) over a dimmed island scene,
  health/stamina bars top-left. The critique's "pause menu [REAL renders]" claim
  is independently confirmed, even though the pause frame itself is cited, not
  embedded (disclosed in the addendum's remaining gaps).
- Grep checks across all 16 files: "first-hand" (coverage hits are only inside
  [Rectified …] traceability notes, plus one stale phrase — see S2); "studied"
  (6 studied per demo; expansion titles attempted, not studied; Field Guide NOT
  studied); "coal" (all remaining hits are explicit struck/correction mentions);
  "Sakura" in the critique (zero hits); first-person tokens (all inside verbatim
  game/chat quotations — see §3); stale "13" counts in the critique (none).
- Cross-checked the three decision briefs' verdicts against the critique's
  verdicts, and the coverage live-update sections against the critique's
  live-update bullets. No verdict contradiction found.

## 1. Verdict integrity — the three demo verdicts follow from the evidence

- **Small Hours: ready for the human gate.** Supported by first-hand Playwright
  pair flow (curtain → choice → seal → reveal → detail → keepsake → verified
  1,425-byte SVG download) with frames for every beat. The verdict is "ready
  for", not "passed": the decision brief states the gate's job is "the one thing
  a solo operator cannot prove — six real pairs", and the critique states "What
  it needs is humans, not fixes." No operator play is upgraded to pair proof
  anywhere. The solo rehearsal is labeled rehearsal, not the game moment.
- **Vivid 0.1.2: ready for the human gate.** Supported by first-hand Iona ending
  (74-iona-ending frame: "The ferry is safely home" + return question) + return
  payoff (68-private-letter frame: the letter panel visible in frame) + Mara
  ending (43-mara-ending). The gate questions (unprompted returns, notch
  findability) are stated as unrun, and Iona neutral profile is [OPEN]
  (optional). The m5/n0 caption disclaimers are honest: m5 shows configured
  signal controls, not the ferry-home panel; n0 shows the letter action with
  the stale "not offered" sublabel, letter text in its dump only.
- **Bell 0.1.0: proven end to end, conditional.** The condition is IN the verdict
  bullet itself (one in-game line stating the advance rule + fresh-player
  re-test), repeated in the live update and in the decision brief ("conditional
  on one fix"). Scope is honest: "end to end" refers to the Contrast loop
  (witness → anchor → Loop 2 → prepare → Mina at the well, bell19); the
  Original run, previous-Contrast comparison, and Fracture 4 are listed as
  unplayed and folded into the human-gate plan, not silently dropped.

No headline outruns its support. The one place a headline could mislead —
Bell "proven end to end" — carries its condition in the same bullet.

## 2. Evidence class / provenance — the mandatory question, answered

**Is the evidence the right class for each verdict it supports? Largely yes,
after rectification. The two highest-risk upgrades check out; the remaining
issues are wording precision, not class errors.**

- **ROLLBACK's ending.** Correctly classed everywhere now: text-layer state
  markers only (RUN 2 @ desk, 03:32, "PROMISE", "restore_policy: DISABLED."),
  no visible ending frame exists, canvas prints blank. The critique states this
  beside the claim in BOTH the main bullet (Rectified note, L31) and the
  live-update bullet (L54), and the Evidence section (L48) repeats it. The
  ending illustration is labeled task prose [SECONDARY]. No blank-monitor
  render is embedded as gameplay; ROLLBACK has no embed at all, correctly.
  The Bell coverage row (L10) states "render-verified page shells — no visible
  ending frame exists; the evidence is the task's textual report." PASS.
- **Night OClock corridor upgrade (the biggest class change in this pass).**
  The critique's live-update bullet (L69) now claims corridor + tutorial signs
  reached [REAL render strips]. This reviewer independently confirmed all five
  strip types from the live task's PDFs (see verification above). The Bell
  coverage row (L57) and Bell decision expansion line agree, with the honest
  boundary: "Corridor play beyond those strips and the camera area remain task
  prose [SECONDARY]." Carry-over stays [OPEN] (no item pickup, inventory
  screen, or victim puzzle). Night OClock stays partial, not studied. PASS.
  Note the provenance subtlety the addendum already discloses: the corridor
  evidence rests on live-task PDF renders, and the embedded corridor render is
  one strip (-14); the other strips are cited from render reads, not embedded.
  That is disclosed, not hidden.
- **Field Guide in-game upgrade.** The critique's blocked/failed bullet (L71)
  now claims menu + in-game island view + pause menu [REAL renders], no creature
  photo or gallery entry. All three verified: menu (previously verified),
  in-game -3 (read by this reviewer), pause -5 (fresh-rendered and read by this
  reviewer). Field Guide remains NOT a studied competitor and [OPEN] for its
  goal (photo + gallery). The Vivid coverage bullet (L57) matches, including
  the kept replay-directory note and the open round-authority question (see
  carried-open items). The earlier "must NOT be presented as beats" concern
  about empty-text-layer PDFs is resolved correctly: empty text layers are
  unidentified canvas states, not proof of menu-only play, and the -3/-5
  frames are now identified by render reads. PASS.
- **Partial/blocked plays are not presented as completed or studied.**
  Checked each: Field Guide (attempted, NOT studied, [OPEN]); Night OClock
  (partial, not studied, carry-over [OPEN]); Tranquility (failed twice, no
  beats, camera bug unobserved not absent, [OPEN]); PhotoHacks (title +
  Tutorial Steps 1–2 [REAL capture], core loop [OPEN]); Reign (Round 3,
  road never placed, [OPEN]); Drawasaurus (guessing only [SECONDARY],
  drawing turn never completed, [OPEN]); Same Bullet (counters [REAL],
  echo behavior [SECONDARY], Room 1 uncleared [OPEN]); last seen online
  (desktop [SECONDARY], zip gate [OPEN], 3124 confirmed wrong, 1243/3142
  no unlock observed, no brute force claimed); Core Rush (partial,
  HOLD 1/8 not coal, loop [OPEN]); Drawize (Quick Draw session finished,
  no submitted guess, [OPEN] — see S3 for a wording nit). Studied counts
  are 6 per demo (original six) with expansion titles attempted, not studied,
  stated in all three coverage files and the critique. PASS.
- **Browser-task prose is [SECONDARY], never [REAL].** The rectification
  replaced "first-hand" with "browser-task" throughout the coverage files;
  remaining "first-hand" hits are inside [Rectified …] traceability notes
  (except S2's stale phrase). Demo Playwright play keeps "first-hand [REAL]"
  legitimately — those captures are genuinely first-hand. The Moments
  coverage class split (capture-text-verified [REAL] vs task-report prose
  [SECONDARY]) is stated explicitly. PASS, with S2 as a nit.
- **Drawize FORK frame.** Caption honestly states it is the in-progress word
  screen (WORD: FORK, timer 4:20, blank canvas), NOT the GAME FINISHED screen.
  The "finished" wording in the session claim refers to the Quick Draw
  session per Moments coverage, not to this frame. See S3 for the one
  shorthand that could still misread.
- **Shells labeled as shells.** Bell coverage keeps rollback-beat2 and
  core-rush-beat2 as honestly-captioned shells, not gameplay. No blank/black
  frame is embedded as gameplay anywhere this reviewer checked. PASS.

## 3. Partner-safety and third-person prose

- Critique contains zero "Sakura" mentions (grep-verified) and no company
  identifiers. It is partner-safe: verdicts, evidence, and actions, with
  internal session/task IDs confined to the coverage records (internal branch
  docs), not the critique.
- Third-person prose holds across all 16 files. Every first-person token found
  by grep is inside a verbatim game quotation, UI label, or chat quote — the
  allowed exception ("Tuck away my detail" / "Bring our details together",
  "I don't know" chat, Iona's letter, "Would you like to know why I kept that
  little wedge?", "I have the screen"). No non-quote first person found.
  Decision briefs state "Third-person throughout" and comply. PASS.

## 4. The five 20-November actions — owners and next steps correct

1. Bell one-line advance-rule fix + fresh-player re-test (owner: Bell branch
   owner). Executable, unexecuted, correctly stated as the condition.
2. Close the agent-play workstream; fold unplayed items (Original run,
   previous-Contrast comparison, Fracture 4) into the human-gate plan (owner:
   gate owner). Executable.
3. Small Hours six-pair human gate (owner: release coordinator; first step
   stated: assign facilitator + 12 people). Executable; the gate itself is
   unrun, stated, not hidden.
4. Vivid human gate (owner: release coordinator; first step stated: assign
   facilitator + 6 pairs; watch unprompted returns). Executable; unrun, stated.
5. Loopback blocker, GitHub issue #5 (owner: gate owner, folded into
   action 2). Correctly framed as a tooling dependency, not a demo fix.
No action was added or dropped by the live round, and the critique states
that ("adds no new demo action"). The gate criteria (human sessions + zero
open critical bugs) are correctly stated as excluding competitor-study counts,
so second-deep [OPEN] items are research gaps, not release blockers. PASS.

## 5. Headlines vs footnotes — no gap buried under a confident headline

Checked each headline against its gap placement: Bell's condition is in the
verdict bullet; Small Hours' "needs humans" is in the verdict bullet; Vivid's
gate questions are in the decision brief and the live update; ROLLBACK's
text-layer-only basis is in the bullet; Field Guide/Night OClock limits
([OPEN] goals, carry-over [OPEN]) are in the same bullets as their [REAL]
render claims; second-deep [OPEN] items are in the verdicts section's
live update, not footnotes. The critique's Evidence section now states the
16-item count correctly (15 PNG + 1 GIF) with no stale "13" remaining. PASS.

## MUST-FIX — none

No item below blocks delivery/filing on verdict or evidence-class grounds.
All verdicts follow from their evidence; all [OPEN] slots stay open; no
partial/blocked play is presented as completed or studied.

## SHOULD-FIX (4 items — one-line edits; apply before delivery/filing)

- **S1. Evidence section overstates PDF banking.**
  File: `critique--one-page-2026-10-28.md`, L48. Evidence: "competitor PDFs
  banked under `play-2026-10-28/competitors/`" — true for the morning-round
  PDFs, but the live-round PDFs live in browser-task output dirs and are
  cited by task ID in the coverage files, not banked in the package. A reader
  following this sentence will not find the live Night OClock/Field Guide
  PDFs in `competitors/`. Fix: "morning-round competitor PDFs banked under
  `play-2026-10-28/competitors/`; live-round PDFs cited by browser-task ID
  in the coverage records."
- **S2. Stale "first-hand rows" wording inside a Rectified note.**
  File: `records/moments/coverage--small-hours-2026-10-28.md`, L4. Evidence:
  the note reads "capture-text-verified items in the first-hand rows are
  [REAL]" while the coordinator's own edit elsewhere changed "first-hand
  rows" → "browser-task rows". The note explains a correction using the
  corrected-away term. Fix: reword to "in the browser-task rows". Traceability
  only; no live claim is mislabeled.
- **S3. Drawize "FORK finished" shorthand can misread.**
  File: `critique--one-page-2026-10-28.md`, L69. Evidence: "Drawize Quick Draw
  FORK finished, no submitted guess" — the adjacent FORK caption correctly
  states the frame is the draw-start screen, not the finished screen, but the
  bullet's shorthand ("FORK finished") can read as the drawing being finished.
  Fix: "Drawize Quick Draw session finished (word FORK), no submitted guess".
- **S4. Bell journey phase-engine rules 5/6 citations are imprecise.**
  File: `records/bell/journey--bell-0.1.0-2026-10-28.md`, L25–26. Evidence:
  rules cite `n8-anchor.txt` / `p6-anchored.txt` as "(board text)"; those dumps
  are full-page text, not the modal text itself. The rules themselves are
  carried by the driver logs and the source-verification note under rule 7,
  so no claim changes. Fix: re-point the two citations at the log lines /
  source lines rather than the page dumps. (Carried from the first pass's
  remaining gaps.)

## Carried-open items (disclosed, not defects — for the parent, not the package)

- Field Guide round authority (live round vs discarded headless replay
  directory) stays open for the parent. The records describe the live account
  with the replay directory flagged, not endorsed; the slot stays [OPEN]
  either way, so no verdict turns on it.
- MEMORY.md's caption-rule justification ("Moments TXT dumps describe
  different screens than their PNGs") carries the disproved generalization
  the addendum struck (84/85 Moments pairs agree; the unreliable layer is
  filenames, not TXTs; the rule itself — caption from the PNG — stands on
  the audited reason that selection state is invisible in TXTs). Memory files
  are read-only to the rectification pass; the parent should correct the
  justification. The package itself was corrected (Moments journey line 90).
- Audit coverage limits: 42 Vivid + 105 Bell PNG/TXT pairs unchecked (outside
  the audit's keyword/sample set); this review covered the scope files'
  citations and the highest-risk new renders, not every pair.
- Field Guide pause-menu frame (-5) is cited [REAL render] from render reads
  (audit's + this reviewer's fresh render), not embedded as a package copy.
  The claim is verified; only the embedding is absent.
- Gartic original-session GIF (214,639 bytes) remains header/size-verified
  only, not frame-checked; the critique embeds the frame-verified replay GIF
  (208,955 bytes). The coverage claim as worded (genuine GIF, dimensions,
  size) is fully supported by header/size verification.
- Bell `c9-dusk-visit.png` filename remains misleading (frame is a Noon
  scene); its caption correctly says Noon, and renames were out of scope.
- m5/n0 ordering (ending sequence vs return visit) rests on the Vivid record
  sequence, not on the two near-identical frames alone; both captions
  correctly disclaim what is not in frame.

## What this review did not re-verify

Every one of the 133 embeds was not individually re-read; the script
resolve-check (zero missing) plus this reviewer's reads of the highest-risk
frames (all critique competitor renders, both new critique embeds, all five
Night OClock strip types, Field Guide -3/-5, and the demo beat frames
spot-checked against their captions) is the basis for the caption verdicts.
The mistake-hunt/executability review (parallel) owns the line-level
mechanical pass; this review owns the boss/partner questions above.

Verdict: NOT CLEAN — 0 MUST-FIX, 4 SHOULD-FIX; delivery/filing may proceed once the four SHOULD-FIX edits are applied.
