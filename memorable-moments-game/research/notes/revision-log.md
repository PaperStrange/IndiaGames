# Revision log — 2026-10-03

Revision editor pass applying every required fix from notes/review-adversarial.md and notes/review-mistakehunt.md, plus live-browser validation (notes/validation-browser.md) and the main agent's first-hand walkthrough (notes/firsthand-testing.md). No game design, no PRD — revision only.

## synthesis.md (full rewrite)

1. **Evidence key moved directly under the title.** [REAL] = read/verified live in-run (page opened, listing read, abstract read) — explicitly NOT independent replication. Added: label axis is effort-based, not quality-based; Páez et al. 2015 (50-study meta-analysis, N≈183k) named as highest-weight evidence regardless of its [SECONDARY] label.
2. **Added "First-hand testing — 2026-10-03, main agent" section.** Walked: Paired public surfaces (no signup → no in-app internals), theadventurechallenge.com, werenotreallystrangers.com, OurCouple Date Night Generator (actually tried). NOT first-hand: physical scratch ritual, Paired in-app answer-lock, video playthroughs. Findings #1 and the Paired answer-lock evidence marked not-first-hand-tested.
3. **Finding #1 rewritten.** "1.6M+ copies [SECONDARY]" → "5M+ couples products sold (company claim, theadventurechallenge.com, verified 2026-10-03) [REAL: claim present; unaudited]" — the 1.6M figure was contradicted (no longer on site). Paired "8M downloads" → company claim, Play-verified floor 1M+. "35.5% higher relationship-quality" annotated company-funded, single synthesis source, directional only. "The game needs a locked-reveal loop" weakened to lead hypothesis + validation gate #1. "Capture reveal" marked [OPEN] zero-evidence hypothesis. Added OurCouple caution (frictionless reveal = button tap, tried first-hand).
4. **Finding #2 softened.** "Kills long low-intensity sessions" → design-principle language; pain-study → positive-experience transfer flagged [OPEN]; duration neglect scoped to bounded episodes (a long product of short sessions is fine — that's what the 50-mission book is).
5. **Finding #3: BLOCKER fixed with explicit ⚠ COLLISION [OPEN] box vs #6.** Both cannot hold as stated (everyone acts in same window vs loop completes with passive partner); self-questioning Q3 marked unresolved. New threat-ranked gate: first pilot must measure closeness gain with one passive player vs two active; the plan must name which side gives.
6. **Finding #4: HOLD.** Added: "one capture beat" is a design choice, not a proven optimum (Henkel tested photo-vs-observe, not one-vs-many). Reconciled with #8: scarcity is per-moment, accumulation is across-moments.
7. **Finding #5 rewritten.** "Kills auto-recaps" → "auto-recaps must prompt retelling, never substitute for it" (Hirst & Echterhoff never tested auto-recaps vs conversation). Reconciled with FamilyAlbum auto-movies: approved as keepsakes/upsell, killed as retelling replacement. Added: retelling-prompt designs what survives = unexamined product power. Noted the passive-partner retelling collision (points at #3/#6).
8. **Finding #6: HOLD the problem, demoted the solution.** "Tap/guess, not authoring" → untested requirement with a memory-formation gate (not just session completion). Fixed the one-line self-contradiction ("complete when passive" + "rituals must be performed by all" citing Vohs). Added segment-narrowing fallback (motivated pairs + gift acquisition).
9. **Finding #7 split by form factor.** Physical one-time $39–69 [SECONDARY, deck-anchored]; digital one-time price = [OPEN] hypothesis (closest digital datapoint: Love Nudge $9.99 IAP, 4–7x below band). WNRS revenue downgraded to [OPEN]/directional — do not anchor. Keepsake upsell enters v1 economics only on attach-rate evidence (FamilyAlbum print attach rate [OPEN]; 10M+ installs Play-verified [REAL], 16M unverified estimate). Billing traps demoted to hygiene constraint.
10. **Finding #8: day-one export HOLD; moat → year-2 asset.** Cold start named. Export (day-one) separated from print (cost center, needs unit economics). Between 35M+ → "claimed on Play listing [REAL: claim present; unaudited]"; Between actively developed (Editors' Choice, Sep 2026) — harvest-mode claim dropped; DLT Partners [OPEN detail]. Timehop sizing labeled Duolingo-analogy, not precedent.
11. **Cross-track convergences qualified.** Reveal convergence = different phenomena (scratch-commitment, answer-lock, trivia-curiosity), not one proven mechanism — lead hypothesis, still gated. Moat corrected to year-2.
12. **Tech decision #3:** iOS 27 owner-pays re-verify caveat inline (Apple docs not yet updated; policy could shift [OPEN]).
13. **Gates rewritten, threat-ranked:** #1 = prove the digital reveal/commitment loop (2026-10-03 ruling: digital/virtual is the priority form factor — gate is no longer "physical vs digital"); #2 = #3/#6 collision; #3 = audience segmentation, NEW (from Q7: one game vs three editions); #4 = content supply past month 12; #5 = LDR vs location-bound; #6 = synchrony transfer reframed per Q6 (resolved IF in-person with phone as mission-dealer; residual [OPEN] = LDR only); #7 = consent/takedown.
14. **Evidence caveat narrowed.** Credits the 2026-10-03 live-browser validation (TAC store, Paired/Play listings, Between listing, FamilyAlbum listing, Official shutdown via TechCrunch). Pending = independent re-verification of remaining parallax-sourced claims only.

