# Pixel Harbor — standalone Playwright replay (2026-10-28 brief, run 2026-10-29 UTC)

**Outcome: both puzzles solved first-hand, 6 PNG beats banked, progress persisted (Shallows 2 / 8 charted). Both defects from the prior play reproduced.**

## Route (and why it is not the brief's literal route)

1. **Proxy-first launch failed.** Chrome launched per the brief
   (`--headless=new --disable-gpu --window-size=1280,800 --remote-debugging-port=9275
   --user-data-dir=/tmp/pw-replay-pixelharbor`, plus `--no-sandbox`, which is
   required because this VM runs as root) returned `ERR_TUNNEL_CONNECTION_FAILED`
   for `https://asddokht.itch.io/pixel-harbor`.
2. **Direct game URL failed the same way.** `curl` fetched the itch page
   (HTTP 200, 25,254 bytes) and exposed the embed URL
   `https://html-classic.itch.zone/html/20008300/index.html?v=1792880033`,
   but Chrome-via-proxy failed on that URL too with
   `ERR_TUNNEL_CONNECTION_FAILED`.
3. **`--no-proxy-server` is not available in this environment.** With it,
   Chrome's pages resolve only to a policy notice: direct TCP is turned off
   for this assistant. So no Chrome route to the live host exists here.
4. **Fallback actually used: curl-fetched live code, played via file://.**
   The game is a single self-contained HTML file (57,676 bytes; its only
   external reference is `static.itch.io/htmlgame.js`, the itch frame helper,
   also fetched). It was downloaded from the live URL above on 2026-10-29 and
   played unmodified via `file://` — the same bytes a browser would run, with
   all clicks performed by this driver (not a replay of old reports). A copy
   is kept at `~/workspace/gamejam-studies/play-2026-10-28/pw/ph-game/index.html`
   for re-runs. One visible consequence of the date rollover: the level
   select shows Daily Tide #302 / Thu, Oct 29 (prior play, Oct 28, was #301);
   the Shallows puzzles themselves are unchanged, and the prior solutions
   reproduced exactly.

## Beats captured (each PNG + innerText .txt, 1280×800)

| Beat | File | Content |
|---|---|---|
| Level select | `01-level-select.png/.txt` | "PIXEL HARBOR — picture-logic puzzles from the quay", Shallows 5×5 "0 / 8 charted" |
| Check-wrong (extra) | `02a-check-wrong.png/.txt` | Wrong fill + Check status (see defects) |
| Mid-board | `02-sailboat-mid.png/.txt` | Puzzle 1 with 10 of 15 cells filled (cell class `f` confirmed on all 10) |
| Sailboat solved | `03-sailboat-solved.png/.txt` | "CHARTED!" / "Solved! The picture is Sailboat." — 5×5 · 0:11 · best 0:11 |
| Anchor solved | `04-anchor-solved.png/.txt` | "CHARTED!" / "Solved! The picture is Anchor." — 5×5 · 0:03 · best 0:03 |
| Harbor after | `05-harbor-after.png/.txt` | Shallows "2 / 8 charted", "Sailboat" / "Anchor" tiles |

PNG sizes 142,256–240,013 bytes; all verified `PNG image data, 1280 x 800`;
the two solved frames were eyeballed: Sailboat = yellow sail over brown hull
on pale blue; Anchor = plain navy cross/anchor on pale blue. The
"Solved! The picture is …" line is present in the innerText dumps (it is a
status/live-region line, not a visible panel line in the frame).

## Play actually performed

- Puzzle 1 (clues confirmed on screen: columns 1, 2, 5, 4, 3; rows 1, 2, 3, 5, 4):
  Fill tool selected; wrong cell (row 1, col 2) filled, Check, Undo, then the
  15 solution cells clicked individually: row 1 col 3; row 2 cols 3–4;
  row 3 cols 3–5; row 4 all five; row 5 cols 2–5. Game auto-solved on the
  final cell — no separate submit.
- Puzzle 2 via "Next puzzle" (clues confirmed: columns 1, 1-1, 5, 1-1, 1;
  rows 1, 3, 1, 1-1-1, 3): 11 cells clicked individually — row 1 col 3;
  row 2 cols 2–4; row 3 col 3; row 4 cols 1, 3, 5; row 5 cols 2–4.
  Symmetrical cross/anchor, auto-solved on the final cell.
- "Back to harbor" confirmed persistence: Shallows "2 / 8 charted" with
  Sailboat/Anchor tiles.

## Defects — both prior findings CONFIRMED from this play

1. **Grammar bug, reproduced exactly:** after one wrong fill, Check reports
   `1 square look wrong` (should be "looks wrong"). Screenshot `02a-check-wrong`.
2. **Stale status text, reproduced exactly:** immediately after "Next puzzle",
   the fresh Puzzle 2 board still carried `Solved! The picture is Sailboat.`
   from Puzzle 1 (verified in the live DOM text dump before any Puzzle 2
   click); it was replaced only by the Anchor message on solving Puzzle 2.
3. Anchor reveal is monochrome navy vs Sailboat's coloured reveal — same
   contrast as prior play (visible in `04-anchor-solved.png` vs
   `03-sailboat-solved.png`).

## Honest gaps / caveats

- **Solve times are scripted-click times, not human play times** (0:11 and
  0:03 — clicks fired ~250 ms apart). They prove the puzzles solve, not a
  human difficulty reading. Prior human-paced times were 2:42 / 0:45.
- **Not played through the live itch host in Chrome** (see route above:
  proxy tunnel failure + direct-TCP denial). Play was of the live file's
  exact bytes via file://. If a reviewer needs a live-host session, that
  needs a browser context with working egress to itch.zone, which this
  environment does not provide.
- **Not tested:** Mark tool (✕) on a cell, Clear, Zoom, sound, keyboard
  play, drag-painting, Daily Tide, 10×10 / 15×15 boards. Fill, Undo, Check,
  Next puzzle, Back to harbor were all exercised.
- Chrome was killed by PID only (PID 17497, confirmed gone); no `pkill -f`
  was used. No files were written outside the replay directory except the
  reusable game copy under `pw/ph-game/` and scratch under `/tmp`.
