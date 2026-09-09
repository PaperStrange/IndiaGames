# Enchanted Notebook

A private interactive web demo based on the supplied 63-second penombra video. It opens in the notebook itself: freeform ink, app-rendered handwriting, contextual study examples, PDF reading and linked notes.

## What is functional

- Pressure-aware vector ink with mouse, touch and stylus input; pointer capture and cancellation; pen, highlighter, whole-stroke eraser, undo/redo, ink colors and thickness.
- Notebook page creation, renaming, grid/lined/plain paper, fit/zoom, placed handwriting text, and SVG export.
- Sample companion replies rendered on the page, with progressive text and line animation. Cell-division diagrams, coordinate plots, smiling stick figures, a/an tables, contextual follow-ups, and quizzes with corrective feedback.
- PDF upload (15 MB limit), actual PDF.js rendering, page navigation, region selection and ink annotation, passage extraction, and linked explanation notes.
- Durable notebook data in D1; document bytes in R2. Browser storage contains only device preferences (pen, reply flow, lettering, format and lighting). Saving errors preserve the working state and provide retry.

## Demo versus live AI

The deployed default is visibly labeled **Interactive demo / Sample replies**. Sample responses cover cell division, coordinates, English indefinite articles and happy doodles. They are deterministic and do not recognize arbitrary handwritten language. Imported PDFs are truly rendered and annotated; arbitrary-document tutoring requires live AI. The sample reading supplies a fully worked tutoring flow without credentials.

`/api/companion` provides an optional server-side Claude adapter. Configure `ANTHROPIC_API_KEY` and an available `ANTHROPIC_MODEL` through server environment settings, never through a browser or a mobile bundle. It receives changed-ink crops plus limited conversational context, uses a request timeout and per-owner rate limit, and streams text via server-sent events; the older structured response mode remains available. The current live adapter has not been exercised against a paid model: no credential was supplied. General generated diagrams, live quiz schemas and cached model sessions are future extensions; the current renderer supports the demonstrated diagram types.

The screenshot-based numeric grid speculated about in the video is deliberately absent. Pen strokes are vectors, and the application owns rendering and safe reply placement. The creator's exact recognition, placement and rendering algorithms are not disclosed in the video.

## Architecture

- React 19 + TypeScript; Vinext/Vite for the hosted web application.
- `lib/notebook.ts`: portable page, stroke and response-block model; sample companion logic.
- `app/notebook-app.tsx`: shared React writing surface and interactions.
- `app/ink-art.tsx`: consistent handwriting, vector ink, diagrams and quizzes.
- `app/pdf-page.tsx`: PDF.js canvas rendering and text geometry.
- `app/api/*`: private hosted API; D1 and R2 are accessed only on the server.
- `mobile/main.tsx`: separate client-only entry using the same writing surface.

Commands: `npm run build` creates the Worker application. `npm run build:mobile` creates a standalone client bundle in `dist-mobile`, with a root `index.html`. `npx tsc --noEmit` checks both entry points.

## iOS / Android continuation

Capacitor is the recommended low-rewrite path from this demo. `capacitor.config.json` points at `dist-mobile`; no production `server.url` is configured. Native projects, package identifiers, signing and store submissions have not been created. The existing web deployment uses Sites owner-only authentication; a native app needs its own authenticated API session and explicit CORS configuration before `VITE_API_URL` can target a production backend. Do not simply make the current API public.

Before store release:

1. Configure live vision AI and verify handwriting recognition, diagram schemas, quiz behavior and cost controls with real requests.
2. Add app-owned authentication and mobile API access. Use native secure storage for session credentials; keep provider keys on the server.
3. Install and initialize Capacitor iOS/Android projects, build the bundled UI and synchronize it. Add store icons, privacy disclosures, signing and release configurations.
4. Test sustained ink input, palm rejection, pen pressure and scrolling on physical iPad/Apple Pencil and Android stylus devices. WebView ink has not been claimed to match PencilKit.
5. If native writing quality is a launch requirement, replace the input/rendering adapter with PencilKit and Android Ink (via Capacitor plugins or Expo native views), retaining the document model and backend.

## Research and source interpretation

The supplied prompting guide requires matching reference interactions, using the repository's component system, and checking desktop/mobile behavior in a real browser. The complete video was inspected through every second, including Chinese captions and the primary English creator comments.

