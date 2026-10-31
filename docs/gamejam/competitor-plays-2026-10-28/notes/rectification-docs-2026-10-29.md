# Rectification log — IndiaGames game-jam package (2026-10-29)

Scope: all 16 delivered docs under `~/workspace/gamejam-studies/play-2026-10-28/` —
`records/{bell,moments,vivid}/{journey,art,coverage,decision,session}--*.md` (15 records)
plus `critique--one-page-2026-10-28.md`. Worked by four parallel workers (one per
demo + one for the critique) plus coordinator consistency edits. Nothing was filed,
pushed, committed, moved, or renamed. No existing file under `notes/` was modified;
this log is a new file, created as the required output. No new renders were created.

## The standard applied (same for every file)

1. Every embedded caption verified from its PNG by reading the frame. TXT dumps are
   unreliable (Moments TXTs describe different screens than their PNGs) — no caption
   was written from a TXT. A caption is a claim.
2. Evidence class on every material claim: [REAL] only for first-hand captures that show
   the play claimed; [SECONDARY] for browser-task prose and text-layer-only state;
   [OPEN] left open, never completed by official-site/video material or coverage count.
3. Third-person report prose; verbatim game quotes are the only exception.
4. Stale-claim sweep: superseded defects, swapped counters, misnomers, duplicate frames.
5. Every relative embed resolve-checked from its file's directory; zero missing.
6. Only already-existing, read-verified files embedded. No blank/black/shell frame
   embedded as gameplay.

Outcome first: every file now meets that standard. The per-file counts at the end of
this log are audit data for the parent, not user-facing delivery — per the standing
rule added to MEMORY.md during this pass ("No more counts: report outcomes, not
tallies"), user-facing reporting must state outcomes, not tallies.

## Coordinator adjudications

1. **Field Guide: the live round is authoritative.** The Vivid worker flagged a
   contradiction: `competitors/field-guide/replay-2026-10-28/` holds 01–05 PNGs whose
   TXTs claim Start/roam/camera/photo, against the coverage live-round account
   (blocked at main menu, no creature photo, no filled gallery entry). Adjudication:
   the live account stands. Reasons: (a) Sakura chose live windows over headless
   replay on 2026-10-28 and the headless output was discarded (told to him 2026-10-29
   00:02); (b) TXT dumps are unreliable by standing rule — the replay's own 05 frame
   was read and is a blank grey gallery panel with no creature, so the TXT photo
   claim is not in any frame; (c) the live menu render is verified. The coverage
   file keeps the blocked-at-menu account plus the replay-dir flag note. No replay
   frame was embedded (provenance mixing). The replay directory is left on disk and
   is recorded here as discarded output, not deleted.
2. **"First-hand" unified to one standard.** Bell coverage set it: browser-task prose
   is [SECONDARY]; only render- or text-layer-verified captures are [REAL]. Vivid and
   Moments coverage/decision headers that still said "first-hand" for browser-task
   rows were corrected to match (coordinator edits, listed under each file). Demo
   Playwright play keeps "first-hand [REAL]" — those captures are genuinely
   first-hand. Verified by grep after all edits: "first-hand" now appears in coverage
   files only inside [Rectified …] notes (traceability naming the corrected word),
   plus the package-rule statement itself.
3. **Pixel Harbor times.** The Playwright replay report records 0:11 / 0:03 (scripted
   clicks, file://); the coverage record correctly uses the live-round human-paced
   bests (Sailboat 0:55, Anchor 0:45) and the morning round (2:42 / 0:45). Replay
   times were not written into the coverage record.

## BELL (worker: no new embeds — expansion prose cites task IDs/PDFs, not PNG beats)

### journey--bell-0.1.0-2026-10-28.md — no edits, verified clean
All 10 frames read and matching their captions: p9-prepared (Commitment recorded,
Fracture 1/4, eyewitness clue, Bond Mina + Object redflower petal), q1-outcome (Mina +
crate at the sheltered market well, one uncrushed redflower, main alley still blocked),
p6-anchored (LOOP II map, Bellmarked, Momentum 2), 01-contrast-intro, 41-marks-read,
l3-noon-witnessed, c9-dusk-visit (frame is Noon despite the dusk filename — caption
correctly says Noon), 61-resolve-dawn ("Foresight fulfilled · Momentum +1"),
n8-anchor (board before any pick), p9-scene (before-click state). Loop 2 outcome stays
[REAL] (Playwright, bell19). The advance rule (visit registers only on a scene action;
rule never stated in-game) is kept as the centre finding. Duplicate respected:
bell/99-final.png = bell/q1-outcome.png (md5-verified); only q1-outcome is embedded.

### art--bell-0.1.0-2026-10-28.md — 4 edits
- Gallery count claim: before "the board totals eight beats" → after "the gallery
  totals eight frames" + Rectified note (Loop 1 board has 8 beats, Loop 2 board has 5;
  eight is the gallery's frame total).
- Beat 6 (boundary panel) evidence: before "bell7, bell14 `n8-anchor`" → after
  "bell7, bell14 `61-resolve-dawn` (frame-verified boundary panel)" + note (n8-anchor
  is the anchor-board frame, not the boundary panel).
- Beat 7 (Midnight anchor board) evidence: before "`p6-anchored` — frame shows the
  Loop 2 Dawn town after the anchor, not the board screen itself" → after
  "`n8-anchor` (the board itself, before any pick); `p6-anchored` shows the Loop 2
  Dawn town after the anchor" + note.
- Strip 2 grading sentence: before "the boundary panel grades it ('Prediction
  disproved — The Glassworks furnace begins to sing. No Momentum is lost' /
  'Foresight fulfilled · Momentum +1')" → after "the boundary panel grades it
  ('Prediction disproved — No Momentum is lost' / 'Foresight fulfilled · Momentum
  +1'); the consequence line ('The Glassworks furnace begins to sing') is a separate
  panel element, not part of the grading sentence" + Rectified note (the combined
  sentence appears in no beat dump; see the journey event-journal row 7).
- Drum-key use stays [OPEN]; sound stays [OPEN] (no audio captured). All 8 captions
  frame-verified and correct.

### coverage--bell-0.1.0-2026-10-28.md — 11 edits
- Evidence class, browser-task prose was labelled first-hand/[REAL] — corrected
  throughout: Sources line → "browser-task play of ROLLBACK ([SECONDARY] prose;
  text-layer markers [REAL]) + Core Rush browser-task partial ([SECONDARY])";
  ROLLBACK header "Deep — first-hand" → "Deep — browser-task"; Core Rush header
  "First-hand, PARTIAL" → "Browser-task, PARTIAL ([SECONDARY])"; coverage-check line
  "(1 deep first-hand browser, 1 first-hand in progress, 4 desk)" → "(1 deep
  browser-task, 1 browser-task partial, 4 desk)"; live-window header "re-played the
  two first-hand titles" → "re-played the two browser-task titles". Each with a
  Rectified note.
