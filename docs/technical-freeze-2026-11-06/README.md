# November 6 technical-freeze engineering milestone

**SH-23, KF-30 and TB-22 are complete as engineering tasks.** The owner asked the team to complete the next milestone without waiting for recruitment. The completed [cleanup and Vivid 0.1.4 staging](../iteration-2026-11-06/README.md) provide the starting point. This delivery makes existing development artifacts repeatable to export and existing checks repeatable in branch CI.

Engineering acceptance is separate from candidate freeze and official release. Small Hours still needs its existing pilot/design/manual prerequisites before staging. Vivid 0.1.4 and Bell 0.1.0 remain staged with pending human evidence. No new game mechanic, story or art change is selected here.

## Acceptance and evidence

| Task | Required result | Current evidence | Artifact boundary |
|---|---|---|---|
| **SH-23 · Small Hours** | Export the exact nine-file development artifact twice from one pinned source; compare complete inventories and hashes; reject missing/extra files; exercise the exported build over supported HTTP with existing behavior/timer checks | **PASSED:** 13 unit tests, two matching exports, 18 HTTP file comparisons, 66 browser checks and three timer groups/nine assertions | Preserve the separate frozen eight-file study baseline; no candidate staging |
| **KF-30 · Vivid** | Run lockfile install, the existing 51 unit tests, build and emitted version guard in branch CI; prove deliberately stale version input is rejected in an isolated fixture | **PASSED:** [CI run 42175237179](https://github.com/PaperStrange/IndiaGames/actions/runs/42175237179); 51 unit tests, seven version-guard fixtures and all 15 staged hashes | Preserve both stories, runtime contract, version 0.1.4 and all staged package bytes |
| **TB-22 · The Thirteenth Bell** | Run the existing 25 Node tests and isolated static/build checks in branch CI; compare two clean outputs and retain malformed-anchor failure coverage | **PASSED:** [CI run 42175335194](https://github.com/PaperStrange/IndiaGames/actions/runs/42175335194); 25 Node, 20 clean static and five inventory tests; two exact builds | Preserve frozen candidate 0.1.0, Contrast reference and developer output |

The [machine-readable evidence ledger](evidence-ledger.json) binds each result to its exact source and actual check or workflow. Small Hours acceptance uses committed-source local export/HTTP verification; it does not claim a GitHub Actions run. The [75-card board](../../data/tasks.json) now contains 47 completed cards with linked evidence. Card counts do not measure human release readiness.

Small Hours’ final export run retained **four real favicon 404 responses and four matching console events**, with no other observed errors. Its earlier preliminary run retained five favicon 404 responses. Real expiry took 45,051 ms; dialog/cancellation use clock emulation and lifecycle handlers use synthetic events, without a physical-device or bfcache claim. Vivid retained its initial local cache-permission failure/retry and a successful-actions runtime warning. Bell’s 20 clean-checkout static checks become 21 only when an existing `dist/` adds freshness validation. [Per-game records](evidence-ledger.json) retain these limits.

The documentation heads also passed their own branch runs: [Vivid `2130e552`](https://github.com/PaperStrange/IndiaGames/actions/runs/42175791282) and [Bell `b451f5dd`](https://github.com/PaperStrange/IndiaGames/actions/runs/42175791241). These repeat the existing engineering checks; they add no new browser or human evidence.

One source branch owns each game. Implementation, tests and evidence are reviewed independently before integration; the final committed source is pushed and the remote SHA checked. Fresh outputs retain failed attempts and exact artifact identity. Source code, automated regression, deployed dashboard checks and human game observations remain different evidence categories.

## Engineering exit and the November dates

| Milestone | Exit condition | Human dependency |
|---|---|---|
| Engineering acceptance · completed Nov 6 | All three tasks meet the table above; reviewed source and real export/workflow results are recorded | None; recruitment proceeds separately |
| Candidate freeze · Nov 11 | Preserve exact candidate source/version/inventory and satisfy each game's staging prerequisites | Small Hours still requires its prior pilot/design/manual decision; a completed exporter cannot supply it |
| Go / no-go · Nov 16 | Required exact-build cohorts, physical-device evidence, defect status, independent human approval and repository protection are verified per game | Mandatory for an official release |
| Conditional launch · Nov 20 | Publish only individually approved versions with notes and working release links | Missing evidence keeps that game a candidate |

A completed engineering milestone does not mark the November 11 candidate freeze or the November 20 launch complete. It makes the existing artifacts easier to rebuild and verify. Claims about fun, comprehension, recall and meaningful difference still depend on the original human protocols, including contradictory observations.

## Existing release and owner work

Human sessions remain **0**, studies are unbooked, physical devices are unverified and independent human release approval is pending. The [owner checklist](../iteration-2026-11-06/OWNER-TODO.md) and [launch plan](../launch/2026-11-20/README.md) retain the complete cohorts and device criteria. These tasks do not block the selected engineering work.

| Item | Status and next action |
|---|---|
| [Issue #2 · protection](https://github.com/PaperStrange/IndiaGames/issues/2) | Administrator enablement and effective-rule verification remain open; required before the release decision |
| [Issue #5 · project playtesting route](https://github.com/PaperStrange/IndiaGames/issues/5) | Closed for the verified supported same-host HTTP setup |
| [Issue #10 · managed browser route](https://github.com/PaperStrange/IndiaGames/issues/10) | Open, non-blocking tooling follow-up; the original restriction is not claimed repaired |
| Historical candidate Pages link / Nemo invitation | Remain deferred; neither is silently changed by this milestone |

## Dashboard publication

[PR #12](https://github.com/PaperStrange/IndiaGames/pull/12) published the cleanup dashboard at main `89bb66834ff901045e17121e2a88dc087fbf830c`. Pages built it at **06:21:56 UTC**. Live verification at **06:22:22–06:22:31 UTC** matched all 11 served files and actual browser responses; desktop/narrow checks reached all 75 tasks with zero unexpected errors and TLS enabled. [Portable result](publication-pr12.json) · [Public verification](https://github.com/PaperStrange/IndiaGames/pull/12#issuecomment-6678626675).

This next dashboard update requires its own independent review, current CI, merged revision and actual Pages verification. The owner will review the whole published dashboard afterward. That instruction does not waive human game-release approval or change standing branch policy.

Keep raw participant records private. Preserve historical artifacts, commit/push at verified boundaries, and back up before retiring temporary branches. Codex allowance is not visible; if the owner reports less than 5%, stop at a safe boundary, save completed work, unfinished checks and exact restart steps, then wait.
