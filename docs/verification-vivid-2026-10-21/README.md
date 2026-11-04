# Main dashboard integration · 21 October 2026

The `run-2026-10-21T08-05-26.166Z` record checks the local main dashboard while it presents **candidate 0.1.1** at master `f0ef54626eaadb32892b0f748ff245515fa54128`. Seven grouped browser checks passed. The report preserves exact app/data file hashes, actual observation time, Chromium version and the pre-commit checkout identity; it does not claim that uncommitted dashboard files already belonged to that Git commit.

The checks cover three project cards, both Vivid stories, exact candidate and policy PR links, an empty official registry, zero human rows, per-lane implementation/QA dates, historical competitor-count labeling, task/status/search filters, keyboard-expanded evidence, human blockers, empty-result recovery and narrow-screen layout. No uncaught page errors or failed required resources were observed. The browser's unused favicon request is excluded.

All four compact JPEGs were visually inspected by the agent: the desktop projects, mobile Vivid card and desktop/mobile human blockers remain readable without horizontal overflow. That first run recorded a cosmetic font issue in this Linux Chromium setup: the new Vivid links' inline external-link arrows appear as small missing-glyph boxes. Their descriptive text and exact destinations worked. The later dashboard revision removed those decorative glyphs.

This is automated **dashboard** QA. It is not a new game playthrough, human participant session, physical-device test or proof of a live GitHub Pages deployment. Candidate 0.1.2 and policy PR #1 remain pending human approval/review.

## Reproduce without overwriting history

Serve the current main checkout, then run:

```sh
DASHBOARD_URL=http://127.0.0.1:8115/ \
node docs/verification-vivid-2026-10-21/dashboard-browser.mjs
```

Playwright must be available as an installed module, via `PLAYWRIGHT_MODULE`, or in the prepared shared environment. `CHROMIUM_PATH` can select the browser. Each run creates a new timestamped directory and refuses to overwrite a specified existing `DASHBOARD_EVIDENCE_DIR`.

For a later frozen candidate, explicitly provide `EXPECTED_CANDIDATE_VERSION`, `EXPECTED_MASTER_SHA` and `EXPECTED_SOURCE_SHA`. The runner asserts these values against the displayed packet link and manifest, so a new artifact cannot silently inherit an old passing check. Defaults remain pinned to 0.1.2. The seven-check 0.1.1 report predates this parameterization; its evidence is retained unchanged.

## Current 0.1.2 dashboard

[Run 08:28:12 UTC](run-2026-10-21T08-28-12.756Z/report.json) passed all seven grouped checks against candidate 0.1.2, source `0c72da97994d9f2d315e6aba1afba5219936b78b` and master `f9488e5079d1d193caef560d1fe72936add6cba3`. Added assertions verify the research link and six core titles/five families/three completed units/three partials, with KF-02 still active. The coordinator inspected the current desktop project cards and mobile Vivid card; the removed arrow glyphs no longer render as missing characters. No browser errors, failed required resources or narrow-screen overflow occurred. Exact app/data hashes are recorded, and the first report is unchanged.
