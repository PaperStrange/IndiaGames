# Borrowed Words — Tom’s Notebook game 0.1.0

One authored psychological chapter: mark a supplied phrase, submit it to the notebook, inspect its answer beside your retained original, and decide which account carries forward. Three exchanges lead to two endings, with eight ending paragraphs reflecting earlier decisions. These are fictional authored replies, not a live AI conversation or handwriting recognition.

This separate static game does not change the Enchanted Notebook product `0.4.0-alpha.0`, its private backend, customer acceptance, stored notebooks or physical-edition roadmap. It uses no account, server API, OCR, provider key or external runtime resource. English, Japanese and Simplified Chinese content is included; translations remain drafts awaiting fluent review. Browser checks do not substitute for human or physical-device qualification.

## Run and verify

Use Node24 or newer (the build and CI runtime):

```sh
cd game
npm ci
npm run test
npm run build
npm run test:export
npm run dev
```

The dedicated package lock is independent of the notebook application's dependencies. `npm run build` checks TypeScript, catalog completeness and message references, then emits `dist/` with relative asset paths. The output includes the common `locale-catalog.json` and a deterministic input fingerprint in `build-info.json`.

```sh
npm run test:browser -- --engine chromium --mount /IndiaGames/development/toms-notebook/0.1.0/ --out /absolute/private/qa-directory
npm run export -- --version 0.1.0 --out /absolute/new/development-export
```

Install supported Playwright browsers or set `NOTEBOOK_PLAYWRIGHT_MODULE` to the matched installed Playwright module. `NOTEBOOK_CHROMIUM_EXECUTABLE` optionally selects a system Chromium. The browser harness starts and stops its own HTTP server; in a container, run both together. It records actual engine/version, locale/viewport/endings, downloads, screenshots and failures. Tests are automated observations, not participant sessions.

Export defaults to requiring committed game sources. `--allow-dirty` explicitly labels a development-only export during iteration. The exporter refuses stale build inputs, wrong versions, existing destinations, symbolic links, unknown files and incomplete locale declarations. It copies only the ten standalone game files. `development-manifest.json` records a canonical sorted filename-to-SHA256 map, its hash, source commit/dirty status and byte counts. It is not a release candidate packet or approval.

## Original words and saves

Circle/strike buttons target authored phrases. Pointer, touch and keyboard activate the same semantic intentions; no shape guessing or OCR occurs. Selecting a phrase does not submit it. Inspecting the retained record does not decide an outcome. Replies have a skip control; reduced motion presents them immediately. Language can change only at safe boundaries. Original entries retain the language and literal text in which they were selected, including after another display language is chosen.

Saving is optional, local to this browser and isolated under `toms-notebook.borrowed-words.save.v1`. Only the locale preference uses `toms-notebook.borrowed-words.preferences.v1`. Existing notebook-product keys are never accessed. A denied/quota-limited store leaves the current game playable in memory. Unknown/future or corrupt game saves stay untouched until explicit deletion. Forgetting clears this game record; it cannot delete a transcript already downloaded elsewhere. Downloaded plain-text chapters preserve the original-language entries and their actual consequences.

## Cooperative structure

- `src/content/`: complete-message catalogs, story/cast definitions and stable action IDs; new stories and cast can replace the default data without importing the private product.
- `src/state.ts`: pure transitions, source snapshots, validation, locale boundaries, isolated persistence and transcript generation.
- `src/main.ts` and `src/style.css`: accessible HTML interface, decorative notebook surface, focus management and responsive presentation.
- `scripts/`: deterministic build identity and bounded standalone development export. `tests/`: behavioral state, export and real-browser checks.

Materials and Caveat lettering are copied from the existing original project assets with provenance in [ASSETS.md](ASSETS.md). The game does not ship supplied film-reference media, companion portraits, OCR models, private app routes or product configuration.
