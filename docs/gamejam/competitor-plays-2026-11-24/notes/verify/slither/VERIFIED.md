# Slither.io — capture verification (2026-11-24)

Task: browser-task:d0a386f6-2d67-5c17-9147-e14e28f06c87, ran 18:41–18:56 PST, outcome FAILED (blocked, site_error).
Source dir: ~/workspace/.hatch-browser/outputs/browser-task:d0a386f6-2d67-5c17-9147-e14e28f06c87/

## PDFs on disk (sizes match the task's receipts)

All 3 PDFs exist (~194 KB each, 1 page). Text layers are empty (canvas-rendered page). All three page-1 renders are BYTE-IDENTICAL.

| File | Bytes | Page-1 frame shows (caption written from the PNG) |
|---|---|---|
| browser-page-20261125T024445.551165595Z-51.pdf (f1) | 194,066 | Dark canvas, blank center. Corners only: "Graphics: High quality" (green snake, top right), "Change Skin" (purple snake, bottom left), "Choose Server" (globe, bottom right). |
| browser-page-20261125T025306.388605162Z-66.pdf (f2) | 194,031 | Identical frame to f1. |
| browser-page-20261125T025548.536730994Z-68.pdf (f3) | 194,128 | Identical frame to f1. |

## Verdict

- [REAL] (capture-verified): the page loaded (slither.io → slither.com/io); the dark canvas and the three corner controls are visible. That is all the captures prove.
- The three PDFs do NOT show three distinct states. The task labels them start screen / start screen / stuck spinner, but all three render identically with a blank center — the canvas-rendered menu (logo, Nickname field, Play button, tips) and the loading spinner did not print. Canvas-print failure, same class as Slope and TETR.IO.
- [SECONDARY] (task prose only, NOT in any capture): the start screen's center, the rotating tips ("Eat to grow longer!" / "When longer, hold the mouse for a speed boost!" / "Don't run into other players!"), nickname "Muse", greyed-out Play, the endless green/purple spinner, the five servers tried (8908, 3619, 4369, 7771, 4371) with ping times, the HTTPS warning + redirect, and the bot-challenge route move.
- Slot OPEN: no run started — no length, no score, no death, no leaderboard. The blocker (game-server connection never completing across 5 servers and 2 browsers/routes) is the task's account; retry needs a normal network where the connection completes, or a person driving the browser directly. Nothing the user could supply (no account, payment, or code was requested) would clear it.
