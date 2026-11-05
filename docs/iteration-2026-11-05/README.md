# November 5 iteration · prepare three parallel human studies

**November 20 is at risk for all three games.** As of November 5, 15 calendar days remain until launch and six until candidate freeze. The October 31–November 4 human pilots did not occur; the planned November 5 design selections therefore lack human evidence.

The owner chose **all three preparation lanes in parallel**, with supervised sessions on **facilitator machines**. Recruitment needs more time. No facilitator, participant roster, device appointment or independent review date is confirmed. The next action for the owner is the [unblock checklist](OWNER-TODO.md); the [launch calendar](../launch/2026-11-20/README.md) preserves the full release criteria.

## Progress and the next deliverable

The November 5 intake found 37 of 65 historical task cards done, four active, 11 human-blocked, two proposed and 11 conditional. These are task counts, not a launch-readiness percentage. Three dated technical-preparation follow-ups are now completed; a fourth card proposes the future Vivid badge correction. The board contains 69 cards, including 40 done, with actual result links in the [current task snapshot](../../data/tasks.json). These counts do not measure launch readiness. No human sessions, physical-device results or official approvals were filed at intake.

| Lane | Verified starting point | Next preparation | Human dependency |
|---|---|---|---|
| Small Hours / Memorable Moments | Unchanged baseline; eight November 4 HTTP lifecycle checks; not staged | **SH-21:** keyboard/focus, blank/long inputs, timer expiry and exact local setup | Six pairs and an evidence-linked design decision before staging |
| Vivid | Candidate **0.1.3 staged**; shared-helper correction verified; 0.1.2 preserved | **KF-27:** migration/recovery, forced WebGL failure and both stories on the same facilitator setup | Separate six-person Iona and Mara cohorts; physical-device checks |
| The Thirteenth Bell | Candidate **0.1.0 staged**; 33 November 4 scenario executions | **TB-20:** frozen candidate/reference setup, comparison order and neutral recall handoff | Six people, three in each first-build order; physical-device checks |

These follow-ups fill identified gaps without claiming fresh first-time understanding or fun. Retain failed checks and controlled retries. Reproduce any suspected product defect on exact bytes before selecting a correction; a harness mistake is not automatically a game defect. The unchanged main source/data formats and release gate remain in use. Vivid 0.1.3 displays a stale 0.1.2 badge; facilitators identify the artifact by its manifest and inventory. **KF-28** records a proposed next-build metadata correction, with no current byte replacement or inferred critical severity.

## Completed technical preparation

