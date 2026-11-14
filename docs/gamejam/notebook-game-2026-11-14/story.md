# Borrowed Words — authored chapter and player journey

Game edition: **Tom's Notebook 0.1.0**. Story ID: `borrowed-words`, revision 1. One shipping unit: `toms-notebook`. This is separate from Enchanted Notebook product `0.4.0-alpha.0` and does not complete that product's MC backlog.

The owner selected an **unsettling psychological authored adventure** and a separate six-player fresh solo study. The chapter has three exchanges, two endings and eight ending-context paragraphs. The 10–15 minute duration is a design target, not an observed human completion time. Player-facing copy says only “one short chapter”; animation can be skipped.

## Why this game, and what is distinctive?

These are design hypotheses, not findings about human demand or enjoyment:

| Question | Hypothesis | Observation that would challenge it |
|---|---|---|
| Why play? | The intimacy of receiving a reply and the uncertainty of its interpretation can make a small writing ritual compelling. | Players treat each passage as a test with an obvious correct answer, skim every reply, or stop without curiosity. |
| How does it differ on a browser game platform? | A brief, self-contained answering diary offers immediate authored consequences without accounts, provider keys or free-text guessing. | Players still expect arbitrary AI answers, or see only a linear quiz with decorative paper. |
| What experience is unusual? | The story attempts to reinterpret the player's words while the interface preserves the exact original. Comparing, allowing and correcting become narrative actions. | Players cannot locate the original, cannot distinguish it from a translated gloss, or cannot connect their decision to the next page. |

The intended tradeoff is **ready companionship versus authority over one's account**. Accepting the notebook's explanation may provide warmth, a greeting and an easy continuation. Correcting it retains a boundary while making the voice more formal or leaving silence. Neither ending is scored as good/bad or win/loss. The fiction cannot delete or silently rewrite actual source records.

## Chapter structure

| Exchange | Two authored intentions | Notebook's reinterpretation | Decision and later effect |
|---|---|---|---|
| `doorway` | Keep the door closed / permit one knock | A boundary becomes postponement / a knock becomes entry | Accept an expanded invitation or retain its exact limit. The next page either calls the exchange an agreement or leaves space around a correction. |
| `name` | Use a temporary borrowed name / leave a name blank | A chosen role gains an invented past / an absent name becomes exclusive witnesshood | Allow a ready-made familiarity or retain what was actually supplied. The last page either speaks as “we” or keeps distinct hands. |
| `record` | Keep both accounts / lend only the last line | Coexistence becomes interpretive authority / a limited loan becomes permission to continue | Allow the notebook's last explanation or keep the original limit. This selects Borrowed Hand or Own Hand. |

`accept` and `correct` are internal semantic IDs, not value judgments about the player. Every chosen intention has its own complete original, reply and two consequence paragraphs. The first two resolutions select one of four context paragraphs within each ending. The final record also contains the actual phrases, replies and consequences from this run, so a change is traceable to its source rather than an unexplained trust score.

Default cast roles are **Keeper** and **Correspondent**. They are original role labels, not rewrites of the notebook application's existing companion characters. Text avoids gendered agreement and uses second-person address. Story/cast/action/message identities live in the content module, independently of the renderer and translations.

## Narrative method

The owner's earlier reference to **What Remains of Edith Finch** remains a methodological influence: let interaction express a viewpoint, let a material object carry a story, and change an action's meaning when the viewpoint calls for it. This is design inspiration, not a newly played seventh competitor or an assertion that this short chapter reproduces that game's emotional effect.

Here, the red ribbon separates two accounts, the marked phrase expresses a limit, and the act of comparing the original makes authorship playable. Repeating the same physical exchange changes meaning from an entrance, to an identity, to authority over the next page. Additional mechanics would need to serve another viewpoint; no unrelated minigame or decorative mechanic was added simply for variety. Original text, cast roles and bounded actions keep the chapter coherent while its story/cast data remain replaceable.

## Intended player journey

