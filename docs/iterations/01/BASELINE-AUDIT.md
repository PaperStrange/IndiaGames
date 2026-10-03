# Sprint 1 baseline audit

Date: 2026-10-03. Source inspected: `2cadd253452e6f9d806255fa532ca581816b71b2`, the latest saved Site version 6. Product baseline: alpha 0.4. Planning basis: Agile-Iteration-01-v1, MC-001–027. Root AGENTS.md was read for this task.

| M0 workstream / cards | Existing code | Observed gap | Accountable role | Required acceptance evidence |
|---|---|---|---|---|
| Identity / 002 | `lib/server.ts`, `app/chatgpt-auth.ts`, all API routes | Owner default remains; app-owned public/native sessions and revocation unverified | Backend | Two real users, expiry/revocation and object isolation |
| Device durability / 003 | `app/notebook-app.tsx`, new `lib/notebook-journal.ts` | Device journal added; browser/device validation and fully offline startup remain open | Client | Restart, quota, acknowledgment races and actual browser evidence |
| Sync / 004, 014 | `app/api/notebook/route.ts`, `db/schema.ts` | Whole-snapshot compare-and-set; no server operation deduplication or conflict resolution UI | Backend + Client | Two-client handoff, duplicate requests, 100 fault cases |
| Recovery / 015 | D1 notebook records and R2 documents | No verified combined restore procedure or drills | Operations | Two measured restores, RPO ≤15min and RTO ≤4h |
| Portability / 016 | Existing page export; new device-copy JSON export | Account-wide portable import and deletion propagation remain open | Backend + Client | Independent export inspection and deletion trace |
| Recall / 008–010 | `lib/companion-memory.ts`, `lib/companion-types.ts` | Lexical page excerpts; source versions and derived-memory invalidation absent | AI + Backend | 100 source probes, 50 scope/deletion probes, history/undo |
| Providers / 005, 011 | `lib/inference-transport.ts`, `lib/provider-registry.ts`, settings routes | Adapters exist; paid live-provider runs have no evidence for this iteration | AI | First real smoke, then two configurations and 100 turns each |
| Measurement / 012 | `lib/companion-store.ts`, `companionRuns` | Usage reservations exist; complete latency waterfall and bill reconciliation unverified | AI + Operations | ≥95% trace coverage, measured latency/cost and budget races |
| Plugins / 013 | `lib/remote-plugins.ts` | Generic adapters exist; live conformance, egress and injection evidence absent | Platform | Two real conformance services and permissions/failure cases |
| Privacy / 017 | Settings encryption and owner-filtered queries | Selected-market retention, disclosure, revocation and privacy operations need review | Privacy + Engineering | Data inventory and destination/retention review |
| Content/reporting / 018–019 | Companion prompts and routes | Complete pre-reveal content policy and incident reporting absent | Trust + Client | Balanced 300-case evaluation and incident drill |
| Market readiness / 020 | Provider configuration | Reviewed server-side country eligibility absent | Product + Privacy | Per-market decision records and server checks |
| Ink/devices / 006, 021 | `app/use-ink-flow.ts`, `lib/ink-cycle.ts`, `lib/erase-ink.ts`, Capacitor configuration | State behavior has regression tests; installed-device journeys unverified | Client + QA | Physical devices, IME, region erasure, accessibility and latency |
| Integrated release / 024 | `QA.md`, version documents | M0 evidence incomplete | Product + Engineering + QA | Exact candidate go/no-go after all gates |

## Execution decisions

MC-001 audit and interface design have been drafted in this directory. MC-003 implementation and state-level MC-006 validation can proceed while session and provider prerequisites are resolved. None of the M0 cards is marked Done by this audit alone. Engineering/QA staffing and live-provider spending configuration remain unconfirmed; the original two-engineer, six-week forecast has no renewed delivery commitment.

The 2026-10-03 user request adds MC-028 for the diary material and animation treatment. This work preserves the five-second fade, regional correction and current functionality. It has separate visual and physical-device acceptance evidence.

## Test boundary

Existing provider tests substitute network responses and a Cloudflare environment. They are outside the selected verification commands for this task under AGENTS.md. New persistence tests use Node's actual file-backed Web Storage implementation, including separate processes and a real quota error. Those results cover the journal logic and storage API behavior; browser-engine eviction, hardware and interactive UI remain separate checks.
