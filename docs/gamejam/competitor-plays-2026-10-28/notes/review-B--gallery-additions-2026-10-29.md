# Mistake-hunt review — 9 new coverage-gallery embeds (scoped)

Scope: ONLY the 9 embeds added 2026-10-29 to the Evidence galleries of the three
coverage records. The rest of the package was already plural-reviewed and is not
re-reviewed here. No record was edited; no user contacted; nothing filed, pushed,
or committed.

## Embeds reviewed (file + line + embedded path)

- Bell coverage L45 — The Same Bullet echo render
  (`../../competitors/the-same-bullet/render-echo-1.png`)
- Bell coverage L48 — last seen online desktop render
  (`../../competitors/last-seen-online/render-desktop-1.png`)
- Moments coverage L47 — skribbl-io winner render
  (`../../competitors/skribbl-io/render-winner-1.png`)
- Moments coverage L50 — Drawasaurus TREE render
  (`../../competitors/drawasaurus/render-tree-1.png`)
- Moments coverage L53 — Gartic album render
  (`../../competitors/gartic-phone/render-album-1.png`)
- Moments coverage L56 — Gartic album GIF
  (`../../competitors/gartic-phone/album-2026-10-28.gif`)
- Vivid coverage L46 — Birdography journal render
  (`../../competitors/birdography/render-journal-1.png`)
- Vivid coverage L49 — Pixel Harbor charted render
  (`../../competitors/pixel-harbor/render-charted-1.png`)
- Vivid coverage L52 — PhotoHacks tutorial render
  (`../../competitors/photohacks/render-tutorial-1.png`)

## Checks performed

1. Resolve: all 9 paths exist from their record directories — zero missing.
2. Frames: all 9 renders read by this reviewer personally (8 PNGs + GIF first
   frame). No caption was trusted from a filename or a TXT dump.
3. Duplicates: md5 over every embed in the three coverage files plus the
   critique. No two DIFFERENT embedded paths share an md5. The duplicate hashes
   found are the SAME file embedded in both a coverage record and the critique
   (e.g. night-oclock corridor, drawize FORK, gartic GIF, birdography journal,
   pixel-harbor charted, field-guide in-game/pause) — legitimate reuse, not
   duplication.
4. GIF: file verified at the embedded path — GIF89a, 770x490, 208,955 bytes,
   all three claimed properties match.
5. Caption-vs-frame: each caption below was checked word-by-word against its
   frame.

## Per-embed findings

- Bell L45, echo render — MOSTLY ACCURATE, one wording fix (see SHOULD-FIX).
  Frame shows HUD "Loop 02", "Echoes 01", "Time 4.0", player left, red-diamond
  target right, a dotted trajectory line between them, a faint "01" watermark.
  Counters are proven by the frame. The dotted line's identity as an "echo
  trail" is not established by this static frame — it could equally be the
  bullet's trajectory/aim line — and the row text itself correctly scopes
  echo-replay/ricochet behavior to task prose [SECONDARY].
- Bell L48, desktop render — ACCURATE. Frame shows the pink checkered
  simulated desktop with "Buddy List" (speech-bubble icon), "LoseAmp Player"
  (music-note icon), "Other World", and "photos4em.zip" with a padlock icon.
  The caption claims the gate, not the code, and the row text states the gate
  stays [OPEN] and the code is unknown. No overclaim.
- Moments L47, skribbl-io winner render — ACCURATE. Frame shows
  "BrowserTester is the winner!", "#1 BrowserTester 1015 points", Round 3 of 3,
  podium, leaderboard "BrowserTester (You) 1015 points" 1st. The coverage
  gallery embeds only the skribbl-io/ render (see duplicate analysis).
- Moments L50, TREE render — ACCURATE. Frame shows "The Cool Room2, Round 1/3",
  "Venkat is drawing TREE", a large green tree drawing, and "MuseWatcher" in
  the header as observer. The caption correctly attributes the drawing to
  Venkat, another player — it does not claim the agent's turn.
- Moments L53, album render — ACCURATE. Frame shows "COOLNICKNAME8819'S
  ALBUM", "PLAYERS: COOLNICKNAME8819", "END OF COOLNICKNAME8819'S ALBUM",
  animation panel, download and "NEW TURN" buttons. It is the Solo album end
  screen as captioned.
- Moments L56, album GIF — ACCURATE. File at the embedded path is GIF89a,
  770x490, 208,955 bytes. First frame shows the Gartic Phone album panel
  (logo, GARTICPHONE.COM, line-drawing panel). The caption describes the file
  and its dimensions, both verified.
- Vivid L46, journal render — ACCURATE. Frame shows the journal page with
  heading "Black-Ca / ped / Chickade" clipped at the right edge, pixel-art
  chickadee, forest scene. Matches the caption exactly.
- Vivid L49, charted render — ACCURATE. Frame shows "PIXEL HARBOR",
  "Sailboat, 5x5 · Shallows", timer 0:55, grid, "CHARTED! Sailboat, 5x5 · 0:55 ·
  best 0:55". Matches the caption exactly.
- Vivid L52, tutorial render — ACCURATE. Frame shows "Tutorial", the
  "Controls - Compact" panel (Mouse/WASD/Look, wheel zoom, click, focus,
  aperture, shutter, ISO), the park scene with gazebo, and "TUTORIAL - STEP 1
  OF 18". Step 1 only, camera controls, park scene — all as captioned.

## Duplicate analysis (skribbl winner pair)

- `competitors/skribbl-io/render-winner-1.png` (128,072 bytes,
  md5 d639e8edcd3dcb32e3421dd913eae434) vs
  `competitors/skribbl/render-winner-1.png` (111,027 bytes,
  md5 0211f10daecd0d67bd7b3f7fdb917a5d) — DIFFERENT files, not byte-identical.
  The coverage gallery embeds only the skribbl-io/ one (Moments L47), as
  required. No byte-identical pair is embedded twice anywhere in the checked
  set.

## Findings

MUST-FIX: none.

SHOULD-FIX (1, minor, does not block delivery for Sakura's review):

- S1 — Bell coverage L45, echo caption: "The Same Bullet Loop 02 / Echoes 01:
  loop counters advanced, echo trail visible" → reword "echo trail visible"
  to "dotted trajectory line visible". Reason: the static frame proves the
  counters (Loop 02 / Echoes 01 in the HUD) but does not establish that the
  dotted line is an echo trail rather than a trajectory/aim line, and the row
  text already scopes echo-replay/ricochet behavior to [SECONDARY]. The same
  "cyan echo trail" wording appears in the row text directly below the embed;
  aligning both wordings at the same time is recommended but the row text is
  outside this scoped review's edit surface.

## Observation (out of scope, for the parent, not a finding)

Two distinct winner renders exist across the package: the critique embeds
`competitors/skribbl/render-winner-1.png` (critique L63) while the coverage
gallery embeds `competitors/skribbl-io/render-winner-1.png` (Moments L47).
They are different files (different sizes and hashes, same winner screen), so
this is not a duplication violation. If the parent wants a single canonical
winner render, consolidating is a cleanup choice, not a correctness fix.

## Verdict

Verdict: PASS WITH FIXES
