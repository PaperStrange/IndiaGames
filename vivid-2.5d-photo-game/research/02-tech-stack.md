# Vivid 2.5D Photo Interaction Game — Technology Stack Research
**Date:** 2026-10-03 · **Document:** `02-tech-stack.md` (synthesis of threads 02a–02d)
**Scope:** TECHNOLOGY lens only — research papers, official tech sites/blogs, GitHub repos/discussions/forums. No product-design frameworks, no business articles.
**Status:** findings + hypotheses. Per the solution-validity law, the recommended stacks below are hypotheses — they become a plan only after the validation gates in §7 are run.

**Evidence legend:** [REAL] = verified first-hand in the source thread (repo/page opened and read, 2026-10-03). [SECONDARY] = a source claims it (cited in the thread files). [OPEN] = unvalidated gap — never treated as fact.

Thread files: `02a-depth-25d.md` · `02b-talking-heads.md` · `02c-inference-apis.md` · `02d-supporting-tech.md`

---

## Executive verdict (what the research establishes)

1. **2.5D parallax from a single photo is a solved systems problem in 2026** — depth → LDI layering → one-time occlusion inpainting → WebGL shader rendering at 60 fps. A license-clean commercial pipeline exists end-to-end: DA3-Small/Base/Mono (Apache-2.0 [REAL]) or MoGe-3 (MIT [REAL]) → LaMa inpainting (Apache-2.0 [REAL]) → WebGL. The research frontier (feed-forward 3D Gaussian Splatting) is better but has **no license grant** — Flash3D's repo has no LICENSE file [REAL] = all rights reserved.
2. **Real-time talking portraits are buildable today with commercial-safe open models** — JoyVASA (MIT [REAL]) → FasterLivePortrait (MIT code [REAL]) for full-head audio-driven motion at 30+ fps on RTX 3090-class [SECONDARY], or Ditto (Apache-2.0 [REAL]) / SoulX-FlashHead Lite (Apache-2.0 [REAL], 96 fps on RTX 4090 [SECONDARY]) as single-model streamers, or MuseTalk (MIT [REAL]) for lip-sync-only on a looping idle video.
3. **The license landscape is the minefield, not the math.** The single most important finding: best-quality checkpoints across depth (DA3 Giant/Large), lip-sync (Wav2Lip), and TTS (XTTS v2, F5-TTS, Fish Speech weights) are **non-commercial or unlicensed**. Every candidate must be checked at the *weights* level, not just the code license.
4. **Build-vs-buy for the interactive loop:** self-hosted render ≈ $0.01/min per session (L4/4090-class, assumed concurrency [OPEN]) [SECONDARY math]; managed live APIs range $0.01/min (HeyGen volume tier [REAL]) to $0.37/min overage (Tavus [REAL]); honest full-stack band (voice pipeline + engineering) $0.17–0.33/min + 8–12 weeks [SECONDARY].
5. **Latency target:** tap/speak → first animated frame <1.0 s for "alive", <500 ms for conversational feel (targets, not measured). Design lever: react *visually* first on fast local inference while the voice pipeline catches up.

---

## 1. 2.5D from a single still — depth, parallax, inpainting

### 1.1 Monocular depth estimation (2026)

