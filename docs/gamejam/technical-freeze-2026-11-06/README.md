# Bell · technical-freeze engineering checks

**TB-22 is complete: the independently reviewed source passed its first branch CI run.** This adds a branch-scoped engineering workflow and an exact portable-build inventory check. Runtime, build inputs, candidate 0.1.0 and the frozen Contrast reference are unchanged. No release or human approval is created.

| Check | Local result | Remote status |
|---|---|---|
| Existing rules and build contracts | 25 Node tests pass, including malformed/duplicate-anchor failures and preserved local output | Passed in run #42175335194 |
| Static source and build validation | 20 clean-checkout checks pass; two isolated outputs agree without creating `dist/` | Passed in run #42175335194 |
| Complete inventory contract | Five tests pass, including missing/extra files, empty extra directory and symbolic-link rejection | Passed in run #42175335194 |
| Exact portable artifact | Two independently generated one-file inventories match: 1,455,336 bytes, SHA-256 `433c9c6706e95ce5da2e541d73c2662322bef8b8c391e72ae451dcd42c80b973` | Passed in run #42175335194 |
| Evidence preservation | Existing report path and invalid source SHA reject; earlier report stays intact | Local CLI checks |

[Portable local and remote results](verification.json) · [Successful CI run](https://github.com/PaperStrange/IndiaGames/actions/runs/42175335194) · [Previous cleanup](../maintenance-2026-11-06/README.md) · [Workflow](../../../.github/workflows/bell-checks.yml)

## How to run

From the repository root:

```sh
node --test tests/*.test.cjs
python3 tests/check_static.py
python3 -B -m unittest discover -s tests -p 'test_reproducible.py' -v
python3 tests/check_reproducible.py --report /tmp/bell-inventory-new.json
```

Choose a fresh report path for each run. The inventory command builds into two temporary directories, checks every entry and compares path/size/SHA-256. It removes its temporary build directories, never writes local `dist/`, and refuses to overwrite an existing report. Without `--report`, JSON goes to stdout. A local archived-source run leaves `source_commit` null; the CI runner supplies its exact checkout commit. Do not relabel an uncommitted archive as a verified commit.

The workflow runs on pushes and pull requests targeting `the-thirteenth-bell`. Manual dispatch is restricted to that branch. It uses an Ubuntu 24.04 runner, Node 24.19.0 and Python 3.12.14; runtime availability was checked against the official setup-action manifests. All actions are pinned to immutable commits, permissions are `contents: read`, and checkout credentials are not persisted. No dependencies need installation, no browser is downloaded and there is no deployment step. The job records exact tool versions and complete build identity in its summary and fails if checks dirty the checkout or create `dist/`.

## Evidence and limits

The local input base is `473ba38333e665b250d459e5d74bb496521c3e19`, plus the changed tooling hashes in the results file. The build result exactly matches the previously frozen 0.1.0 artifact; the local checks are fresh engineering evidence, not another browser playthrough or human session. No failed application test was suppressed. Expected negative fixture failures are asserted as successful guards.

Commit `5da5adc40b01f4c39b587c9422a69b2390728706` passed [workflow run #42175335194](https://github.com/PaperStrange/IndiaGames/actions/runs/42175335194) on its first attempt, November 6 at 06:35:16 UTC. Its logged source SHA, Node 24.19.0, Python 3.12.14, 25 Node tests, five inventory tests and exact build hash agree with this record. All job steps passed, including the clean-checkout check. This completes TB-22’s remote-green criterion.

The clean-checkout static log contains 20 checks. An existing local `dist/` adds a 21st freshness check; the initial preparation draft reused that older count and is corrected here. Existing/stale output preservation is also exercised by the Node build-contract suite.

Human recruitment can continue in parallel. Six real participants, balanced comparison order, at least 120 seconds of neutral recall, physical-device evidence and independent human approval remain mandatory for an official release. The November 11 technical-freeze target does not waive those criteria. The next bounded engineering step is to keep these checks required during branch review and fix any reproduced regression; no new game mechanic is selected here.
