# Blank observation sheet

**Template only — no participant observation is recorded here.** Copy for each actual preregistered session; keep identifying and consent information outside the repository. All blank fields mean unknown, not false or passed.

## Identity and setup

| Field | Actual observation |
|---|---|
| Session ID / preregistered order | |
| Participant pseudonym / fresh-play eligibility confirmed | |
| Observer pseudonym / actual human | |
| Story / condition / release profile | |
| Candidate version / implementation SHA / immutable master SHA | |
| Exact build inventory SHA-256 | |
| Protocol registration UTC / session start UTC / end UTC | |
| Method: manual in person or manual remote | |
| Actual served URL / fresh context / storage availability | |
| Device model / physical or emulated / OS / browser version | |
| Viewport / orientation / zoom / input method / accessibility settings | |
| Consent and recording permission stored privately | |
| Initial capability expectation, exact words | |

## Journey, in observed order

| Relative time | Player action / control | Visible response | Player words or stated expectation | Hesitation, error, recovery or assistance | Evidence reference |
|---|---|---|---|---|---|
| | | | | | |

Add rows for arrival, first purposeful action, each new mechanic, the consequential choice/reveal, the first ending, Iona's return if applicable, placement, and exit. Preserve unsuccessful attempts and rereading. Distinguish a participant's quote from an observer's interpretation. Note whether Iona's return was spontaneous or scheduled. Do not infer that attention, smiles or completion alone mean fun.

## Endpoint and gate evidence

| Field | Observed result and evidence |
|---|---|
| Exact endpoint reached / abandoned / timed out | |
| Elapsed unaided gameplay / total session duration | |
| First assistance time and exact wording, or none | |
| Built-in transcript/hint/settings/flat-renderer use | |
| `completed_unassisted` and reason | |
| Iona: `explained_choice_to_return_action`, exact answer and reason | |
| Iona: `expected_unrestricted_ai`, words/attempts and reason | |
| Mara: `explained_action_to_visible_consequence`, exact answer and reason | |
| Joint success by this same participant: completion AND relevant explanation | |
| Unobserved, disputed or ambiguous evidence | |
| Critical bug IDs / severity rationale / effect on task | |

Use actual booleans only after observation. Assisted or abandoned completion is false; a missing explanation is false. Do not fill a different story's metric with a favorable substitute. A neutral report uses the Iona metric names but has no efficacy threshold; describe accurately when the player sees no choice-specific relationship.

## Player perspective

- First moment they wanted to continue, if any, with triggering action:
- Moment they wanted to stop or felt uncertain, and recovery attempt:
- Most story-connected action and least meaningful action, in their words:
- What they would tell a friend or remember later:
- Their comparison to another experience, labeled as their own claim:
- Desired action the prototype did not support:
- Observer hypothesis, explicitly separated from what the participant said:

## Reviewer record

- Independent reviewer pseudonym, human verification and relationship to all cohort roles:
- Evidence reviewed and exact build personally played:
- Metric decisions changed after review, with reasons and original values retained:
- Open critical issues and actual fix verification:
- Review date / readiness decision / remaining uncertainty:

The deidentified release JSON is a compact export from this evidence, not a substitute for it. Preserve the first-six denominator, failed sessions and original classifications when resolving disputes.
