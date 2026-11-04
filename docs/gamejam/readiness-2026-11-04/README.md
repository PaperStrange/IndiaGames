# Keeper's Frame — November 4 readiness handoff

**Scope: agent verification, bounded fixes and a packet for humans to use later.** No human sessions, recruitment, physical-device results or release approval are recorded by this update. The target remains November 20, conditional on the existing release gate. Agent verification is complete within the scope of [the technical report](TECHNICAL-QA.md). Candidate 0.1.3 is reproducibly exported; its reviewed master staging remains pending.

| Workstream | Current evidence and next decision |
|---|---|
| Research adjudication | Completed source/capture review below; agent observations remain separate from human evidence. |
| Shared alignment-helper layout | Reproduced and fixed in source `813f264`; eight layout/keyboard cases pass, with frozen 0.1.2 as a negative control. [Evidence](TECHNICAL-QA.md). |
| Full Iona and Mara journeys | Twenty unique semantic cases reach final placement/interpretation and reload; retained harness corrections and one successful navigation retry are documented. 51 unit tests and build pass. |
| Candidate | Existing 0.1.2 remains immutable. Two clean builds of 0.1.3 match the tested 15-file inventory `7498c636…`; staging validation passes with blank human evidence. [Export instructions](CANDIDATE-EXPORT.md); reviewed master PR pending. |
| Human handoff | [Blank packet and post-scoring diagnostics](HUMAN-HANDOFF.md) prepared; six Iona plus six distinct Mara participants remain pending. |
| Promotion | Reviewed candidate PR to `master` may stage a candidate; human approval and official `main` promotion remain pending. |

## What was reviewed

