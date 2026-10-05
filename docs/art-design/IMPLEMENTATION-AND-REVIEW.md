# Art implementation and review status

Reviewed source: `1ade48864d90afcc23a0b9b8ea1a84b101d0f095`. Review date: 2026-10-04 America/Los_Angeles. This record consolidates existing evidence; no fresh browser/device or manufacturing test was run for the folder organization.

## Source and evidence map

| Area | Current application source | Existing evidence / status |
| --- | --- | --- |
| Material layers and binding | [parchment-material.tsx](../../app/parchment-material.tsx), [parchment.css](../../app/parchment.css), [folio.css](../../app/folio.css), [diary.css](../../app/diary.css) | Existing generated textures, page edges, gutter/contact shadows and red ribbon; [appearance checkpoint](../iterations/01/UX-FIXES-2026-10-04.md) |
| Directional paper lighting | [paper-light.tsx](../../app/paper-light.tsx), [paper-shaders.ts](../../lib/paper-shaders.ts) | Shader/CSS implementation exists. Earlier browser review used CSS because its WebGL context was unavailable; revised GPU/physical-device visual acceptance remains open |
| Page turns | [book-turn.tsx](../../app/book-turn.tsx) | Existing visual turning leaf with shaded reverse; full deformable 3D spread is MC-034 |
| Handwriting and reveal | [ink-art.tsx](../../app/ink-art.tsx), [use-ink-flow.ts](../../app/use-ink-flow.ts), [ink-cycle.ts](../../lib/ink-cycle.ts) | Fade/current-result coordination and progressive lettering; correction/navigation regressions recorded in iteration evidence |
| Fixed leaf layout | [notebook-app.tsx](../../app/notebook-app.tsx) and page layout modules | Existing QA records 760 × 1000 drawing-unit leaves and reply continuation; long content does not require taller leaves |
| Recovery and continuous writing | [ink-recovery.tsx](../../app/ink-recovery.tsx), [ink-draft.ts](../../lib/ink-draft.ts), notebook client | [Recovery/continuation record](../iterations/02/INK-RECOVERY-DISCOVERABILITY.md): nine targeted browser scenarios passed across desktop, phone and tablet layouts; move clears recovery and permits continued writing |
| Paper capture | [paper-capture-dialog.tsx](../../app/paper-capture-dialog.tsx), [use-paper-turn.ts](../../app/use-paper-turn.ts) | MC-032/033 candidate work; [browser milestone](../iterations/02/BROWSER-INK-MILESTONE.md). Live-provider, photo correction and physical-device acceptance remain open |

## Cards and completion boundaries

| Card | Recorded state | Required next artifact or review |
| --- | --- | --- |
| [MC-028 diary art](../iterations/01/MC-028-DIARY-ART.md) | In progress | Visual approval, actual shader/device behavior, reduced-motion/offscreen evidence and preserved input accuracy |
| [MC-034 3D spread](../iterations/02/Story-Cards/MC-034.md) | Proposed | Inspectable spread, geometry/input explanation, actual desktop/iPad/Android measurements and an adoption decision |
| [MC-035 physical edition](../iterations/02/Story-Cards/MC-035.md) | Proposed | Dimension sheet, parameter JSON, annotated views, assembly drawings, bill of materials and evaluation procedure |
| MC-006 interaction | In progress | Full correction/paper/physical-input acceptance beyond the completed recovery fixes |
| MC-021 device gate | Proposed | Physical-device and accessibility evidence under the complete card criteria |

Authoritative planning: [Agile progress](../iterations/02/AGILE-PROGRESS.md), [Sprint 02](../iterations/02/SPRINT-PREPARATION.md) and [behavior audit](../iterations/02/BEHAVIOR-AUDIT.md). Capacity and dependencies stay as recorded there. Creating this collection does not consume or complete MC-034/035 implementation work.

## Review evidence available here

- Earlier appearance: `evidence/alpha-0.3.jpg` and `evidence/NOTEBOOK-QA-2026-10-04.jpg`.
- Placement: `evidence/INPUT-PLACEMENT-QA.jpg`.
- Browser capture and ink journeys: `evidence/browser-ink/`.
- Discoverable recovery controls: `evidence/ink-recovery-discoverability/`.
- Continued writing after moving: `evidence/ink-continuation/`.
- Existing demo recording and poster: `evidence/product-flow-preview.mp4` and `.jpg`.

Use the originating QA record to interpret each screenshot/report. Static images cannot verify animation timing, GPU rendering, battery use or physical stylus behavior. The current Playwright layouts exercise Chromium; they are not physical iPad/iOS/Android certification.

## Review checklist for the next art change

- [ ] Record the exact source, renderer path, device/browser and lighting mode.
- [ ] Compare blank and occupied pages for paper thickness, binding attachment, readable ink, red ribbon and consistent shadows.
- [ ] Record forward/backward/cancelled turns and the settled writing surface.
- [ ] Verify pointer placement, erasure during fading, long reply continuation and stable source ink.
- [ ] Verify accessible controls, reduced motion, enlarged text and uninterrupted post-recovery writing.
- [ ] Measure MC-034 frame/input targets on the required actual devices if evaluating the 3D proposal.
- [ ] Obtain SakuraSan's visual approval with the recording and remaining limitations attached.

Store actual outcomes with the relevant card. A rendered prototype or a passing build alone cannot close visual acceptance.
