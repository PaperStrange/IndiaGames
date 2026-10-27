# Vivid journey and physical-device handoff

**Blank preparation aid. No player, phone or screen reader has been tested by this form.** Use the canonical [observation sheet](../vivid-iteration-2026-10-21/human-study/observation-sheet.md) for each preregistered real session. Intended stages below are prompts for the observer, not instructions to give the participant or a completed journey record.

| Intended stage | Iona observation prompt | Mara observation prompt | Record in the actual journey |
|---|---|---|---|
| Entry / expectation | What does the portrait invite them to do? | What does the workbench invite them to do? | First expectation in their words, time to first purposeful action, initial uncertainty. |
| Exploration / recovery | How do they notice marks and recover from a wrong signal? | What object order do they choose, and what do they infer? | Actual input, visible feedback, mistakes, rereading, hints and first help. |
| Reinterpretation | Does the earlier watch read as earlier, and does repair communicate care? | Does alignment reveal an intelligible change? | Action → expectation → visible consequence; separate quotes from interpretation. |
| Authorship / ending | What do they believe the privacy/dedication choice permits? | Does any interpretation feel prescribed or graded? | The actual choice, explanation, desired unsupported actions and ending reached. |
| Return / closure | Spontaneous or scheduled? Why this object and place now? | What does the completed drawing mean to them? No required return. | Completion, causal explanation, voluntary retry/leave and uncertainty. |

Do not infer emotion from silence, smiles or finishing. Ask the non-leading canonical debrief after scored actions; keep the player's stated feeling distinct from observer hypotheses. Scheduled return and optional prompted recall remain different from organic retention.

## Physical-device record — one copy per device and build

| Field | Actual measurement / evidence |
|---|---|
| Build SHA-256 / candidate / actual served URL | |
| Real reviewer pseudonym / actual UTC / consented evidence references | |
| Physical device model / OS / browser and version / screen-reader name and version | |
| Viewport / orientation / zoom / input / display refresh rate | |
| Network / cache state / power mode / device temperature context | |
| Cold-load method, measured bytes and elapsed time | |
| Rendering path: 3D or flat; motion preference | |
| Three active 30-second samples: method, mean/median FPS, stalls, trace refs | |
| Iona complete with touch: result, interruptions and assistance | |
| Mara complete with touch: result, interruptions and assistance | |
| Real keyboard: focus order/visibility, activation, cancellation, placement/alignment | |
| Real screen reader: titles, controls, state updates, transcript and both endpoints | |
| Text legibility / zoom / portrait-landscape / browser back / background-resume | |
| Reduced motion / flat fallback: same progress and both endpoints | |
| Critical/blocking issues, severity reason, reproduction and evidence | |
| Unmeasured items and reviewer conclusion | |

Use the detailed [device method](../vivid-iteration-2026-10-21/human-study/devices-and-recall.md). Measure active interaction rather than idle render-on-demand frames; target 30 FPS on physical hardware. If instrumentation is unavailable, describe observed stalls and leave the numerical target unverified. Keep ≤8 MiB cold-load, ≤100,000 active triangles and DPR ≤1.5 budgets distinct from physical performance. A desktop phone viewport, synthetic test, successful flat fallback or small asset size does not establish a physical 3D pass.

This sheet is evidence for the human reviewer, not an automatic approval. The approver must be independent of all participants and observers and personally play the exact build. Record open problems and disagreements; an empty form is never a successful check.
