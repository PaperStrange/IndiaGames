# Shared GameJam evidence and packaging

**Current review: 20 October.** Start with the [game agent development dashboard and three next-iteration plans](iteration-2026-10-20/README.md). It reviews the uploaded October 15 research, pins all three playable source branches, records fresh demo checks, and distinguishes proposed tasks from completed work. Small Hours and Thirteenth Bell plans remain provisional pending the additional records announced by the project lead. No new gameplay features were implemented in this review.

The [One More Turn research plan](research-plan-2026-10-06.md), [six-competitors-per-demo matrix](competitor-matrix-2026-10-06.md), [earlier browser candidate pool](candidate-roster-2026-10-06.md), and [observation templates index](observation-templates.md) remain the research contract. The required six-title/four-family firsthand coverage is still incomplete. Settle updated plans before further competitor play or game implementation; preserve the later executed replay records as evidence rather than treating the old planning-only notice as current status.

The earlier [field-report.md](field-report.md) and game-specific reports remain preserved. `market-research.json` distinguishes publisher claims, critic reports and hypotheses; `evidence/` contains action traces and screenshots. Historical reports also reference a local `gamejam-shared` backup of larger traces; that directory is not present in the current environment.

`manifest.json` pins the tested game-source commits, before this documentation commit. `package-validation.json` records the passed portable-package checks. Human participant data in `human-playtest.csv` is deliberately blank.

## Recreate the portable build

With the three corresponding branches checked out in separate directories, and esbuild installed:

```sh
python3 package-jam.py --memorable /path/to/memorable --vivid /path/to/vivid --bell /path/to/bell --out /path/to/release --esbuild /path/to/esbuild
```

The build inlines scripts after the page markup, before the closing body tag to preserve the original module startup order. This ordering was caught and fixed by packaged-browser testing. The launcher generator expects directories named `memorable`, `vivid`, and `bell` under `GAMEJAM_WORKTREES`; set `GAMEJAM_RELEASE_ROOT` for its output. Copy this field report, score sheet and evidence alongside the launcher.

```sh
GAMEJAM_WORKTREES=/path/to/checkouts GAMEJAM_RELEASE_ROOT=/path/to/release python3 make-launcher.py
python3 -m http.server 8120 --directory /path/to/release
```

In another shell, with Playwright and a Chromium binary available:

```sh
GAMEJAM_RELEASE_ROOT=/path/to/release GAMEJAM_BASE_URL=http://127.0.0.1:8120 CHROMIUM_PATH=/path/to/chromium node test-package.mjs
```

`PLAYWRIGHT_MODULE` may select an installed Playwright module path. In this cloud environment it is `/workspace/indiagames-env/toms-notebook-deps/node_modules/playwright/index.mjs`. The package validation covers a complete synthetic Moments export, Vivid ending/reload memory, and Bell's direct Contrast start/first consequence. It does not repeat or replace the per-game source suites.

## Historical packaging and recovery note — 5 October

Keep one game per branch; commit validated milestones and verify the matching remote ref after push. Avoid switching a shared checkout while another agent has files open. The coordinator used isolated working directories for the parallel team, left `/workspace/IndiaGames` on its original `work` branch, and preserved a pre-jam Git bundle. No source/branch history was force-reset. The final bundle and browser ZIP are local delivery artifacts, while the game code and this evidence are synced to the three remote game branches.

Those local paths and package results describe the earlier run; this environment no longer contains the old local release directories. For the current branch ownership, incoming-record intake and backup protocol, use the [October 20 handoff](iteration-2026-10-20/HANDOFF.md).
