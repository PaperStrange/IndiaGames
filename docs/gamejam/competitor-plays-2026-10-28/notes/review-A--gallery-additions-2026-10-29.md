# Adversarial review — 9 NEW coverage-gallery embeds only (2026-10-29)

Scope: exactly the 9 embeds listed in the brief, in the Evidence galleries of the three
coverage records under `~/workspace/gamejam-studies/play-2026-10-28/`. The rest of the
package was already plural-reviewed and is out of scope here. Each coverage gallery
contains additional embeds outside this review (Bell: ROLLBACK/Core Rush shells,
Night OClock corridor; Moments: Drawize FORK, skribbl beat-3 text; Vivid: Pixel Harbor
beat 3, Field Guide in-game + pause) — not reviewed here.

Method: every render read by this reviewer as a PNG (GIF: first frame read + `file`
header check). All 9 files resolve from their record directories. No record edited,
nothing filed, pushed, or committed.

## Per-embed verdicts

### Bell — records/bell/coverage--bell-0.1.0-2026-10-28.md

1. L45 embed + L46 caption — The Same Bullet echo render
   (`../../competitors/the-same-bullet/render-echo-1.png`).
   Frame shows: HUD "Loop 02", "Echoes 01", "Time 4.0"; player disc left, red diamond
   target right, dotted trajectory between them with a small cyan mark near the
   middle. Caption claims: HUD values, player left, target right, "cyan echo trail";
   counters proven in capture; echo-replay/ricochet behavior stays [SECONDARY];
   Room 1 uncleared [OPEN].
   Verdict: counters CONFIRMED verbatim; slot correctly left [OPEN]; behavior
   correctly hedged [SECONDARY]. One qualification — see S1 (the cyan mark's
   identification as an "echo trail" comes from task prose, not from the frame
   alone). Not a shell: full game UI renders.

2. L48 embed + L49 caption — last seen online desktop render
   (`../../competitors/last-seen-online/render-desktop-1.png`).
   Frame shows: simulated desktop with "Buddy List" (speech-bubble icon),
   "LoseAmp Player" (music-note icon), "Other World" (eye icon), and
   "photos4em.zip" as a locked folder icon. Caption claims exactly those four
   elements, calls the ZIP "the unsolved gate itself", gate stays [OPEN],
   code unknown.
   Verdict: CONFIRMED exactly. No slot upgrade. Not a shell.

### Moments — records/moments/coverage--small-hours-2026-10-28.md

3. L47 embed + L48 caption — skribbl.io winner render
   (`../../competitors/skribbl-io/render-winner-1.png`).
   Frame shows: "BrowserTester is the winner!", "#1 BrowserTester 1015 points",
   "Round 3 of 3", podium #2 200, #3 195, #4 Tin 0. Caption claims: full 3 rounds,
   winner screen, BrowserTester 1st with 1,015 points, old Round-2 gap closed.
   Verdict: CONFIRMED exactly. "Full 3 rounds" is entailed by "Round 3 of 3" +
   winner screen. No deep-family claim is made by this caption (the Moments
   second-deep-family [OPEN] is stated elsewhere and untouched by it). Not a shell.

4. L50 embed + L51 caption — Drawasaurus TREE render
   (`../../competitors/drawasaurus/render-tree-1.png`).
   Frame shows: "The Cool Room2, Round 1/3", "Venkat is drawing TREE", large green
   tree drawing. Caption claims: Cool Room2 Round 1/3, Venkat drawing TREE, and
   explicitly "This is another player's drawing frame, not the agent's drawing
   turn, which never completed [OPEN]."
   Verdict: CONFIRMED exactly, including the disclaimer. The drawing turn is NOT
   upgraded. Not a shell.

5. L53 embed + L54 caption — Gartic album render
   (`../../competitors/gartic-phone/render-album-1.png`).
   Frame shows: "COOLNICKNAME8819'S ALBUM", "END OF COOLNICKNAME8819'S ALBUM",
   album panel with the line drawing, single player COOLNICKNAME8819 in the
   player list, "NEW TURN" button. Caption claims: COOLNICKNAME8819'S ALBUM end
   screen, the album the GIF exports; Solo only; telephone chain stays [OPEN].
   Verdict: CONFIRMED. The end-screen claim and the [OPEN] chain statement are
   both correct; the single-player list corroborates Solo. Not a shell.