## track1-products.md

15. F1: traction → 5M+ company claim [REAL: claim present, unaudited]; store ratings → [REAL: own-site reviews read 2026-10-03; company-curated] (label alignment fix — was [SECONDARY] here vs [REAL] in track3).
16. F4: WNRS Instagram discrepancy noted (5.3M Wikipedia Jun 2025 vs 4M+ RocketReach; standardize on dated figure).
17. F6 (Fog of Love): compressed to two lines; DECISION now executable ("no roleplay-fiction in the mission library").
18. F7 (DoYou/Pick-Me-Up): CUT — was a non-finding occupying a finding slot; the [OPEN] line in open questions retained.
19. F8 (Paired): 8M = company claim, Play-verified floor 1M+; iOS ratings 203–207K snapshots annotated with sources; 35.5% annotated company-funded/directional; DECISION: "capture reveal" example marked [OPEN] zero-evidence.
20. F9 (Between): "35M+ couples" → "claimed (single source, unverified)"; Play listing claim [REAL: present, unaudited]; DLT Partners [OPEN detail]; actively developed, not harvest mode.
21. F14 (FamilyAlbum): installs split — 10M+ Play bracket [REAL] vs 16M unverified AppBrain estimate (which-is-which stated).
22. F19: null-result [REAL] → [SECONDARY: in-run web search performed, no traction signals found — absence of evidence, not proof of absence].
23. Verdict #3: Between figure qualified.
24. H2: rests on traction (8M claim + 1M+ floor), not the 35.5% figure; "capture reveal" removed from hypothesis text.
25. URL hygiene: `Www.AppBrain.com` / `Www.Appbrain.com` / `Www.appbrain.com` → `www.appbrain.com` throughout (mechanical sed).

## track2-psychology.md

26. Finding 12 DECISION: "kills auto-generated highlight reel" → "auto-recaps must prompt retelling, never substitute for it."
27. Finding 7: Páez et al. annotated as highest-weight evidence in the track regardless of [SECONDARY] label; Pizarro et al. 2022 domain-stretch note added (protest-scale effervescence ≠ date-night endings).
28. Source 2 (Fredrickson & Kahneman 1993): annotated "via review PDF, not the paper itself." (Note: during this edit I briefly truncated the URL and immediately restored the full original — verified intact.)
29. Source 4 (Wittmann et al. 2007): wrong `jneurosci.org/node/372648` URL replaced with the DOI link `https://doi.org/10.1016/j.neuroimage.2007.06.024` per review instruction — resolvability not click-verified in this session (no browser); recommend a one-click check.

## track3-market.md

