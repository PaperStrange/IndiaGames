# IndiaGames · Pre-commit release candidates

`master` is the staging branch for every game-demo release. Game development stays on the individual game branches; candidates arrive here for measured manual human playtests. Only an approved game/version is promoted to `main` as an official release.

**Vivid 0.1.2 is staged for human playtests. There are no official releases.** The packet contains two stories, A Place for the Promise and The Unfinished Postcard. Its human observations and approval remain empty. The original Python battle prototype and its history are preserved.

[Candidate packet](release-candidates/keepers-frame/0.1.2/) · [Candidate notes](release-candidates/keepers-frame/0.1.2/notes.md) · [Human-study preparation](https://github.com/PaperStrange/IndiaGames/tree/931118f19f22cee53d82a0248e0e073aa1551252/docs/gamejam/vivid-iteration-2026-10-21/human-study)

To play this exact packet locally, run `python3 -m http.server 8114 --bind 127.0.0.1 --directory release-candidates/keepers-frame/0.1.2/build`, then open `http://127.0.0.1:8114/`. Master is not a public Pages deployment. The packet hash is `e768b0fc12e34d1c4bdfc0cc5bdb194a39f10d07324e2951a6318373573572a4`. Earlier 0.1.0 and 0.1.1 packets are preserved, unapproved. Version 0.1.1 added dependency notices; 0.1.2 gives story packs control of scene captions and accessible labels while preserving current wording and saves. [The main policy extension](https://github.com/PaperStrange/IndiaGames/pull/1) requires separate owner review before any promotion.

## Prepare a candidate

1. Read the [release policy](docs/RELEASE-POLICY.md) and [blank packet guide](templates/release-candidate/README.md).
2. Export the selected game-branch SHA into `release-candidates/<game>/<version>/build/`; include the manifest, notes and pending human-playtest record. Freeze the inventory/hash and the required per-story six-session protocols before testing.
3. Run `python3 scripts/validate-release.py --staging`, commit the complete packet and push master. Check the uploaded file inventory and remote SHA.
4. Have actual people manually play that exact artifact. Keep all predeclared attempts in each required cohort, including failures; record measured outcomes and critical bugs. An independent human reviewer must inspect the evidence and play the build.
5. Run `python3 scripts/validate-release.py --candidate GAME/VERSION`. If it fails, keep the candidate here for revision. If it passes and the human approves, prepare a main promotion PR containing only that game/version and its registry entry. Do not merge the entire master queue.

After the approved promotion merges, main’s workflow publishes its GitHub version and release notes; the hub links to the official playable version. Branch rules must require the release gate and owner review. JSON consistency checks cannot establish whether a human observation really happened.

## Development branches and separate plans

| Game | Source branch | Detailed to-do list on main |
|---|---|---|
| Small Hours / Memorable Moments | [memorable-moments-game](https://github.com/PaperStrange/IndiaGames/tree/memorable-moments-game) | [Small Hours](https://github.com/PaperStrange/IndiaGames/blob/main/docs/games/small-hours/TODO.md) |
| Vivid / small worlds, lasting traces | [vivid-2.5d-photo-game](https://github.com/PaperStrange/IndiaGames/tree/vivid-2.5d-photo-game) | [Vivid](https://github.com/PaperStrange/IndiaGames/blob/main/docs/games/keepers-frame/TODO.md) |
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