- ROLLBACK ending illustration: before "(ending illustration: dark office chair under
  a lamp…)" → after "(ending illustration described in task prose [SECONDARY] — dark
  office chair under a lamp…; no visible ending frame exists, the canvas prints
  blank)"; row tail now reads "render-verified page shells — no visible ending frame
  exists". The ending itself stays at its correct class: text-layer markers only
  (RUN 2 @ desk, 03:32, "PROMISE", "restore_policy: DISABLED."); patience mechanism
  (reads + answers drain patience 9→0, unstated in-game) stays [SECONDARY].
- "1 coal": no live "1 coal" fact remains in any Bell file; every remaining "coal"
  hit is an explicit struck/correction mention. Core Rush stays HOLD 1/8 (TOPSOIL, 1M,
  $50), NOT verified coal; loop question stays [OPEN] (no sale, no upgrade, no field
  notes, no loop reset); five-layers (in-game heading) vs six-layers (itch page) both
  kept, unresolved.
- Superseded substitutes: row 2's "game tab is left open … a human at a local machine
  could resume it" and the coverage-check substitute line (Quiet Express demo or human
  Core Rush session) each gained a Rectified note (takeover route closed 2026-10-29
  01:26; Quiet Express demo is market-only context, Steam-demo-only per the sweep, not
  a playable substitute). History wording kept, not deleted.
- Coverage count: revised check now reads "9 titles attempted, 6 studied (the original
  six; the three expansion titles are attempted/partial, not counted as studied)" +
  note; ROLLBACK "complete" qualified as "(ending via text-layer markers [REAL]; no
  visible ending frame exists)".
- Second deep comparison: now states it "stays [OPEN] as a research gap, NOT a
  release-gate blocker (gate criteria are human sessions + zero open critical bugs)".
- Expansion rows verified already correct, no change: Same Bullet counters LOOP
  02/ECHOES 01 [REAL], echo-replay/ricochet [SECONDARY], Room 1 NOT cleared [OPEN];
  Night OClock title screen only [REAL], corridor/tutorial [SECONDARY], carry-over /
  item / victim puzzle [OPEN]; last seen online desktop [SECONDARY], Em-chat text
  layer [REAL], photos4em.zip gate [OPEN] (3124 confirmed wrong; 1243/3142 no unlock
  observed; no brute force claimed).
- Both existing embeds kept as honestly-captioned shells, not gameplay:
  rollback-beat2 (blank-white-monitor page shell; itch page's own screenshots and
  description render below) and core-rush-beat2 (empty canvas, D-pad + DYN/FIX/TP/ACT
  buttons only). Both captions already state the gameplay evidence is the task report,
  not the render.

### decision--bell-0.1.0-2026-10-28.md — 4 edits
- Live-update expansion line labels added: "Room 1 uncleared [OPEN]; … carry-over
  unverified [OPEN]; last seen online desktop reached [SECONDARY], zip gate unsolved
  [OPEN]".
- Evidence ledger coverage line: before "(6 titles, 6 families…)" → after "(6 studied
  titles, 6 families…)" + note (after the live round: 9 attempted, 6 studied; the
  three expansion titles are partial/attempted, not studied).
- Evidence ledger substitute line (Quiet Express / human Core Rush session) + note
  (superseded: takeover route dead; Quiet Express market-only context, not a playable
  substitute).
- Live-update Core Rush line + "The second deep comparison stays [OPEN] as a research
  gap, NOT a release-gate blocker (gate criteria are human sessions + zero open
  critical bugs)."
- Verdict unchanged and correctly conditional: "Choose Bell for the 20 November gate
  — conditional on one fix" (one in-game line stating the advance rule + fresh-player
  re-test). Third-person holds ("Third-person throughout"); remaining "first-hand"
  hits in this file refer to Bell's Playwright play, genuinely first-hand [REAL].
- All 4 captions frame-verified (q1-outcome, n8-anchor, p9-prepared including the
  journal's "Loop 2 · Prepare the side passage" entry, p6-anchored including Momentum 2).

### session--bell-0.1.0-agent-2026-10-28.md — no edits, verified clean
All 4 captions frame-verified, including the before-click (p9-scene: journal without
the Loop 2 entry) vs after-click (p9-prepared: journal listing "Loop 2 · Prepare the
side passage") distinction, which the frames confirm. Claims consistent with the
journey record: bell19 Loop 2 Noon outcome, five stalled runs (three Noon, two
Midnight; bell17/18 excluded as driver failures), BELL-AGENT-01/02/03, "not gate
evidence and enters no release denominator".

## MOMENTS / Small Hours

### journey--small-hours-2026-10-28.md — duplicate removed, keepsake evidence fixed
- Duplicate embed removed: `42-reveal.png` and `35-a-choice.png` are byte-identical
  (md5 `4b5dfd8bb7f2b4706ebd1c69c323ff30`). The `42-reveal` embed was removed; the
  frame is now shown once at `35-a-choice`. The misnomer note was retained as text
  (not an embed): the file is named "reveal" but shows Person A's private choice
  screen, and the reveal citation is `71-reveal`. Rectified note marks the change.
- False keepsake evidence corrected: row 10 evidence was `82-keepsake` — false:
  `82-keepsake.png` is byte-identical to the Person A detail screen
  (`81-detail-A.png`, md5 `db3629b4e227a2478ae4d630b9246595`; its TXT dump is also
  the Person A detail text), not the keepsake. Corrected to `b2-keepsake` with a
  Rectified note.
- Evidence-class labels added: original-gallery captions for `71-reveal.png`,
  `b2-keepsake.png`, `s5-rehearsal-reveal.png` now carry [REAL] (first-hand Playwright
  frames read as PNGs), matching the expansion gallery.
- Verified, no change: all other captions match their frames, including the misnomer
  captions for `34-curtain-a.png` (choice screen, no selection yet) and
  `91-detail-A.png` (B detail handover curtain), the `a2-keepsake.png` caption (B
  detail input, 38/120, "Bring our details together", with its misnomer note), row 9
  (A 44/120, B 38/120, no separate B detail screen in the 81-series, B's counter
  evidenced by `a2-keepsake`), the B curtain in `62-a-sealed.png`, and the rehearsal
  reveal label "See the rehearsal reveal" (`s5-rehearsal-reveal.png`: A Soft sunshine,
  B Curious wind).

### art--small-hours-2026-10-28.md — 4 corrections
- Pair-board beat 3 evidence: before `34-curtain-a` → after `13-person-a` (true A
  curtain, verified frame) + Rectified note (34-curtain-a is the choice screen, not a
  curtain).
- Pair-board beat 7 evidence: before `82-keepsake` → after `b2-keepsake` + Rectified
  note (same byte-identity reason as the journey fix).
- Solo-board beat 2 evidence: before `s5-rehearsal-reveal` (early) for the "What kind
  of weather is this moment?" question → after `r3-rehearsal-reveal` (verified frame:
  rehearsal choice screen before selection, misnamed file) + Rectified note (s5 is the
  reveal, not the question screen).
- Beat 5 activity caption: before "A and B prompts side by side (upside-down sea,
  midnight garden)" → after "A and B prompts (upside-down sea, midnight garden)"
  (the frame stacks the A prompt above the B prompt; "side by side" was wrong).