30. Verdict: TAC → 5M+ company claim [REAL: present, unaudited]; WNRS revenue → [OPEN]/directional, do not anchor.
31. Finding 1: 1.6M claim dropped (contradicted — no longer on site) → 5M+ claim; ratings → [REAL: company-curated]; DECISION split: physical-only $40–70 band.
32. Finding 2: Particl inconsistency explicitly flagged ($749K ÷ 34K ≈ $22/unit ≠ $43 avg — cannot all be true); revenue downgraded to [OPEN]/directional; IG discrepancy noted.
33. Finding 3: 8M = company claim / 1M+ Play floor; iOS ratings 203–207K snapshots annotated; 35.5% annotated company-funded/directional; funding corroborated beyond parallax (TechCrunch May 2021, Seedtable — stage: Seed).
34. Finding 4: Between "harvest mode" → actively developed (Editors' Choice, Sep 2026 [REAL]); DLT Partners [OPEN detail]; 35M claim qualified.
35. Finding 5: Official shutdown corroborated by TechCrunch (Feb 19 2025, ~$12M revenue headwind) — no longer parallax-only.
36. Finding 7 (billing traps): compressed to a hygiene note, demoted from standalone finding; constraint carried into synthesis #7.
37. Finding 8: installs split (10M+ Play-verified [REAL] vs 16M unverified estimate); print attach rate [OPEN].
38. H1: pricing split by form factor (physical $39–69; digital [OPEN]).
39. Open questions #1 and #4 updated to post-validation state.

## track4-tech.md

40. Finding 5: "Over 20 million users are on the platform" → "20M+ installs per Similarweb listing" (claim no longer exceeds source).
41. Finding 6 + H3: vendor-blog false precision rounded in prose (~93% vs ~81%; ~25x; ~40–60%); URLs kept for audit.
42. Finding 4 DECISION: iOS 27 owner-pays re-verify caveat inline [OPEN].

## notes/self-questioning.md

43. Erratum prepended (2026-10-03): 1.6M → 5M correction; Between harvest-mode correction; Q4's price-band warning noted as now enforced in synthesis #7. Original pass untouched otherwise.

## notes/firsthand-testing.md (new)

44. Distillation of the main agent's 2026-10-03 walkthrough: per-product feel reports (Paired, OurCouple generator [actually tried], Adventure Challenge site, WNRS site, Gottman [second-hand]); walked vs not-walked boundaries; blunt gap statement (blind-mutual-reveal + shared trophy case + real stake mechanic = unbuilt digitally).

## Could NOT be applied cleanly

- **Independent re-verification of remaining parallax-sourced claims** (beyond what validation-browser.md covered) — parent's live-browser lane; staged as pending in the synthesis caveat. Partially done: Official shutdown and Paired seed stage now TechCrunch/Seedtable-corroborated.
- **Wittmann DOI resolvability** — supplied per review instruction; not click-verified (no browser in this session). One-click check recommended.
- **WNRS revenue** — no credible figure exists; left as [OPEN]/directional rather than reconciled. Nothing to fix toward.
- **The #3/#6 collision is gated, not resolved** — deliberately: it is untestable on paper and requires a pilot measuring passive-vs-active closeness gain.

## 2026-10-03 — Illustrated report revision pass (post-build reviews)
- Plural review: adversarial (1 BLOCKER · 6 SHOULD-FIX · 3 NIT) + visual mistake-hunt (1 BLOCKER · 3 SHOULD-FIX · 4 NIT). Records: notes/review-illustrated-adversarial.md, notes/review-illustrated-visual-mistakehunt.md.
- BLOCKER fixes: competitor count reconciled 38→33 everywhere (my brief had the wrong number — owned); landscape.svg regenerated with all 33 grid dots + 4-family legend; appendix line on wider screened universe; collision.svg backwards arrowhead fixed (root cause: direction-aware arrow() helper in make_illustrations.py).
- SHOULD-FIX: BackThen "validates"→"exhibits [SECONDARY], attach rate [OPEN]"; finding 07 scoped to "in this sample"; double pills split to one-per-clause; two new [OPEN] gates (peak-end transfer, retelling vs auto-recap); Paired/WNRS caption sources added; landscape section DECISION line; boundary closing DECISION; Jackbox tag "Web / TV"; 4-family wording aligned; traction table mobile scroll wrapper; ~600KB data-src duplication removed (1.49MB→749KB); source [7] reworded.
- NITs: lightbox placeholder, filter-button touch targets.
- Verified post-revision via export: all 17 checks pass (33 dots with correct family colors decoded from the inlined SVG; both new gates present; zero "38" claims; zero data-src).
- Known limitation: pixel rendering impossible in this env (Chromium screenshot exits code 2) — geometry/text checks substitute; one human glance at the hosted page recommended.
