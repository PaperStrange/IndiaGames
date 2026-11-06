# Bell multilingual development — 6 November 2026

This development build supports English (`en`), Japanese (`ja`) and Simplified Chinese (`zh-Hans`) in both Original and Contrast. It is **not a staged or approved release**. Japanese and Chinese are draft translations awaiting fluent review. The frozen 0.1.0 package and previous Contrast comparison remain unchanged; this development export has new bytes and requires a new candidate identity and its own human evidence.

## Player journey and preserved rules

```mermaid
flowchart LR
    A[Visit Bell Square at Dawn] --> B[Act and resolve the bell]
    B --> C[Witness the blocked crossing]
    C --> D[Choose a bond and object at midnight]
    D --> E[Prepare the side passage next Dawn]
    E --> F[Mina reaches the sheltered well]
```

The crowd still blocks the main alley; the prepared route changes Mina's outcome. Forecasts are optional for progression. A correct forecast earns Momentum; witnessing the event earns the specific prior-loop clue. Neither the selected midnight bond nor a correct forecast substitutes for that clue. A borrowed minute costs one Momentum and still adds Fracture; it holds the phase and forecast until the next actual bell. Fracture four interrupts the schedule without awarding the skipped forecast.

All 43 actions now have explicit IDs, effects and costs. Consequence branches, selected actions, inventory items, bonds and scars use semantic IDs. History stores message descriptors and canonical arguments, so switching language re-renders prior observations instead of retaining stale translated prose. The existing distinctions between Original and Contrast remain: their run states are separate; the human comparison reference is the separately frozen **previous Contrast**, not the Original button.

## Language, art and interaction decisions

| Area | Implemented behavior | Qualification still required |
|---|---|---|
| Language selection | Available at entry and at the map between visits; locked in an encounter, pending receipt, midnight selection and ending. A change spends nothing and preserves both mode states. | Fluent readers assess instructions, clues, tone and terminology. |
| Preference | Supported URL `?lang=` first, then saved locale, browser preferences, English. Recognizes `ja-*`, `en-*`, `zh-Hans`, `zh-CN`, `zh-SG`; Traditional Chinese is not silently treated as Simplified. Only locale preference is stored; denied storage does not block play. | Actual browser/privacy configurations. |
| Game lifecycle | Game state remains in this tab only. Reload starts over; explicit restart clears clues, resources and history. No save or cross-device continuation was added. | Actual phone/tablet lifecycle and interruption behavior. |
| Narrative/UI | 576 required messages, including complete parameterized receipts/history, both onboarding variants, scenes, instructions and assistive labels. Catalog validation rejects missing keys, placeholder mismatch and changed HTML structure. | Japanese/Chinese drafts are not fluent approval. |
| Map | New label-free SVG schematic plus localized native district buttons, status labels and accessible names. The old English-lettered WebP is preserved in the repository and frozen artifacts; it is not embedded in this development export. | Art direction, readability and touch access on real devices. |
| Fonts/layout | Explicit local system CJK fallback stack; no external font request. Compact map labels, wrapping, safe-area padding and scrolling dialogs. | Actual font availability, glyph appearance, OS text scaling and assistive technology. |
| Keyboard | Existing deliberate focus moves now apply in both modes. Fixed dialogs contain Tab focus; Rules closes with Escape and returns focus. Inline encounters remain in normal document flow. | Screen readers and actual-device keyboard interaction. |

The map, keyboard containment, language controls and explicit optional-forecast guidance are deliberate interface changes, not merely translated strings. They need review on the newly versioned candidate.

## Cooperative project structure

| File | Responsibility |
|---|---|
| `js/data.js` | Canonical English story content and explicit action metadata; IDs/costs/effects must not be translated. |
| `js/actions.js` | Pure action lookup, inventory deltas and consequence identity rules. |
| `js/square-event.js`, `js/echo-time.js` | Existing independent witness/provenance, intervention and borrowed-time rules. |
| `js/story-locales.js` | Complete Japanese/Chinese story and item-name drafts, keyed by canonical English messages. |
| `js/messages.js`, `js/ui-locales.js` | Required English UI message registry and complete Japanese/Chinese translations. |
| `js/i18n.js` | Locale negotiation, strict validation, complete-message interpolation and static presentation binding. |
| `js/engine.js` | State orchestration and rendering; message lookups never decide mechanics. |
| `tests/locales.test.cjs` | Cost/identity invariance, complete catalogs, placeholders/HTML and generated onboarding coverage. |
| `tests/localized-journey.cjs` | Visible-control journeys across locales/engines; explicitly automated, never human evidence. |

