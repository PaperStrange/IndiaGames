# Adversarial review — illustrated research report (boss/partner lens)
**Date:** 2026-10-03
**Reviewed:** `~/workspace/your_files/memorable-moments-game-research-report/memorable-moments-game-research-report.html` (export, 16 inlined assets)
**Against:** `~/workspace/research_notes/memorable-moments-game-20261003/` (report.md, track1-addendum.md §§A–F, synthesis.md, notes/report-brief.md)

**Verdict:** structurally sound and largely honest — evidence legend is defined and used, the
first-hand boundary is explicit, no solution-language found. But the headline competitor
count does not reconcile with what is presented, and three findings overstate or
under-scope their sources. Fix the BLOCKER and SHOULD-FIX items before delivery.

---

## BLOCKER

**B1. The "38" competitor count is unmoored — it matches nothing in the report.**
- The report claims a "38-product map" and "approximately 38 screened products" (cover).
- What is actually presented: **33 product cards** in the "All platforms" grid (12 mobile +
  6 physical + 10 PC/console + 4 itch.io + 1 web — counted from the built HTML).
- The embedded `landscape.svg` plots **23 product dots** (26 circles = 23 dots + 3 legend).
- No counting rule is stated anywhere, so a reader cannot reconcile 38 vs 33 vs 23.
  (The "38" originated in `notes/report-brief.md`, which wrongly described the SVG as
  "38 products mapped" — the brief itself needs correcting so future edits don't
  reintroduce the number.)
- **Fix (pick one, then apply consistently to cover, map caption, and appendix):**
  (a) recommended — change all claims to **"33 products mapped"**, regenerate
  `landscape.svg` to plot all 33 grid products (currently 23), and add one appendix
  line: "Wider screened universe is larger — includes discontinued (Kindu, Official),
  not-found (52 Fridays, DoYouKnow?), and adjacent mentions not plotted.";
  (b) keep "38" only if a counting rule is written down and every number in the
  report is re-derived from it. Do not ship with 38/33/23 coexisting unexplained.

## SHOULD-FIX

**S1. Finding 08 overstates BackThen and mislabels it.**
- Report: "BackThen validates subscription + printed keepsakes. REAL listing SECONDARY".
- Source (track1-addendum.md §C): BackThen is **[SECONDARY — AppBrain/Play mirrors]**;
  it *supports* the subscription + printed-keepsake pattern; **attach rate remains [OPEN]**.
  "Validates" implies proven economics that were never observed, and "REAL listing" is
  wrong — the listing was read via mirrors, not first-hand.
- **Fix:** "BackThen exhibits the subscription + printed-keepsake pattern [SECONDARY];
  attach rate remains [OPEN]." One pill: SECONDARY.

**S2. Finding 07 generalizes beyond the sampled evidence.**
- Report: "Free core + one subscription per pair is the digital norm… no one-time
  digital model was observed."
- Source synthesis explicitly bounds this: "**In the sampled live digital products**…
  Do not generalize this to the whole market."
- **Fix:** scope it — "the sampled digital norm" and "no one-time digital model was
  observed **in this sample**." The decision ("Keep play free… never double-charge a
  pair") can stand as a hypothesis, but the finding must carry the sample boundary.

**S3. Two decisions have no explicit validation gate.**
- The threat-ranked gates (07/08) cover digital commitment, synchrony vs passivity,
  edition structure, content after month 12, long-distance transfer, capture timing,
  consent & takedown — but **finding 02** (peak-end transfer from pain studies to
  positive social play, flagged OPEN in its own card) and **finding 05** (required
  retelling beat vs auto-recap, "never been tested against co-retelling") have no
  corresponding gate. A decision without a gate is a recommendation without a test.
- **Fix:** add two gates — "Peak-end transfer: do designed peaks/endings improve
  remembered utility in positive social play? [OPEN]" and "Retelling vs auto-recap:
  does a required retelling beat beat an automated recap on 48-hour recall? [OPEN]".

**S4. Two snapshot captions lack source references.**
- "Paired — Public site · captured 2026-10-03" and "We’re Not Really Strangers —
  Official site · captured 2026-10-03" have no source link; the other eight carry
  "source [n]". The brief required product name + source URL + date on every image.
- **Fix:** add source refs (Paired public site URL; WNRS official site URL,
  consistent with the [1]–[8] scheme or plain URLs).

**S5. The landscape section (02/08) does not end in a decision.**
- It ends with the comparator table. The section's implicit point — the empty
  quadrant is a hypothesis, not proof of demand — is stated in the intro but never
  converted into a decision, violating the every-section-ends-in-a-decision law.
- **Fix:** append an explicit decision line, e.g. "DECISION: pursue the digital
  manufacture-plus-preserve quadrant, but validate demand before building —
  emptiness is not evidence of demand."

**S6. Double evidence pills read as contradictions.**
- Cards show "REAL OPEN transfer" (01), "REAL SECONDARY meta-analysis" (03), and
  "REAL listing SECONDARY" (08). The legend defines pills as verification effort,
  so these are *defensible*, but a fast reader sees conflicting labels on one claim.
- **Fix:** one pill per clause — e.g. finding 01: "claim read [REAL]; digital
  transfer [OPEN]"; finding 03: split Wiltermuth & Heath [REAL] from the Pizarro
  meta-analysis [SECONDARY] into two labeled clauses. (S1's fix already resolves 08.)

## NIT

**N1.** Grid tags Jackbox as "PC / console" — it is TV/web + phones (the platform card
correctly says "web / TV"). Fix the grid tag.

**N2.** Cover says "4 platform families"; section 03's intro lists five groupings
("mobile stores, physical retail, Steam/console, itch.io and browser/TV party systems").
Align: fold itch.io into web (matching the filter row: Mobile / Physical / PC & console /
Web & itch.io) or say five.

**N3.** The first-hand boundary section (04/08) is exemplary as disclosure, but it
could close with one decision line tying the boundary to the report's [OPEN] items,
e.g. "DECISION: no digital-commitment conclusion above [OPEN] may be cited without
this boundary." Optional.

## Explicitly checked and PASSING (no action)
- Traction figures match sources with labels: TAC 5M+ company claim (read in-run,
  presented as claim, appendix notes unaudited); Paired 1M+ floor / 8M company claim;
  Between 35M+ unaudited listing claim; FamilyAlbum 10M+ bracket (16M correctly
  called an unverified estimate); It Takes Two 48,219 English Steam reviews [REAL];
  Jackbox 1B+ sessions as press-kit claim [SECONDARY]; Hazelight 30M It Takes Two
  copies, Apr 2026 studio announcement [SECONDARY].
- "Streak guilt" is sourced (track1-products.md, Paired section).
- No solution language: zero hits for "we should build / we recommend / will
  guarantee / the game will" phrasing; decisions are hypotheses paired with gates,
  and the mechanisms section states "These are not a game design."
- All 9 brief sections present in order (00–08); 10 snapshot captions present;
  first-hand "Not tested" list is comprehensive (no purchases, no partner play,
  no installs, no accounts, no YouTube, no tactile scratch).
- Cover correctly frames the whitespace as "a hypothesis, not proof of demand."

---
*Counts: 1 BLOCKER · 6 SHOULD-FIX · 3 NITs.*