- Evidence-class labels added: original-gallery captions for `71-reveal.png` and
  `b2-keepsake.png` now carry [REAL].
- Verified, no change: all other captions (entry window-and-table illustration, scene
  chooser, curtain honesty clause, choice highlight with unselected guess section, A
  detail 44/120, rehearsal keepsake) match their frames.

### coverage--small-hours-2026-10-28.md — class split, FORK render added, consistency edits
- Evidence-class change: before "first-hand browser-task plays of Gartic Phone and
  skribbl.io ([REAL])" with word-level details drawn from banked task reports →
  after: blanket [REAL] removed; a Rectified note states the split explicitly —
  capture-text-verified items are [REAL]; word-level details taken from the banked
  task reports are [SECONDARY], not [REAL]. The task-report citations themselves now
  carry [SECONDARY].
- AFK recurrence added: Drawasaurus paragraph now states "Sakura's on-page AFK fix
  cleared the banner once, but it recurred — a recurring defect, not a one-off
  [SECONDARY]" (corroborated by the interaction note's Case 3). The drawing turn
  still stays [OPEN]; guessing-only status unchanged.
- Missing class label added: "Resumed rounds detail" sentence (Round 3/3 Cool Room2,
  Gucci CUPCAKE-related, sunflower WAFFLES) now carries [SECONDARY].
- Embed added (existing file only, verified by reading):
  `../../competitors/drawize/render-fork-1.png`. Caption written from the frame:
  "Drawize Quick Draw [REAL render] — 'WORD: FORK', timer 4:20, blank canvas,
  FINISH/CANCEL buttons. This is the in-progress word screen, not the GAME FINISHED
  screen (the finish is capture text cited in the Drawize paragraph above). Drawize
  stays [OPEN]: no submitted guess exists in the captures." The frame does not show
  GAME FINISHED, so the caption says so explicitly rather than implying it.
- Coordinator consistency edits (same standard as Bell/Vivid): "Word-level game
  details in the first-hand rows" → "in the browser-task rows"; Gartic header "Deep
  (Solo mode only) — first-hand" → "browser-task" + note (GIF export verification
  stays [REAL] as noted in-row); "(2 first-hand browser, 4 desk)" → "(2
  browser-task, 4 desk)" + note; "re-played the two first-hand titles" → "re-played
  the two browser-task titles" + note.
- Verified, no change: both pre-existing gallery captions match their renders (Gartic
  "CREATE THE ANIMATION'S FIRST DRAWING", blank canvas, faint watermark, palette left,
  DONE! right; skribbl "The word was stove / Time is up!", all 0,
  rectangle-with-stray-diagonal, "mail"/"Email" chat, "Iran joined/left", Acura MDX
  ad). Gartic 5 PDFs + skribbl 5 PDFs confirmed on disk. Gartic Solo-only / Normal
  [OPEN], skribbl completed 3 rounds with winner screen 1,015 points [REAL capture],
  Drawize no-submitted-guess (CHANDELI, PAI TIME ELAPSED) [OPEN], Reign road never
  placed [OPEN], 9 attempted / 6 studied, draw-guess cap breach in the nine-title set
  (3 vs max-2) with the cap holding for the original six, second deep family [OPEN] —
  all already correct in the file.

### decision--small-hours-2026-10-28.md — ledger corrected, no verdict change
- Stale ledger line corrected: evidence ledger coverage line "(6 titles, 6 families,
  2 browser editions studied first-hand)" + Rectified note (revised to 9 titles
  attempted, 6 studied — see the coverage live-window update; browser-task detail
  splits [REAL] capture text / [SECONDARY] task-report prose).
- Coordinator edit: "studied first-hand" → "studied via browser task" (covered by the
  existing Rectified note above).
- Evidence-class label added: original-gallery `b2-keepsake.png` caption now carries
  [REAL].
- Verified, no change: all three gallery captions match their frames; verdict stands
  (ready for the human gate, six-pair gate [OPEN]); no claim upgrades operator play
  to pair proof — the decision text already states the gate is "the one thing a solo
  operator cannot prove". Live-window update already correctly states Reign partial
  (Round 3, road never placed, setup by Sakura's takeover), Drawize (Quick Draw FORK
  finished, no submitted guess), Drawasaurus (guessing only, drawing turn never
  completed), Gartic Normal [OPEN].

### session--small-hours-agent-2026-10-28.md — TXT citation fixed, B counter added
- TXT citation corrected to the PNG frame: issues line cited the B detail curtain as
  `91-detail-A.txt` / `views.js:32` → corrected to `91-detail-A.png` / `views.js:32`
  (`pass-write-b`), with a Rectified note. The frame was read and is the B detail
  handover curtain.
- B counter added: row 9 Detail (B) previously gave no counter; now reads: B: "the
  smell of rain on the harbour steps" (38/120, `a2-keepsake` frame — file named as a
  keepsake capture, frame is the B detail input) → "Bring our details together". No
  counter swap anywhere; A remains 44/120.
- Evidence-class label added: original-gallery `b2-keepsake.png` caption now carries
  [REAL].
- Verified, no change: all five gallery captions match their frames; the session
  remains explicitly labeled agent/operator play, flow proof not pair proof, and not
  gate evidence.

## VIVID

### journey--vivid-0.1.2-2026-10-28.md — duplicate citations repointed, m5 strengthened
- m5-ending caption strengthened: before "…the harbour scene with bearing EAST and
  rhythm SHORT / LONG / SHORT selected. The ending line 'The ferry is safely home' is
  a separate panel element, verified in 74-iona-ending.txt…" → after "…bearing EAST
  and rhythm SHORT / LONG / SHORT selected. **This frame does NOT show the 'The ferry
  is safely home' panel; that sentence lives in 74-iona-ending.txt, not in this
  frame.** The settings line is in m5-ending.txt." The m5 frame was read: it shows only
  the configured signal controls.