- 0–7 s: handwritten cell-division question, on-page response and progressive diagrams.
- 19–24 s: PDF marking followed by a separate related note.
- 24–29 s: happy stick figure, then an a/an table.
- 29–35 s: coordinates (3, 2), a guided question and described answer feedback.
- 39–50 s: changed vector ink, app-owned handwriting rendering, no technical numeric grid.
- 50–54 s: follow-up examples use existing note context.
- 55–63 s: Android stylus support; iPad described as a port in progress. The movie footage is an analogy, not the actual interface.

Primary implementation references:

- [Capacitor installation](https://capacitorjs.com/docs/getting-started) and [configuration](https://capacitorjs.com/docs/config): compiled assets and `webDir`; `server.url` is for development live reload.
- [Expo DOM components](https://docs.expo.dev/guides/dom-components/) and [native views](https://docs.expo.dev/modules/native-view-tutorial/): web reuse remains a WebView; native ink requires native integration.
- [W3C Pointer Events](https://www.w3.org/TR/pointerevents3/): pressure, capture and coalesced events.
- [perfect-freehand](https://github.com/steveruizok/perfect-freehand): MIT-licensed stroke geometry.
- [Mozilla PDF.js](https://github.com/mozilla/pdf.js) and [rendering examples](https://mozilla.github.io/pdf.js/examples/): PDF rendering and viewport geometry.
- [Claude vision documentation](https://platform.claude.com/docs/en/build-with-claude/vision): image input format.
- [Android Ink](https://developer.android.com/develop/ui/compose/touch-input/stylus-input/about-ink-api): native low-latency handwriting.

Caveat font is distributed under the SIL Open Font License in `public/fonts/OFL.txt`. The notebook has original branding and sample reading content; film footage and uploaded reference files are not shipped with the application.

## Development milestones

The original demo is **alpha 0.1**, preserved by the immutable `alpha-0.1` tag. The current appearance and interaction study is **alpha 0.3** (package `0.3.0-alpha.0`). Alpha 0.2 is preserved with its own annotated tag. See [CHANGELOG.md](CHANGELOG.md) for the baseline source and milestone history. The notebook's settings also contain a short development journal.

Alpha 0.2 adds local vellum/leather textures, composited candlelight and daylight, layered book edges, and directional 3D leaf transitions. Page turns use an inert DOM copy (including rendered PDF pixels) over the untransformed live editor. Only dedicated page-edge grips interpret drags as navigation; handwriting gestures keep their existing meaning. No new runtime dependency, database migration, or companion-model change is required.

The shared material CSS and components are included in the mobile build. Lighting animates transforms and opacity, pauses in hidden tabs, and respects reduced motion. This is a browser-tested implementation; physical-device performance still needs measurement before mobile release.

## Alpha 0.3 interaction and rendering

The live writing plane now has a small CSS perspective transform. `lib/paper-plane.ts` solves the inverse homography from four measured DOM corners; coalesced pen samples use the same frozen transform during a stroke. Extra page-edge layers and independent light/shadow gradients create a raised-folio illusion. This is a lightweight lighting simulation, not hardware ray tracing. Long pages reduce their tilt.

`lib/reply-presentation.ts` owns per-reply lettering, grapheme-aware wrapping, and local sample-media formats. `lib/companion-stream.ts` consumes incremental UTF-8/SSE, validates completion and propagates errors/cancellation. Typed drafts appear on the page immediately. Replies start after a 950 ms typing pause or 1,300 ms pen pause; IME composition and modal/menu interaction suspend automatic submission. Sample answers begin without the previous 650 ms artificial waiting period. Live latency remains dependent on the selected provider and connection.

Fading is visual: `absorbedBy` links original vectors/text to a reply exchange. These fields are saved in the existing notebook JSON; no schema migration or destructive data conversion is needed. The Original ink dialog restores input and removes that exchange's response. A stopped or failed stream retains available output and input. Drawing, reader annotations, quizzes and existing page-turn controls remain available.

The three lettering choices apply to subsequent replies. Sticker, picture and video output use an explicitly labeled local sample collection; they do not generate arbitrary requested media. SVG exports embed bitmap assets and represent video as a poster. The original generated owl and woodland assets are documented in `public/replies/asset-manifest.json`; the film is an original scientific animation with WebVTT captions. Uploaded film footage is not redistributed.

References used for this pass: [CSS perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/perspective), [HTML inline video](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video), and [Claude streaming event protocol](https://platform.claude.com/docs/en/build-with-claude/streaming).

Sketch-to-image model integration is a future adapter; no unverified image-model name is hard-coded into this release. Physical iOS/Android WebView, keyboard, pressure and palm-rejection QA and a live AI credential remain required before app-store release.
