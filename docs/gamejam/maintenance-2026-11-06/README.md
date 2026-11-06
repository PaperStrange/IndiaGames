# Vivid maintenance · November 6, 2026

**The source is now 0.1.4, with one package-version authority and verified entry metadata.** `package.json` supplies the visible badge in both Vite development and production HTML. The build rejects a stale badge or mismatched lock version. A small original inline “v.” collection icon also removes the reproduced implicit favicon 404.

The 15-file output differs from frozen 0.1.3 only in `index.html`: the package badge and inline icon. Every JavaScript, stylesheet, art asset, notice and story-catalog hash is unchanged. Story reducers, saves, protagonists, authored narrative choices and accessibility controls were not changed. All older candidates and historical evidence remain intact.

| Milestone | Actual state |
|---|---|
| Single version authority | Implemented; source/lock 0.1.4 and emitted badge verified |
| Canonical browser journeys | Final 8/8 root/nested ×desktop/narrow ×Iona/Mara passed, plus fresh dev badge |
| Regression guard | Deliberately stale 0.1.2 built HTML rejected; final normal build passes |
| Source-bound export / master staging | Complete: two clean builds from `f4e6034a87944f30a28ac5ede9968fd59d07cc1d`; PR #11 merged the exact packet to master `ac931cde281e9483f6f693289cad2d99038d5bc0` |
| Human study / official release | Unbooked; two distinct six-person cohorts, physical devices and independent human approval still required |

[Verification and retained failures](VERIFICATION.md) · [0.1.4 human handoff](HUMAN-HANDOFF.md) · [Machine-readable evidence](verification.json)

## Current artifact

- Version: **0.1.4**
- Build inventory: `a511fbcf55fc94fe344f1a6d4eb1bebb509291ee5f31fb6f2889fcd85f67dbb1`
- Files/bytes: **15 / 1,401,606**
- Initial source base: `2070902d7b5ea0da59ab07d35d218f9a66f7791f`; the verification JSON binds the changed implementation inputs before the integrator commits them.

The implementation is committed at `f4e6034a87944f30a28ac5ede9968fd59d07cc1d`. [PR #11](https://github.com/PaperStrange/IndiaGames/pull/11) staged the reviewed packet at master `ac931cde281e9483f6f693289cad2d99038d5bc0` after independent code review and passing CI. [Exact-export checks](EXPORT-QA.md) passed four HTTP journeys; [staging record](staging-record.json) retains the identities. All prior candidates remain unchanged.

## Completed staging and next engineering milestone

The reviewed implementation was exported twice with the [existing version-aware exporter](../readiness-2026-11-04/CANDIDATE-EXPORT.md), matched the browser-tested inventory, and was staged through the checked PR. The exporter already runs the package build, so the new badge guard participates automatically. Retain 0.1.3 unchanged and leave human report rows empty. This engineering work can proceed before recruitment.

After staging, use the exact-artifact setup and record future reproduced defects against a version/hash. Select further source/tooling improvements independently of recruiting, while keeping new gameplay/content decisions tied to actual observations. Official promotion still waits for the unchanged human gate; code cleanup does not supply proof of fun or participant comprehension.
