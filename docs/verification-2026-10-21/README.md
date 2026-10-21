# Hub and release-workflow verification · 21 October 2026

This pass changes the main project hub, plans, templates and release process. It does not implement game features, play competitors or supply human participant evidence. The source manifest keeps earlier game QA dates separate.

## Dashboard

The [browser check record](dashboard-browser.json) covers the actual local `/IndiaGames/` project-path preview in Chromium. All 56 cards loaded: 19 Small Hours, 19 Keeper’s Frame, 18 Thirteenth Bell, with ten readable perspectives. Search, game/status/perspective filters, empty results and reset worked. Keyboard skip navigation, select controls, details and visible focus worked. No horizontal overflow occurred at 1440, 390 or 320 CSS pixels. No JavaScript page errors were observed.

Each of the three JSON endpoints was independently made to fail with HTTP 503 through browser route interception. The page displayed an error, disabled filters, and recovered all 56 cards after keyboard activation of Retry. A synthetic registry fixture exercised three official-release cards and their canonical project-relative play links, GitHub tag links and notes links; an invalid path was rejected. These fixtures remained in the local test harness and are not releases or human evidence.

Screenshots: [desktop](final-1440-top.png), [phone-width](final-390-top.png), [actual empty release state](final-1440-releases.png). Browser emulation is not a physical-phone or assistive-technology test.

## Release process

All 17 focused Python tests passed locally. They use temporary Git repositories and explicitly synthetic records. They check thresholds, build identity, master ancestry, old-release immutability, blank-template rejection and idempotent publication behavior. Publication API calls are mocked; no official version is created by the tests. See the committed test suite and CI run for reproducible checks.

Actual human authenticity, device playability, observation quality and independent approval remain the human reviewer’s responsibility. An empty release registry passes hub maintenance checks without approving any demo.

## Publication boundary

Source upload, GitHub configuration, workflow execution and live Pages delivery are separate checks. See [publication status](../PUBLISHING.md) for remote permissions and activation status.
