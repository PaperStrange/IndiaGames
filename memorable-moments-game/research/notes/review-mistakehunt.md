# Mistake-hunt / executability review — 2026-10-03

**Scope:** track1-products.md, track2-psychology.md, track3-market.md, track4-tech.md, synthesis.md, notes/self-questioning.md.
**Method:** evidence-label audit, cross-track contradiction check, arithmetic verification, "does every finding terminate in an executable decision" pass.
**Out of scope:** no game design, no PRD.

## Summary

The package is unusually honest — the self-questioning pass already catches its own biggest wound (Q3). One genuine BLOCKER remains: the synthesis carries two contradictory DECISIONs as settled when the self-questioning pass explicitly marks the tension unresolved. Everything else is SHOULD-FIX (label misuse, one arithmetic inconsistency, single-source load-bearing claims, missing gates) or NITs (number drift between tracks, source-URL hygiene).

---

## Issues

### 1. BLOCKER — synthesis.md: contradictory DECISIONs presented as settled (finding #3 vs finding #6)

**Location:** synthesis.md, "The 8 findings that drive decisions" #3 and #6.

- #3 DECISION: "core loop = everyone acting in the same time window (countdowns, simultaneous reveals). **Kills turn-taking/async as the bonding core.**"
- #6 DECISION: "the core loop **must complete when one partner is passive** — tap/guess, not authoring."

These pull in opposite directions: #3 requires synchronous joint action from everyone; #6 requires the loop to survive someone not acting. The self-questioning pass (Q3) explicitly flags this as **unresolved** — "Any honest plan must name which side gives." The synthesis nevertheless ships both as DECISIONs, which a planner would read as settled requirements and design into a wall.

**Fix:** Downgrade the reconciliation to [OPEN]. Keep both as constraints, but add an explicit threat-ranked gate: *"Which side gives — the joint-action bonding requirement, or the passive-partner survival requirement? Untestable on paper; first pilot must measure closeness gain with one passive player vs. two active."* Do not let both read as decided.

### 2. SHOULD-FIX — [REAL] misused for null search results (track1 F7, F19)

**Location:** track1-products.md, F7 ("[REAL: web searches in this run returned no traction signals]") and F19 ("the quest-based digital search returned no traction leader [REAL: this run]").

**What's wrong:** The track's own key defines [REAL] as "verified live in this run." A null result — *we searched and found nothing* — is not a verified fact; it is an absence of evidence, and labeling it [REAL] inflates its weight (a reader will cite "F19 [REAL]" as proof no digital product exists).

**Fix:** Relabel as `[SECONDARY: in-run web search performed, no traction signals found]` and keep the honesty note; or mark the *absence* as [OPEN] ("no leader found yet, not proof of none"). Never [REAL] for a null.

### 3. SHOULD-FIX — auto-recap contradiction unresolved (track2 Finding 12 vs track1 F14 / track3 Finding 8)

**Location:** track2-psychology.md Finding 12 DECISION ("Kills a single auto-generated highlight reel as the memory artifact") vs track1-products.md F14 DECISION ("auto-compilation (1-sec movies) proves low-effort capture summaries have value") and track3-market.md Finding 8 (FamilyAlbum auto-movies cited as proven path).

**What's wrong:** One track kills auto-generated recaps; two others approve them. The distinction (encoding vs. keepsake) is real but never stated, so a planner gets contradictory guidance: build auto-compilations or don't.

**Fix:** Reconcile explicitly in synthesis: *"Auto-generated artifacts are approved as keepsakes/upsell (FamilyAlbum precedent); they are killed as a replacement for the post-moment co-retelling beat (retelling is the encoding mechanism)."* Two different jobs, two different verdicts, stated in one place.

### 4. SHOULD-FIX — synthesis #7 states the $39–69 price band as DECISION; self-questioning Q4 flags it as the weakest extrapolation

**Location:** synthesis.md finding #7 ("price the core one-time ($39–69 test band)") vs notes/self-questioning.md Q4 ("The pricing hypothesis is the weakest of the labeled hypotheses: it extrapolates physical pricing to a digital product… do not let '$39–69 test band' harden into a fact").

**What's wrong:** The synthesis is firmer than the evidence. The $39–69 band is anchored in physical decks (Adventure Challenge ~$50, WNRS ~$43); a digital one-time unlock at that price has only Love Nudge's $9.99 IAP as adjacent evidence — a different job at 1/4 the price.

**Fix:** Split the DECISION: physical price band $39–69 [SECONDARY, decided-ish]; digital one-time price = hypothesis, [OPEN], tested before any SKU. Strike any sentence that presents the digital band as settled.

### 5. SHOULD-FIX — Paired "35.5% higher relationship-quality scores" is company-funded, single-sourced, and load-bearing

