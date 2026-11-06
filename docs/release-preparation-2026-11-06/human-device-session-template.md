# Physical-device and locale session — blank draft

**No physical-device pass, supported-browser claim or human approval is recorded.** Use one copy per actual device/configuration and exact build. A familiar QA operator may perform technical checks; their run does not count as a fresh product cohort. Use the canonical game session form as well if this is a registered product study.

| Identity and setup | Record |
|---|---|
| Coverage/session ID / purpose / canonical protocol | |
| Game / story / profile / condition / reference order | |
| Source commit / candidate version / master commit / inventory SHA-256 | |
| Exact hosted URL and verified served-build identity | |
| Displayed locale / instruction language / browser language | |
| Locale catalog revision/hash / reference locale | |
| Human tester and observer IDs / prior exposure | |
| Actual device model / hardware class / OS build | |
| Browser name / full version / actual engine if known | |
| Physical screen / CSS viewport / scale / orientation / split view | |
| Actual touch, pointer, stylus, external keyboard/trackpad, IME | |
| Actual assistive technology/version, text size and motion preference | |
| Network/access route / private or blocked storage / fresh-save state | |
| Started_at UTC / local time zone / consent reference when required | |

Record actual behavior, not a checkbox inferred from another platform. `Unknown` and `not run` are valid limits. Keep prompts/interventions verbatim.

| Time / state | Action and input | Expected player-facing result | Actual result / quotation | Help or interruption | Evidence | Defect / severity proposed |
|---|---|---|---|---|---|---|
| | | | | | | |

| Check area | Actual configuration and observation | Pass / fail / not run / unknown | Evidence and limitation |
|---|---|---|---|
| Fresh entry, locale choice/fallback and visible language | | | |
| Core action through actual completion/ending | | | |
| CJK glyphs, wrapping, clipping and meaningful text order | | | |
| IME composition/commit, mixed text, virtual keyboard and focus | | | |
| Touch/pointer/keyboard equivalents and focus visibility | | | |
| Orientation, resized viewport, safe areas and available split view | | | |
| Download/share or exported text; actual saved file opened | | | |
| Privacy, reset/retry, storage denial/recovery where supported | | | |
| Background/resume/reload; actual persisted state or intended reset | | | |
| Reduced motion, screen reader and text resizing actually available | | | |
| Graphics fallback, responsiveness, thermal/memory observations | | | |
| Root/nested production path and external asset availability | | | |

| End and disposition | Record |
|---|---|
| completed_at UTC (including abandonment/failure) / exact endpoint | |
| Full critical path or targeted smoke actually covered | |
| Reproduction steps / private raw evidence locator | |
| Human critical-bug classification and remaining uncertainty | |
| Corrected version/hash and required rerun | |
| Device/locale support claim justified, limited or still pending | |
| Independent review reference, when it actually exists | |

One browser brand is not necessarily a different engine. Record WebKit-based iOS Chrome honestly; it is not Chromium-engine coverage. A desktop emulated viewport is not a physical phone/tablet. Do not infer zero critical bugs from an empty table or carry results across changed build bytes.
