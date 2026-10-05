# Companion Integration Notes

Project: Build Interactive Demo  
Artifact: companion profile registry and runtime contract  
Status: implementation-ready proposal

## 1. Product behavior

The companion is a persistent profile, not a separate conversation screen. The user selects one identity, then encounters that identity through handwritten notes, margin marks, diagrams, route overlays, recipe cards, or creative flourishes inside the notebook.

The active identity is shared across notebooks. Context and factual knowledge are not automatically shared: the default retrieval scope is the current notebook. The user can enable cross-notebook retrieval and should be able to see which source blocks were used.

The original role card remains the world engine. The companion is a participant and interface layer around that engine. It can:

- explain or teach;
- reflect on a note;
- suggest a quest, route, recipe, or experiment;
- simulate a debate or tactical situation;
- propose a memory;
- propose an NPC, faction, relationship, or quest-state update.

It cannot:

- make the user's protagonist act;
- learn spells that are not in the protagonist's spell library;
- overwrite original handwriting;
- directly mutate world state;
- silently turn an inference into a fact;
- claim a relationship or memory that has not been created by an interaction.

## 2. Runtime data model

The profile data lives in companion_profiles.json. Keep the model-facing behavior separate from rendering and provider connection code.

~~~text
CompanionRegistry
  profileId
  identity
  voice
  behavior
  memoryPolicy
  triggerPolicy
  renderHints
  toolPolicy

CompanionSession
  profileId
  userId
  relationshipState
  durablePreferences
  notebookId
  notebookMemory
  crossNotebookRetrieval
  lastInteraction

CompanionResponse
  profileId
  intent
  confidence
  observedText
  responseText
  placementHint
  handwritingHint
  referencedSources
  memoryProposal
  worldStateProposal
  followUpQuestion
  actions
~~~

CompanionRegistry is static profile configuration. CompanionSession is user-specific state. CompanionResponse is an ephemeral event that the renderer and validator consume separately.

## 3. Event contract

Use separate streams for workflow progress, answer text, and media completion:

~~~text
companion.workflow.started
companion.ocr.progress
companion.context.ready
companion.answer.delta
companion.answer.completed
companion.render.started
companion.render.completed
companion.memory.proposed
companion.world_state.proposed
companion.workflow.failed
~~~

An OCR or provider failure must leave the user's ink intact and must not block further writing. A stale OCR result must be discarded when a newer input sequence supersedes it.

## 4. Trigger policy

The profile registry should support both implicit and explicit interaction:

~~~json
{
  "implicit": {
    "onPause": true,
    "minimumPauseMs": 1400,
    "startFromInputEnd": true,
    "fadeStatusAfterMs": 5000
  },
  "explicit": [
    "write_to_companion",
    "send_thought",
    "ask_for_route",
    "challenge_this",
    "make_a_recipe"
  ],
  "quietHours": false
}
~~~

The actual threshold can be tuned by profile and device. On an e-ink device, prefer fewer, more deliberate responses; on a tablet, allow richer placement and animation.

## 5. Memory policy

Memory should be represented as proposals before commitment:

~~~json
{
  "type": "user_preference",
  "summary": "The user prefers short study explanations with one example.",
  "scope": "user",
  "sourceBlockIds": [
    "block-123"
  ],
  "confidence": 0.89,
  "reversible": true,
  "requiresReview": true
}
~~~

Suggested scopes:

- notebook: default for facts, projects, and world discoveries;
- user: stable preferences explicitly confirmed by the user;
- companion: relationship observations that affect the active profile;
- world: state changes that require world-engine validation.

Do not store raw OCR as a durable memory. Store the source stroke/block reference and the user's edited text when available.

## 6. World-state bridge

The source world contains fields for time, location, factions, quests, combat units, pets, spells, equipment, and an NPC registry. Companion output should map to proposals rather than direct JSON patches:

~~~json
{
  "kind": "relationship_update",
  "target": {
    "type": "npc",
    "name": "Example NPC"
  },
  "changes": {
    "relationship": "谨慎合作",
    "affinityDelta": 5
  },
  "reason": "The user helped the NPC escape a locked corridor.",
  "sourceBlockIds": [
    "block-456"
  ],
  "requiresWorldValidation": true
}
~~~

The validator checks the current world state, whether the NPC was actually present, whether the interaction occurred, and whether the requested change is compatible with the active timeline. This preserves the role card's rule that unobserved NPCs do not receive invented memories.

## 7. Profile selection flow

~~~mermaid
sequenceDiagram
    participant U as User
    participant UI as Profile picker
    participant R as Companion registry
    participant M as Memory layer
    participant N as Notebook renderer

    U->>UI: Select profile
    UI->>R: Load profileId
    R-->>UI: Identity, voice, render hints
    UI->>M: Open user and notebook scopes
    M-->>UI: Approved context only
    UI->>N: Write welcome note
    N-->>U: Handwritten companion presence
~~~

## 8. Visual implementation notes

The reference behavior suggests a responsive page-first canvas:

- desktop: two-page spread, profile card drawer, compact status rail;
- tablet: single page with a collapsible profile and status rail;
- phone: single page, bottom-sheet profile switcher, no persistent side panel;
- e-ink mode: reduced animation, high-contrast ink, delayed decorative flourishes.

The magical visual layer can use thick layered parchment, warm sheepskin texture, candle flicker, page-turn depth, and human-like response writing. These are rendering tokens, not model instructions.

Keep these concerns separate:

| Concern | Owner |
| --- | --- |
| profile identity and voice | Companion registry |
| user/notebook memory | Memory service |
| OCR and stroke sequence | Input pipeline |
| response content and semantic placement | Provider router |
| actual handwriting strokes and animation | Notebook renderer |
| world variable mutation | World-state validator |
| plugin/provider selection | Adapter registry |

## 9. Acceptance criteria for the first demo

1. The user can select a profile in under ten seconds.
2. The welcome note appears on the page, not in a chat modal.
3. Writing remains responsive while OCR and model calls run.
4. The profile responds from the end of the user's note and does not cover the original ink.
5. A user can inspect why a response appeared and which notebook blocks informed it.
6. A user can edit or reject a memory proposal.
7. Switching providers does not change the renderer contract.
8. The profile can be changed without losing notebook content.
9. The layout is usable on desktop, tablet, and phone widths.
10. At least one failure path leaves the original ink visible and recoverable.

## 10. Suggested build order

1. Load the registry and render six profile cards.
2. Implement persistent selection and the welcome note.
3. Add local stroke capture and non-blocking OCR status.
4. Add one structured response path using Orin's footnote behavior.
5. Generalize placement and handwriting hints to all profiles.
6. Add memory proposals with review, edit, and revert.
7. Add world-state proposals behind a validator.
8. Add provider/plugin routing and normalized streaming.
9. Verify desktop, tablet, phone, and reduced-motion/e-ink variants against the visual target.

