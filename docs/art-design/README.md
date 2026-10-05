# MentalCityBeta art-design collection

Collection revision: **art-design-v1**. Assembled **2026-10-04 America/Los_Angeles / 2026-10-05 UTC**. Reviewed application source: `1ade48864d90afcc23a0b9b8ea1a84b101d0f095`. Product version: **alpha 0.4**.

## Reading order

| File | Contents |
| --- | --- |
| [ART-DIRECTION.md](ART-DIRECTION.md) | Notebook materials, lighting, ink, page turns, physical/app pairing, and established interaction requirements |
| [RESEARCH-REGISTER.md](RESEARCH-REGISTER.md) | Film, GitHub and game references; observations, relevance, evidence limits and adoption status |
| [IMPLEMENTATION-AND-REVIEW.md](IMPLEMENTATION-AND-REVIEW.md) | Current implementation, supporting evidence, remaining art criteria and related story cards |
| [ASSET-REGISTER.json](ASSET-REGISTER.json) | Every collected file, original location, category, byte count and SHA-256 |

## Folder contents

| Folder | Contents and use |
| --- | --- |
| `references/` | Complete supplied video stored in verified parts, a restore command, and the existing playable compressed demo/reference poster |
| `materials/` | Vellum and leather textures, with their generation briefs |
| `lettering/` | Bundled Caveat font and its license |
| `reply-media/` | Existing sticker, woodland illustration, educational animation, poster, captions and generation record |
| `companions/` | Six existing portrait images, supplied profile documents/JSON and the runtime demo profile JSON |
| `world-map/` | Supplied v06 PNG plus supplied v05 locations and source notes |
| `evidence/` | Earlier appearance captures, current desktop/phone/tablet screenshots and browser reports |
| `historical-documents/` | Preserved diary-art proposal, physical/digital design cards, sprint selection, QA records, architecture proposal and development journal |

These are ordinary files in the project repository. Runtime assets keep their existing application paths. Files collected from those paths are reference copies at the reviewed source revision; their origins and checksums are in the register. Historical documents retain their original content and relative links. Use the current-source links in [IMPLEMENTATION-AND-REVIEW.md](IMPLEMENTATION-AND-REVIEW.md) for live planning and acceptance status.

The v06 map image and v05 map data retain their separate version labels. This collection does not assert that every v05 coordinate matches the v06 illustration. The supplied video is a user reference; its filename alone does not establish that it is footage from the feature film. See [reference playback](references/README.md) to restore the full video; every original byte is retained in this folder.

## Current decision

The accepted product direction pairs **a real paper notebook with a matching digital edition**. The current app has layered materials, shading, page-turn presentation and ink animation. **Visual acceptance remains open.** The deformable 3D investigation (MC-034) and dimensioned physical design (MC-035) remain **Proposed**. No production model, printable STL/3MF, manufacturing drawing or physical sample is included because those deliverables have not been established in the reviewed source.

## Keeping this collection current

1. Record each researched source and the specific design question it informs in `RESEARCH-REGISTER.md`; distinguish external documentation from a locally reproduced result.
2. Save original project artwork, briefs and useful review evidence in this folder, or record its authoritative runtime source in the asset register. Preserve older provenance.
3. Record accepted decisions in `ART-DIRECTION.md`; connect implementation and review evidence to the existing story card.
4. Refresh the register when collected files change. Keep actual measurements and acceptance outcomes separate from targets.
5. Commit each logical modification separately with its directly related documentation and evidence, using a descriptive message, and verify the remote revision after pushing.

This collection is a documentation and asset-organization change. It does not change the renderer, advance a product milestone, or mark an agile card complete.
