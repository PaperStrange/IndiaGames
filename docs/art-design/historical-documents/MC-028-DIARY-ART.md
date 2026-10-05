# MC-028 — a diary that appears to write back

User request: 2026-10-03. Reference: Tom Riddle's diary in Harry Potter and the Chamber of Secrets. Status: implementation in review; visual acceptance pending. Owner role: Client/art engineering; product review: SakuraSan. Dependencies: MC-006 interaction preservation and MC-021 device evidence.

As a notebook user, I want a tangible page whose ink dissolves and returns as a reply, so that writing feels like interacting with an enchanted diary.

## Art direction

Restrained parchment color, dark leather binding, broad contact shadows, cooler unlit regions and a small warm source. Paper fibers influence local surface normals and highlight width. The binding has stronger occlusion. Ink develops from faint gray into charcoal; existing text keeps its position. Page turning preserves the current interactive surface and carries a shaded visual leaf across it.

The implementation uses WebGL surface shading plus CSS materials. It is a real-time lighting approximation. Light animation is bounded to approximately 24 updates per second on desktop and 15 on touch-oriented devices; actual performance requires measurement. Reduced-motion mode renders static light. Hidden and offscreen pages stop requesting ongoing shader frames.

## Acceptance criteria

- [ ] Desktop and phone comparison shows readable charcoal ink, visible binding depth, restrained highlights and natural page-turn shadows.
- [ ] Writing begins fading at the same event as OCR; reply reveal waits for the existing five-second/current-result barrier.
- [ ] Erasing during fading restores remaining text and clears only the touched region; running recognition continues.
- [ ] WebGL shader compiles and links in an actual graphics implementation; CSS materials retain a usable page where WebGL is unavailable.
- [ ] Reduced-motion, hidden-tab and offscreen behavior stop ongoing light animation; effect layers intercept no writing gestures.
- [ ] Physical iOS/Android tests confirm gesture accuracy, legibility and acceptable battery/latency behavior under the declared workload.

## Files and evidence

`app/paper-light.tsx`, `lib/paper-shaders.ts`, `app/diary.css`, `app/ink-art.tsx`, `app/book-turn.tsx`; state regression results in the iteration status. The uploaded demo was inspected at selected timestamps for interaction context. The official encyclopedia identifies the diary; the official video page was located, but its video could not be retrieved in this session. No frame-by-frame film fidelity claim is made.

Reference: https://www.harrypotter.com/fact-file/objects/tom-riddles-diary (read 2026-10-03). This reference informs art direction; film imagery is not included in the product assets.
