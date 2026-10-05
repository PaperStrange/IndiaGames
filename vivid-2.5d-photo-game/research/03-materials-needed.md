# Materials & Assets Needed — Vivid 2.5D Photo Interaction Game
**Date:** 2026-10-03
**Scope:** Everything that must be *acquired, licensed, or produced* (not just engineered) to ship a game where still photos come alive in 2.5D and talk/interact with the viewer — Harry-Potter-portrait style.
**Evidence labels:** `[REAL]` = verified by direct fetch in this session; `[SECONDARY]` = source-reported (press/official docs via search); `[OPEN]` = unvalidated / estimate. All prices USD, researched 2026-10-03 — re-verify before budgeting.

---

## 1. Photo / image assets

### 1.1 Sourcing options

| Option | What you get | Rights situation |
|---|---|---|
| **Stock photos** (Getty, Shutterstock, Adobe Stock) | Millions of portrait photos, model-released | Standard royalty-free licenses cover in-app display, but animating/modifying the photo and *synthesizing a talking likeness* is a use most standard licenses were not written for — read the AI/animation clause of the specific license tier before buying `[OPEN]` |
| **Commissioned photoshoots** | Original portraits with a signed model release + voice-consent bundle | Cleanest legal path: own the full rights chain by contract `[OPEN]` |
| **AI-generated faces** (StyleGAN / diffusion generators) | Unlimited synthetic portraits, no real likeness | Sidesteps right-of-publicity entirely — but you must budget disclosure: e.g. New York requires conspicuous disclosure of AI "synthetic performers" in ads reaching NY audiences (S.8420-A, effective **June 9, 2026**) `[SECONDARY]` |
| **User-uploaded photos** | Player's own photos become the portraits (big engagement hook) | You need ToS terms granting you display/animation rights + a moderation pipeline (no minors, no non-consenting third parties). Legal specifics are jurisdiction work — budget counsel `[OPEN]` |

### 1.2 Likeness, consent & disclosure law (the traps)

- **US right of publicity is a patchwork:** ~35 states have some form, no federal statute. California's requires *commercial use*; whether consumer AI-generation counts is unresolved `[SECONDARY]` (Tech Times, 2026-07-13).
- **New York, Dec 2025:** S.8420-A/A.8887-B — disclosure of synthetic performers in advertising (effective June 9, 2026, $1,000 first-offense / $5,000 subsequent fines); S.8391/A.8882 — post-mortem right of publicity: heirs/executors must consent before a *deceased* person's name/voice/image/likeness is used commercially, including digital replicas (effective immediately on Dec 11, 2025) `[SECONDARY]` (Debevoise / Reuters).
- **Hawaii Act 247 (signed July 14, 2026):** prohibits knowingly publishing a realistic digital imitation of an identifiable individual without written consent when used in an ad, causing harm, or for fraud/defamation/harassment — up to $25,000 per advertisement. *No disclosure regime — only consent matters* `[SECONDARY]` (builtbyfoundry.io).
- **Federal Take It Down Act (effective May 19, 2026):** criminalizes knowingly publishing sexually explicit AI imagery of real people without consent; platforms must honor takedown within 48h `[SECONDARY]` (Tech Times).
- **Practical consequence:** a portrait that recognizably depicts a real living or recently-deceased person needs documented consent; a synthetic face needs provenance records + disclosure in NY-touching marketing. Build a **consent ledger** per face asset from day one `[OPEN]`.

### 1.3 Copyright of AI-generated images

- US Copyright Office position: copyright protects human authorship; works generated solely by a machine lack protection; filers must disclose AI-generated elements; hybrid works can protect human-edited components `[SECONDARY]` (news.ftcpublications.com).
- Getty runs an indemnified generator trained on its licensed creative library with standard commercial royalty-free licensing `[SECONDARY]` (Android Police) — one path to legally clean AI faces, at Getty's generator pricing `[OPEN]`.

### 1.4 Training datasets (if touching model work at all)