| Stage | Player goal | Actual action and feedback | Friction or uncertainty to observe |
|---|---|---|---|
| Cover | Understand what kind of conversation this is | Read authored-story notice; choose language, motion and optional local saving | Expectation of live AI; whether setup distracts from entry |
| First mark | Express a small boundary | Select/circle/strike an authored phrase, inspect it, explicitly send | Confusion about whether drawing or free-form writing is required |
| Answer | Understand what changed | Read a specific altered interpretation; reveal can be skipped | Whether the change is noticed without coaching |
| Comparison | Check the notebook's claim | Open retained original beside the reply; inspection commits nothing | Discoverability, readability and whether source/reply are confused |
| Resolution | Decide which account continues | Let the account stand or retain original meaning; immediate consequence follows | Whether acceptance has a plausible appeal and correction has a perceptible cost |
| Later pages | See that earlier decisions mattered | Changed arrival paragraph, source-specific outcome and final pattern callback | Whether callbacks feel earned rather than arbitrary |
| Closure | Keep, revisit or leave | Read either ending; inspect full record; optionally export/replay/forget | Voluntary continuation versus prompted compliance; truthful save expectations |

Circle/strike are explicit tools for authored targets. They are not shape or handwriting recognition. Pointer, touch and keyboard choices must produce identical semantic intentions. No real name, personal disclosure or typing is required to complete the chapter. No automatic timer can fail a player. Closing or inspecting does not silently choose a resolution.

## Research integration and development freeze

The technical chapter's narrative decisions were frozen on November 14 after observations from all six planned games were received. The [six-game research index](../competitor-plays-2026-11-14/README.md) links the actual attempted journeys, their exact stopping points, critic comparisons and limitations. These are agent-operated browser observations, not human study results or proof that Borrowed Words is enjoyable:

- **A Dark Room:** the first fire action visibly changes its local state; later repetition introduces a narrative question. Application here: the first submitted phrase produces a visibly different reply and consequence, rather than waiting until the ending to acknowledge it. The observed opening did not reach the full game's ending.
- **Birdland:** small expressive choices precede stronger consequences; later moods/actions make prior choices legible. Application here: complete message variants connect earlier resolutions to later arrival and ending text without a hidden trust score. Keep consequence paragraphs compact. The first dream-to-waking loop was played, not the whole story.
- **Seedship:** chosen sacrifices produce bounded visible costs, and one completed mission explains its settlement consequences. Application here: acceptance supplies company while shifting narrative authority; correction preserves a limit while reducing warmth. The real record stays intact on either path, and the ending retains specific earlier choices.
- **The Uncle Who Works for Nintendo:** optional inspection returns to the same passage while a different action advances; small relational decisions precede tension. Application here: original-record inspection and the irreversible resolution remain separate controls. The observed route stopped at 10:00 p.m., before midnight or an ending.
- **Sort the Court!:** a completed first day separates petition choice, acknowledgement and continuation, with visible population/happiness/wealth outcomes. Application here: send, resolve and turn-page remain distinct, with the retained source and consequence available together. Equal visual weight avoids presenting correction as a scored moral answer.
- **We Become What We Behold:** actual captures become editorial headlines; in a separately identified pixel-assisted replay, a hat photograph is followed by visible imitation. Application here: keep original and reinterpretation separate, and make later text acknowledge the chosen account. The run did not establish later polarization or an ending. A quiet response remains a valid path in our game rather than being rejected as uninteresting.

Independent review removed a sentence prescribing how the player should feel and added concrete costs/rewards to both resolutions. The chapter remains a development preview pending human qualification; a design freeze is not a claim of fluent review, physical-device acceptance, measured duration or enjoyment.

## Human review boundaries

The proposed product criterion is four of the first six preregistered fresh solo players jointly finishing unaided and correctly explaining one edit-to-reply/ending consequence. The responsible human reviewer must adopt the protocol before qualifying sessions. Do not coach towards Own Hand, discard failed attempts, or treat a replay as a new fresh observation.

Observe spontaneous comparison, original recovery, interest in either resolution, mistaken live-AI expectations, voluntary continuation and exact words explaining a consequence. Preserve contrary findings, assistance and departures. Translation fluency, physical-device qualification, neutral scoring and final independent approval remain separate; no story document establishes those passes.
