# Plural review — 2026-10-22 (records + fixes applied)
This package was reviewed before commit by two independent reviewers who did not see each other's work; their full reports are filed beside this note (`review-2026-10-22--adversarial.md`, `review-2026-10-22--mistake-hunt.md`). Both returned **PASS-AFTER-FIXES** for all three branch packages; no BLOCKERs. Every required fix was applied before filing, as follows.

**Adversarial (boss/partner lens) — findings and dispositions**
- Bell B-1 / Mistake-hunt B-3 (same defect, both reviewers): the Bell README claimed "storefront captures … each" for all three paid originals; Slice & Dice has none. **Fixed** — the sentence now scopes storefront captures to Outer Wilds and Into the Breach and states Slice & Dice's were not banked.
- Bell B-2 / Moments M-2 + Mistake-hunt B-4/M-4: the superseded `competitor-plays-2026-10-20/` package was described as "kept in git history" while still live at the tip. **Fixed by the filing commit itself**, which removes the Oct-20 directories (they remain in git history, as the new READMEs state).
- Bell B-3: "knowledge-gating is identical" → "the same in structure." **Fixed.**
- Moments M-1: the Fireboy record's coverage header still described session 1 only ("zero gameplay") against its own session-2 addendum. **Fixed** — header now covers both sessions; fixed at the study source and re-filed.
- Moments M-3: GeoGuessr row lacked the record's PARTIAL label. **Fixed** — row now leads with "PARTIAL —" and carries the untested shared-guessing question.
- Vivid V-1: Six Cats Under was labeled "Played"; its filed records are a failed attempt and a kitchen partial. **Fixed** — "Played — partial" with the endpoint stated.
- Vivid V-2: Sort the Court! likewise dropped its PARTIAL/no-finale status and its captures-didn't-survive caveat, and carried an untraceable date range. **Fixed** — "Played — partial (2026-10-13; ~6 in-game days, no finale; screenshots filed there are the Oct-15 re-shoots)."
- Vivid V-3: two Friday Night Funkin' capture filenames lacked the package's own "page-shell" marker. **Fixed** — renamed `friday-night-funkin-01-page-shell--itch-title-page.pdf`, `-02-page-shell--itch-title-page-again.pdf`, `-03-page-shell--newgrounds-bopeebo-game-over.pdf`.
- Vivid V-4: the Townscaper row merged two sessions under a record that documents only the Oct-20 one. **Fixed** — row scoped to the Oct-20 session, with a pointer to the other session's record in the iteration package.
- Vivid V-5: the intro claimed substitutes "answer their matrix questions" while the V6 analysis says the question remains unjudged. **Fixed** — intro now reads "address … where the tooling allows (V6 documents the barrier instead of an answer)".
- Vivid V-6: Rhythm Doctor's two storefront prices ($20 itch / $10.49 Steam) sat unreconciled. **Fixed** — cross-note added to the market record.
- Vivid V-3/V-4 (mistake-hunt NOTEs): table path prefix made consistent (`docs/gamejam/player-first-replays-2026-10-15/`); Six Cats evidence cell now defers to the records' own labels. **Fixed.**

**Mistake-hunt (mechanical) — findings and dispositions**
- B-1/M-1/V-1: market records cited evidence files by un-prefixed names (`trailer.mp4`, `storefront-capture-2026-10-20.pdf`, `storefront-top.pdf`, …) that are not the filed names. **Fixed** — all citations edited to the filed, game-prefixed names, at the study sources and re-filed; a closing grep over the packages finds no stale citation.
- B-2/M-3/V-2: twelve play records cited study-archive folders (`captures-2026-10-20/`, `captures-2026-10-20-session2/`) that don't exist in the packages. **Fixed** — citations now read "`captures/` of the filed package"; every count in those sentences was re-verified against the filed files by the reviewer.
- M-2: missed-messages access check cited the listing capture by its study name. **Fixed** — cites the filed package path.
- X-4 (NOTE): aggregate push ≈ 357 MiB across the three branches (seven trailers; three files over GitHub's 50 MB advisory threshold, none over the 100 MB hard limit). Accepted consciously — the Oct-20 package set the same precedent (a 32 MB trailer), and the paywalled-competitor rule requires trailers archived with the records.

**What the reviewers verified clean (summary):** all 28 packaged text records byte-identical to their study sources at review time (the post-review edits above were applied at the sources and re-filed, preserving identity); every README number traces to its record; every market figure appears verbatim in its filed storefront PDF; nothing filed in the Oct-20 packages is dropped by the rebuilds; the vivid README's description of the other session's iteration package matches its coverage ledger exactly, with no credit taken.
