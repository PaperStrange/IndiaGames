# Reference audit: Little Prince, expressive actions, and the Vivid stack

Observed on **2026-10-21 UTC** by an agent operating browser UI. This is an entry-attempt journey, **not a completed game playthrough or a human participant session**. It supplements the six comparator records; it does not replace one.

## Little Prince: actual endpoint and journey

Edition: the deployed [The Little Prince Among the Stars](https://littleprince.dev/) website linked by the user's [creator post](https://x.com/Saccc_c/status/2109962425512734739). Environment: headless desktop Chromium 151, 1280 × 900, mouse UI input. The rendered page stopped entry at a graphics-acceleration/WebGPU compatibility message. Core movement, object interaction, story progression, audio, ending and performance were **not observed**. No game-state injection or capability spoofing was used to get past the message.

| UTC / stage | Intention and ordinary UI action | Observed result | Interpretation and limit |
|---|---|---|---|
| 07:35:11 / arrival | Open the supplied game to understand the invitation to explore. | Painted planet, character and rose composition; English title; compatibility guidance instead of a usable start control. [Capture 1](captures/littleprince-01-arrival.png). | The visual invitation is legible, but this browser cannot enter the promised activity. This does not establish failure on supported physical computers. |
| 07:35:45 / available choice | Click the visible English language control. | Eight options appear: English, French, Spanish, German, Portuguese, Chinese, Japanese and Korean. [Capture 2](captures/littleprince-02-language-menu.png). | A meaningful preference remains usable before gameplay loads. No inference about in-game translation quality. |
| 07:36:23 / preference feedback | Select Chinese from the menu. | The selected language and compatibility guidance change to Chinese. The same entry block remains. [Capture 3](captures/littleprince-03-chinese-block.png). | Immediate visible response establishes that the page is responsive even though the game is unavailable. |
| 07:36:27 / return | Reload the page. | Chinese remains selected; the compatibility block persists. [Capture 4](captures/littleprince-04-reentry.png). | Preference survives a real reload. No game progress or narrative memory was reached. Stop here. |

The web reader also returned a desktop-only notice recommending Chrome or Edge and stating phone/tablet play was unsupported. That is a **site statement**, not a device test. The browser-rendered current endpoint was the WebGPU/acceleration block described above; these observations must not be conflated.

**Access method.** Chromium's normal route initially lacked trust for the managed environment's current proxy certificate in the team's earlier research. This run used the team's task-scoped Playwright `APIRequestContext` route: upstream requests went through the configured HTTPS proxy with `NODE_EXTRA_CA_CERTS` pointing to the already installed environment CA, default certificate verification enabled, and responses fulfilled unchanged into the browser. No persistent trust store was edited and no TLS errors were ignored. Proxy mediation and headless rendering make this unsuitable for timing or physical-device conclusions. Screenshots are evidence of the reference website, not assets licensed or copied into Vivid.

## Creator's process: what the source actually supports

The [original post](https://x.com/Saccc_c/status/2109962425512734739) announces the project and mentions Tripo and Blender. The [follow-up tutorial](https://x.com/Saccc_c/status/2110694725640474759), linking its [article](https://x.com/i/article/2110601994578866176), describes **Tripo + Blender + Unity**: visual references, asset generation, model cleanup/rigging, scene assembly and deliberate correction of character–object contact. This is a creator-reported pipeline, not a reproduced benchmark. It does **not** establish that the reference used Three.js. The article was created October 15 and modified October 17, 2026.

Direct X retrieval returned 403 during this audit. The public FxTwitter API returned the authored post/article; retrieval URLs, timestamps and response hashes are in [source-retrieval.json](source-retrieval.json). No full article text is redistributed here. Claims about development speed, reach or future source publication are not independent evidence of quality, completion or an available reusable codebase.

For Vivid, the transferable practice is to decide the composition and object contact first, then inspect the result from several views. The implementation choice remains **original Blender-authored assets + local Three.js rendering + HTML controls and a complete flat presentation**. It fits a small framed world, the existing web rules, selectable story packs and accessible fallbacks. Tripo or paid rigging tools are not required to build the candidate. This is our engineering decision, not the creator's prescribed stack.

## Narrative methodology: read, not played

**What Remains of Edith Finch was not played in this session.** The following sources provide design-method evidence only:

- In [Ian Dallas's first-person PlayStation article](https://blog.playstation.com/archive/2017/04/25/the-personal-stories-that-shaped-remarkable-ps4-adventure-what-remains-of-edith-finch-out-today/), character perspective, specific personal details and environmental composition help communicate feeling. Our application: the worn notch first reads as ordinary wear, then becomes evidence of an earlier act of care. This application is an original hypothesis, not a claim of the same emotional result.
- The [Game Developer interview with Ian Dallas and Chris Bell](https://www.gamedeveloper.com/design/creating-the-30-different-control-schemes-of-i-edith-finch-i-) describes diverse expressive interactions, constrained familiar inputs, iteration on player expectations and prototypes with a complete gameplay progression. Our application: Iona's brace-and-wedge sequence and Mara's sketch alignment have different verbs and visible consequences; both keep simple controls. Sharing save/input infrastructure does not require sharing a narrative formula.

No Finch plot, characters, scene art or dialogue is reused. Neither article proves that Vivid is enjoyable; uncoached human sessions must test whether the physical action helps players explain what changed and why it matters.

## Concrete lessons and implementation checks

| Evidence or methodological premise | Vivid decision | How to check it |
|---|---|---|
| A strong visual arrival can still end before any player action when capability checks fail. | Keep the story rules and usable HTML controls independent of the 3D renderer; fall back without resetting progress. | Force unavailable WebGL, asset failure and context loss mid-story; finish through flat presentation. |
| The reference's preference change produced an immediate, persistent response. | Give accepted actions visible feedback and save semantic checkpoints. | Reload after brace, wedge, alignment, choice and placement; verify the same meaning survives. |
| Creator describes checking views and hand/object contact. | Make frame depth, wedge notch, sheltered recess and lightbox readable; keep placement destinations explicit. | Inspect 3D and flat views at desktop and narrow layouts; confirm tap/keyboard alternatives communicate the same destination. |
| Finch methodology ties different actions to different perspectives. | Iona changes how an old object is understood; Mara assembles evidence into a possible future. | Ask players to explain action → visible consequence without grading their personal interpretation. |
| [W3C's dragging guidance](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) distinguishes click/tap alternatives from keyboard support. | Provide select-object then tap-destination as well as keyboard controls; dragging is optional. | Complete placement without dragging and without a physical keyboard; test cancellation and invalid drops. |
| [Bruno Simon's public Folio 2025 repository](https://github.com/brunosimon/folio-2025) separates resources, scripts, runtime source and static exports, and documents input/simulation/view ordering. | Keep source art/export scripts separate from shipped assets; isolate story rules from renderer lifecycle. | Rebuild assets and inspect pack tests independently; switch stories without leaked listeners or names. This is a structural reference, not a copied engine. |

Why might someone want to play? The observed reference landing page supports a **hypothesis of curiosity about an inviting miniature world**; it cannot establish enjoyment after entry. Vivid's more specific hypothesis is that an ordinary gesture can become personally meaningful when the world remembers its consequence. The distinguishing promise to test is **a brief story whose change remains visible when the player returns**, alongside a second story that proves the system can express a different kind of discovery. No claim of market uniqueness, retention benefit or human preference is justified by this bounded reference attempt.
