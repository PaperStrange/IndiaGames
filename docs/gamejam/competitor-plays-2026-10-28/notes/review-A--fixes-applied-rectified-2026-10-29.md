# Review A (adversarial, rectified) — fixes applied 2026-10-29

Source: notes/review-A--adversarial-rectified-2026-10-29.md — verdict NOT CLEAN, 0 MUST-FIX, 4 SHOULD-FIX. All four SHOULD-FIX edits applied by the parent after verifying each against its cited line. All edits are in-place rewordings (no line added or removed), so the parallel mistake-hunt review's line citations stay stable.

- S1 — Critique L48: "competitor PDFs banked under `play-2026-10-28/competitors/`" → "morning competitor PDFs banked under `play-2026-10-28/competitors/`, live-round PDFs cited by browser-task ID from their output dirs". Verified: morning PDFs live in competitors/; live-round PDFs live in browser-task output dirs.
- S2 — Moments coverage L4: "capture-text-verified items in the first-hand rows are [REAL]" → "in the browser-task rows are [REAL]". Verified: the rows are browser-task rows.
- S3 — Critique L69: "Drawize Quick Draw FORK finished, no submitted guess" → "Drawize Quick Draw session finished (word FORK), no submitted guess". Verified: the shorthand could misread as the drawing finished.
- S4 — Bell journey L25–26: "`n8-anchor.txt` (board text)" → "(dump text)"; "`p6-anchored.txt` (board text)" → "(dump text)". The label source-verification notes are unchanged. Verified: the cited files are full-page dumps, not board text.

Carried-open item resolved without an edit: the report's note that MEMORY.md's caption-rule justification still carried the disproved TXT generalization is stale — the parent corrected that justification at 22:45 (verified by grep: the rule now reads "TXTS lack selection state... filenames, not TXTs, are the unreliable layer").

Remaining gate: the parallel mistake-hunt review of the rectified package is still running; its fixes must also be applied and verified before delivery or filing. Delivery itself remains gated on Sakura's review of the package itself — nothing filed or pushed.
