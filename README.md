# IndiaGames · Game demo studio

Three browser experiments, one shared design practice: state a player promise, observe what actually happens, and build the smallest useful next experiment.

**Main is the project hub and reusable design kit.** Development implementations stay on their own branches; approved, versioned browser builds are published on main after human review on master. The website source is this branch’s `index.html`; its planned GitHub Pages address is [paperstrange.github.io/IndiaGames](https://paperstrange.github.io/IndiaGames/). See [publishing status and instructions](docs/PUBLISHING.md).

## Launch target · 20 November 2026

The [launch plan and decision calendar](docs/launch/2026-11-20/README.md) schedules first human pilots, one bounded correction per game, an 11 November candidate freeze and a 16 November go/no-go decision. Each game has its own [human test list and blank recording templates](docs/launch/2026-11-20/README.md#game-packets). Dates are targets; real observations, exact-build approval and live publication still determine which games can ship. No human results are supplied by this planning update.

## Completed preparation milestone

The [27 October playtest-readiness handoff](docs/milestones/2026-10-27.md) prepares three separate packets: Small Hours’ unchanged baseline, Vivid’s existing 0.1.2 candidate and Bell’s selected Mina-route scene. Each project retains its own source/QA identity. Human participants and independent approval remain pending; the [dashboard manifest](data/source-manifest.json) records current preparation and staging state.

## Choose a game

| Demo | Player promise being tested | Implementation branch | Separate development list |
|---|---|---|---|
| **Small Hours** · Memorable Moments | Two people turn a brief shared activity into a keepsake that reflects both contributions. | [memorable-moments-game](https://github.com/PaperStrange/IndiaGames/tree/memorable-moments-game) | [Small Hours to-do list](docs/games/small-hours/TODO.md) |
| **Vivid** · formerly Keeper’s Frame | Two stories use different actions: Iona's choice changes a return placement; Mara's aligned sketches reveal a future workshop. Human meaning remains to be tested. | [vivid-2.5d-photo-game](https://github.com/PaperStrange/IndiaGames/tree/vivid-2.5d-photo-game) | [Vivid to-do list](docs/games/keepers-frame/TODO.md) |
| **The Thirteenth Bell** | Learning a repeated town event enables a better plan and a visible consequence for someone in it. | [the-thirteenth-bell](https://github.com/PaperStrange/IndiaGames/tree/the-thirteenth-bell) | [Thirteenth Bell to-do list](docs/games/thirteenth-bell/TODO.md) |

These are product hypotheses. The plans distinguish shipped behavior, proposed changes, observed competitor sessions and missing human evidence. The current lists incorporate the October 22 competitor packages and the settled October 24 milestone; the [October 20 review](https://github.com/PaperStrange/IndiaGames/tree/e0a3b13bcc8eb212a0f9b61a0f2d909a34fadaee/docs/gamejam/iteration-2026-10-20) remains an immutable historical snapshot.

## Run a demo

Use the selected game branch in its own task environment. Check for local changes and stop servers before switching the shared checkout; do not force-reset or automatically stash work. Follow the game’s README for full instructions.

| Game branch | Local command from its repository root | Local entry |
|---|---|---|
| `memorable-moments-game` | `python3 -m http.server 8111 --bind 127.0.0.1` | `/memorable-moments-game/play/` |
| `vivid-2.5d-photo-game` | `npm --prefix vivid-2.5d-photo-game/play run dev` | `/` on port 8112 |
| `the-thirteenth-bell` | `python3 -m http.server 8113 --bind 127.0.0.1` | `/` |

GitHub branch/file links above open source, not hosted playable games. This hub is prepared to host the overview, planning dashboard and, after approval, versioned official builds. On 28 October the Pages API became accessible and the expected URL returned a page built from master’s staging README. The hub’s required source is main/root; see [current publication checks](docs/PUBLISHING.md) before treating that response as the game dashboard. There are no official game releases yet.

For Vivid, first install its locked dependencies with `npm --prefix vivid-2.5d-photo-game/play ci` (Node ≥22.12). Its [source README](https://github.com/PaperStrange/IndiaGames/blob/0c72da97994d9f2d315e6aba1afba5219936b78b/vivid-2.5d-photo-game/play/README.md) explains builds, input and local memory. The portable [0.1.2 candidate](https://github.com/PaperStrange/IndiaGames/tree/f9488e5079d1d193caef560d1fe72936add6cba3/release-candidates/keepers-frame/0.1.2) is staged on master with both stories and pending human reports. Serve its exact `build/` directory for manual review; a GitHub candidate tree link is not a hosted game. Candidates 0.1.0 and 0.1.1 are preserved unchanged. The current 0.1.2 adds story-owned captions and accessible labels. See the [six-game journeys and qualified design findings](https://github.com/PaperStrange/IndiaGames/blob/931118f19f22cee53d82a0248e0e073aa1551252/docs/gamejam/vivid-iteration-2026-10-21/research/README.md).

## Start another experiment

Use the [game demo design template kit](templates/game-demo/README.md). It contains a concept brief, player journey, systems contract, art/UX brief, evidence ledger, playtest protocol, task card and release/handoff checklist. Copy it into a new game’s branch and replace the prompts with evidence and decisions. Templates are blank design tools, not completed findings.

The [team workflow](docs/TEAM.md) explains role ownership, plan settlement, cross-branch updates and backup milestones. Keep one game per source branch and one integration owner per shared state/rendering contract. The [28 October cleanup record](docs/maintenance/2026-10-28.md) documents archived branches and recoverable backups.

## Main branch structure

```text
index.html / styles.css / app.js  Static project hub and task dashboard
data/                           Combined task board and source provenance
docs/games/<game>/               Separate detailed plans and structured task cards
docs/launch/2026-11-20/          Launch calendar, human gates and role handoff
docs/TEAM.md                     Collaboration and update rules
docs/PUBLISHING.md               Pages setup and verification
templates/game-demo/             Reusable game-design templates
scripts/sync-dashboard.py        Validate and combine the three task lists
```

Preview this hub with `python3 -m http.server 8120 --bind 127.0.0.1`. No package installation, framework build, account or API key is needed to view it. After editing per-game task JSON, run `python3 scripts/sync-dashboard.py` and review the generated `data/tasks.json` before committing.

`master` is now the **pre-commit release-candidate branch**; its earlier Python battle prototype remains preserved. Another preserved branch, [`toms_notebook`](https://github.com/PaperStrange/IndiaGames/tree/toms_notebook) contains a separate notebook application. The legacy prototype and notebook are outside the three-game review and browser-demo coverage counts.

## From candidate to official release

Game branch → `master` candidate → measured manual human playtest → reviewed promotion PR → `main` official release. A whole-branch merge is not the promotion unit: copy only the approved game/version so unrelated candidates and the legacy Python project remain separate.

Use the [release policy](docs/RELEASE-POLICY.md) and [candidate package template](templates/release-candidate/README.md). They define six-session per-game thresholds, artifact hashes, independent human approval, immutable prior releases and automated validation. A successful check validates the supplied records; the human reviewer verifies that the playtests actually happened.

Vivid's separate per-story extension is awaiting owner review in [PR #1](https://github.com/PaperStrange/IndiaGames/pull/1). Both Iona and Mara need distinct six-person cohorts on the exact same build; the neutral comparison cohort is optional. No Vivid promotion should proceed before that policy review and real human approval. No participants have been recruited or recorded by this implementation work.

The dashboard’s Official releases section reads [data/releases.json](data/releases.json). After a promotion passes review and merges, the release workflow creates its GitHub version/tag and release notes; the card links to that version, notes and its playable build. The empty registry truthfully records that no demo has met this process yet. Branch protection must require the release gate and owner review; see the policy’s setup requirements and [publication status](docs/PUBLISHING.md).
