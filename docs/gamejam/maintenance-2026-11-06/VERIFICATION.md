# Bell cleanup verification · November 6

This is automated engineering verification. [Machine-readable evidence](verification.json) identifies the tested tool versions, changed-file hashes, source ancestor and actual results. The base game branch was `70824713a09684de9b232a35e71f46840fe04d07`; the cleanup files were reviewed as a patch and their hashes bind these results.

## Reproduced before/after behavior

| Case | Before: preserved November 5 code in a disposable fixture | After: build-contract regression |
|---|---|---|
| Stale local distribution | Static validation exited 1 but replaced the stale marker with a fresh game | Exits 1, retaining the exact original bytes and modification time |
| Duplicate stylesheet anchor | Synthetic extra anchor was accepted; the supposed single-file output retained an external stylesheet link | Rejects the ambiguous anchor before replacing an existing output |
| Missing output | Validation generated the default local distribution | Validation passes through temporary outputs and leaves `dist/` absent |
| Explicit output from another working directory | No supported output-path argument | Requested output matches default build; source lookup remains relative to `build.mjs` |

The duplicate-anchor case is a synthetic tool regression test, not a claim that the shipped game had duplicated stylesheets. The stale-output behavior was reproduced using the historical script in a disposable fixture. Original logs stay local; the portable report records their outcomes.

## Actual checks

| Check | Result | Scope |
|---|---|---|
| `node --test tests/*.test.cjs` | **25 passed, 0 failed** | 15 existing pure-rule tests plus seven top-level build tests, one containing three negative subtests; Node counts that suite as ten |
| `python3 tests/check_static.py` | **21 checks passed** | Syntax, split-data references, assets/case, two isolated reproducible builds, local freshness and preservation |
| Two explicit isolated outputs | **Byte-identical** | Both equal the build from before cleanup and the exact staged0.1.0 object on master |
| HTTP split/bundled smoke | **4 journeys, 20 checks passed** | Desktop1280 and narrow390 viewports, split root and nested portable mount, real control activation, Dawn→Noon witness, no overflow and fresh reload |
| Browser diagnostics | **0 observed errors** | No page, console, failed-request or HTTP errors during those four journeys |

The generated HTML remains **1,455,336 bytes**, SHA-256 `433c9c6706e95ce5da2e541d73c2662322bef8b8c391e72ae451dcd42c80b973`. Its one-file inventory remains `fa7e9a4f5cc66a9798c6e3cb2c418a240bdbc2a11367d6f54ed2c1989bdfd51e`, matching the unchanged0.1.0 package at master ancestor `2be5f3648fed5422eb4459486661385df73c91be`. HTML/CSS/runtime JavaScript/map inputs and frozen reference are unchanged. Only developer tooling, regression coverage and current documentation are updated.

The focused smoke does not repeat the historical 33 scenarios, create fresh-player comprehension evidence, measure physical-device performance, or supply human approval. The reference font limitation remains documented in the [November 5 setup report](../readiness-2026-11-05/TECHNICAL-QA.md); the historical reference was not rerun in this build-only check. All owned browser/server processes stopped after the run.

## Reproduce from the game checkout

```sh
node --test tests/*.test.cjs
python3 tests/check_static.py
node build.mjs --output /tmp/bell-review/index.html
```

The tests create isolated fixtures and remove them; static validation creates temporary build files and removes them. The last command intentionally creates the requested output. `node build.mjs` remains the explicit way to refresh the default ignored distribution. For full visible-control regression, first generate that default output, then run the existing `tests/square-journey.cjs` with the documented Playwright settings.
