# Review B (mistake-hunt / executability) — fixes applied (2026-10-28)

**Review:** `notes/review-B--mistake-hunt-2026-10-28.md` — verdict FAIL (1 FAIL + 14 MUST-FIX + 17 SHOULD-FIX). **All findings were re-verified against the evidence on disk before applying.** Findings already fixed by the Review A pass are marked as such; the reviewer read the files while the A fixes were landing, so several of its findings were stale at verification time.

## FAIL

- **F1 — "No curtain between A's seal and B's choice screen" is FALSE.** Verified: `moments/62-a-sealed.txt` lines 15/17 show the B curtain verbatim; `builds/small-hours/build/views.js:20` has the `pass-b` curtain; `38-curtain-b.txt` is byte-identical to `39-b-choice.txt` (both Person A's choice screen). Fixed in all four files (Moments journey row 5 + Reactions, Moments session row 5 + Issues, critique Small Hours friction, organize Gaps): the B curtain exists at both handoffs (choice: `62-a-sealed` / `views.js:20`; detail: `91-detail-A.txt` / `views.js:32`). The journey row now records that the earlier claim was wrong and why (the 30-series driver clicked through the curtain without dumping it).

## MUST-FIX (already fixed by Review A — verified, not redone)

- **M1–M5** (Bell journey Loop 2 contradiction, header, drawn route, row 10, Bell art) — fixed in the A pass. **Exception: M4** (event-journal row 10): Reviewer A said the row was fine as a historical note; Reviewer B listed it as MUST-FIX. Fixed per B: row 10 now reads "(bell17 reached Loop 2 Dawn; the outcome was proven by bell19 — see Loop 2 outcome below)".
- **M11** (Vivid neutral checkbox) — fixed in the A pass.
- **M14** (critique item 5 already done) — verified already done; issue #5 referenced.

## MUST-FIX (new — fixed in this pass)

- **M6 — Moments detail counter wrong (38/120 vs 44/120).** Verified: `81-detail-A.txt` shows "44 / 120"; A = 44 chars, B = 38 chars (swapped); `81-detail-B.txt` is byte-identical to `81-detail-A.txt` (B's detail screen was never captured). Fixed in the Moments journey (row 9) and session record (row 8): A = 44/120, B = 38/120, with a note that B's counter is not in evidence and the B submit label re-cited to `a2-keepsake`.
- **M7 — Bell session record wrong time for bell19.** Verified via mtimes: `play-bell19.cjs` 12:11, `play-bell19.log` / `p9-prepared.txt` / `q1-outcome.txt` 12:16 UTC. Fixed: "~12:11–12:16 UTC (file mtimes)" and the "driver log timestamps" attribution dropped.
- **M8 — Organize Q1's answer false.** Rewritten: the outcome was unproven at ~06:00 PDT and was proven later the same morning by bell19 (with the bell15/16 Midnight and bell17 Loop 2 Dawn steps named).
- **M9 — Organize Bell table row stale.** Fixed: "Dawn → Loop 2 Noon, driver runs bell3–bell19" and "Loop 2 outcome PROVEN by bell19".
- **M10 — Organize decision #1 contradicts the final critique.** Fixed: the headline payoff is "proven first-hand by bell19".
- **M12 — Vivid citations point at lost logs.** Re-cited: Iona rows 4/5/6 → `27-after-signal` / `55-after-signal` / `65-after-signal`; Mara rows 2/3 → `42-aligned-notch3` / `43-mara-ending`; art Mara beats 3–6 → `42-aligned-notch3` / `43-mara-ending`.
- **M13 — Notch quote cited to `m3-notch` (shows the brass plate).** Re-cited: journey row 3 and art beat 4 → `27-after-signal`, with a note that vivid15's replay did not re-capture the notch text.

## SHOULD-FIX

- **S1 — Stall count contradiction.** Already fixed in the A pass (five, consistent everywhere). Verified again: zero "seven" stall counts remain.
- **S2 — Competitor narrative details not in the banked PDFs.** Fixed by the reviewer's stronger option: all six browser-task reports banked as files under `competitors/<game>/task-report--<game>-2026-10-28.md` (ROLLBACK, Birdography, Gartic Phone, skribbl.io, Pixel Harbor, Core Rush), and a disclosure added to each coverage record's Sources line: word-level game details come from the banked task reports; the PDFs bank the page captures.
- **S3 — skribbl "both complete sessions" unverified.** Verified from the full task report received this session: the session ended in Round 2 of 3 with no winner screen. Fixed: the Moments coverage-check line now reads "Gartic's Solo session completed; skribbl's session ended in Round 2 of 3 with no winner screen. The requirement is not met."
- **S4 — Core Rush "published 2026-10-22" unverified.** Verified: no Core Rush entry in the Bell sweep; no date in the PDFs. Fixed: date dropped from the row.
- **S5 — Birdography "update 2026-10-20" unverified.** Verified: no such date in the Vivid sweep or the PDFs. Fixed: date dropped from the row.
- **S6 — Bell journey rules 4–5 cite log steps as beat files.** Fixed: citations marked as log steps ("bell12 log [j5]/[j5b]", etc.).
- **S7 — "Prediction disproved (bell7)" attribution untraceable.** Fixed: "(bell7)" dropped; the grading is presented as panel elements with a note that the consequence line is a separate panel element (cited to `bell/32-step20/21/22.txt` and `bell/90-loop2.txt`).
- **S8 — Vivid durations are estimates.** Fixed: session record durations labeled estimates (logs carry no timestamps); journey line relabeled "Scored-play maximums" (15/10 min are session maximums, not targets).
- **S9 — Critique items 1/3/4 name no owner.** Fixed: item 1 owner = Bell branch owner; items 3/4 owner = release coordinator (first step: assign the facilitator and people/pairs).
- **S10 — Critique item 2 is a status statement, not an action.** Fixed: reframed as an action — "close the agent-play workstream; fold the unplayed items into the human-gate plan" (owner: gate owner).
- **S11 — Moments/Vivid ledgers omit the session records.** Fixed: both ledgers now list their session records.
- **S12 — Organize omits the second-edition plays.** Fixed: skribbl.io, Pixel Harbor, and Core Rush (partial) rows added to the table; Q4 rewritten (5 complete first-hand + 1 partial; the other 12 sweep titles desk-only); Q6(3) updated to 12.
- **S13 — Stray empty `competitors/gartic/` directory.** Fixed: removed.
- **S14 — `38-curtain-b.txt` misnamed.** Fixed: renamed to `38-a-choice-again.txt`; no references to the old name remain.
- **S15 — Bell art Strip 3 opens with Vivid's wedge.** Already fixed in the A pass.
- **S16 — Two Moments labels cited to files that do not contain them.** Fixed: "See the rehearsal reveal" re-cited to driver `pw/play-moments16.cjs:54`; "Person A's line is tucked away until you finish" re-cited to source `builds/small-hours/build/views.js:32` (journey + art records).
- **S17 — Two Bell labels cited to beat files that do not contain them.** Fixed: rule 5/6 evidence cells now point at the source-verification note under rule 7: the labels are verified in the build source (`index.html` — `wakeBtn` text, phase label) and in the driver logs (bell17 log [p6], bell15/16 logs [p8]); the text dumps do not capture the dynamically-set buttons.

## Addendum items (from the review's addendum)

- **Core Rush ended partial** — already fixed before the review landed (coverage row 2, critique bullet, decision ledger all updated to "ended partial, 37 min, 1 coal dug"). The Bell Sources line also still said "Core Rush in progress" — fixed to "first-hand partial".
- **Gartic Solo-only** — already fixed in the A pass (row relabelled "Deep (Solo mode only)", critique bullet qualified).

## Incidental staleness fixed in the same pass

- Bell decision ledger line 38 said "2nd browser edition [OPEN] pending Core Rush" → "2nd browser edition partial (Core Rush); second deep comparison [OPEN]".
- Bell decision ledger line 37 said "Loop 2 Dawn arrival board" → "Loop 2 Dawn → Noon outcome board".

## Mechanical re-check (after fixes, 2026-10-28)

1. No "no curtain" claims remain in any file.
2. No "38/120" for A; no `38-curtain-b` references (38/120 appears only as B's correctly-attributed length).
3. No "iona5 log" / "mara2 log" / `m3-notch` citations (`m3-notch` appears only inside the correction note explaining why it was not used).
4. No wrong bell19 time ("14:30" gone; "~12:11–12:16 UTC" present).
5. No organize staleness ("pending bell13", "still unproven", "15 sweep titles", "teaches its loop in one run" all gone).
6. Zero "seven" stall counts; "five" consistent.
7. No unverified dates ("update 2026-10-20", "published 2026-10-22" gone).
8. Empty `competitors/gartic/` removed.
9. skribbl completion worded as "ended in Round 2 of 3 with no winner screen".
10. Six task reports banked under `competitors/*/task-report--*.md`.
11. 44/120 present in both Moments files.

**Status:** Both plural reviews complete (A: FAIL → all findings applied; B: FAIL → all findings applied). Package ready for delivery to Sakura with the confirmation gate.