The [November 4 delta](https://github.com/PaperStrange/IndiaGames/compare/b55db5fc3cfd63fb613ca481d69abde3ad8e2fc6...b9e1560cc641691bc8d48b4254cab0bac73fe64c) contains 60 files: the filing README, a shared historical critique, two HTML reports and 56 competitor PDFs. It changes no runtime bytes and adds no new demo sessions. All 56 PDFs were parsed (204 pages); all 69 distinct page renders were visually reviewed, with duplicate pages identified by image hash. Both HTML texts and their 23 embedded images were inspected; the GIF inspection covered its first frame, not animation playback. These are inspections of recorded evidence, not new gameplay.

The [five original records](../competitor-plays-2026-10-28/records/), [raw captures](../competitor-plays-2026-10-28/evidence/) and historical HTML remain unchanged. The [shared critique](../competitor-plays-2026-10-28/critique--one-page-2026-10-28.md) now identifies itself as historical and uses immutable media links across the three branches. Its October verdicts are not current release approval.

| Claim in the historical synthesis | Current adjudication | Consequence |
|---|---|---|
| Both Vivid stories ended | Iona's `74-iona-ending.png` shows rescue; Mara's `43-mara-ending.png` shows reveal with interpretation buttons. Those captures do not establish their canonical endpoints. | Verify through final placement / interpretation before claiming complete journeys. |
| The letter is a reward available only on return | `68-private-letter.png` shows the letter alongside exploration controls. Iona permits an early intrusion; privacy or dedication changes the later placement. | Test the remembered choice and its consequence, not an exclusive letter unlock. |
| The wedge completes automatically | The braced capture still offers a wedge-placement action; the reducer requires placement before finishing recollection. | Record the actual input and visible transition. Do not change the reducer on this claim alone. |
| “The keeper has not offered this letter” is stale after reading | Early unauthorized reading does not create permission. This warning is consistent with the consent history. | Preserve it. Observe whether humans distinguish availability from permission after gate scoring. |
| Mara is the same puzzle as Pixel Harbor, improved by a story | Pixel Harbor is deduction; Mara provides an explicit alignment hint and accepts any emotional interpretation. Comparative enjoyment is unmeasured. | Preserve guided expressive arrangement; do not add difficulty or hide accessible guidance. |
| Vivid needs six pairs and unprompted return | The protocol requires six Iona participants and six different Mara participants. Iona's neutral scheduled return prompt is exposure, not retention. | Keep the existing cohorts, task wording and scoring. |
| Six studied competitors; PhotoHacks unplayed | The October 30 retry establishes PhotoHacks Arcade Level 1, with 94/100, 150 credits and “Level cleared.” There are seven studied references: three browser-task activities and four desk studies. | Correct current counts, preserve the failed first attempt and distinguish a completed activity from a whole game. |

PhotoHacks reached its tutorial-complete screen with steps 8–9 skipped and steps 14/18 unseen as separate dialogs. Birdography's fixed species order resolves the earlier unlock allegation. Pixel Harbor's two completion panels and displayed times are visible, while its narrated stale-text sequence remains task-report evidence. Field Guide reached menu, island and pause states but no creature photograph or populated gallery. Tranquility remains failed and Pathipelago unplayed. Do not count listings, blocked attempts, desk studies or repeated screenshots as completed playthroughs. The coverage table's classification of Pixel Harbor as outside deduction is not defensible; broad genre coverage remains an honest research limitation, not a reason to relabel it.

| Inspect the evidence | Pinned source at the reviewed upload |
|---|---|
| Iona phases, early letter access, consent history and placement completion | [Story reducer and presentation](https://github.com/PaperStrange/IndiaGames/blob/b9e1560cc641691bc8d48b4254cab0bac73fe64c/vivid-2.5d-photo-game/play/src/stories/iona/index.js) |
| Mara reveal versus interpretation ending | [Story reducer and presentation](https://github.com/PaperStrange/IndiaGames/blob/b9e1560cc641691bc8d48b4254cab0bac73fe64c/vivid-2.5d-photo-game/play/src/stories/mara/index.js) |
| Rescue capture, not completed return | [74-iona-ending.png](https://github.com/PaperStrange/IndiaGames/blob/b9e1560cc641691bc8d48b4254cab0bac73fe64c/docs/gamejam/competitor-plays-2026-10-28/evidence/vivid/74-iona-ending.png) |
| Private letter visible during exploration | [68-private-letter.png](https://github.com/PaperStrange/IndiaGames/blob/b9e1560cc641691bc8d48b4254cab0bac73fe64c/docs/gamejam/competitor-plays-2026-10-28/evidence/vivid/68-private-letter.png) |
| Reveal with unchosen interpretations | [43-mara-ending.png](https://github.com/PaperStrange/IndiaGames/blob/b9e1560cc641691bc8d48b4254cab0bac73fe64c/docs/gamejam/competitor-plays-2026-10-28/evidence/vivid/43-mara-ending.png) |
| Shared grid and accessible adjustment control | [CSS](https://github.com/PaperStrange/IndiaGames/blob/b9e1560cc641691bc8d48b4254cab0bac73fe64c/vivid-2.5d-photo-game/play/styles.css#L723) / [control construction](https://github.com/PaperStrange/IndiaGames/blob/b9e1560cc641691bc8d48b4254cab0bac73fe64c/vivid-2.5d-photo-game/play/src/app.js#L368) |

## Five perspectives on the next decision

| Perspective | Supported strength | Critical alternative | Bounded response |
|---|---|---|---|
| Player | Visible feedback supports recovery; expressive actions offer a route into short stories. | An agent following a known route can finish while a fresh player feels lost or merely follows instructions. | Record first purposeful action, hesitation, help, exit and the player's own explanation; do not equate completion with fun. |
| System designer | Iona has a performed repair and choice-dependent return; Mara has reversible alignment and an open interpretation. | A rescue or reveal can feel like an ending before the required action is finished. | Verify full canonical journeys and state persistence; make no new story or puzzle expansion in this batch. |
| Narrative and art | Care, consent and the workshop give objects specific meaning; the cast and story-pack interfaces support different protagonists. | Strong letter prose can overshadow the actual causal action; a narrow helper column obscures Mara's physical metaphor. | Preserve consent history and authored interpretations; repair shared helper layout without replacing expressive interaction with scores. |
| Operator and release owner | Frozen assets and independent story profiles permit repeatable delivery. | `file://` success does not establish served paths, origin-specific saves, reload behavior or phone performance. | Verify exported bytes over the actual HTTP route, retain exact build identity and stage only through a reviewed `master` PR. |
| Researcher | Raw captures now make more of the findings inspectable. | Agent prose, source inspection, capture state and human response answer different questions; quota labels can exaggerate breadth. | Keep evidence classes and assistance explicit. Human cohorts, device checks and release approval stay pending. |

## The three product questions

| Question | Working proposition | What could disprove or narrow it |
|---|---|---|
| Why play? | A short act of care or discovery may make an ordinary object worth attending to. | People complete only to follow instructions, cannot identify a meaningful action, or want to leave before its consequence. |
| Why choose it in a browser catalogue? | A brief, immediately understandable story with tactile inputs and a remembered arrangement may fit a quiet browser session. | Entry expectations mismatch the authored scope, controls obscure the activity, or players cannot describe a relevant difference. |
| What distinctive experience can we deliver? | Iona connects privacy/dedication to a later placement; Mara lets an arrangement reveal a possible community future without one correct emotional answer. | The return feels arbitrary, or moving the lightbox feels unrelated to the reveal. Neither market uniqueness nor emotional superiority is established. |

## Implementation and acceptance boundaries

1. **KF02 / KF10 / KF11 follow-up:** use this adjudication and the handoff packet; preserve dated completed work and add follow-up evidence rather than erasing history. Do not modify the five original reports or historical HTML.
2. **KF06 / KF09 follow-up:** if reproduced, make the helper span all columns of the shared `.adjust-control` grid. Preserve its label association, `aria-describedby`, native range input, +/- controls, focus restoration, input preview and committed state. No Mara-only engine branch, save-schema change or hidden hint is needed.
3. **KF10 / KF20 follow-up:** verify both complete stories over supported HTTP. Check helper readability at desktop, supported narrow widths and larger text; input equivalence, focus, flat/reduced-motion presentation and no horizontal overflow. Run the existing state/runtime regressions for recollection, both memory choices, save isolation, recovery and recast behavior. Log failures and actual outputs.
4. **KF15 / KF17 follow-up:** if shipped bytes change, freeze an unused patch version (planned `0.1.3`) with its exact source, inventory and blank schema-v2 human report. Leave the dated 0.1.2 exporter and packet unchanged. Use a version-aware new export path and record its command; do not repoint the historical helper. Stage through a reviewed `master` PR and record its immutable commit after staging.
5. **KF12 / KF18 / KF23 remain pending:** humans are arranged later. KF22 policy review is separate; record its actual PR result when confirmed, without treating agent policy review as human game approval. No `main` promotion follows from this batch's automated checks.

Canonical Iona fresh journey: rescue → begin recollection → brace → explicitly place wedge → finish recollection → privacy/dedication choice → first ending → return → corresponding placement. Its completion condition is return **and placement**. A legacy save can offer optional recollection; that does not make recollection optional in the fresh journey. Mara: inspect all three objects → align at notch 3 → reveal → choose any interpretation → end. The guided notch is an expressive action, not a secret deduction answer.

Executed verification is recorded in [TECHNICAL-QA.md](TECHNICAL-QA.md). The new [version-aware exporter](CANDIDATE-EXPORT.md) built immutable source `813f264400bfc01d7e3e5f668de29bb835f5a70d` twice with identical output; staging integrity passed, human readiness did not become approval. Policy PR [#1](https://github.com/PaperStrange/IndiaGames/pull/1) merged at `7a26e07a71062766e357b51aece9cce8b00c9b17` after independent agent review and current CI, under the owner’s batch-specific code-review exception. Actual candidate master staging remains pending. If a deadline arrives before the human gate is satisfied, leave the candidate staged and postpone the official release.
