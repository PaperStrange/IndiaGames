# Ink recovery discoverability correction

Date: 2026-10-04 America/Los_Angeles / 2026-10-05 UTC.
Parent: MC-006. Starting publication: Site version 11, source `32ee141fa0a3bec77925cc672f64fdb21ea48e2e`.

## User report and cause

The phone screenshot showed a space warning instructing the user to move ink, with no visible move action. The recovery panel was inside the scrolling notebook area, below the sticky pen toolbar. Scrolling to write could put its primary action above the viewport or behind that toolbar. The previous Playwright journey used `locator.click()`, whose automatic scrolling made the operation pass without proving that a person could discover the action.

## Correction

- Recovery lives beside the input box, outside the scrolling paper. The gold primary button says **Move ink to a fresh leaf**. It moves the retained draft and opens its new leaf in one action; no rewriting is required.
- Recovery temporarily occupies the sample-suggestion space. Read and annotation choices remain beside it, with at least 44-pixel tap targets.
- A page-space warning includes a direct **Move ink** action. It is informational rather than an alarming red error. The persistent recovery panel remains when that notification expires.
- Notifications belong to the originating page and are dismissed on navigation, movement or annotation. Stale recognition failures do not raise a new action for superseded ink. Running recognition is not cancelled.

## Verification

The new browser check reads button bounds and browser hit targets before clicking. It explicitly does not scroll the action into view. It checks all three recovery choices while the paper is scrolled, then clicks the already-visible screen coordinates and verifies the actual saved notebook.

Initial focused checks passed at desktop 1440×1000, phone 390×700 and tablet 820×1180. The phone height deliberately leaves less room for browser chrome than the previous 844-pixel test.

The separate phone space-warning check also passed using the bundled on-device OCR model. A page with an occupied final line was saved through the actual notebook API; the browser drew ink, ran recognition, displayed the actionable notice, clicked its visible **Move ink** button and verified the source/destination records. No recognition response was mocked. This tests recovery behavior, not recognition accuracy.

Eight ink-cycle and draft regression checks, TypeScript and the production build passed. The full 12-scenario browser run passed 11 scenarios. Its phone space-warning case reached the new leaf but failed its sync assertion: the test had modified the remote notebook after the browser had already loaded an older revision. The app correctly retained both versions and stopped the conflicting write.

The test now creates its occupied-page fixture through the actual API before the first browser load, including initialization of a new owner's empty notebook. The focused phone rerun passed in 36.5 seconds, verifying both the visible notice action and the final saved source/destination. No product code changed between the full run and this targeted rerun. The other eleven scenarios retain their passing results; no automatic test retries were enabled. Both the original run report and the successful phone rerun are preserved in `evidence/ink-recovery-discoverability/` with screenshots.

No hosted-provider or physical-device acceptance is inferred. This correction does not mark the complete MC-006 story or customer baseline Done.

## Review lesson

For a recovery instruction that names an action, acceptance must include both discoverability and successful execution. Assert viewport containment and pointer hit testing before invoking helpers that scroll; include a scrolled paper and a compact browser viewport. A passing scripted click alone was insufficient evidence.

## Follow-up: let the user continue writing

Starting publication: Site version 12, source `7109d5d4cfc5660fe93c3c8256026041ebdfab73`.

The next user report exposed a second lifecycle gap: the panel reappeared on the destination because every unsent draft was treated as needing recovery. A separate success toast also covered the writing controls after an otherwise successful move.

Recovery now opens automatically for overlapping ink or a reported space problem. Moving clears the recovery state and source notification; an accessible announcement replaces the success toast. The ink stays editable and unsent. A compact **Ink options** button preserves deliberate access to reading, moving and annotation choices without opening that panel during ordinary writing.

Acceptance continues beyond the move: no recovery panel or move toast on the new leaf, a new stroke can be added directly and is saved alongside the unchanged moved stroke, and the page stays quiet after reload. Tests also retain annotation access and the rule that returning to a page does not restart fading.

All nine targeted Playwright scenarios passed in 2.8 minutes across desktop, phone and tablet Chromium layouts. The phone move case used actual bundled OCR and the notice's action; the other move cases used the persistent recovery button. TypeScript, production build and `git diff --check` passed. The report and post-reload screenshots are in `evidence/ink-continuation/`. Physical-device and live-provider acceptance remains separate; no parent story is marked Done.
