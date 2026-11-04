# Game demo design template kit

Copy this folder into a new game's documentation, keep one implementation branch per game, and fill the prompts with decisions and evidence. These documents are **templates, not observed results**. Leave unknown fields visibly unknown. The kit is reusable for browser games and can be adapted for other devices after their constraints are tested.

## Use in order

| Template | Decision it supports |
|---|---|
| [01 · Concept](01-CONCEPT.md) | Whom the game serves, why someone would play, and the smallest distinctive experience to test |
| [02 · Player journey](02-PLAYER-JOURNEY.md) | What a person actually does, understands and experiences from entry through stopping/return |
| [03 · Systems contract](03-SYSTEMS-CONTRACT.md) | State, choices, consequences, persistence and interfaces the team can build independently |
| [04 · Art and UX](04-ART-UX.md) | How composition, objects, motion and sound communicate playable information |
| [05 · Evidence and competitors](05-EVIDENCE.md) | What was tested, what remains a hypothesis and whether comparisons cover different experiences |
| [06 · Playtest protocol](06-PLAYTEST.md) | A neutral session that can contradict the design hypothesis |
| [06A · Human session record](06A-HUMAN-SESSION.md) | Blank firsthand journey, assistance, metric evidence and device record; copy privately for each actual session |
| [07 · Task and handoff](07-TASK-HANDOFF.md) | Work an agent or teammate can take without guessing the contract |
| [08 · Release and decision](08-RELEASE-DECISION.md) | Whether to advance, revise or stop, with reproducible verification and backups |

Start with one complete player arc and one consequential choice. Decide the core experiment before selecting technology. Use source/critic research to frame questions; use declared gameplay journeys and human sessions for claims that require them. For this project, retain the six-title/four-family comparison requirement; do not silently inherit a universal sample-size rule for unrelated projects.

## Suggested project structure

```text
game/
  index.html
  styles/
  src/
    state.js       Pure state transitions and invariant checks
    content.js     Authored scene/choice records with stable IDs
    input.js       Keyboard, pointer and touch adapters
    render.js      Presentation of current state
    storage.js     Optional explicit persistence boundary
  assets/          Owned/licensed art and audio with provenance
  tests/           Tests for actual rules and observable journeys
  docs/            Filled design templates, decisions and evidence
```

This is an ownership map, not a framework prescription or implemented starter game. A tiny game may combine modules if ownership remains clear. Agree on the state/content interface before parallel implementation; designate one integrator for shared files. Keep player-authored text out of HTML interpretation and keep credentials off the client.

The existing [Small Hours collaboration contract](https://github.com/PaperStrange/IndiaGames/blob/875230b1619482e485b71441bcc551edea613438/memorable-moments-game/docs/COLLABORATION.md) shows an applied version and links its reviewed GitHub architecture references. Those references informed boundaries; this kit does not copy their code or assets.

## Definition of ready

The concept names a player need, a supported action and an observable consequence. The journey includes stopping and recovery. The evidence ledger labels missing observations. The state and visual contracts agree. The proposed task has a falsifying observation, file owner and acceptance check. The project lead has settled the experiment before gameplay implementation.
