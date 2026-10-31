# Review A — Adversarial (boss / skeptical partner lens) — 2026-10-28

**Verdict: FAIL — not clean as filed.** The headline evidence is real (see "What checked out"), but the package contains a direct self-contradiction in the Bell journey record, a stall count asserted in four places and contradicted by the journey's own text, a stale action item in the critique, and two coverage claims that do not survive the template's own rules. Fix the FAIL and MUST-FIX items, then re-review; do not hand this to Sakura as-is.

Reviewer: independent subagent A. Method: read all 16 files (critique + 15 records + organize-self-qa as background); spot-checked evidence on disk with `grep`/`pdftotext`/render (`pdftoppm` + visual read of rollback-beat2, birdography-beat1, gartic-beat3); verified GitHub issue #5 via `gh`.

## What checked out (the findings below do not overturn these)

- **Bell Loop 2 outcome IS proven.** `bell/q1-outcome.txt` lines 83/87/93 contain the exact sentences quoted in the records ("Mina and her crate reach the sheltered market well through the side passage you prepared. One uncrushed redflower rests on the well stones." / "The main alley is still blocked; the changed route, not a changed crowd, brought her here."). `bell/p9-prepared.txt` lines 95–105 and 148 confirm the Loop 2 Dawn preparation ("Prepare the side passage / Move the empty stands before Noon" / "Loop 2 · Prepare the side passage"). The witness → anchor → Loop 2 → prepare → well chain is real, first-hand, one session (bell19).
- **Keepsake download IS verified.** `moments/keepsake--pair-impossible-postcard.svg` is 1,425 bytes, 720×850, correct header/content on disk.
- **Competitor PDF characterisations check out on render.** ROLLBACK beat2: the game canvas is a blank white shell inside the monitor frame (the "page shells" label is correct; the 498–679 word counts are itch-page text, not gameplay). Birdography beat1: the Godot canvas prints and is legible (binoculars, PLAY/QUIT, journal spread). Gartic beat3: the animation drawing screen renders legibly. The "legible" claims survive visual inspection.
- **Third-person rule: no violation found.** Every "I / we / our / my" hit in the records is inside a verbatim game/UI quote ("I have the screen", "I don't know", "I was frightened every night. I turned it on anyway."), which the rule allows.
- **skribbl.io and Pixel Harbor numbers in the critique match their coverage records** (Uluru / stove / landfill; Sailboat 2:42, Anchor 0:45, "1 square look wrong", 2/8 charted).
- **Core Rush is honestly [OPEN]** in both the Bell coverage and the critique.

## Findings

### F1 — FAIL: Bell journey record contradicts itself on the headline finding

- **File:** `records/bell/journey--bell-0.1.0-2026-10-28.md`
- **Claim vs claim:** The "Loop 2 outcome — PROVEN (bell19, [REAL])" section proves Mina at the well. Three sections later, "What this record does not claim" states: "No claim about the Loop 2 outcome (pending bell17)". The same file also ends its "Drawn route" with "→ Loop 2 (pending)", and its header still says "bell17 in flight at the time of writing".
- **Evidence:** the file itself; `bell/q1-outcome.txt` lines 83/93 (outcome proven) vs. journey lines 71–79 (the "does not claim" section, stale).
- **Fix required:** delete the stale "pending bell17" disclaimer, update the header (bell19 completed; bell17/18 are history, not in flight), and close the drawn route at "Loop 2 Noon — Mina at the well". A record that both proves and disclaims its headline finding cannot be filed.

### F2 — FAIL: the "seven runs stalled" count is asserted four times and contradicted by the journey's own text

