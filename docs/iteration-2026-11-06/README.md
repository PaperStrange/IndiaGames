# November 6 iteration · engineering cleanup and technical freeze

**Engineering continues across all three game branches without waiting for participant recruitment.** The owner asked for codebase, issue and progress cleanup, then movement toward the next milestone. The dashboard may be published after independent agent review and passing CI; the owner will review the complete published dashboard afterward.

This instruction does not supply human game observations or official-release approval. As of November 6 there are five days to the November 11 candidate-freeze target and 14 to the conditional November 20 launch. Human sessions remain unbooked, so the release target remains at risk. [Owner release checklist](OWNER-TODO.md) lists work that can proceed alongside engineering.

## Current engineering milestone

| Game | Selected cleanup | Evidence required before completion | Artifact boundary |
|---|---|---|---|
| Small Hours | **SH-22:** isolate the countdown lifecycle; make browser-test output fresh and preserve historical evidence | Existing behavioral checks, focused timing/cancellation tests and relevant browser flow; source-bound verification | Development code can change. The frozen eight-file pair-study baseline remains unchanged and unstaged. |
| Vivid | **KF-28:** derive the badge from the package version; **KF-29:** prepare and stage the verified 0.1.4 export | Built-version guard, relevant unit checks, matching clean builds, both story endpoints and an independently reviewed staging PR | New bytes receive version 0.1.4; 0.1.3 and earlier packages remain immutable. Staging is not official approval. |
| The Thirteenth Bell | **TB-21:** explicit build destinations and isolated, non-destructive static/reproducibility checks | Negative build-validation checks, applicable existing tests, focused browser smoke and exact generated-byte comparison | Candidate 0.1.0 and the previous Contrast reference remain unchanged. |

The [task snapshot](../../data/tasks.json) records actual status and evidence links. Assigned work is not marked complete before its checks and integration finish. The November 5 preparation reports and failed/retried attempts remain preserved; they are not silently reclassified as new checks.

One integrator owns each game's shared code. Changes stay on the owning source branch, with independent review before integration. No speculative narrative, mechanic, protagonist or broad visual redesign is selected from absent participant evidence. Vivid retains its story-pack boundaries and both required stories.

## Next goal: a reproducible technical freeze

After the bounded cleanup passes, the next engineering milestone is to make the exact development sources and candidate packages easy to rebuild, identify and validate. This work proceeds before recruitment:

1. Bind each completed cleanup to its source commit, meaningful tests and generated artifact identity; update current development instructions and remove stale progress claims.
2. Export Vivid 0.1.4 through the existing version-aware path, compare two clean builds, and stage its complete packet on `master` after the staging gate and independent review. Keep human reports blank.
3. Preserve Small Hours' separate frozen pilot baseline and Bell's byte-identical candidate. Record the distinction between development source changes and actual study artifacts.
4. Publish the dashboard's actual progress and issue dispositions, then verify the deployed revision, links, responsive layout and served bytes.

These are engineering exit criteria. Decisions about fun, comprehension, meaningful difference and remembered consequence still require the original human protocols and contradictory observations. Technical success does not answer those questions on behalf of players.

## Dates and independent work

| Cutoff | Engineering work | Human/release work |
|---|---|---|
| Nov 6–10 | Complete bounded cleanup, reproducible exports, regression checks and current documentation | Arrange accepted facilitators, devices, participants and reviewer when available; no booking dates invented |
| Nov 11 | Freeze testable candidate source/version/inventory; preserve older packets | Small Hours still requires its pilot/design/manual prerequisites before staging; a missed freeze removes that game from the default launch track |
| Nov 12–15 | Investigate reproduced defects and prepare separately versioned corrections if needed | Complete required exact-build cohorts, physical-device checks and independent review |
| Nov 16 | Verify package, protection and publication readiness | Per-game go/no-go; missing evidence or approval means no-go |
| Nov 17–20 | Rehearse and verify individually approved publications | Publish only approved games; other candidates remain on `master` |

No calendar date reduces a cohort, removes a story, shortens Bell's neutral recall break or converts an agent run into a human result. The [launch calendar](../launch/2026-11-20/README.md) and [release policy](../RELEASE-POLICY.md) retain the full criteria.

## Issue dispositions

| Item | Actual project state | Next action |
|---|---|---|
| [#2 · repository protection](https://github.com/PaperStrange/IndiaGames/issues/2) | Latest reviewed state has no effective main/master protection; prior settings writes returned 403 | [November 6 status](https://github.com/PaperStrange/IndiaGames/issues/2#issuecomment-6677871490) retains administrator enablement and verification. This remains a release/governance dependency, not a reason to stop source cleanup. |
| [#5 · agent playtesting](https://github.com/PaperStrange/IndiaGames/issues/5) | **Closed:** supported same-host HTTP reports and facilitator setup satisfy the project route request | [Closure record](https://github.com/PaperStrange/IndiaGames/issues/5#issuecomment-6677869410) preserves the original failure. The separate [#10 tooling follow-up](https://github.com/PaperStrange/IndiaGames/issues/10) tracks managed Chromium 152 Local Network Access; it does not block verified project engineering or become a mandatory release gate. |
| [PR #9 · preparation dashboard](https://github.com/PaperStrange/IndiaGames/pull/9) | Merged to main `239fceeab2c84491f5d9d5c471bf18504567a587`; live verification passed on November 6 | [Eleven served-file and browser-response hashes](publication-pr9.json) match; [public verification](https://github.com/PaperStrange/IndiaGames/pull/9#issuecomment-6677860269) records the actual deployment; desktop/narrow checks passed with zero unexpected errors. The new cleanup update needs its own deployment verification. |

The original managed-browser restriction is not claimed repaired by a working co-located browser. Physical-phone access is also a separate check. The legacy candidate Pages-link repair and unconfirmed Nemo invitation remain deferred.

## Publication authority and evidence

The owner's November 6 instruction authorizes publishing this dashboard delivery before their whole-dashboard review. Independent agent review, current CI, exact-head merge checks and actual deployment verification still apply. This records the session's instruction; it does not claim a counted robot approval, alter permanent branch policy or waive independent human game-release approval.

Keep consent, contacts and raw participant recordings private. Preserve historical reports and immutable packages. Commit and push at verified milestones, check the remote SHA, and back up before branch retirement. Codex allowance is unavailable; if the owner reports less than 5%, stop new work at a safe boundary, save completed work, unfinished checks and exact restart steps, then wait.
