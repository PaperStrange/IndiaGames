# IndiaGames · Three browser experiments

[Open the game dashboard](https://paperstrange.github.io/IndiaGames/) · [Team board](https://paperstrange.github.io/IndiaGames/#tasks) · [Design templates](templates/game-demo/README.md)

The **Overview** combines real game images, playtest readiness and the November timeline. The **Team board** keeps all 60 tasks, filters and acceptance details available without a long wall of cards. These are development views; no game has an approved official release yet.

| Game | Experience being tested | Current artifact | Human work still required |
|---|---|---|---|
| **Small Hours** · Memorable Moments | Two people make a brief shared activity their own. | Unchanged baseline; not staged on master | Six pairs |
| **Vivid** · formerly Keeper’s Frame | Two stories express meaning through different actions. | Candidate 0.1.2: Iona and Mara | Six people per story, in separate cohorts |
| **The Thirteenth Bell** | Understanding a repeated event enables a meaningful intervention. | Candidate 0.1.0: Mina’s route | Six people, balanced comparison order |

[Per-game checklists, recording templates and launch plans](docs/launch/2026-11-20/README.md#game-packets) include exact-artifact setup. GitHub source links open repository files; they are not browser play buttons. Repair of the older candidate Pages URL is paused at the owner’s request.

## November 20 target

| Pilot | Select one correction | Freeze | Go / no-go | Conditional launch |
|---|---|---|---|---|
| Oct 31–Nov 4 | Nov 5; implement Nov 6–10 | Nov 11 | Nov 16 | Nov 20 |

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
