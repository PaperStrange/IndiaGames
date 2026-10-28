# Shared GameJam evidence and packaging

**Current handoff · 28 October 2026:** [Human playtest list, recording templates and November 20 iteration plan](launch-2026-11-20/README.md). Vivid retains its two-story 0.1.2 candidate; separate human cohorts and independent review remain pending. Use the current exact-artifact export helper and one serialized shared checkout.

## Historical October 6 research and packaging

The following records retain their original date and artifact scope; they are not current build or branch instructions.

**Historical status: planning only, revised 6 October.** Read [One More Turn — revised research plan](research-plan-2026-10-06.md), the [six-competitors-per-demo matrix](competitor-matrix-2026-10-06.md), the [earlier browser candidate pool](candidate-roster-2026-10-06.md), and the [observation templates index](observation-templates.md). No further gameplay or game coding begins until the research plan is settled. The per-demo matrix replaces the earlier shared shortlist as the coverage requirement. The plan supersedes the field report's proposed next-step schedule; historical observations remain preserved below.

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

## 27 October pilot readiness

[Separate Iona/Mara session setup for the unchanged 0.1.2 candidate](milestone-2026-10-27/README.md). Artifact identity and launch checks are recorded; both real-human cohorts remain pending.
