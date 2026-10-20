# Small Hours / Memorable Moments — next iteration

**20 October 2026. Provisional pending the incoming research announced by the project lead.** Review the new records before settling this plan. The next useful step is an unchanged-build real-pair pilot, followed by one observation-driven change. More scenes would not answer whether both people actually make the moment.

## Product proposition

**Why play, hypothesis:** an easy invitation to spend a short, playful break with someone already nearby. The possible reward is noticing something together and recognizing both contributions in the result.

**Difference to test:** two people, one browser screen, private choices, an activity away from the screen, then a jointly owned keepsake. Compare this occasion with party scoring, dexterity coordination and creative toys. These ingredients have precedents; neither market uniqueness nor demand is established.

**Signature:** “Only the two of us could have made this.” This is a proposed experience, not a participant quote. The current game may already support it; test that before redesigning it.

## Current journey and open questions

| Stage | Observed implementation | Human question still open |
|---|---|---|
| Entry | Pair mode and explicitly labeled solo rehearsal; three scene choices. | Do two people agree to join without a facilitator explaining the occasion? |
| Private turns | A chooses and predicts B; curtain; B chooses and predicts A. Prediction is mandatory to seal. | Is guessing playful anticipation or an unwanted test of the relationship? |
| Reveal | Both confirm readiness; choices and prediction outcomes appear together. | Do both recognize their contribution and want to continue? |
| Shared activity | The scene’s main activity stays fixed; each selected choice supplies a role-specific prompt. Optional timer never forces an exit. | Does the activity happen offscreen, with both people contributing? |
| Keepsake | Each may write a detail; the card and SVG contain those lines with a scene title/stamp. Earlier choices are not directly rendered in the export. | Does the artifact recall their specific moment? Is writing welcome? |
| Exit/return | Optional save/replay, next scene suggestion, End & forget; reload clears the session. | Do they voluntarily keep, retell or repeat? A scripted replay cannot answer this. |

