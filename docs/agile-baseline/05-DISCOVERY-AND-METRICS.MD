# Discovery and measurement plan

## Product hypothesis

An adult who repeatedly loses the thread between handwritten reflection, reference notes and a generic AI chat will return for a companion that resumes their thought with verifiable personal context. The magical writing ritual can invite use; defensible value must be demonstrated through better continuation, earned trust and a repeatable distribution path. These remain hypotheses.

## Sprint 1 discovery: MC-007

Conduct five consented behavioral interviews, using authorized recruitment only. Ask participants to show a recent interrupted note-taking task with private content hidden. Observe the workaround before presenting the product. Record recruitment gaps honestly; five interviews guide a segment choice and cannot establish product-market fit.

Suggested questions: What were you trying to finish? Where did the relevant context live? Show how you resumed. What was lost or re-entered? Which response did you distrust and why? What do you currently pay or spend time on? What would prevent you from importing notes? What evidence would make you switch? Avoid asking only whether the magic-book concept is appealing.

Store consent separately from anonymized notes. Do not copy private notes into tickets or train models on them. Deliver a job statement, observed frequency and workaround, switching barriers, conflicting cases and a decision to keep or narrow the segment. No interviews have been run for this pack.

## Mental experiments and follow-up tests

| Question | Test after prerequisites | Decision evidence |
|---|---|---|
| A competitor copies the book tomorrow; why stay? | MC-023: fair note-resumption task, comparable models and sources, with export-equivalent competitor setup | Proposed 16/24 prefer our continuation and ≥20% faster useful resumption without accuracy loss; report uncertainty |
| Remove the visual magic; is there still value? | Plain presentation treatment alongside full ritual | Separate useful continuation from novelty and animation preference |
| A major platform gives memory away; why pay? | Compare complete tasks and trusted correction/source navigation, not memory-feature counts | Observed willingness to pay and complete paid cohorts |
| Our best distribution channel disappears; can we grow? | MC-026 partner renewal and largest-channel-removal scenario | Attributed retained payers, channel concentration and repeated acquisition |
| What would a sustainable small company require? | MC-027 model using observed net revenue, churn, usage and support burden | Contribution margin and acquisition payback with sensitivity ranges, not invented revenue forecasts |

M0 must pass before real customer notes enter a product pilot. MC-023 proposes 24 counterbalanced participants; that is a directional decision sample, not a precise population estimate. Pre-register tasks and rubric, record withdrawals and missing data, and do not handicap the alternative's exports or model access. MC-026 outreach needs explicit authorization before sending.

## Metrics dictionary (instrumentation proposed)

| Metric | Definition / denominator | Segmentation / caveat |
|---|---|---|
| Durable acknowledgment loss | Acknowledged operation IDs absent after recovery / acknowledged operations in the declared fault suite | Local versus remote ack; finite failure model |
| Recall accuracy | Correct recall probes / all held-out recall probes | Source version, language, scope; include abstentions by rubric |
| Citation support | Supported cited claims / evaluated cited claims | Also report unsupported claims without citations |
| Trace coverage | Turns with all required timing, route and usage-status fields / initiated turns | Include failures; unknown usage is not zero |
| Time to visible reply | First visible reply timestamp minus input-end timestamp | Include recognition, five-second fade, routing and screening; p50/p95 with sample counts |
| Cost per successful turn | All provider, recognition, retry and tool costs / successful turns | Show total cost and failure rate; distinguish estimated from reconciled usage |
| Activation | Users completing write, relevant reply and successful saved-note reopen / eligible new users | MC-027 proposed ≥70%; define eligibility before cohort starts |
| Useful return | Activated users with a self-rated useful session on days 22–28 / activated users with a fully observed window | Proposed ≥30%; report all-user return separately |
| Reply usefulness | Positive usefulness ratings / rated replies | Proposed ≥70% with ≥10% rating coverage; report coverage and selection bias |
| Paid retention | Payers still subscribed at end of stated period / payers at period start | Refunds/cancellations and complete cohort windows |
| Contribution margin | (Net revenue after fees minus variable AI, infrastructure and support cost) / net revenue after fees | Avoid subtracting fees twice; proposed ≥65% at scale gate |
| CAC payback | Attributed acquisition cost per new payer / monthly contribution per payer | Proposed ≤6 months; include partner payments and founder-time sensitivity |

Example events: input_ended, local_operation_acked, remote_operation_acked, recognition_completed, fade_completed, reply_first_visible, source_opened, memory_undone, note_reopened, report_submitted. These names are suggestions, not implemented telemetry. Use pseudonymous IDs, operation/trace revisions and coarse device/locale fields; omit raw ink, note content and credentials. Record consent/retention requirements before collection.

M2 proposals: activation ≥70%, useful return ≥30%, usefulness ≥70% with ≥10% rating coverage and ten paying customers. Later scale review requires at least 100 payers and three months of complete cohort evidence, churn trending ≤5% monthly, contribution margin ≥65% and CAC payback ≤6 months. These targets are assumptions to test, not existing results or guaranteed commercial outcomes.

## Experiment log template

Hypothesis; segment/job; alternative explanation; prerequisite gate; consent and recruitment status; method; primary metric and threshold fixed before test; sample/observation window; result and uncertainty; adverse findings; continue/narrow/stop decision; owner and next review. Current results: not collected.
