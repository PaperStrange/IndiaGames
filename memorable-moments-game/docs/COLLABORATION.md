# Cooperative development contract

One game, one branch: `memorable-moments-game`. Work only in this worktree. Keep the historical research separate from today's implementation and observations. The coordinator owns cross-game comparisons, shared backups, and remote sync; this agent does not push unreviewed work.

| Owner boundary | Files | Contract |
| --- | --- | --- |
| Content / player experience | `play/content.js` | Stable scene and choice IDs; exactly three concrete choices per current scene; an accessible imaginary/seated alternative. No personal-disclosure demand. |
| Rules / session | `play/state.js` | Pure choice and seal operations; validate stage and choice IDs; export escaping; ephemeral session policy. Do not introduce persistence without updating player copy and tests. |
| Interaction | `play/game.js` | DOM event adapter, explicit stage transitions, optional wall-clock timer, download, teardown. Keyboard and touch call the same actions. |
| Presentation | `play/views.js`, `play/style.css`, `play/icons.js` | Render only current-stage information. Escape every player-authored string. Preserve text labels and reduced-motion support. Keep authored vector art local. |
| QA | `tests/browser.mjs`, `docs/evidence/` | Exercise behavior through the UI; record replayable actions and screenshots. Label simulation vs. real device vs. human observation. |

The renderer currently receives the full in-memory state and selects only fields appropriate to the current stage. This is a visual privacy boundary, not a secure process boundary. Never claim encryption or protection from the device owner.

Add scenes in `content.js`; do not put a competing copy of the scene into a view. Any future variable number of choices or scenes needs the replay contract updated too (the current replay cycles three scenes). Propose a state transition before changing both state and interaction files; designate one agent as the transition owner. CSS edits can proceed independently when labels and `data-action` selectors stay stable. Avoid two agents editing the same file concurrently.

## Source-code lessons used

The research teammate inspected pinned GitHub source. These are structural lessons, not copied implementations or assets:

- [A Dark Room state manager](https://github.com/doublespeakgames/adarkroom/blob/1fada4620b6c66bd07bf15a3f1eb8223df8bc1d7/script/state_manager.js) and [event content](https://github.com/doublespeakgames/adarkroom/blob/1fada4620b6c66bd07bf15a3f1eb8223df8bc1d7/script/events/room.js): centralize state ownership and give scene authors stable content records. Do not inherit legacy globals or `eval` path handling. MPL 2.0 source was read, not incorporated.
- [Hextris input](https://github.com/Hextris/hextris/blob/3f4847dc8fd7dab3d1c87e6324b9159d92fbd396/js/input.js), [update](https://github.com/Hextris/hextris/blob/3f4847dc8fd7dab3d1c87e6324b9159d92fbd396/js/update.js), and [render](https://github.com/Hextris/hextris/blob/3f4847dc8fd7dab3d1c87e6324b9159d92fbd396/js/render.js): separate input adapters from rules and drawing, while recognizing that separate files alone do not remove coupling. GPL code was read, not incorporated.
- [inkjs browser template](https://github.com/y-lohse/inkjs/blob/6b1153410ab1c4bcfd9ef04eb2f0107f36be7778/templates/browser_serverless/main.js): separate authored story/choices from the browser renderer, honor reduced motion, and establish documented checkout verification. MIT template was read, not incorporated. This game's user-authored prose must be escaped even when trusted authored content is rendered from templates.

## Review, backup, and merge rhythm

1. Commit a working vertical slice with its reproducible browser command.
2. Commit observed journey, test-caused fixes, and compact evidence at the next meaningful milestone. Do not count unrun checks as passing.
3. Coordinator reviews the branch and bundles/backups all game refs, then pushes this game branch to the existing remote. Avoid shared branch resets and force pushes.
4. Before integration, run this game's browser checks against the exact files being reviewed. If only prose changed, check links/copy instead of repeating gameplay tests without a reason.

For a fresh browser package, include every file under `play/`; exclude research and evidence if size matters. No bundler is required. Do not silently switch to a native capture product: browser-first is the current user direction.
