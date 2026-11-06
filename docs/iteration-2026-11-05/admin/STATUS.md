# Repository readiness · 5 November 2026

Read-only inspection completed **2026-11-05 15:58:09 UTC**. [Machine-readable readback](readback.json) contains selected public repository fields only. No settings, issues, comments, reviewer requests or access grants were changed.

| Item | Fresh observed result | Remaining action |
|---|---|---|
| Main protection | `protected: false`; effective branch rules `[]` | Administrator applies and verifies the reviewed main rules |
| Master protection | `protected: false`; effective branch rules `[]` | Administrator applies and verifies the reviewed master rules |
| Repository rulesets | `[]` | No active ruleset is demonstrated by the merged configuration files |
| Pages | Built from `main` at `/`; HTTPS enforced | Reverify the actual deployed revision after any later merge |
| Last Pages build | `f68c755c6b738ff219561faaaf2f78b0ceee3a83`; completed 4 November 17:07:04 UTC, no API error | This readback is not a new browser/asset test |
| PR queue | Zero open PRs at inspection | Future PRs must satisfy their own checks and applicable review policy |
| Issue #2 | Open; five comments; latest update 4 November 17:03:10 UTC | Actual protection and scoped counted-approval evidence remain missing |
| Issue #5 | Open; one comment; latest update 4 November 16:17:12 UTC | Supported HTTP handoff is delivered; original managed-browser restriction remains unresolved |
| Human ownership | Collaborator list contains only `PaperStrange` with admin permission; CODEOWNERS lists only `@PaperStrange` on its governed paths | An owner-authored PR cannot self-approve; no second eligible human is confirmed |

## Administrator checklist

Use the reviewed [administrator runbook](https://github.com/PaperStrange/IndiaGames/blob/f68c755c6b738ff219561faaaf2f78b0ceee3a83/docs/governance/2026-10-28/ADMIN-RUNBOOK.md) and its exact payloads. Prefer completion before **11 November** freeze; actual enforcement is required before **16 November** go/no-go.

- Read the existing settings again before applying anything. Create the exact main and master rulesets only when absent; retain their returned IDs. Keep active enforcement and no bypass actors.
- Main: require a PR, one approval, stale-review dismissal, approval of the latest push, resolved conversations, code-owner review for owned paths, and strict/up-to-date `release-gate` from GitHub Actions integration `15368`. Prevent deletion and non-fast-forward pushes.
- Master: require a PR and the same strict `release-gate`; zero mandatory code approvals in the reviewed payload. Prevent deletion and non-fast-forward pushes. Pending human evidence remains stageable.
- Read back the ruleset definitions, effective branch rules, branch protection flags and current-head checks. Record evidence in [issue #2](https://github.com/PaperStrange/IndiaGames/issues/2). Do not attempt destructive ref operations to prove protection.
- If supported counted Copilot approval is enabled, preserve the exact nine-pattern presentation allowlist; never leave it blank or broaden it for a mixed PR. Demonstrate a real counted approval and failed-check/mixed-scope boundaries. If unavailable, record that limitation and use eligible human review; requesting a robot review is not counted approval.
- Arrange a second eligible human reviewer through the owner's normal access process if needed. Nemo's invitation remains deferred; no username or access grant is inferred. A human who participated in or observed a game study cannot provide that build's independent game approval.

The earlier settings writes failed with HTTP403. No write was retried in this inspection. Account metadata showing `admin` does not establish the integration's effective administration permission.

## Next hub PR and studies

The November 4 agent-code-review exception applied to that completed batch. The new iteration changes source/task metadata and planning documents outside the nine allowed presentation patterns. It therefore requires the standing eligible human review before merge. The only current listed owner is PaperStrange; if PaperStrange authors the PR, a different eligible reviewer is needed. A passing CI result or an independent agent review is useful evidence but is not that human approval.

Human sessions will use facilitator machines, as selected by the owner. The supported same-host HTTP route has already been reported in [issue #5](https://github.com/PaperStrange/IndiaGames/issues/5#issuecomment-6635762133). Use a fresh exact-artifact setup check on the actual facilitator machine and verify a separately reachable physical-phone route. The original managed Chromium 152/Local Network Access problem is a separate tooling investigation, not a requirement to block otherwise verified local human sessions. An agent loopback URL is not a participant-facing network address.

All three study lanes remain unbooked. The administrator cannot substitute for the missing cohorts or independent exact-build release approval. Keep both issues open until their stated acceptance criteria are actually demonstrated.

## Evidence links

- [Latest protection blocker comment](https://github.com/PaperStrange/IndiaGames/issues/2#issuecomment-6636823465)
- [Delivered supported-HTTP comment](https://github.com/PaperStrange/IndiaGames/issues/5#issuecomment-6635762133)
- [Standing release/review policy](https://github.com/PaperStrange/IndiaGames/blob/f68c755c6b738ff219561faaaf2f78b0ceee3a83/docs/RELEASE-POLICY.md)
- [Current CODEOWNERS](https://github.com/PaperStrange/IndiaGames/blob/f68c755c6b738ff219561faaaf2f78b0ceee3a83/.github/CODEOWNERS)

These are repository-state observations. No human gameplay, physical-device result, participant recruitment or release approval is claimed.