| Model | Maturity | Quality standing | Latency evidence | Cost | License (verified) |
|---|---|---|---|---|---|
| **Depth Anything 3** (ByteDance, ICLR 2026) | Released, active ecosystem (ComfyUI, Blender, TensorRT wrappers) | 2026 SOTA [SECONDARY] | No official ms table [OPEN] | Compute | **Repo Apache-2.0, but only Small/Base/Mono/Metric weights are Apache-2.0; Giant/Large/Nested = CC BY-NC 4.0** [REAL — README model table] |
| **Depth Anything V2** (2024) | Released, deployment workhorse | Below DA3; best small-model evidence | 31–34 ms iPhone NPU (Apple), 18–36 ms Snapdragon NPU (Qualcomm) for Small [SECONDARY] | Compute | Small = Apache-2.0; Base/Large/Giant = CC BY-NC 4.0 [REAL — README] |
| **MoGe-3** (Microsoft, Aug 2026) | Released 2026-08-18 | Strong metric geometry (point map + normals + intrinsics, one pass) | 60 ms on A100/3090 FP16 (authors' claim) [SECONDARY] | Compute | **MIT** (DINOv2 part Apache-2.0) [REAL — README] |
| Depth Pro (Apple) | Released | Sharpest metric boundaries | 0.3 s / 2.25MP (authors) [SECONDARY] | Compute | AMLR research-only — **commercially unusable** [SECONDARY + repo "NOASSERTION" [REAL]] |
| UniDepthV2 (ETH) | Released | Strong universal metric | ~27 ms TensorRT (community) [SECONDARY] | Compute | CC BY-NC 4.0 — **commercially unusable** [SECONDARY] |
| Marigold (ETH, CVPR 2024) | Released | Sharpest edges (diffusion) | Slow (10–50 diffusion steps) | Compute | Apache-2.0 code [REAL]; weights Apache-2.0 [SECONDARY] |
| ZoeDepth / MiDaS | Archived/dead (Intel ceased dev) | Legacy baseline | — | Compute | MIT [REAL/SECONDARY] — usable but superseded |

**Parallax rendering techniques:**

| Technique | Maturity | Quality | Latency | Cost | License |
|---|---|---|---|---|---|
| **LDI layering** (Shih et al. 2020 — the Facebook 3D Photos approach) | Shipped at FB scale | Production-grade | Render: 60 fps shader compositing; inpaint once per photo at import | Compute | Technique reimplementable; components clean |
| **MPI planes** (AdaMPI, SIGGRAPH 2022) | Released (research) | Strong (paper beats baselines) | Real-time (alpha compositing) | Compute | AdaMPI weights/code: **research/non-commercial only** [SECONDARY] — reimplement the fit yourself |
| **Feed-forward 3DGS** (Flash3D, 3DV 2025) | Research | Best quality-per-effort trajectory | Hundreds of fps class [SECONDARY] | Compute | **No LICENSE file in official repo** [REAL] = all rights reserved — **cannot use** |
| 3D Ken Burns / SynSin | Research demos | Foundational, dated | Batch | Compute | Research demos, not product components |

**Occlusion inpainting (import-time, once per photo — never per frame):**

| Model | Maturity | Quality | Latency | Cost | License |
|---|---|---|---|---|---|
| **LaMa** (WACV 2022) | High (10k stars, powers cleanup.pictures) | Default choice; excels at narrow disocclusion strips | Seconds/photo on GPU | Compute | **Apache-2.0** [REAL] |
| ZITS/ZITS++ | Released | Quality-competitive | Seconds/photo | Compute | Apache-2.0 [SECONDARY] |
| MAT | Released | Strong | Seconds/photo | Compute | CC BY-NC 4.0 [SECONDARY] — unusable |
| MI-GAN | Released | Lightweight alternative | Fast | Compute | MIT [SECONDARY] |

**§1 verdict:** license-clean production stack = **DA3-Small/Base/Mono or MoGe-3 (depth) → LDI layering → LaMa disocclusion inpaint (import-time) → WebGL shader render**. On-device depth is solved (20–35 ms on 2024–2026 phone NPUs [SECONDARY]); the constraint is boundary sharpness on portrait edges, not latency.

---

## 2. Talking-head / portrait animation

### 2.1 Real-time and near-real-time (the shortlist)

| Model | Maturity | Quality | Latency / real-time | Cost | License (verified) |
|---|---|---|---|---|---|
| **LivePortrait** (Kuaishou) | Released, ~14.4k stars | High (real-time class); video-driven (needs audio→motion front-end) | ~78 fps on RTX 4090 (~12.8 ms/frame) [SECONDARY] | Compute | **MIT** [REAL]; ⚠️ InsightFace dep flagged non-commercial by third-party audit [SECONDARY] — swap detector |
| **FasterLivePortrait** (community) | Released | = LivePortrait | 30+ fps on RTX 3090 via TensorRT incl. pre/post [SECONDARY] | Compute | **MIT code** [REAL]; model weights carry their own licenses |
| **JoyVASA** (JD Health, 2024) | Released | Good audio→motion | Near-real-time; exact fps [OPEN] | Compute | **MIT** [REAL] — pairs with LivePortrait as the audio front-end |
| **MuseTalk 1.5** (Tencent Music) | Released | High (lip-sync only; 256px face region) | 30+ fps on V100, 72 fps on RTX 4090, 4 GB fp16 [SECONDARY] | Compute | **MIT** [REAL] — cleanest legal profile (deps documented in repo) |
| **Ditto** (Ant Group, ACM MM 2025) | Released | High + controllable motion semantics | Streaming ~45 fps [SECONDARY]; RTX 4090/3090-class | Compute | **Apache-2.0** [REAL] |
| **SoulX-FlashHead** (2026-02) | Released 8 months ago | Highest reported sync among streamers (Sync-C 6.04) | Lite: 96 fps on RTX 4090; Pro: 10.8 fps / 25+ fps on 2×5090 [SECONDARY] | Compute | **Apache-2.0** [REAL] |
| **LiveTalking** (streaming server, not a model) | Released, 9.7k stars | = wrapped model (MuseTalk recommended) | 42–72 fps (MuseTalk) depending on GPU [SECONDARY] | Compute | **Apache-2.0** [REAL]; paid commercial edition exists; social watermark request for published video [SECONDARY] |
| **EchoMimicV3** (Ant, AAAI 2026) | Released | High (head+body) | Flash 8-step, ~12 GB VRAM; exact fps [OPEN] | Compute | Apache-2.0 [SECONDARY — metadata/README; read LICENSE.txt before shipping] |

### 2.2 Offline quality (batch generation — for pre-rendered lines, not live talk)

| Model | Maturity | Quality | Latency | Cost | License |
|---|---|---|---|---|---|
| **LatentSync 1.5/1.6** (ByteDance) | Released, active | Best open lip-sync fidelity (256–512px) | Minutes/clip (diffusion) — not real-time | Compute (8–18 GB VRAM) | **Apache-2.0** [REAL]; weight/detector caveats [SECONDARY] — legal reconcile before shipping |
| Hallo / Hallo3 (Fudan) | Released | High | ~1.2 / ~0.16 fps — not real-time [SECONDARY] | Compute | **MIT** [REAL]; Hallo2's 4K step pulls S-Lab 1.0 (non-commercial) [SECONDARY] |
| AniPortrait (Tencent) | Released | High | Not real-time [OPEN exact] | Compute | **Apache-2.0** [REAL] |
| SadTalker | Released, v0.0.2 | Moderate (256/512px, stiff) | ~50× slower than realtime on CPU [SECONDARY] | Compute | **Apache-2.0** [REAL]; bundled checkpoints carry their own licenses [OPEN] |
| Sonic (CVPR 2025) | Released | Very high (best sync scores) | ~1.7 fps, ~32 GB VRAM [SECONDARY] | Compute (NC) | **CC BY-NC-SA 4.0** [REAL] — non-commercial; commercial path = Tencent Cloud API |

### 2.3 Unreleased / blocked (do not build on these)

| Model | Status | License |
|---|---|---|
| EMO (Alibaba) | Official repo is an **empty placeholder** — no code [REAL] | N/A |
| VASA-1 (Microsoft) | Explicitly never released (misuse concerns) [SECONDARY] | N/A |
| Loopy (ByteDance), PortraitTalk | Paper-only, no code | N/A |
| Wav2Lip | Released but **no license file + README bans commercial use** [REAL/SECONDARY] | Research-only (commercial HD via authors) |
| DaGAN, Audio2Head | **No license file** [REAL] | All rights reserved |
| OmniHuman-1.5 (ByteDance) | Hosted API only | Proprietary ($0.132/s [SECONDARY]) |

**§2 verdict:** the commercial-safe real-time paths are (a) **JoyVASA → FasterLivePortrait** (full-head motion, cheapest GPU), (b) **Ditto / SoulX-FlashHead Lite** (single-model streamers, heavier GPU, better quality), or (c) **MuseTalk on a looping idle video** (lip-sync-only, cheapest of all — the Hogwarts-portrait feel wants the portrait to stay *the portrait*, and lip-sync-only preserves identity exactly).

---

## 3. Real-time inference — build vs buy

### 3.1 Managed interactive-avatar APIs (2026, verified)

| Platform | Interactive? | Time-to-first-frame | Pricing | Notes |
|---|---|---|---|---|
| **HeyGen LiveAvatar** | Yes (WebRTC) | <300 ms median TTFF [REAL — liveavatar.com] | 2 credits = 1 min Full Mode; **$0.01/min at top volume tier** [REAL]; ~$0.09–0.18/min typical plans [SECONDARY] | BYO-voice (Avatar Only) or full stack [REAL] |
| **Tavus CVI** | Yes (WebRTC, 1080p, perception + turn-taking) | ~600 ms round-trip [SECONDARY] | Starter $59/mo (100 min); overage **$0.37/min**, 30-s minimum [REAL] | Strongest consent workflow for real-person replicas [SECONDARY] |
| **D-ID Agents** (V4 Expressive) | Yes (WebRTC/LiveKit) | Sub-200 ms claimed (parallelized pipeline) [SECONDARY] | Studio $4.70–108/mo [SECONDARY]; per-minute streaming burn **[OPEN]** (pricing page JS-gated) | CES 2026 award; domain allowlisting [SECONDARY] |
| **Anam** | Yes (WebRTC; Pipecat/LiveKit plugins) | Sub-900 ms end-of-utterance → response [SECONDARY] | **$0.11–0.16/min** tiered, billed by the second [REAL]; free 30 min/mo non-commercial | Custom avatar from a **single image** <2 min [REAL] |
| Hedra Character-3 | **No — batch/async only** (up to 10-min video file) | N/A | $1.50–3.75/min [REAL] | For pre-rendered cinematic lines, not live conversation |

### 3.2 Self-hosted GPU economics (RunPod, Sep 2026 [SECONDARY])

| GPU | Secure Cloud | Serverless |
|---|---|---|
| RTX 4090 (24 GB) | $0.74/hr | $1.10/hr |
| L4 (24 GB) | $0.69/hr | — |
| A100 (80 GB) | $1.59/hr | $2.72/hr |
| H100 (80 GB) | $3.49/hr | $4.79/hr |

Back-of-envelope: one L4/4090 session at 25–30 fps ≈ **$0.012/min of conversation** (assumed 1–2 sessions per card — [OPEN]); batch pre-render at ~3× realtime ≈ **$0.004/min of video** (assumed speedup — [OPEN]). The **LLM + TTS voice pipeline dominates** per-minute cost; honest full-stack build-vs-buy band: **$0.17–0.33/min + 8–12 weeks engineering** [SECONDARY].

### 3.3 On-device (2026 flagships)

NanoAvatar (builder's own report [SECONDARY]): talking avatars on *older Android phones*, no cloud GPU — **112 ms first frame, 37 fps on Snapdragon 8 Gen 3**. MuseTalk MLX/Swift ports for Apple Silicon exist [SECONDARY]. Pragmatic cut for the game: **on-device lip-sync + expression rendering with server-side (or streaming) voice/TTS** — fully offline conversational portrait on a phone remains an integration effort, not a drop-in [OPEN].

### 3.4 Latency budget — "the photo responds"

Human inter-turn median ≈ 200 ms [SECONDARY]. Component chain: VAD/endpointing 15–200 ms → STT 200–600 ms → LLM TTFT 100–1000 ms → TTS 100–300 ms → avatar render 130–900 ms → network 20–150 ms; best-case totals ≈ 415 ms, typical 1.1–2 s [SECONDARY]. Target (assumed): **<1.0 s to first animated frame** for "alive", **<500 ms** for conversational feel — design lever is *visual reaction first*, voice second.

**§3 verdict:** start self-hosted or on a BYO-voice managed tier; the render layer is the cheap part. **Critical flag:** every vendor's acceptable-use policy re: adult/explicit companion content must be checked line-by-line before any adult persona routes through a third-party avatar API — [OPEN].

---

## 4. Supporting tech

### 4.1 Portrait segmentation / matting (import-time cutout)

| Model | Maturity | Quality | Latency | Cost | License |
|---|---|---|---|---|---|
| **BiRefNet** | High; portrait/matting/HR/lite variants | Top still-photo boundaries | Heavy GPU; lite variants exist | Compute | **MIT** [REAL] — strongest one-shot cutout candidate |
| **MODNet** | High (AAAI 2022, widely deployed) | Good alpha (below BiRefNet-HR on hard edges) | Real-time; 2K on common PC/mobile [SECONDARY] | Compute | **Apache-2.0 incl. models** [REAL — corrects the common "non-commercial" claim] |
| SAM2 | High (foundation model) | Top zero-shot boundaries; generalist | ~23 ms (L) @1024² FP16 [SECONDARY] | Compute | **Apache-2.0** [REAL] |
| U²-Net | Legacy (2020) | Below current SOTA | Light / CPU-feasible | Compute | **Apache-2.0** [REAL] |
| RVM | High but archived-ish | Strong video matting | 4K@76fps (1080 Ti) [SECONDARY] | Compute | **GPL-3.0** [REAL] — **avoid** for a proprietary product |
| BiSeNet face-parsing | High (standard tooling) | Part labels (lips/eyes/hair), not alpha | Fast | Compute | **MIT** [REAL] — complementary part masks for the animation rig |

### 4.2 Open-source TTS

| Model | Maturity | Quality | Latency | Cost | License |
|---|---|---|---|---|---|
| **Kokoro-82M** | High (HF arena winner) | ELO parity with 10×-larger models | CPU ~2× realtime; GPU 47 ms TTFA [SECONDARY] | Compute | **Apache-2.0 (code + weights)** [REAL/SECONDARY] — fixed voices |
| **CosyVoice 2** (Alibaba) | High | SOTA multilingual naturalness | **~150 ms streaming** [SECONDARY] | Compute | **Apache-2.0 (code [REAL]; weights [SECONDARY])** — 3–10 s zero-shot cloning |
| F5-TTS | High | Strong cloning quality | RTF ~0.18 on 4090 [SECONDARY] | Compute | Code **MIT** [REAL] but weights **CC-BY-NC** [SECONDARY] — **blocked** unless self-trained |
| XTTS v2 (Coqui) | High but **unmaintained** (Coqui dead) | MOS ~4.2 | <200 ms streaming [SECONDARY] | Compute | Code MPL-2.0 [REAL]; weights **CPML non-commercial** [SECONDARY] — **blocked** |
| IndexTTS 2.x | Medium-high | Emotion/rate control | Streaming-focused [SECONDARY] | Compute | **Custom Bilibili license with 100M-MAU scale gate** [SECONDARY] — needs legal read |
| Fish Speech | High | Arena quality leader | Streaming | Compute | Weights **CC-BY-NC-SA / Research License** [SECONDARY] — **blocked** |

### 4.3 Commercial TTS APIs (ballpark [SECONDARY])

| Provider | Maturity | Quality | Latency (claimed) | Cost |
|---|---|---|---|---|
| ElevenLabs | Market leader | Top | ~75 ms (Flash v2.5) | $0.15–0.30 / 1K chars PAYG |
| Cartesia (Sonic 3.6) | Arena leader 2026-08 | Top | sub-90 ms | ~$49 / 1M chars |
| OpenAI | High | Strong (fixed voices) | ~300–500 ms | $15–30 / 1M chars |
| Azure Speech | Enterprise | Strong | ~200 ms | ~$16 / 1M chars |

~1,000 chars ≈ 1 minute of audio [SECONDARY]. Content-policy note: ElevenLabs prohibits "unauthorized sexualization" — check against game content [SECONDARY].

### 4.4 Lip-sync modules

| Model | Maturity | Quality | Latency | Cost | License |
|---|---|---|---|---|---|
| **MuseTalk** | High | Good; seams on extreme pose | **Real-time 30+ fps on V100, 4 GB fp16** | Compute | **MIT** [REAL] — real-time conversation pick |
| **LatentSync** | High | Best OSS fidelity (256–512px) | Minutes/clip — offline only | Compute (8–18 GB VRAM) | **Apache-2.0** [REAL] — pre-rendered lines pick |
| Wav2Lip | Legacy (2020) | Dated (96px mouth) | Light | Compute | **Non-commercial README terms** — **blocked** |

Rule of thumb: **lip-sync-only** when the photo must stay exactly the photo (identity preservation = the Hogwarts-portrait feel); full-head animation only for idle "breathing" motion, quality-gated.

### 4.5 Dialogue plumbing (kept brief)

Chained pipeline (STT → LLM → TTS) keeps an inspectable text stage for the game's content policy; speech-to-speech APIs are faster but opaque. Off-the-shelf in 2026: **LiveKit Agents 1.8.2 / Pipecat 1.11.0** (Sep 2026) ship Silero VAD, semantic turn detection, and barge-in [SECONDARY]; best turn confirmation ≈ 543 ms @ 5% false cutoffs (eot-bench) vs humans' ~208 ms [SECONDARY]. TTS choice plugs in via framework plugins.

---

## 5. The license minefield — one consolidated table

| Trap | Component | Rule |
|---|---|---|
| Best depth checkpoints are NC | DA3 Giant/Large/Nested, DA V2 Base/Large/Giant | Use only **DA3-Small/Base/Mono/Metric** (Apache-2.0) or **MoGe** (MIT) [REAL] |
| Best TTS weights are NC | XTTS v2, F5-TTS, Fish Speech | **Kokoro / CosyVoice 2** are the clean OSS voices; or commercial APIs |
| Best lip-sync is NC | Wav2Lip | **MuseTalk** (MIT) or LatentSync (Apache-2.0) |
| Best diffusion talking-head is NC | Sonic (CC BY-NC-SA) | Real-time alternatives are MIT/Apache anyway — Sonic is offline-only |
| No license = no grant | Flash3D, DaGAN, Audio2Head, Wav2Lip | All rights reserved; cannot use without author permission [REAL] |
| Dependencies carry their own licenses | InsightFace (in LivePortrait), GFPGAN (SadTalker), SD-VAE (LatentSync) | Audit and swap before shipping [SECONDARY]; open items in §7 |
| Copyleft | RVM (GPL-3.0) | **Avoid** — MODNet/BiRefNet cover the same job permissively [REAL] |
| Custom scale gates | IndexTTS 2.x (100M MAU) | Legal read before adoption [SECONDARY] |
| Social (not legal) constraint | LiveTalking watermark request on published video | Plan handling for public-facing use [SECONDARY] |
| Vendor AUP | All managed avatar/TTS APIs | Check adult-content policy line-by-line — [OPEN] for this project |

---

## 6. Recommended stacks (hypotheses — not validated decisions)

**A. Fastest path to a talking photo (import-time batch, pre-scripted lines):**
Photo → BiRefNet cutout (MIT) → DA3-Small depth (Apache-2.0) → LDI layering → LaMa inpaint (Apache-2.0) → WebGL parallax render → dialogue text → Kokoro TTS (Apache-2.0) → LatentSync (Apache-2.0) mouth on the rendered portrait → layered in the game client. Everything runs once per line at import time; no GPU needed at conversation time.

**B. Interactive real-time conversation (self-hosted):**
Live dialogue on LiveKit/Pipecat (chained STT → LLM → streaming TTS: Kokoro or CosyVoice 2) → **JoyVASA → FasterLivePortrait** (full-head, MIT stack, 30+ fps on RTX 3090-class) **or MuseTalk** (lip-sync-only, MIT, lightest) over a pre-rendered parallax portrait → WebGL parallax keeps running at 60 fps while the face animates. GPU ≈ $0.01/min/session [SECONDARY math; concurrency [OPEN]].

**C. Interactive without building (managed):**
Anam (single-image avatar [REAL], $0.11–0.16/min) or HeyGen LiveAvatar ($0.01/min volume [REAL], BYO voice) — gated on acceptable-use review for the game's content — [OPEN].

---

## 7. Validation gates — what must happen before any stack becomes a decision

1. **2.5D prototype on real photos** ("no test no fact no result"): depth → LDI → LaMa → WebGL on actual portrait-style inputs; measure boundary fringing and fps on a mid-range Android. §1's "solved systems problem" claim is an architecture claim, not a product-quality claim.
2. **Talking-head bake-off on actual photos**: JoyVASA→FasterLivePortrait vs Ditto vs MuseTalk-on-loop — side-by-side on the game's photo style; identity preservation and sync quality judged by human review (main-agent first-hand law applies to game-facing evaluation).
3. **Real-time benchmark on the target GPU**: measure MuseTalk / FasterLivePortrait / Ditto concurrency (sessions per L4/4090) — the $0.01/min figure rests on assumed concurrency [OPEN].
4. **Legal read**: InsightFace (LivePortrait dep), LatentSync weight/detector caveats, IndexTTS scale gate, Hallo2 S-Lab component isolation — before any commercial build.
5. **Live-browser validation** (main agent only, per standing law): demo latency of HeyGen LiveAvatar / Tavus / D-ID / Anam; acceptable-use policies re: adult content; D-ID per-minute streaming price; Hedra real-time status (conflicting reports).
6. **Voice bake-off**: MOS/AB test Kokoro vs CosyVoice 2 for the cast voices; confirm CosyVoice 3's actual license on its HF card before considering it.

---

## 8. Sources

Thread-level sources are listed in `02a`–`02d`. Key repos (all opened 2026-10-03): ByteDance-Seed/Depth-Anything-3 · DepthAnything/Depth-Anything-V2 · microsoft/MoGe · prs-eth/Marigold · advimman/lama · KwaiVGI/LivePortrait · warmshao/FasterLivePortrait · jdh-algo/JoyVASA · TMElyralab/MuseTalk · antgroup/ditto-talkinghead · Soul-AILab/SoulX-FlashHead · bytedance/LatentSync · fudan-generative-vision/hallo(3) · jixiaozhong/Sonic · hexgrad/kokoro · FunAudioLLM/CosyVoice · SWivid/F5-TTS · ZHKKKe/MODNet · ZhengPeng7/BiRefNet · facebookresearch/sam2 · lipku/LiveTalking · livekit/agents · pipecat-ai/pipecat. Papers: Shih et al. 2020 (3D photography), arXiv:2407.03168 (LivePortrait), 2411.09209 (JoyVASA), 2410.10122 (MuseTalk), 2411.19509 (Ditto), 2602.07449 (SoulX-FlashHead), 2406.04343 (Flash3D), 2511.10647 (DA3). API pages opened 2026-10-03: liveavatar.com, tavus.io/pricing, anam.ai/pricing, docs.d-id.com, hedra.com (pricing crawl).
