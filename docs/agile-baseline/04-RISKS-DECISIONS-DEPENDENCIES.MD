# Risks, decisions and dependencies

Prepared 2026-09-14. Owners are roles awaiting assignment. Ratings describe planning impact, not measured probabilities.

| Risk | Impact / trigger | Mitigation and next action | Owner | Status |
|---|---|---|---|---|
| R01 Capacity assumed | High: fewer than two engineers or major audit gaps | Day-3 re-estimate, remove uncommitted scope, retain M0 gates | Engineering lead | Open |
| R02 Live access unavailable | High: credentials, allowed region or spend missing | Resolve before MC-005; keep blocked rather than substitute mock evidence | Product + AI lead | Open |
| R03 Storage/session contract mismatch | High: duplicate writes or owner ambiguity | MC-001 contracts before integration; two-user and retry cases | Backend lead | Open |
| R04 OCR concurrency | High: stale recognition replaces correction | Non-canceling jobs with revision guards and current-page reveal checks | Client lead | Open |
| R05 Deletion leaves derived memory | High: deleted source still recalled | Provenance links, tombstones, invalidation and 50-case suite | Data/backend lead | Open |
| R06 Safety/privacy market assumptions | High: unreviewed destination or eligibility | Select launch markets; map data flows and obtain qualified review | Product + Privacy/trust | Open |
| R07 Device evidence missing | High: web tests mask native issues | Reserve hardware and signing early; actual installed-device matrix | QA + Mobile | Open |
| R08 Restore incomplete | High: database restore misses objects or keys | Combined restore drills, declared RPO/RTO and tombstone replay | Operations | Open |
| R09 Cost obscured by retries/tools | High: usage unavailable or budget race | Unknown-cost states, reservations, trace/bill reconciliation | AI + Operations | Open |
| R10 Attractive demo lacks repeated value | High: no meaningful return after novelty | MC-007 interviews, then fair MC-023 comparison after M0 | Product + Research | Open |
| R11 Provider/plugin claims drift | Medium/high: capabilities differ by endpoint | Versioned capabilities and real conformance tests; pin adapters | AI/platform | Open |

## Accepted constraints: do not reopen casually

One companion per user across notebooks; current-notebook recall by default with explicitly scoped expansion; automatic learned-memory history and undo; behavior/instruction changes proposed for review; built-in AI plus personal connections; bounded task routing with an always-use-selected-model switch; generic plugins instead of a PaperQA-specific core; recognition/fading and region-erasure rules in the QA document. PaperReadingAgent is source-only until hosted service evidence exists. These are product direction; implementation completion remains unverified.

## Decision queue

| ID | Decision and output | Needed by | Accountable role | Proposed starting position |
|---|---|---|---|---|
| D01 | Staff, sprint start and capacity agreement | Planning | Product + Engineering | Ten working days; commit only demonstrated capacity |
| D02 | Session, durable operation and source-version ADRs | Day 3 | Engineering | Durable local operation IDs with explicit remote acknowledgment |
| D03 | Provider/vision endpoints, model IDs and spending allowance | Before MC-005 | Product + AI lead | One smoke route first; two providers before M0 |
| D04 | Initial countries, languages and target adult segment | Before MC-017/020 commitment | Product + qualified reviewers | Narrow reviewed markets first; global extensibility |
| D05 | Retention, deletion, backup and handling policy | Before MC-015–018 commitment | Privacy/trust + Operations | Minimal retained context and visible deletion limits |
| D06 | Physical devices, signing and QA access | Sprint planning | Mobile + QA | Reserve actual devices before scheduling the release gate |
| D07 | Recognition benchmark and model replacement decision | MC-022 refinement | AI + Research | Compare verified vision adapters; local editable handwriting rendering |
| D08 | Hosted PaperReadingAgent scope, revision and budget | MC-025 refinement | Product + Platform | Separate versioned service behind generic plugin contract |

These starting positions are recommendations, not additional user approvals already obtained. No verified model called “gpt-image-2.5” is assumed. No customer outreach or public deployment is performed by creating this plan.

## Critical dependency paths

MC-001 → MC-002/003 → MC-004 → MC-008 → MC-009 → controlled memory/deletion. MC-004 → MC-014 → MC-015, with export/deletion MC-016 also required for restore. MC-017 → providers/plugins/trust/eligibility review. MC-006 plus sync and sessions → physical-device evidence. All listed M0 gates converge at MC-024. BACKLOG.json contains exact directed dependencies; validate it when moving cards.

## Change record template

Decision ID; question; options and trade-off; evidence; accountable person; decision/date; affected cards/estimates; reversibility; validation date. For a blocker record first-seen date, next concrete action, owner and escalation date. None of the open decisions is marked resolved here.
