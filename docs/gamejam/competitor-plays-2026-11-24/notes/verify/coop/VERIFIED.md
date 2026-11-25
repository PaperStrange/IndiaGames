# Co-op puzzle discovery — capture verification (2026-11-24)

Task: browser-task:e7c32e61-4b55-51eb-9367-598d2a1eef0c, ran 18:32–19:18 PST, completed.
Source dir: ~/workspace/.hatch-browser/outputs/browser-task:e7c32e61-4b55-51eb-9367-598d2a1eef0c/

## PDFs on disk (sizes match the task's receipts)

| File | Bytes | Pages | Page-1 frame shows (caption written from the PNG) |
|---|---|---|---|
| f1 (…T024352-47) | 920,316 | 4 | Coolmath Games page, "Fireboy and Watergirl in the Forest Temple", 90%, game area BLACK (embed did not render in print). Below: "Rating: 4.6/5 (2,563,184 Votes)", "Updated: August 28, 2026", "Release: March 1, 2012", "Skills: Teamwork, Planning", "Platforms: Browser, Mobile", "Use the A,W,D keys to move Watergirl and use the arrow keys to move Fireboy." |
| f2 (…T024648-55) | 921,296 | 4 | Byte-identical render to f1 (same page, black game area). |
| f3 (…T030449-71) | 882,173 | 1 | Jigsaw Together: room code "KK8NUA", 0% progress, empty dashed frame, red-fox pieces scattered around it, "Show guide", zoom +/-/Fit, one avatar (PL) in the header. |
| f4 (…T031252-74) | 1,642,476 | 1 | Jigsaw Together: 33% progress, fox taking shape (head, back, body placed), guide image on (small fox thumbnail), two avatars in the header, "Player-2" cursor tag on the legs piece. |
| f5 (…T031744-75) | 1,434,663 | 1 | Jigsaw Together: 100% progress, completed red fox standing in snow, both avatars, "Player-2" tag on the tail. |
| f6 (…T031816-76) | 1,507,963 | 1 | "Solved! Nice work — 2 players finished this puzzle.", "New puzzle" / "Keep looking" buttons, completed fox blurred behind, 100%, both avatars. |

## Verdict

- Jigsaw Together played to completion [REAL]: 12-piece red-fox puzzle, room KK8NUA, 0% → 33% → 100% → Solved dialog. Free, no account, no purchase. Two seats live at once (two tabs), both avatars + live cursors on frame (f4, f5, f6). Limitation, stated plainly by the task and kept: both seats were operated by one person in two tabs, not two different people — the two-player presence is real in the room, the operator is one.
- Fireboy & Watergirl NOT played [REAL, market record]: f1/f2 are the Coolmath page with a BLACK game area — the Ruffle/Flash embed did not print, and the two "different" beats (title screen vs Level 1) render identically, so they are indistinguishable in the captures. The market record IS capture-verified: 4.6/5, 2,563,184 votes, updated Aug 28 2026, released Mar 1 2012, controls A/W/D + arrows, "never mix fire & water". Level 1 reached, the P pause menu, and the held-keys blocker are [SECONDARY] (task prose — the game needs held keys, which this browser's tap-only input cannot supply; same class as the Nov-17 Flash failure and the known WASD/key-hold limitation). Slot OPEN.
- Connected by Puzzles NOT played [REAL, blocked]: no PDF of the site was saved (no table was created); the Cloudflare Turnstile "Verify you are human" gate stalled on "Verifying..." and reset on 4 clicks across 2 browsers/routes, with the page saying challenges.cloudflare.com may be blocked. Slot OPEN — needs a network where the challenge endpoint is reachable, or a person completing it in their own browser.
- Pixo Pals: title screen only, not played [SECONDARY].
- Coverage finding: Jigsaw Together is a co-op puzzle — a DIFFERENT family from narrative-deduction (Counterfoil, The Missing Heir). It is the strongest candidate for the second deep study: a completed end-to-end play with full start/core/ending/result captures. Decide the second-deep question when the full wave is assembled.
