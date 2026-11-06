# Vivid technical-freeze engineering · November 6, 2026

**KF-30 adds branch CI for the existing story, build and version contracts.** This change adds no gameplay, package-version or candidate changes. Local verification passed; the actual remote workflow is pending integration and will be recorded separately before KF-30 is marked complete.

| Check | Actual result |
|---|---|
| Locked dependency install | Passed with `npm ci`; the first local attempt could not write the default cache, so the retained retry uses an explicit writable cache |
| Existing story/runtime unit suite | 51/51 passed |
| Story validation and build | Two packs, 25 representative views and six local asset references passed; emitted badge is 0.1.4 |
| Version-guard fixtures | 7/7 passed: actual output accepted; stale badge, both lock-version fields, missing/duplicate badge and untransformed placeholder rejected |
| Artifact comparison | All 15 output files equal the staged 0.1.4 hashes; 1,401,606 bytes; inventory `a511fbcf55fc94fe344f1a6d4eb1bebb509291ee5f31fb6f2889fcd85f67dbb1` |
| Remote workflow | Pending actual pushed source and observed GitHub run; no remote success is claimed here |
| Human release evidence | Unchanged: zero sessions, actual-device checks and independent human release approval pending |

[Machine-readable local evidence](verification.json) · [Current staged human packet](../maintenance-2026-11-06/HUMAN-HANDOFF.md) · [Earlier browser/export evidence](../maintenance-2026-11-06/README.md)

## Workflow contract

[`.github/workflows/vivid-engineering.yml`](../../../.github/workflows/vivid-engineering.yml) runs on pushes to `vivid-2.5d-photo-game`, pull requests targeting that branch, and manual dispatch on that branch. A dispatch on another ref skips the job. It does not deploy, publish a release, stage a package or grant approval. The workflow has `contents: read`, disables persisted checkout credentials, pins the checkout/setup-node action commits and sets the runner to `ubuntu-24.04` with Node **24.19.0**. Each run writes its actual checkout, Node and npm versions to the job summary.

The commands, in `vivid-2.5d-photo-game/play`, are:

```sh
npm ci --no-audit --no-fund
npm test
npm run build
node --test scripts/check-build-version.test.mjs
```

The new fixture suite uses the production guard against copies of the actual built HTML and package/lock metadata in temporary directories. Every mutation must occur, each refusal must exit with the expected error, and the real inputs' hashes are checked before/after. The normal development build, package metadata and recorded evidence are not rewritten by fixture tests. No extra browser install is needed for this CI job.

## Evidence limits and retained attempts

Local checks used Node24.19.0/npm11.9.0. The initial `npm ci` attempt failed because the managed machine's default npm cache was unwritable; no tests ran in that attempt. The corrected run used an explicit writable cache and passed the complete sequence. Both raw attempts remain in private task evidence. No dependency integrity check was disabled or package/lock metadata edited.

Runtime and staged bytes are unchanged, so this work does not repeat the earlier game browser journeys or claim new human/device coverage. The [November6 maintenance report](../maintenance-2026-11-06/VERIFICATION.md) and exact-export checks keep their original scope and dates. Actual CI must pass on the reviewed committed source before this engineering card is complete. Physical devices, human studies, critical-defect assessment and independent human release approval remain separate.