Sources: [private/reveal/action views](https://github.com/PaperStrange/IndiaGames/blob/822366ad3eb309f7009bb7a05e26cddfb466422f/memorable-moments-game/play/views.js#L19), [mandatory prediction and export](https://github.com/PaperStrange/IndiaGames/blob/822366ad3eb309f7009bb7a05e26cddfb466422f/memorable-moments-game/play/state.js#L10), [timer and transitions](https://github.com/PaperStrange/IndiaGames/blob/822366ad3eb309f7009bb7a05e26cddfb466422f/memorable-moments-game/play/game.js#L32).

The default route takes twelve button activations from Start to the shared activity, without changing the selected scene. That is a source/trace count, not evidence that humans find it excessive. The warm table/window illustration and paper card establish a coherent setting. The next art question is whether the result visibly belongs to these two people, not whether another decorative illustration can be added.

## What the research changes

The current required Small Hours set has **0/6 titles with core gameplay evidence**: Make it Meme stops at the solo lobby/two-player gate; M2–M6 are source-only/unplayed. Different Strokes reached gallery exploration but not painting or reciprocal creation. Neither supplies evidence that a co-created keepsake is rewarding. See the [audit](evidence-audit.md).

The strongest immediate uncertainty is therefore social behavior in our own existing slice. Incoming records may change the comparison or the priority. Keep the six-title/four-family study requirement open; do not use this pilot as a replacement for the missing competitor journeys.

## Bounded experiment and decisions

After plan settlement, recruit **six willing pairs**, preserving the [existing formative gates](https://github.com/PaperStrange/IndiaGames/blob/822366ad3eb309f7009bb7a05e26cddfb466422f/memorable-moments-game/docs/gamejam-2026-10-05.md#L96). Observe the unchanged build first: entry, private turns, reveal, actual activity, writing, save/leave and optional repeat. Record assistance and stopping; do not ask people to save. Do not collect their keepsakes by default.

- At least **5/6 pairs reach reveal without help**; otherwise prioritize the confusing handoff.
- At least **4/6 pairs have both people contribute**; otherwise reconsider the mutual-creation proposition.
- At least **3/6 pairs voluntarily save or replay** is a provisional reason to continue, not retention proof.
- Record whether guessing adds a welcome surprise, and whether optional writing prevents a satisfying finish. These qualitative observations select the next change; they do not establish causation.

Choose **one** conditional variant: optional prediction if guessing is the observed friction; clearer complementary action prompts if one person carries the activity; or a recognizably joint, editable keepsake if the activity works but the ending does not. Compare that variant with the unchanged build using fresh pairs or a declared counterbalanced order; report the actual sample and learning effects. If the underlying activity is not wanted, revise or stop rather than optimizing export.

## Proposed task cards

Owners are proposed roles. Estimates are focused person-hours, excluding recruitment, competitor research and waiting for new records. Conditional cards are not all mandatory features.

| ID | Proposed owner | Deliverable and dependency | Acceptance criteria | Estimate |
|---|---|---|---|---|
| MM-01 | Research lead + Small Hours designer | Intake new records, settle the pilot protocol; depends TEAM-01 | Evidence delta and roster gaps documented; neutral questions and six-pair observation sheet prepared; no agent reflection becomes participant testimony. | 2–3 h |
| MM-02 | Human playtest lead | Observe six real pairs on unchanged source; depends MM-01 and recruitment | Record both contributions, assistance, stopping, actual keep/replay choice and device/build; apply all three diagnostic gates; select one change or a no-change/stop decision with reasons. | 4–6 h |
| MM-03 | Rules/interaction owner | Implement only the selected flow/action change, if justified; depends MM-02 | Written observation→change hypothesis; optional guessing does not invent a prediction, or revised roles preserve both contributions; privacy curtains, solo labels and stop controls remain coherent. Mark skipped if no flow change was selected. | 3–5 h conditional |
| MM-04 | Visual/content owner | Address the selected prompt/keepsake issue, if justified; depends MM-02, coordinate MM-03 | Both contributions remain recognizable; empty text remains valid; any edit-before-save preserves agreement and escaping; seated/imaginary alternatives remain. Do not add unrelated art or scenes. Mark skipped if not needed. | 3–5 h conditional |
| MM-05 | QA + integration owner | Integrate the selected variant and verify; depends disposition of MM-03/MM-04 | Existing 33 checks pass or documented updates match the chosen behavior; affected keyboard, touch, hidden-turn DOM, export, replay and reset paths checked. Record exact source and fresh evidence. If unchanged, reuse this review’s results and document that fact. | 2–3 h |
| MM-06 | Human playtest lead + designer | Observe selected variant and decide; depends MM-05 and recruitment | Predeclare sample/order and the targeted behavior; record actual comparison, contrary evidence and advance/revise/stop. If no variant was chosen, close with the MM-02 decision instead of manufacturing a comparison. | 4–6 h conditional |

The full conditional path is **18–28 person-hours**; the initial protocol/pilot decision is **6–9 hours**, plus recruitment and evidence intake. Preserve the [module ownership contract](https://github.com/PaperStrange/IndiaGames/blob/822366ad3eb309f7009bb7a05e26cddfb466422f/memorable-moments-game/docs/COLLABORATION.md#L5): content in `content.js`, rules/export in `state.js`, event adapter in `game.js`, presentation in `views.js`/CSS. One integrator owns shared transitions.

Defer accounts, remote multiplayer, AI partners, photo capture, more scenes, analytics services and native ports. Existing handoff curtains provide visual courtesy, not secure storage.

## Fresh verification

The reviewer exported `822366ad3eb309f7009bb7a05e26cddfb466422f` and reran the existing browser suite: **33 assertions passed**, recorded at `2026-10-20T15:11:12.948Z`. Desktop ending/mobile choices were visually inspected. `play/` and `tests/` are unchanged from manifest source `f8b725d2ce3038a38c0b49dce564bc0c7b0856d0`.

The coordinator independently checked the saved trace, selected capture and relevant source. The raw trace’s “research report, no playable path” baseline sentence is hardcoded historical copy; it describes the original research-page comparison, **not the current branch’s availability**. The trace itself completes the playable journey.

These checks used synthetic input in Chromium, including emulated phone/iframe viewports. They do not establish real pair play, audio experience, physical-device behavior, accessibility for all users or fun.