- Duplicate-frame citations fixed (md5-verified): m6-return, m7-recollection,
  m8-braced, and m9-wedge are all byte-identical to m5-ending.png (settings frame
  only) and were cited as if they showed the return, recollection, brace, and wedge
  states. Row 8 evidence `m6-return` → `74-iona-ending` (return text in frame); row 9
  `m7-recollection` → `i0-return`; row 10 `m8-braced` → `i2-braced`; row 11 `m9-wedge`
  → `i2-braced`, `n0-letter`. Row 12 evidence expanded `n0-letter` → `n0-letter`,
  `68-private-letter` (letter panel visible in frame).
- Row 4 (0/2-marks signal test): before observed "Nothing visible happens", cost "The
  game does not explain why; the counter is the only hint." → after observed "No
  ferry movement; the dump for this 0/2 state (27-after-signal.txt) carries 'Find both
  harbour marks first. A good signal begins with evidence.' — the frame shows the
  notch panel, not that message"; cost notes the rule sentence is dump-only
  [SECONDARY] for this beat. Basis: 27-after-signal.txt carries a 0/2 header and that
  message.
- "What this record does not claim": "text dumps are the backup evidence for those
  beats" → "text dumps are the **[SECONDARY]** backup evidence for those beats."
- Row 3 m3-notch disclosure already correct (m3-notch is byte-identical to
  m2-plate.png — brass plate, not notch) and left unchanged; the same applies to the
  66-iona-ending = 65-after-signal and n0-letter = 99-final duplicate pairs (neither
  66, 99, nor m3 is embedded in any scope file).

### art--vivid-0.1.2-2026-10-28.md — 68 added, board repointed
- 68-private-letter.png added to the gallery (line 83–84). Caption written from the
  frame: the "A FOLDED LETTER — To whoever keeps this light after me: I was
  frightened every night. I turned it on anyway. — Iona" panel is visible in this frame
  (unlike n0-letter.png, where the letter text sits in the dump only); stale letter
  label still visible; lamp settings in this earlier-run frame are not relied on.
- Header corrected: "An 8-beat board [REAL]: one frame per board beat" → "Frames for
  the board beats below [REAL]…" + Rectified note (the expansion now holds 9 frames
  and Mara beats share frames).
- Beat 3 evidence `m4-signal`, `m5-ending` → added `74-iona-ending` (ending header in
  frame; m5 shows settings only). Beat 5 `m6-return` → `74-iona-ending` (duplicate
  note). Beat 6 `m7-recollection`, `m8-braced` → `i0-return`, `i2-braced` (duplicate
  note). Beat 7 `n0-letter` → `68-private-letter` (letter panel visible in frame; n0
  shows the action only, letter text in its dump). Beat 8 (`n0-letter`, LOOK AROUND
  controls visible in frame) unchanged.
- All four files' n0-letter captions were already compliant (letter action selected,
  stale sublabel visible, letter text in n0-letter.txt not in the frame) and were left
  unchanged.

### coverage--vivid-0.1.2-2026-10-28.md — Birdography resolved, times distinguished
- Sources paragraph appended: "[Rectified 2026-10-29: word-level details resting only
  on task-report prose are [SECONDARY]; only render- or text-layer-verified captures
  are [REAL].]" The morning Birdography/Pixel Harbor rows rest on banked task reports
  except where a render/PDF text layer verifies them; no [REAL] label was removed from
  a capture-backed claim, and no verdict was changed.
- Birdography row 1, stale defect: before "the main defect — journal unlock
  inconsistency: after only two named photo banners, the Black-Capped Chickadee and
  Black-Billed Magpie entries were fully readable by paging, while at least one spread
  remained padlocked (…undetermined from play…)" → after "[Rectified 2026-10-29: the
  former 'journal unlock inconsistency' is **RESOLVED, not a defect** — journal entries
  sit in FIXED species order, not discovery order (three locked spreads sit between
  Blue Jay and Chickadee), so paging past Blue Jay to readable Chickadee and Magpie
  spreads is the fixed order, not broken locking; the X cheat was not used.]" The
  "What it teaches" cell was corrected in parallel: "Birdography's unlock
  inconsistency is the sharper lesson" → "Birdography's resolved fixed order is the
  sharper lesson". The morning row's other defects (itch-page-only controls RMB/LMB/F,
  no duplicate-photo feedback, camera switching off, opaque aiming, journal reopening
  on Blue Jay) were left as morning observations; the live update's
  controls-itch-page-only [SECONDARY] line already matches.
- Pixel Harbor row 2, morning/live times: Puzzle 1 now reads "(5×5 · 2:42, morning
  round; live-round re-solve Sailboat 0:55 — see live-window update)"; Puzzle 2 now
  reads "completed in 0:45 (morning round; live-round re-solve Anchor 0:45, tying the
  old best)". The stale-text defect, grammar bug ("1 square look wrong"), monochrome
  Anchor reveal, and 2/8 charted persistence were already stated correctly and
  unchanged. Gallery pixel-harbor beat3 caption labeled "(completed Sailboat,
  **morning round**, 5×5, 2:42)… Morning round only — the live-round Sailboat best is
  0:55 (see live-window update)" + Rectified note.
