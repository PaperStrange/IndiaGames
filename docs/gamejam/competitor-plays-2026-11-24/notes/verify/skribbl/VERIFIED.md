# skribbl.io (refresh) — capture verification (2026-11-24)

Task: browser-task:778081d6-776d-5a57-b52b-880b63005979, ran 18:16–18:42 PST, completed.
Source dir: ~/workspace/.hatch-browser/outputs/browser-task:778081d6-776d-5a57-b52b-880b63005979/

## PDFs on disk (sizes match the task's receipts)

| File | Bytes | Pages | Page-1 frame shows (caption written from the PNG) |
|---|---|---|---|
| browser-page-20261125T021734.397724724Z-2.pdf | 212,422 | 2 | Guessing: "GUESS THIS", 4+5 hints, 55s, Round 1 of 3. Poopity drawing a big black house + stick figure. Player list: Poopity 870 (#1), UnKnOwN 480 (#2), hairband 420 (#3). Chat: "Poopity is drawing now!", "hairband: Boobs", "Jazz: house". |
| browser-page-20261125T022158.350706920Z-15.pdf | 586,938 | 2 | Drawing turn: "DRAW THIS / blood", Round 2 of 3, 60s, BLANK white canvas, drawing tools below, big HBO Max ad across the middle. Player list: Poopity 1420, hairband 865. Chat: "Lalola: tie", "hairband: BIG", "Jazz guessed the word!". |
| browser-page-20261125T023602.615243330Z-37.pdf | 474,350 | 2 | Results: "sad knight is the winner!" #1 sad knight 2250, #2 해 hae 1690, #3 FemboyCum 1090, #4 CORTIS 665, #5 BrowserTester 635, #6 ShE 0, #6 HiiRosiehere 0. Chat: "website / webstie / link" guesses. |
| browser-page-20261125T023617.399149380Z-38.pdf | 210,419 | 2 | New game, Round 1 of 3, GUESS THIS, 4-letter word, 77s, BLANK canvas, all players at 0 (BrowserTester (You), 해 hae, CORTIS). Chat: "sad knight: webstie", "FemboyCum: bowser". |
| browser-page-20261125T023852.552018143Z-44.pdf | 304,706 | 2 | Private-room lobby: WAITING, Players 8, Language English, Drawtime 80, Rounds 3, Game Mode Normal, Word Count 3, Hints 2, Custom words box, invite-link bar + Copy + green "Start!" button. "BrowserTester is now the room owner!" |

## Verdict

- [REAL] (capture-verified): full public game as a guesser — joined mid-Round 1, played 3 rounds, finished #5 with 635 points; winner sad knight 2250; the exact final ranking above. Free, no account. Drawing turns reached twice with a BLANK canvas — the drawing beat is captured as a turn, not a drawing. Private-room lobby settings as listed.
- Correction — f4 is NOT a waiting beat: the task labels it "public lobby/waiting", but the frame shows a GUESS THIS turn in the auto-started new game (4-letter word, blank canvas, all scores 0). Relabel in the records: f4 = new game Round 1 guessing turn.
- Caveat — f2 chat shows "Jazz guessed the word!" in green. The task claims the blood turn had no correct guesses; the chat line's turn cannot be determined from this frame (chat history persists across turns). Flagged as ambiguous, not a refutation.
- [OPEN]: actually drawing on the canvas — two drawer turns, zero strokes placed. Canvas targeting failed on screenshot errors ("browser_error" / "failed at image_readiness") — same class as Draw a Stickman Nov 17 (screenshot-dependent mouse input fails when capture fails). Slot stays OPEN for a person driving the browser directly.
- Change-vs-Oct-28: "no visible change" is the task's judgement, not a diff — it states it had no Oct-28 screenshots. Record as: baseline holds (live draw-guess, free, no account, no paywall seen); no UI/mode/feature change observed in what was seen. Ads prominent (video ad, HBO Max banner, video title below the game) but not gating.
- Per-guess score steps (+100 home alone, +125 fish, +90 meme) are [SECONDARY] — task prose; the frames confirm the start (0) and the end (635) but not each increment.