- **Files:** `critique--one-page-2026-10-28.md` ("Seven runs stalled for lack of it"); `records/bell/decision--bell-0.1.0-2026-10-28.md` (§1 "seven times over"; Proposed decision "Seven agent runs stalled"); `records/bell/coverage--bell-0.1.0-2026-10-28.md` ("seven runs stalled for lack of it"); `records/bell/session--bell-0.1.0-agent-2026-10-28.md` (BELL-AGENT-01: "Seven agent runs stalled for lack of it").
- **Contradiction:** the Bell journey's own "Reactions" paragraph says "Three runs stalled in Noon for lack of it, and two more stalled at Midnight for lack of the anchor confirm" — **five**, not seven. The organize file agrees with five ("three runs stalled in Noon", `organize-self-qa.md` line 156). The journey header makes it worse: "Seven driver runs (bell3/6/7/8/9/10/11/12/13/14/15/16…)" lists **twelve** run numbers as "seven", and `pw/` holds drivers through bell19 — at least fifteen runs total.
- **Deeper problem:** if "seven" counts bell17 (button-only driver could not click Loop 2 pins — a driver limitation, not the game's hidden rule) or bell18 (two driver exceptions: `SyntaxError` and `clickAny is not defined` — driver bugs, per `pw/play-bell18.log`), then driver failures are being counted as game friction. That inflates the finding.
- **Fix required:** reconcile from the driver logs with a run-by-run list (which runs stalled, where, and why — game rule vs driver bug), and make all five files use the same reconciled number. If the logs cannot support a precise count, soften to "several runs (three in Noon, two at Midnight — see journey)" and delete the "seven" everywhere.

### F3 — FAIL: critique action item 5 is already done

- **File:** `critique--one-page-2026-10-28.md`, item 5: "File the loopback-blocker as a GitHub issue".
- **Evidence:** the issue already exists — PaperStrange/IndiaGames issue #5, OPEN, titled "Agent playtesting blocked: browser cannot reach locally deployed demos (loopback refused)" (verified via `gh issue view 5`). The MEMORY record confirms it was filed during this operation.
- **Fix required:** replace item 5 with a reference to issue #5 (link + state) and, if anything remains, the actual remaining step (e.g. "link issue #5 from the play records"). Do not present a completed task as a to-do; Sakura will check and find it done.

### F4 — MUST-FIX: Gartic Phone "deep comparison" overstates what was played

- **Files:** `records/moments/coverage--small-hours-2026-10-28.md` (row 1: "Deep — first-hand, full solo session"); `critique--one-page-2026-10-28.md` ("Gartic Phone (Small Hours' deep rival, full solo session to album + export)").
- **Evidence:** the Gartic play was **Solo mode only**. The telephone write → draw → guess chain — the game's defining mechanic and the reason it is Small Hours' "deep rival" — was never exercised. Solo mode is a single-player animation activity, not the telephone game. The template requires deep comparisons to reach "full social matches or predeclared complete activities"; Solo is a complete activity, but it is not the activity being compared.
- **Fix required:** qualify both places: "Solo mode only; the telephone write→draw→guess chain was not exercised". Do not call Gartic the "deep rival" without that qualifier — a boss who opens the record expecting the telephone game will find a solo drawing exercise.

### F5 — MUST-FIX: Vivid coverage family count does not survive the template's own rule

- **File:** `records/vivid/coverage--vivid-0.1.2-2026-10-28.md`, coverage check: "Families: photo journal, picture-logic, photo puzzle, paper-fold, photo/memory narrative, sci-fi narrative = 6 families, max 1 per family ✓".
- **Evidence:** three of the six titles carry photo-prefixed families — Birdography ("photo journal"), The Star Named EOS ("photo puzzle"), Lost Records ("photo / memory narrative"). The template states: "Broad families describe the dominant activity; **renaming two deduction puzzles does not create genre diversity**" and caps any one family at **maximum 2**. Photography is the dominant activity in all three titles; relabelling it three ways does not create three families. The ✓ is unearned.
- **Fix required:** either re-label Lost Records as narrative adventure with a one-sentence justification (its dominant activity is narrative exploration; the camcorder is secondary) — which leaves photography at 2, within the cap — or swap one photo title for a different family (Tiny Glade / diorama, already desk-verified) and disclose the swap. Do not keep the "max 1 per family ✓" assertion on the current labels.

### F6 — MUST-FIX: Moments coverage's second deep family is [OPEN], but the coverage check and the critique present it as met

- **File:** `records/moments/coverage--small-hours-2026-10-28.md`, coverage check: "Deep comparisons from different families: Gartic Phone (telephone) + skribbl.io (live draw-guess) — both complete sessions".
- **Evidence:** the record itself admits, in the same bullet, that "both are draw-guess-adjacent, so the second deep family is the live-multiplayer one, not a wholly different family", and ends with "[OPEN: a deep play of a party or diorama title would complete the second deep family.]" The critique repeats the pair as the two deep rivals with no caveat. The template requires "two deep comparisons from different families".
- **Fix required:** mark the requirement explicitly not-met/[OPEN] in the coverage-check line itself (not only in the trailing note), and add the same caveat to the critique's Gartic/skribbl bullets — or drop the "deep" framing for one of them. The disclosure exists; the presentation still reads as a pass.

### F7 — MUST-FIX: "No further Bell play is needed before the gate" overstates

- **Files:** `critique--one-page-2026-10-28.md`, item 2 ("No further Bell play is needed before the gate"); `records/bell/decision--bell-0.1.0-2026-10-28.md` (Proposed decision, same implication).
- **Evidence:** the Original run ("Begin Original run") was never played; the previous-Contrast comparison — the human gate's actual comparator (previous Contrast vs candidate Contrast) — was never played by the agent; Fracture 4 (catastrophe) was never reached (deepest 3/4). Only the candidate Contrast's Loop 2 outcome is proven.
- **Fix required:** qualify to "No further agent play of the candidate Contrast's Loop 2 outcome is needed" and list the unplayed items (Original run, previous-Contrast comparison, Fracture 4) as explicitly out of scope for this round, not as done.

### F8 — MUST-FIX: Vivid journey checklist marks an unplayed item as done

- **File:** `records/vivid/journey--vivid-0.1.2-2026-10-28.md`, coverage checklist: "- [x] Iona neutral profile (`?profile=neutral#iona`) — not played (optional per launch doc)".
- **Evidence:** the item is checked [x] and in the same breath says "not played". A checked box for an unplayed item is a false completion mark.
- **Fix required:** change to "- [ ] Iona neutral profile (`?profile=neutral#iona`) — not played (optional per launch doc)".

### F9 — MUST-FIX: Bell art record is stale on Loop 2 and misattributes its evidence

- **File:** `records/bell/art--bell-0.1.0-2026-10-28.md`
- **Evidence:** (a) Heading "Journey board (Loop 2 Dawn — arrival only; outcome pending bell18)" — bell19 proved the outcome; the heading is stale. (b) Beat 8 cites "`p9-prepared` (bell17)" — but `p9-prepared` is bell19's evidence (the journey record attributes it to bell19); bell17 reached Loop 2 Dawn but could not click the pins and never prepared anything.
- **Fix required:** update the heading to reflect the proven outcome, and correct the attribution to bell19.

### F10 — SHOULD-FIX: Bell art Strip 3 opens with a Vivid object

- **File:** `records/bell/art--bell-0.1.0-2026-10-28.md`, Strip 3: "First appearance: 'A little wooden wedge' (Vivid, not Bell — the pattern repeats across the demos). In Bell: the traveler's hum…"
- **Evidence:** a Bell evidence strip should use Bell evidence. Importing a Vivid object and correcting it mid-sentence reads as a copy-paste error and weakens the strip.
- **Fix required:** lead with the Bell example (the traveler's hum → "Bell's true song") and move the cross-demo observation out of the strip, or delete it.

### F11 — SHOULD-FIX: critique verdicts say "ready" without saying ready for what

- **File:** `critique--one-page-2026-10-28.md`, verdicts: "**Small Hours: ready.** … What it needs is humans, not fixes." / "**Vivid 0.1.2: ready.** … What it needs is humans, not fixes."
- **Evidence:** both verdicts rest on solo-operator play. The pair dynamic (Small Hours) and unprompted returns (Vivid) are untested, and the decision briefs themselves say "do not ship on solo evidence alone". "Ready" in a one-line verdict, read by a boss, sounds like release-ready.
- **Fix required:** qualify both lines: "ready for the human gate" (not "ready" bare). The action items already say to run the gates; the verdict lines should not undercut them.

### F12 — SHOULD-FIX: decision-brief §3 Candidate B collapses into A (Bell + Moments); Moments' Candidate C is a straw man

- **Files:** `records/bell/decision--bell-0.1.0-2026-10-28.md` (§3 B: "Keep as the loop inside A"); `records/moments/decision--small-hours-2026-10-28.md` (§3 B: "Keep as the moment inside A"; C: rejected because "the design doc says solo is rehearsal only").
- **Evidence:** in both briefs, Candidate B is a sub-mechanic of A, not a distinct experience hypothesis — the three-candidate structure collapses to one candidate plus a sub-moment. Moments' Candidate C is rejected on authority (the design doc), not on play evidence; nobody proposed shipping the rehearsal as the product. (Vivid's §3 is sound: A return, B single-frame puzzle, C diorama — genuinely distinct.)
- **Fix required:** reframe B in both briefs as a genuinely distinct hypothesis with its own rejection observation (e.g. Bell: "the prediction alone, without the witness, is the product" — then reject on the evidence that prediction without witness earns nothing), or merge B into A and present two candidates honestly. Give Moments' C a play-grounded rejection or drop it.

### F13 — SHOULD-FIX: unlabelled superlative in the critique

- **File:** `critique--one-page-2026-10-28.md`, verdicts: Iona's letter is "the best-written moment in any of the three demos".
- **Evidence:** a superlative presented as a verdict in a report whose rule is evidence labels on claims. It is a critic's judgment, not a measured fact.
- **Fix required:** label it as judgment ("in this reviewer's judgment") or soften ("the strongest-written moment observed in this round").

### F14 — SHOULD-FIX: "ROLLBACK teaches the loop in one run" is unsupported

- **File:** `critique--one-page-2026-10-28.md`, competitors: "its notebook persists across resets and it teaches the loop in one run".
- **Evidence:** the ROLLBACK play took three runs; Run 1 ended in rollback with 0 of 8 endings. Nothing in the cited evidence shows the loop being taught in one run.
- **Fix required:** soften to "names its loop rule up front" (verified in the itch text: "Fail, and WREN restores the building from its 2 AM snapshot").

## Notes (not findings)

- The Bell journey's event journal row 10 ("bell17 in flight at the time of writing — outcome below") is fine as a historical note; the outcome IS below it. Only the header, drawn route, and "does not claim" section are stale.
- The Moments session record's `reached_reveal_unaided: true (agent)` / `both_contributed: true (agent, by construction)` / `voluntarily_saved_or_replayed: true (agent)` rows are honestly caveated in the same table ("by construction", "meaningless for an operator"). No finding — the caveats are doing their job.
- The Bell coverage's Core Rush row is correctly marked [OPEN] with a named substitute (Quiet Express: Cabin 909 demo). No finding there.
- The Vivid session record's VIVID-AGENT-02 (screenshot timeouts as an agent-tooling issue, not a game bug) is correctly separated from game findings.

## Required before delivery

1. Fix F1–F3 (FAIL) and F4–F9 (MUST-FIX) in the files named above.
2. Apply or explicitly decline F10–F14 (SHOULD-FIX) with a one-line reason each in the fixes-applied note.
3. Re-run a mechanical check after the fixes: no stale "pending bell17/bell18" strings, one consistent stall count across all files, no checked box on an unplayed item, issue #5 referenced (not instructed).
