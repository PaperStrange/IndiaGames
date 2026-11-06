# Vivid 0.1.4 · immutable-source export verification

**Four exported-build HTTP journeys passed with zero unexpected browser errors.** This supplements the source-build checks; it does not claim human approval or a completed master merge.

| Identity / check | Actual result |
|---|---|
| Implementation commit | `f4e6034a87944f30a28ac5ede9968fd59d07cc1d` |
| Version | `keepers-frame/0.1.4` |
| Inventory SHA-256 | `a511fbcf55fc94fe344f1a6d4eb1bebb509291ee5f31fb6f2889fcd85f67dbb1` |
| Output | 15 files; 1,401,606 bytes |
| Reproducibility | Existing version-aware exporter built the immutable commit twice; inventories matched the prior browser-tested build |
| Export staging validator | Passed integrity with blank human evidence; readiness is not approval |
| Root mount | Iona private return placement and Mara repair interpretation passed, including reload persistence and 0.1.4 badge |
| Nested mount | Same two canonical journeys passed below `/IndiaGames/release-candidates/keepers-frame/0.1.4/build/` |
| Served entry | Actual response SHA-256 matched the exported index inventory in all four journeys |
| Metadata guard | `check-build-version.mjs` accepted the exact export; committed implementation inputs match previously reviewed source hashes |
| Diagnostics | Zero unexpected page, console, request or HTTP errors; exported build inventory unchanged before/after |

[Portable results](export-qa.json) record the observation time, Chromium version, exact conditions and endpoint summaries. These four desktop conditions deliberately verify the exporter output; the earlier final eight-condition source-build run retains the narrow viewport evidence on identical output bytes. No new physical-device or human result is inferred.

The export used reviewed policy commit `7a26e07a71062766e357b51aece9cce8b00c9b17` and staging-base commit `2be5f3648fed5422eb4459486661385df73c91be`. Source and build inputs were not modified during this check. The candidate's required story cohorts remain empty, critical-bug assessment remains pending, and human approval remains false. The integrator must record the actual master staging PR/merge and bind the human handoff to that immutable commit.
