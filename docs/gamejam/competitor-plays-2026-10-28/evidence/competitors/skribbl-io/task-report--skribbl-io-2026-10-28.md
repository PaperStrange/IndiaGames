# skribbl.io — browser-task play report (2026-10-28)

**Task:** `browser-task:0960c1b7-193c-5a07-8cdc-88b53c39736b`. **Ran:** 2026-10-28 04:53–05:00 PDT (7 min). **Game:** skribbl.io (free in the browser at skribbl.io; no account). **Outcome:** played as "BrowserTester" (English) in a live public room; session ended in Round 2 of 3 — no Round 3, no winner screen.

**Evidence note:** the 5 banked PDFs (`skribbl-beat1..5.pdf`) are legible. Word-level game details below (words guessed, scores, chat lines) come from this task report, not from the PDF text layers ("Uluru" and "landfill" appear in 0 of the 5 PDFs; only "stove" appears, in beat3).

## Route

Home page loaded immediately with "Enter your name", language "English", a green "Play!" button and "Create Private Room". Entered "BrowserTester" and clicked "Play!" — dropped straight into a running public game.

**Guesser, Round 1** (Ejunicorn28 drawing, 5 letters, "GUESS THIS _____"): the drawer wrote "I don't know" on the canvas, then scribbled over it. Hints revealed "___r_" then "U__r_". Guesses "angry", "ultra", "umbra" all appeared as plain chat (wrong). Chat showed "stefan guessed the word!", "Winslow guessed the word!", "Seal guessed the word!". The reveal was "The word was 'Uluru'". Scores after: Winslow 1255, Seal 1145, stefan 550, Ejunicorn28 450, Op 240, me 0.

**Drawer, Round 2:** offered "Choose a word" with "Tweety", "haunted house", "stove". Chose "stove" ("DRAW THIS stove", 80 seconds). Drew a rectangle on the canvas, but the stroke began at the canvas centre, leaving a stray diagonal line across it, so it read as an envelope: other players guessed "mail", "email", "Stamp", "skype", and chat showed "Op disliked the drawing!" and "Winslow disliked the drawing!". Three further horizontal strokes attempted (cooktop and oven-door lines) never appeared on the canvas even though the actions reported as applied — a real defect in that drawing attempt. Nobody guessed it: "The word was stove" / "Time is up!", all players 0 for the turn.

**Guesser, Round 2** (stefan drawing, 8 letters): green wavy line and squiggles, then a truck shape. Guesses "mountain" and "wildfire" were wrong; the reveal was "The word was 'landfill'" (only Seal had guessed it).

**Guesser, Round 2** (Op drawing, 4 letters, "re__"): a stick figure inside a large shape. Guesses "head" and "read" were wrong; "rest" was the word — typed but landed after the timer hit 0, so scored 0 (Seal +290, Op +240, Ejunicorn28 +230, stefan +185, Winslow +160, chahd +100).

**Guesser, Round 2** (Winslow drawing, "ice cream", 3+5 letters): a blue filled blob that became an ice-cream cone. "ice cream" guessed correctly in substance, but again it arrived exactly as time expired ("Time is up!") and scored 0. Per-turn points: stefan +450, Winslow +365, Seal +330, Ejunicorn28 +275, Op +165, watermelon +135, chahd +100, me 0.

**Final standings when stopped** (still Round 2 of 3, so no final winner screen was reached): Seal 2215 (#1), Winslow 1780, stefan 1300, Ejunicorn28 955, Op 645, chahd 200, watermelon 135, BrowserTester (me) 0 (#8).

## What works

The site loads fast, joining a public game needs only a nickname, the round flow is clear ("Round 1 of 3", countdown clock, "GUESS THIS" / "DRAW THIS", letter hints that reveal over time, "___ guessed the word!" announcements, per-turn points overlay, player list with ranks and points, live chat with join/leave messages, like/dislike and votekick controls). Drawing tools (colors, pencil, fill, undo, clear) are present and the first stroke rendered. Chat/guessing works — wrong guesses show as plain "Name: word" messages.

## What fails / confusions

1. In the drawing turn, three attempted follow-up strokes never rendered on the canvas, and the first stroke's stray diagonal made "stove" unreadable as an envelope — cannot tell whether this was a site issue or the browser's synthetic mouse events, but the visible result was a broken drawing.
2. Two correct guesses ("rest", "ice cream") both arrived after time expired, partly because each observe/act round-trip is slow relative to the 80-second timer; the game gives no grace period.
3. Other players' behaviour degraded the session: one drawer wrote "I don't know" and scribbled out the canvas; players joined/left constantly (V, Iran, goat, gago!, Winiii, Sadhna, watermelon); votekick messages appeared ("Op is voting to kick stefan (1/5)", "Winslow is voting to kick stefan (2/5)").
4. The page is heavy with Acura MDX ads (top banner, right rail, bottom banner) that crowd the game area. Readability is otherwise good: large canvas, legible chat and scoreboard.

## Evidence (PDFs)

f1 home page, f2 guessing round (Uluru), f3 the drawing turn (stove), f4 turn-results screen (stove, all 0), f5 standings/results screen after "ice cream" (Seal 2215, Winslow 1780, stefan 1300, Ejunicorn28 955, Op 645, chahd 200, watermelon 135, me 0). No capture came back blank. The game tab was left open, still in the live room.
