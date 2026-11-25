# TETR.IO — capture verification (2026-11-24)

Task: browser-task:25ee8add-e830-51f0-99c4-241c2589fd80, ran 18:18–18:28 PST, outcome FAILED (browser_failure: WebGL disabled).
Source dir: ~/workspace/.hatch-browser/outputs/browser-task:25ee8add-e830-51f0-99c4-241c2589fd80/

## PDFs on disk (sizes match the task's receipts)

| File | Bytes | Pages | Page-1 frame shows (caption written from the PNG) |
|---|---|---|---|
| browser-page-20261125T022051.191102284Z-11.pdf | 739,014 | 2 | SOLO mode picker, fully rendered: 40 LINES ("COMPLETE 40 LINES AS QUICKLY AS POSSIBLE"), BLITZ, ZEN LVL 1, CUSTOM. Guest GUEST-1119II2 / ANONYMOUS. "PICK A GAME MODE". |
| browser-page-20261125T022148.426168989Z-14.pdf | 35,947 | 2 | BLACK frame. Only "REPLAY WILL NOT BE SAVED" at the bottom. No board, no pieces, no HUD visible. |
| browser-page-20261125T022448.484977143Z-18.pdf | 102,652 | 2 | RETRY and BACK TO TITLE bars on black. No score, lines, time, or results numbers visible. |
| browser-page-20261125T022808.291318242Z-27.pdf | 102,652 | 2 | RETRY and BACK TO TITLE bars on black — page-1 render byte-identical to f3 (same sha256). No score, lines, time, or results numbers visible. |

## Verdict

- [REAL] (capture-verified): guest login as GUEST-1119II2; SOLO picker with the four modes and taglines; both end menus showing only RETRY / BACK TO TITLE with no results numbers. Menus are DOM-rendered and print; the game canvas does not.
- [SECONDARY] (task prose only, NOT in the captures): all gameplay detail — pieces moved/rotated/dropped, 1 line cleared in run 1, HUD values (PIECES 8, LINES 1/40, TIME 1:28.350; PIECES 13, LINES 0/40, TIME 1:34.283), and the "snowy-mountain background" on run 2. The task reports seeing these live, but f2 is a black shell and f4 is byte-identical to f3. Per the evidence-class law, browser-task prose is [SECONDARY], never [REAL]. Do NOT present f2 as a gameplay frame.
- Failure class: WebGL disabled in this browser — same class as Townscaper (Unity WebGL blank shells). The page's own warning confirms it ("TETR.IO requires WEBGL"). A re-run in this browser would hit the same wall; no retry ordered.
- [OPEN]: 40-line completion, results screen, leaderboard / personal-best chase, hold via C. Slot stays OPEN until first-hand play on a WebGL-capable browser or by a person driving the browser directly. The score loop as observed: 40 LINES chases time, not points ("score doesn't matter here, just go for the world record!") — that tagline is on the DOM picker frame, [REAL]; the RETRY loop itself is unproven as a chase because no time or rank was ever displayed.
- Keys verified in live play per the task (arrows + Space; hold needs C/SHIFT per CONFIG, unverified in play) — [SECONDARY], recorded as the task's claim, not capture-verified.