- **FFHQ:** licensed CC BY-NC-SA 4.0 (research-only terms on the widely-used derivatives); commercial use prohibited by the terms of use `[SECONDARY]` (github.com/Yutong-Zhou-cv/FFHQ-Text_Dataset, FFHQ terms of use).
- **CelebA-HQ / Multi-Modal CelebA-HQ:** non-commercial research purposes only `[SECONDARY]` (github.com/Ha0Tang/Multi-Modal-CelebA-HQ-Dataset).
- **Case study finding:** of 6 studied public image datasets (CIFAR-10, ImageNet, Cityscapes, FFHQ, VGGFace2, MS COCO), only FFHQ and VGGFace2 use standard CC licenses (both **non-commercial**); using any of these in a commercial pipeline is a license violation without separate clearance `[SECONDARY]` (arXiv 2111.02374).
- **Recommendation:** for a game you ship, train/eval only on (a) fully synthetic faces you generate, or (b) commissioned faces with written release. Do not build production models on FFHQ/CelebA/VoxCeleb2 `[OPEN]`.

---

## 2. Voices

### 2.1 TTS provider pricing (2026)

**ElevenLabs** (quality leader; 32+ languages incl. Korean `[SECONDARY]`):
| Plan | Price | Characters/mo | Commercial rights |
|---|---|---|---|
| Free | $0 | 10,000 (~10 min audio) | No |
| Starter | $5–6/mo | 30,000 | Yes |
| Creator | $22/mo | ~100,000–121,000 | Yes |
| Pro | $99/mo | 500,000–600,000 | Yes |
| Scale | $299–330/mo | 1.8–2.0M | Yes |

`[SECONDARY]` (multiple 2026 pricing roundups; exact quotas drifted across sources — **re-verify at elevenlabs.io/pricing** before budgeting). API rate: ~$50/M characters on Flash/Turbo, ~$100/M on Multilingual v2/v3. Rule of thumb: 1,000 characters ≈ 1 minute of audio `[SECONDARY]`.
- **Per-character material cost for scripted content:** a 20-character game with 50 lines each (~150 chars/line) ≈ 150k chars ≈ $22/mo Creator plan for the whole *scripted* library `[OPEN — arithmetic from SECONDARY prices]`.
- **Live dialogue cost:** every LLM reply is synthesized — see §3 cost model.

**Alternatives:** OpenAI TTS ~$12–18/M characters `[SECONDARY]`; open-source TTS (e.g. Qwen3-TTS, as packaged in LiveTalk-Unity) = zero marginal cost but self-hosted infra `[SECONDARY]` (github.com/genesisinteractive/LiveTalk-Unity).

### 2.2 Voice cloning & licensing terms

- Minimum audio: ~1 minute clean recording for instant cloning; ~30 minutes for professional-grade cloning `[SECONDARY]`.
- **Consent is contractual, not optional:** ElevenLabs requires a consent attestation ("I authorize this voice cloning") before clone creation; its ToS prohibits cloning without proper rights `[SECONDARY]`. Treat the verification as weak (it can be fooled by playing back a recording — demonstrated publicly) — so *your* process must hold the real consent documents `[SECONDARY]` (myaitoolsfinder.com).
- ElevenLabs' published non-EEA terms grant it a perpetual, irrevocable, worldwide, sublicensable license to uploaded content and user voice models (opt-out exists for future training but doesn't undo prior use) `[SECONDARY]` (github.com/calesthio/generative-media-skills, citing terms verified 2026-07-09) — **if actors record for you, disclose where their voice data goes.**
- Cloning a real person's voice without permission can violate right-of-publicity/voice laws in your jurisdiction `[SECONDARY]`.
- AI-agent disclosure: organizations using ElevenLabs for AI agents must clearly tell users they are interacting with AI `[SECONDARY]`.

### 2.3 Human voice actors (base voices / premium characters)

