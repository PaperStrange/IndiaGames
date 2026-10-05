# Illustrated report review — visual / mistake-hunt
**Date:** 2026-10-03
**Reviewer:** independent mistake-hunt subagent (parent: main agent)
**Target:** `~/workspace/your_files/memorable-moments-game-research-report/memorable-moments-game-research-report.html` (exported self-contained build, 1,490,930 chars, 16 unique inlined assets)
**Method:** parsed the actual HTML with Python (no assumptions): decoded all 16 embedded assets and diffed the 6 SVGs byte-for-byte against source, validated XML, checked anchors/nav/CSS/JS/text. Pixel rendering was NOT possible — headless Chromium `--screenshot` exits code 2 in this environment (pre-existing, confirmed twice).

## What passed (verified, not assumed)
- All 10 snapshots embedded, each with product-name caption + "captured 2026-10-03" + source link. No broken/empty img in the gallery (the one `alt=""` img is the hidden lightbox placeholder whose alt is set by JS on open).
- All 6 SVGs byte-identical to `research/assets/illustrations/*.svg`, all XML-valid. gates.svg shows the resolved gate #3 ("Separate editions decided", teal #0d9488) — the stale open-question version is gone.
- Viewport meta present, 4 media queries, sticky nav present, all CSS widths ≥700px are `max-width` (mobile-safe).
- All 9 brief sections present in order (cover + 8 numbered), all 9 nav anchors + 14 source anchors resolve, zero dead internal links.
- Evidence pills use `display:inline-flex` (render inline, not full-width boxes); [REAL]/[SECONDARY]/[OPEN] variants distinct.
- Zero placeholders (lorem/TODO/TBD hits were base64 false positives — rechecked on stripped text: 0).
- Zero solution-language ("we will build", "MVP", "roadmap": 0 hits). Footer scope note present: "research synthesis, not a game design or PRD."
- All 8 decision cards terminate in a DECISION block. Citations [9]–[13] grounded in track2-psychology.md (Pizarro 2022, Gruber 2014 confirmed).
- Filter buttons and lightbox JS are functional (filter toggles by data-platform; lightbox sets src+alt from the clicked card; link clicks inside cards correctly bypass the lightbox).
- Landscape.svg: all 36 text labels inside the 1080×660 viewBox; "OUR GAME" star + whitespace quadrant present.
- Contrast: `--muted #52605c` on light background ≈ 7.5:1, passes AA.

## Findings

### BLOCKER
**1. Backwards arrowhead in collision.svg.** The `arrow()` helper in `make_illustrations.py` (line 20–22) hard-codes a right-pointing head (`points="{x2},{y2} {x2-9},{y2-5} {x2-9},{y2+5}"`) regardless of line direction. In collision.svg the leftward rose arrow `arrow(670, 155, 580, 155)` renders as `<polygon points="580,155 571,150 571,160"` — tip at x=580 is the *rightmost* vertex, so the head points right while the line travels left. Visible defect on a key diagram.
**Fix (minimal):** in `~/workspace/research_notes/memorable-moments-game-20261003/assets/illustrations/collision.svg` change `points="580,155 571,150 571,160"` → `points="580,155 589,150 589,160"`. **Fix (root cause):** replace the helper in `~/workspace/memorable-moments-game/research/assets/make_illustrations.py` with a direction-aware version:
```python
def arrow(x1, y1, x2, y2, color="#4f46e5"):
    import math
    dx, dy = x2 - x1, y2 - y1
    L = math.hypot(dx, dy) or 1
    ux, uy = dx / L, dy / L
    bx, by = x2 - 9 * ux, y2 - 9 * uy
    nx, ny = -uy * 5, ux * 5
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="2.5"/>'
            f'<polygon points="{x2},{y2} {bx+nx:.1f},{by+ny:.1f} {bx-nx:.1f},{by-ny:.1f}" fill="{color}"/>')
```
Then re-embed the fixed SVG into the artifact via `artifact.edit`. (Checked: the other arrows — reveal-loop's 6 rightward, digital-gap's 3 downward — are correct under both versions.)

### SHOULD-FIX
**2. Traction table has no mobile scroll wrapper.** The single 5-column comparator table is not wrapped in an `overflow-x:auto` container; at 390px the columns ("Traction signal", "What it proves") will squeeze illegibly.
**Fix:** wrap the `<table>` in `<div style="overflow-x:auto">…</div>` (or add a `.table-scroll` class) via `artifact.edit`.

**3. ~600KB of duplicated image payload.** Each of the 10 snapshot data URIs appears twice in markup — once in `<img src>` and once in the button's `data-src` (27 data URIs total vs 16 unique). Page weight 1.49MB, ~40% redundant.
**Fix:** delete the `data-src` attributes and change the lightbox JS from `image.src=shot.getAttribute('data-src')` to `image.src=shot.querySelector('img').src`. Functionally identical, removes ~600KB.

**4. Source [7] wording.** "Jackbox Party Pack 12 Official game format" reads as a typo for "official site".
**Fix:** reword to "Jackbox official site — game format, pricing, audience mechanic; 1B+ sessions is a company press-kit claim."

### NIT
**5. Lightbox placeholder.** The hidden `<dialog>` preloads a full jackbox data URI as its initial `src` (~74KB decoded for an image the user may never open); initial `alt=""` is only repaired by JS on open.
**Fix:** drop the initial `src` (or use a 1px transparent gif); alt handling on open is already correct.

**6. Filter buttons are ~32px tall**, under the 44px touch-target guideline. Cosmetic on desktop; acceptable, but bump `.filter-btn` padding to `12px 16px` if cheap.

**7. "Approximately 38 screened products"** — the filter table lists 33 live products; the ~38 count includes dead/ambiguous ones (Kindu, DoYouKnow?, 52 Fridays, Unbox Love). The word "approximately" covers it; optionally add "(incl. discontinued)" once. No change required.

**8. Visual-QA limitation (not a defect).** Label overlap in landscape.svg and final rendered appearance could not be pixel-verified (Chromium screenshot broken in this env). Geometry checks pass (all labels in-bounds, alternating offsets by design). Recommend one human glance at the hosted page before calling the report final.

## Counts
- BLOCKER: 1 (backwards arrowhead, collision.svg)
- SHOULD-FIX: 3 (table scroll, data-src duplication, source [7] wording)
- NIT: 4 (lightbox placeholder, touch targets, "38" footnote, visual-QA limitation note)
