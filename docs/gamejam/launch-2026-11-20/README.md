# Bell — human playtests and the November 20 launch decision

Prepared **28 October 2026**. Target: **20 November 2026**, conditional on the exact build passing the existing human release gate. No people have been scheduled, sessions conducted, or approval supplied by these documents. This packet makes the next work assignable; it does not change the game or the study criteria.

| Start here | Purpose |
|---|---|
| [Playtest list](PLAYTEST-LIST.md) | Staffing, registration, facilitator tasks, device coverage and release mapping |
| [Session recording template](SESSION-RECORD.md) | One person's two runs, actual journey, assistance, short-delay recall and scoring |
| [Blank roster CSV](roster-template.csv) | First-six registration and scheduling; header only, not participant records |
| [Manual checks template](MANUAL-CHECKS.md) | Physical device, accessibility, ending/retry and exact-build human review |
| [Decision template](DECISION-RECORD.md) | Six-person totals, build-order groups, contradictions and advance/revise/defer |
| [Next iteration](ITERATION.md) | Role-owned deadlines, bounded fixes and launch cutoffs |

The [October 27 protocol](../milestone-2026-10-27/protocol.md), [release-format JSON form](../milestone-2026-10-27/session-template.json) and [launch instructions](../milestone-2026-10-27/launch.md) remain canonical. These operational sheets supplement them. The human-facing opening script must not expose this facilitator-only design explanation.

## Frozen identities

| Item | Pinned identity |
|---|---|
| Candidate | Bell **0.1.0**, source `700dcea61eaedc704ddce5adc98d5a6bd5d42a06` |
| Staged package | [`master` snapshot `02c78ad`](https://github.com/PaperStrange/IndiaGames/tree/02c78ad9739622fb447850fbecb5f46e7dec8de8/release-candidates/thirteenth-bell/0.1.0) |
| Candidate inventory SHA-256 | `fa7e9a4f5cc66a9798c6e3cb2c418a240bdbc2a11367d6f54ed2c1989bdfd51e` |
| Candidate `index.html` SHA-256 | `433c9c6706e95ce5da2e541d73c2662322bef8b8c391e72ae451dcd42c80b973` |
| Previous Contrast reference | Source `252cc55e8515da1438c3e74af2e7dcc58eb13118`; [frozen manifest](../milestone-2026-10-27/reference/manifest.json) |
| Reference inventory SHA-256 | `47793d0ebc1801226a6b1f1e4fc11fb056d632c54919f179b91e14520c54fda8` |

Use inventory hashes in `build_sha256`, not the individual HTML hash. Compare **previous Contrast with candidate Contrast**; Original is a historical inspection reference. The prior build's optional remote font request is preserved and its load failure, if any, must be recorded. Never edit the reference to improve its result. Changed game bytes require a new candidate version and new build-specific evidence.

## Record care

Copy blank templates to a private location **outside the Git checkout**, for example `/workspace/indiagames-human-playtests/thirteenth-bell/`. If a local in-checkout working folder is unavoidable, use the ignored `playtest-private/` convention and inspect the staged diff before every commit; ignore rules alone do not provide confidentiality. Keep contact details, consent, video/audio and pseudonym mappings there with access limited to the facilitator and authorized reviewer. Recording is optional and separately consented; observation notes can stand alone. Do not place names, contact details, raw recordings or private links in this repository. Publish only deliberately reviewed deidentified summaries and concise evidence references. Decide access, withdrawal and deletion arrangements with the human owner before the first session; no universal retention period is implied here.

The candidate remains on `master` until approval. `main` hosts the overview and only approved official packages; no whole-game-branch merge is needed. A repository source link does not run a game. Pages deployment and actual phone access must be verified by the release owner before a public launch is announced.