- Non-union game VO: **$250–$600/hour** of recording (US averages; sources GVAA, Voices.com) `[SECONDARY]`.
- SAG-AFTRA interactive minimum: ~$1,005 per 4-hour session (as reported) `[SECONDARY]` — union adds AI-cloning restrictions; check the current Interactive Media Agreement before planning voice-clone reuse of union talent `[OPEN]`.
- Studio time if not remote: $150–$500/hour `[SECONDARY]`; most game actors now record from home studios at no added facility cost `[SECONDARY]` (thisweekinvideogames.com).
- Practical: one 4-hour session ≈ $1,000–$1,600 can cover a full supporting character's scripted lines `[OPEN — arithmetic]`.

### 2.4 Speech-to-text (player talks back)

| Provider | Price | Notes |
|---|---|---|
| OpenAI Whisper API | $0.006/min ($0.36/hr) | Cheapest hosted; no volume discounts |
| Groq Whisper large-v3-turbo | ~$0.02/hr | Cheapest hosted option reported |
| Deepgram Nova-2/3 | $0.0043/min batch | Real-time capable |
| AssemblyAI | $0.012/min | Diarization included |
| Self-hosted Whisper (faster-whisper) | Free + GPU | Best at scale |

`[SECONDARY]` (gladia.io, sipsip.ai, dev.to comparisons, June–Sept 2026). For an installation with always-on mic, self-hosted STT is the only sane cost model `[OPEN]`.

---

## 3. Dialogue / story content

### 3.1 LLM API costs (the live-conversation engine)

Representative 2026 list prices, $/M tokens in/out `[SECONDARY]` (spheron.network Aug 2026; cloudzero.com Sept 2026):

| Model | Input | Output | Fit |
|---|---|---|---|
| DeepSeek V4-Flash | $0.14 | $0.28 | Cheapest hosted |
| GPT-5.6 Luna | $0.20 | $1.20 | Budget OpenAI |
| Gemini 3.5 Flash-Lite | $0.30 | $2.50 | Budget Google |
| Mistral Small 4 | $0.15 | $0.60 | Budget EU |
| GPT-5.6 Terra | $2.00 | $12.00 | Mid |
| Claude Sonnet 5 | $2.00 | $10.00 | Mid (intro rate made permanent Aug 2026) |
| Claude Haiku 4.5 | $1.00 | $5.00 | Light |
| Gemini 3.1 Pro (≤200k ctx) | $2.00 | $12.00 | Mid (doubles >200k tokens) |
| GPT-5.6 Sol | $4–5 | $20–30 | Flagship tier (promo $4/$20 through Nov 21, 2026) |
| Claude Opus 5 | $5.00 | $25.00 | Flagship |

**Working cost model (illustrative — assumptions [OPEN]):** one conversation = 8 turns × (~1,500 input tokens incl. character prompt + history, ~200 output tokens) ≈ 12k in / 1.6k out tokens.
- Budget tier (GPT-5.6 Luna): ≈ $0.0043/conversation → **~$4.30 per 1,000 conversations**.
- Mid tier (Claude Sonnet 5): ≈ $0.040/conversation → **~$40 per 1,000 conversations**.
- Character prompt caching cuts input cost sharply at volume — measure your real prompt sizes before committing `[OPEN]`.

### 3.2 Writing pipeline

- **Scripted backbone** (greetings, stories, quests): needs a game/dialogue writer; LLM drafts + human edit is the cheap path `[OPEN]`.
- **Character prompt engineering** is a real asset class here — each portrait needs a persona bible (voice, memories, mannerisms) that fits in the context window; this is authored content, not a one-liner `[OPEN]`.
- **Safety/red-team content:** portraits must not be jailbroken into saying disallowed things; budget adversarial testing of the character prompts `[OPEN]`.

### 3.3 Localization (EN / JP / CN)

Professional agency per-source-word rates `[SECONDARY]` (Transphere, 2026 CJK guide):
- EN → Simplified Chinese: **$0.10–$0.18**
- EN → Traditional Chinese: $0.12–$0.20
- EN → Japanese: **$0.15–$0.28** (highest — keigo register, gendered speech, small translator pool)
- AI draft + native-speaker review: $0.03–$0.06/word `[SECONDARY]`

