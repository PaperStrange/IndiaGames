# Mistake-hunt / executability review — live-window fold (2026-10-29)

Reviewer role: mistake-hunt / executability (Reviewer B), second round.
Scope: the "Live-window update 2026-10-29" sections appended to
`records/bell/coverage--bell-0.1.0-2026-10-28.md`,
`records/moments/coverage--small-hours-2026-10-28.md`,
`records/vivid/coverage--vivid-0.1.2-2026-10-28.md`,
`records/bell/decision--bell-0.1.0-2026-10-28.md`,
`records/moments/decision--small-hours-2026-10-28.md`,
`records/vivid/decision--vivid-0.1.2-2026-10-28.md`,
`critique--one-page-2026-10-28.md`, plus `notes/fold-live-2026-10-29.md`.
Sources checked against: `notes/live-replay--status-2026-10-28.md` and the live
PDF captures under `~/.hatch-browser/outputs/browser-task:<id>/`, re-run by
this review (pdftotext, pdftoppm renders, file counts, greps). No record was
edited; no filing, push, or commit was made.

## Verdict: PASS WITH FIXES

No MUST-FIX findings. Every [REAL] claim in the appended sections traces to a
re-verified capture; every number re-checked matches its source; no
deliberately-withheld claim leaked back in; third-person prose holds in all
appended sections. Seven SHOULD-FIX items follow (wording, annotation, and
one executability gap). All seven require fixing before delivery; none
requires re-play or new evidence.

## Verification performed by this review

### Required receipts, re-run independently

- skribbl.io winner PDF (`browser-task:1ed960b6…/-28.pdf`): text layer
  carries "BrowserTester is the winner!", "1015 points", "wuhuuuuuuu:
  sunset", "jack left the room!" — matches the records' "1,015 points, 1st"
  (comma is formatting only) and the "sunset" chat guess.
- Drawize FORK PDF (`browser-task:43f3ca00…/-27.pdf`): text layer carries
  "WORD: FORK" and "GAME FINISHED" — matches.
- Drawasaurus AFK PDF: two `-23` files exist and are correctly
  distinguished by timestamp in the fold log — the original (075434,
  Yakta choosing) carries no AFK text; the resumed run (083820) carries
  "Sorry, you were AFK!". The resumed `-22` carries "Round 1/3" and
  "Gucci is drawing _ _ _ _ _ _ _" — matches the Moments coverage claim
  of a game in progress, not a results screen.
- PhotoHacks PDF (`browser-task:d5924a56…/-18.pdf`, 074946): rendered by
  this review at 100 DPI and read visually — title screen only:
  "PhotoHacks", "ALPHA VERSION 0.6.0 - IN DEVELOPMENT", "MODE 1 OF 6
  Tutorial", language dialog ("Idioma · Language", "Español", partial
  "English"), "Enter" button. No gameplay. Matches the fold log and the
  Vivid coverage claim exactly.
- Bonus render: Birdography `-21` rendered and read — journal frame with
  the "Black-Capped Chickadee" heading clipped at the right edge,
  pixel-art chickadee, forest scene. Matches the fold log and the Vivid
  coverage claim exactly.

### Counts, re-counted

- 80 PDFs: counted across the 15 browser-task output directories —
  3 + 5 + 5 + 5 + 5 + 5 + 4 + 3 + 6 + 8 + 11 + 2 + 6 + 10 + 2 = 80,
  matching the fold log's per-directory counts exactly.
- Tranquility retry directory (`browser-task:a37af4ae…`) does not exist —
  matches the fold log's "zero PDFs" claim.
- Gartic GIF: 208,955 bytes, GIF89a, 770×490, verified on disk — matches
  the live-update figure. The history section's 214,639 bytes is the
  different morning-run GIF; the two files are kept separate and are not
  confused anywhere in the appended sections.
- Gallery embeds: 28 `![` lines counted across the 15 record files —
  matches the rebuild count; the fold added no embeds, so no new caption
  claims exist.

