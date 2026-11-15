# IndiaGames · Four browser experiments

[Open the game dashboard](https://paperstrange.github.io/IndiaGames/) · [Team board](https://paperstrange.github.io/IndiaGames/#tasks) · [Design templates](templates/game-demo/README.md)

The **Overview** combines real game images, playtest readiness and the November timeline. The **Team board** keeps the historical tasks and dated readiness follow-ups, filters and acceptance details available without a long wall of cards. These are development views; no game has an approved official release yet.

| Game | Experience being tested | Current artifact | Human work still required |
|---|---|---|---|
| **Small Hours** · Memorable Moments | Two people make a brief shared activity their own. | Three-language development export verified; frozen study baseline retained | Six pairs |
| **Vivid** · formerly Keeper’s Frame | Two stories express meaning through different actions. | 0.2.0 multilingual development verified; frozen 0.1.4 retained | Six people per story, in separate cohorts |
| **The Thirteenth Bell** | Understanding a repeated event enables a meaningful intervention. | 0.2.0 multilingual development verified; frozen 0.1.0 retained | Six people, balanced comparison order |
| **Tom’s Notebook · ink redesign** | Preserve original ink and discover gameplay through the player’s own marks; research planned. | [0.1.0 comparison baseline](https://paperstrange.github.io/IndiaGames/development/toms-notebook/0.1.0/) retained; redesign not built | Revised core needs fitting study criteria and new exact-build evidence |

[Per-game checklists, recording templates and launch plans](docs/launch/2026-11-20/README.md#game-packets) include exact-artifact setup. GitHub source links open repository files; they are not browser play buttons. Repair of the older candidate Pages URL is paused at the owner’s request.

The [November 14 engineering baseline](docs/four-game-release-2026-11-14/README.md) completed 61 of 94 cards. The [November 15 ink review and plan](docs/notebook-ink-redesign-2026-11-15/README.md) adds four separate tasks: **62 of 98 cards are now complete**. TN-11 records the completed review and planning package; seven new market journeys and three conditional experiments remain ahead. The original 84 task contracts remain unchanged; TN-01–08 retain their completed evidence, including [verified 0.1.0 publication](https://github.com/PaperStrange/IndiaGames/pull/20#issuecomment-6879729181).

[Your four-game result handoff](docs/four-game-release-2026-11-14/HUMAN-HANDOFF.md) covers original sessions, reviewers, actual hardware and protocol decisions. Fluent review and physical-device qualification remain pending; the old phrase-choice protocol does not automatically qualify an ink redesign. [Draft PR #17](https://github.com/PaperStrange/IndiaGames/pull/17) is not adopted policy. Each November 20 release requires all three languages and independent human approval; incomplete games are deferred.

## November 20 target

| Pilot | Select one correction | Freeze | Go / no-go | Conditional launch |
|---|---|---|---|---|
| Accepted appointments pending | Bounded observed corrections | Nov 11 target passed; no new multilingual freeze | Nov 16 go/defer | Nov 20 conditional |

Actual observations, physical-device checks and independent approval determine which games can ship. The [full calendar](docs/launch/2026-11-20/README.md) preserves the required cohorts and decision criteria.

## Work and evidence

[Notebook ink review and next research milestone](docs/notebook-ink-redesign-2026-11-15/README.md): source review complete; seven new market sessions planned, three experiments conditional, no redesign selected. Earlier technical passes and six narrative-game studies remain baseline evidence.


- [Requests, completed work and remaining evidence](docs/hub/requirements-and-evidence.md)
- [Small Hours tasks](docs/games/small-hours/TODO.md) · [Vivid tasks](docs/games/keepers-frame/TODO.md) · [Bell tasks](docs/games/thirteenth-bell/TODO.md) · [Notebook tasks](docs/games/toms-notebook/TODO.md)
- [Fourth-game iteration and November decisions](docs/four-game-release-2026-11-14/README.md) · [Human-result handoff](docs/four-game-release-2026-11-14/HUMAN-HANDOFF.md)
- [Human release policy](docs/RELEASE-POLICY.md) · [Protection and robot-review issue #2](https://github.com/PaperStrange/IndiaGames/issues/2)
- [Publication status](docs/PUBLISHING.md) · [Team ownership and checkpoints](docs/TEAM.md) · [Cleanup and recovery](docs/maintenance/2026-10-28.md)

One source branch owns each game. `master` stages immutable candidates; `main` contains this hub, reusable templates, explicitly labelled development previews and approved official game packages. Notebook’s private product and Python battle prototype retain their original boundaries. A development preview does not populate the official release registry. Robot review cannot replace human playtests or independent release approval.

## Preview this hub

```sh
python3 scripts/sync-dashboard.py
python3 -m http.server 8120 --bind 127.0.0.1
```

The hub uses static HTML, CSS, JavaScript and JSON. Check root and `/IndiaGames/` paths before publishing. Inspect local changes and stop owned servers before switching the shared checkout; retain source and evidence on their owning branches.

[November 6 human-feedback reconciliation](docs/research-reconciliation-2026-11-06/README.md) records the owner's attribution correction, source comparisons and proposed per-game priorities. Original files are preserved; release eligibility is assessed separately.
