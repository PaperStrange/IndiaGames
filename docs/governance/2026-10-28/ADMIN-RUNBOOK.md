# Repository protection and scoped robot approvals

Prepared 28 October 2026 for [issue #2](https://github.com/PaperStrange/IndiaGames/issues/2). These are reviewed settings inputs and verification instructions, not evidence that settings have been applied. The root integrator is the sole remote operator.

## Protection configuration

The JSON create payloads have been checked against GitHub's current public OpenAPI schema. Both target one exact branch, use `active` enforcement, and have an empty bypass list.

| Branch | Pull-request requirements | Required check | Ref protection |
|---|---|---|---|
| main | One approval; dismiss stale reviews; code-owner review for owned files; approve latest push; resolve review conversations | `release-gate`, GitHub Actions integration 15368, strict/up-to-date | Block deletion and non-fast-forward pushes |
| master | PR required, zero mandatory approvals; pending human evidence remains stageable | Same strict `release-gate` | Same ref protections |

Create using `POST /repos/PaperStrange/IndiaGames/rulesets` with `main-ruleset.json` and `master-ruleset.json`. Read existing rulesets first; do not create duplicate active rules or overwrite an existing administrator rule. If one was already created during this task, fetch its ID and compare before any update. Record the exact response and rule ID in issue #2.

If the integration returns HTTP 403, do not try a workflow token, other identity, weakened bypass or repeated alternate endpoint to circumvent it. A repository administrator can create the same two rulesets under Settings → Rules → Rulesets. `admin: true` in account metadata does not establish the integration's effective permission. Keep the issue open until actual settings can be read back.

Do not require `publish-approved-releases`, `build`, `report-build-status` or `deploy` as merge checks. Those publication checks are not the stable pull-request release gate.

## Robot review is separate from counted approval

`copilot-review-request-ruleset.json` optionally creates a third ruleset which requests Copilot review for ready-for-review PRs targeting main and for later pushes. It does **not** enable counted approvals. The OpenAPI description explicitly requires the PR author to have Copilot code-review access and AI credits. No subscription or paid-usage change is authorized by this runbook.

For one existing routine presentation PR, GitHub's supported REST request is:

```json
{"reviewers":["copilot-pull-request-reviewer[bot]"]}
```

Send it to `POST /repos/PaperStrange/IndiaGames/pulls/PR_NUMBER/requested_reviewers` only after the PR exists and the author is eligible. The connector's review-request tool can send that exact identity. Do not confuse it with the similarly named unsuffixed organization. The current CLI may predate the documented `@copilot` alias.

Counted approval is configured separately under **Settings → Copilot → Code review → Auto-approval**:

1. Enable **Allow Copilot to approve pull requests**.
2. Enable **Allow Copilot approvals to count toward merge requirements**.
3. Paste the nine lines in `copilot-counted-approval-paths.txt` into **File paths**. Never leave this field blank: blank allows all files. Every changed file in a PR must match at least one allowed glob.
4. Keep existing billing/entitlement settings. If these controls are absent, disabled or inaccessible, record the actual condition; advisory review is not a counted approval.

The nine exact allowed patterns are:

```text
index.html
app.js
styles.css
assets/hub/**
data/hub-presentation.json
tests/hub/**
docs/hub/**
README.md
docs/PUBLISHING.md
```

Do not expand this list just to make a mixed PR eligible. It intentionally excludes source/evidence manifest changes, generated task data, ownership, workflows, release policy/tooling/tests, registry, candidates and official builds. Put governance payloads/runbooks outside `docs/hub/` if committing them, and use a separate reviewed governance PR. Keep the presentation PR eligible by limiting it to the agreed presentation scope.

## Human ownership and policy boundary

Keep the existing human CODEOWNERS entries. None of the nine presentation patterns matches those entries. Code-owner review therefore remains necessary for governed files without forcing a fictional robot code owner on presentation changes. Do not add `@Copilot`, `@... [bot]`, an unconfirmed Nemo or any account without accepted write access to CODEOWNERS.

Nemo's invitation is deferred. Only PaperStrange is currently an eligible listed human owner; owner-authored governed PRs cannot self-approve. They remain blocked until a different eligible human can review them. Robot review can assist but cannot authenticate participants, perform physical-device playtests, sign independent human release approval, or approve governance changes through the narrow allowance.

The base main policy at preparation time (`710c1adaab349f20bbc460ff80fd83c44a5cea42`) describes human approval for all main changes. The user has authorized a narrow routine-hub exception. Its proposed wording is included with this separate governance change and still requires an eligible human reviewer; do not put policy into the robot allowance. Merging policy text alone does not activate GitHub counted approvals.

## Verification and issue comments

After any successful settings write, use these non-destructive reads:

```sh
gh api repos/PaperStrange/IndiaGames/rulesets
gh api repos/PaperStrange/IndiaGames/rulesets/RULESET_ID
gh api repos/PaperStrange/IndiaGames/rules/branches/main
gh api repos/PaperStrange/IndiaGames/rules/branches/master
gh api repos/PaperStrange/IndiaGames/branches/main
gh api repos/PaperStrange/IndiaGames/branches/master
```

Compare target, `active` enforcement, bypass actors and every parameter to the payload. A readable ruleset definition alone is not the whole merge-path check. Inspect a real PR's review requirement and checks on its current head.

| Scenario | Evidence required |
|---|---|
| Allowed presentation-only PR | Copilot review is actually `APPROVED`; the current head's `release-gate` passes; GitHub's merge requirement recognizes that approval. A green review sidebar alone is insufficient. |
| New commit after approval | Prior approval is dismissed and the latest push requires a new qualifying approval. |
| Failed required check | PR remains blocked even if Copilot approves. Use a harmless test PR/check fixture if available; do not corrupt or merge production code to manufacture a failure. |
| Mixed presentation/governed files | Copilot cannot count through the configured all-files allowlist; governed files still require an eligible human owner. Use the existing governed policy PR's merge requirements as a non-destructive reference; do not request a robot approval for it. |
| Direct/force push or deletion | Effective rules show no bypass and blocked ref operations. Never perform a destructive push to prove the rule. |
| Missing entitlement/controls/API rights | Preserve the response or visible setting limitation, leave issue #2 open and provide the exact remaining administrator step. |

Post a diagnosis comment, an applied-settings or permissions-blocker comment, and a final verification comment with rule IDs and PR/check links. Close only after all required protection and scoped-approval acceptance checks are supported by actual evidence. Partial setup is partial, not solved.

## Official references and limitations

- [Create repository ruleset API](https://docs.github.com/en/rest/repos/rules#create-a-repository-ruleset)
- [Configure Copilot review/approval controls](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review)
- [Copilot code review and approvals](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review)
- [Request a Copilot review, including REST identity](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review)
- [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [Required reviews/self-approval](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews)

Copilot approvals are a documented public-preview feature. General review documentation still contains older non-counting wording; the Copilot-specific pages describe the opt-in feature. Verify actual repository availability and PR merge eligibility instead of inferring support from documentation or a displayed review. No public approval-settings endpoint was found in the current GitHub OpenAPI; automatic review requests and counted approval settings must not be conflated.