Arithmetic `[OPEN]`: a 30k-word script (mid-size narrative) ≈ $3,000–$5,400 for Simplified Chinese, $4,500–$8,400 for Japanese at agency rates. But **live LLM dialogue localizes itself** — the ongoing cost is prompt engineering per language (persona must read native in JP/CN, not translated-English), which is a skill cost, not a word cost `[OPEN]`.

## 4. Training / data needs (only if you fine-tune anything)

- **You likely don't need to train.** One-shot portrait-animation models (LivePortrait, Hallo family) animate *any* photo with zero per-portrait training `[SECONDARY]` (arXiv 2412.00733; Tom's Guide hands-on).
- **Person-specific models** (TalkingGaussian, GaussianTalker, ER-NeRF style): need ~several minutes of talking video per subject (~6,000 frames @25fps); training takes ~0.5–5 hours on a single RTX 3080 Ti-class GPU `[SECONDARY]` (arXiv 2404.15264, 2404.16012). Only relevant if you want *photoreal lip-sync for a fixed cast* rather than one-shot animation.
- **From-scratch training scale** (for context, not recommended): LivePortrait-class models trained on ~69M video frames `[SECONDARY]`; a 2026 CVPR paper trained on 50h of VoxCeleb2 + 280h in-house data across ~10k identities `[SECONDARY]` — i.e., tens of thousands of dollars of compute and a licensed dataset. Don't.
- **Depth models** (for the 2.5D parallax layer): monocular depth estimators like MiDaS / Depth Anything are pretrained and open — no training data needed on your side `[SECONDARY]` (morphic.com parallax guide; sibling tech report).
- **If you do fine-tune** (e.g., LoRA on an open talking-head model for a house style):
  - Data: dozens–hundreds of curated portrait clips, rights-cleared (§1.4) `[OPEN]`
  - Compute: RTX 4090 spot from **$0.34/hr** (Vast.ai) `[SECONDARY]`; H100 $1.49/hr spot (Vast) to $2.99–$3.29/hr on-demand (RunPod Secure / Lambda) `[SECONDARY]`; new H100 80GB ~$31,000 to buy `[SECONDARY]` (CloudZero, Aug 2026)
  - A short fine-tune (tens of GPU-hours) costs **~$50–$500** on spot/cheap cloud `[OPEN — arithmetic]`

## 5. Software licenses & hardware

### 5.1 Game engine / dev software

| Item | Cost |
|---|---|
| **Unity Personal** | Free under $200k annual revenue/funding; optional "Made with Unity" splash (Unity 6) `[SECONDARY]` |
| **Unity Pro** | $2,200/seat/year (price set Jan 2025; required above $200k revenue) `[SECONDARY]` |
| **Unreal Engine** | Free; 5% royalty above $1M gross revenue per product `[SECONDARY]` |
| LiveTalk-Unity (LivePortrait+MuseTalk+Qwen3-TTS, ONNX/CoreML on-device) | Open source on GitHub `[SECONDARY]` |
| Depth estimation (MiDaS / Depth Anything) | Open weights, research licenses — check commercial terms per model `[OPEN]` |
| Creative tools (Adobe CC etc.) | ~$55–60/mo/seat standard commercial pricing `[OPEN — verify]` |

### 5.2 Dev hardware

- **Prototype:** a consumer RTX 4090 (24GB VRAM) workstation runs LivePortrait-class inference and small fine-tunes locally `[SECONDARY]` (LivePortrait billed as "fastest motion-tracking AI model for consumer GPUs").
- **Cloud fallback:** RTX 4090 $0.34–$0.74/hr; A100 80GB ~$1.49–$2.79/hr; H100 ~$1.49–$3.99/hr depending on provider/tier `[SECONDARY]` (Lyceum Aug 2026; RunPod/Lambda/Vast roundups).

