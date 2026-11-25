# IndiaGames · Four browser experiments

[Open the game dashboard](https://paperstrange.github.io/IndiaGames/) · [Team board](https://paperstrange.github.io/IndiaGames/#tasks) · [Design templates](templates/game-demo/README.md)

The **Overview** combines real game images, playtest readiness and the November timeline. The **Team board** keeps the historical tasks and dated readiness follow-ups, filters and acceptance details available without a long wall of cards. These are development views; no game has an approved official release yet.

| Game | Experience being tested | Current artifact | Human work still required |
|---|---|---|---|
| **Small Hours** · Memorable Moments | Two people make a brief shared activity their own. | Three-language development export verified; frozen study baseline retained | Six pairs |
| **Vivid** · formerly Keeper’s Frame | Two stories express meaning through different actions. | 0.2.0 multilingual development verified; frozen 0.1.4 retained | Six people per story, in separate cohorts |
| **The Thirteenth Bell** | Understanding a repeated event enables a meaningful intervention. | 0.2.0 multilingual development verified; frozen 0.1.0 retained | Six people, balanced comparison order |
| **Tom’s Notebook · ink redesign** | Preserve original ink and discover gameplay through the player’s own marks; research in progress. | [0.1.0 comparison baseline](https://paperstrange.github.io/IndiaGames/development/toms-notebook/0.1.0/) retained; redesign not built | Revised core needs fitting study criteria and new exact-build evidence |

[Per-game checklists, recording templates and launch plans](docs/launch/2026-11-20/README.md#game-packets) include exact-artifact setup. **Development previews on main: 1/4 — Notebook 0.1.0.** Frozen candidates and repository source links are separate artifacts; a source link is not a browser play button.

The [November 14 engineering baseline](docs/four-game-release-2026-11-14/README.md) completed 61 of 94 cards. The [November 15 ink review and plan](docs/notebook-ink-redesign-2026-11-15/README.md) adds four separate tasks: **62 of 98 historical task deliverables remain complete**. This is not a measure of fun or release readiness. TN-11 records the completed review and planning package; TN-12 research remains unfinished and three experiments remain conditional. The original 84 task contracts remain unchanged; TN-01–08 retain their completed evidence, including [verified 0.1.0 publication](https://github.com/PaperStrange/IndiaGames/pull/20#issuecomment-6879729181).

[Your four-game result handoff](docs/four-game-release-2026-11-14/HUMAN-HANDOFF.md) covers original sessions, reviewers, actual hardware and protocol decisions. Fluent review and physical-device qualification remain pending; the old phrase-choice protocol does not automatically qualify an ink redesign. [Draft PR #17](https://github.com/PaperStrange/IndiaGames/pull/17) is not adopted policy. Each release still requires all three languages and independent human approval; incomplete games defer.

## Research before the next redesign · November 25

The [six-title research round](docs/competitor-learning-2026-11-25/README.md) has **six filed attempts** (five substantive gameplay journeys; ADOFAI calibration/menu only): Townscaper, Sandspiel, shapez, Celeste Classic, A Dance of Fire and Ice and Sort the Court. The records compare actual journeys with user reviews and discussions before revised game implementation. Ratings guide selection; incomplete routes and repeated studies keep their limits.

| Owner-reported problem | Question for the observations |
|---|---|
| Unclear how to play or why the goal matters | What makes the first meaningful action and motivation readable? |
| Repetitive story loop, especially Vivid’s character reading | How does the player's action change the situation and invite another turn? |
| Ordinary interactions and insufficient online previews | Which actions create distinctive consequences, and how easily can a player reach the build? |

These complaints are reported by the owner; they are not a quantified participant survey. No new game implementation or release qualification is claimed by this research update.

## November 20 target — passed, qualification pending

| Pilot | Select one correction | Freeze | Go / no-go | Official release |
|---|---|---|---|---|
| Accepted appointments pending | Evidence before revisions | Nov 11 target passed; no new multilingual freeze recorded | Nov 16 checkpoint passed; decision evidence pending | Nov 20 target passed; 0 recorded releases |

Actual observations, physical-device checks and independent approval determine which games can ship. No replacement launch date is assigned. The [original calendar](docs/launch/2026-11-20/README.md) preserves the required cohorts and decision criteria.

## Work and evidence

[Notebook ink review and next research milestone](docs/notebook-ink-redesign-2026-11-15/README.md): source review complete; **4/7 titles attempted · coverage incomplete**; three experiments conditional, no redesign selected. Earlier technical passes and six narrative-game studies remain baseline evidence. Sort the Court is a repeated title, not a new unique competitor.


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
