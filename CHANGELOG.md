# Enchanted Notebook development journal

## Alpha 0.2 — Candlelit vellum · 2026-09-08

The first appearance study after the alpha 0.1 baseline.

- Real material textures: fine sheepskin vellum over a dark leather binding.
- Layered page edges, a curved gutter, recessed binding, and a cloth bookmark.
- Physical forward/backward page turns: a lifted leaf, moving shadow, textured reverse, edge pull controls, and persistent Previous/Next navigation. The live editor remains untransformed; a visual copy turns above it. New pages, sidebar changes, reading mode, and PDF paging retain their existing behavior.
- Two gently flickering light sources illuminate the page; switching to Daylight gives a steady neutral surface. The choice and light warmth persist on this device.
- Lighting respects reduced motion and pauses while the tab is hidden. Decoration cannot intercept pen, touch, text, or reading interactions.
- Drawer actions close the drawer before opening a dialog. Dialogs and their scrim sit above the sidebar and fit narrow screens.
- Shared React UI and textures are included in both web and mobile builds.

## Alpha 0.1 — Original interactive baseline · 2026-09-08

Preserved before the material and lighting pass at the user's request.

- Git tag: `alpha-0.1`
- Source commit: `7437dad49cef3bf04eeecef56855a07783a6830f`
- Saved Site version: **1**
- Original sage/cream appearance, freehand ink, undo/redo, on-page text and sample companion replies, diagrams, tables, quizzes, PDF reading/marking, source-linked notes, and automatic saving.
- Known issue at the checkpoint: mobile sidebar could overlap New page and other popups. The snapshot intentionally preserves that state.

Milestones use immutable `alpha-0.x` Git tags. Read the tagged source to inspect a prior milestone; restore it through a reviewed new change and saved Site version so later history and saved notes remain intact. Sites version numbers are separate from these product milestone names.
