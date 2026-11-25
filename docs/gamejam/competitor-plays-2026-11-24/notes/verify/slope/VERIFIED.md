# Slope — capture verification (2026-11-24)

Task: browser-task:16ca431b-9e77-5010-a1da-8a8accb4ad44, ran 18:18–18:38 PST, completed.
Source dir: ~/workspace/.hatch-browser/outputs/browser-task:16ca431b-9e77-5010-a1da-8a8accb4ad44/

## PDFs on disk

All 5 PDFs exist (sizes match the receipts): f1 8,923,276 B; f2–f5 8,487,851 B each. All 10 pages each.

## The finding: f2–f5 are the same capture four times

Rendered all 10 pages of all 5 PDFs and hashed every page image:

- Pages 2–7 and 9 are pixel-identical across ALL five PDFs (shared portal content).
- Page 1: f1 differs from f2–f5; f2, f3, f4, f5 are pixel-identical to each other.
- Page 8: portal "More Games Like This" in all five (f1's render differs trivially from the shared one).
- Page 10: footer in all five (f1's thumbnails unloaded, f2–f5's loaded).

So f2 (menu), f3 (crash, score 1), f4 (tunnel), f5 (unresponsive menu) are THE SAME frame repeated four times. The four claimed beats do not exist as distinct captures.

## Page-1 frames (read directly)

- f1: portal start — SLOPE logo, game icon, green PLAY NOW button, "SLOPE GAME" bar. A real start frame.
- f2–f5 (identical): the game frame area is a BLANK dark rectangle. No menu, no ball, no track, no score. Portal chrome only.
- Page 8 (read): "The original Slope Game is credited to RobKaySF and was released in September 2014." + "How can I improve my score? Look ahead, use short steering inputs…" + "More Games Like This" thumbnails.

## Verdict

- [REAL] (capture-verified): portal at slopegamefree.org loaded; PLAY NOW start screen (f1); the Unity game frame printed BLANK in f2–f5 — WebGL canvas failure class (same as TETR.IO / Townscaper); portal credit line (RobKaySF, Sept 2014) and score advice on page 8.
- [SECONDARY] (task prose only, NOT in any capture): all gameplay — 3 runs, best score 1, the crash into the red block, the tunnel run, the wedged ball, Play going unresponsive, the leaderboard popup ("Recent score: 1"), and the score-loop mechanics as observed. The task reports playing live and honestly flags the missing leaderboard PDF — but no gameplay frame exists in the five PDFs. Records must not present f3 as a crash frame or f4 as a tunnel frame; they are the same blank frame.
- Distinction from TETR.IO: there the board never rendered even live (WebGL disabled). Here the task reports the game played live and the failure is in the PRINT path (canvas blank in the PDF). The play is live-observed [SECONDARY]; the capture failed. A re-attempt in this browser would print the same blank frame.
- [OPEN]: a capture-verified Slope run with a visible score. Slot stays OPEN for a WebGL-capable capture or a person driving the browser directly.
