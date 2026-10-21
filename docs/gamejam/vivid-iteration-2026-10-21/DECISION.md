# Vivid iteration: an anthology of actions that carry meaning

Accepted direction implemented on `vivid-2.5d-photo-game`. Technical release ID remains `keepers-frame`; dashboard lane remains `vivid`. Iona and Mara are two stories inside this game, not additional game branches. This record supersedes the earlier return-only scope in KF-01–KF-16; historical plans and gameplay evidence remain available.

## Product questions and falsifiable hypotheses

| Question | Current design answer | What would weaken it? |
|---|---|---|
| Why might someone play? | A quiet, short browser visit offers curiosity, a manageable act of care and a specific consequence. Helping a frightened keeper steady a lamp, or recognizing an invitation in an unfinished postcard, makes attention useful. | Players cannot explain what their action changed, feel that prose could replace every input, or leave before finding a meaningful action. Attractive art alone would not validate this hypothesis. |
| Why choose this over a competitor? | A self-contained anthology opens without account creation, works through touch or keyboard, and gives each story its own physical verb. Its substitute is any short, satisfying browser narrative or making activity; breadth of content and spectacle are currently weaker than established games. | Other games deliver the same payoff with less instruction or friction. Browser access alone is not differentiation. A portrait that suggests unrestricted AI conversation creates a false promise. |
| What distinctive experience can we deliver? | A place remembers **the consequence of care**: the private letter and approved public dedication lead to different objects and places on a later visit. Mara demonstrates another structure: arrange evidence until an abandoned room becomes a future workshop. These are specific combinations, not a claim that no other game has ever done them. | Remembered and neutral returns feel equivalent, players recall only the picture, or the second story needs story-name conditionals in the engine. |

Audience assumption: people choosing a short, reflective browser experience, initially on desktop and touch browsers. Duration labels are authored content estimates, not observed human completion times. No demand, enjoyment, retention or market-share claim has been established. Agent gameplay, automated QA and human participant evidence are three different evidence types.

## Journey and meaning

**A Place for the Promise:** choose the portrait → lean around the frame → collect the two harbour marks → choose a signal from that evidence → see the ferry answer → enter an explicitly earlier watch → latch the lamp shade → fit the wedge → return to the same worn notch with new context → read the offered letter if desired → keep it private or approve a short dedication → later place the corresponding object → leave a persistent arrangement. Wrong signals are safe; no countdown or held-button endurance is needed. Both choices receive care. A premature reading remains acknowledged on both routes.

Old `keepers-frame:v1` archive memories really did publish the letter. Migration says so; the new dedication does not rewrite that history. Completed memories do not restart the rescue. A legacy player may optionally hear the new recollection. The neutral study profile has the same first rescue/recollection, then a comparable cleaning-cloth placement without a reference to the earlier choice.

**The Unfinished Postcard:** choose a workbench → examine a cancelled timetable, paint-marked postcard and architectural sheets in any order → align the two sheets using a slider, steps or keyboard → see the waiting room become a community workshop → choose an interpretation of the invitation → leave the image completed. Interpretation is not graded. No rescue, talking portrait or return-choice framework is required.

The narrative method draws on Edith Finch's use of a character-specific action and a concrete environment whose meaning changes through participation. We read developer accounts; we have not played Edith Finch here. We borrow neither plot nor art, and do not equate this short prototype with that game's production quality. The lamp's repair carries the recollection; the workshop drawing carries Mara's reveal. Each action has a beginning, an accepted change and a visible ending.

## Architecture and production choices

Three.js 0.186.1 and Vite 8.3.4 are pinned, with Blender 4.3.2 source exports and original painted SVGs. This translates the creator's reported 3D asset workflow into a small browser runtime with accessible HTML controls. It does not claim that the linked Little Prince project used Three.js. No remote model, generated dialogue, user-photo service, voice service or runtime CDN is needed.

Each lazy story pack declares cast, assets, authored content, presentation and a pure state interface. Writers edit structured content; coding agents implement a new mechanic behind the same interface. The development-only recast fixture demonstrates replaceable names, pronouns and descriptions, and is excluded from the shipping catalog. A visual story editor is out of this iteration.

The shared runtime owns persistence, validated loading and recovery. Input modules own inspect/choose/place/adjust controls. Renderers consume the same view model and cannot grant story success. Pointer movement previews a bounded camera tilt; explicit view controls select discoverable evidence. Placement has drag and select-then-tap equivalents. Rendering failure keeps the story playable in the flat illustration.

Per-story/profile semantic checkpoints preserve choices and object placement, not animation positions. Unknown future or malformed saves remain untouched until explicit recovery or forgetting. A failed story load leaves the collection usable. Story switches dispose the renderer and input session; stale callbacks cannot activate an old story.

## Ownership and delivery

Root integrates UI, browser journeys, release staging and dashboard. Separate agents own story packs, runtime/validation, art/rendering, research A, research B and release tooling. File ownership was agreed before parallel changes; the working contract is preserved in `TEAM-CONTRACT.md`. Automated results and observed limitations accompany each handoff.

The game branch receives source checkpoints; master receives only a versioned build packet. Main remains the official hub. New release-policy changes receive their own review, separate from game promotion. An empty human report is deliberately pending. No official version, release tag or promotion is created by automated play.

Targets: selected experience cold-load ≤8 MiB, active geometry ≤100,000 triangles, DPR capped at 1.5, and 30 FPS on actual physical phones. Build size and scene inventory can be measured here; physical-phone performance and real player outcomes remain unverified. See the human-study preparation documents for the 18-person target, minimum 12-person release cohorts and independent review.
