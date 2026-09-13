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

## Alpha 0.3 — The living folio · 2026-09-09

- Desktop folio visually checked: perspective, curved gutter, raised page edges, cast shadows, and movable lamp illumination render with the existing textures.
- Real mouse stroke on the angled sheet follows its viewport path to within the rendered pen radius (observed first bounds at x 998.29 / y 618.07 for input beginning at x 1000 / y 620). Pen input and the sheet share the measured projective plane.
- Automatic typed reply and pen reply work without pressing Send. During the phone transition, original-ink opacity measured 0.427 while reply characters were progressively developing; completed original opacity was 0. Originals remain stored and can be restored through the dialog.
- Book serif, Typewriter, and Handwritten choices render distinct fonts. Emoji clusters including a variation-selector arrow remain intact.
- Original owl sticker and woodland picture load successfully. The local H264 film reports eight seconds and plays inline after its native play control is clicked; currentTime advances and paused becomes false.
- 390 × 844 and 320 × 844 iframe viewports checked. Drawer-to-New-page dialog closes the drawer, fits within the phone, and creates a new page. Reply controls fit; Original ink uses an accessible icon on narrow screens. Phone page turns finish and restore interaction.
- Saved alpha 0.3 originals and media survive reopening in a fresh browser session. Original ink includes typed text and stored vector strokes.
- SVG export with a media reply completes successfully; images/posters are embedded and faded original groups removed. As with earlier QA, the cloud browser does not expose a reliable blob-download event.
- Six focused automated tests pass: full-sheet inverse projection, scaled/scrolled phone projection, fragmented Unicode/SSE with unknown events, stream errors/partial retention, cancellation, and upstream/empty-response errors.
- No paid provider request was made. SSE transport and cancellation were tested with controlled streams; actual model accuracy and first-token latency remain unverified. Physical iOS/Android stylus, native WebView, keyboard and palm rejection require device QA.
- Temporary phone harness removed before packaging. TypeScript, hosted production build, and independent mobile build are release gates.

## Alpha 0.4 verification — 2026-09-13

Documentation: docs-v4; artifact: v6-alpha04-2026-09-13.

- Hosted Worker build and shared mobile bundle: passed. TypeScript: passed. All 24 automated tests: passed.
- Companion tests cover input-end/fade barriers, regional erasing, model locks and native IDs, provider formats, fragmented Unicode SSE, key encryption/redaction/endpoint binding, concurrent budgets, memory history/tombstones, scoped plugins, reviewed proposal rollback, stale settings races and a complete two-round tool/citation reply with fixture transports.
- Browser: new-page and model settings dialogs remain above the sidebar. A drawn `h` was recognized by the actual bundled TrOCR worker and converted to formatted text. This proves inference executes, not universal accuracy. A typed `brown fox` was fading at opacity 0.95446 before a regional eraser removed the touched `row` glyphs while retaining `b`, `n fox` and the separate handwritten `h`. Missing AI restored the input and showed connection guidance.
- Browser fixes: non-secure preview UUID fallback, conditional Cache API use, correct Transformers `env.fetch` for split model assets, WASM factory preloading. Originals survive recognition failure.
- Legacy starter checks were updated: a Cloudflare Worker cannot be imported by Node's default ESM loader, and unused catalog utilities need not be emitted with explicit Tailwind source scanning. Tests now validate the actual production layout and used notebook styles.
- No paid LLM/vision key or hosted PaperReadingAgent endpoint was available. Transports are fixture-tested, not paid-service verified. Physical iOS/Android, native authentication/signing, OCR accuracy benchmarks and store submission remain unverified.
