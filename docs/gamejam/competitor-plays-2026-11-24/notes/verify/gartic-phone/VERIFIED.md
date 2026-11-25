# Gartic Phone (refresh) — capture verification (2026-11-24)

Task: browser-task:08fb14cd-d0a2-58e2-ae65-e4e0a8152913, ran 18:16–18:33 PST, outcome FAILED (browser_failure: game tab unreadable ~15 min; Cloudflare blocked extra tabs).
Source dir: ~/workspace/.hatch-browser/outputs/browser-task:08fb14cd-d0a2-58e2-ae65-e4e0a8152913/

## PDFs on disk (sizes match the task's receipts)

| File | Bytes | Pages | Page-1 frame shows (caption written from the PNG) |
|---|---|---|---|
| browser-page-20261125T021759.594116247Z-4.pdf | 1,068,973 | 1 | Lobby, first room: PLAYERS 1/14, nickname COOLNICKNAME8264, PRESETS grid with NORMAL selected (green border), KNOCK-OFF, ICEBREAKER, EXQUISITE CORPSE, MASTERPIECE, STORY visible, INVITE and START buttons, sidebar ad. Right edge cut off in print. |
| browser-page-20261125T022451.785283973Z-19.pdf | 842,712 | 1 | Lobby, second room, CUSTOM SETTINGS tab: TIME NORMAL, TASK FLOW WRITING, DRAWING (cut off), TURNS 4 TURNS, KEEP DRAWING DISABLED, SCOREBOARD OFF, SECRECY below. INVITE and START buttons. Right edge cut off in print. |

## Verdict

- [REAL] (capture-verified): lobby as captured — NORMAL preset selected, 1/14 players, presets grid, custom settings (4 turns, writing/drawing flow, time normal, keep drawing disabled, scoreboard off), invite/start buttons, sidebar ad. Free, no account (nickname only, no sign-in in any frame).
- [SECONDARY] (task prose only, NOT in the captures): the write turn and its sentence, the partial bicycle drawing (no drawing PDF was saved — the task says it exists only in in-session frames, not banked), the "WANNA TRY?" dialog, the 15-preset list, the suggested prompt, the interstitial ad. Records must not present these as captured.
- [OPEN]: drawing beat, description beat, album beat. Turns 3–4 were auto-submitted by the game timer (tab unreadable), the album was reached but never revealed, no album PDF exists. Multiplayer is unplayed: Cloudflare blocked the first load (cleared once via a fresh-browser route move) and blocked every additional invite tab; the task's one route move was spent, so no second player could join.
- Change-vs-Oct-28 NOT established: the task states it had no Oct-28 screenshots to compare against. Lobby/settings observations are "site now" [REAL], not "changed since Oct 28". The refresh question stays partly open.
- No retry now: a fresh attempt is possible later (new task, fresh route budget), but the ~15-minute tab-read failure is unexplained and the same approach risks the same wall. Record partial + open beats; do not re-run blind.
