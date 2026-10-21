# Original art and the picture stage

The two scenes share a renderer, but express different activities: the warm walnut frame holds a keeper and a small lamp; the green workbench holds evidence that becomes a workshop plan. The frame's worn notch, loose wedge and return placement are physical props. The workbench's two drawing layers visibly register as the player adjusts them. Those visuals display story state; they never decide whether an action succeeds.

All SVG illustrations, prop geometry and materials in this directory were authored for this iteration. No external model, artist's image, paid generation service or runtime CDN is required. `source/` holds editable SVG originals. `public/art/` holds the SVG copies and GLB exports used by the app. Keep actor identity and story text in the story packs: the renderer addresses roles such as `portrait`, `frame`, `postcard` and `sketch-overlay`, not character names.

## Rebuild and replace

From the play directory:

```sh
blender -b --python art/build_models.py
cp art/source/*.svg public/art/
```

The exporter was run with Blender **4.3.2**, using its standard glTF exporter. It batches static geometry by material and preserves named dynamic props. Compression is deliberately disabled: no Draco decoder or optional Blender compression library is required. Blender may print an unavailable-Draco-library message even though uncompressed export succeeds. `public/art/model-metrics.json` records exported bytes and source geometry counts.

To replace a character, change the pack's cast description and `portrait` path, provide a suitable accessible alternative, and validate the pack. The portrait plane is 720:930. Workbench illustration layers are 800:560. Replacement models use glTF's Y-up convention and the dimensions in `build_models.py`; preserve presentation node names only when a scene uses their affordances. A new presentation kind requires a renderer module, while story rules stay independent.

`createRenderer({container,onUnavailable})` returns a disposable stage. Await its `update(viewModel,manifest)` before hiding the flat illustration. Call `setTilt(-1…1)` only for visual preview. `setReducedMotion(true)` disables easing for app preferences; the operating system's reduced-motion preference always takes priority. `dispose()` cancels pending fetches, rejects late scene attachment, removes listeners/observers, releases geometry/materials/textures, removes the canvas, and loses its private graphics context. Asset or context failures report `onUnavailable` so the same semantic state can continue in the flat UI.

## Verification and limits

Start `npm run dev`, then run:

```sh
node art/verify-renderer.mjs http://127.0.0.1:8112 /tmp/new-vivid-art-proof
```

The runner refuses to overwrite a proof directory. It records exact artwork/source hashes, screenshots, Chromium version, timestamps, triangle counts, motion settings, context loss, missing assets, repeated scene switching and in-flight disposal. The development harness is under `art/`, outside `public/`, and is not an entry in the shipped build or story catalog.

The generated scene budgets are far below 100,000 active triangles. The renderer caps device pixel ratio at **1.5** and stops drawing when a view settles. Neither this count nor a headless software-WebGL run establishes **30 FPS on a physical phone**. Physical-device performance, motion comfort, readability and appeal still require real human playtests. The committed art proof is a technical observation, not a participant record or an art-quality survey.
