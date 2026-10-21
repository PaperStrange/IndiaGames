# Systems contract — [experiment]

State owner: [role]. Renderer owner: [role]. Content owner: [role]. Contract revision: [id].

## Core loop

[player intention] → [supported action] → [state change] → [perceptible feedback] → [next decision or ending].

| State/action | Preconditions | State change | Cost / information gained | Player-visible feedback | Invalid/repeated action |
|---|---|---|---|---|---|
| [fill] | [fill] | [fill] | [fill] | [fill] | [fill] |

List invariants: [e.g. an action spends once; a clue is marked witnessed only after its scene; both authors keep their own contribution]. Include wrong guesses, no choice, repeated clicks, undo/cancel, restart, mode switching and stale saves where relevant.

## Content / presentation interface

Stable scene IDs: [fill]. Choice IDs: [fill]. Required content fields: [fill]. Art-state IDs: [fill]. State→visual mapping: [fill]. Keyboard/touch equivalence: [fill].

## Persistence

What persists and why: [nothing / local / server]. Retention/reset rules: [fill]. Previous-version migration: [fill]. Malformed or blocked storage behavior: [fill]. Player copy matches actual behavior: [verification]. Do not add persistence simply because a template has this section.

## Verification

- Rule check that could catch a real failure: [scenario, expected invariant].
- Visible-control journey: [actions and observable endpoint].
- Boundary/failure case: [fill].
- Source revision and result: [not run until actually executed].

Avoid tests that only repeat the implementation. Preserve the unchanged baseline when an experiment compares behavior.
