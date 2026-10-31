# Review A (adversarial) — fixes applied (2026-10-28)

**Review:** `notes/review-A--adversarial-2026-10-28.md` — verdict FAIL (3 FAIL + 6 MUST-FIX + 5 SHOULD-FIX). **All findings were re-verified against the current files before applying** (per the standing law: reviewer claims get verified, not applied on trust). One finding was stale at verification time (F3 — see below).

## FAIL

- **F1 — Bell journey self-contradiction (Loop 2).** Fixed: header rewritten (driver runs bell3–bell19; bell19 completed the loop; early logs lost in the VM restart; bell17/18 excluded as driver failures); drawn route closed at "Loop 2 Noon — Mina and her crate at the sheltered market well"; "does not claim" section now lists only the genuinely unplayed items (Fracture 4, Original run, previous-Contrast comparison). The historical event-journal row 10 ("bell17 in flight — outcome below") was left as-is, per the reviewer's own note that it is fine.
- **F2 — "Seven runs stalled" count.** Fixed: reconciled to **five** game-rule stalls (three in Noon, two at Midnight), the journey record's contemporaneous accounting, applied consistently in the critique, Bell coverage, Bell decision (×2), and Bell session record (BELL-AGENT-01). The "seven" could not be reconstructed from surviving logs (early logs lost in the VM restart) and counted driver failures (bell17 pins, bell18 exceptions) as game friction; those are now excluded explicitly. Mechanical check after the fix: zero "seven" stall counts remain.
- **F3 — Critique action item 5 already done.** **Verified stale, no edit needed:** the critique already read "Loopback blocker filed as GitHub issue #5" at verification time (edited before the review finished). The reviewer read a stale copy. Confirmed present via grep.

## MUST-FIX

- **F4 — Gartic "deep rival" overstates Solo-only play.** Fixed: coverage row 1 relabelled "Deep (Solo mode only)"; critique bullet now reads "deep rival in Solo mode" (the Limit sentence — Solo is an animation maker, not the telephone loop; the write→draw→guess chain was NOT exercised — was already present in both files and is retained).
- **F5 — Vivid coverage family count.** Fixed by the reviewer's first option: Lost Records re-labelled as narrative adventure ("its dominant activity is narrative exploration of a remembered summer, and the camcorder is the recording tool, not the puzzle"); the check line now reads "photography is the dominant activity in 2 (Birdography, EOS) — within the template's max-2 cap ✓".
- **F6 — Moments second deep family presented as met.** Fixed: the coverage-check line now reads "**NOT MET** — Gartic Phone (telephone, Solo mode only) + skribbl.io (live draw-guess) are both draw-guess-adjacent… Both sessions are complete; the requirement is not." The critique's skribbl bullet now ends "The second deep family for Moments stays [OPEN] — both deep plays are draw-guess-adjacent."
- **F7 — "No further Bell play is needed" overstates.** Fixed: critique item 2 now reads "No further agent play of the candidate Contrast's Loop 2 outcome is needed" + the out-of-scope list (Original run, previous-Contrast comparison, Fracture 4, deepest 3/4). Bell decision §1 now says "the candidate Contrast's loop" and its Proposed decision carries the same out-of-scope list. The Bell journey's "does not claim" section lists the same three items.
- **F8 — Vivid journey checked box on unplayed item.** Fixed: Iona neutral profile changed from `- [x]` to `- [ ]`.
- **F9 — Bell art stale on Loop 2 + misattribution.** Fixed: beat 8 attribution corrected to `p9-prepared` (bell19); the Loop 2 board heading now reads "Loop 2 Dawn → Loop 2 Noon — Mina at the sheltered market well, proven by bell19", with two new rows added (Preparation, Outcome/Noon) carrying the bell19 quotes.

## SHOULD-FIX

- **F10 — Bell art Strip 3 opens with a Vivid object.** Fixed: the strip now leads with the Bell example (the traveler's hum → "Bell's true song") and the drum key; the cross-demo wedge observation moved to a parenthetical at the end.
- **F11 — Verdicts say "ready" bare.** Fixed: both read "ready for the human gate".
- **F12 — Decision-brief Candidate B collapses into A; Moments C is a straw man.** Fixed: Bell B reframed as a distinct hypothesis ("the prediction alone is the product") with a play-grounded rejection (a prediction without a witness earns nothing); Moments B reframed ("the reveal alone is the product") with a play-grounded rejection (the reveal leads directly into making; a reveal with nothing made leaves nothing to keep); Moments C given a play-grounded rejection (rehearsal played to completion; its reveal is a tutorial label; a solo player has nobody to surprise; the second detail round is easy to miss — two earlier drivers stalled on it).
- **F13 — Unlabelled superlative ("best-written moment").** Fixed: softened to "the strongest-written moment observed in this round".
- **F14 — "ROLLBACK teaches the loop in one run" unsupported.** Fixed: softened to "it names its loop rule up front".

## Mechanical re-check (after fixes, 2026-10-28)

1. No stale "pending bell17/bell18" strings — only the historical row-10 event-journal note remains (reviewer-approved).
2. One consistent stall count: "five" in critique, Bell decision (×2), Bell journey, Bell session; zero "seven" stall counts.
3. No checked box on an unplayed item.
4. Issue #5 referenced in the critique (item 5), not instructed as a to-do.
5. No bare "ready." verdicts; no "teaches the loop in one run" or "best-written moment in any" remains.

**Status:** Review A findings applied. Awaiting Review B (mistake-hunt) before delivery.
