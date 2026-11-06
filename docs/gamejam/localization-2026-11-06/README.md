# Vivid 0.2.0 development: three languages, two complete stories

English, Japanese and Simplified Chinese now share the existing Iona and Mara stories. This is a **development implementation of KF-31/32**, with draft Japanese/Chinese text awaiting fluent review. It is not an official release, a human-approved candidate, or a claim of physical-device compatibility. Frozen 0.1.4 is unchanged. [Recorded verification](verification.json) names the tested build and limits.

| Delivered | Behavior |
|---|---|
| Complete message catalogs | 58 shared UI/runtime messages, 107 Iona messages and 50 Mara messages in each locale. Missing keys, empty messages, malformed placeholders or placeholder differences fail validation; required translations never silently fall back to English. |
| Predictable language selection | A supported `?lang=` choice wins over the saved `vivid:locale` preference, then supported browser languages, then English. `ja-*`, `en-*`, `zh-Hans`, `zh-CN` and `zh-SG` resolve explicitly. Traditional Chinese is not silently treated as Simplified. |
| Safe switching | The collection contains the language picker. Return to the collection before switching; an active story cannot switch mid-action. Loading imports from the previous language are cancelled. No language change dispatches a game event or clears story progress. |
| Remembered progress | Story, action, actor, profile and save IDs remain stable. In-page semantic snapshots preserve temporary progress even when browser storage fails. Protected corrupt/future records remain untouched until explicit recovery/reset. A page reload cannot preserve an unsaved visit when storage is unavailable; the localized warning states that limit. |
| Narrative continuity | Early reading remains an intrusion; permission is a distinct later state. Public dedication never silently publishes the original private letter. Legacy published-letter history stays truthful. Iona still requires explicit bracing, wedge placement, choice and return placement; Mara still ends after a freely chosen interpretation. |
| Accessible presentation | Visible copy, settings, status/errors, action hints, assistive labels, descriptions and transcripts are localized. Taps and keyboard actions remain alternatives to dragging. Deliberate local system-font stacks and wrapping support CJK; no remote font or translation service is added. |
| Self-contained build | Version 0.2.0 contains both `story-catalog.json` and the shared version-1 `locale-catalog.json` at the build root. Locale resources live inside the hashed bundle. No per-language story fork, save namespace or candidate suffix is introduced. |

Each story visit starts a new transcript, as before. Switching via the collection starts the next visit in the selected language from the semantic checkpoint; rendered feedback and transcript strings are not transferred into saves. Revisiting a completed promise follows the existing return behavior. Transient camera orientation and object selection are not progress and are cleared when leaving.

## Authoring and recasting

The shared [message service](../../../vivid-2.5d-photo-game/play/src/i18n/core.js) validates complete flat catalogs and named placeholders. [UI messages](../../../vivid-2.5d-photo-game/play/src/i18n/ui.js) remain separate from [Iona](../../../vivid-2.5d-photo-game/play/src/stories/iona/catalogs.js) and [Mara](../../../vivid-2.5d-photo-game/play/src/stories/mara/catalogs.js). `getCatalog(locale)` constructs localized metadata; `createIonaPack({locale, cast})` and `createMaraPack({locale, cast})` retain their English defaults and semantic contracts.

Characters remain replaceable. A custom cast supplies its name, portrait where applicable, English `description`, and `descriptions.ja` / `descriptions['zh-Hans']` appropriate to the replacement art. Missing required non-English descriptions fail clearly rather than describe the wrong protagonist. Mara preserves custom English `subject` grammar, including singular “they”; optional `subjectAgreement` selects a complete singular/plural question; optional `subjects[locale]` supports authored CJK wording, with a gender-neutral phrase otherwise. Neither translated names nor pronouns choose rules or save slots. Recasting and cross-locale migration tests cover both stories.

## Verification and reproducibility

Run from `vivid-2.5d-photo-game/play` with locked dependencies and the supported Node version:

```sh
npm ci --no-audit --no-fund
npm test
npm run build
node --test scripts/check-build-version.test.mjs
VIVID_QA_ROOT=/tmp/vivid-locale-qa npm run test:browser:locales
```

