# Vivid 2.5D Photo Interaction Game — Organized Research + Self-Questioning
**Date:** 2026-10-03 · **Phase:** research (findings + hypotheses only; no plan yet — landing decided with Sakura tonight after he hands over the former work)
**Source files:** `01-similar-games.md` (desk, 4 subagent tracks) · `02-tech-stack.md` + threads `02a–02d` (desk) · `03-materials-needed.md` (desk) · this file `04-organized-findings-and-self-qa.md` (synthesis + firsthand + self-QA)

---

## 1. The concept in one line
A game where still photos come alive in 2.5D depth and talk back to the player — Harry Potter's Hogwarts portraits as an interactive product.

## 2. What the research establishes

### 2.1 Similar products (48 verified entries)
- **Photo-animation:** Deep Nostalgia proved mass appetite for photos that come alive (App Store #1, 2021) with gesture-only animation — no dialogue, no 2.5D [SECONDARY]. Real-time conversational options today: HeyGen LiveAvatar, Tavus Griffin (full-duplex, unveiled Oct 1 2026), Viggle Live, MuseTalk self-hosted. Everything else is render-and-wait [SECONDARY].
- **The gap is real:** nobody ships 2.5D depth-parallax portraits — everything animates in the 2D plane. The depth layer is ours to build [OPEN].
- **Portrait-centric games:** the FMV interrogation lineage is the direct design ancestry — Her Story (keyword search), Doctor Dekker (free-text interrogation, the strongest "talk to a photo" proof), IMMORTALITY (touch-the-frame match-cut), Before Your Eyes (blink as input), Erica (touch the footage). The only literal Hogwarts-style talking portrait ever shipped: Vaka Interactiv's "Descendant X" (proximity monologue, scripted, no free dialogue) [SECONDARY].
- **AI companions:** nobody ships a true live 2.5D talking portrait in a companion app. Visuals are the monetization layer (entry $4–20/mo; metered media or $30–100/mo premium presence tiers). Cautionary case: xAI retired its 3D animated companions ~Aug 2026 — cause [OPEN]. Watch item: Meta Muse Realtime Avatar (announced Sep 2026, animates a photographic portrait into a live avatar — not yet shipped: validation AND a race) [SECONDARY].
- **Design synthesis from KOL sources:** the novelty is the *combination* (free-text conversation + moving portrait + touch-the-frame), not any single piece; identity persistence across sessions is the moat; price the *living* layer, not the chat; "your photo, alive" must be one-tap shareable (Deep Nostalgia's viral unit was the reaction video) [SECONDARY].
- **Bias warning:** Deep Nostalgia's face detection failed on daguerreotypes of Black subjects — validate across skin tones and photo eras [SECONDARY].

### 2.2 Tech (papers, repos, official docs)
- **2.5D parallax is a solved systems problem:** license-clean pipeline = DA3-Small/Base/Mono or MoGe-3 (Apache-2.0/MIT [REAL]) → LDI layering → LaMa inpainting at import (Apache-2.0 [REAL]) → WebGL shader render at 60 fps. Feed-forward 3DGS is better but Flash3D has no LICENSE = all rights reserved [REAL].
- **Real-time talking portraits, commercial-safe open options:** JoyVASA (MIT) → FasterLivePortrait (MIT) full-head audio-driven 30+ fps on RTX 3090-class [SECONDARY]; Ditto / SoulX-FlashHead Lite (Apache-2.0 [REAL]) as single-model streamers; MuseTalk (MIT [REAL]) for lip-sync-only on a looping idle video — identity preservation argues for lip-sync-only as the primary path.
- **The license landscape is the minefield, not the math:** best-quality checkpoints are non-commercial (DA3 Giant/Large, Wav2Lip, XTTS v2/F5-TTS/Fish Speech weights) or unlicensed (DaGAN, Audio2Head, Flash3D). Check at the *weights* level, not just code license.
- **Dialogue plumbing off-the-shelf:** LiveKit Agents 1.8.2 / Pipecat 1.11.0 (VAD, semantic turn detection, barge-in); chained STT→LLM→TTS keeps an inspectable text stage for content policy.
- **Economics:** self-hosted render ≈ $0.01/min/session (concurrency [OPEN]); managed APIs $0.01/min (HeyGen volume) to $0.37/min (Tavus overage); honest full-stack band $0.17–0.33/min + 8–12 weeks engineering [SECONDARY]. Latency targets: <1.0 s to first animated frame, <500 ms for conversational feel (targets, not measured). Design lever: visual reaction first, voice second.
- **Validation gates named (§7 of tech report):** 2.5D prototype on real photos; talking-head bake-off on game-style photos; target-GPU concurrency benchmark; legal read of dependency licenses; live-browser API latency + AUP checks.

### 2.3 Materials & economics
- **Faces:** commissioned shoots with signed releases, or fully synthetic faces — cleanest legal paths. Real likenesses need documented consent (NY synthetic-performer disclosure law effective June 2026; Hawaii Act 247 fines to $25k/ad) [SECONDARY]. Public face datasets (FFHQ, CelebA-HQ, VoxCeleb2) are research-only — using them in a shipped product is a license violation [SECONDARY].
- **Voices:** ElevenLabs Creator $22/mo ≈ 100–121k chars; commercial rights start on paid tiers; cloning needs consent attestation. Human actors $250–600/hr non-union [SECONDARY].
- **LLM cost:** budget tier ≈ $4.30/1,000 conversations vs mid tier ≈ $40/1,000 — a ~10× lever to decide early [SECONDARY prices; OPEN arithmetic].
- **Hardware:** framed-installation route ≈ $2–2.5k per wall unit (display + mini-PC + camera/mic); recommendation: start mobile/web, frame later [OPEN].
- **Effort sketch:** MVP 1–2 people, 3–6 months (mostly integration + writing — the writing is the long pole); full vision 3–5 people, 9–18 months [OPEN]. Biggest cost risks: live-conversation API bills at scale, likeness legal work, content volume per portrait.

## 3. Firsthand testing log (main agent, real browser, 2026-10-03)
What I personally did — per the first-hand testing law, subagent research never substitutes:
1. **HeyGen LiveAvatar demo** — ran a live real-time avatar session anonymously (first name + city only, ~4:45 session timer, mic muted). Photorealistic avatar streaming started in seconds, zero signup friction. [REAL — hands-on] This is the closest existing thing to a talking-portrait game loop.
2. **MyHeritage Deep Nostalgia** — walked the flow; animation is fully gated behind free signup, no anonymous demo. [REAL — hands-on to the gate]
3. **Hedra** — has pivoted: now an AI inference platform, not the talking-photo app; old free talking-photo tier gone; everything behind signup. [REAL — hands-on]
4. **Artivive** — effect is mobile-camera-bound; desktop gets case studies/demo videos only; WebAR needs signup. [REAL — hands-on to the gate]
5. **Replika / character.ai / Nomi** — all hard signup walls for guests; Replika's premium visual features (unblurred selfies, AR roleplay) are Pro-gated; pricing in-app only. [REAL — hands-on to the gate]
6. **Steam store (6 games)** — prices recorded live during Autumn Sale (through Oct 8; ¥-denominated storefront): Her Story ¥21, Telling Lies ¥19.5, Doctor Dekker ¥36, IMMORTALITY ¥45.6, Before Your Eyes ¥8.4, Erica ¥16.4. No free demos for any of the six; only free playable item in the family is the Doctor Dekker 2 Demo (2026 sequel). [REAL]
7. **Steam gameplay trailers watched directly** (YouTube was bot-gated; Steam's own player worked): Her Story = you never talk to the face, you search a database (aliveness from performance + voyeuristic framing, not interactivity); Doctor Dekker = persistent free-text question bar over a full-screen face, the strongest "live conversation" illusion, keyword-echoing as the glue; IMMORTALITY = click/tap faces and objects inside the frame to match-cut — the portrait as a map of clickable mysteries. [REAL — watched; IMMORTALITY gameplay video itself wouldn't load, gesture reconstructed from store text, labeled]

**Named honestly as not-testable solo:** full gameplay of any paid game (needs purchase); in-app companion features (needs accounts); any GPU inference (this VM has no GPU); Hedra/HeyGen generation quality (needs signup).

## 4. Novelty thesis (from research, not yet validated)
No shipped product combines free-text conversation + moving portrait + touch-the-frame interaction. The 2.5D parallax layer is additionally unclaimed. The combination is the novelty. Moat candidates: identity persistence across sessions, authored portrait personas (writing), the living layer as the priced feature.

## 5. Self-questioning pass (solo, adversarial — written before any plan)
1. **Is 2.5D parallax actually the magic, or is it responsiveness?** Deep Nostalgia went viral with flat gesture animation and zero dialogue. character.ai retains with static avatars + personality. Risk: over-investing in a depth effect players barely perceive while under-investing in the portrait *noticing and remembering* the player. The parallax may be garnish; the conversation brain may be the meal. → Validation: A/B the wow — 2.5D vs flat animated portrait, same dialogue.
2. **Do we need live LLM conversation at v1?** Doctor Dekker sold the "live conversation" illusion with scripted keyword matching (1,600+ responses). Live LLM = 10× cost + latency + jailbreak surface. A scripted backbone with LLM fallback (or vice versa) might ship the magic at 1/10th the cost. → Don't assume real-time LLM; test the illusion threshold first.
3. **Who is the player, and where?** Mobile/web vs framed installation are different products (different interaction: touch+mic vs proximity+camera; different economics: $0 marginal vs $2.5k/unit). The materials research recommends mobile/web first. But the Hogwarts fantasy is inherently *physical* — a portrait on a wall. Which fantasy are we selling? → Tonight's decision #1.
4. **The xAI retirement is the load-bearing unknown.** A giant shipped animated companions and killed them ~Aug 2026. If it was cost-per-minute, our economics must beat theirs. If it was retention or moderation, the concept itself is suspect. → Investigate before building; don't hand-wave this.
5. **Meta is the race.** Muse Realtime Avatar (announced Sep 2026, unshipped) animates a photographic portrait into a live avatar. If Meta ships it free, the *technology* commoditizes — our moat must be game loop + authored content, never the renderer. → Plan as if the renderer becomes free.
6. **Identity consistency is the immersion breaker.** DreamGF's ~85% consistency is the bar users now expect; a portrait whose face drifts between expressions breaks the spell instantly. Lip-sync-only on a stable base (MuseTalk path) preserves identity best — full-head re-animation risks drift. → Bake-off must score identity persistence, not just lip-sync.
7. **User-uploaded photos are the engagement hook and the legal trap.** "Your photo, alive" is the viral unit, but it needs ToS rights grants + a moderation pipeline (no minors, no non-consenting third parties) + jurisdiction counsel. Synthetic/commissioned cast for v1; user uploads as a gated phase 2. → Don't promise uploads at v1.
8. **What did I assume?** That "vivid" means visual fidelity. The evidence says vivid = the portrait *perceives you* (Tavus full-duplex: the portrait watches you; Before Your Eyes: blink as input; Descendant X: proximity triggers speech). The cheapest vividness may be input-side (camera/mic attention), not render-side. → Prototype "the portrait notices you" before "the portrait looks 3D."
9. **The former work may already answer half of this.** Sakura hands over prior work tonight. Everything above is pre-read; the landing discussion re-grounds on his material. No PRD, no plan, no build until then — per the product workflow law, the organize+self-QA pass is done, and planning starts tonight.

## 6. Open questions for tonight's landing discussion
1. Form factor: mobile/web game first, or framed physical installation? (Different product, different economics.)
2. Conversation engine at v1: live LLM, scripted keyword backbone (Dekker-style), or hybrid?
3. Cast: synthetic/commissioned faces at v1; user uploads phase 2?
4. What does the former work already cover — and what did it conclude about the above?

## 7. Staged asks for Sakura (things only he can do)
- **Purchases:** Steam Autumn Sale ends Oct 8 — Her Story / Doctor Dekker / Telling Lies / IMMORTALITY are all cheap right now (¥21/¥36/¥19.5/¥45.6 on the CNY storefront). Buying even one (Doctor Dekker recommended — the free-text mechanic is our direct ancestor) unlocks full firsthand playthroughs. Free alternative: Doctor Dekker 2 Demo (2026 sequel, free on Steam).
- **Accounts:** deeper testing of HeyGen/Hedra generation quality and Replika/Nomi/character.ai in-app features needs accounts — his call whether to create them.
- **GPU:** this VM has no GPU, so the §7 validation gates (2.5D prototype, talking-head bake-off) need a cloud GPU (RTX 4090 spot ≈ $0.34/hr) or his local machine.
- **The xAI question:** if he has any channel to learn why Grok's animated companions were retired, that's the highest-value single fact in this research.

## 8. Honesty ledger
- Desk research (01–03) is second-hand by design; every claim carries [REAL]/[SECONDARY]/[OPEN] labels in the source files.
- Firsthand section (§3) is what I personally verified today; gates and failures are named, not smoothed over.
- No plan, PRD, or build has been started. Per the solution-validity law, everything above is findings + hypotheses.
- YouTube let's-plays were not watched (bot gate); Steam's player substituted, labeled per-item.
