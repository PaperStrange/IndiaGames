# GitHub Pages publication

**The hub is live at [paperstrange.github.io/IndiaGames](https://paperstrange.github.io/IndiaGames/), served from `main` / root. The repository owner manually made that Pages switch.** A dashboard deployment is separate from an official game release; the release registry remains empty.

## Human-feedback reconciliation delivery

[PR #15](https://github.com/PaperStrange/IndiaGames/pull/15) carries the [human-feedback reconciliation](research-reconciliation-2026-11-06/README.md), including the owner's attribution correction and dashboard wording that separates received feedback from verified release sessions. [Local dashboard checks](research-reconciliation-2026-11-06/DASHBOARD-QA.md) identify the tested bytes; final review, CI and actual post-merge Pages verification are filed in that PR conversation.

The preceding [PR #14 publication](https://github.com/PaperStrange/IndiaGames/pull/14#issuecomment-6679768911) was independently reviewed, merged as `81b951d07bb0263aa6a9e7971d1d42a221674aba`, built by Pages at 07:34:20 UTC and verified live at 07:34:48–07:34:57 UTC. All 11 file/browser-response hashes matched; 84 tasks were reachable and no unexpected errors were recorded. That result verifies the preceding deployment only.

## Previous verified publication · November 6

[PR #13](https://github.com/PaperStrange/IndiaGames/pull/13) published the completed export/CI dashboard at main `345c33970745297103a099ecdf9dc11f134b0038` after independent review and passing CI. Pages built it at **06:49:31 UTC**. Live verification at **06:50:21–06:50:30 UTC** matched all 11 served files and actual browser-response hashes, exercised desktop/narrow navigation and all 75 task IDs, and recorded zero unexpected errors with TLS verification enabled. [Public verification](https://github.com/PaperStrange/IndiaGames/pull/13#issuecomment-6679061493) · [Portable result](release-preparation-2026-11-06/publication-pr13.json). Earlier [PR #12](technical-freeze-2026-11-06/publication-pr12.json) and [PR #9](iteration-2026-11-06/publication-pr9.json) remain historical evidence.

The [multilingual/device planning update](release-preparation-2026-11-06/README.md) is delivered through [PR #14](https://github.com/PaperStrange/IndiaGames/pull/14). [Local dashboard verification](release-preparation-2026-11-06/DASHBOARD-QA.md) identifies its tested bytes; final independent review, CI and post-merge Pages verification are recorded in that PR conversation. The PR #13 result above verifies only the previous deployment. Every November 20 game release must include English, Japanese and Simplified Chinese; incomplete games are deferred. Planning targets do not establish game compatibility, translated-content approval or an official release.

The owner’s publish-first instruction applies to this dashboard delivery. It does not enable branch protection or counted robot approval. [Issue #2](https://github.com/PaperStrange/IndiaGames/issues/2) remains administrator-blocked; the former project playtesting blocker [#5](https://github.com/PaperStrange/IndiaGames/issues/5) is closed for the delivered supported route, while [#10](https://github.com/PaperStrange/IndiaGames/issues/10) separately tracks the original managed Chromium restriction. The legacy candidate URL repair remains paused.

## Historical state · 28 October 2026

| Item | Observed state / next action |
|---|---|
| Pages source | `main` / `(root)`, branch deployment; `.nojekyll` preserves the static site. |
| Previous published hub | Main `710c1adaab349f20bbc460ff80fd83c44a5cea42` was deployed and its six served HTML/CSS/JS/JSON assets matched that revision. A newer hub change needs its own deployment check. |
| Settings permissions | The agent’s source-update request returned HTTP 403. The owner’s subsequent manual switch explains the successful main deployment; the rejected request did not establish write permission. |
| Branch protection | Authorized ruleset-creation requests for both `main` and `master` returned HTTP 403. Follow-up reads still show both unprotected and no rulesets. [Issue #2](https://github.com/PaperStrange/IndiaGames/issues/2) contains the diagnosis and configuration solution; it remains open. |
| Human review | Vivid’s [policy PR #1](https://github.com/PaperStrange/IndiaGames/pull/1), human cohorts, device checks and independent release approval remain pending. Nemo’s invitation is deferred. |
| Legacy candidate URL | Repair of `/IndiaGames/release-candidates/keepers-frame/0.1.2/` is paused by request. No preview, redirect or candidate promotion is added by the hub redesign. |

Robot approvals are intended only for explicitly allowed hub presentation changes. Activation and counted merge approval remain unverified; no bot is claimed as configured. Issue #2 tracks the remaining administrator action and verification. Ownership, workflows, release policy/tooling, registry, candidate packages, official releases and human approval are outside that allowance.

## Verify a publication

1. Confirm Pages settings and the build’s exact source revision.
2. Fetch the actual project URL and compare the deployed HTML, scripts, styles and JSON with that revision. HTTP 200 alone does not establish the right site.
3. Check Overview, Team board, image loading, filters, pagination, details, keyboard navigation, narrow widths and enlarged text at root and `/IndiaGames/` paths.
4. Record the revision, commands, actual results and limitations. A source push or local browser pass alone is not deployment evidence.

Preview locally with `python3 -m http.server 8120 --bind 127.0.0.1`. The site is static HTML/CSS/JavaScript/JSON; no framework build, public credential or game release is needed for the hub.

<details>
<summary>Historical publication evidence and limits</summary>

| Date | Recorded observation |
|---|---|
| Oct 21 | Main/master release CI passed. Pages administration returned 403 and the expected site returned 404. [Dated verification](verification-2026-10-21/README.md). |
| Oct 27 | Pages administration still returned 403; site returned 404. [Milestone](milestones/2026-10-27.md). |
| Oct 28, before the manual switch | Settings were readable as master/root; the site served the staging README. The agent’s attempted source update returned 403. |
| Oct 28, after the owner’s switch | Settings and deployment showed main/root. [Six live asset hashes](verification-launch-2026-10-28/live-assets.json) matched tested main `1dd2330`; the final `710c1ad` deployment was also checked in the local restart manifest. [Publication record](verification-launch-2026-10-28/publication.json). |

The earlier direct remote Chromium attempt failed before rendering because of the managed proxy certificate trust path. That failure is preserved; TLS verification was not disabled. Successful local browser checks and actual HTTPS asset-identity checks are separate evidence.

</details>

The owner’s manual Pages change supersedes earlier “unknown attribution” wording. Historical API failures retain their dates and meaning. Follow the [release policy](RELEASE-POLICY.md) and [November launch calendar](launch/2026-11-20/README.md) for future game promotion; never change visibility or invent participant records to make publication appear complete.

## November 6 multilingual engineering dashboard

The [current iteration](multilingual-engineering-2026-11-06/README.md) records completed three-language engineering on the three game branches, with exact development artifact identities and separate frozen study/candidate packages. The dashboard adds a compact language-progress table and an actionable [weekend handoff](multilingual-engineering-2026-11-06/WEEKEND-HANDOFF.md). It records 53 completed cards out of 84; fluent review, physical devices, original human cohorts and independent approval remain pending.

[Draft policy PR #17](https://github.com/PaperStrange/IndiaGames/pull/17) is a separate governed proposal and remains unmerged. Publishing this engineering dashboard does not adopt that policy or promote a game release. The delivery PR conversation records final-head independent review, required CI and subsequent actual Pages verification against the immutable merged main commit. The source manifest preserves the preceding verified deployment separately to avoid claiming a new deployment before it is observed.
