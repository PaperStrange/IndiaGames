# Shared GameJam evidence and packaging

Start with [field-report.md](field-report.md). The game-specific report remains with each game's existing docs. `market-research.json` distinguishes publisher claims, critic reports and hypotheses; `evidence/` contains actual action traces and screenshots. Large competitor Playwright traces remain in the local `gamejam-shared` backup, as noted in each report.

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

## Recover or continue

Keep one game per branch; commit validated milestones and verify the matching remote ref after push. Avoid switching a shared checkout while another agent has files open. The coordinator used isolated working directories for the parallel team, left `/workspace/IndiaGames` on its original `work` branch, and preserved a pre-jam Git bundle. No source/branch history was force-reset. The final bundle and browser ZIP are local delivery artifacts, while the game code and this evidence are synced to the three remote game branches.
