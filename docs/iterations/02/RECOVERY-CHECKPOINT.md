# Sprint 02 recovery checkpoint

Date: 2026-10-04. Owner: Codex. Product acceptance: SakuraSan.

Authoritative starting source: `309226c61fb491f2a9cfc931ca8c256ec594dbe6`. Published release: Site version 9, package `0.4.0-alpha.0`. The source was restored successfully on this date. The preceding uncommitted checkout was unavailable following workspace cleanup.

## Work being reconstructed

MC-032: deliberate camera/file capture, rotate/crop preview, original and derived image storage, immutable retakes, duplicate retry, source export and restore.

MC-033: explicit Ask starts recognition and five-second fade together; the configured vision provider receives only the prepared image; original sources remain available; stale jobs cannot update current writing; replies use existing fixed-leaf pagination and source links.

The previous build, TypeScript and 15 regression passes belong to the unavailable checkout. They do not validate the reconstructed source. Its upload integration test had not passed. Every new checkpoint must record its own verification.

## Remaining acceptance

- Real compiled-Worker storage/recovery and authorization-boundary tests.
- Bounded browser capture/import, correction, source navigation and restart checks.
- Actual configured-provider image-to-reply traces and usage measurements.
- Physical iOS/Android camera and stylus checks; two actual authenticated identities.
- MC-034 device-measured 3D investigation and MC-035 dimensioned physical design.
- Full customer-baseline review stays open. A source checkpoint is not a completed story or customer release.

## Reconstructed candidate evidence

The reconstructed candidate passed TypeScript and production build checks. The compiled-Worker integration test passed original-byte recovery after restart, idempotent retries, immutable and concurrent retakes, storage-scope rejection for another test owner, cross-notebook rejection, missing-provider reporting, and recovery into a clean D1/R2 environment. Fifteen existing pagination, ink-cycle and device-journal regressions passed.

Desktop preview opened the capture interface. Its automated file-selection call did not respect its requested time limit, so full browser upload/export verification remains open. Photo selection uses the existing notebook `uid()` helper. Browser acceptance, actual authenticated two-user isolation, live-provider runs, disaster recovery and physical-device acceptance remain unverified. No story is marked Done from these checks.

Verified remote checkpoints before the latest candidate: `c76632360fe80c838641ba6883ae4d80ea14fd8a` (recovery record) and `6ee22bdd0701bbbf9924c77dd3e1d7fff2998f35` (capture implementation). Source checkpoints have not changed the published Site version.

## Preservation procedure

Commit and push each coherent source checkpoint before advancing to the next verification phase. Check the remote branch SHA against local HEAD. Keep secrets, uploads and runtime caches out of source commits. Record passing checks and blocked checks separately. Retain the existing published site until the candidate is verified for its declared scope.
