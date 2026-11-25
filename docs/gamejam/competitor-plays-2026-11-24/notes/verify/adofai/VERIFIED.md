# A Dance of Fire and Ice (ADOFAI) — capture verification (2026-11-24)

Task: browser-task:e34aaac8-dd68-5596-97b6-2f7494af93bc, ran 18:16–18:44 PST, completed.
Source dir: ~/workspace/.hatch-browser/outputs/browser-task:e34aaac8-dd68-5596-97b6-2f7494af93bc/

## PDFs on disk (sizes match the task's receipts)

All three are 13-page full-page PDFs of the itch.io page. Pages 2–7, 9–13 are pixel-identical across all three (itch chrome). The game canvas sits on page 1; page 8 is itch comments (f2/f3 share it; f1's lacks a loaded image grid).

| File | Bytes | Page-1 frame shows (caption written from the PNG) |
|---|---|---|
| browser-page-20261125T021649.353510824Z-1.pdf | 2,769,098 | Title screen: "A Dance Of Fire And Ice", "Highest Level Reached:0", "Hold R to reset data", CONTINUE, grey tile grid, red planet on a teal tile with blue planet orbiting, white circle at top right, "7th Beat Games v0.4.2 December 2018", "Any key to move, [ and ] to adjust calibrat…", Download Now button, launch trailer below. |
| browser-page-20261125T023208.191723607Z-33.pdf | 3,979,827 | Mid-path: same title screen, now 7 tiles colored (teal, red, green, purple), red planet on the purple tile, blue planet below-left. White circle still at top right, unreached. |
| browser-page-20261125T024410.590807578Z-49.pdf | 3,931,346 | Game area BLANK WHITE. No grid, no planets, no circle. The Unity canvas did not paint in the print. |

## Verdict

- [REAL] (capture-verified): demo loaded and played first-hand on fizzd.itch.io; title screen with "Highest Level Reached:0" and v0.4.2 Dec 2018; mid-path state with 7 colored tiles and the red planet on purple. The white WORLD 1 circle is unreached in BOTH f1 and f2.
- Level 0 NOT completed [REAL]: no result/completion screen in any capture, white circle never reached, "Highest Level Reached:0" still shown on f1/f2. The slot for a completed level 0 stays OPEN. The task states this honestly itself.
- f3 does NOT show the claimed final state: the task describes "blue planet anchored on a teal tile, red planet southeast, most tiles colored", but the frame is a blank white canvas — WebGL print failure, same class as Slope f2–f5 and TETR.IO. The final-state description is [SECONDARY] (task prose only). Do not present f3 as a gameplay frame.
- "Level 0 = the lobby path" is the task's framing (no separate level-0 button in the demo) — record as such, not independently verified.
- [SECONDARY] (task prose, no capture): Newgrounds bot-check ("NG Guard / Fetching a puzzle"), direct itch CDN embed unreachable, paid full version $3.99, downloadable files v3.3.1, the ~28-minute play duration and the per-move timing account (fast clicks moving planets backward/south, slow clicks forward).
- Advance since earlier rounds: level 0 is now ENTERED and played (earlier rounds reached only bare-number calibration, ~140 presses to cross the menu). Completion is still the open item.
