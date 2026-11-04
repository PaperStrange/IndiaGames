# Bell — readiness handoff, 4 November 2026

**Decision: prepare the existing candidate for human review.** Bell 0.1.0 stays unchanged. No routine rules-copy patch is selected before human evidence; a reproduced visible-control defect can justify a bounded fix. November 20 remains a conditional launch target.

This document adjudicates the uploaded records; it is not a claim that its author played a new session. Technical QA completed **33 scenario executions** on the frozen candidate; [actual results and limits](TECHNICAL-QA.md) are recorded separately from human evidence. Human recruitment, six-person study, physical-device checks and independent human approval remain **pending**.

| Start here | Use |
|---|---|
| [Human handoff](HUMAN-HANDOFF.md) | Canonical protocol, frozen builds, staffing and transfer checklist |
| [Blank supplemental diagnostics](SUPPLEMENTAL-DIAGNOSTICS.md) | Procedural friction and alternative explanations; no added release threshold |
| [Existing launch packet](../launch-2026-11-20/README.md) | Registration, paired session records, manual checks and decision form |
| [Original research package](../competitor-plays-2026-10-28/README.md) | Five preserved records, captures, market research and historical critique |

## Evidence boundary

Reviewed Bell head: [`3d4e205c417272f00b87c76c00532f4456d31e38`](https://github.com/PaperStrange/IndiaGames/tree/3d4e205c417272f00b87c76c00532f4456d31e38). Its delta from `7f0d5281b01849c9afbacb76490663ae6a1f7833` is 28 documentation/archive files: README, critique, two HTML copies and 24 PDFs. It contains no new Bell runtime, human results or protocol changes. Review covered all changed text, PDF text across 43 pages and visual first-page inspection of all 24 PDFs. Raw driver logs remain local; that does not prevent judgments supported by filed frames, text layers or source.

The recorded Bell journey reaches a concrete result: witness Mina's obstruction → retain the clue through midnight → prepare the side passage on the next morning → see Mina and her crate at the sheltered well while the main alley remains blocked. The [prepared-action frame](../competitor-plays-2026-10-28/evidence/bell/p9-prepared.png) and [Noon outcome](../competitor-plays-2026-10-28/evidence/bell/q1-outcome.png) support this mechanical path. An informed agent's successful route is not blind human discovery, a preference result or proof of fun.

## Five perspectives on the findings

| Perspective | Supported observation | Criticism / alternative explanation | Next observation |
|---|---|---|---|
| Player | The recorded route produces a visible changed destination for Mina. Operators also encountered procedural stalls. | Repeated stalls by an informed operator are not five independent first-time human failures. Reading, tool trouble and uncertainty about controls can look similar in logs. | Observe the fresh player's chosen route, expressed intention, visible control attempted, recovery and requests for help. Preserve exits and missed opportunities. |
| Designer | Witnessed knowledge can unlock a later preparation; the unchanged crowd separates the intervention from an automatic world reset. | Changed town scenery alone does not prove agency. Reaching the right button without explaining why is weaker evidence than predicting its effect before the outcome. | Retain the canonical joint cause-plus-prediction measure. Compare witnessed, reported, late and interrupted paths in technical checks; ask humans neutrally before their naturally chosen decision. |
| Narrative / art | Mina, crate, side passage and sheltered well give the causal change concrete objects and places. | A beautiful altered town can obscure which change the player caused. The outcome text is explicit, so its presence cannot establish that players noticed or remembered the visual contrast. | Preserve the blocked crowd and changed route/destination. After the neutral break, record what people recall without mentioning Mina or the route. No new scenes or exposition are selected now. |
| Operator | Agent transport and canvas/PDF limitations are recorded; shells are preserved. | A hidden stale DOM button or a brief-key limitation is not automatically an accessible UI failure or a game's difficulty. Source shows the batch modal closes after transition. | Reproduce alleged failures through controls that are visible and reachable by pointer/keyboard. Record host, build hash, input, focus, state and screenshot before classifying the issue. |
| Research | ROLLBACK has ending text-layer evidence; Same Bullet has loop/echo counters; Night OClock has corridor/tutorial renders. | Partial competitor activities do not establish their full payoffs. Six listed/studied titles include desk research; this is not six completed plays. Positive marketing statements about emotional loops or changing spaces are not player evidence. | Keep the second completed deep comparison open as research. Prioritize the six-person Bell study for the release decision; do not convert the research gap into a new release gate. |

## Source-correct adjudication

Current implementation references below are pinned to the reviewed branch, not to the older stage copy quoted in the patch proposal.

| Historical claim | Current adjudication | Evidence / consequence |
|---|---|---|
| “Loop 2 destinations are pins, not buttons” | Incorrect: they are native buttons styled as map places. | [`drawPlaces`](https://github.com/PaperStrange/IndiaGames/blob/3d4e205c417272f00b87c76c00532f4456d31e38/js/engine.js#L56) creates buttons; disabled states include midnight and pending advance. Do not add a map redesign to remedy a driver selector failure. |
| “The prediction must be tested” before progress | A blank prediction permits progression and earns no Momentum. | [Batch resolution](https://github.com/PaperStrange/IndiaGames/blob/3d4e205c417272f00b87c76c00532f4456d31e38/js/engine.js#L157) handles `picked === undefined`; [advance](https://github.com/PaperStrange/IndiaGames/blob/3d4e205c417272f00b87c76c00532f4456d31e38/js/engine.js#L185) depends on pending commitment, not a selected forecast. Reject the proposed one-line rule as written. |
| “The advance rule is nowhere” | Too broad. Intro steps, existing rules, transition labels and anchor confirmation are present. Their discoverability remains a hypothesis. | [Current rules](https://github.com/PaperStrange/IndiaGames/blob/3d4e205c417272f00b87c76c00532f4456d31e38/js/engine.js#L55) include borrowing, Fracture and unresolved forecasts. Do not paste over them with the older stage string. |
| Stale “Face the thirteenth bell” at Midnight proves a human-facing no-op | Not established by a driver clicking a stale element. | [`finishBatch`](https://github.com/PaperStrange/IndiaGames/blob/3d4e205c417272f00b87c76c00532f4456d31e38/js/engine.js#L179) hides the batch and clears pending state. Require a visible-control reproduction. |
| Preparation cost is not previewed; selecting Mina/petal preserves the eyewitness clue | Neither is a sound prerequisite claim. Costs appear beside actions; the clue survives independently of the selected bond/object. | [Choice costs](https://github.com/PaperStrange/IndiaGames/blob/3d4e205c417272f00b87c76c00532f4456d31e38/js/engine.js#L127), [wake state](https://github.com/PaperStrange/IndiaGames/blob/3d4e205c417272f00b87c76c00532f4456d31e38/js/engine.js#L189). Verify legal preparation and witness provenance without teaching a false anchor dependency. |
| ROLLBACK hides its patience rule; only skipping Run 2 can reach the ending | General resource depletion is stated; the successful skipped path does not prove exclusivity. | [Raw help capture](../competitor-plays-2026-10-28/evidence/competitors/rollback/pdf/98ed2162-e5f1-5483-a278-24ab6b2973e7/browser-page-20261029T045936.587728724Z-8.pdf) says time and patience both run down. Specific per-read cost clarity remains unresolved; other endings remain open. |
| “Five stalls” establishes a necessary copy fix | It establishes an investigation target, not a human outcome or a proven remedy. | Preserve the [journey record](../competitor-plays-2026-10-28/records/journey--bell-0.1.0-2026-10-28.md), including unsuccessful attempts. Current source and visible behavior decide defect classification; human observations decide routine clarity changes. |

The historical critique, older patch spec and archived HTML retain their original prose. Their fixes and verdicts are not current execution instructions. In particular, do not overwrite frozen 0.1.0 to make an edited source “match” it.

## What players might come for

| Question | Calibrated hypothesis | What would challenge it |
|---|---|---|
| Why play? | A small act of care becomes possible because the player remembers a person and a place across a reset. | Players treat Mina as a meter, cannot name what their choice changed, or prefer to leave before the return. |
| How might Bell differ on the browser platform? | A short, click-driven causal mystery can make observation matter without requiring precise sustained movement. | Players perceive only a scheduled text tour, or peers provide the same experience more clearly. This is a positioning hypothesis, not a uniqueness or superiority claim. |
| What signature experience should be protected? | “I saw why she could not cross; tomorrow I prepared another way; the crowd stayed, but she reached safety.” | Success comes from following labels without causal understanding, or recall contains only Fracture/Momentum. |

## Bounded readiness work and stop conditions

Historical completed tasks stay completed; these are dated follow-ons, not retroactive changes to their records.

| Task IDs | Work / owner role | Current status and acceptance |
|---|---|---|
| TB-01, TB-15 | Research/editorial: reconcile claims and archive links | This adjudication and corrected filing status are prepared. Five original records, historical HTML and raw captures are preserved. Cross-branch critique images are pinned to their owning revisions. |
| TB-09, TB-11 | Engineering/QA: exact-candidate visible controls and state boundaries | **Verified in the [technical report](TECHNICAL-QA.md); 33 executions, no candidate resource/page errors.** Coverage includes ordinary phase resolution with blank/correct/wrong predictions; Dusk → Midnight; bond/object selection then confirmation; Loop 2 fresh forecast; borrowed visit below Fracture 4; Fracture 4 interruption; restart and mode boundaries. Preserve causal preparation/witness constraints and no duplicate reward. |
| TB-09, TB-11, conditional TB-16 | Engineering: fix a reproduced visible-control defect only | No runtime fix selected. Require visible before-state, reachable action, expected/observed state and regression evidence. Any changed game bytes get a new unused candidate version and new build-specific evidence; never replace 0.1.0. |
| TB-12, TB-13 | Facilitation/research: prepare and later run the human study | Handoff and blank supplemental sheet prepared; people, scheduling and results pending. Keep the six-person protocol and original release thresholds. |
| TB-16, TB-17, TB-18 | Release owner and independent human reviewer | Existing 0.1.0 remains staged. Physical-device/access checks and human approval are pending; technical passes do not authorize official promotion. |

The technical checks should verify the controls already present: scene action → **Resolve the phase** → batch → **Enter Noon/Dusk**; at Dusk, **Ring the boundary bell** → **Face the thirteenth bell**; at Midnight, choose one bond and one object → **Anchor these into tomorrow**. Borrowing below Fracture 4 keeps the phase and forecast unresolved; Fracture 4 overrides the scheduled bell. Check these as separate paths rather than assuming every visit advances the clock.

For a later clarity iteration, use the predeclared supplemental diagnostic: **if at least two of the six participants independently encounter the same procedural barrier, select that one transition for investigation**. Record intention, visible action, help and recovery; ordinary reading or thinking is not a stall. Report build-order groups separately. This is an iteration-selection rule, not another release threshold and not permission to ignore a critical bug.

Deferred: blanket tutorial copy, new districts/endings, additional narrative branches, a map redesign, and claims of proven fun or market superiority. The next human observations should determine whether procedural clarity, causal understanding or the remembered payoff actually needs work.