- Coordinator consistency edits ("first-hand" → browser-task standard, each with a
  Rectified note unless already covered): Sources header; Birdography header
  ("Deep — browser-task, photo→journal loop completed twice"); count line ("(2
  browser-task, 4 desk)"); live header ("re-played the two browser-task titles");
  Field Guide attempt ("ATTEMPTED browser-task, BLOCKED at the main menu"; menu render
  itself stays [REAL capture]); studied count ("studied via browser task"); Field
  Guide desk note ("blocked browser-task attempt"); decision ledger ("studied via
  browser task", covered by its existing Rectified note).
- Live-window update already correct and unchanged: Birdography fixed order
  [SECONDARY], Pixel Harbor fresh solves [REAL], Field Guide menu [REAL capture] with
  gameplay [OPEN], Tranquility [OPEN] with camera bug unobserved (not absent),
  PhotoHacks title + Tutorial Steps 1–2 [REAL capture] with core loop [OPEN].

### decision--vivid-0.1.2-2026-10-28.md — no edits, verified clean
Verdict "ready for the human gate" (not upgraded); n0/68/74 captions already comply
with the m5/n0 rules; live-window update already states Birdography resolved
[SECONDARY], Pixel Harbor fresh solves [REAL], and Field Guide/Tranquility/PhotoHacks
as attempted-not-studied with studied count 6. Nothing in the file contradicted the
known facts. (Coordinator edit only: the ledger's "studied first-hand" → "studied via
browser task", covered by the existing Rectified note.)

### session--vivid-0.1.2-agent-2026-10-28.md — 68 added, dumps labelled
- 68-private-letter.png added to the gallery (line 96–97) with the same verified
  caption as the art file + Rectified note (the session gallery previously showed the
  letter action (n0-letter.png) but no frame with the letter text itself).
- Issue VIVID-AGENT-02: "text dumps used as backup" → "text dumps used as
  **[SECONDARY]** backup."

## CRITIQUE (re-audit — parent fixes verified independently, not trusted)

### critique--one-page-2026-10-28.md — 5 edits, all 14 parent captions confirmed
- Line 11, Small Hours counters ADDED (were absent, not swapped): before "detail
  (120-char cap)" with no counter values → after "detail (120-char cap; A 44/120 for
  "a brass key that hums when the tide comes in", B 38/120 for "the smell of rain on
  the harbour steps")". Verified first-hand from frames read by the auditor, not TXT
  dumps: moments/81-detail-A.png shows Person A, the brass-key text, 44/120, button
  "Tuck away my detail"; moments/a2-keepsake.png (file misnamed as a keepsake) shows
  Person B, the rain-on-harbour-steps text, 38/120, button "Bring our details
  together". Order matches the Moments journey record. No swap exists in the critique.
- Line 31, ROLLBACK main bullet qualified + Rectified note ADDED: before "played to
  an ending — "THE PROMISE", 1 of 8" with no evidence qualifier in that bullet →
  after the same wording plus "[Rectified 2026-10-29: the ending rests on text-layer
  state markers only — RUN 2 @ desk, 03:32, "PROMISE", "restore_policy: DISABLED."; no
  visible ending frame exists]". The live-update bullet already listed those markers;
  the main bullet now does too, so the Evidence section's "stated beside the claim"
  is now literally true.
- Line 48, embed count CORRECTED (stale claim fixed): before "embeds 13 photos" →
  after "embeds 14 items (13 PNG frames + 1 GIF) [Rectified 2026-10-29: count corrected
  from 13; all 14 embeds verified resolving]". The file actually contains 14 embeds.
- Line 54, ROLLBACK other endings made explicit [OPEN]: added "The other ROLLBACK
  endings stay [OPEN]." ("1 of 8" implied this but never stated it; now it reads
  [OPEN], never completed by coverage count.)
- Line 74 (new line), Iona neutral profile made explicit [OPEN]: added "Iona neutral
  profile stays [OPEN] (not played; optional per the launch doc)." It was absent from
  the critique, not mis-stated; it now reads [OPEN], matching the Vivid decision
  record and journey record.
