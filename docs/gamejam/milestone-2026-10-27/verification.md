# Bell verification and observed agent journey · 27 October

Tested implementation: `700dcea61eaedc704ddce5adc98d5a6bd5d42a06`. The [source binding](verification/source-binding.json) checks every browser-tested runtime file against this commit and confirms a fresh pinned export matches the tested HTML. Browser runs began with uncommitted source over the documentation commit; their recorded file hashes, not that ancestor SHA alone, establish identity.

Candidate 0.1.0 contains one **1,455,336-byte** HTML file. File SHA-256: `433c9c6706e95ce5da2e541d73c2662322bef8b8c391e72ae451dcd42c80b973`. Inventory SHA-256: `fa7e9a4f5cc66a9798c6e3cb2c418a240bdbc2a11367d6f54ed2c1989bdfd51e`. These are different hashes by design; the release validator hashes the sorted file inventory.

| Check | Actual result and evidence |
|---|---|
| Pure rules | 15 passed: three existing echo-time tests and twelve new event-rule tests. [Preserved outputs and hash reuse](verification/runtime-checks/) identify the unchanged four rule/test files; missing original execution timestamps remain null. |
| Final static/build | [19 passed](verification/runtime-checks/static-final-wrapping.json) after the final CSS changes; exact execution times and before/after hashes recorded. |
| New browser regression | [16/16 scenario groups passed](verification/browser-final/report.json), including observed/reported clues, forecasts, ordinary/borrowed action, duplicate inputs, interruption, modes, full ending, keyboard, 390px, enlarged text, iframe and portable HTML. Candidate page/console/resource errors: zero. |
| Existing complete journey | [19 recorded journey steps](verification/legacy-journey/after-action-trace.json), including ending, restart and catastrophe; zero page exceptions. Steps are not a count of unit assertions. |
| Existing HTTP smoke | [19 assertions passed](verification/http-smoke-final/report.json), using the original assertions with HTTP transport and a fresh browser profile. |

## What the automated player actually did

These are scripted agent observations with the solution known. They are not a blind human discovery study, emotional testimony or evidence of fun.

1. Entered Contrast, chose a Square action at Dawn, and saw the crowd strand Mina at Noon. The journal named Loop 1 / Noon / Bell Square as the source. Being elsewhere or arriving late produced a report, not that clue.
2. Carried memory through midnight. On the next morning, ordinary preparation worked even with zero Momentum. A borrowed preparation instead spent exactly one Momentum, kept Dawn and the locked forecast, and allowed a further expedition action.
3. At the real boundary, the prepared route put Mina and her crate at the well. When the boundary happened elsewhere, the receipt correctly called it a town report. The later Square scene and ledger agreed with the destination.
4. Deliberately reached Fracture four before Noon: the crossing was interrupted without an invented outcome or forecast reward. Later catastrophe retained an already resolved outcome. Repeat input did not duplicate resources or phase advancement.
5. Completed the full ending and restarted. The complete keyboard route used 30 Tab/Enter activations, with visible focus after every transition. These are tool-driven steps, not measured human effort or completion time.

The lasting player question is whether understanding this cause makes the intervention feel worthwhile. The six-person protocol remains the next test of that hypothesis.

## Before/after visual inspection

Compare [the witnessed blockage](verification/browser-final/witnessed-blockage-before-outcome.png) with [the successful destination](verification/browser-final/borrowed-route-visible-outcome.png). The same Mina silhouette, crate and redflower move from stalls to well; the crowd still blocks the original alley. The side-path shape and explicit labels carry the consequence without relying on color. The canon town map remains intact. [Doubled-text outcome](verification/browser-final/mina-route-text-200-percent-outcome.png) remains readable at a 390px viewport.

Root and the runtime agent inspected actual captures. This does not establish physical-device, screen-reader or human readability. The text-enlargement case doubles computed text sizes without enlarging layout widths; it is a CSS stress test, not physical browser zoom.

## Failures retained and fixed

[Earlier reports](verification/attempts/) preserve the initial resource failure and layout investigations. The candidate's Google Fonts dependency was removed. The frozen reference retains its original optional font failure, recorded separately rather than ignored for the candidate. Phase-inconsistent Square copy and the future ledger were corrected. Keyboard focus loss and enlarged-text clipping were fixed; a diagnostic was narrowed to text labels after it incorrectly flagged the intentionally protruding YOU badge. Final results above cover the resulting bytes.

The [first HTTP smoke attempt](verification/http-smoke-first-attempt/report.json) failed before attaching a debugger: the restored October 5 profile retained a lock for a previous host. The same game and assertions passed using a fresh profile through [the preserved adapter](verification/smoke-http.py). No browser security policy was disabled to obtain the result.

Human sessions: **zero**. Physical phone/Safari, assistive technology and independent approval remain pending. Blank reports do not pass release readiness.