| Game | November 5 result | Facilitator handoff |
|---|---|---|
| Small Hours | [5 November: four targeted groups and 64 assertions passed, including full keyboard/focus, blank/maximum-length details, actual SVG contents, real 45,060 ms timer expiry and a separate clock-assisted interruption. Zero observed browser/network errors; eight-file baseline unchanged. Physical devices and real pair experience remain untested.](https://github.com/PaperStrange/IndiaGames/blob/7f4a7f26418b61632acf4e02634a636da5e08da0/docs/gamejam/readiness-2026-11-05/TECHNICAL-QA.md) | [Local setup and recording forms](https://github.com/PaperStrange/IndiaGames/blob/7f4a7f26418b61632acf4e02634a636da5e08da0/docs/gamejam/readiness-2026-11-05/FACILITATOR-SETUP.md) |
| Vivid | [5 November: 26 distinct migration, storage and graphics-fault conditions passed across retained attempts (16 initial passes, 10 harness failures, then 10 targeted passes; 36 executions total). Eight expected injected-fault diagnostics in the retry, zero unexpected errors. All 15 frozen 0.1.3 files unchanged. The visible 0.1.2 badge is a documented metadata limitation; neutral study, physical devices and humans remain pending.](https://github.com/PaperStrange/IndiaGames/blob/2070902d7b5ea0da59ab07d35d218f9a66f7791f/docs/gamejam/readiness-2026-11-05/TECHNICAL-QA.md) | [Local setup and recording forms](https://github.com/PaperStrange/IndiaGames/blob/2070902d7b5ea0da59ab07d35d218f9a66f7791f/docs/gamejam/readiness-2026-11-05/FACILITATOR-SETUP.md) |
| Bell | [5 November: four facilitator-setup journeys and 24 checks passed for frozen candidate/reference across desktop/narrow HTTP origins. Candidate/reference inventories and served HTML matched; no candidate failures. Four optional reference Google Fonts certificate failures remain disclosed. These setup checks do not rerun all November 4 causal scenarios or establish human recall/physical-device results.](https://github.com/PaperStrange/IndiaGames/blob/70824713a09684de9b232a35e71f46840fe04d07/docs/gamejam/readiness-2026-11-05/TECHNICAL-QA.md) | [Local setup and recording forms](https://github.com/PaperStrange/IndiaGames/blob/70824713a09684de9b232a35e71f46840fe04d07/docs/gamejam/readiness-2026-11-05/FACILITATOR-SETUP.md) |

All three source branches were pushed and their remote heads verified. Runtime and frozen candidate bytes remain unchanged. Tests used synthetic data and controlled faults, not human participants.

## Parallel ownership and decision order

| Owner | Deliverable | Boundary |
|---|---|---|
| One integrator and QA agent per game | Targeted checks, artifact identity and facilitator setup | Own branch/report scope; no speculative feature work |
| Human coordinator and facilitators | Private consent/roster, exact preregistration, all attempts and neutral observation | Role names are not accepted assignments; dates remain unbooked |
| Design/research, narrative and art reviewers | One advance/revise/stop note after observations | Select at most one bounded correction per game, including no change |
| Hub/release coordinator | Current board, deadline risks, issue dispositions and immutable package links | Hub publication does not certify a game |
| Repository administrator and independent reviewer | Effective protection and eligible code/release review | November 4's agent-review exception does not extend to this batch |

Review each journey from five perspectives: player motivation and confusion; systems/rule consequences; narrative meaning; visual/accessibility cues; and operator/setup failures. Separate quotations, observed behavior and interpretation. Each decision must answer why people continued or stopped, what differed from the recorded competitors, and which specific action/consequence they remembered. Preserve contradictions, partial competitor journeys and missing evidence; do not infer market superiority from a small formative cohort.

No new mechanics, stories, broad art replacement, accounts or platform expansion are selected. For Small Hours, the baseline pair study governs the selection and staging prerequisites. Vivid retains both stories and their distinct narrative structures. Bell receives no routine copy patch without a reproduced problem or human evidence.

## Calendar and cut lines

| Window | Output | If unavailable |
|---|---|---|
| Nov 6–10 | Finish bounded technical checks and facilitator setup; conduct pilots only when appointments are confirmed | Keep recruitment and human evidence pending; do not invent dates or select speculative changes |
| Nov 11 | Freeze exact source/version/inventory on master; Small Hours first satisfies its pilot/manual prerequisites | Remove that game from the default November 20 track and record a revised date |
| Nov 12–15 | Required exact-build cohorts, physical-device/accessibility checks and independent review | Preserve all missing or failed evidence; reserve fresh validation for changed bytes |
| Nov 16 | Written per-game go/no-go, zero open critical bugs, independent approval and effective publication controls | No-go for any missing required result or approval |
| Nov 17–19 | Rehearse each approved promotion, nested URLs, notes, tag and recovery | Repair publication blockers before announcing a release |
| Nov 20 | Publish and verify only individually approved games | Other candidates remain on master; an honest dashboard-only update is possible |

The first round needs **30 fresh participants, 24 candidate sessions and six Bell reference runs**, approximately **24 facilitator-hours plus device and reviewer time**. This is a capacity estimate, not measured game duration. Changed candidates may require another round. Unchanged pilot evidence is reusable only when exact hashes, preregistration, all attempts and canonical policy satisfy the independent reviewer.

## Human acceptance stays unchanged

| Game | Criteria on the exact candidate |
|---|---|
| Small Hours | At least 5/6 pairs reach reveal unaided; 4/6 pairs both contribute; 3/6 voluntarily save or replay |
| Vivid / Iona | At least 4/6 each both complete unaided and explain choice → return; at most 1/6 expects unrestricted AI |
| Vivid / Mara | At least 4/6 each both complete unaided and explain action → visible consequence; emotional interpretation is not scored |
| Bell | At least 4/6 each both explain cause and predict before outcome; 4/6 each both earn the action uncoached and explain Fracture; 3/6 recall Mina's specific changed outcome after at least 120 seconds of neutral activity |

All require zero unresolved critical bugs, actual device/accessibility checks and an independent human reviewer who plays the exact build and is neither participant nor observer. Keep failed, assisted and abandoned attempts. Changed build bytes require a new immutable version and build-specific validation. The [release policy](../RELEASE-POLICY.md) and game-specific protocols govern; these summaries do not replace them.

## Issues and publication reconciliation

| Item | Completed evidence | Still open |
|---|---|---|
| [#2 · protection](https://github.com/PaperStrange/IndiaGames/issues/2) | Reviewed runbook/configuration merged; [November 4 readback](https://github.com/PaperStrange/IndiaGames/issues/2#issuecomment-6636823465) published | [November 5 readback](admin/STATUS.md): rulesets and effective branch rules empty; main/master unprotected; only PaperStrange is a listed collaborator. Prior settings writes returned 403. Administrator must enable enforcement and arrange an eligible independent reviewer. |
| [#5 · browser access](https://github.com/PaperStrange/IndiaGames/issues/5) | Supported same-host HTTP reports and [issue comment](https://github.com/PaperStrange/IndiaGames/issues/5#issuecomment-6635762133) delivered | Original managed Chromium 152/LNA path remains unresolved. Actual facilitator/phone access must be verified before studies. This legacy path does not block use of a separately verified route. |
| Candidate staging | [PR #6](https://github.com/PaperStrange/IndiaGames/pull/6) merged Vivid 0.1.3 to master | Human validation and official release pending |
| Hub delivery | PRs #1, #3, #4, #6, #7 and #8 merged. [November 4 live verification](https://github.com/PaperStrange/IndiaGames/pull/7#issuecomment-6637048654) bound 11 served files to main `f68c755c6b738ff219561faaaf2f78b0ceee3a83`; desktop/narrow checks passed | This November 5 update needs its own review, merge and deployment verification; historical success is not a new deployment claim |

At the November 5 intake there were no open PRs. The November 4 issue plan and manifest were premerge snapshots: their pending PR/staging/comment statements are historical, superseded by the links above. The older candidate Pages-link repair and Nemo invitation remain deferred. A facilitator's localhost is not a remote participant link; use the device setup instructions and verify reachability.

## Dashboard validation

[Local browser results and previews](DASHBOARD-QA.md) passed on the bound final snapshot. This update still requires its own eligible review and actual deployment verification.

## Integration and recovery

Keep one source branch per game and one integrator for overlapping edits. Commit/push after a completed contract, verified artifact or evidence handoff, then verify the remote SHA. Update authored task sources and generated dashboard together, preserving every prior task and dated result. Human forms stay blank until actual sessions; private contacts/consent/raw recordings remain outside Git.

Promotion remains game branch → immutable master candidate → actual human evidence → independently reviewed promotion → main. No whole-game or whole-master merge into the hub. Back up before retiring branches. Checkpoints record source/artifact identities, dirty files, unfinished checks, active services and exact restart commands. Codex allowance is unavailable; on a user report below 5%, stop new work at a safe boundary, checkpoint and wait.
