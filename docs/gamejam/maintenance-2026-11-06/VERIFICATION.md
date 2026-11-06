# Vivid 0.1.4 verification · November 6

This report records agent-run build/browser checks, not human sessions or physical-device measurements. [verification.json](verification.json) contains input hashes, output inventory, final cases and retained-attempt descriptions.

## Actual checks

| Check | Result |
|---|---|
| Existing unit suite | 51/51 pass |
| Story validation | 2 packs, 25 representative views, 6 local asset references pass |
| Production build | Package/lock 0.1.4; emitted badge 0.1.4; 15 files / 1,401,606 bytes |
| Built-version refusal | A temporary copy with badge 0.1.2 exits nonzero with “Built badge must match the package version”; the original output stays unchanged |
| Final visible-control journeys | 8/8 pass: both stories, root and nested mounts, 1280px and 390px widths |
| Iona endpoints | Actual rescue, braced/wedged recollection, private choice, return placement and reload persistence |
| Mara endpoints | Three inspected objects, aligned reveal, chosen repair interpretation, visible authored outcome and reload persistence |
| Fresh Vite development page | Correct 0.1.4 gallery badge; no implicit favicon failure after the metadata correction |
| Final diagnostics | Zero unexpected console, page, request or HTTP errors |
| Byte boundary | Onlyindex.html differs from 0.1.3; all14 other output hashes remain identical |

The final browser report's before/after inventories equal `a511fbcf55fc94fe344f1a6d4eb1bebb509291ee5f31fb6f2889fcd85f67dbb1`. The browser was Chromium 151.0.7922.173; Node 24.19.0 and npm 11.9.0 built the package. Narrow widths are emulation, not real-phone evidence. The device/rendering checks do not measure physical GPU performance.

## Failure trail

The first local runner had a syntax error and never launched a browser. The next attempt passed four Iona journeys but used an incorrect textual expectation for Mara’s completed state; all four Mara cases failed that assertion. Its dev check also used an invalid package-resolution method. The targeted Mara retry used the authored repair outcome plus exact state/reload assertions and passed all four.

That retry’s dev page exposed a real implicit `/favicon.ico`404. A separate dev diagnostic recorded the failing request location. The integrator approved a metadata-only inline collection icon. The final build and complete eight-journey/dev run then passed with strict diagnostics unchanged. All earlier runners/logs/reports remain in the private task evidence; no failing attempt is erased or counted as a successful human session.

## Reproduce the persistent guard

From `vivid-2.5d-photo-game/play`:

```sh
npm ci
npm test
npm run build
node scripts/check-build-version.mjs /path/to/export/build
```

The check reads package/lock metadata and actual emitted HTML; it does not accept an externally supplied expected version. Development and production both use the same Vite transform. The local canonical browser runner and raw traces remain task evidence; the existing per-game browser suites and protocols remain available in the source.

[Gallery version](gallery-version-0.1.4.png) · [Iona return at 390px](iona-return-390.png) · [Mara ending at 390px](mara-ending-390.png)

## Limits

This is a narrow metadata correction. It does not repeat every earlier storage/fallback/gesture test because all relevant JavaScript bytes are unchanged. November 4–5 reports keep their original dates and limits. The committed-source two-build export and master staging are integrator steps, not claimed complete by this pre-integration report. Human cohorts, optional neutral/recall studies, physical devices, critical-bug adjudication and independent human release approval remain pending.