When editing a message, update its English registry/source and both translations together. Keep placeholders and HTML structure identical. English lookup keys are presentation content, **not semantic game IDs**. Content edits do not rename actions, people, locations, items or saved facts. There is no historical save migration because game state is intentionally in-memory. A game release still needs its exact new build and evidence, even when a source edit only changes a translation.

## Build and verification

```sh
node --test tests/*.test.cjs
python3 tests/check_static.py
python3 -B -m unittest discover -s tests -p 'test_reproducible.py' -v
node build.mjs --output /tmp/bell-language-review/index.html
python3 tests/check_reproducible.py --report /tmp/bell-language-inventory.json
```

The export contains **two files**: the self-contained HTML and `locale-catalog.json`. The catalog declares `thirteenth-bell` as both game and unit, with exactly `en`, `ja`, `zh-Hans`. Both files belong in a future hashed inventory. The HTML itself embeds scripts, styles and the label-free map. Strict inventory validation rejects missing/extra files, symlinks, empty extra directories or altered locale scope. Existing `--output` isolation and malformed-anchor safeguards remain. `scripts/package-pilot.py` now preserves the catalog in the complete build inventory and requires an explicit version; legacy pinned one-file exports remain supported. All 13 Python inventory/exporter regressions share `test_reproducible.py`, the existing hosted CI entry point. No candidate was exported or staged during this milestone.

For browser checks, use an installed Playwright module and its matching supported browser environment. The runner starts its own same-host HTTP server and closes browsers/server in `finally`:

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright \
BELL_ENGINES=chromium,firefox,webkit \
CHROME_BIN=/absolute/path/to/chromium \
BELL_LOCALE_EVIDENCE=/new/external/bell-evidence \
node tests/localized-journey.cjs
```

The evidence directory must be new; retain failed attempts. The runner's paths are test fixtures, not a public deployment. Browser reports record actual engine versions, source-file hashes and build-file hashes. The tested matrix couples locale to viewport: English desktop, Japanese phone-sized, Chinese tablet-sized, plus explicit rotation/narrow reflow. It does **not** claim every locale at every device size or physical device.

The first engineering run exposed missing registry keys and visual inspection found an untranslated clarity control. Independent review then found English regenerated onboarding HTML in both modes; the templates and regression coverage were corrected. Prior reports remain preserved. Final results and exact hashes are in [verification.json](verification.json); [browser observations](browser-results.json) remain automated engineering evidence.

[Japanese phone-sized outcome](ja-phone-outcome.png) · [Chinese tablet-sized outcome](zh-tablet-outcome.png) · [Human language/device review tasks](LANGUAGE-REVIEW.md)

## Human handoff

Preserve the existing six-person Bell study, three people per first-build order and at least 120 seconds of neutral activity before recall. Keep joint thresholds, unsuccessful/assisted attempts and independent approval. Reference/candidate language must be comparable or the revised design explicitly settled before testing; do not divide six into two per locale and claim all three qualified.

The owner-confirmed human attribution of the October records is respected. Their admission to a release cohort still needs identity/build/protocol/threshold reconciliation; five documents are one demo's record set, not five participants. These new engineering checks add no human sessions, physical devices, fluent approvals or release approvals.

Next decisions: fluent reviewers reconcile wording and causal clues, device owners record actual desktop/phone/tablet support cells, then the coordinator selects and freezes a new candidate on `master`. November 20 remains conditional on all three languages and the existing release gate; pending evidence is not a pass.

The additional multilingual/device evidence contract is a **separate governed draft**, not an adopted release-policy change. The current fixed human criteria remain authoritative; this development milestone does not make the current validator qualify all locales/devices. Settle and obtain the required review of the additional comprehension/sampling/support contract before any official promotion. The owner’s all-three-language release requirement remains in force.