**Location:** track1-products.md F8; track3-market.md Finding 3; synthesis.md finding #1 and track1 H2 (used to support "the locked-reveal loop is the category's proven retention mechanic").

**What's wrong:** The figure comes from Paired's own published study, cited only via the parallax GitHub synthesis doc (2026-07-02) — a company-funded result laundered through a single unpublished secondary source, presented without provenance caution at point of use. The synthesis's evidence caveat mentions single-source dependency in general but finding #1 still leans on the number as "published" proof.

**Fix:** At every point of use, annotate: *"company-funded study, via single synthesis source — discount; treat as directional."* Do not let H2 ("strongest proven retention mechanic") rest on it alone; the 8M-downloads traction is the stronger leg.

### 6. SHOULD-FIX — "Between: 35M+ couples" is an extraordinary single-source claim presented unqualified

**Location:** track1-products.md F9 and verdict #3; synthesis.md finding #8 ("35M+ couples [SECONDARY]").

**What's wrong:** 35M *couples* implies ~70M individuals for a niche couples app — an extraordinary claim sourced solely to the parallax GitHub doc. Track 3's own dated public figure is "26M downloads by 2018" [SECONDARY]. The synthesis caveat covers single-source dependency abstractly, but finding #8 ("the archive is the moat") uses the 35M figure unqualified to size the moat claim.

**Fix:** At point of use write "claimed 35M+ couples (single source, unverified)" or fall back to the dated public figure with the claim flagged. Same treatment as issue #5.

### 7. SHOULD-FIX — WNRS revenue/units/price figures are mutually inconsistent

**Location:** track3-market.md Finding 2: "Particl estimates ~$749K ecommerce revenue / 34K units in the last 6 months… Average product price ~$43 [SECONDARY — Clipara]."

**What's wrong:** $749,000 ÷ 34,000 ≈ **$22/unit**, not $43. The three numbers cannot all be true (34K units at $43 ≈ $1.46M, roughly double the stated revenue). All are estimator outputs, but presenting mutually inconsistent estimates side by side as findings is a factual slip.

**Fix:** Reconcile or drop one leg — e.g. keep revenue + price and drop the unit count, or flag explicitly: *"the three estimator figures are mutually inconsistent ($749K ÷ 34K ≈ $22 ≠ $43 avg); treat all as directional."*

### 8. SHOULD-FIX — track2 source 4 URL is wrong

**Location:** track2-psychology.md, Sources #4: `https://www.jneurosci.org/node/372648` cited for Wittmann, Bunzeck, Dolan & Düzel (2007, *NeuroImage*).

**What's wrong:** That URL is a forum-thread-style node link, not the paper — it cannot be the source for a *NeuroImage* 2007 article.

**Fix:** Replace with the correct DOI/PubMed link for the NeuroImage paper (or mark the link [unverified] until corrected).

### 9. SHOULD-FIX — synthesis evidence caveat over-claims what's still pending

**Location:** synthesis.md, "Evidence-quality caveat": "Live-browser validation of key competitor claims (Adventure Challenge store, Paired listings) is still pending."

**What's wrong:** track3-market.md Finding 1 already reports [REAL] reads of theadventurechallenge.com product pages on 2026-10-03 (star ratings, review counts, edition lineup). The caveat as written implies none of that happened.

**Fix:** Narrow the caveat to what is actually pending: *"Independent re-verification of parallax-sourced market claims (Paired funding status, Official shutdown details, Adventure Challenge 1.6M sales claim) is still pending — parent's lane per the competitor-validation law."* Credit the store reads already done.

### 10. SHOULD-FIX — self-questioning Q7's audience-segmentation finding is missing from the threat-ranked gates

**Location:** notes/self-questioning.md Q7 vs synthesis.md "Open decision gates, threat-ranked."

**What's wrong:** Q7 establishes that the market segments by relationship type (Adventure Challenge ships separate couples/friends/family editions; Between is strictly 1:1; FamilyAlbum is family-private) and that "the 'one game for three relationships' assumption is unvalidated." The gates list covers form factor, reveal loop, passive partner, content supply, LDR, synchrony transfer, consent — but not audience segmentation, even though it gates content tone, acquisition channel, and session shape.

**Fix:** Add gate: *"Audience segmentation — is it one game or three editions (couples / friends / family)? The products suggest segmented editions; the unvalidated assumption is one-size-fits-all."*

### 11. SHOULD-FIX — self-questioning Q6's reframe wasn't carried into synthesis gate #6

**Location:** notes/self-questioning.md Q6 vs synthesis.md gate #6 ("Synchrony transfer").

**What's wrong:** Q6 partially resolves the transfer problem: the synchrony findings may survive *because the game is played in person with the phone as mission-dealer and capture device, not as the play space*. Gate #6 still frames the question as "whether app-mediated joint action transfers at full strength," which is the pre-reframe question.

