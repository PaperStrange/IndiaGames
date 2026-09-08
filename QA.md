# Validation record

Validated in the supervised Chrome browser and the project build environment on 2026-09-08.

## Passed

- Full reference review: all 63 one-second video frames, focused full-resolution frames, Chinese subtitles and English creator notes; supplied PDF guide read in full.
- TypeScript type checking.
- Hosted Vinext production build and independent client-only mobile build.
- New page creation and placed text at a chosen page position.
- Mouse drawing adds vector ink; undo removes it; redo restores it; eraser removes the intersected stroke.
- Contextual a/an summary table; “Show me some examples” retains that topic.
- Quiz creation; incorrect and correct choices return different, appropriate feedback.
- A generated two-page test PDF uploads, renders, exposes the correct page count and navigates in both directions.
- Highlighting a PDF passage creates a related coordinate explanation with a plot and a link back to the source.
- Notes and imported PDF metadata survive browser restart/reload.
- Phone layout inspected in a 390 × 844 iframe viewport; menu opens and switches notebook pages. The production app does not include this temporary test harness.

- Optimistic save version check rejects a stale tab with a clear conflict message and preserves its unsaved local state.

- Export action produces its success confirmation without an application console error; the cloud browser did not expose a download event for its blob URL.

## Scope of confidence

This is a tested interactive prototype, not a guarantee of zero defects on every device. The test browser does not reproduce an Apple Pencil, Android stylus, native WebView, palm contact or a mobile on-screen keyboard. Native-device latency, pressure behavior and palm rejection require physical-device QA. No live AI credential was supplied; the optional paid model integration is implemented but not live-tested. Store signing, mobile authentication and app-store review are outside this web demo's completed scope.

The default site has sample companion replies. It does not pretend to recognize arbitrary handwriting or tutor arbitrary documents without a connected model. Working sample flows are available immediately.

## Alpha 0.2 — Candlelit vellum and page turns

- Original source preserved with annotated `alpha-0.1` tag before edits; first saved Site version retained.
- Desktop and 390 × 844 / 320 × 720 phone layouts visually inspected against warm video frames. Parchment grain, binding, layered leaf edges, and paper lighting render locally without external image dependencies.
- Forward turns retain the outgoing ink; backward turns retain the outgoing page underneath an incoming leaf. The underside is blank textured vellum, with no mirrored front ink.
- Previous/Next navigation, new page creation, direct sidebar jumps, and a phone page-edge drag work. Rapid sidebar navigation lands on the last selected page; turn overlays clear.
- In the phone menu, New page closes the drawer before opening. The modal fits inside the viewport, and focus returns to the menu button after creation.
- Candlelight can be turned off; light warmth changes from 65 to 70 via keyboard. The selected light mode survives a full reload.
- The live SVG has computed transform `none`. A new mouse stroke after turning increments stored paths from 1 to 2; Undo restores 1, Redo restores 2. Placed text appears at the chosen location.
- Imported two-page PDF opens with the existing document; forward and backward controls navigate and retain a canvas copy in the turning leaf. Incoming PDF copies wait for matching rendered page pixels.
- Reduced-motion and hidden-tab behavior are implemented; a 1.1-second cleanup fallback prevents a missing animation event from keeping ink locked. OS motion emulation and physical stylus/native-device checks remain outside this browser session.
- Web and mobile builds and TypeScript checks pass. Temporary responsive QA harnesses are removed before final packaging.
