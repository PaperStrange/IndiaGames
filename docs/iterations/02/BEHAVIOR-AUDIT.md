# Component behavior audit and scenario acceptance matrix

Reviewed 2026-10-04 UTC. Starting source: `ae2b90da4393d3d293d8877d26436f6d17214f88`, Site version 8. Scope: input placement repair plus next-sprint scenario preparation. Browser: managed desktop Chromium, 1364 × 936 viewport; real local notebook API/database. Provider: none configured in the QA environment.

## Implemented component behavior

| Component | Current behavior / evidence | Remaining acceptance |
|---|---|---|
| Composer | Explicit Enter/Send; manual Place text uses the same placement function. A long input that cannot fit a leaf stays in the composer with a visible explanation. | Cross-leaf logical input in MC-031; physical IME in MC-021 |
| Type tool | A click supplies a preferred area; rendered blocks, stroke bounds and text ascent determine available space. Crowded pages create a new leaf on submission. | Physical touch/Pencil placement |
| Recognition | Provider mode submits one image to vision; device OCR is used without a provider. Normalization and correction check available page space. A result that cannot fit preserves original ink. | Actual recognition/provider benchmark, multilingual correction and cross-leaf input |
| Freehand input | Current paper projection maps mouse coordinates onto the angled sheet. A real drag from (600,350) to (800,380) produced ink bounds x=598.26…801.70, y=348.27…381.76, including pen thickness. | Pen pressure, palm rejection, orientation and keyboard transitions on real devices |
| Existing content | New text was placed at y=596 beneath a doodle at y=235; observed screen bounds had a 22.19 px vertical gap. Existing text and drawing remained in place. | Broad occupied-page annotation matrix |
| Reply timing | Composer remains explicit; current surface policy remains 380 ms quiet plus five-second fade. Recognition/fade share input-end timestamp; revised input prevents stale reply reveal. | MC-029 profile/input-method policy |
| Reply layout | Fixed 760 × 1000 leaves with continuation text/table/media behavior from version 8. | Complete input turns across leaves in MC-031; wide table cells |
| Model router | Rule-based task classification plus configured capability/lock/price checks. No conversation-profile planner currently exists. | MC-030 and real MC-011/012 evidence |
| Tool execution | Existing bounded remote plugin loop; credential and scope handling present. | Live protocol, injection, egress and privacy conformance under MC-013/017 |
| Appearance | CSS lighting worked in the browser; fixed-page depth and red ribbon retained. Drawing gestures reach the input surface. | MC-028 physical-device/GPU/offscreen and subjective immersion review |
| Settings | Provider/model controls exist; there is no profile selector or per-input timing control yet. | MC-029 visible profile/override controls |

The point and bounds measurements are browser observations from a local QA page; they do not certify every device or every recognition result.

Visual evidence: [existing illustration and new input](./INPUT-PLACEMENT-QA.jpg).

## Scenario coverage

| Scenario | Desktop browser now | iPad/Pencil | Phone keyboard/touch | Next-sprint acceptance owner |
|---|---|---|---|---|
| Existing-page type placement | Measured gap; sample retained | Not run | Not run | MC-006 / MC-021 |
| Freehand placement on scrolled leaf | Measured pointer/ink bounds | Not run | Not run | MC-021 |
| Manual draft and explicit submission | Exercised | Not run | Not run | MC-006 / MC-021 |
| Casual surface conversation | State/layout checks; live reply unverified | Not run | Not run | MC-029 / MC-005 |
| Research with cited progress | Profile not implemented | Not run | Not run | MC-030 / MC-008 / MC-012 |
| Self-talk and reflective pacing | Profile not implemented | Not run | Not run | MC-029 / MC-030 |
| Psychology-related supportive reflection | Profile and reviewed contextual handling pending | Not run | Not run | MC-018 / MC-030 |
| Roleplay continuity and profile changes | Profile not implemented | Not run | Not run | MC-030 / MC-010 |
| Full multi-leaf user passage | Current draft/original retained when too long | Not run | Not run | MC-031 |

## Reproducible regression checks

`node --test --test-concurrency=1 tests/page-layout.test.mjs tests/ink-cycle-behavior.test.mjs tests/notebook-journal.test.mjs tests/rendered-html.test.mjs tests/ui-components.test.mjs`

20 tests passed. New cases cover placement inside existing content with underestimated metadata height, a full leaf, exact placement in available space and recognition excluding its own source strokes while respecting other content. These tests use the actual layout and state functions. No provider response was fabricated.

Before closing MC-029/030/031, run the profile × device/input-method matrix, including interruption during each phase, a changing active leaf, IME, background/resume, reduced motion, screen reader, provider timeout and stale recognition. Link actual logs/recordings to each criterion. Update the progress record only for demonstrated evidence.
