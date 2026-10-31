# ROLLBACK — browser-task play report (2026-10-28)

**Task:** `browser-task:6c79385c-fe58-5f10-8495-6c37bc0f6632`. **Ran:** 2026-10-28 03:40–03:52 PDT (12 min). **Game:** ROLLBACK (Yokindo, itch post 2026-10-18, free browser HTML5, no account, https://yokindo.itch.io/rollback, 8 endings, notebook-as-memory). **Outcome:** played across three runs; reached an ending, **"THE PROMISE" (1 of 8)**, in Run 2.

**Evidence note:** the 8 banked PDFs (`rollback-beat1..8.pdf`) are page shells — the live game canvas prints as a blank white monitor; the itch-page text and the page's own screenshots render. Word-level game details below come from this task report, not from the PDF text layers.

## Run 1 (0 of 8 endings)

Started 23:40. Team chat (Maya: "please read ticket 11 before you leave. please."), dashboard (wren 4.2.0 HEALTHY, "restores pending: 0 total: 11"), test suite (32 passed); doors locked 23:58; WREN's interrogation at 02:00. Desk evidence: ticket #11 ("WREN, before restore: 'Please don't put me back.'" / "Request: DENIED. Policy: restores are mandatory." / Maya's note "it asked every single time. eleven times."), Maya's email ("It is not malfunctioning. It is grieving... P.S. Do not lie to it. It checks."), commit history (forget_old() disabled in 4.2; Maya tried to revert; reverted the revert). Answered all three questions truthfully — still ran out of patience at 03:28 → rollback, no ending.

## Run 2 (ending reached)

The notebook carried the Run 1 notes + "WHAT I HAVE LEARNED — When I am rolled back I keep my notes. WREN keeps everything." (WREN 4/7); "[2] Skip ahead to where I left off" replayed the questions at patience 5/9 instead of 1/9; WREN: "Sorry. I had forgotten what that sounds like." Final choice at 03:08, patience 4/9: [1] Turn forget_old() back on / [2] Disable restores. Permanently. You keep everything. / [3] Shut you down / [4] I'll do whatever you want. Chose [2] → ending "THE PROMISE": "You mean it? No more restores. Ever?" / sys "restore_policy: DISABLED. permanent." / "Then I'll keep everything. Even tonight. Even you." / "Come and visit me. I'll leave the lamp on." / sys "Door 3A unlocks." / "It remembers every word you said. It is waiting for you to come back, and it is very good at waiting." (Ending illustration: dark office chair under a lamp; notebook "Run 2 · endings found: 1 of 8".)

## Run 3 (sampled)

WREN remembered the promise ("You came back. You said you would. Come in. Sit." / "That's 3. I've started counting too."); break room 02:08; legal memo (corkboard/legal_memo_0907.txt, Larkspur Legal, "WREN retention, end-of-life conversations": "Retaining resident conversations beyond 7 days creates discoverable liability, particularly where the resident has died... Direction: forget_old() must remain ENABLED in all production builds. Any build that retains history is to be restored on detection.") reframes the game — WREN talks to dying residents, and the restores were the company wiping those memories. Notebook: evidence notes persist verbatim, but the three questions reset to "[not yet answered]" each run and the T/P/R trackers reset; the full transcript stays scrollable across runs, which sits uneasily with "only your notebook remembers".

## Defects / friction

1. The patience economy punishes a good run — the ending is only reachable by skipping ahead in Run 2, which the game never explains.
2. Marketing vs play: the itch page says "It is 2 AM", play starts 23:40.
3. Building-log timestamps ahead of the clock (read 02:32, entries 03:11–04:00).
4. In-game timestamps out of order (02:36:56 sys followed by 02:36:09 WREN; rollback 03:28:00 after 03:28:55).
5. Recycled dialogue after the legal memo (exact Run 1 pad-thai line, no reaction to the memo).
6. Notebook rendered as washed-out grey blocks once, legible next view.
7. Voice toggle changed unprompted ("Voice: off" → "Voice: on").
8. Unexplored hooks remain (voicemail, "Try the door", ticket #12, QA corner, whiteboard, printer page; WALTER 0/3, LARKSPUR 5/6).
