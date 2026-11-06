# Vivid maintenance · November 6, 2026

**The source is now 0.1.4, with one package-version authority and verified entry metadata.** `package.json` supplies the visible badge in both Vite development and production HTML. The build rejects a stale badge or mismatched lock version. A small original inline “v.” collection icon also removes the reproduced implicit favicon 404.

The 15-file output differs from frozen 0.1.3 only in `index.html`: the package badge and inline icon. Every JavaScript, stylesheet, art asset, notice and story-catalog hash is unchanged. Story reducers, saves, protagonists, authored narrative choices and accessibility controls were not changed. All older candidates and historical evidence remain intact.

| Milestone | Actual state |
|---|---|
| Single version authority | Implemented; source/lock 0.1.4 and emitted badge verified |
| Canonical browser journeys | Final 8/8 root/nested ×desktop/narrow ×Iona/Mara passed, plus fresh dev badge |
| Regression guard | Deliberately stale 0.1.2 built HTML rejected; final normal build passes |
| Source-bound export / master staging | Prepared for the integrator; a new immutable source commit and the existing version-aware exporter must establish the two clean builds before staging |
| Human study / official release | Unbooked; two distinct six-person cohorts, physical devices and independent human approval still required |

[Verification and retained failures](VERIFICATION.md) · [0.1.4 human handoff](HUMAN-HANDOFF.md) · [Machine-readable evidence](verification.json)

## Current artifact

- Version: **0.1.4**
- Build inventory: `a511fbcf55fc94fe344f1a6d4eb1bebb509291ee5f31fb6f2889fcd85f67dbb1`
- Files/bytes: **15 / 1,401,606**
- Initial source base: `2070902d7b5ea0da59ab07d35d218f9a66f7791f`; the verification JSON binds the changed implementation inputs before the integrator commits them.

The local build comparison and browser run do not invent an immutable implementation SHA. The integrator records that SHA and the exact master staging commit after review/export. Before using any staged 0.1.4 packet, compare its inventory with the value above and follow the handoff.

## Next engineering milestone

Commit the reviewed implementation, export 0.1.4 twice from that immutable SHA with the [existing version-aware exporter](../readiness-2026-11-04/CANDIDATE-EXPORT.md), compare it with the browser-tested inventory, then stage the separate packet through its checked PR. The exporter already runs the package build, so the new badge guard participates automatically. Retain 0.1.3 unchanged and leave human report rows empty. This engineering work can proceed before recruitment.

After staging, use the exact-artifact setup and record future reproduced defects against a version/hash. Select further source/tooling improvements independently of recruiting, while keeping new gameplay/content decisions tied to actual observations. Official promotion still waits for the unchanged human gate; code cleanup does not supply proof of fun or participant comprehension.
