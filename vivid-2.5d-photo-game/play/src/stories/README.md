# Authoring a story pack

The two shipped stories demonstrate different structures. Iona uses a linear rescue, a short recollection, a personal choice and a remembered return. Mara lets players inspect three objects in any order, align two drawings and choose an interpretation. Their shared runtime does not interpret those plots.

`catalog.js` registers the shipping stories with lazy module imports. To add a story, add its module and catalog entry; do not add a story-name branch to the runtime or UI. Titles, subtitles, descriptions and duration labels must match the manifest. Durations are **content estimates**, not measured player completion times.

Each module exports `pack`:

- `manifest`: stable ID and content revision, save version, cast, local asset paths with descriptions, supported interaction kinds, and reviewed release profile.
- `createState({profile})`: a new semantic checkpoint. `remembered` and `neutral` are isolated study profiles, not difficulty settings.
- `reduce(state, event)`: pure, validated transitions. Invalid or repeated one-time actions preserve state. The renderer and animations never decide success.
- `getViewModel(state)`: narration, accessible inspection text, a generic scene description and action descriptors. The UI renders `inspect`, `choose`, `place` and `adjust` actions; it has no plot-specific rules.
- `serialize(state)`: only semantic facts, not camera positions, open panels, feedback or animation progress.
- `migrate({version,state})`: validate a saved checkpoint and return a current playable state. Throw on unsupported or malformed data; do not silently guess a different story.
- `validationStates()`: representative states reached through real events, covering the actions a pack exposes. Build validation checks these alongside the initial state.

Write prose in each pack's `content.js`. Actors and objects connect through stable IDs such as `keeper`, `painter`, `letter`, or `sketches`; display names are not identifiers. Cast metadata can change names, pronouns, descriptions and portrait paths. The development-only `fixtures/recast.js` uses Eris in place of Iona with the same rules and changed prose. It is intentionally absent from the shipping catalog. A portrait source and its accessible description should be replaced together for a new production character.

Optional `scene.caption` supplies the visible scene caption, including any recollection framing. Optional `scene.descriptionLabel` supplies the introductory text of the illustration's accessible label; the UI adds the current scene details and placement status. Both fields must be nonempty strings when supplied. Without them, the UI uses the manifest subtitle and a generic portrait/workbench label. Keep narrative or setting-specific wording in the pack, not the shared UI. The shipped packs author these labels in `content.js`, preserving their existing presentation.

## Existing narrative checkpoints

**A Place for the Promise:** inspect both harbour marks, choose east and short/long/short, send the signal, enter a clearly marked earlier watch, brace the shade, place the wedge, return to the present, choose a private letter or approved public dedication, revisit and place the chosen object. The brace latches; there is no sustained hold, simultaneous input or timer. Recollection actions make an ordinary repair meaningful without treating fear as a moral failure. Both endings remain warm and both acknowledge an earlier intrusion if the player opened the letter without permission.

The remembered return uses a sheltered letter or harbour-facing dedication. The neutral return uses a cleaning cloth on a peg, with no choice-memory wording. Both profiles share the rescue and recollection. An ending reload opens the return directly. A completed placement is preserved on every later visit.

The original `keepers-frame:v1` save imported only into Iona's remembered profile records a different historical archive action: the original letter was published. `letterPublished` preserves that truth. It does not become a dedication-only choice retroactively. Legacy players can place the return object immediately or ask about the new recollection once; neither requires another rescue. The optional `pack.legacyImport` contract declares the old key; the shared runtime has no Iona-specific migration branch.

**The Unfinished Postcard:** inspect the cancelled timetable, postcard and architectural sketches in any order. The sketch interaction uses semantic registration positions 0–6, with window edges meeting at notch 3; this is a discrete alignment, not a stored pixel offset. A slider, step controls and keyboard can all express the same action. The complete image reveals a community workshop. Every ending interpretation is legitimate; there is no score for selecting the author's preferred emotion.

## Verification and extension

`node --test test/stories.test.js` covers both Iona choices × intrusion/no intrusion × both study profiles; recollection checkpoint recovery; legacy privacy continuity; invalid, repeated and out-of-order actions; all six Mara inspection orders; every interpretation; malformed saves; pure transitions; and actor replacement.

New mechanics can use a new reviewed action kind through the same contract. They must define an equivalent accessible action and pure success rules before a renderer is added. Do not introduce shared-engine conditions for a particular actor or plot. Changes to a save shape need a new save version and an explicit migration. Changes to shipping stories or release thresholds require the separate release policy and human evidence workflow; a story author cannot weaken acceptance criteria through content metadata.
