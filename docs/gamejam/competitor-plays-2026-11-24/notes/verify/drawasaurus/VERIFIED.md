# Drawasaurus (refresh) — capture verification (2026-11-24)

Task: browser-task:5030747e-f046-57ba-8458-d29b93b62639, ran 18:18–19:13 PST, outcome FAILED (browser_failure, partial — 3 of 4 beats captured; drawing turn OPEN).
Source dir: ~/workspace/.hatch-browser/outputs/browser-task:5030747e-f046-57ba-8458-d29b93b62639/
Note: the handoff's receipts list is empty, but all 5 PDFs are on disk.

## PDFs on disk

| File | Bytes | Pages | Page-1 frame shows (caption written from the PNG) |
|---|---|---|---|
| f1 (…T021915-7) | 102,653 | 2 | "The Rabbit Room, Round 2/3, Dead is drawing _ _ _ _ _" — black canvas, white line drawing (two rounded shapes, a long line). Guessing beat. |
| f2 (…T022253-17) | 102,622 | 2 | "The Rabbit Room, Round 2/3, Steven was drawing FULL MOON" — teal canvas, white circle + star/arrow marks. Round-end reveal. |
| f3 (…T022640-21) | 63,147 | 1 | "The Rabbit Room, Round 1/3, Dead is choosing a word..." — green countdown circle showing 10. |
| f4 (…T023825-41) | 64,051 | 1 | "The Narwhal Room, Round 1/3, May May is drawing _ _ _ _ _ _" — white canvas, one black vertical stroke (drawing just started). |
| f5 (…T030349-70) | 133,077 | 2 | "The Lion Room, Round 3/3, Game Over! / MuseWatcher won! / #1. MuseWatcher 70 / #2. Kage 64 / #3. Cupcake_ 0 / #4. Dead -5" over the ART drawing (a face, red "Fart" lettering at top). |

## Verdict

- Correction — f2 is NOT an AFK screen: the task flagged it "uncertain, do not rely on it" (it thought the save delay let the AFK screen appear), but the frame is the FULL MOON round-end reveal. It corroborates the correct "full moon" guess. The task was honest about its uncertainty; the verification resolves it in the task's favor.
- [REAL] (capture-verified): guessing beat (f1), two game-start beats (f3 Rabbit, f4 Narwhal), the win — "MuseWatcher won!" with exact standings #1 70, #2 Kage 64, #3 Cupcake_ 0, #4 Dead -5 (f5). Guest name MuseWatcher on every frame. The 15-second word-choice window is corroborated by f3's countdown showing 10.
- [OPEN] — drawing turn: no drawing-turn capture exists. The task reached the choice screen 5 times and failed each (15s window vs 5–20s browser round trips; "Swing" was chosen but the turn was cut by an AFK kick before any drawing could be verified; 3 drag strokes unverified). The site worked; the blocker is this browser's latency against the game's timers. A retry needs a faster input path or a room where the window can be caught with ~10s to spare.
- [SECONDARY] (task prose, not on the frames): per-turn guesses and scores (FULL MOON +50, OCEAN +20, ART +50, the -5 no-guess penalties, drawer +14), the ban from the Monkey Room ("MuseWatcher was banned by Sharath"), the four AFK kicks, the chat log behind f5 ("Kage was drawing ART. 1/3 players guessed it correctly. (+14)"), the timer values (33s on f1, 60s on f4), the home page and room-list details, the 44–80 players online.
- Change-vs-Oct-28: NOT made [OPEN] — the task correctly refused (no study copy was given). The live record above is what a comparison would diff against.
