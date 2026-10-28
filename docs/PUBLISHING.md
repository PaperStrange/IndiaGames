# GitHub Pages publication

**The hub is live at [paperstrange.github.io/IndiaGames](https://paperstrange.github.io/IndiaGames/), served from `main` / root. The repository owner manually made that Pages switch.** A dashboard deployment is separate from an official game release; the release registry remains empty.

## Current state · 28 October 2026

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
