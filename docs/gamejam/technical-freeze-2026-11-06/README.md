# Bell · technical-freeze engineering checks

**TB-22 implementation is locally verified; its first remote CI run is pending.** This adds a branch-scoped engineering workflow and an exact portable-build inventory check. Runtime, build inputs, candidate 0.1.0 and the frozen Contrast reference are unchanged. No release or human approval is created.

| Check | Local result | Remote status |
|---|---|---|
| Existing rules and build contracts | 25 Node tests pass, including malformed/duplicate-anchor failures and preserved local output | Awaiting pushed source/run |
| Static source and build validation | 21 checks pass; two isolated outputs agree without creating `dist/` | Awaiting pushed source/run |
| Complete inventory contract | Five tests pass, including missing/extra files, empty extra directory and symbolic-link rejection | Awaiting pushed source/run |
| Exact portable artifact | Two independently generated one-file inventories match: 1,455,336 bytes, SHA-256 `433c9c6706e95ce5da2e541d73c2662322bef8b8c391e72ae451dcd42c80b973` | Awaiting pushed source/run |
| Evidence preservation | Existing report path and invalid source SHA reject; earlier report stays intact | Local CLI checks |

[Portable local results](verification.json) · [Previous cleanup](../maintenance-2026-11-06/README.md) · [Workflow](../../../.github/workflows/bell-checks.yml)

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

After the coordinator pushes the independently reviewed source, this record will bind the actual remote commit, workflow run, runner result and complete inventory. Until then TB-22 has not met its remote-green acceptance criterion.

Human recruitment can continue in parallel. Six real participants, balanced comparison order, at least 120 seconds of neutral recall, physical-device evidence and independent human approval remain mandatory for an official release. The November 11 technical-freeze target does not waive those criteria. The next bounded engineering step after a passing CI run is to keep these checks required during branch review and fix any reproduced regression; no new game mechanic is selected here.