**Fix:** Update gate #6: *"Synchrony transfer — largely resolved IF the play space is in-person with the phone as accessory (Q6 reframe); residual [OPEN] is only whether phone-mediated moments (LDR) retain the effect."*

### 12. SHOULD-FIX — same evidence labeled differently across tracks (Adventure Challenge store data)

**Location:** track1-products.md F1 ("official store shows ~4.7★ from ~978 reviews … [SECONDARY]") vs track3-market.md Finding 1 (same store pages, "[REAL: theadventurechallenge.com product pages read 2026-10-03]").

**What's wrong:** Identical evidence, two different labels. A reader comparing tracks can't tell which label to trust.

**Fix:** Align: use [REAL] with the read date wherever the page was actually read in-run; reserve [SECONDARY] for citations not directly opened. Apply the same alignment rule file-wide.

### 13. SHOULD-FIX — track1 F6's DECISION doesn't terminate in an executable action

**Location:** track1-products.md F6 (Fog of Love): "→ DECISION: … confirms our concept's lane (real-life missions) is unoccupied by the roleplay segment."

**What's wrong:** Per the user's standing law (details are not the decision maker), a DECISION arrow must end in a move. This one is a descriptive observation — no kill, no keep, no test.

**Fix:** Convert to an executable ("Keep: no roleplay-fiction content in the mission library — the lane is real-life missions only") or drop the DECISION arrow and keep it as positioning context under the finding.

---

## NITs

### 14. NIT — Paired iOS rating count drift: 207K (track1 F8) vs 203K (track3 Finding 3)
Different snapshots, same metric, no dates given. Fix: pick one figure with a read date, or annotate both with dates.

### 15. NIT — WNRS Instagram followers: 5.3M (track1 F4, Wikipedia, June 2025) vs 4M+ (track3 Finding 2, RocketReach)
Two figures, two sources, discrepancy never noted. Fix: note the discrepancy inline or standardize on the dated figure.

### 16. NIT — FamilyAlbum installs: "10M+ downloads" (track1 F14) vs "16M Android installs [REAL]" (track3 Finding 8)
Different measures (Play Store download bracket vs AppBrain install estimate). Fix: state which is which in one sentence so the reader doesn't read a contradiction.

### 17. NIT — track2 source 2 URL doesn't point at the cited paper
The Fredrickson & Kahneman (1993) citation links to a Dan Ariely-hosted review PDF (`people.duke.edu/~dandan/...`), not the paper itself. Fix: annotate as "via review PDF" or link the actual paper/DOI.

### 18. NIT — vendor-blog precision treated as exact (track4 Finding 6)
"93.07% vs 80.73%," "25x unsubscribe," "40–60% opt-in lift" from marketing blogs (wisernotify, dojotrack). Labeled [SECONDARY], which is honest, but two-decimal precision from a vendor blog invites false exactness. Fix: round in prose ("~93% vs ~81%") and keep the URLs for the audit trail.

### 19. NIT — Pizarro et al. 2022 domain distance (track2 Finding 7)
The meta-analysis is about collective effervescence in demonstrations and social movements; applying it to date-night ending beats is a domain stretch the finding doesn't acknowledge. Fix: one-line note — *"domain transfer assumed; protest-scale effervescence ≠ two-person date-night."*

### 20. NIT — source URL hygiene (track1 sources list)
Mixed capitalizations (`Www.AppBrain.com`, `Www.appbrain.com`, `https://Www.Appbrain.com/...`). Harmless, but clean them for a citable artifact.

---

## Verified clean (spot-checked, no issue)

- **track4 Finding 3 arithmetic:** 10,000 × 30 × 1.5 MB = 450 GB ✓; R2 $7.50 + $2.25 + $1.80 ≈ $12/mo ✓; S3 $11.50 ✓. Math holds.
- **"iOS 27" references** (track4 Findings 4, open question 3): consistent with year-based Apple OS naming (iOS 26 in 2025 → iOS 27 rolling out Sep 2026). Not an error.
- **Track2 paper citations** (Kahneman 1993 4(6) 401–405; Henkel 2014 25(2) 396–402; Barasch 2017 28(8) 1056–1066; Vohs 2013 24(9) 1714–1721; Wiltermuth & Heath 2009; Gruber 2014 84(2) 486–496): match the known publication records.
- **Cross-track consistency** on: Paired funding (~$7.3M, no Series A), Official shutdown (May 9 2025, ~$12M revenue, 4.7★/~1M downloads), Between corp path (VCNC → Krafton → DLT Partners Feb 2025), Avocado shutdown (Feb 2017).
- **Honesty notes that work:** F7's "[OPEN: whether the parent intended specific products]," F19's "open space means no proof," H6's "[OPEN] advantage," Q10's three falsifiers, and the parallax single-source caveat are all correctly applied.
