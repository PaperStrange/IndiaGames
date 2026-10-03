# Iteration 01 execution checkpoint

Date: 2026-10-03. Baseline: source `2cadd253452e6f9d806255fa532ca581816b71b2`, saved Site version 6, alpha 0.4. This checkpoint advances the existing private preview; it does not certify M0 or an app-store release.

## Implemented in this checkpoint

- Device pending journal with owner/backend scoping, immediate writes for completed notebook edits, retained pending work after failed sync, exact-entry acknowledgments and explicit conflict/export states.
- Distinct on-device and server-synced status. A storage-quota failure keeps the current in-memory page visible and reports the failure.
- Diary materials: subdued parchment and surrounding colors, binding/contact shadows, texture-derived lighting normals, local warm light and cool shadows, quiet flicker and ink emergence.
- Lighting pauses offscreen and in hidden tabs; reduced motion uses static lighting. Rendering is capped around 15 fps on coarse pointers and 24 fps otherwise, with bounded pixel dimensions.
- Backward PDF page turns select the rendered PDF canvas separately from the lighting canvas.
- Audit, state design and MC-028 art acceptance card added alongside this status record.

## Verification evidence

| Check | Result | Boundary |
|---|---|---|
| Journal and ink behavior tests | 7 passed | Real Node file-backed Web Storage, subprocess reopening, quota rejection; real pure ink state logic |
| Existing layout/UI checks | 5 passed | React server rendering and production CSS; no pointer/browser behavior claim |
| Hosted production build | Passed | Worker/client bundling |
| Mobile web bundle | Passed | Includes chunk-size warning; no installed iOS/Android verification |
| Shader compile/link | Passed with Mesa llvmpipe, GLSL ES 1.00 | Native offscreen compiler; not browser WebGL or device visual validation |

Selected test command: `node --test tests/ink-cycle-behavior.test.mjs tests/notebook-journal.test.mjs tests/rendered-html.test.mjs tests/ui-components.test.mjs`. Vite reported a test-server WebSocket port warning; all 12 assertions completed successfully. Legacy tests substituting provider/network responses were not used as evidence.

## Story status and next evidence

| Card | State | Next requirement |
|---|---|---|
| MC-001 | In progress | Review baseline audit and ownership; approve unresolved interface decisions |
| MC-003 | In progress | Actual browser restart/quota cases, multi-tab races and fully offline reopening |
| MC-006 | In progress | Physical-device correction, IME, handwriting and accessibility journeys |
| MC-028 | In progress | Visual review against diary direction on desktop, iOS and Android; measured frame/battery behavior |
| MC-002 / 004 / 005 | Open | Public/native identity, idempotent sync/conflict handling, first real provider smoke |

The required managed preview browser skill is unavailable in this session. No browser-control substitute was used. Interaction, physical-device and visual acceptance remain open. Provider accuracy, source-linked recall, recovery drills, measured live latency/cost, market privacy/content review and the remaining baseline gates are still required before M0.

Publication identifiers are recorded by the Site version/deployment service after the source commit; this document intentionally does not predict a deployment ID or claim a future deployment succeeded.
