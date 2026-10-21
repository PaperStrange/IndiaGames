# Vivid — small worlds, lasting traces

A browser anthology with two playable stories:

- **A Place for the Promise:** help Iona bring a ferry home, repair a lamp in an earlier memory, then choose where a private letter or approved public dedication belongs on a later visit.
- **The Unfinished Postcard:** examine Mara's workbench in any order and align the drawings to discover a community workshop inside a closed station.

The technical package/release ID is `keepers-frame`. Version `0.1.0` is a candidate, not an approved official release. Human playtests are pending. Approximate story durations in the collection are content estimates.

## Run and verify

Node ≥22.12, Chromium for browser checks, and npm are required. Runtime assets are local; install dependencies once, then serve the build from any ordinary static host.

```sh
npm ci
npm test
npm run build
npm run preview
npm run test:browser
```

The server uses `http://127.0.0.1:8112/`. `GAME_URL` can point browser checks at a separately served **built** candidate, including a nested path. `CHROMIUM_PATH` defaults to `/usr/bin/chromium`. Every browser run writes a new timestamped evidence folder; historical October 5 captures are preserved. Do not open index.html directly with file://.

```sh
# Optional URL controls for facilitators / reproducible diagnostics
# ?flat=1#iona              force complete flat illustration mode
# ?profile=neutral#iona     separate neutral-return study profile
# #mara                     open the second story
```

The neutral profile is a study tool, not an invisible random assignment. Use only the assigned URL and a fresh profile during preregistered studies. Do not use developer save fixtures as participant evidence.

## Interaction and privacy

Mouse, pen, touch and keyboard share the same state rules. Dragging the scene is only a view preview; visible lean controls choose a viewpoint. Every placement also works by selecting the object, then its destination. Sketch alignment has a slider and step buttons. No action requires sound, sustained holding, simultaneous inputs or rapid timing. Reading & motion settings include reduced movement and flat illustration mode; OS reduced motion is respected.

Visits stay in this browser, separately for each story and study profile. No account, analytics or external dialogue service is used. Forgetting a story requires two deliberate clicks and affects only that story/profile. Iona's old `keepers-frame:v1` memory migrates without hiding what the old archive ending published. Unknown future and damaged records are preserved until explicit recovery or reset. If browser storage is unavailable, the current visit remains playable but cannot survive a reload.

## Project structure

`src/stories/` contains lazy story packs, writer-editable content and the unshipped recast fixture. `src/runtime/` handles pack validation, safe saves and session lifecycle. `src/renderers/` consumes presentation state; it never changes game rules. `src/app.js` implements shared HTML input and reading UI. `art/` contains source artwork and the Blender exporter; `public/art/` contains distributable assets. See [the story-authoring contract](src/stories/README.md) and [art provenance](art/README.md).

The small legacy `src/rules.js` / `src/content.js` and their eight tests remain as an isolated historical baseline. The shipped app imports story packs instead. They are not the new engine and should not receive new story features.

A new pack provides `createState`, `reduce`, `getViewModel`, `serialize`, `migrate`, manifest, validation states and scenario tests; register it in the catalog. Cast names and story IDs do not belong in shared input/rendering code. New mechanics must provide accessible controls and maintain renderer-independent truth. The build validates assets and writes `story-catalog.json` from the actual shipped manifests.

## Delivery boundary

Builds use relative URLs and bundle all required runtime dependencies. Serve the **exact** master candidate locally or on an agreed trusted LAN for manual review. The main dashboard and release policy explain promotion; master is not assumed to have a public Pages deployment. Both shipped stories require separate human evidence for the same build hash. Automated QA, screenshots, source analysis and agent competitor play do not satisfy that gate.

[Iteration decision and research](../../docs/gamejam/vivid-iteration-2026-10-21/DECISION.md) · [human-study preparation](../../docs/gamejam/vivid-iteration-2026-10-21/human-study/README.md)
