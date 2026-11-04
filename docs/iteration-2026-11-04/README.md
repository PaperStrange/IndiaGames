# November 4 iteration — technical readiness, then human studies

**Current goal:** verify the exact game artifacts over supported HTTP, correct bounded reproduced defects, and hand over usable human study packets. Human studies will be arranged later. The November 20 launch target remains conditional; no game has an approved official release.

| Game | Current technical work | Required human evidence | Next decision |
|---|---|---|---|
| [Small Hours](#memorable) | Preserve the baseline; verify pair flow, rehearsal, actual SVG and reset behavior | Six real pairs; physical-device checks; independent human review | Keep unchanged until real pair observations justify one change |
| [Vivid](#vivid) | Verify complete Iona/Mara endpoints; correct the reproduced shared helper layout; prepare a separately versioned candidate | Six Iona people plus six different Mara people; physical-device checks; independent human review | Judge the bounded layout correction separately from story comprehension |
| [The Thirteenth Bell](#bell) | Preserve 0.1.0; verify phase, anchor, borrowed-time and Fracture boundaries | Six people, three in each first-build order; ≥120-second neutral recall; physical-device checks; independent human review | No routine rules-copy change before human evidence unless a visible-control defect reproduces |

The November 4 technical reports are published below. Their limited scopes, failures and controlled retries remain explicit. Historical passes retain their original dates. Agent gameplay, synthetic regression tests, source inspection and human sessions are distinct evidence classes.


## Published technical results

| Game | Actual result | Limits |
|---|---|---|
| [small-hours](https://github.com/PaperStrange/IndiaGames/blob/e94aa04273e581d1a27ade1988fe6d422b6111ec/docs/gamejam/readiness-2026-11-04/TECHNICAL-QA.md) | 4 November: 8 supported-HTTP lifecycle cases passed across root/nested mounts, 1280/390px and pair/rehearsal modes; actual SVG contents and replay/reset/reload checked, zero reported errors, frozen baseline unchanged. Keyboard/focus, blank/maximum-length details, timer expiry, physical devices and real pair experience were not tested in this pass. | Humans and physical devices pending |
| [keepers-frame](https://github.com/PaperStrange/IndiaGames/blob/23d19663c78935e70307dca33acc8f1ce07bcf48/docs/gamejam/readiness-2026-11-04/TECHNICAL-QA.md) | 4 November: 20 distinct semantic cases functionally passed across retained attempts, with disclosed harness corrections and one aborted asset request followed by an error-free targeted retry; 8 layout cases and 51 unit tests passed, and two clean builds matched. Canonical Iona return placement and Mara interpretation were exercised. Neutral profile, migration/recovery, forced WebGL failure, physical devices and humans were not retested in this pass. Exported 0.1.3 awaits master staging. | Humans and physical devices pending |
| [thirteenth-bell](https://github.com/PaperStrange/IndiaGames/blob/56eec3e7d96410492ad70bf39b5eb5ae003feec8/docs/gamejam/readiness-2026-11-04/TECHNICAL-QA.md) | 4 November: 33 scenario executions passed (16 root, 16 nested, one nested desktop ending/restart) on unchanged 0.1.0. Candidate resources had no failures. The frozen historical reference used fallback fonts after its optional Google Fonts certificate failure. Known-route and race-regression checks are not fresh-player comprehension, recall or physical-device evidence. | Humans and physical devices pending |

Vivid runtime source: `813f264400bfc01d7e3e5f668de29bb835f5a70d`; exported 0.1.3 inventory `7498c636fee9b42298e4c9cde5ada0c8f688ef7835237e1e4761e269b68d3e00` (15 files,1,401,316 bytes). [Staging PR #6](https://github.com/PaperStrange/IndiaGames/pull/6) is open at `6ac31873f21159943801d5646c3ac37c0eba3e5a`; master integration is pending. KF-25 closes code/export; KF-26 owns staging. Historical KF-17 remains the completed 0.1.2 task.

[Independent dashboard review](DASHBOARD-REVIEW.md) found no blocking issues. [Dashboard browser verification and previews](DASHBOARD-QA.md): 65 tasks, four mount/viewport journeys, tablet/enlarged text, navigation and retry passed. This verifies the integrated local site; live Pages publication remains pending.

## Current work board

| ID | Owner role | Acceptance boundary |
|---|---|---|
| SH-20 | QA/tooling lead + Small Hours integrator | Supported HTTP, exact baseline, full pair and rehearsal paths, actual SVG contents, reset/reload and honest limitations |
| KF-24 | QA/tooling lead + Vivid integrator | Both complete canonical story endpoints, saved-state/reload checks and root/nested serving |
| KF-25 | Shared-control integrator + release integrator | Done: full-row helper, equivalent inputs and immutable 0.1.3 export; no story/save changes |
| KF-26 | Release integrator + independent code reviewer | Open PR #6; merge and verify exact master identity before declaring staged |
| TB-19 | QA/tooling lead + Bell integrator | Visible controls and causal/state boundaries on unchanged 0.1.0; source-correct handoff |
| [Issue #2](https://github.com/PaperStrange/IndiaGames/issues/2) | Repository administrator | Actual main/master protection and counted review enforcement; documentation or a merged PR alone is insufficient |
| [Issue #5](https://github.com/PaperStrange/IndiaGames/issues/5) | QA/tooling lead | Reproducible supported HTTP route and committed reports; preserve the original managed-browser restriction |

See [issue dispositions](issues.md), the [generated task snapshot](../../data/tasks.json), and the [launch calendar](../launch/2026-11-20/README.md). Historical task IDs, completed evidence and original research files remain preserved. A technical follow-up marked done cannot satisfy a human task.

<a id="memorable"></a>
## Small Hours

An operator reached the pair reveal and exported a keepsake; this establishes a mechanical path. It does not demonstrate reciprocal comfort, contribution, voluntary replay or why a real pair would keep the file. Different pair/rehearsal labels describe different states; treating them as interchangeable selectors can create an operator failure.

The player and narrative hypothesis is a shared activity that visibly belongs to both people. The design question is whether private choice, mutual reveal and both detail contributions support that feeling. Art and UX observations should focus on privacy, turn ownership and the recognizability of the two contributions. Operators must inspect the downloaded SVG rather than assume a click saved the right content. Research should preserve Gartic Solo's limited social scope and the incomplete second deep family.

[Reviewed archive](https://github.com/PaperStrange/IndiaGames/blob/45042578e549d0aba3ee10702384d0a86c780aa9/docs/gamejam/competitor-plays-2026-10-28/README.md) · [Human packet](https://github.com/PaperStrange/IndiaGames/blob/45042578e549d0aba3ee10702384d0a86c780aa9/docs/gamejam/launch-2026-11-20/README.md) · [Current game handoff](https://github.com/PaperStrange/IndiaGames/blob/e94aa04273e581d1a27ade1988fe6d422b6111ec/docs/gamejam/readiness-2026-11-04/README.md) · [Current TODO](../games/small-hours/TODO.md)

<a id="vivid"></a>
## Vivid

The archived rescue and reveal frames do not establish Iona's final return placement or Mara's chosen interpretation. Early letter access is not permission; the existing consent-history warning remains meaningful. Mara's visible alignment hint supports guided expression rather than a concealed deduction puzzle.

The bounded implementation target is the reproduced narrow shared alignment-helper column: let the helper span its grid row. Preserve Iona's reducer, consent, privacy/dedication and performed wedge placement, and Mara's open emotional interpretation. The player question is whether each action makes its consequence understandable. Narrative/art review should examine meaningful objects and causal memory; operator verification must reach the canonical endpoints over HTTP and reload the actual saved states. Research retains PhotoHacks' completed assignment without turning it into whole-game completion or removing earlier failures.

[Reviewed archive](https://github.com/PaperStrange/IndiaGames/blob/b9e1560cc641691bc8d48b4254cab0bac73fe64c/docs/gamejam/competitor-plays-2026-10-28/README.md) · [Human packet](https://github.com/PaperStrange/IndiaGames/blob/b9e1560cc641691bc8d48b4254cab0bac73fe64c/docs/gamejam/launch-2026-11-20/README.md) · [Current game handoff](https://github.com/PaperStrange/IndiaGames/blob/23d19663c78935e70307dca33acc8f1ce07bcf48/docs/gamejam/readiness-2026-11-04/README.md) · [Current TODO](../games/keepers-frame/TODO.md)

<a id="bell"></a>
## The Thirteenth Bell

The recorded journey supports witness → retained clue → next-morning preparation → Mina at the well while the main alley stays blocked. That is a concrete causal promise, not proof that fresh people discover, understand or enjoy it. Map places are buttons; blank forecasts permit advancement; current rules already describe borrowing and Fracture. The old one-line patch is not current execution guidance.

Player observation should distinguish reading, route choice, confusion and inability to progress. Designers should preserve witness provenance, legal timing/costs and the unchanged crowd. Narrative/art work should protect the visible contrast between obstruction and changed destination. Operators must reproduce a failure through visible controls rather than stale hidden DOM. Researchers must not convert repeated agent stalls into independent human failures or a mandatory copy fix. The second deep competitor comparison remains open research, not an added release gate.

[Reviewed archive](https://github.com/PaperStrange/IndiaGames/blob/3d4e205c417272f00b87c76c00532f4456d31e38/docs/gamejam/competitor-plays-2026-10-28/README.md) · [Human packet](https://github.com/PaperStrange/IndiaGames/blob/3d4e205c417272f00b87c76c00532f4456d31e38/docs/gamejam/launch-2026-11-20/README.md) · [Current game handoff](https://github.com/PaperStrange/IndiaGames/blob/56eec3e7d96410492ad70bf39b5eb5ae003feec8/docs/gamejam/readiness-2026-11-04/README.md) · [Current TODO](../games/thirteenth-bell/TODO.md)

## Evidence, scheduling and publication

The three product questions remain hypotheses: why people would continue, what meaningfully differs in a browser catalogue, and which specific action/consequence they remember. Record exact words, observed behavior and contradictory cases before interpretation. Store pages, criticism and agent affective prose cannot supply human preferences or establish market uniqueness.

The old October 31–November 4 human-pilot window was not completed. Arrange facilitators, cohorts, actual devices and independent reviewers, then reforecast each lane. Keep the November 11 freeze and November 16 go/no-go as target cut lines; postpone any game whose unchanged gate cannot fit. Do not shorten recall, remove a story, replace failed attempts, invent attendance or treat automated device emulation as a physical pass.

Release flow stays game branch → immutable master candidate → actual human evidence → independently reviewed promotion → main. Preserve Vivid 0.1.2 and Bell 0.1.0. A verified Vivid runtime correction receives a new unused version; Small Hours staging still depends on its original pilot decision. The official registry remains empty. Browser transport work does not reopen the paused candidate-URL repair.

## Dated code-review exception

For the November 4 readiness and existing-PR batch only, the user authorized independent agent code review. Review findings must bind to an exact head and actual checks; integration records must state actual merges rather than fabricate GitHub approvals. The [independent review report](PR-REVIEW.md) is separate from game evaluation. Policy PR [#1](https://github.com/PaperStrange/IndiaGames/pull/1) has been merged; [#4](https://github.com/PaperStrange/IndiaGames/pull/4) head `16ac76f3cdb3fc9efb69daad31f8d04166838e30` and [#3](https://github.com/PaperStrange/IndiaGames/pull/3) head `39a8ebf51e65f82865dafeffaad872b8d52b9ab6` passed independent review; their required CI is queued. #4 has been queued since **15:51 UTC on November 4**. Neither is claimed merged here. PR #6 candidate staging also remains pending.

This is a dated execution exception. It does not weaken standing protection policy, lower a human game threshold, count agents as participants or authorize agent release approval. [Issue #2](issues.md) remains governed by actual settings evidence.

## Safe restart

Codex allowance is not visible. If the user reports less than 5%, stop new work at a safe boundary, save completed work, unfinished checks, exact source/artifact identities, remote state and restart commands, then wait. Do not claim automatic allowance monitoring.

