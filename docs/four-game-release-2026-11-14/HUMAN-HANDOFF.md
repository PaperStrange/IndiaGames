# Hand over human results · all four games

Send one Google Drive folder or ZIP with a batch index and one folder per game: **Small Hours**, **Vivid** (separate Iona/Mara records), **The Thirteenth Bell**, **Tom’s Notebook**. Markdown, Google Docs and spreadsheets are welcome. You do not need to write release JSON; the integrator will transcribe reviewed facts and validate them.

Send partial batches now. Mark missing information **unknown** and checks **not run**. Keep failed, abandoned, assisted and repeat attempts alongside successful ones. A helpful retrospective observation can guide a fix without qualifying for a preregistered release cohort.

## What to include

| Item | Minimum useful record | Purpose |
|---|---|---|
| Batch index | Game/story, purpose, test dates, exact tested URL/version, source/build/catalog hash if known or original build ZIP; coordinator ID and file links | Identify what was actually tested |
| Original sessions | Pseudonymous session/player/pair and observer IDs; protocol and preregistration; prior exposure; locale/instruction language; actual start/end; full attempted journey, quotes, help, failures and endpoint | Understand the player and assess the product criteria |
| Fluent review | Reviewer ID and language competence; exact game/story/build; original wording, correction/reason, affected string or scene and recheck | Qualify English, Japanese and Simplified Chinese |
| Device sheet | Actual model, OS/browser full version, input/IME/accessibility settings, orientation/text size; full path versus smoke scope; actual download/open result where relevant | Support bounded desktop, phone and tablet claims |
| Defects | Exact build/state, expected/observed, reproduction, evidence locator, proposed severity and fix/retest status | Prioritize work and obtain human critical-bug classification |
| Independent decision | Reviewer identity/conflicts, exact build personally played, original evidence reviewed, approve/revise/stop and actual date | Decide release after all relevant evidence exists |

Use the [blank human-session template](../../templates/game-demo/06A-HUMAN-SESSION.md) for a full player journey. The [scope/preregistration](../release-preparation-2026-11-06/human-scope-preregistration-template.md), [language review](../release-preparation-2026-11-06/human-language-review-template.md) and [device session](../release-preparation-2026-11-06/human-device-session-template.md) forms already provide readable tables. They are preparation forms, not an automatic candidate approval.

For every meaningful step, record **time → screen/state → action → prediction before the outcome → actual outcome → exact words → any help**. Keep observable behavior separate from the observer’s interpretation. Record the first confusion, recovery, natural mistakes, rereading, voluntary replay and reason for stopping; do not coach a success into the metric.

Record predictions and quotes only when spontaneous or explicitly required by the adopted protocol; otherwise write **unknown**. Do not add think-aloud or prediction prompts during canonical unaided measures.

## Cohorts and game-specific observations

| Game | Existing or proposed required product cohort | Preserve these observations |
|---|---|---|
| Small Hours | Six pairs / twelve people; unchanged | Unaided reveal, both people’s creative contribution, voluntary save/replay, privacy and turn ownership. Existing criteria: ≥5 reveal, ≥4 both contribute, ≥3 voluntarily save/replay. Pilot-first staging remains. |
| Vivid · Iona | Six fresh players; unchanged | The same player both completes unaided and explains choice→return; ≥4/6 joint successes, ≤1/6 expecting unrestricted AI. |
| Vivid · Mara | Six different fresh players; unchanged | The same player both completes unaided and explains arrangement/action→visible consequence; ≥4/6 joint successes. Keep Iona and Mara separate. |
| The Thirteenth Bell | Six fresh participants; unchanged | Candidate/reference language and hashes, balanced 3/3 first-build order; ≥4 cause+prediction, ≥4 earned action+Fracture explanation, ≥3 specific Mina outcomes after a genuine ≥120-second neutral break. |
| Tom’s Notebook | Six additional fresh solo players; owner-selected, protocol adoption pending | Proposed ≥4/6 jointly finish unaided and explain an edit→reply/ending consequence. Record original-entry recovery, authored-versus-AI expectations, trust and voluntary continuation separately. |