The browser runner serves the exact `dist/` bytes itself, records every output hash, and supports `VIVID_BUILD`, `VIVID_QA_ROOT`, `CHROMIUM_PATH` and `VIVID_BROWSERS=chromium,firefox,webkit`. Extra engines require usable Playwright installations. It deliberately labels viewport/input emulation and preserves failures in its report. System CJK font availability remains part of the declared device/browser review.

| Actual check | Result |
|---|---|
| Unit/runtime/story/localization tests | 69 passed, including existing English behavior, missing translation failures, safe locale selection, semantic equality after valid/invalid actions, both profiles and all endings, legacy history and recasting. |
| Story validation/build | Six localized packs, 75 representative views and 18 local asset references; emitted 0.2.0 badge and both catalogs. |
| Version-guard fixtures | Seven passed against the actual emitted HTML/package/lock. |
| Locale browser matrix | 39 cases passed across Chromium141.0.7390.37, Firefox142.0.1 and WebKit26.0: each engine covers three languages × 1440px keyboard / 390px touch / 768px pointer and both full story endpoints, three neutral/fallback journeys, and denied-storage switching/recovery. |
| Active geometry and accessibility | 522 visible controls measured at bracing/placement, permission choices, return placement, Mara alignment/range and interpretation. Required sets are nonempty; width/height are at least44px and document overflow checks pass. |
| App-edge regression | Ten cases passed on final bytes: gesture cancellation, focus, story/transcript isolation, bookmarks, BFCache and stale asset requests. |
| Earlier English browser regression | 16 observations passed on the earlier build before the recast-grammar correction, including actual WebGL context loss and flat completion. Its old identity is retained rather than relabeled as final-build evidence. |
| Repeated build/export | All16 file hashes match the reviewed development export:1,450,016bytes, inventory `1c440d1a1bcbb0b8470949aeb8a2f590e9ab2278eac1ed384198acfbaeb9ca63`. |
| Human/native-language/physical-device release qualification | Pending; supplied human feedback informs the design but is not converted into new exact-build cohort rows by this implementation. |

The first locale browser attempt retained five **harness timing failures**: it checked the collection picker before the asynchronous story import finished. The harness now waits for the visible experience. The same runtime bytes passed all 13 cases afterward. This is not presented as a gameplay repair or omitted failed attempt. Independent review also corrected an inherited English recast grammar bug and found vacuous target-size assertions at completed endpoints. The final harness measures nonempty active states; all39 cases passed again on the reviewed build. Initial outer-host Firefox/WebKit launch failures remain documented; the final matrix ran in a supported Playwright1.56.1 container. Detailed logs, screenshots, original failure reports and the development export remain in the task's private QA workspace; the concise JSON here is suitable for source control.

## Weekend human handoff

| Reviewer/tester | What to inspect on the final selected build |
|---|---|
| Fluent English, Japanese and Simplified Chinese reviewers | Both stories and all UI; clue precision, tone, permission versus intrusion, private letter versus public dedication, truthful legacy text, and nonjudgmental Mara interpretations. Record exact catalog/build identity and corrections. Agent translations and this engineering check do not approve language quality. |
| Desktop/phone/tablet owners | Name actual hardware, OS/browser and input. Check portrait/landscape, CJK glyphs and enlargement, action discovery, touch/keyboard alternatives, interrupted placement, gallery language switching, save/reload/recovery, flat/3D presentation and background/foreground behavior. Record actual performance using the existing declared method. |
| Study facilitator | Preserve six fresh Iona people and six different Mara people, existing thresholds and all attempts. Iona includes scheduled return and actual placement; Mara includes interpretation. Review additional locale sampling before registration; six mixed-language observations do not validate all three languages. |
| Independent release reviewer | Play the exact final candidate, inspect original observations and unresolved critical defects, then make the separate approval decision. Development tests and translation review do not replace this role. |

Both stories and all three languages are required for a November 20 release. Any missing required language, device or human evidence means a defer decision for the bundle. The existing independent approval, master staging and main promotion workflow remains unchanged.
