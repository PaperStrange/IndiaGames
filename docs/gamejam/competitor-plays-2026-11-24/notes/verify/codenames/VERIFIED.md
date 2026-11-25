# Codenames (Daily) — capture verification (2026-11-24)

Task: browser-task:b064e346-3a89-594c-af91-7bf7517affc5, ran 18:24–18:31 PST, completed.
Source dir: ~/workspace/.hatch-browser/outputs/browser-task:b064e346-3a89-594c-af91-7bf7517affc5/

## PDFs on disk (sizes match the task's receipts)

| File | Bytes | Pages | Page-1 frame shows (caption written from the PNG) |
|---|---|---|---|
| browser-page-20261125T022729.613751409Z-24.pdf | 517,293 | 2 | CODENAMES DAILY board: a grid of illustrated picture cards (people and a dog), "Double-tap a card to…" at top, clue pill "DISASTERS" at bottom right. Right edge of the page is cut off in the print. |
| browser-page-20261125T022803.830553761Z-26.pdf | 559,495 | 2 | Same picture board; ONE card carries a green border (row 2, right visible column — man with glasses holding a card). Clue pill "DISASTERS". |
| browser-page-20261125T023058.125845221Z-31.pdf | 331,539 | 1 | Result screen: 4 stars, 24. 11. 2026, DISASTERS 2 / FLIGHT 3 / DENTIST 4 / CAMPING 4 all ticked with green checks. "Only 22.53% players have beaten today's puzzles without a single mistake." "Next set in 21 h 33 min." "All the puzzles were created by the CODENAMES APP players." / "I WANT TO JOIN". |

## Verdict — with one discrepancy caught

- [REAL] (capture-verified): a full Codenames Daily run completed — 4 stars, all four clues ticked, the 22.53% no-mistake line, dated 24.11.2026. Free, no account (no account step appears in any frame; "I WANT TO JOIN" is the app promo, not clicked).
- DISCREPANCY — words vs pictures: the task's report describes a 16-WORD board and per-guess words (VOLCANO, FLOOD, TOUCAN, DELTA, SANTA, MOUTH, MIRROR, DOCTOR, UNIFORM, TENT, FIRE, COOK, GROUND) with "VOLCANO and FLOOD highlighted with green borders". The frames show a PICTURE board, and f2 shows exactly ONE green-bordered card. The 16 words DO exist in the PDFs' text layers (BOX, WONDERLAND, …), so the words are in the page DOM — but the visible board is pictures. The per-guess word claims are therefore [SECONDARY] (task prose, not confirmed by the frames). Records must say: Daily completed, 4 stars, no mistakes; the specific word guesses are the task's account, not capture-verified. Do NOT present f1/f2 as a word board.
- [OPEN]: multiplayer lobby — the task says ENTER GAME reloaded the homepage twice with no room appearing. No capture of that attempt was filed, so it stays [SECONDARY] as a reported failure, not capture-verified. The party-multiplayer beat is unplayed in this round; only solo Daily is verified.
- Capture limit: f1/f2 are cut off at the right edge (page wider than the print area) — the rightmost column and the clue number are clipped on page 1.
- Coverage note: party word deduction, solo-daily form. The multiplayer (spymaster vs guessers, the actual party form) is the unplayed part; the Daily proves the word-association core only.
