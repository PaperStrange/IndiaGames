# Luminous Ledger World Map v0.5 — Readability and Route Pass

This pass keeps the illustrated geographic overview, but separates route guidance into a clean player-journey view.

## What changed

- Numbered map markers are offset from labels and connected with short leader lines, so the marker never sits on top of the place name.
- Region boundaries use a darker under-stroke plus a brighter dashed line, making the gameplay area-ranges explicit against the painted terrain.
- The vertical-slice route is represented in a new high-contrast journey map: London Gate → King's Cross Gate → Hogwarts Arrival → Companion Hubs.
- Optional branches are called out separately for the West Country, Northern Wilds, and remote mountain/offshore routes.
- `world_map_locations_v05.json` exposes both synchronized views, journey stages, branches, and runtime guidance for collision-safe marker rendering.

## Intended use

- Use `LUMINOUS_LEDGER_FANTASY_MAP_v05.svg` when the player needs geographic orientation and a sense of the magical world.
- Use `LUMINOUS_LEDGER_PLAYER_JOURNEY_MAP_v05.svg` when the player needs to understand the next route, story checkpoint, or optional branch.
- Treat region divisions as gameplay navigation regions, not claims about canonical political borders.
- Keep the current-location marker data-driven. The overview artwork provides the default presentation; runtime state should move the marker and preserve the leader-line offset.

## Source grounding

- [COMPANION_PROFILES.md](../../project_sources/10-COMPANION_PROFILES.md)
- [companion_profiles.json](../../project_sources/08-companion_profiles.json)
- [MEMORY&LEARNED.MD](../../project_sources/03-MEMORY-LEARNED.MD)
- [HarryPotter.com Fact Files — Locations](https://www.harrypotter.com/fact-file/locations)
- [User-provided Etsy style reference](https://www.etsy.com/listing/1785821123/fantasy-wizard-map-wall-art-vintage?ref=share_v4_lx)

The map remains an original navigation layer informed by the setting collection and public location references; it does not reproduce licensed map artwork.

Earlier versions v0.1–v0.4 remain preserved for comparison and rollback.
