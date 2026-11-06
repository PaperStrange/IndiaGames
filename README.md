# IndiaGames · Three browser experiments

[Open the game dashboard](https://paperstrange.github.io/IndiaGames/) · [Team board](https://paperstrange.github.io/IndiaGames/#tasks) · [Design templates](templates/game-demo/README.md)

The **Overview** combines real game images, playtest readiness and the November timeline. The **Team board** keeps the historical tasks and dated readiness follow-ups, filters and acceptance details available without a long wall of cards. These are development views; no game has an approved official release yet.

| Game | Experience being tested | Current artifact | Human work still required |
|---|---|---|---|
| **Small Hours** · Memorable Moments | Two people make a brief shared activity their own. | Three-language development export verified; frozen study baseline retained | Six pairs |
| **Vivid** · formerly Keeper’s Frame | Two stories express meaning through different actions. | 0.2.0 multilingual development verified; frozen 0.1.4 retained | Six people per story, in separate cohorts |
| **The Thirteenth Bell** | Understanding a repeated event enables a meaningful intervention. | 0.2.0 multilingual development verified; frozen 0.1.0 retained | Six people, balanced comparison order |

[Per-game checklists, recording templates and launch plans](docs/launch/2026-11-20/README.md#game-packets) include exact-artifact setup. GitHub source links open repository files; they are not browser play buttons. Repair of the older candidate Pages URL is paused at the owner’s request.

[The three-language engineering milestone is complete](docs/multilingual-engineering-2026-11-06/README.md): English, Japanese and Simplified Chinese cover all three demos, including both Vivid stories. Six new engineering cards are complete, bringing the board to **53 of 84**. Cross-engine technical checks passed; Japanese/Chinese text remains draft and physical-device qualification remains pending. [Your weekend handoff](docs/multilingual-engineering-2026-11-06/WEEKEND-HANDOFF.md) covers accepted reviewers, actual hardware and protocol decisions. [Draft PR #17](https://github.com/PaperStrange/IndiaGames/pull/17) is a separately reviewed release-contract proposal, not adopted policy. Each November 20 release requires all three languages; incomplete games are deferred. Original human cohorts and independent release approval remain mandatory.

## November 20 target

| Pilot | Select one correction | Freeze | Go / no-go | Conditional launch |
|---|---|---|---|---|
| Unbooked; facilitator-machine sessions when staffed | One observed issue or no change | Nov 11 target | Nov 16 target | Nov 20 conditional |

Actual observations, physical-device checks and independent approval determine which games can ship. The [full calendar](docs/launch/2026-11-20/README.md) preserves the required cohorts and decision criteria.

## Work and evidence

- [Requests, completed work and remaining evidence](docs/hub/requirements-and-evidence.md)
- [Small Hours tasks](docs/games/small-hours/TODO.md) · [Vivid tasks](docs/games/keepers-frame/TODO.md) · [Bell tasks](docs/games/thirteenth-bell/TODO.md)
- [Human release policy](docs/RELEASE-POLICY.md) · [Protection and robot-review issue #2](https://github.com/PaperStrange/IndiaGames/issues/2)
- [Publication status](docs/PUBLISHING.md) · [Team ownership and checkpoints](docs/TEAM.md) · [Cleanup and recovery](docs/maintenance/2026-10-28.md)

One source branch owns each game. `master` stages immutable candidates; `main` contains this hub, reusable templates and only approved official game packages. The preserved notebook and Python battle prototype remain separate projects. Robot review cannot replace human playtests or independent release approval.

## Preview this hub

```sh
python3 scripts/sync-dashboard.py
python3 -m http.server 8120 --bind 127.0.0.1
```

The hub uses static HTML, CSS, JavaScript and JSON. Check root and `/IndiaGames/` paths before publishing. Inspect local changes and stop owned servers before switching the shared checkout; retain source and evidence on their owning branches.

[November 6 human-feedback reconciliation](docs/research-reconciliation-2026-11-06/README.md) records the owner's attribution correction, source comparisons and proposed per-game priorities. Original files are preserved; release eligibility is assessed separately.