### 5.3 Interaction hardware — physical installation vs mobile/web

**Framed-display route** (the literal Hogwarts wall):
- Samsung **The Frame 2026** official prices: 32" ~$485 (street) `[SECONDARY]`; 55" $1,199.99, 65" $1,499.99, 75" $1,999.99, 85" $2,999.99, 98" $4,499.99; Frame Pro 55" $1,499.99 → 85" $3,999.99 `[SECONDARY]` (news.samsung.com, June 2026).
- ⚠️ The Frame runs Tizen — shipping a custom *interactive* app on it is not a normal dev path; realistically you'd pair a frame-style commercial display with a mini-PC (Intel NUC-class) driving the game, plus camera + mic + speaker `[OPEN]`.
- For 24/7 installations, commercial digital-signage panels (rated for continuous duty) beat consumer TVs on warranty/thermals `[OPEN]`.
- Per-installation hardware sketch `[OPEN — unvalidated, needs vendor quotes]`: 55" frame-style 4K display (~$1,200) + mini-PC (~$500) + camera/mic/speaker (~$150–$300) + mount/install (~$200) ≈ **$2,000–$2,500 per wall unit**, before software.

**Mobile/web route:**
- No special hardware; players use their own phones. Interaction = touch + optional mic (Web Speech API or Whisper). Distribution via web demo (Vercel-class hosting ~$20/mo) or app stores `[OPEN]`.
- Recommendation material: **start mobile/web** — the frame installation is a second-phase premium once the interaction is proven `[OPEN]`.

## 6. Team skills & cost/effort estimates

### 6.1 Minimum skill set

| Role | Why this game specifically needs it |
|---|---|
| Game/creative director + **dialogue writer** | Portrait personas are the product — writing is a core material, not garnish |
| AI/ML engineer (vision) | Portrait animation + depth/parallax pipeline, lip-sync integration |
| Gameplay/client engineer (Unity or web) | Interaction loop, camera/mic I/O, state |
| Backend engineer (or same as above at MVP) | LLM orchestration, TTS/STT plumbing, session memory |
| Sound / voice director | Voice casting or clone direction, TTS tuning |
| Producer | Consent/legal pipeline, asset tracking |

### 6.2 Cost benchmarks `[SECONDARY]` (outsource/studio data, 2026)

- **Solo dev:** $10k–$50k total over 6–12 months (vsquad.art).
- **Small team (2–5):** $50k–$150k over 12–18 months (vsquad.art).
- **Indie studio baseline:** 3 FTE ≈ $25.8k/mo payroll + ~$5.7k/mo overhead → **~$31.5k/mo burn** (financialmodelslab.com).
- **Outsourced:** dedicated developer $6k–$12k/mo; art $25–$60/hr or $2k–$8k per asset set; full-cycle game $150k–$1M+ (juegostudio.com).

### 6.3 Effort sketch for this concept `[OPEN — estimates, not quotes]`

- **MVP (3–6 months, 1–2 people):** one-shot portrait animation + scripted dialogue trees + TTS + 5–10 portraits, mobile/web. Mostly integration of existing open models — the *writing* is the long pole.
- **Full vision (9–18 months, 3–5 people):** live LLM conversation per portrait, voice in/out, multilingual, 2.5D parallax polish, framed-installation build.
- Biggest cost risks: (1) live-conversation API bills at scale (§3.1 — budget tiers exist); (2) legal/consent work for likenesses (§1.2); (3) content volume — each portrait is a writing + voice asset.

---

## Master materials checklist