### Text-layer presences and absences, re-checked

- Present as claimed: ROLLBACK `-22` "PROMISE"; Pixel Harbor `-15`
  "Sailboat / CHARTED!", `-20` "Anchor / CHARTED!", `-6` "Sailboat /
  2 / 8 charted / Anchor / 0 / 16 charted"; Gartic `-23`
  "COOLNICKNAME8819'S ALBUM" + "END OF COOLNICKNAME8819'S ALBUM";
  Same Bullet `-1` numerals "01 / 00" and `-12` numerals "02 / 01"
  beside LOOP/ECHOES/TIME labels; last seen online `-7` "xXemmberXx86"
  and "alonegurl15: IT'S ME, LIZ!!" (line-wrapped in the layer — a
  single-line grep misses it; the full dump confirms it); Reign `-9`
  "Round3", "Trade", "End turn", "Cancel"; Drawize `-22`/`-25`
  "WORD: FORK", `-2` "DRAW AND GUESS / TIME: 1:42"; skribbl `-24`
  "DRAW THIS / fry / Round 2 of 3".
- Absent as claimed: no Cleo/Ada/Bram/Brick/Lumber/glowing-spot text in
  any of the 4 Reign PDFs (scores, trade, and road prompt correctly
  carried as [SECONDARY]); no uppercase HOLD/depth/$50 HUD values in
  any of the 3 Core Rush PDFs. Precision note (not a finding): the
  words "Topsoil" and "ore" do appear in the Core Rush text layers, but
  only inside itch marketing prose ("Six layers to dig through, from
  the soft Topsoil…", "fill your hold with ore") — not as HUD values.
  The records' wording ("no ore breakdown", "no HUD values") survives.
- Night OClock: all 11 text layers carry only the title string
  ("Night OClock", 16 chars with form feeds) — no gameplay text. See
  S6 for the wording consequence.
- Field Guide / PhotoHacks: all text layers 1 char (empty). Tranquility
  first-window PDFs: both exactly 11,780 bytes, empty text layers.

### Deliberately-withheld claims: confirmed out

- "sunflower won" results screen: appears only in negated contexts
  (Moments coverage line 57: "NOT a 'sunflower won' results screen";
  fold log item 1: "was not carried"). No affirmative claim exists.
- Drawasaurus word-choice / results PDFs: none claimed anywhere; the
  Moments coverage and the interaction note state explicitly that none
  exist in the receipts.
- Night OClock corridor / camera / tutorial as [REAL]: the Bell
  coverage presents them as [SECONDARY] only (line 57). The critique
  bullet carries no [REAL] tag for them — see S3 for the labeling gap.
- Field Guide f2–f5 as exploration / photo / gallery beats: explicitly
  excluded in the Vivid coverage ("prove nothing beyond the menu") and
  the critique ("menu only").
- "1 coal" in the updated sections: struck in all three appended
  sections (Bell coverage line 52, Bell decision line 53, critique line
  47). The brief's scoped check PASSES. See S1 for the history-section
  residue.

### Third-person, paths, cross-file numbers

- First-person grep (word-boundary) over all appended sections, the
  fold log, and the interaction-note append: zero hits. Whole-file
  hits are verbatim game quotes only ("I don't know", "I was
  frightened every night", "JUST US", "Tuck away my detail").
- All cited paths resolve: 9 gallery image paths (from the `records/`
  subdirectories) and 6 decision-ledger paths (from the package root)
  exist on disk. The interaction note's Case 3 (Drawasaurus AFK) exists
  and matches the Moments coverage citation (Chicken/Sloth rooms, no
  word-choice PDF).
- Numbers consistent across all seven files and the fold log: skribbl
  1,015; Pixel Harbor 0:55/0:45 (carried as [SECONDARY] everywhere);
  last seen online 24 permutations, ~15 other codes, 3124 confirmed
  wrong, 1243/3142 "no unlock observed"; 28 embeds; 80 PDFs.
- Brief examples checked and found not carried (no defect): "ROLLBACK
  Run 2 at 03:32" appears nowhere in the targets (no claim to check);
  "sunflower 431 / MuseWatcher 38" appear only in the status source,
  not in any target — correctly not carried, since no score PDF exists
  in the Drawasaurus receipts.

### Executability of the 20 November actions (critique lines 26–32)

- Actions 1–4 each name an owner and a concrete first step: Bell branch
  owner (one in-game line + fresh-player re-test); gate owner (fold
  unplayed items into the gate plan); release coordinator (assign
  facilitator + 12 people for Small Hours; facilitator + 6 pairs for
  Vivid). PASS.
- Action 5 (loopback issue #5) is filed, but its forward need names no
  owner — see S7.

## MUST-FIX

None.

## SHOULD-FIX

### S1. History sections still state "1 coal" as fact, unannotated

Files + lines (history text, not appended sections):
- `records/bell/coverage--bell-0.1.0-2026-10-28.md` line 11 (row 2:
  "one tile yielded 1 COAL (HOLD 1/8) — the only completed beat" and
  "at the 1-coal state") and line 23 (coverage check: "1 coal dug, loop
  unreached" and "at the 1-coal state").
- `records/bell/decision--bell-0.1.0-2026-10-28.md` line 42 (ledger:
  "1 coal dug, loop unreached" and "at the 1-coal state").
- `critique--one-page-2026-10-28.md` line 24 ("dug exactly 1 coal
  (HOLD 1/8…)" and "at the 1-coal state").
Source value: HOLD 1/8 is not verified coal (no ore breakdown in HUD
text or any capture text layer — confirmed by this review's Core Rush
text-layer check). Written value in history: "1 coal" as a completed
beat. The appended strikes are correct and operative, and the fold log
discloses that history was not rewritten — but a reader who stops at
the main body carries the false claim away. Fix: annotate each of the
four history passages with a pointer ("[struck — see Live-window
update 2026-10-29]"), or rewrite them. Also broaden the Bell coverage
appended correction's scope sentence (line 52: "superseding row 2
above and the critique") — it omits the line 23 coverage-check
occurrence.

### S2. Wrong direction word in the Bell decision correction

File: `records/bell/decision--bell-0.1.0-2026-10-28.md` line 53.
Written: 'the "1 coal" claim in the evidence ledger below is struck'.
Source: the evidence ledger (line 42) precedes the appended section
(line 49+). Fix: "below" → "above".

### S3. Critique expansion bullet leaves [SECONDARY] clauses unlabeled

File: `critique--one-page-2026-10-28.md` line 48 ("Expansion partials,
all [OPEN] where unfinished: … Night OClock tutorial reached, … last
seen online desktop reached, … Drawasaurus guessing only …").
Source values: the Bell coverage labels the Night OClock tutorial
[SECONDARY] (line 57) and the last seen online desktop [SECONDARY];
the Moments coverage labels Drawasaurus guessing [SECONDARY] (line
57). The critique bullet attaches no evidence label to these three
clauses, while its neighboring clauses (Same Bullet loop numerals,
Reign Round 3 tokens, Drawize FORK) are capture-backed. In a one-page
summary — the text Sakura reads first — bare "reached" reads as fact.
Fix: add [SECONDARY] to the Night OClock tutorial, last seen online
desktop, and Drawasaurus guessing clauses in this bullet.

### S4. "Quiet Express as substitute candidate" contradicts the sweep

File: `records/bell/decision--bell-0.1.0-2026-10-28.md` line 53.
Written: "leaving the Quiet Express: Cabin 909 demo as the substitute
candidate (market-only, Steam-demo-only per the sweep)". Source:
`notes/sweep-more-competitors-2026-10-28.md` line 43 — Quiet Express
is "MARKET-ONLY", "Steam account required (by platform)", "Do NOT
present as playable". A market-only, account-gated Steam demo is not an
executable second-deep route, and the sentence as written implies a
live substitute remains. The coverage revised check correctly keeps the
second deep [OPEN]. Fix: reword to state that no executable
second-deep route remains — Quiet Express is market-only per the sweep
and the human Core Rush route is dead.

### S5. Critique tooling note overgeneralizes Tranquility's block

File: `critique--one-page-2026-10-28.md` line 52. Written: "the
live-browser visual-click path failed with page_busy across
canvas/WebGL boards in this round, which is what blocked Reign's road,
Same Bullet's aim, Field Guide's Start, and Tranquility's Run game".
Source: the Tranquility retry report — visual clicks failed on every
page including example.com (browser-wide, not board-specific), and the
first window failed on the Unity loader, not on clicks. Reign's road,
Same Bullet's aim, and Field Guide's Start are canvas/WebGL-board
failures; Tranquility's Run game is not. Fix: narrow the sentence so
Tranquility is attributed to the browser-wide click failure (and PDF
capture failure), not to canvas/WebGL boards.

### S6. "Empty text layers" is imprecise for Night OClock

Files: `records/bell/coverage--bell-0.1.0-2026-10-28.md` line 57 and
`notes/fold-live-2026-10-29.md` lines 40, 51. Written: "the 11
gameplay-state PDFs carry empty text layers". Source value measured by
this review: each Night OClock text layer is 16 chars — form feeds
plus the title string "Night OClock". No gameplay text exists, so the
substantive point stands, but "empty" is literally false. Fix: reword
to "carry no gameplay text (title string only)". Field Guide and
PhotoHacks text layers are genuinely 1 char (empty) and need no change.

### S7. Critique action 5's forward need has no owner

File: `critique--one-page-2026-10-28.md` line 32. The issue itself is
filed (issue #5, done), but the sentence's forward need — "a supported
loopback path or a blessed file:// protocol" — names no owner and no
first step, unlike actions 1–4. Fix: assign an owner (e.g. release
coordinator) and a first step, or mark the forward need as owned by
the gate plan in action 2.

## Source-hygiene observation (not a target defect, not blocking)

`notes/live-replay--status-2026-10-28.md` carries two defects that the
fold did not propagate into the targets (the Vivid coverage correctly
separates Tranquility from PhotoHacks): (1) the Tranquility
first-window paragraph (direct-embed loader stuck at ~97%, itch-page
retry blocked) sits as an orphan trailing paragraph under the
PhotoHacks bullet with no "Tranquility" header; (2) the closing line
"Status as of 2026-10-29 00:37 PDT: all 9 working" is stale against
the 01:45 entries above it. Fix the source file before any future
fold; the targets are unaffected.

## Fixes required before delivery (exact list)

1. S1: annotate the four history "1 coal" passages (Bell coverage
   lines 11, 23; Bell decision line 42; critique line 24) with a
   pointer to the appended strike; broaden the Bell coverage line 52
   scope sentence to include the line 23 occurrence.
2. S2: Bell decision line 53 — "evidence ledger below" → "above".
3. S3: critique line 48 — add [SECONDARY] to the Night OClock
   tutorial, last seen online desktop, and Drawasaurus guessing
   clauses.
4. S4: Bell decision line 53 — reword the Quiet Express sentence to
   state no executable second-deep route remains.
5. S5: critique line 52 — attribute Tranquility's block to the
   browser-wide click/PDF failure, not to canvas/WebGL boards.
6. S6: Bell coverage line 57 + fold log lines 40, 51 — "empty text
   layers" → "no gameplay text (title string only)" for Night OClock.
7. S7: critique line 32 — assign an owner + first step to the
   loopback-path forward need, or fold it into action 2's ownership.
8. Source hygiene (non-blocking for these targets): repair the orphan
   Tranquility paragraph and the stale "Status as of" line in
   `notes/live-replay--status-2026-10-28.md`.
