# Physical devices and optional prompted recall

## Physical-device checks

**Unverified until measured on real hardware.** Headless Chromium, emulated phone viewports, desktop throttling and screenshots are useful automated checks. None proves a 30 FPS experience on a physical phone.

Record the exact candidate build hash, phone/tablet model, OS, browser version, viewport, orientation, display refresh rate, battery/power mode, network type and whether the device was already warm. State the measurement method and tool, and keep the trace reference with consented evidence. Avoid recording unrelated personal information visible on the device.

On each selected physical device, observe initial cold loading, opening each story, steady view, deliberate camera movement, a placement or sketch adjustment, portrait/landscape rotation, backgrounding/resuming and return to the gallery. Run keyboard checks on real keyboard hardware separately. Record whether rendering was 3D or flat; a successful fallback must not be reported as measured 3D performance.

For an actual 3D performance claim, use the browser's available remote profiling/frame instrumentation on that physical device. Record at least three 30-second samples covering active movement and interaction after loading, with mean/median frame rate, worst visible stalls and the trace or observation method. The provisional target is at least 30 FPS during active interaction. Render-on-demand idle periods are intentionally not continuous animation; an idle frame counter is not a valid failure or success measurement. If instrumentation is unavailable, document perceived stalls qualitatively and leave the numerical target unverified.

Check the separate engineering budgets from the frozen artifact and renderer instrumentation: selected-experience cold-load bytes ≤8 MiB, active triangles ≤100,000, device pixel ratio capped at 1.5. Report measurement scope, including whether assets were cached and whether both stories had already loaded. Passing these budgets does not substitute for phone measurement.

Use the ordinary product settings to try reduced motion and the flat renderer. Confirm that changing presentation preserves the same checkpoint and that the story remains completable. Test interrupted placement, tap alternatives, browser back/return and refresh around the meaningful placement. A promising frame-rate number does not excuse state loss, inaccessible controls or illegible text.

## Optional 48–72-hour prompted recall

Declare this follow-up, contact consent, eligible cohorts, timing window and coding method **before** the first session if it will be used. It is optional and does not alter the mandatory release thresholds. Do not introduce it after seeing an especially memorable success.

Without showing screenshots, naming the correct objects, linking the game or inviting a replay first, ask:

“Thinking back to the browser story you tried, what do you remember doing, and what changed because of something you did? It is fine if you do not remember.”

Record the exact elapsed hours, whether the participant replayed or discussed the game in the interval, the response in their words, and whether they describe a specific action/consequence. Report all invited participants, responses, nonresponses, refusals, out-of-window responses and intervening replays. Nonresponse is attrition, not a successful memory or assumed dislike. Keep any optional follow-up results separate from the primary six-session gate.

This measures **prompted delayed recall**, not organic return, engagement retention or a causal effect of remembered framing. A scheduled message and a small volunteer sample cannot establish those claims. Do not turn an absent neutral cohort or selective follow-up response into a comparative result.
