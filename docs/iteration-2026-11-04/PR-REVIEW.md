# Independent PR review — 4 November 2026

Reviewed by the delegated Codex reviewer. Remote mutations, GitHub review submission, merge and closure are left to the root integrator. No GitHub APPROVED review, human playtest or release approval is claimed.

## Disposition

| PR | Immutable reviewed head | Recommendation | Blocking findings |
|---|---|---|---|
| [#1](https://github.com/PaperStrange/IndiaGames/pull/1), Vivid multi-story release policy | `4a4f3996fefc198370814c71acb45af3470bd47f` | Merge once current integration checks pass | None found |
| [#4](https://github.com/PaperStrange/IndiaGames/pull/4), protection settings and history | `0fd286bdff621445d1478275b2b7c01db84b57dc` | Mark ready, then merge the documented inputs; keep issue #2 open | None found in the proposed files |
| [#3](https://github.com/PaperStrange/IndiaGames/pull/3), visual dashboard | `a0d5a14363a6c13f28cb7de56ba813b7b2c8bdc2` | Merge, then publish the separately planned November readiness update | None found |

None of these PRs is obsolete. Merge order #1 → #4 → #3 applies without conflict to main `710c1adaab349f20bbc460ff80fd83c44a5cea42` in an external source snapshot. The combined result passes all 35 release-gate tests. Do not close useful work without merging just to reduce the open count.

The root reports the owner explicitly authorized independent agent code review to replace the additional human code review for this batch only. Record that bounded exception in merge comments. It does not authorize invented GitHub approvals, relaxed game criteria, substituted participants, or agent release approval. The ongoing policy still requires genuine human evidence and independent human game release approval.

## PR #1: policy and validator

Read all seven changed files and surrounding validation/workflow paths. The [catalog validator](https://github.com/PaperStrange/IndiaGames/blob/4a4f3996fefc198370814c71acb45af3470bd47f/scripts/validate-release.py#L154), [story report validation](https://github.com/PaperStrange/IndiaGames/blob/4a4f3996fefc198370814c71acb45af3470bd47f/scripts/validate-release.py#L178), [package schema selection](https://github.com/PaperStrange/IndiaGames/blob/4a4f3996fefc198370814c71acb45af3470bd47f/scripts/validate-release.py#L226) and [trusted-base compatibility path](https://github.com/PaperStrange/IndiaGames/blob/4a4f3996fefc198370814c71acb45af3470bd47f/scripts/validate-release.py#L308) preserve the intended boundaries:

- Both shipping stories have fixed trusted profiles and six sessions each on the same build. Catalog edits cannot lower thresholds. Metrics are real booleans and joint completion/explanation counts must belong to the same participant.
- Every included cohort uses distinct participant/session IDs; the single human reviewer is independent of every cohort's participants and observers and approves after all sessions.
- Optional neutral observations cannot replace either required shipping cohort or claim efficacy through a threshold.
- Draft evidence passes only staging identity checks; missing humans cannot pass readiness. Zero critical bugs is required globally and per included cohort.
- New candidates cannot choose an older version to obtain schema-1 compatibility. Only unchanged trusted-base archives qualify; current candidate bytes must still match the immutable master source packet.
- Hashing and boolean fields do not establish actual human authenticity or that the catalog describes playable content. The policy explicitly keeps those duties with the independent human reviewer.

Actual tests: `python3 -m unittest discover -s tests -p test_release_gate.py -v` passed 35/35 on the pinned PR snapshot and 35/35 after applying #1 to current-main snapshot. The combined #1/#4/#3 snapshot passed 35/35 once integration was complete. Fixtures are synthetic and are not release evidence.

Existing [release-gate CI](https://github.com/PaperStrange/IndiaGames/actions/runs/39565333010/job/119106124113) succeeded on the pinned head, but its PR integration was originally based on older main `ba756cb2876834d4ecbf3cb055381db5ca6660ec`. Refresh current integration checks before merge. The PR changes no candidate, official registry, tag or game release.

## PR #4: documented protection versus actual enforcement

Read all 14 changed files. Main/master payloads each target their exact branch, use active enforcement, contain no bypass actors, forbid deletion/non-fast-forward changes, and require the strict GitHub Actions `release-gate` check (integration 15368). Main requires one approval, code owners, latest-push approval, dismissed stale approvals and resolved threads. Master deliberately permits staged incomplete evidence with zero required reviews. Nine presentation globs remain separate from governed content. No workflow credentials, bot CODEOWNERS identity or entitlement change is introduced.

Fresh GitHub reads during this review still returned `rulesets: []`, `main.protected: false`, and `master.protected: false`. This agrees with the archived HTTP 403 administration limitation. [The runbook](https://github.com/PaperStrange/IndiaGames/blob/0fd286bdff621445d1478275b2b7c01db84b57dc/docs/governance/2026-10-28/ADMIN-RUNBOOK.md#L16) explicitly preserves this distinction and leaves the issue open. Merging documentation does not enable branch protection or counted robot approvals. Do not close issue #2 or describe it as solved.

Existing [release-gate CI](https://github.com/PaperStrange/IndiaGames/actions/runs/40672177345/job/122761439425) succeeds. The patch applies cleanly after #1. PR was draft when read. Add the dated one-batch owner exception to merge commentary (or an explicit addendum) so the October statement about blocked owner-authored governed changes is not mistaken for a permanent robot-review expansion.

## PR #3: dashboard interface

Read the UI/rendering/validation paths, metadata, image provenance and browser runner. All 27 changed files match exactly the approved nine presentation patterns. No task source data, source/evidence manifest, governed validator, release packet or registry change is hidden in this PR. Text is placed with DOM text content; release links and local visual paths are constrained by data validation. Pending human/device states remain explicit. Legacy and late-task links reveal the correct view.

Fresh browser execution on an exported immutable PR head passed:

- Four journeys: root and `/IndiaGames/`, each at 1440 px and 390 px.
- All 60 unique tasks across five pages; lane/status/perspective filtering; ID/dependency search; empty-state recovery; keyboard detail controls.
- Browser back/forward; historical section anchors; late-task detail deep link; malformed hash handling.
- Intentional HTTP 503 followed by keyboard retry; no unanticipated page, network or HTTP errors.
- 768 px tablet reflow and 200% computed font size at 390 px, without horizontal overflow.
- 105 rendered destinations resolve as local anchors/files or existing Git objects; three displayed original assets match their pinned source bytes (2,041,402 bytes total).

Chromium `151.0.7922.173`; observed at `2026-11-04T15:47:45.421Z`. Report: `pr3-browser-evidence/report.json`; screenshot images are in that directory. The narrow overview screenshot was also inspected visually. Existing [release-gate CI](https://github.com/PaperStrange/IndiaGames/actions/runs/40671731900/job/122759923075) succeeds.

Test isolation: browser application files and assertions are unmodified. The external `pr3-browser-review.mjs` adapter reads Git objects from the shared repository and resolves historical branch arguments to the PR manifest's pinned reviewed SHAs, because current local game refs have advanced. It does not alter shared refs or claim the October manifest already reflects November uploads. This is a review of the immutable PR, with historical source identity validation. The root's separately planned readiness update must refresh current evidence/links and rerun its final UI checks.

Limits: this review is not a physical-device session, human gameplay study, exhaustive accessibility audit or live Pages deployment verification. The paused candidate URL is not repaired by this PR. Remote HTTP destinations were not refetched by this fresh browser suite; local Git-object resolution and the PR's dated HTTP record remain separately identified.

## Handoff

Root integrator: refresh each current integration check before merge, record the one-batch review exception, mark #4 ready, merge the three passing PRs, verify main CI/Pages, then complete the current readiness/dashboard changes on their own reviewed scope. Keep protection issue #2 open and keep every official game release pending real-human evidence. Reassess any later commit beyond the immutable heads listed above.

## Exact refreshed head confirmation: PR #1

Root used GitHub's normal update-branch operation. Refreshed head `b4db2800c385ad6c03d53e7e3dbce5518ba27b12` has parents exactly original reviewed head `4a4f3996fefc198370814c71acb45af3470bd47f` and current main `710c1adaab349f20bbc460ff80fd83c44a5cea42`. Compared the full non-truncated remote Git tree `6c3fe10385c214fcbc8068c740b8a4506b896849` against current-main's file map with the seven reviewed PR file versions applied: all 101 files match in path, blob SHA, type and mode; zero unexpected differences. Thus the refreshed head is byte-identical to the already-tested main + #1 integration. Current-head [release-gate CI succeeded](https://github.com/PaperStrange/IndiaGames/actions/runs/41861199349/job/126683129288). PR #1 is eligible for normal merge under the one-batch code-review exception; no further code change found.

## Exact refreshed head confirmation: PR #4

After normal merge of #1 to main `7a26e07a71062766e357b51aece9cce8b00c9b17`, PR #4 was marked ready and updated normally. Refreshed head `16ac76f3cdb3fc9efb69daad31f8d04166838e30` has parents exactly the originally reviewed `0fd286bdff621445d1478275b2b7c01db84b57dc` and that main commit. Full non-truncated remote tree `95fd2b098c7828d50b05a823a2c1fa34374ebafb` matches all 111 expected files (path, blob SHA, mode and type) in the independently tested main + #1 + #4 integration, including the combined release-policy edits. Zero unexpected differences; no new code finding. GitHub reports non-draft and mergeable. Current release-gate run `41862070749` was queued at this check; merge only after its passing result is recorded. Branch-protection issue #2 remains separate and unresolved.

## Bounded Vivid patch review before source commit

Reviewed the working diff while root owns the Vivid branch: the three-line `.adjust-control > .action-group-label { grid-column: 1 / -1; }` rule, package and lock root version 0.1.2 → 0.1.3, and the new `test/mara-layout-browser.mjs`. No blocking findings. The selector matches the shared control's direct helper paragraph and does not change native range input, label/description association, step buttons, preview, committed state, focus restoration, story logic or save schema. Dependency versions are unchanged.

The regression runner checks actual served artifact geometry at root/nested mounts, 1280/390 px and normal/doubled computed text; keyboard reachability and focus through step changes; interpretation completion; browser/request errors; and before/after build inventories. Read the separate QA reports and logs: before-fix helper width 44 px with 77 px internal scroll width; after-fix width 437.765625/351 px matching its parent, all eight cases PASS, no errors, build unchanged. Independently inspected `qa/mara-after-01/root-390-text-2.png`. Read unit log (51/51 pass) and production build/story validation log (two packs, 25 representative views, six references). Those runs were executed by the designated QA/root workflow; this reviewer inspected their evidence rather than claiming another run.

Read current research/handoff documentation and changed path scope. Historical five records, raw captures and HTML remain untouched; the critique retains dated original conclusions behind a current notice and pinned image links. Current handoff fields remain explicitly pending until final semantic QA, source commit and candidate inventory are known. This patch is eligible to commit after the independent full-story QA finishes; do not turn pending human fields into approvals. A later pinned source/candidate review must bind these observations to exact shipped bytes.

## New immutable-source candidate exporter

Reviewed `candidate-tooling/docs/gamejam/readiness-2026-11-04/prepare-vivid-candidate.py`, its `CANDIDATE-EXPORT.md` instructions and the external eight-case synthetic harness. No blocking findings. This tool does not weaken or edit release policy or runtime. It archives a full committed source SHA into two separate temporary directories; requires package/lock versions to agree with the requested unused version; installs locked dependencies with install hooks disabled; builds twice; and requires matching complete inventories using the reviewed validator. It constructs an explicitly blank schema-v2 human report, validates real staging policy, and only then renames the fresh packet to a new directory outside the shared checkout. It checks candidate/release paths in both policy and separately supplied staging commits. Existing outputs, tracked prebuilt dist/node_modules, archive links/special files and nonreproducible builds are rejected.

The helper intentionally does not fetch, stage, merge or publish. Remote freshness and whether an overridden full `--policy-ref` was explicitly reviewed remain operator responsibilities, clearly stated in its documentation. No human-session or release approval is manufactured. Root must still run this on the actual committed source, verify the exported route and attach exact build/staging identity.

The supplied synthetic harness tests two-build success, empty-human readiness rejection, existing-output refusal, source/version mismatch, nondeterminism, archive symlink rejection, unchanged fixture refs/index/checkout, and a version existing only at the staging commit. Its author reports eight passes; this reviewer read those checks, without claiming a duplicate execution. Fixture validator/template differ from the reviewed originals only by one extra trailing blank line (semantically identical). Actual exporter `git show` reads use the exact committed policy/template bytes. Notified author about this provenance wording detail.

| File | SHA-256 reviewed |
|---|---|
| `docs/gamejam/readiness-2026-11-04/prepare-vivid-candidate.py` | `fa0754a405692bc4e8d1da5beae64a603dd664a9d6f1695d283d942d8bf40c3c` |
| `docs/gamejam/readiness-2026-11-04/CANDIDATE-EXPORT.md` | `ea2002f9dbac7df423030893441064f790f71fc3c0b50c5f0c3ddaaaf6c3d1ef` |

## Immutable Vivid 0.1.3 candidate review

Independently inspected the exported packet at `exports/keepers-frame-0.1.3-candidate`, source commit `813f264400bfc01d7e3e5f668de29bb835f5a70d`, policy commit `7a26e07a71062766e357b51aece9cce8b00c9b17`, and staging base `2c4d230e40e64b2789b6814393d92cbb6f7f0cf3`. The source commit contains only the four previously reviewed runtime/version/test files. Recomputed all 15 file hashes and aggregate inventory `7498c636fee9b42298e4c9cde5ada0c8f688ef7835237e1e4761e269b68d3e00` (1,401,316 bytes): exact match with candidate.json, the browser-tested export, and QA inventory. Verified source lockfile SHA-256 recorded in notes.

Ran the independently reviewed validator against this exact packet: staging/package integrity passes; readiness correctly rejects the pending human critical-bug assessment. Inspected the whole schema-v2 report: Iona and Mara first-six cohorts, registered timestamps/IDs, sessions, optional study reports and independent approval are blank/false; all envelope/cohort identities match the build. This is eligible for a reviewed staging PR, not official publication. Generated notes must be completed with the actual CSS change and QA/handoff links before staging; no human result should be inserted.

Read the full semantic driver and all four retained reports. Their inventories equal the candidate. Latest attempts cover 20 distinct scenarios: Iona privacy/dedication paths and all three Mara interpretations, on root/nested HTTP routes and desktop/narrow viewports, through canonical endpoints and reload persistence. Every latest scenario passes with no case error. This coverage is assembled across four retained runs, not a single clean 20-case suite: initial Iona harness/oracle failures and one aborted portrait request remain in their original reports; the affected private case was retried successfully. `review/vivid-candidate-review.json` records the case-to-report mapping and failed-run history. Separate eight-case helper layout regression also matches this exact inventory. Human playtesting, physical-device behavior, screen-reader behavior and enjoyment remain untested.

PR #4 CI corroboration: a direct authenticated `gh api` read of job `126686282317` still reports `queued` with no conclusion; this is not merely a connector display issue. Reviewed code remains eligible when CI completes successfully.

## Exact refreshed head confirmation: PR #3

To avoid serial CI queue delay, root updated #3 onto main after #1 while #4 remained queued. New head `39a8ebf51e65f82865dafeffaad872b8d52b9ab6` has exactly reviewed head `a0d5a14363a6c13f28cb7de56ba813b7b2c8bdc2` and main `7a26e07a71062766e357b51aece9cce8b00c9b17` as parents. Full non-truncated remote tree `e1c32ed4fd51157429be7d2c26e730e64bcf4d9b` matches all 123 expected blob paths, hashes, modes and types for main + #1 + #3. No new implementation change; browser-tested application assets remain identical. Current release-gate run `41863641743`, job `126692021600`, is queued. Code review eligibility is confirmed subject to successful CI. If #4 merges first and #3 is refreshed again, verify the new integration before merging.

## PR #6: final staging packet

Reviewed exact PR head `6ac31873f21159943801d5646c3ac37c0eba3e5a` against master `2c4d230e40e64b2789b6814393d92cbb6f7f0cf3`. GitHub and local object identities agree. Exactly 18 added files lie under `release-candidates/keepers-frame/0.1.3/`; no other changed paths and no old candidate byte changes. All 15 build files, candidate.json and blank human report equal the already verified exporter packet. The only intentional difference from the generic export is notes.md, which now describes the helper layout fix and links immutable `23d19663c78935e70307dca33acc8f1ce07bcf48` technical evidence/human handoff; both links resolve to committed blobs.

Executed the reviewed validator against the exported whole PR snapshot: all five staged packages pass; new 0.1.3 human readiness correctly fails. Read root's `qa/staging-unit.log`: 35 tests pass. Current-head release-gate run `41864019588`, job `126693370394`, is queued at review. No blocking code/content findings; eligible for staging merge after successful current-head CI. Suggested remote comment saved as `review/pr6-review-comment.md`; parent alone posts it or merges.

## Correction: cached CI readback and PR #4 merge

A later cache-bypassing read (`Cache-Control: no-cache` plus unique query) of the exact job endpoint establishes that PR #4 `release-gate` job `126686282317` **completed successfully at 2026-11-04T15:51:58Z**. Earlier normal connector and gh responses continued to return queued; the prior notes record those observed responses, not the corrected actual job state. They must not be used to claim a continuing #4 runner blockage. Root normally merged #4 at `e27a774b6bef95b7a48e4eeb910dce819e3082c9`. This merge still does not activate branch protection or resolve issue #2.

## PR #3 refreshed after #4 merge

New #3 head `aa513ec621d5a47ecfc15330674a14aff146cc71` has parents exactly the previously reviewed `39a8ebf51e65f82865dafeffaad872b8d52b9ab6` and merged main `e27a774b6bef95b7a48e4eeb910dce819e3082c9`. Its complete remote tree `f62357c104b47907a7c858a9f108223040da2fa4` equals local independently reviewed #1 + #4 + #3 integration `9bc2934c2550a4bd0699e5ee690c19e3bac438e9` exactly. No content change, no new finding. The cache-bypassing current-head read reports release-gate queued at run `41866071797`, job `126700484966`. Code review remains satisfied; normal merge awaits actual successful current-head CI. Preserve future observations with explicit freshness and exact job identity.
