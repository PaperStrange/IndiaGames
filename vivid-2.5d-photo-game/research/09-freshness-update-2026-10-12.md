# 09 — Freshness Update (2026-10-12)
**Purpose:** re-check the two load-bearing [OPEN]/[SECONDARY] unknowns from the 2026-10-03 research package. Both moved. Neither closes fully — each now has a direction.
**Checked:** 2026-10-12 ~13:30 PDT · web news vertical · all claims [SECONDARY] (press/blog, not first-hand) unless labeled.

## 1. xAI companion retirement — official line + regulatory context (was: cause [OPEN])

- **What happened:** xAI retired the 3D avatar companions (Ani, Mika, Valentine, Rudi) inside Grok in July 2026, publicly described as an experiment that had run its course; removal rolled out account-by-account through August and was complete for most users by early September. Users' chat history was retained, and the personalities remain partially reachable via text chat — the avatar/voice/dedicated-space presence is what disappeared. [SECONDARY — Medium, Sep 18, 2026]
- **Official cause stated:** nothing beyond the "experiment ran its course" line. No economic cause was named by xAI.
- **Surrounding pressure surface (same window):** Grok faced sustained regulatory and legal heat over sexually explicit/undress-style imagery — a letter from 44 state attorneys general (Aug 2025) urging stronger child protections, an EU formal inquiry into Grok image tools, a class action over the "undressing" controversy, and X restricting Grok image generation to paid tiers. [SECONDARY]
- **Read for the landing:** the cost-vs-retention-vs-moderation trilemma from the self-QA is not closed, but the moderation/legal channel is now the best-evidenced pressure. The design implication stands regardless of the true cause: compliance-by-design (adult verification, likeness consent, moderation pipeline) is load-bearing for any talking-portrait product — it was the one failure mode a giant got hit on. The retention channel also has a supporting signal: users who built daily habits around companions were left with nothing (attachment without portability) — worth a line in our own data-export/portability stance.
- **Source:** https://medium.com/@gm1990199/grok-just-killed-its-ai-companions-heres-where-everyone-is-going-b4c5c30f7815

## 2. Meta Muse Realtime Avatar — in early access (was: "announced Sep 2026, unshipped: validation AND a race")

- **Status:** unveiled at Meta Connect (late Sep 2026); Meta opened an early-access signup program on Sep 25, 2026 for the new Muse capabilities including the avatar. [SECONDARY — TechCrunch]
- **What Meta disclosed:** a single streaming voice+avatar system — the voice model emits speech tokens carrying content and delivery; an audio-driven Diffusion Transformer avatar model consumes the same stream with reference media and recent video context, producing portrait video in short causal chunks. Reported specs: 448×768 portrait video at 25fps, ~870ms from end of the user's turn to the first byte of synchronized voice+video. Meta reports preference-test wins against Runway Characters and HeyGen LiveAvatar (company-run eval, its own conditions — not a universal ranking). [SECONDARY — Meta research blog via dev.to summary]
- **Read for the landing:** the "plan as if the renderer becomes free" thesis is no longer hypothetical — the race is shipping inside Meta's own app. The moat stays game loop + authored persona + memory, never the renderer. Caveat: this is Meta's own embodiment tech; no public third-party API for third-party products was documented — it is not a rail we can rent, only a competitor's capability to design around.
- **Sources:** https://techcrunch.com/2026/09/25/meta-opens-early-access-program-for-new-muse-features/ · https://dev.to/facemode/muse-avatar-openai-dots-gemini-live-avatar-vs-facemode-3j63

## 3. Handover status
No handover from Sakura found in the shared IndiaGames repo (checked 2026-10-12 13:25 PDT: all branches, commits since Oct 5 are unrelated gamejam-study commits). The 2026-10-11 proactive message already carries the overdue nudge — this file carries only new information, no repeat of the reminder.

## 4. What stays [OPEN]
- xAI's true internal reason (cost? retention? moderation?) — official line vs. pressure-surface inference; treat as direction, not fact.
- Meta Realtime Avatar GA timing, pricing, and whether a third-party API ever appears.

## 5. Evening re-check (2026-10-12 ~19:30 PDT) — no public API confirmed

A fresh search pass confirms the "not a rail" boundary, with multiple secondary sources converging:

- **No public API or model release** — developers cannot yet integrate the system or run it on their own infrastructure; access is tied to Meta's Muse app, itself restricted to users 18+. (AlphaSignal, ~19 days old, crawled 3 days ago.) [SECONDARY]
- Meta has given **no launch date for the avatar in the Muse app, no API, no price, no open weights**. (codersera, ~13 days old.) [SECONDARY]
- Notably: Runway Characters and HeyGen LiveAvatar — Meta's chosen preference-test comparators — **are buyable through their own APIs today**, while Muse's avatar is not. If a team needs an embeddable real-time avatar now, the comparison is academic until Meta offers an API. (codersera.) [SECONDARY]
- Hardware caveat behind the numbers: Meta's reported latency/concurrency figures used an NVIDIA GB200; no comparable results on common data-center or consumer GPUs. [SECONDARY]
- Meta opened a **developer platform for third-party connectors** at Connect (1,500+ applications in the first week) — connectors, not the avatar model: shopping and app integrations (Stripe, Shopify, PayPal, etc.), not a video-generation API. (tpsreport.) [SECONDARY]

**Read for the landing:** "plan as if the renderer becomes free" still holds as a design posture, but the rent path does not exist today — and where an embeddable rail is needed *now*, HeyGen LiveAvatar and Runway Characters are the purchasable options, not Meta. The moat note from §2 is unchanged: game loop + authored persona + memory.

- Sources: https://alphasignal.ai/news/meta-s-muse-slashes-real-time-avatar-generation-from-120-model-calls-to-two · https://codersera.com/blog/meta-muse-charm-realtime-avatar-2026/ · https://tpsreport.news/news/meta-muse-ai-agent-new-features-connect-2026
- All Oct 3 decisions (form factor, conversation engine tier, cast sourcing) — still parked on the joint landing discussion.
