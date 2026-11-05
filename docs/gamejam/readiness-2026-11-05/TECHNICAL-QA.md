# Vivid — storage recovery and graphics fallback, 5 November 2026

**26 distinct conditions now pass across two retained attempts; the first attempt's strict failure remains visible.** These are 13 targeted synthetic fault scenarios on each of two HTTP mounts, executed in desktop Chromium. They fill explicitly untested November 4 boundaries and do not repeat the full ordinary story suite.

| Artifact / execution | Identity |
|---|---|
| Frozen package | `keepers-frame/0.1.3`; Iona + Mara; source `813f264400bfc01d7e3e5f668de29bb835f5a70d` |
| Immutable master | `2be5f3648fed5422eb4459486661385df73c91be` |
| Build inventory SHA-256 | `7498c636fee9b42298e4c9cde5ada0c8f688ef7835237e1e4761e269b68d3e00` |
| Exact bytes | All 15 files / 1,401,316 bytes match the master packet and manifest; unchanged before/after each run |
| Browser | Chromium 151.0.7922.173; Playwright 1.56.1; 1280×900 viewport, reduced-motion preference |
| Serving | Same-host loopback HTTP at `/` and `/IndiaGames/release-candidates/keepers-frame/0.1.3/build/` |
| Evidence class | Agent browser QA with synthetic save/graphics faults; no participant, physical-phone or affective observations |

## Observed scenarios

Each row was exercised once per mount, with failed harness cases retried as described below.

| Scenario | Conditions | Observed result |
|---|---:|---|
| Legacy Iona archive / private | 4 | Return available immediately; archive retains truthful original-letter publication and earlier reading; optional recollection and actual placement complete; reload preserves placement; explicit Forget clears legacy memory and retains a fresh checkpoint |
| Future schema / content revision / story-save version | 6 | Original bytes preserved through temporary visible progress and reload; explicit recovery saves current progress; subsequent reload keeps that checkpoint |
| Malformed Iona / Mara save | 4 | Read failure explained; original malformed bytes preserved until explicit recovery; recovery keeps current progress and survives reload |
| Denied / quota-full storage in Mara | 4 | Complete inspection → alignment → reveal → interpretation remains playable with unavailable-storage notice; reload starts fresh rather than promising persistence |
| WebGL creation unavailable, Iona / Mara | 4 | Forced graphics initialization failure exposes illustrated view; complete endpoints remain usable, saved and reloadable |
| Actual context loss, Iona / Mara | 4 | `WEBGL_lose_context` invoked on a live renderer after meaningful progress; fallback preserves checkpoint; both stories complete and reload |

Legacy/recovery fixtures also preserve sentinel records in another story namespace and Iona's neutral namespace. Those sentinels test isolation, not actual neutral-profile behavior. All actions after fault setup used visible game controls; seeded records are clearly synthetic. No participant save or report was modified.

## Retained failures and targeted correction

- **Attempt 01: strict FAIL, 16 pass / 10 fail, 26 executions.** Eight Mara endpoint checks queried nonexistent `#progress`; the shipped DOM uses `#story-progress`. The story actions had proceeded, but those assertions timed out. Four WebGL-creation cases also emitted the deliberate `THREE.WebGLRenderer: THREE.WebGLRenderer: Error creating WebGL context.` diagnostic. The initial exact diagnostic classifier expected only one prefix. These sets overlap, yielding ten failed conditions.
- **Targeted retry 02: PASS, 10/10.** Corrected the selector and classified only that exact diagnostic inside the deliberate `getContext = null` fault cases. Reran the ten affected conditions, not the already-passing sixteen. Eight expected injected-fault console messages remain in the retry report; there were **zero unexpected page, console, request or HTTP errors**.
- The two attempts comprise **36 executions covering 26 unique conditions**, not 36 independent tests or people. Raw failures, original/corrected drivers and reports are retained locally. [The compact ledger](technical-qa.json) preserves actual timestamps, file hashes, diagnostic text and per-case provenance. No gameplay, save or renderer code was changed to obtain a pass.

## Selected evidence

| Explicit recovery | Actual context loss and completed return | Forced graphics creation failure |
|---|---|---|
| [Mara checkpoint after recovery](mara-recovery.png) | [Iona completed placement](iona-context-loss-return.png) | [Mara completed interpretation](mara-graphics-fallback.png) |

These frames illustrate checked states, not human experience. The Iona frame is after reload, when 3D rendering is available again; it shows retained placement, not the context-loss event itself. Full traces in the retained local reports include the unavailable notice and preserved checkpoint before continuation.

## Known limits and next action

The unchanged 0.1.3 HTML badge says **“Work in progress · 0.1.2”**. This is a verified display/package metadata mismatch. Session setup must identify the build by the candidate manifest and full inventory. Correct the badge in a future separately versioned build and check it against package metadata; do not alter the frozen artifact under the same version.

The [facilitator setup](FACILITATOR-SETUP.md) export/hash code block was executed successfully against immutable master. Actual facilitator hardware, participant access, phone/LAN route, screen readers, real input comfort and 3D performance remain unverified. No neutral cohort, human comprehension, enjoyment, recall or release approval is supplied by this QA. The original separate managed Chromium 152/LNA restriction was not retested.

No runtime or candidate byte changed. Existing six-person-per-story thresholds, exact-artifact policy, failed-attempt retention and independent human review remain mandatory. All owned browser contexts and test HTTP servers were closed after execution.
