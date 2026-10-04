# MentalCityBeta — prioritized backlog

**Planning pack:** agile-v1 · **Prepared:** 2026-09-14 · **Baseline:** alpha 0.4 / docs-v5

All 27 cards are Proposed. None is an assigned external-tracker ticket or completed implementation. P0 means customer-baseline release risk, not that every card fits Sprint 1. P1 denotes discovery or later quality/value work. Order uses customer risk and dependencies; no invented RICE score or historical team velocity is used. Dependencies refer to these stable card IDs.

## Story map

| User activity | Cards | Outcome |
|---|---|---|
| Entrust my work | MC-001–005, MC-014–017 | Ownership, durable capture, sync/recovery, privacy and real provider operation |
| Write, correct and resume | MC-006, MC-008–010, MC-021–022 | Accurate interaction, controlled memory and verified sources |
| Choose and understand AI | MC-011–013, MC-025 | Routing, cost/latency and scoped integrations |
| Get safe, supported help | MC-018–020, MC-024 | Content handling, incident response, country eligibility and baseline readiness |
| Establish commercial value | MC-007, MC-023, MC-026–027 | Segment, comparison, acquisition, retention and payment evidence |

## Ordered cards

| ID | Title | Type | Priority | Forecast | Dependencies |
|---|---|---|---|---|---|
| [MC-001](Story-Cards/MC-001.MD) | Freeze the baseline contracts and resolve implementation risks | Enabler | P0 | S1 | — |
| [MC-002](Story-Cards/MC-002.MD) | Sign in and access only my own notebook data | Story | P0 | S1 | MC-001 |
| [MC-003](Story-Cards/MC-003.MD) | Keep acknowledged writing after a local restart | Story | P0 | S1 | MC-001 |
| [MC-004](Story-Cards/MC-004.MD) | Sync a note without duplicate or silent overwrite | Story | P0 | S1 | MC-002, MC-003 |
| [MC-005](Story-Cards/MC-005.MD) | See one genuine provider reply with measured usage | Story | P0 | S1 | MC-001, MC-002 |
| [MC-006](Story-Cards/MC-006.MD) | Correct fading ink without losing my intent | Story | P0 | S1 | MC-001 |
| [MC-007](Story-Cards/MC-007.MD) | Understand the real note-to-AI switching problem | Discovery | P1 | S1 | — |
| [MC-008](Story-Cards/MC-008.MD) | Open the exact source behind recalled information | Story | P0 | S2 forecast | MC-001, MC-002, MC-004 |
| [MC-009](Story-Cards/MC-009.MD) | Make corrections and deletion change future recall | Story | P0 | S2 forecast | MC-008 |
| [MC-010](Story-Cards/MC-010.MD) | Control one companion’s memories across notebooks | Story | P0 | S2 forecast | MC-002, MC-008, MC-009 |
| [MC-011](Story-Cards/MC-011.MD) | Choose providers and keep the selected model locked | Story | P0 | S2 forecast | MC-005, MC-017 |
| [MC-012](Story-Cards/MC-012.MD) | Know the actual latency and cost of a useful reply | Story | P0 | S2 forecast | MC-005, MC-011 |
| [MC-013](Story-Cards/MC-013.MD) | Use scoped plugins without leaking unrelated notes | Story | P0 | S2 forecast | MC-002, MC-011, MC-017 |
| [MC-014](Story-Cards/MC-014.MD) | Recover from concurrent edits and interrupted sync | Story | P0 | S2 forecast | MC-004, MC-009 |
| [MC-015](Story-Cards/MC-015.MD) | Restore synced notebooks after a service disaster | Story | P0 | S3 forecast | MC-014, MC-016 |
| [MC-016](Story-Cards/MC-016.MD) | Export and delete my personal data | Story | P0 | S3 forecast | MC-009, MC-010, MC-017 |
| [MC-017](Story-Cards/MC-017.MD) | Understand and control where my notes are processed | Story | P0 | S2 forecast | MC-001, MC-002 |
| [MC-018](Story-Cards/MC-018.MD) | Receive grounded replies without harmful streamed fragments | Story | P0 | S3 forecast | MC-008, MC-011, MC-017 |
| [MC-019](Story-Cards/MC-019.MD) | Report a bad reply and have the incident handled | Story | P0 | S3 forecast | MC-018 |
| [MC-020](Story-Cards/MC-020.MD) | Use only supported country and provider routes | Story | P0 | S3 forecast | MC-011, MC-017, MC-019 |
| [MC-021](Story-Cards/MC-021.MD) | Write and resume smoothly on real mobile devices | Story | P0 | S3 forecast | MC-002, MC-006, MC-014 |
| [MC-022](Story-Cards/MC-022.MD) | Interpret messy handwriting with fewer corrections | Story | P1 | M1 after M0 | MC-006, MC-011, MC-021 |
| [MC-023](Story-Cards/MC-023.MD) | Prove useful continuation against a strong alternative | Discovery | P1 | M1 after M0 | MC-007, MC-024 |
| [MC-024](Story-Cards/MC-024.MD) | Demonstrate that the customer baseline is ready | Release gate | P0 | S3 forecast | MC-002, MC-003, MC-004, MC-006, MC-008, MC-009, MC-010, MC-011, MC-012, MC-013, MC-014, MC-015, MC-016, MC-017, MC-018, MC-019, MC-020, MC-021 |
| [MC-025](Story-Cards/MC-025.MD) | Connect PaperReadingAgent through a hosted adapter | Enabler | P1 | M1 candidate after M0 | MC-013 |
| [MC-026](Story-Cards/MC-026.MD) | Find a repeatable community acquisition channel | Discovery | P1 | M2 after M0 | MC-007, MC-024 |
| [MC-027](Story-Cards/MC-027.MD) | Measure retained value and a sustainable paid offer | Discovery | P1 | M2 and M4 | MC-012, MC-023 |

Sprint 1 candidates are MC-001–007. The selected engineering subtotal is 14 engineer-days; MC-007 additionally needs two product/research days. S2/S3 are an unestimated forecast, not a capacity commitment. All M0 gates must pass before a customer pilot. PaperReadingAgent full hosting and improved recognition are explicit later candidates, while live provider operation, privacy, recall, recovery and measured costs stay in M0.

Use BACKLOG.json as a generic import source. It contains null assignees/points and empty evidence links deliberately; adapt to the chosen tracker without inventing assignments or completion.
