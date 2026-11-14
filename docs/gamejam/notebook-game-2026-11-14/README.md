# Borrowed Words · Notebook game 0.1.0

The fourth game is implemented as a separate, static authored diary adventure in **English, Japanese and Simplified Chinese**. Mark an authored phrase, send it, compare the notebook's reinterpretation with your retained original, and decide which account leads. Three exchanges reach two endings with eight callbacks to earlier decisions. This is a **development preview**, not a staged candidate or official release.

The existing Enchanted Notebook product remains **0.4.0-alpha.0**. Its private application, backend and 35 MC acceptance cards are unchanged. No account, live AI, camera, OCR or private service is required by the game.

| Explore | Record |
|---|---|
| Run, build or extend | [Standalone game README](../../../game/README.md) |
| Story, player journey and design questions | [Narrative contract](story.md) |
| English/Japanese/Chinese review | [Language handoff](localization.md) |
| Six actual competitor attempts | [Research index and evidence → decisions](../competitor-plays-2026-11-14/README.md) |
| Genuine game images | [Captures and provenance](captures/README.md) |
| Exact engineering identity | [Verification summary](verification.json) · [clean committed export](committed-export.json) |
| Independent technical review | [Review findings and closure](INDEPENDENT-REVIEW.md) |
| Human-results handoff | [Four-game instructions](https://github.com/PaperStrange/IndiaGames/blob/main/docs/four-game-release-2026-11-14/HUMAN-HANDOFF.md) |

## Engineering result

| Check | Observed result |
|---|---|
| State behavior | 16 tests, including 192 complete semantic paths and all ending contexts |
| Bounded exporter | 6 tests covering stale/extra/wrong-version/symlink/destination rejection |
| Author browser matrix | 54 cases / 2,166 assertions: three locales × three viewports × two endings × Chromium141.0.7390.37, Firefox142.0.1 and WebKit26.0 |
| Independent regression review | 24 focused cases / 129 assertions across the same engines; an additional two direct-root/touch scenarios /18 assertions |
| Layout and recovery | Keyboard/focus, reduced motion, actual downloads, saved resume, protected/failing storage, 320px layout and 200% text checks; simulated touch on phone/tablet viewports |
| Reproducible development export | Clean rebuild from committed source reproduced all ten files  / 1,153,082 bytes exactly |
| Hosted CI | [Run 43581634137](https://github.com/PaperStrange/IndiaGames/actions/runs/43581634137) passed unit/build/export checks, 18 Chromium cases /722 assertions and clean export |

QA source: `5ef5ab4b40c2839c9ce6394e4561c658ca5866cc`. Workflow-only follow-up: `2f269e2b87539f37d781995c9fcb0f70c3788f36`. Source-input fingerprint: `d99ce0af9ec9ff63016a27f87e18b29d3ddeea784238033ee6bc8c4970e7c1a6`. Canonical build inventory: `b91bc1f841ac6e9910a8be0ca8c6663e0253d7d41c0aab4a09088e3f7bd2dc9a`.

Author browser tests ran against the explicitly dirty development export; the later clean committed rebuild reproduced every tested file. CI independently reported the same inventory. Its binary artifact download returned 403, so CI artifact bytes were not separately downloaded and inspected here. The local committed export was independently compared. No unexpected browser errors or external runtime requests were observed in the final game runs.

Earlier failures are retained, including enlarged-title overflow and the first hosted runner's unsupported Ubuntu 26.04 browser installation. The fixes were wrapping/focus/save handling and a supported Ubuntu 24.04 runner, not relaxed assertions. The copied original font licence retains its existing trailing space so provenance stays byte-identical.

## What remains human work

All language content is a development draft pending fluent review. Automated completion and simulated touch do not establish enjoyment, causal understanding, physical-device comfort or the target ten-to-fifteen-minute duration. Root's earlier exploratory English→Japanese→Chinese run preserved original-language entries and downloaded a complete transcript, but is separate from final-build technical verification.

For the six additional fresh Notebook players, adopt the [draft protocol](https://github.com/PaperStrange/IndiaGames/blob/f2a90c242350ea1a3d9d9ffdd9cccf9d777a286c/docs/governance/locale-device-evidence-2026-11-06/NOTEBOOK-PROTOCOL.md) before qualifying sessions. Proposed criterion: at least four of the first six preregistered players both finish unaided and explain an edit-to-reply/ending consequence. Record failures, help, source recovery, expectations, voluntary continuation and contrary findings. Do not coach a preferred ending.

On phones, observe where players look after Send and whether they discover the changed reply unaided; automated locators can scroll and cannot establish this. The authored-story notice's visibility and clarity also need observation. Keep formative prompts after canonical unaided measures.

PR17 remains draft/unadopted. Main/master protection, reviewed language sampling, real device coverage, zero unresolved human-classified critical bugs and independent exact-build approval remain required for an official release. No master packet, release registry entry or GitHub version tag was added by this implementation. November 16 is the individual go/defer checkpoint; November 20 requires all three languages, with incomplete games deferred.