6. L56 embed + L57 caption — Gartic album GIF
   (`../../competitors/gartic-phone/album-2026-10-28.gif`).
   First frame read: Gartic Phone album frame (logo, GARTICPHONE.COM, line
   drawing matching the album render). `file` verification: "GIF image data,
   version 89a, 770 x 490"; stat: 208,955 bytes. Caption claims: album export
   [REAL, GIF89a 770×490, 208,955 bytes] — the Solo session's album as a file.
   Verdict: CONFIRMED on all three measured values. The GIF caption does not
   itself restate the telephone-chain [OPEN], but it claims no chain either,
   and the adjacent album caption (L54) states it. Not a shell.

### Vivid — records/vivid/coverage--vivid-0.1.2-2026-10-28.md

7. L46 embed + L47 caption — Birdography journal render
   (`../../competitors/birdography/render-journal-1.png`).
   Frame shows: journal frame, heading "Black-Ca / ped / Chickade" clipped at
   the right edge, pixel chickadee, forest scene. Caption claims: journal frame,
   Black-Capped Chickadee, heading clipped at right edge, pixel chickadee,
   "Fixed species order, not discovery order."
   Verdict: frame description CONFIRMED exactly. One qualification — see S2
   (the fixed-order clause carries no evidence-class tag in this caption,
   while the live-update text labels that explanation [SECONDARY]). Not a shell.

8. L49 embed + L50 caption — Pixel Harbor charted render
   (`../../competitors/pixel-harbor/render-charted-1.png`).
   Frame shows: "PIXEL HARBOR", "Sailboat 5×5 · Shallows", timer 0:55,
   "CHARTED! Sailboat 5×5 · 0:55 · best 0:55", "Next puzzle / Back to harbor".
   Caption claims: fresh solve, Sailboat CHARTED, 5×5, 0:55, best 0:55,
   live-round best replacing the morning 2:42.
   Verdict: CONFIRMED exactly on every value. Not a shell.

9. L52 embed + L53 caption — PhotoHacks tutorial render
   (`../../competitors/photohacks/render-tutorial-1.png`).
   Frame shows: "TUTORIAL · STEP 1 OF 18" panel ("Welcome to PhotoHacks...
   Press [Enter] or 'Start'"), camera-controls panel (Zoom 24mm, Focus AF,
   Aperture f/5.6, Shutter 1/800s, ISO 100), park scene. Caption claims:
   Tutorial Step 1 of 18, camera controls panel + park scene, core loop
   (assignment photo + developed-photo report) stays [OPEN], tutorial only.
   Verdict: CONFIRMED exactly. The core loop is NOT upgraded. Not a shell.

## Cross-cutting checks

- Shells: none of the 9 is a page shell; all show legible game UI. The
  ROLLBACK/Core Rush shells elsewhere in the Bell gallery are labeled as shells
  ("Page shell, captioned honestly") — this review does not repeat that error
  in reverse for any of the 9.
- Slot upgrades: none. Same Bullet Room 1 [OPEN], last seen online gate [OPEN],
  Drawasaurus drawing turn [OPEN], Gartic telephone chain [OPEN], PhotoHacks
  core loop [OPEN] are all stated beside their photos. skribbl, Birdography,
  and Pixel Harbor captions claim only what their frames show (a completed
  session, a journal frame, a solved puzzle).
- Evidence classes: all 9 [REAL] / [REAL render] labels are justified by frames
  that show the claimed beat — except the two qualifications below, which are
  wording precision, not class failures.

## Findings

MUST-FIX: none.

SHOULD-FIX (2, both one-line caption qualifications, neither verdict-affecting):

- S1 — Bell coverage L45–L46 (Same Bullet): the alt text ("echo trail visible")
  and caption ("cyan echo trail") identify the small cyan mark on the dotted
  trajectory as an echo trail. The frame shows a dotted trajectory with a cyan
  mark; its identity as an echo comes from task prose, not from the frame
  alone. The caption body already hedges echo-replay/ricochet behavior as
  [SECONDARY]; qualify the trail identification the same way (e.g. "dotted
  trajectory with cyan mark, read as the echo trail per task prose") or drop
  "echo" from the alt text.
- S2 — Vivid coverage L47 (Birdography journal): the gallery caption states
  "Fixed species order, not discovery order" with no evidence-class tag, while
  the live-update text labels that explanation [SECONDARY]. Add the
  [SECONDARY] tag to the clause in the gallery caption so the caption stands
  alone at the right class.

## Verdict

NOT CLEAN — 0 MUST-FIX, 2 SHOULD-FIX, both one-line caption qualifications.