- [ ] Portrait faces: commissioned (releases signed) or synthetic (provenance + NY-disclosure plan); **not** FFHQ/CelebA/VoxCeleb2
- [ ] Consent ledger: per face — photo rights, voice rights, animation rights, territories, duration
- [ ] Voices: per character — TTS plan (ElevenLabs tier or self-hosted) or actor sessions ($250–600/hr)
- [ ] STT plan for player voice input (self-hosted Whisper at scale)
- [ ] Character bibles: persona, memories, speech style per portrait (the core authored asset)
- [ ] Scripted dialogue library (greetings, stories, fallback lines)
- [ ] Localization plan: EN/JP/CN prompt engineering; agency rates $0.10–$0.28/word for static text
- [ ] LLM cost model measured on real prompt sizes (budget vs mid tier = ~10× cost gap)
- [ ] Engine license decision (Unity Personal free <$200k / Pro $2,200/seat / Unreal 5% >$1M)
- [ ] Target form factor decision: mobile/web first vs framed installation (~$2–2.5k/unit hardware)

## Key sources

- Portrait animation models: https://github.com/genesisinteractive/LiveTalk-Unity · https://arxiv.org/pdf/2412.00733 (Hallo3) · https://www.tomsguide.com/ai/ai-image-video/i-tried-liveportrait-a-fun-way-to-animate-headshots-and-more
- 2.5D parallax: https://morphic.com/ai-glossary/parallax-effect · https://petapixel.com/2013/11/19/creating-motion-stills-animate-photo-post-parallax-effect/
- Likeness law: https://www.debevoise.com/insights/publications/2025/12/new-york-enacts-landmark-ai-right-of-publicity-law · https://Www.techtimes.com/articles/320268/20260713/meta-axed-instagram-ai-feature-that-generated-anyones-likeness-without-consent.htm · https://www.builtbyfoundry.io/blog/do-you-have-to-label-ai-content-2026-3-rules-2-laws
- Datasets: https://github.Com/Yutong-Zhou-cv/FFHQ-Text_Dataset · https://github.com/Ha0Tang/Multi-Modal-CelebA-HQ-Dataset · https://arxiv.org/pdf/2111.02374v4
- Voices: https://www.stork.ai/blog/elevenlabs-pricing-2026 · https://ainexustools.online/blog/elevenlabs-pricing-character-credits-2026/ · https://github.com/calesthio/generative-media-skills/blob/HEAD/skills/providers/text-to-speech/elevenlabs-tts/SKILL.md · https://www.provoiceactor.co.uk/blog/how-much-does-a-professional-voice-over-cost/ · https://thisweekinvideogames.com/feature/how-the-effort-and-cost-of-human-voice-actors-compares-to-generative-ai/
- STT: https://www.gladia.io/blog/openai-whisper-vs-google-speech-to-text-vs-amazon-transcribe · https://dev.to/pietrus914/speech-to-text-api-comparison-whisper-api-options-in-2026-400h
- LLM pricing: https://www.spheron.network/blog/llm-api-pricing-comparison-gpt-claude-gemini-deepseek-2026/ · https://www.cloudzero.com/blog/token-based-pricing/
- Localization: https://www.transphere.com/cjk-game-localization-the-complete-guide-you-cant-miss-in-2026/
- GPUs: https://lyceum.technology/magazine/lambda-labs-vs-runpod-vs-vast-ai/ · https://www.cloudzero.com/blog/h100-gpu-cost/
- Engines: https://300mind.studio/blog/unreal-engine-licensing-royalties/ · http://gameworldobserver.com/2024/09/12/unity-cancels-runtime-fee-new-pricing-changes
- Displays: https://news.samsung.com/us/samsung-elevates-2026-frame-lineup-broader-customization-advanced-glare-free-technology/
- Team costs: https://vsquad.art/blog/indie-game-budgets-what-it-really-costs-to-build-a-game · https://www.juegostudio.com/blog/game-development-outsourcing-process · http://financialmodelslab.com/blogs/operating-costs/indie-game-development-studio
- Person-specific training: http://arxiv.org/pdf/2404.15264v1 · https://arxiv.org/html/2404.16012v2/ · http://openaccess.thecvf.com/content/CVPR2026/papers/Xu_Real-Time_Generation_of_Streamable_Talking_Portrait_Video_with_Reference-Guided_Deep_CVPR_2026_paper.pdf