- Caption re-audit — all 14 parent captions CONFIRMED, none changed, each frame read
  by the auditor: Bell p9-prepared (DAWN · BELL SQUARE, "A route remembered",
  "Prepare the side passage" button, "Commitment recorded." panel, Fracture 1/4,
  journal "Loop 2 · Prepare the side passage" — "Prepare clicked" is a sound inference
  from the commitment panel, not just button presence); Bell q1-outcome (NOON · BELL
  SQUARE, "Redflowers beside the market well", Mina and her crate at the sheltered
  market well via the side passage, verbatim "The main alley is still blocked; the
  changed route, not a changed crowd, brought her here"); Bell p6-anchored (LOOP II
  town map, "Carried through midnight: Bond · Mina, redflower seller; Object ·
  redflower petal", scar "Bellmarked" — town AFTER the anchor, not the anchor board);
  Moments 71-reveal ("TWO WAYS OF SEEING / Well, look at that.", Person A
  "An upside-down sea", Person B "A midnight garden" — true pair reveal);
  Moments 42-reveal ("PERSON A · A PRIVATE LITTLE CHOICE / Where does your mind
  wander?" with "Seal my choices" — private choice screen, file misnamed "reveal",
  not the pair reveal); Vivid m5-ending (Bearing EAST, Rhythm SHORT/LONG/SHORT, Lamp
  "East — old breakwater" and Flash "Short · long · short" selected, "Send the
  signal"; no ferry-home panel in frame — the caption's disclaimer is correct);
  Vivid n0-letter ("Open the private letter / The keeper has not offered this letter
  to you."; no letter text in frame — disclaimer correct); Vivid 68-private-letter
  (visible "A FOLDED LETTER" panel with the full Iona letter text; its Flash selection
  is Long·short·long, which is why the caption's "lamp settings not relied on"
  disclaimer is necessary and correct); Vivid 43-mara-ending ("The Unfinished
  Postcard" heading and postcard text); Birdography render-journal (pixel chickadee
  with heading "Black-Ca / ped / Chickade" clipped at the right edge); Gartic album
  GIF (Solo album GIF; dimensions verified independently via PIL as 770×490, 5 frames,
  208,955 bytes — matching the GIF89a / 770×490 / 208,955 bytes claim); skribbl
  render-winner ("BrowserTester is the winner!", podium #1, 1,015 points, leaderboard
  #1 BrowserTester (You) 1,015 points); Pixel Harbor render-charted ("CHARTED!
  Sailboat, 5×5 · 0:55 · best 0:55"); Drawize render-fork ("WORD: FORK", blank canvas,
  TIME 4:20, FINISH/CANCEL — draw start, not the finished screen; consistent with the
  expansion bullet, where "finished" refers to the Quick Draw session per the Moments
  coverage record, not to this frame).
- No embed removed. No blank/black/shell frame is embedded as gameplay; ROLLBACK has
  no embed at all, correctly.
- Evidence classes verified: ROLLBACK text-layer markers only, never called a visible
  capture, no blank-monitor render embedded; counters A 44/120, B 38/120, never
  swapped; Birdography "unlock inconsistency" reads RESOLVED in both the main bullet's
  [Correction] and the live update ("journal entries sit in FIXED species order
  [SECONDARY] — the old 'unlock inconsistency' is explained, not open"); Core Rush
  never reads as verified coal (main bullet and live update both strike "1 coal"; the
  two remaining "1 coal" mentions are explicitly struck historical quotations, not
  live claims; surviving claim is HOLD 1/8, TOPSOIL, 1M, $50, fuel ~8%, no sale, no
  upgrade, 0/12 field notes, no loop reset); [OPEN] items all still read [OPEN] —
  Gartic Normal + telephone chain, second deep families, unfinished expansion plays,
  Iona neutral profile (new line 74), ROLLBACK other endings (new line-54 tail), Core
  Rush loop reset ("no loop reset seen" / "loop question stays [OPEN]") — none
  completed by prose or coverage count.
- Third-person prose: whole file checked including the live-update section. The only
  first-person tokens are inside verbatim game/chat quotations, the allowed
  exception: "Tuck away my detail" / "Bring our details together" (game submit
  labels), "Nothing is lost; you can try again" (game text), "Would you like to know
  why I kept that little wedge?" (game prompt), "I don't know" (stranger's chat). No
  non-quote first person was introduced by the edits.
- Verdicts vs records — no contradiction, no verdict changed: Small Hours "ready for
  the human gate" matches the Moments decision record ("Choose Small Hours for the 20
  November gate… six real pairs"); Vivid "ready for the human gate" matches the Vivid
  decision record ("Choose Vivid for the 20 November gate"); Bell "proven end to end"
  + one in-game advance-rule line + fresh-player re-test matches the Bell decision
  record ("conditional on one fix… then re-test with a fresh player") and the live
  update states the condition explicitly; the five 20-November actions (Bell one-line
  rule + re-test; close agent-play workstream; Small Hours six-pair gate; Vivid human
  gate; loopback issue #5) are unchanged, and the live update's "adds no new demo
  action" still holds. Supporting spot-checks: SVG download 1,425 bytes verified on
  disk (moments/keepsake--pair-impossible-postcard.svg, wc -c = 1425); Bell five
  stalled runs (three Noon, two Midnight) match the Bell decision record; competitor
  PDFs exist under competitors/; sweep files
  fresh-competitors-{bell,moments,vivid}-2026-10-28.md exist.
- Embed resolve check: all 14 relative embeds resolve from the critique's directory;
  zero missing (verified by file-existence test for each path). File length
  before/after: 75 / 76 lines (one added line: Iona neutral [OPEN]).

## Remaining gaps (not closed, with reasons)

1. **Bell journey phase-engine rules 5/6 citations are imprecise.** They cite
   `n8-anchor.txt` / `p6-anchored.txt` as "(board text)"; those dumps are full-page
   text, not the modal text itself. The rules themselves are carried by the driver
   logs and the source-verification note under rule 7, so no claim was changed — but
   a future pass should re-point those two citations at the log lines / source lines
   rather than the page dumps.
2. **Bell `c9-dusk-visit.png` filename is misleading.** The filename says "dusk"
   while the frame is a Noon scene; the caption correctly says Noon, and renaming
   files was out of scope, so the misleading filename remains.
3. **Bell remaining "first-hand"/"coal" hits are intentional traceability.** They
   appear only inside [Rectified …] notes naming the corrected word, and in struck
   historical quotations — not live claims.
4. **Critique m5/n0 provenance rests on record sequence, not on the frames alone.**
   `vivid/m5-ending.png` and `vivid/n0-letter.png` are near-identical frames
   (different file hashes, same harbour scene, same East + Short-long-short
   selections, same stale "not offered" sublabel). What each frame shows matches its
   caption, and both captions correctly disclaim what is not in the frame (ferry
   panel; letter text) — but the frames alone do not prove that m5 is the "ending
   sequence" and n0 the "return visit"; that ordering comes from the Vivid record
   sequence. Left as-is because the captions' checkable claims hold and the
   disclaimers are honest; a stricter reader should cite the record sequence, not
   these two frames, for the ordering.
5. **Field Guide round contradiction — adjudicated, not resolved by editing.**
   See Coordinator adjudication 1 above. The live blocked-at-menu account stands;
   the discarded replay directory's TXT claims are not evidence.
6. **PhotoHacks and Tranquility have no embeddable PNGs on disk.** Their
   `replay-2026-10-28/` directories are empty; the live-round evidence is browser-task
   PDFs not banked in the workspace. Their coverage prose (title + Tutorial Steps 1–2
   [REAL capture], core loop [OPEN]; Unity loader ~97% [SECONDARY], no beats [OPEN])
   was verified and left unchanged, but no new embed could be added for either title
   without inventing a path.
7. **Live-round Birdography Chickadee journal frame and Pixel Harbor live solves have
   no PNG on disk.** The coverage live updates cite browser-task IDs and [REAL
   capture] for these; the workspace holds only morning PDFs and separate Playwright
   replay PNGs (e.g. birdography replay 06-journal-2 was read and shows Blue Jay, not
   Chickadee, so it cannot illustrate the live Chickadee claim). No replay PNG was
   substituted for a live claim, to avoid provenance mixing. The live claims are
   therefore unchanged and rest on the cited browser-task IDs, not on a file in this
   package.
8. **No Reign embed exists.** No `competitors/reign-settlement/` directory exists
   (only a Reign interaction note under `notes/`). No Reign embed was added, and no
   path was invented. Reign claims remain browser-task prose [SECONDARY] plus a
   browser-task id, which is their correct class.
9. **No Drawasaurus gameplay render exists.** The only file in
   `competitors/drawasaurus/replay-2026-10-28/` is a landing-page capture, not
   gameplay, so embedding it as play evidence would have been wrong. Drawasaurus
   stays [OPEN] for the drawing turn.
10. **Moments non-embedded beat citations were confirmed to exist on disk but were not
    read as PNGs** (e.g. `36-a-guess`, `37-a-seal`, `39-b-choice`, `43-activity`,
    `83-after-save`), since Check 1 governs embedded captions. If those frames are to
    be caption-verified, they need a separate embed pass.
11. **Skribbl original vs replay rows both stand.** The original row (ended Round 2,
    no winner screen) is true for its session; the live-window replay (full 3 rounds,
    winner screen) supersedes it for current state via the revised coverage check.
    History sections were left unchanged per the live-update header, not rewritten.
12. **Two genuine Gartic GIFs exist — no swap.** Original-session
    `gartic-album-2026-10-28.gif` (214,639 bytes) and replay `album-2026-10-28.gif`
    (208,955 bytes), both GIF89a 770×490. Each row cites its own session's file.
13. **No verdict was changed anywhere.** Nothing in the files contradicted the
    standing verdicts (Small Hours ready for the human gate; Vivid ready for the human
    gate; Bell proven end to end conditional on the one-line rule fix + fresh-player
    re-test; true two-person play, second deep families, Drawize, Drawasaurus, Reign
    partials, and all unfinished expansion plays [OPEN]).

## Verification appendix (audit data — see the note at the top about tallies)

Per-file embed counts, baseline (before this pass) → after. Baseline was measured
before any worker edited: Bell 10/8/2/4/4, Moments 21/9/2/3/5, Vivid 16/10/2/8/9,
critique 14 (127 total). Final state was re-measured after all edits, and every
embed was resolve-checked from its file's directory by script: zero missing.

- records/bell/journey--bell-0.1.0-2026-10-28.md: 10 → 10
- records/bell/art--bell-0.1.0-2026-10-28.md: 8 → 8
- records/bell/coverage--bell-0.1.0-2026-10-28.md: 2 → 2
- records/bell/decision--bell-0.1.0-2026-10-28.md: 4 → 4
- records/bell/session--bell-0.1.0-agent-2026-10-28.md: 4 → 4
- records/moments/journey--small-hours-2026-10-28.md: 21 → 20 (duplicate 42-reveal
  embed removed)
- records/moments/art--small-hours-2026-10-28.md: 9 → 9
- records/moments/coverage--small-hours-2026-10-28.md: 2 → 3 (Drawize FORK render
  added)
- records/moments/decision--small-hours-2026-10-28.md: 3 → 3
- records/moments/session--small-hours-agent-2026-10-28.md: 5 → 5
- records/vivid/journey--vivid-0.1.2-2026-10-28.md: 16 → 16
- records/vivid/art--vivid-0.1.2-2026-10-28.md: 10 → 11 (68-private-letter added)
- records/vivid/coverage--vivid-0.1.2-2026-10-28.md: 2 → 2
- records/vivid/decision--vivid-0.1.2-2026-10-28.md: 8 → 8
- records/vivid/session--vivid-0.1.2-agent-2026-10-28.md: 9 → 10 (68-private-letter
  added)
- critique--one-page-2026-10-28.md: 14 → 14 (no embeds added or removed; 5 prose/label
  edits; file 75 → 76 lines)

Net change: 127 → 129 (one duplicate removed, three verified frames added). Coordinator
spot-verification performed on top of the workers' reports: critique 76 lines / 14
embeds with all five edits present and all 14 paths resolving; Bell counts and
first-hand/coal hits confirmed as notes-only; Vivid counts, 68 embeds, and Birdography
RESOLVED note confirmed; Moments counts, 42 removal, b2 corrections, and FORK embed
confirmed; final grep confirms no live "first-hand" remains on browser-task rows in any
coverage file; final script resolve-check confirms zero missing embeds across all 16
files.

---

## Addendum — follow-up pass: files-audit findings applied (2026-10-29)

This addendum records the follow-up pass ordered on the parallel files audit
(`notes/rectification-files-2026-10-29.md`). Three workers (Bell, Moments,
Vivid, disjoint scopes) + the coordinator's own critique edits. No filing,
pushing, committing, moving, or renaming; no other `notes/` file touched;
no new renders created. Verdicts unchanged everywhere.

### Correction to this log's own standard statement (Finding 1)

The first pass of this log stated that "TXT dumps are unreliable (Moments
TXTs describe different screens than their PNGs)" and that no caption was
written from a TXT. That generalization is STRUCK — the files audit
disproved it, and the coordinator's greps confirm no delivered record or
the critique itself ever claimed it:

- Moments: 84/85 PNG/TXT pairs checked, ZERO screen-level mismatches. Every
  TXT describes the same screen its PNG shows — including where the
  filename is wrong (42-reveal.txt correctly describes A's choice screen;
  the filename is the lie, not the dump).
- Bell: 0 mismatches among 72 checked pairs (systematic 1-second elapsed
  skew on map-view pairs is the timer ticking between captures).
- Vivid: 41/43 pairs agree. The 2 exceptions (n0-letter, 99-final — same
  bytes) are a full-DOM-dump effect: the TXT contains a closed panel's
  letter text while the PNG shows only the letter button with the "not
  offered" sublabel. That is not a screen mismatch, and the records'
  existing n0 captions ("letter text sits in the dump only") already state
  it correctly.
- The real TXT gaps are state-only: selection highlights are invisible in
  TXT dumps (the 15 A-choice-family TXTs are byte-identical across four
  PNG selection states), and typed detail wording is absent (81-detail-A
  carries 44/120 but not the brass-key wording; a2-keepsake carries 38/120
  but not the rain-smell wording). Counters match the PNGs.
- The unreliable layer is FILENAMES, not TXTs (73 hard misnomers: Vivid 14,
  Bell 25, Moments 34).

Captioning stays from PNGs per the standing rule — now for the audited
reason (selection state is invisible in TXTs), not wholesale TXT
discounting. TXT content is no longer discounted: TXTs confirm screen type,
counters, and panel text.

One TXT-claim correction was needed in the delivered docs: Moments journey
line 90 ("frames whose TXT dump disagrees with the image were captioned
from the image alone") → corrected to the audited truth above. Bell and
Vivid scopes contained no TXT-misdescription claim (greps clean).

Flag for the parent (memory files are read-only to this pass): MEMORY.md's
caption-rule justification ("Moments TXT dumps describe different screens
than their PNGs") carries the same disproved generalization. The rule
itself (caption from the PNG) stands, on the audited reason; the
justification needs correcting.

### Coordinator's own verifications (Finding 2) — with an honesty correction

- Night OClock is NOT title-only: the coordinator read the banked
  `competitors/night-oclock/render-corridor-1.png` AND rendered live PDF
  -14 fresh (70 dpi) and read it — both show the Unity corridor strip
  (timer 0:43, skull icon, WASD sign). CORRECTION to the interim note's
  "two independent renders" framing: the banked render IS the -14 copy
  (byte-identical, sha256 03b47ef9…, confirmed by the Bell worker), so the
  corridor evidence rests on ONE source PDF page rendered twice, plus the
  audit's page-1 strip list for the other 8 strips (corridor timers,
  WASD/SHIFT/RUN signs, clock item, green-lit view; 10 legible of 11, one
  shell) — the other strips were not individually re-rendered by the
  coordinator.
- Field Guide is NOT menu-only: the coordinator read the banked
  `competitors/field-guide/render-ingame-1.png` AND rendered live PDF -3
  fresh (70 dpi) and read it — both show the in-game low-poly island view
  over water with red + green segmented bars top-left. Same honesty note:
  both renders depict the same -3 page; the -5 pause menu over a dimmed
  scene rests on the audit's render read (cited [REAL render] in Vivid
  coverage, not embedded — copying it was out of scope).
- Both slots stay [OPEN] and NOT studied: Night OClock has no carry-over
  proof (no item pickup, inventory screen, or victim puzzle); Field Guide
  has no creature photograph and no filled gallery entry.

### What changed, by file group

**Bell** (coverage 2 → 3 embeds; journey/art/decision/session unchanged):
- Coverage Night OClock row: the true part kept (text layers carry title
  string only); the conclusion corrected ("prove nothing beyond the title
  screen" → corridor + tutorial-signs reached is now render-verified
  [REAL]; corridor play beyond those strips and the camera area remain
  task prose [SECONDARY]; carry-over [OPEN]; stays partial, not studied).
  Corridor render embedded, captioned from the frame.
- Decision line 65: "title screen only" → corridor + tutorial-signs
  reached [REAL], title screen also [REAL], carry-over [OPEN].
- Journey rules 2–3: `g7-anchor` noted as a misnomer (frame is the Noon
  Underbell "Procession of the first chime" scene; the rule rests on its
  journal panel, not an anchor UI). Journey row 6: `bell13 l4` citation
  dropped (l4-noon-hospice is the Noon Bell Square "alley has closed"
  panel with no hospice content; e5 alone carries "One cup is still warm").
- Checked and left alone: `j4-noon-hospice` (genuine hospice scene),
  row 5's `b1-prepared` description (preparation offered, too late —
  correct as written), driver-log refs (not frame captions), the
  `c9-dusk-visit` embed (frame is the hospice scene, matching its caption;
  the name does not contradict the caption). No duplicate-pair embed
  existed (q1-outcome embedded, 99-final never).

**Moments** (all counts unchanged; corrections hit table citations, not
embeds):
- Journey rows 4/6/8/11 re-cited to frames that show the claimed beat:
  row 4 evidence `35-a-choice` only (36-a-guess/37-a-seal are the same A
  choice screen, moon selected, guess row unselected — no guess or seal
  shown; A's guess attested by 71-reveal); row 6 evidence `71-reveal` +
  `70-both-sealed` (39-b-choice is still A's choice screen, header
  PERSON A; 40-b-guess/41-b-seal are byte-identical to 42-reveal);
  row 8 evidence `72-activity` (43/44-activity are byte-identical to
  42-reveal); row 11 evidence `c3-after-save` (83-after-save is
  byte-identical to 81-detail-A; c3 is the genuine after-save frame with
  the download-started note). Solo row 2's `r3-rehearsal-reveal`
  annotated as a misnamed file (frame is the rehearsal choice screen).
- Art beat 6: `43-activity` → `72-activity`.
- Coverage skribbl row + count line: "first-hand" → "browser-task"
  (browser-task prose [SECONDARY]; capture-text-verified items [REAL]).
- No duplicate-pair embed existed; no failed directory-listing capture
  (02/03/23-step*) is cited or embedded anywhere in scope.

**Vivid** (coverage 2 → 3 embeds; journey/art/decision/session unchanged):
- Coverage Field Guide bullet: "BLOCKED at the main menu / no gameplay
  reached" → menu, in-game, and pause frames reached; menu [REAL
  capture]; in-game island view with health/stamina bars [REAL render,
  embedded]; pause menu over dimmed scene [REAL render]; "Start did
  produce in-game frames"; remains NOT studied (no creature photograph,
  no gallery entry). The pre-existing replay-directory note was kept
  verbatim (its 05 blank-grey-gallery reading is consistent with "no
  gallery entry seen"; which round is authoritative stays open for the
  parent).
- Decision line 79: "Field Guide menu only" → menu + in-game island view
  + pause menu, no creature photo or gallery entry, still [OPEN], not
  studied.
- Journey/art 27-after-signal captions: re-described from a standalone
  notch beat to the signal-selection view it is (notch panel visible;
  Send highlighted; no post-signal result visible; blocked-signal
  sentence in the TXT [SECONDARY]). Journey rows 4/5/6 and session rows
  ~3:00/~3:30 carry the same frame-limit notes (55-/65-after-signal
  sentences are dump-only [SECONDARY]; frames show
  signal-selection/settings views with no result/outcome visible).
- Journey m5-ending caption: alt + text corrected from "ending state" to
  "signal-selection state" (East + Short·long·short, Send plain, letter
  action with "not offered" sublabel; no ending text visible).
- Checked and left alone: row 7 / art beat 3 cite m5 only as "(settings)"
  paired with 74-iona-ending for the ending header (accurate); no scope
  file cites 03/05/29/30/56/57/66/67-iona, 75-iona-return, 63-notch, or
  99-final except in already-correct notes; no duplicate-pair embed
  existed (m5 only, n0 only, m2 only, m0 only, m1 only, 27 only, 65 only,
  i0 only).

**Critique** (coordinator's own edits, 14 → 16 embeds, all resolving):
- m5 caption: "ending sequence" → "signal-selection state" (log: m5 is a
  signal-selection frame, not an ending; ferry-home panel stays in record
  text).
- Night OClock line: "tutorial reached [SECONDARY] (title screen only
  [REAL])" → corridor + tutorial signs reached [REAL render strips],
  carry-over unverified [OPEN]; corridor render embedded after the FORK
  image.
- Field Guide line: "menu only" → menu + in-game island view
  (health/stamina bars) + pause menu [REAL renders], no creature photo
  or gallery entry; in-game render embedded after the blocked/failed
  bullet.
- Other 12 captions re-checked against the files log (71/42/68/43/n0/p9/
  q1/p6 + competitor renders): all agree; n0's caption already matches
  the log (letter action + stale sublabel, no letter text visible).

### Remaining gaps (carried, none papered over)

- Field Guide pause-menu frame (-5) is cited [REAL render] from the
  audit's read, not embedded (no package copy exists; copying was out of
  scope).
