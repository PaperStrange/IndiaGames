# Independent Notebook game review — passed, November 14

**No unresolved technical blocker remains in the reviewed game snapshot.** This is independent agent technical review and synthetic browser testing, not human play, fluency review, hardware qualification, policy adoption or official-release approval. The reviewer edited only private probes/reports, not author files.

## Immutable source and exact bytes

- Game implementation commit: `5ef5ab4b40c2839c9ce6394e4561c658ca5866cc`.
- Workflow-only follow-up: `2f269e2b87539f37d781995c9fcb0f70c3788f36`, changing `ubuntu-latest` to `ubuntu-24.04`. The game tree is unchanged; read permissions and pinned actions are retained. Hosted CI status remains a separate observation.
- Source-input SHA-256: `d99ce0af9ec9ff63016a27f87e18b29d3ddeea784238033ee6bc8c4970e7c1a6`. All 21 build inputs were compared byte-for-byte with immutable Git blobs and current files. The three test drivers were also bound to that commit; the workflow was bound to the follow-up.
- Canonical build inventory: `b91bc1f841ac6e9910a8be0ca8c6663e0253d7d41c0aab4a09088e3f7bd2dc9a`, ten files totaling 1,153,082 bytes.
- Tests used the immutable `qa/runtime/author-export-04/build` snapshot. Its original pre-commit/dirty manifest is preserved rather than rewritten. The later clean committed export independently matches every tested build file and source-input hash, with `source_dirty:false`.
- The private task-backup `qa/independent-game/REVIEW.json` records exact source/file/driver/report hashes, build identity, clean-export binding and limitations. The private `finalize-review.py` reproduces the binding without rerunning browser suites. No original tracked private-product file changed from base `4754462` to the reviewed game implementation.

## Independent observed checks

| Route / engine | Result |
|---|---|
| Actual preview mount, Chromium 141.0.7390.37 | Eight scenarios, 43 assertions passed. |
| Actual preview mount, Firefox 142.0.1 | Eight scenarios, 43 assertions passed. |
| Actual preview mount, WebKit 26.0 | Eight scenarios, 43 assertions passed. |
| Direct root `/`, Chromium 141.0.7390.37 | Two scenarios, 18 assertions passed: denied-storage mixed-language completion/download, and touch-pointer phone/tablet journeys. |

Total: **26 scenarios / 147 assertions**, zero unexpected browser errors and zero external runtime requests. All four reports match the exact final build inventory. The preview route is `/IndiaGames/development/toms-notebook/0.1.0/`.

Focused scenarios cover keyboard marking and consequence focus; English retained text with Japanese UI language; safe explicit-language resume; active-reveal confirmation lifetime and compare-focus return; truthful failed save opt-out; protected future saves and private-product storage isolation; denied-storage completion with an actual downloaded mixed-language transcript; and all three locales at 320px normal text and 390px with root font 16→32px. The enlarged-text check is a layout proxy, not native text-only zoom or an operating-system setting.

The direct-root touch case uses `hasTouch` and `locator.tap`, observes actual browser `pointerType:touch` events, reaches three-exchange endings at 390×844 and 820×1180 with landscape/portrait changes, and expands the retained source record by touch. This remains simulated input and viewport coverage, not physical phone/tablet evidence. The final 390px Chinese ending/record screenshot was visually inspected: text, controls and the original/reply/consequence trace fit the viewport.

## Resolved findings

| Finding | Closure evidence |
|---|---|
| Locale catalog used string units instead of shared `{id, locales}` objects | Producer/export checks corrected; negative exporter fixture added; actual PR17 catalog reader accepts the corrected schema. |
| Consequence heading could not receive focus | Focusable heading now receives keyboard focus; Tab proceeds to the next-page action in all three engines. |
| Reveal timer could destroy a confirmation; comparison could lose return focus | Timer is stopped at safe modal entry; lifetime, focus containment and trigger-return cases pass in all three engines. |
| Retained source/outcome language and translated UI label language were mixed | Snapshot text carries its original language; UI labels inherit the selected language. Cross-language checks pass. |
| Safe resume discarded explicit URL language | Safe retained state now adopts the selected UI locale while preserving original snapshots; all engines pass. |
| Failed persistence opt-out claimed the chapter was cleared | Context-specific translated failure message preserves truthful stored/in-memory status; injected removal-denial cases pass. |
| Enlarged English cover word overflowed 390px | Heading wrapping preserves enlarged text without clipping. All three locales now pass both bounded layout configurations in all three engines. |

Initial Chromium/WebKit reports and overflow screenshots under `*-830030a4/` remain failures for their earlier build. `chromium-01429804/` records an intermediate correction. They are not relabelled final passes; final reports live under `*-final04/`.

## Behavior and remaining human questions

Stable beat/intent IDs and immutable source/reply/outcome snapshots separate authored content from UI language. Explicit submission spends a choice; selection/comparison do not. Each phrase changes its reply/consequence; prior resolutions affect page arrivals and the ending pattern. The third resolution selects one of two endings while the earlier decisions remain visible. Default play stays in memory, optional saving uses only game keys, and a future/malformed saved record is protected until explicit deletion. The standalone import graph and relative built assets contain no private-product provider, live AI or account path.

Translations remain drafts. Human players must still establish comprehensibility, authored-system expectations, narrative agency, comfort, trust and interest. One formative observation target is phone reply discoverability: Submit focuses the scene/source heading while the reply is farther down the stacked spread. Our locators scroll automatically, so successful automation does not prove that a person notices the reply without help. Observe this naturally; any extra question follows canonical measures rather than coaching them.

Physical devices, native accessibility/input behavior, fluent review, fresh-player criteria, protocol adoption and independent human release approval remain pending. This review supplies no candidate staging, official release or repository-administration approval.
