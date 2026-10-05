# Notebook art direction and interaction requirements

Revision: art-design-v1. Consolidated 2026-10-04 America/Los_Angeles. Product reviewer: SakuraSan. Design and rendering implementers remain unassigned in the sprint plan.

## The intended object

A familiar, substantial paper notebook that seems to absorb a thought and quietly write back. The user's reference is Tom Riddle's diary in *Harry Potter and the Chamber of Secrets*. The product uses its own MentalCity identity and original artwork. The reference informs the feeling of material, restraint and responsive ink; visual approval requires a separate review.

The physical notebook and its digital edition should share proportions, binding character, page labels and a red ribbon. A paper page remains ordinary paper. Capture connects it to the digital companion; fading and reply animation appear in the app.

## Visual requirements

| Element | Established direction | Review question |
| --- | --- | --- |
| Paper | Thick, layered parchment/vellum; pale ivory body with visible fibers and restrained variation | Can a reader perceive thickness while reading small text comfortably? |
| Binding | Dark leather cover, visible cover thickness, a curved gutter and stronger contact shadows at the spine | Does the page feel attached to a bound object during rest and turning? |
| Lighting | A localized warm source, cooler unlit regions, quiet irregular flicker and light that responds to surface shape | Does movement describe the surface and page curvature consistently? |
| Shadow | Binding occlusion, page/contact shadows and a subtle pointer-associated writing shadow | Do shadows follow the light and geometry without obscuring writing? |
| Bookmark | Deep red ribbon, with edge highlights and darker folds | Is the ribbon recognizable on desktop, tablet and phone? |
| Input ink | Immediate pressure-aware strokes, stable placement, recoverable originals | Does the mark stay under the pointer and preserve the writer's intent? |
| Reply ink | Progressive charcoal emergence with application-owned lettering | Does the reply feel written on this surface while remaining selectable/readable where supported? |
| Page motion | Weight, curl and changing shadows; an accurate, stable writing surface | Can the user turn, cancel, return and continue writing without moved or repeated ink? |
| Reply composition | Fixed-size leaves, legible lettering, contained illustrations/stickers/video | Can long replies continue without stretching the physical book illusion? |
| Surrounding controls | Readable and reachable, with recovery controls present when action is needed | Can the writer recover and continue without a lingering popup? |

Current material colors and geometry are implemented in the application styles. This document records direction; it does not introduce a new approved color system or claim cinematic fidelity.

## Ink and reply choreography

The same document and input revision must own the visible mark, recognition job, fade and reply. Decorative rendering does not decide which content is current.

| Scenario | Required behavior |
| --- | --- |
| Text composer | Explicit Send/Enter; ordinary typing pauses keep the draft editable |
| Direct writing with automatic reply enabled | Input-end starts recognition and the five-second fade together; IME composition and active input suspend the trigger |
| Provider connection | Use the configured vision route for concise transcription; preserve the original language, names, numbers, negation and uncertainty |
| Non-provider mode | Device OCR may recognize the passage; mode and failures remain truthful |
| Erase during fading | Restore remaining ink to visible, then erase the touched region |
| Rewrite or erase while recognition runs | Let the job finish; only matching input revisions may update the page |
| Reply reveal | Wait for the fade and current recognition result, then progressively render the current reply |
| Navigate away and return | Restore unsent ink without restarting automatic fading merely because the page was opened |
| Overlap or insufficient page space | Offer a visible move action; preserve the draft; move it to a fresh leaf in one action |
| Move completed | Clear recovery and its notice; let writing continue; optional actions remain under Ink options |
| Physical page capture | Capture/review/save, then explicit Ask; camera pauses and page navigation do not submit a turn |
| Long reply | Continue on fixed leaves with stable content placement and complete recoverable originals |

Device/topic-aware timing and harness behavior belong to MC-029/030. These remain proposed work after the selected paper journey. The current client must not be described as already adapting automatically to every device or conversation role.

## Rendering direction

The current implementation combines CSS surfaces, existing page-turn layers and a bounded WebGL paper-light shader. Text, strokes, erasure and stored page identities remain independent of those effects. Reduced-motion and graphics-unavailable paths preserve writing.

MC-034 evaluates a deformable 3D spread with the same document state. It must include binding/cover thickness, the red ribbon, contact shadows, forward/backward turns, corner drag and cancellation. Coordinate mapping must be demonstrated during deformation and after settling. A shader deformation alone does not establish correct input hit-testing.

Source of acceptance: [MC-028](../iterations/01/MC-028-DIARY-ART.md) and [MC-034](../iterations/02/Story-Cards/MC-034.md). Proposed measurement targets and missing physical-device evidence are recorded in those cards.

## Physical edition

MC-035 defines the A5-sized design target, actual millimeter dimensions, paper/cover selection, sewn sections, flexible binding joint, page labels and ribbon. The shared dimension sheet and parameter JSON precede geometry integration. Optional manufactured inserts or tools require their own dimensioned files and fit checks. Writing pages remain paper.

Expected design deliverables are annotated views, cutting/assembly drawings, a bill of materials, assembly steps and a physical evaluation procedure. Printable components, where needed, require STL/3MF, declared units, slicer inspection and geometry checks. A real sample is needed for opening comfort, repeated turning, ribbon placement and binding fit results.

Source: [MC-035](../iterations/02/Story-Cards/MC-035.md). This collection preserves the proposal; it does not supply those future manufacturing deliverables.

## Review conditions

Evaluate a blank page, a populated page, direct writing, correction during fading, a long reply, page turning and post-move continued writing. Review Candlelight, Daylight and reduced motion at desktop, tablet and phone sizes. Attach source revision, renderer path, viewport/device, actual observation and approval decision. Browser screenshots establish appearance at that moment; animation, physical input, frame pacing and comfort need their own evidence.