- Audit coverage limits: 42 Vivid pairs and 105 Bell pairs unchecked
  (outside the audit's keyword/sample set); this pass covered only the
  named misnomers/weak frames and the scope files' citations.
- Moments guess/seal instants remain unframed: no distinct frame exists
  for B's private choice screen, B's guess, any seal-confirmation screen,
  any guess-made state, or any second activity. Rows now attest guesses
  via 71-reveal and sealing via 70-both-sealed; the instants themselves
  stay uncaptured, and the rows do not claim otherwise.
- Filenames on disk still differ from content where noted (c9/j4 share
  one frame; l3/l4 share another; the m5/m6/m7/m8/m9 group; the
  42/35/40/41/43/44/45/46 group); renames were out of scope — the records
  now describe the frames correctly where they cite them.
- Gartic's original-session GIF (214,639 bytes) remains header/size-
  verified only; the files audit did not frame-check it (the replay GIF,
  208,955 bytes, is frame-verified and embedded in the critique).
- The Field Guide round-authority question (live round vs headless
  replay directory) stays open for the parent; the live account is what
  the records now describe, with the replay directory flagged, not
  endorsed.
- Verdicts unchanged: Small Hours ready for the human gate; Vivid ready
  for the human gate; Bell proven end to end conditional on the one-line
  rule fix + fresh-player re-test; all unfinished expansion plays and
  second deep families [OPEN]. This follow-up pass's edits, like the
  first pass's, have not themselves been through plural independent
  review — that gate still stands before any delivery or filing.

### Embed counts, follow-up pass (before → after)

- Bell: journey 10 → 10; art 8 → 8; coverage 2 → 3; decision 4 → 4;
  session 4 → 4. Total 28 → 29.
- Moments: journey 20 → 20; art 9 → 9; coverage 3 → 3; decision 3 → 3;
  session 5 → 5. Total 40 → 40.
- Vivid: journey 16 → 16; art 11 → 11; coverage 2 → 3; decision 8 → 8;
  session 10 → 10. Total 47 → 48.
- Critique: 14 → 16.
- Package total: 129 → 133, zero missing embeds (resolve-checked from
  each file's directory after all edits).