Preserve the first six preregistered attempts in each required cohort, including failures. Do not replace unfavorable attempts, backdate registration, reuse a familiar tester as fresh or count a document as a distinct person. Notebook adds six people to the original 30-person baseline; the optional Vivid neutral study and supplemental locale sampling stay separate.

Notebook’s [pinned draft protocol](https://github.com/PaperStrange/IndiaGames/blob/f2a90c242350ea1a3d9d9ffdd9cccf9d777a286c/docs/governance/locale-device-evidence-2026-11-06/NOTEBOOK-PROTOCOL.md), [decision worksheet](https://github.com/PaperStrange/IndiaGames/blob/f2a90c242350ea1a3d9d9ffdd9cccf9d777a286c/docs/governance/locale-device-evidence-2026-11-06/NOTEBOOK-DECISION.md) and [Notebook session form](https://github.com/PaperStrange/IndiaGames/blob/f2a90c242350ea1a3d9d9ffdd9cccf9d777a286c/docs/governance/locale-device-evidence-2026-11-06/NOTEBOOK-HUMAN-SESSION.md) are prepared in [PR #17](https://github.com/PaperStrange/IndiaGames/pull/17). They need actual human review before qualification. For every game, additional language-comprehension claims need reviewed sampling, eligibility, neutral prompts and outcome criteria before observing results. Six mixed-language rows do not establish three-language qualification.

For Notebook on phones, preserve what the player naturally looks at after **Send** and whether they notice the changed reply without help. Discuss these formative observations only **after canonical unprompted measures**; do not point out the reply during the attempt. Record unknown when observation cannot establish attention. Automated checks scroll controls into view, so their success does not establish human noticing or discoverability.

## Exact versions and private originals

Older handoffs point to frozen English baselines, including Vivid 0.1.4 and Bell 0.1.0. November 6 multilingual development builds have different bytes. Preserve the actual tested artifact; an old record cannot become a new multilingual pass by changing its label. If you only know the URL/date, send those and the original files so the integrator can investigate identity; do not guess a hash.

Notebook’s [0.1.0 development preview](https://paperstrange.github.io/IndiaGames/development/toms-notebook/0.1.0/) is a distinct game, not the existing 0.4.0-alpha.0 product and not an approved release candidate. Its [exact export record](https://github.com/PaperStrange/IndiaGames/blob/9330f88fd9960ce30f9de1490ccf4870e10cac1e/docs/gamejam/notebook-game-2026-11-14/committed-export.json) identifies source `5ef5ab4` and inventory `b91bc1f841ac6e9910a8be0ca8c6663e0253d7d41c0aab4a09088e3f7bd2dc9a`. Preserve this identity with any formative feedback; qualifying sessions still require reviewed protocol adoption and the appropriate exact candidate packet.

Keep contacts, consent, personal writing/keepsakes and identifiable recordings in restricted private storage. Use pseudonyms in shared tables and stable private locators with reviewer access. Publish only deliberately reviewed, deidentified summaries. Preserve original-language quotes; put translations beside them, labelled as translations. The previously supplied fifteen documents remain human feedback under the owner’s correction; their old agent labels are retained as source history rather than reopened as an attribution question.

The independent release reviewer must play the exact build and review the originals. Current policy requires separation from participants/observers; PR #17 proposes additional separation from language editors/device testers and still needs review. No reviewer identity or approval is inferred from an empty field.

## What happens after you deliver

1. Inventory and preserve originals; map each record to its real game/story/build and classify its purpose.
2. Return a short list of missing identities or coverage while using usable criticism immediately.
3. Prioritize reproducible defects and player-journey failures; implement bounded fixes and retest affected exact bytes.
4. Transcribe eligible reviewed facts into the appropriate candidate schema without inventing booleans, timestamps or critical-bug counts.
5. Update dashboard evidence and make a separate go/defer decision per game. Human approval, all three languages, real device coverage and effective repository protection remain required.

Your highest-value unblockers are accepted fluent reviewers, actual device access, a responsible protocol reviewer, facilitator availability and administrator readback for [issue #2](https://github.com/PaperStrange/IndiaGames/issues/2). None is represented as already arranged.
