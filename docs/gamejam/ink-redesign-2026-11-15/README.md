# Tom’s Notebook · ink redesign review and research plan

**Status: source review complete; research plan prepared; seven new market sessions and three experiments not started.** This is a planning delivery dated November 15, 2026. No redesigned game, human qualification or new gameplay result is claimed.

The owner’s revised brief is to **preserve the original product’s ink interaction and develop richer play through it**. Authored phrase selection is no longer the foundation for the next game. Explore several mechanical directions before choosing one; a change of story alone does not satisfy the brief.

| Read | Purpose |
|---|---|
| [Market plan](MARKET-PLAN.md) | Seven browser entries, specific questions, bounded sessions and critic comparisons |
| [Observation template](OBSERVATION-TEMPLATE.md) | Complete attempted journey, evidence, failures and criticism from five perspectives |
| [Decision matrix](DECISION-MATRIX.md) | Eight competing directions and a method for selecting three experiments |
| [Published 0.1.0 baseline](https://paperstrange.github.io/IndiaGames/development/toms-notebook/0.1.0/) | Comparison build; the existing preview is unchanged |
| [Previous implementation and verification](../notebook-game-2026-11-14/README.md) | Historical engineering evidence for 0.1.0 |
| [Previous six competitor records](../competitor-plays-2026-11-14/README.md) | Actual November 14 agent-operated sessions; separate from this unplayed set |

## What the source review established

Reviewed Notebook source: [`9330f88fd9960ce30f9de1490ccf4870e10cac1e`](https://github.com/PaperStrange/IndiaGames/tree/9330f88fd9960ce30f9de1490ccf4870e10cac1e). This is a static implementation review, not a new user session.

| Existing original-product behavior | Source | Design consequence |
|---|---|---|
| Mouse, finger and stylus strokes; pressure-aware pen rendering, highlighter, regional eraser, undo and typed input | [Input surface](https://github.com/PaperStrange/IndiaGames/blob/9330f88fd9960ce30f9de1490ccf4870e10cac1e/app/notebook-app.tsx#L435), [ink rendering](https://github.com/PaperStrange/IndiaGames/blob/9330f88fd9960ce30f9de1490ccf4870e10cac1e/app/ink-art.tsx#L6) | The player can author marks directly. Pressure can enrich play but cannot be required on mouse/finger devices. |
| A 380 ms input pause starts recognition and a five-second fade; the reply waits for both | [Cycle rules](https://github.com/PaperStrange/IndiaGames/blob/9330f88fd9960ce30f9de1490ccf4870e10cac1e/lib/ink-cycle.ts), [flow](https://github.com/PaperStrange/IndiaGames/blob/9330f88fd9960ce30f9de1490ccf4870e10cac1e/app/use-ink-flow.ts) | Preserve the feeling of a page responding to authored ink. Future game experiments may compare deliberate commitment with automatic timing; this plan changes no product behavior. |
| Editing interrupts fading; revision checks reject stale recognition; originals can be restored | [Flow](https://github.com/PaperStrange/IndiaGames/blob/9330f88fd9960ce30f9de1490ccf4870e10cac1e/app/use-ink-flow.ts), [original recovery](https://github.com/PaperStrange/IndiaGames/blob/9330f88fd9960ce30f9de1490ccf4870e10cac1e/app/original-ink.tsx) | Experimentation should retain authorship and offer understandable recovery. |
| Existing strokes become recognized text for a companion reply | [Flow](https://github.com/PaperStrange/IndiaGames/blob/9330f88fd9960ce30f9de1490ccf4870e10cac1e/app/use-ink-flow.ts) | Physics, ink ecosystems, programmable marks and economies would be new systems, not capabilities already implemented. |

The 0.1.0 game instead selects authored intentions, sends them, displays a reinterpretation and asks for a resolution. Its circle/strike controls select a semantic intention; they do not simulate stroke geometry. Its read → decide → consequence rhythm helps explain the owner’s comparison with Bell, although the two games have different rules. See the [0.1.0 narrative contract](../notebook-game-2026-11-14/story.md).

**Working hypothesis:** making, changing and recovering the player’s own marks could offer a more distinctive experience. The review establishes available implementation and a design mismatch; it does not establish enjoyment or market demand.

## Foundation and open decisions

Keep direct authorship, tangible response and recoverable originals. Investigate whether a mark’s shape, position, connection, timing, erasure or meaning can produce a readable consequence. Progress may come from mastery, discovery, expression, a lasting creation or a relationship; points and unlocks are optional supporting systems.

Genre, goals, duration, character and progression remain open. The earlier unsettling tone remains a working preference, while the mechanics comparison stays broad. A persistent evolving spread is possible; one page does not have to equal one scripted scenario. Narrative should arise through action and consequences, with replaceable stories and characters once the core is selected.

The private product remains separate. Its live responses need configured providers, and its bundled local handwriting recognizer targets English single-line writing. A new English/Japanese/Simplified Chinese game must not assume equal OCR coverage. Evaluate local geometric rules, language-independent marks or another explicit input strategy before committing to multilingual recognition or provider infrastructure.

## Delivery sequence

```mermaid
flowchart LR
    A[Reviewed ink foundation] --> B[Seven observed market journeys]
    B --> C[Compare eight mechanism families]
    C --> D[Three distinct experiments]
    D --> E[Choose or reject using evidence]
    E --> F[Human language and device qualification]
```

| Milestone | Owner role | Completion evidence | Current state |
|---|---|---|---|
| File source review and research plan | Notebook integrator | This review, linked plan, template and decision matrix | Review and plan complete |
| Update public overview | Hub integrator | Dashboard links this plan and distinguishes baseline from redesign | Tracked on main; verify after deployment |
| Observe seven competitor journeys | Research agents | One complete attempted-journey record per game, precise endpoint and contrary evidence | Not started |
| Compare mechanisms | Design reviewer | Evidence-linked comparison; selection of three different dominant actions | Not started |
| Build three small experiments | Notebook integrator + independent reviewer | Defined question, actual interaction, observed result and failure criteria for each | Not started; no direction selected |
| Select and qualify redesigned game | Design lead + responsible humans | Exact build, adopted study, fluent en/ja/zh-Hans review, desktop/phone/tablet evidence | Not started |

The November 16 go/defer checkpoint and conditional November 20 release target remain. The redesign currently has no qualifying build. At the checkpoint, report evidence actually available and defer an incomplete game rather than compressing or relabelling checks. The old 0.1.0 completion/causal-explanation study cannot automatically qualify a different mechanic; its criteria and exact build need reconsideration with the responsible human before new qualifying sessions.

## Handoff and collaboration

Keep source, reviewed research and experiments on `toms_notebook`; publish navigation/status on `main`. One integrator owns shared runtime files. Research agents own separate record folders; independent review checks source attribution and unsupported claims before integration. Preserve 0.1.0 and its six studies as historical evidence. Keep raw drivers/logs private and back them up; publish reviewed records and selected licensed or appropriately attributed evidence. Commit and sync reviewed increments, then verify remote identities and dashboard links. A source branch update is not a candidate promotion: `master`, human qualification and official release approval retain their separate roles.

Next working record: copy [OBSERVATION-TEMPLATE.md](OBSERVATION-TEMPLATE.md), fix the chosen session’s task and limits before play, and retain both failed and successful attempts. This plan itself contains no new game-playing evidence.
