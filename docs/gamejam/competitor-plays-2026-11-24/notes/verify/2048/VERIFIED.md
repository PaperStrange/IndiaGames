# 2048 — capture verification (2026-11-24)

Task: browser-task:98381617-a8d4-56cd-aca1-9b323be507b0, ran 18:28–18:41 PST, completed.
Source dir: ~/workspace/.hatch-browser/outputs/browser-task:98381617-a8d4-56cd-aca1-9b323be507b0/

## PDFs on disk (sizes match the task's receipts)

| File | Bytes | Pages | Page-1 frame shows (caption written from the PNG) |
|---|---|---|---|
| browser-page-20261125T023252.681198519Z-35.pdf | 84,993 | 1 | Start: SCORE 0, BEST 0, two 2-tiles (row 2 col 4, row 4 col 3). |
| browser-page-20261125T023508.315872987Z-36.pdf | 106,952 | 1 | Mid-run: SCORE 212, BEST 212, 11 tiles, best tile 32 (bottom row 2-16-32-8). |
| browser-page-20261125T023936.827833536Z-46.pdf | 162,650 | 1 | Game Over: "684 points scored in 93 moves. No powerups used!" Final board all 16 cells filled — Row 1: 2, 8, 4, 2; Row 2: 4, 32, 64, 4; Row 3: 8, 16, 4, 8; Row 4: 2, 32, 8, 4. Play Again + Undo (2 undos left). |

## Verdict

- [REAL] (capture-verified): full run, start → 212 → Game Over 684 points / 93 moves, best tile 64 (row 2, col 3), final board exactly as listed, no adjacent equals. Free, no account. DOM-rendered game prints fully.
- Score loop observed on the frames: Score next to Best in the header (f1, f2), merges raise the score, game over offers one-click Play Again + Undo. The 2048 goal and "No powerups used!" line are on the site/frame.
- Small gap in the chain: after the ad interruption at Score 444, the task says reopening restored the run "now at Score 472" — a +28 jump with no moves described. The final outcome is fully verified, so this does not change the verdict; the 444→472 step is unexplained, noted here.
- "Best: 684 persisted" is [SECONDARY]: Best tracked Score in f1/f2, but the f3 game-over frame shows no Best header, so the persisted-best value is the task's claim, not frame-verified. The score 684 itself is [REAL].
- No beat left open. Cleanest high-score session of the wave so far.
