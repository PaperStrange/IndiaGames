# Six browser-game observations for Borrowed Words

These are **agent-operated sessions on launched public games**, conducted on November 14, 2026. They are not human playtests, release qualification or evidence of population-wide enjoyment. Each record preserves the complete attempted journey to its stated stopping point, with actual actions, uncertainty, selected screenshots and separate player/designer/art/operator criticism.

The sample deliberately crosses idle discovery, branching character fiction, procedural decisions, psychological hypertext, court management and mediated observation. It is a comparison set for specific design questions, not an exhaustive market study or proof that the new game is unique.

## What was actually played

| Record | Observed gameplay and endpoint | What is not established |
|---|---|---|
| [A Dark Room](a-dark-room/README.md) | Fire → stranger → forest → trap/cart investment → improved gathering, plus two optional events. Bounded opening completed. | Settlement/exploration/endgame, long-term retention or full-game completion. |
| [Birdland](birdland/README.md) | Opening letter, first dream, visible mood outcomes and the complete first waking canoe scene; stopped on entering the midday scene. | The rest of the story, alternate routes or a full-story ending. |
| [Seedship](seedship/README.md) | One completed three-planet mission: scanner sacrifices, a deliberate compromised settlement, 850 settlers, a medieval egalitarian republic and its saved history row. | Optimal play, balance across random runs, another mission or cross-session persistence. |
| [The Uncle Who Works for Nintendo](uncle-nintendo/README.md) | Arrival, relational choices, household exploration and clock checks; stopped at the fictional 10:00 p.m. after challenging the uncle story and observing the friend's withdrawal. | Midnight, a complete ending or every relationship route. |
| [Sort the Court!](sort-the-court/README.md) | Queen introduction, day-one petition choices, visible population/happiness/wealth changes, day summary and population growth. | A completed campaign, long-term economy or all petition consequences. |
| [We Become What We Behold](we-become/README.md) | Initial ordinary/missed captures and headlines, followed by a separate replay with pixel-only targeting assistance: “OOH NICE HAT” and six figures subsequently wearing hats around the television. | Later polarization, an ending or an unaided first-run successful hat capture. |

All six were reached through their public browser UI. Some embedded routes were blank in this environment and required opening the same publicly served game frame directly. That is recorded as an entry-route observation, not silently hidden. Source commit identities were not established for live third-party builds. Session timestamps include tool latency and, for the left group, interleaved play; they are not human completion-time measurements.

No game rules or hidden state were changed to obtain outcomes, and no timers were accelerated. Automated pointer support, repeat attempts, inaccessible controls and partial progress belong in their owning record. This method can reveal interface and consequence behavior; it cannot reproduce an unbriefed person's feelings or establish a game's commercial appeal.

## Criticism across roles

| Perspective | What the attempted journeys exposed | Consequence for our game |
|---|---|---|
| Player | A small action can create curiosity when its result is unmistakable. Expressive answers can be worthwhile without a correct solution. A visible past choice can make a later outcome understandable. | Let the first phrase change the immediate reply. Offer understandable intentions and a record the player can revisit. Test whether acceptance and correction both have a plausible appeal. |
| Designer | Seedship's bounded sacrifices and retrospective colony account differ from Birdland's expressive dialogue and mood-linked options. Repetition in an idle game serves a different rhythm from a short chapter. | Use three changing exchanges, direct consequences and specific ending callbacks. No hidden trust score, forced waiting, arbitrary free-text parser or imported economy. |
| Art and interaction | Typography, portraits, spatial separation and persistent ledgers can carry meaning without complex animation. Long payoff blocks can interrupt a previously brisk choice rhythm. | Keep original and interpretation visibly separate; use restrained materials, compact passages, optional immediate reveal and equivalent keyboard/touch targets. |
| Operator | Entry URLs can drift; embeds may fail; a same-session saved indicator does not prove durable or cross-device storage. Canvas or moving-target interaction changes what automation can fairly observe. | Verify actual hosted paths and served bytes. State local-only saving truthfully, preserve failed checks, and distinguish viewports from actual devices. |

These are agent interpretations of concrete observations. They remain hypotheses for human review when transferred to Borrowed Words.

## Evidence → implementation decisions

| Observed example | Implemented decision | Still to learn from people |
|---|---|---|
| A Dark Room's first fire action changes title/state before later narrative expansion. | A submitted intention produces its own reply and visible consequence within the exchange. | Whether the change is noticed and creates curiosity. |
| Birdland expresses character through small answers, then exposes the dream/mood/later-action connection. | Distinct authored intentions, later arrival variants and eight prior-resolution ending contexts; no unexplained hidden tally. | Whether a player can explain a particular connection without coaching. |
| Seedship separates investigation from the final colony commitment and explains earlier compromises in the ending. | Reversible marking/inspection, explicit submission and resolution, then a retained transcript of exact choices and consequences. | Whether the final artifact is worth keeping or revisiting. |
| Uncle Nintendo separates optional inspection from advancement and establishes relationship before threat. | Opening the original record commits nothing. Voice and boundary choices precede the last exchange. | Whether recovery is discoverable and uncertainty concerns the correspondent rather than the interface. |
| Sort the Court separates choice from continuation and keeps its ledger visible. | Send, resolve and turn-page are separate steps; original and outcome remain available together. Both resolutions have equal visual weight. | Whether the loop feels like a conversation rather than administrative confirmation. |
| WBWWB turns a chosen frame into an editorial headline, then the successful hat capture is followed by visible imitation. Ordinary captures receive dismissive captions. | Keep the player's original separate from the correspondent's interpretation, and carry resolutions into later page text. Neither a quiet boundary nor acceptance is rejected as an invalid answer. | Whether the invitation to accept a claim has real narrative appeal, rather than acting as an obvious wrong answer. |

Independent story review also removed a sentence prescribing the player's fear and gave the two paths a concrete tradeoff: ready companionship versus authority over one's account. The real original is preserved on both paths. A ten-to-fifteen-minute chapter remains a target, not a measured duration; no artificial delay was added to meet it.

## Published criticism and evidence boundaries

The individual records link and compare published criticism with the actual run. For example, A Dark Room's expanding interface is compared with Michael Thomsen's New Yorker discussion; Birdland's expressive choices and occasional long blocks with Greg Buchanan's IFDB review; Seedship's consequence-rich colony endings and chance with Eloquence's lib.reviews article. Those authors' whole-game, enjoyment, commercial or timing conclusions are not adopted as our own measurements.

Critic reading and gameplay are distinct sources. These sessions were not blinded studies, and selected screenshots are not substitutes for their journey logs. Private action/DOM/capture sequences, failed attempts and source hashes remain in the task backup; only reviewed records and selected evidence are filed here.

See the [authored chapter and intended player journey](../notebook-game-2026-11-14/story.md) for the proposed experience, and the [language contract](../notebook-game-2026-11-14/localization.md) for translation review. Human understanding, enjoyment, fluent meaning and physical-device comfort remain pending.
