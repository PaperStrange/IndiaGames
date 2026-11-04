# Cleanup and launch-plan verification — 28 October 2026

This is repository, documentation and dashboard verification. No new game playthrough, real-human session, physical-device pass, release approval or official game release was created.

- All three game runtime/test trees compare equal to their October 27 heads. Vivid candidate 0.1.2 and Bell candidate 0.1.0, including their empty human reports, compare equal before/after master's editor cleanup. The legacy battle source is unchanged.
- Master staging validation passed for four preserved packages. Main validation against 20fda57 passed with zero official releases; policy, release scripts, workflow and registry are unchanged.
- Independent packet review checked canonical hashes, sample sizes, joint criteria, Bell's 120-second minimum recall and Vivid's schema-v2 story separation. All 65 relative packet links resolve; six CSV files contain headers only. The Small Hours six-pair wording correction is recorded explicitly in [the review](../maintenance/human-packets-review-2026-10-28.json).
- [New main-document links](documentation-links.json): 30 relative and seven immutable Git targets resolve.
- [Local browser report](local-browser/report.json): four groups passed (root and `/IndiaGames/`, each at 1440px and 390px), with zero JavaScript, HTTP or request failures. It checks 60 tasks, three old pilot links, three new human packet links, target/freeze/decision dates, filters, search, empty recovery, keyboard task details and no horizontal overflow. Four global identity/scope checks passed. Screenshots are in that report directory; the coordinator visually inspected the narrow hero and desktop cards.
- Syntax, task generation/dependency validation and diff whitespace checks passed. Private `playtest-private/`, browser output, dependencies and editor directories are ignored on the maintained branches. The ignore probe initially used a path inside the pre-existing dependency symlink and Git rejected it; the corrected probe checks the symlink itself. No game failure occurred.

The maintained browser checker is `docs/verification-milestone-2026-10-27/browser.mjs`, now extended to check launch metadata when present. Old reports retain their original source hashes and dates. Reproduce the current dashboard check with an installed Playwright module and Chromium:

```sh
PLAYWRIGHT_MODULE=/path/to/playwright DASHBOARD_EVIDENCE_DIR=/tmp/new-dashboard-check node docs/verification-milestone-2026-10-27/browser.mjs
```

The output destination must not already exist. It self-hosts and stops its own server/browser. Publication verification is separate in [PUBLISHING.md](../PUBLISHING.md); local success alone does not prove deployment.

## Actual Pages verification

A later read showed main/root and Pages deployed commit `1dd2330`. [Six HTTPS asset hashes](live-assets.json) match that commit exactly. The local browser tested the same runtime bytes. [The direct live-browser attempt](live-browser/report.json) failed before page rendering with `ERR_CERT_AUTHORITY_INVALID` from the managed proxy trust path; no successful live-browser journey is claimed and TLS verification was not disabled. The earlier settings-write403 and master deployment remain preserved in the publication record. Main dashboard publication is now verified; games remain unapproved.
