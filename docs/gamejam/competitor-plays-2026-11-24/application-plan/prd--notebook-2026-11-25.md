# PRD — Tom's Notebook: select the ink experiments from the completed comparison

**Status:** proposal, 2026-11-25. Nothing here is a solution until its gate passes.
**Order in the plan:** first. The synthesis's sequence puts the Notebook comparisons and the eight-family matrix before any experiment is selected.

## Description

Tom's Notebook is the fourth game: a study notebook where ink marks are the play. Version 0.1.0 is live; 98 task cards, 62 complete. Task TN-12 ("Play seven market games and record their attempted journeys") is active: five of the seven titles are attempted — Sandspiel, Townscaper, shapez, ADOFAI (partial: level 0 entered, not completed), Draw a Stickman EP2 (completed) — and two are untouched (Line Rider, Universal Paperclips including the next-day return). Three experiments are named but unselected: material, construction, living page.

## Problem

No ink experiment has been selected because the comparison evidence is incomplete. The eight-family matrix is unpopulated and the three named experiments are untested. Selecting an experiment from an incomplete map risks building the wrong ink.

## Why now

The two rounds supply five of the seven TN-12 titles, and the three experiments map directly onto the new titles: Sandspiel onto material, Townscaper onto construction, shapez onto the living page. Waiting adds nothing; the remaining two titles are named and bounded.

## Success

The eight-family matrix is populated from the evidence; the three experiments are selected with fresh uncoached baselines; each experiment's hypothesis either passes its gate or is killed. A killed experiment is a result, not a failure.

## Audience

The Notebook game agent and the independent synthesis reviewer (the TN-12 owner roles). The experiments' subjects are fresh uncoached players.

## What

**Precondition (not a hypothesis):** TN-12 completes — Line Rider and Universal Paperclips, including the next-day return — and the eight-family matrix is populated BEFORE the experiments are selected. If the matrix changes the family map, the experiments are re-selected, not defended.

**H1 — material.** The team believes a stroke that behaves — becoming a channel or bridge — will make players revise their marks to solve a problem, rather than redraw them. Evidence: Sandspiel, where a mark becomes a changing situation [REAL, `docs/competitor-learning-2026-11-25/records/sandspiel.md`]; Draw a Stickman EP2, where the drawn object functions [REAL, `records/session--draw-a-stickman-agent-2026-11-24.md`]. Gate: in a fresh uncoached baseline, a player uses a drawn stroke to change a situation without prompting. Kill: if no player does so in three baselines, the material experiment is dropped.

**H2 — construction.** The team believes erasing part of a stroke to change a relationship will be used as a deliberate move, not only as correction. Evidence: Townscaper, where removing the lower storey produced a stilt cabin [REAL, `docs/competitor-learning-2026-11-25/records/townscaper.md`]. Gate: a player erases to create a new form and can explain what changed. Kill: if erasure is used only to correct mistakes in three baselines, the construction experiment is dropped.

**H3 — living page.** The team believes a page that remembers marks including revisions will bring players back to see what their marks became. Evidence: shapez, where the same placement gesture supports changing causal problems [REAL, `docs/competitor-learning-2026-11-25/records/shapez.md`]; Codenames Daily and 2048, where the return reason is a new decision each day [REAL, `records/session--codenames-agent-2026-11-24.md`, `records/session--2048-agent-2026-11-24.md`]. Gate: a player returns unprompted to a page and acts on a mark they left. Kill: if no return happens in the baseline window, the living-page experiment is dropped.

**H4 — retention.** The team believes a new ink decision each day will bring players back tomorrow. Evidence: Codenames Daily (daily set, percentile, countdown) [REAL, `records/session--codenames-agent-2026-11-24.md`]; 2048 (single-number chase) [REAL, `records/session--2048-agent-2026-11-24.md`]. Gate: a player returns on a second day without prompting. Kill: no second-day return in the baseline window.
