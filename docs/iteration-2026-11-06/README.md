# November 6 iteration · engineering cleanup and technical freeze

**Engineering continues across all three game branches without waiting for participant recruitment.** The owner asked for codebase, issue and progress cleanup, then movement toward the next milestone. The dashboard may be published after independent agent review and passing CI; the owner will review the complete published dashboard afterward.

This instruction does not supply human game observations or official-release approval. As of November 6 there are five days to the November 11 candidate-freeze target and 14 to the conditional November 20 launch. Human sessions remain unbooked, so the release target remains at risk. [Owner release checklist](OWNER-TODO.md) lists work that can proceed alongside engineering.

## Completed engineering milestone

| Game | Completed cleanup | Verified evidence | Artifact boundary |
|---|---|---|---|
| Small Hours | **SH-22 done:** isolated countdown lifecycle and fresh browser-test output with historical evidence preserved | Five countdown tests, 33 browser checks, three focused timer groups and two runner-failure cases passed | The verified development build has nine playable files. The frozen eight-file pair-study baseline remains unchanged and unstaged. |
| Vivid | **KF-28 / KF-29 done:** package-derived badge and verified 0.1.4 staged through PR #11 | 51 unit tests, canonical story checks, two matching clean builds and four exact-export journeys passed | Candidate 0.1.4 is on master; 0.1.3 and earlier packages remain immutable. Human approval remains pending. |
| The Thirteenth Bell | **TB-21 done:** explicit destinations and isolated build/static validation preserve developer output | 25 Node tests, 21 static checks and four browser journeys passed; two clean builds match the candidate | Candidate 0.1.0 and the previous Contrast reference remain unchanged. |

The [task snapshot](../../data/tasks.json) contains 75 cards, including 44 completed engineering/preparation cards; these counts are not a release-readiness percentage. SH-22, KF-28, KF-29 and TB-21 now have committed completion evidence. The November 5 preparation reports and failed/retried attempts remain preserved; they are not silently reclassified as new checks.

One integrator owns each game's shared code. Changes stay on the owning source branch, with independent review before integration. No speculative narrative, mechanic, protagonist or broad visual redesign is selected from absent participant evidence. Vivid retains its story-pack boundaries and both required stories.

## Published results

| Game | Actual checks and artifact | Evidence |
|---|---|---|
| Small Hours | 6 November: development cleanup passed 5 countdown unit tests, 33 browser checks, 3 focused timer groups/9 assertions and 2 runner-failure cases. Real expiry measured 45,045 ms; simulated lifecycle checks are separate. Development has nine playable files; the frozen eight-file study baseline remains unchanged and unstaged. | [Maintenance record](https://github.com/PaperStrange/IndiaGames/blob/4905ae84cb29ff0e1bb0bdfff19795fdd2d1f500/docs/gamejam/maintenance-2026-11-06/README.md) |
| Vivid — small worlds, lasting traces | 6 November: 51 unit tests, eight final canonical story conditions and fresh development badge checks passed. Two clean builds from committed source matched; four exact-export root/nested journeys passed with zero unexpected errors. Only built index.html differs from 0.1.3 (version badge and inline favicon). Earlier failed attempts remain disclosed; human/device evidence remains pending. | [Maintenance record](https://github.com/PaperStrange/IndiaGames/blob/3d64c918f070f65fc7aa0d9d5ca444ca7928bb2c/docs/gamejam/maintenance-2026-11-06/README.md) |
| The Thirteenth Bell | 6 November: 25 Node tests, 21 static checks and four split/bundled browser journeys/20 checks passed, with zero unexpected browser errors. Two clean builds equal frozen 0.1.0 byte-for-byte. Validation preserves absent, valid and stale developer output. These checks are not a rerun of all historical causal scenarios or human observations. | [Maintenance record](https://github.com/PaperStrange/IndiaGames/blob/473ba38333e665b250d459e5d74bb496521c3e19/docs/gamejam/maintenance-2026-11-06/README.md) |

[PR #11](https://github.com/PaperStrange/IndiaGames/pull/11) staged Vivid 0.1.4 on master `ac931cde281e9483f6f693289cad2d99038d5bc0`. Its empty human report fails release readiness as expected. Source branches are pushed and remote-verified; the older study artifacts remain available.

## Next goal: a reproducible technical freeze

The cleanup and Vivid staging are complete. Continue toward the November 11 technical freeze by keeping the exact development sources and candidate packages easy to rebuild, identify and validate. This work proceeds before recruitment:

1. **SH-23 proposed · target Nov 10:** make Small Hours development-export verification repeatable while retaining its separate eight-file study baseline. SH-22 cleanup and verification are complete.
2. **KF-30 proposed · target Nov 10:** run the existing Vivid version/build guards in branch CI without publishing a candidate. KF-29 export/staging is complete; human reports remain blank.
3. **TB-22 proposed · target Nov 10:** run Bell’s Node tests and isolated reproducible build/static checks in branch CI. TB-21 is complete and candidate 0.1.0 remains byte-identical.
4. Publish this completed milestone and verify its deployed revision, links, responsive layout and served bytes; retain the earlier PR #9 publication record separately.

The three new tasks are queued, not implemented; none requires human recruitment. These are engineering exit criteria. Decisions about fun, comprehension, meaningful difference and remembered consequence still require the original human protocols and contradictory observations. Technical success does not answer those questions on behalf of players.

## Dates and independent work

| Cutoff | Engineering work | Human/release work |
|---|---|---|
| Nov 6–10 | Cleanup and Vivid staging complete; next: repeatable Small Hours development export and Vivid/Bell branch CI | Arrange accepted facilitators, devices, participants and reviewer when available; no booking dates invented |
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

[Dashboard verification and visual previews](DASHBOARD-QA.md) bind the final local integration to exact input hashes. Deployment verification is recorded separately on the delivery PR.
