# Art research register

Consolidated 2026-10-04 America/Los_Angeles / 2026-10-05 UTC. Earlier discussion identified the candidates below. Linked repository/official documentation was checked during consolidation where stated. No external repository was installed, benchmarked or adopted by this documentation change.

## Film and supplied reference

| Source | What is established | Application to this project | Evidence boundary |
| --- | --- | --- | --- |
| [Official Tom Riddle's diary entry](https://www.harrypotter.com/fact-file/objects/tom-riddles-diary) | Official identity and story context for the requested object | Anchor the user's reference and the restrained answering-diary direction | Text reference checked; no frame-by-frame film comparison completed here |
| `references/original-video-parts/` | Exact supplied video bytes retained in ordered parts with per-part and full-file SHA-256; restore command provided | Primary project behavior reference | Earlier MC-028 notes report selected-timestamp inspection; filename does not authenticate feature-film footage |
| `references/harry-potter-notebook-demo.mp4` and `.jpg` | Existing app demo derivative and poster | Convenient local reference playback | Compressed derivative has different bytes from the original; both are registered separately |

## GitHub and rendering references

| Candidate / primary source | Observed in documentation | Design implication | Adoption status |
| --- | --- | --- | --- |
| [MaximeRivest/Riddle](https://github.com/MaximeRivest/Riddle) | reMarkable-focused diary; committed page images go to a vision LLM; replies are rendered as handwriting paths | Study image-to-reply separation and local handwriting replay; keep our own input/revision rules | Reference only. Device integration and README performance claims have not been reproduced here. README memory descriptions need implementation review before reuse |
| [oguzhanT/turngl](https://github.com/oguzhanT/turngl) | Three.js/PDF.js flipbook with drag-to-turn and cylindrical page deformation | Candidate for examining page curl and page texture interfaces | Reference only. Editable ink, accessibility and our device targets require separate evaluation. Repository declares MIT; pin/review exact files before adoption |
| [shiarauzo/book-flip](https://github.com/shiarauzo/book-flip) | Desktop-first React Three Fiber book with shader-bent sheets and canvas-textured page content | Candidate for curvature, front/back content and lighting during a turn | Reference only. Interactive editing and reuse terms require review before integration |
| [oweissbarth/bookGen](https://github.com/oweissbarth/bookGen) | Blender book generator with dimensional controls including cover thickness | Reference for parameterized cover/body proportions and scene preparation | Reference only. Manufacturing geometry, physical fit and exact version/license review remain separate |
| [React Three Fiber introduction](https://r3f.docs.pmnd.rs/getting-started/introduction) | React renderer for Three.js | Candidate technology for MC-034's bounded interactive spread investigation | Proposed investigation. No production renderer replacement approved |

The implication column is our design interpretation. A documented example establishes a technique worth investigating; it does not establish input accuracy, device performance or product readiness for MentalCityBeta. Repository popularity is not an acceptance criterion.

## Game references

| Source | Evidence retained | Question for the art review |
| --- | --- | --- |
| The Plucky Squire | Prior discussion named its transition between page and surrounding world. Publisher search results were available; complete publisher-page retrieval was blocked during this consolidation. Further visual review remains pending | How can the paper object remain recognizable while its content becomes animated? |
| [Strange Antiquities, publisher-provided Nintendo listing](https://www.nintendo.com/us/store/products/strange-antiquities-switch/) | Describes an occult-object identification game; source text checked | How can a quiet object-centered workspace communicate mystery while keeping practical actions discoverable? |
| [Tiny Bookshop official site](https://tinybookshopgame.com/) | Describes an ambient narrative bookselling game; source text checked | How can restrained surroundings and recurring use make a familiar object feel personal? |

These are inspiration questions from the prior proposal. No game assets, trailers, screenshots or source code were copied into the product by this collection. No comparative playtest or market-performance conclusion is asserted.

## Project-generated and supplied art

| Material | Provenance record | Current handling |
| --- | --- | --- |
| Vellum/leather | `materials/GENERATION-BRIEFS.md` | Existing generated material textures copied with their original briefs |
| Reply illustration/sticker/video | `reply-media/asset-manifest.json` | Existing media and captions retained; manifest's original-generation filenames are distinct from deployed WebP encodings |
| Companion portraits and profiles | `companions/` | Existing demo portraits plus supplied design documents; per-character visual behavior remains subject to implementation review |
| World map | `world-map/WORLD_MAP_SOURCE_NOTES_v05.md` | Preserve supplied v06 PNG and v05 data/notes as separately versioned references |
| Caveat lettering | `lettering/OFL.txt` | Preserve the bundled font and license together |

Historical profile documents contain older memory/trigger proposals. Current product decisions retain automatic useful-memory learning with history/undo, reviewable instruction changes, one companion per user, current input-revision rules, and explicit photo Ask. Historical art references are not executable configuration changes.

## Research handoff requirements

Before adopting external code or an asset, retain the exact version/commit, applicable license, origin and modification record, and evidence for the question being tested. For MC-034, report actual input mapping and device behavior. For MC-035, report actual units, geometry/assembly checks and any physical fit results. Link each result to its existing card and keep source observations separate from proposed product choices.
