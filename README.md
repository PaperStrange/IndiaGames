# IndiaGames · Pre-commit release candidates

`master` is the staging branch for every game-demo release. Game development stays on the individual game branches; candidates arrive here for measured manual human playtests. Only an approved game/version is promoted to `main` as an official release.

**There are no staged candidates or official releases yet.** This commit installs the process and preserves the original Python battle prototype and its history. It does not approve or change any browser game.

## Prepare a candidate

1. Read the [release policy](docs/RELEASE-POLICY.md) and [blank packet guide](templates/release-candidate/README.md).
2. Export the selected game-branch SHA into `release-candidates/<game>/<version>/build/`; include the manifest, notes and pending human-playtest record. Freeze the inventory/hash and six-session protocol before testing.
3. Run `python3 scripts/validate-release.py --staging`, commit the complete packet and push master. Check the uploaded file inventory and remote SHA.
4. Have actual people manually play that exact artifact. Keep all six predeclared attempts, including failures; record measured outcomes and critical bugs. An independent human reviewer must inspect the evidence and play the build.
5. Run `python3 scripts/validate-release.py --candidate GAME/VERSION`. If it fails, keep the candidate here for revision. If it passes and the human approves, prepare a main promotion PR containing only that game/version and its registry entry. Do not merge the entire master queue.

After the approved promotion merges, main’s workflow publishes its GitHub version and release notes; the hub links to the official playable version. Branch rules must require the release gate and owner review. JSON consistency checks cannot establish whether a human observation really happened.

## Development branches and separate plans

| Game | Source branch | Detailed to-do list on main |
|---|---|---|
| Small Hours / Memorable Moments | [memorable-moments-game](https://github.com/PaperStrange/IndiaGames/tree/memorable-moments-game) | [Small Hours](https://github.com/PaperStrange/IndiaGames/blob/main/docs/games/small-hours/TODO.md) |
| Keeper’s Frame / Vivid 2.5D Photo | [vivid-2.5d-photo-game](https://github.com/PaperStrange/IndiaGames/tree/vivid-2.5d-photo-game) | [Keeper’s Frame](https://github.com/PaperStrange/IndiaGames/blob/main/docs/games/keepers-frame/TODO.md) |
| The Thirteenth Bell | [the-thirteenth-bell](https://github.com/PaperStrange/IndiaGames/tree/the-thirteenth-bell) | [Thirteenth Bell](https://github.com/PaperStrange/IndiaGames/blob/main/docs/games/thirteenth-bell/TODO.md) |

The [main project hub](https://github.com/PaperStrange/IndiaGames/tree/main) contains the dashboard and reusable design templates. Consult its [publication status](https://github.com/PaperStrange/IndiaGames/blob/main/docs/PUBLISHING.md) before assuming GitHub Pages is live.

## Check the process

```sh
python3 -m unittest discover -s tests -p 'test_release_gate.py' -v
python3 scripts/validate-release.py --staging
```

Tests use temporary synthetic records and mocked publication calls. They do not create real releases or human evidence.

## Preserved legacy prototype

The existing `main.py`, `settings/`, and `xiaor_battle_system/` remain untouched. This earlier Python battle project is not one of the three browser demos. In the prepared cloud environment, activate `/workspace/indiagames-env/activate.sh` and run `python -m unittest -v xiaor_battle_system.test.skilltest` for its original suite.
