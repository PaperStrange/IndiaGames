# Small Hours · repeatable development exports

SH-23 makes the nine-file development build reproducible and testable independently of the frozen eight-file human-study baseline. The exporter reads a **full, immutable Git commit**, copies only the declared public files and refuses unexpected, missing, symlinked or executable entries. Uncommitted checkout edits are ignored. The verification command makes two independent copies, compares their inventories, serves only the exported files over loopback HTTP, then checks both root and nested mounting.

This is engineering preparation for the November 11 target. It neither stages Small Hours nor completes a human study, device review or official-release gate. Use the [existing frozen-baseline packet](../readiness-2026-11-05/FACILITATOR-SETUP.md) for the currently declared human protocol. No game runtime, baseline ZIP, observation form or historical evidence is changed by this task.

## Run from a source checkout

Requirements: Git; Node 18 or newer; installed Playwright supporting `page.clock` (1.45 or newer) and Chromium for the full browser verification. The implementation was exercised with Node 24.19.0, Git 2.52.0, Playwright 1.56.1 and Chromium 151.0.7922.173. Browser automation is developer tooling and is not shipped to players.

From the repository root, run the dependency-free tests:

```sh
node --test memorable-moments-game/tests/countdown.test.mjs memorable-moments-game/tests/development-export.test.mjs
```

Run the complete export check, using a fresh external destination whose parent already exists:

```sh
PLAYWRIGHT_PATH=/absolute/path/to/installed/playwright \
CHROMIUM_PATH=/usr/bin/chromium \
node memorable-moments-game/scripts/verify-development-export.mjs \
  --repo "$PWD" \
  --commit "$(git rev-parse HEAD)" \
  --output /tmp/small-hours-development-verification-01
```

The commit argument resolves once before the command starts; the exporter then uses only that Git object. An existing output directory fails instead of overwriting evidence. The destination must be outside the source checkout, including through symlinked parent paths. Failed attempts keep their logs and partial report. The browser and HTTP server close after either result.

For a copy without browser verification:

```sh
node memorable-moments-game/scripts/development-export.mjs \
  --repo "$PWD" \
  --commit "$(git rev-parse HEAD)" \
  --output /tmp/small-hours-development-copy-01
```

This prints the source SHA and complete file/hash inventory. It does not create a candidate manifest, edit a study artifact or imply that the copy passed browser checks. The exported `README.md` retains its source-repository links; use this repository's documentation for those relative references.

## What the full check records

| Area | Verification |
|---|---|
| Source | Full commit SHA, declared path and tooling SHA-256 values; working-tree changes cannot enter the artifact |
| Artifact | Two matching nine-file exports; compact sorted JSON inventory hash; unchanged before/after inventories |
| HTTP | Actual bytes of all nine files checked at `/` and `/IndiaGames/development/small-hours/`; only export files are served |
| Existing game flow | The existing 33-check browser journey at each mount, including private handoff, shared action, SVG download, solo labeling, reset and iframe behavior |
| Timer | Real 45-second expiry; emulated dialog/cancellation/navigation; synthetic pagehide/pageshow handlers, without a bfcache claim |
| Failure contracts | Missing/extra committed files, symlinks, mutable refs, existing destinations, in-checkout or symlink-aliased outputs, and post-export tampering |

The unchanged development page does not declare a favicon. An ordinary static host returns a real `404` for the browser's implicit `/favicon.ico` request. The verifier records this known diagnostic, including the actual server response; it does not mock a `204`, suppress the console event or claim zero total errors. Other HTTP, console, page and request errors fail the run. A favicon change would create new runtime bytes and is outside this artifact-preserving task.

Raw logs, traces, synthetic keepsake downloads and browser captures go only into the selected external directory. Public summaries record artifact and tooling identity, actual counts, failures and limits; contacts, consent and human recordings must stay private.

## Progress boundary

The preliminary implementation check passed against committed development source `4905ae84cb29ff0e1bb0bdfff19795fdd2d1f500`. Final evidence is recorded separately after the implementation is integrated and its committed tooling can be identified. The initial run is retained; no failed game journey is hidden.

Human prerequisites remain unchanged: six willing pairs, physical-device/privacy checks, the evidence-linked pilot/design decision and independent human review. Keep the 5/6 unaided reveal, 4/6 both-contribute and 3/6 voluntary save/replay thresholds. Recruitment does not block this tooling work; engineering checks do not fill human results.
