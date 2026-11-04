# Supported HTTP setup for agent verification

This addresses the study-access problem in [issue #5](https://github.com/PaperStrange/IndiaGames/issues/5) by placing the HTTP server and Playwright browser in the **same execution environment**. It does not repair or certify the October 28 managed Chromium 152 browser route. A public browser connector may run on another machine and cannot be assumed to share the shell's loopback interface.

The November 4 verified environment uses Playwright **1.56.1**, `/usr/bin/chromium` **151.0.7922.173**, and Node compatible with the game's declared `>=22.12` requirement. The inherited proxy and TLS configuration were left intact. The browser runner uses the repository's existing restricted-container launch configuration; no Local Network Access override, `file://` transport, TLS bypass or public tunnel is part of this route. Use the actual installed versions in a new report instead of copying these values into a future run.

## Prepare immutable artifacts

Use a dedicated checkout of the relevant game branch with its pinned source/master objects available, rather than switching a checkout another agent is editing. Keep outputs outside that checkout. The examples use new `/tmp` directories; retain their manifests/reports in the team's normal evidence location before the environment is removed.

**Small Hours**, from the `memorable-moments-game` checkout:

```sh
SMALL_EXPORT=$(mktemp -d /tmp/small-hours-http.XXXXXX)
python3 docs/gamejam/milestone-2026-10-27/package-baseline.py --repo "$PWD" --output "$SMALL_EXPORT/baseline"
python3 -m http.server 8111 --bind 127.0.0.1 --directory "$SMALL_EXPORT/baseline/build"
```

The exporter refuses to overwrite an existing output and records the exact unchanged study baseline. The final command remains running: stop that owned server with Ctrl-C when finished. Open `http://127.0.0.1:8111/` in a browser launched in the same environment. This is an access setup, not evidence that the pair/rehearsal journeys or human criteria passed.

**Bell**, from the `the-thirteenth-bell` checkout:

```sh
BELL_EXPORT=$(mktemp -d /tmp/bell-http.XXXXXX)
python3 scripts/package-pilot.py --source 700dcea61eaedc704ddce5adc98d5a6bd5d42a06 --output "$BELL_EXPORT/candidate" --version 0.1.0
python3 -m http.server 8113 --bind 127.0.0.1 --directory "$BELL_EXPORT/candidate/build"
```

Compare the exported inventory with the frozen 0.1.0 identity before use: `fa7e9a4f5cc66a9798c6e3cb2c418a240bdbc2a11367d6f54ed2c1989bdfd51e`. Open `http://127.0.0.1:8113/`, choose Contrast, then Start. Stop the owned server afterward. Serve the frozen previous Contrast reference separately for the human comparison; preserve its optional remote-font failure rather than editing the reference. The [canonical launch instructions](https://github.com/PaperStrange/IndiaGames/blob/3d4e205c417272f00b87c76c00532f4456d31e38/docs/gamejam/milestone-2026-10-27/launch.md) describe that reference.

**Vivid historical baseline**, from the `vivid-2.5d-photo-game` checkout:

```sh
VIVID_EXPORT=$(mktemp -d /tmp/vivid-http.XXXXXX)
python3 docs/gamejam/milestone-2026-10-27/prepare-vivid-pilot.py --output "$VIVID_EXPORT/baseline"
python3 -m http.server 8114 --bind 127.0.0.1 --directory "$VIVID_EXPORT/baseline/build"
```

This dated exporter intentionally freezes **0.1.2**, inventory `e768b0fc12e34d1c4bdfc0cc5bdb194a39f10d07324e2951a6318373573572a4`. It does not export a later correction. Open `http://127.0.0.1:8114/?profile=remembered#iona` or `http://127.0.0.1:8114/?profile=remembered#mara` from the co-located browser. Stop the owned server afterward. A revised build must use its own candidate manifest/version and external build directory.

## Current Vivid 0.1.3 export

The historical command above continues to export 0.1.2. For the verified 0.1.3 correction, follow the [version-aware candidate exporter instructions](https://github.com/PaperStrange/IndiaGames/blob/23d19663c78935e70307dca33acc8f1ce07bcf48/docs/gamejam/readiness-2026-11-04/CANDIDATE-EXPORT.md). The committed runtime is `813f264400bfc01d7e3e5f668de29bb835f5a70d`; two clean builds matched inventory `7498c636fee9b42298e4c9cde5ada0c8f688ef7835237e1e4761e269b68d3e00`. Use that exact exported build for the regression below. [Candidate PR #6](https://github.com/PaperStrange/IndiaGames/pull/6) has passed independent code review at its submitted head; required CI and actual master staging remain pending. No human or official-release approval is implied.

## Run the checked-in Vivid layout regression

In a Vivid checkout containing the November 4 correction and runner, install the lockfile dependencies with `npm ci` from `vivid-2.5d-photo-game/play/` if they are absent. An installed Chromium executable is required; the default is `/usr/bin/chromium`, with an explicit `CHROMIUM_PATH` supported for another installed executable. This is separate from downloading a browser or changing the execution environment's network policy.

From the repository root, set `MARA_BUILD` to the **absolute path of the exact exported build being checked**:

```sh
MARA_OUTPUT=$(mktemp -d /tmp/mara-layout-http.XXXXXX)
MARA_BUILD=/absolute/path/to/immutable/build MARA_EVIDENCE="$MARA_OUTPUT" node vivid-2.5d-photo-game/play/test/mara-layout-browser.mjs
```

The runner starts its own ephemeral loopback server, serves the same build at `/` and `/IndiaGames/pilots/vivid/`, launches Chromium in that environment, and closes its browser/server in `finally`. Do not also start the port-8114 example for this runner. It checks desktop/narrow layouts with ordinary and doubled computed text sizes, actual helper geometry, Tab reachability, keyboard alignment and a Mara interpretation endpoint. Its `report.json` includes file hashes, browser version, observed errors and outcomes. Doubled text is not physical-device or browser-zoom testing. The original 0.1.2 helper is expected to fail the new full-row layout assertion; retain that failure rather than relabeling it a test-infrastructure problem.

The full Iona, Small Hours and Bell semantic runs performed for this iteration used separate local QA drivers. They are not advertised here as checked-in reusable commands. Published per-game `TECHNICAL-QA.md` records identify their actual scope, route, artifact and results. Do not infer full-game completion from this layout runner or from the setup commands above.

Per-game report locations: [Small Hours](https://github.com/PaperStrange/IndiaGames/blob/e94aa04273e581d1a27ade1988fe6d422b6111ec/docs/gamejam/readiness-2026-11-04/TECHNICAL-QA.md), [Vivid](https://github.com/PaperStrange/IndiaGames/blob/23d19663c78935e70307dca33acc8f1ce07bcf48/docs/gamejam/readiness-2026-11-04/TECHNICAL-QA.md), [Bell](https://github.com/PaperStrange/IndiaGames/blob/56eec3e7d96410492ad70bf39b5eb5ae003feec8/docs/gamejam/readiness-2026-11-04/TECHNICAL-QA.md). Read each report's actual status; this setup document does not assert that every matrix cell has passed.

For a manual nested-route setup, create the project-style directory structure or a symlink **outside the checkout**, serve its parent export root with `python3 -m http.server 4173 --bind 127.0.0.1 --directory /absolute/export-root`, and open the nested URL in the same-host browser. Verify actual served files against the selected build inventory. This recipe supplements the root-mount examples; a shell HTTP 200 or correct page title alone never passes a game journey.

## Evidence required from each run

| Record | Why it matters |
|---|---|
| UTC start/end, browser/OS and same-host arrangement | Makes the working environment reproducible without claiming all managed browsers work. |
| Source SHA, candidate/version, build-file inventory before/after | Prevents a fresh rebuild or changed bytes being counted as the frozen study artifact. |
| Root and project-style nested HTTP route | Exposes relative-link, asset, reload and routing behavior hidden by `file://`. |
| Visible action, visible response and actual endpoint | Distinguishes a loaded title or an intermediate scene from completion. |
| Download bytes, replay/reset, save/reload and errors where relevant | Separates game failures from driver mistakes and transport artifacts. |
| First failure and any controlled retry | Prevents overwriting contrary observations with the eventual pass. |
| Limits and unrun matrix cells | Keeps physical devices, original managed-browser LNA and human evidence visibly pending. |

If server HTTP succeeds but the browser fails, record the actual failure and one controlled transport retry. Do not switch silently to `file://`, disable Local Network Access/TLS checks, or report a successful human route based on shell curl. An unresolved cell remains blocked. The issue can be resolved as an adopted supported-route solution only after the public protocol and the actual per-game evidence satisfy its scope; its original environment limitation must remain explicit.
