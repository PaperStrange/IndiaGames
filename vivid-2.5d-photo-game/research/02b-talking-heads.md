# Talking-Head / Portrait Animation — Technology Research
**Date:** 2026-10-03 | **Thread:** Audio-driven talking-head / portrait animation for the vivid 2.5D photo interaction game
**Scope:** TECHNOLOGY research only (papers, official repos, verified tech blogs, GitHub). No product-design frameworks or business articles.

**Evidence discipline:** every substantive claim is labeled — [REAL] (I verified it myself, e.g. read the LICENSE), [SECONDARY] (a paper/blog claims it — source cited), [OPEN] (unvalidated gap).

**Bottom line up front:** The realistic commercial stack for a Hogwarts-portrait-style game is a **two-piece pipeline**: LivePortrait/FasterLivePortrait-class motion (MIT, real-time, one-shot) driven by an audio→motion front-end (JoyVASA, MIT), **or** MuseTalk-class lip-sync (MIT, 30fps+) layered on a pre-rendered idle loop. Newer 2026 diffusion models (SoulX-FlashHead, Ditto) hit true real-time streaming with better quality but heavier GPUs and younger codebases. Everything from Alibaba (EMO) and ByteDance (OmniHuman) of note is unreleased demo-only; Sonic is explicitly non-commercial; Wav2Lip is research-only.

---

## 1. One-shot motion / animation (video-driven reenactment)

These animate a still photo from a **driving video**, not audio. For the game they're the "portrait comes alive" parallax/motion layer — a companion piece to an audio model, not a substitute for speech.

### FOMM — First Order Motion Model (NeurIPS 2019)
- **Maturity:** Released; official repo https://github.com/AliaksandrSiarohin/first-order-model ; the classic keypoint-warping baseline, still widely forked [SECONDARY].
- **Quality:** Low-mid by 2026 standards — 256px outputs, warping artifacts, identity drift on large poses [SECONDARY, consensus in later papers' related work].
- **Real-time:** CPU-marginal, fast on GPU at 256px but not a streaming design; no official FPS claim — treat as batch-only [OPEN for current numbers].
- **One-shot:** Yes (source image + driving video, no per-identity training) [SECONDARY].
- **License: MIT License — [REAL]** (read `LICENSE.md` in the repo; copyright 2019–2023 Aliaksandr Siarohin).
- **Commercial verdict:** ✅ commercial-friendly (code). Baseline tech, superseded by LivePortrait.

### DaGAN / DaGAN++ (CVPR 2022 / TPAMI 2023)
- **Maturity:** Released; official https://github.com/harlanhong/CVPR2022-DaGAN [SECONDARY via official repo links in DeepAI/CatalyzeX listings].
- **Quality:** Mid — adds self-supervised depth for better geometry than FOMM [SECONDARY, paper].
- **Real-time:** Not a streaming design; no official FPS claim [OPEN].
- **One-shot:** Yes (driving video; audio-conditioned variant exists in DaGAN++ — exact scope [OPEN]) [SECONDARY].
- **License: NO license file in repo — [REAL]**. README invites collaboration "research purpose or commercial purpose" via email to the author — [REAL] (read in README). I.e. **all rights reserved by default; commercial use needs author contact** → ⚠️ research-only in practice.
- **Commercial verdict:** ⚠️ needs written author permission.

### TPSMM — Thin-Plate Spline Motion Model (2022)
- **Maturity:** Released; the commonly cited implementation is https://github.com/yoyo-nb/Thin-Plate-Spline-Motion-Model [SECONDARY via awesome-list curation].
- **Quality:** Mid — more flexible warps than FOMM, less studied at scale [SECONDARY].
- **Real-time:** No official claim [OPEN].
- **One-shot:** Yes (driving video) [SECONDARY].
- **License: MIT License — [REAL]** (read `LICENSE` in the yoyo-nb repo; note this is the community-maintained fork, not necessarily the authors' original).
- **Commercial verdict:** ✅ code is MIT; but it is a motion model, not an audio model.

---

## 2. Audio-driven GAN / classic era

### SadTalker (CVPR 2023, Xu et al.)
- **Maturity:** Released and actively used; https://github.com/OpenTalker/SadTalker ; v0.0.2 checkpoints; Discord integration; SD-webui extension [SECONDARY, repo README].
- **Quality:** Moderate — 3DMM-coefficient motion + lip-sync; 256/512px; stiff by 2026 diffusion standards [SECONDARY].
- **Real-time:** ❌ Not real-time. One community report: Mac CPU throughput ≈ 50× slower than real time (3.4 s clip ≈ 3 min) [SECONDARY, https://github.com/paul30041004/openmontage ]. GPU is faster but still offline batch [OPEN for exact GPU FPS].
- **One-shot:** Yes (photo + audio, no per-identity training) [SECONDARY].
- **License: Apache 2.0 — [REAL]** (read `LICENSE`; copyright Tencent. README notes the license was updated to Apache 2.0 and the non-commercial restriction was removed [SECONDARY, README]).
- **Commercial verdict:** ✅ code is Apache-2.0 now — commercial-friendly, though note the *checkpoints* it downloads (GFPGAN/facexlib weights) carry their own licenses — verify before shipping [OPEN].

### Wav2Lip (ACM MM 2020) — lip-sync only
- **Maturity:** Released; https://github.com/Rudrabha/Wav2Lip ; the 2020 reference lip-syncer, still embedded in many pipelines [SECONDARY].
- **Quality:** Dated — 96×96 mouth patch, blurry mouth by 2026 standards [SECONDARY, 2026 community comparison].
- **Real-time:** ~1× real-time; CPU-capable via community ONNX ports [SECONDARY, 2026 comparison].
- **One-shot:** Yes (any identity, any voice) [SECONDARY].
- **License: NO license file — [REAL]**. README states: *"This repository can only be used for personal/research/non-commercial purposes"* because models were trained on LRS2; commercial requests must contact the authors (an HD commercial-usable model exists via them) [SECONDARY, quoted verbatim in multiple mirrors, e.g. https://github.com/phuthiendao/wav2lip-retrain ]. No OSI license → ❌ research-only.
- **Commercial verdict:** ❌ not commercial-usable without author authorization (Sync Labs contact).

### PC-AVS — Pose-Controllable Audio-Visual System (CVPR 2021, Zhou et al.)
- **Maturity:** Released; https://github.com/Hangz-nju-cuhk/Talking-Face_PC-AVS [SECONDARY].
- **Quality:** Mid — disentangles speech/pose/identity; head pose comes from a **pose source video**, not from audio [SECONDARY, project page].
- **Real-time:** No official claim [OPEN].
- **One-shot:** Partially — audio drives lips, but head motion requires a separate pose-driving video at inference [SECONDARY].
- **License: Creative Commons Attribution 4.0 International (CC BY 4.0) — [REAL]** (read `LICENSE`; attribution required, commercial use permitted under CC BY 4.0 terms).
- **Commercial verdict:** ✅ code license permits commercial use (with attribution); architecturally awkward for the game (needs pose source video).

### Audio2Head (IJCAI 2021)
- **Maturity:** Released; https://github.com/wangsuzhen/Audio2Head [SECONDARY via awesome-list curation].
- **Quality:** Mid — one of the first with natural head motion from audio alone [SECONDARY, paper].
- **Real-time:** No official claim [OPEN].
- **One-shot:** Yes [SECONDARY].
- **License: NO license file in repo — [REAL]** → all rights reserved by default → ⚠️ research-only unless terms clarified.
- **Commercial verdict:** ⚠️ no license → treat as research-only.

### MakeItTalk (SIGGRAPH Asia 2020, Zhou et al.)
- **Maturity:** Paper + demos; **no official GitHub repo exists** — only community forks (e.g. https://github.com/thecodeeagle/makeittalk ) [SECONDARY, search found forks only; original code was hosted on the author's UMass page].
- **Quality:** Moderate; notable for stylized/cartoon faces, not just photoreal [SECONDARY, paper].
- **Real-time:** No [OPEN].
- **One-shot:** Yes (single image + audio, unseen identities) [SECONDARY, paper].
- **License:** [OPEN] — no official repo; the fork's `LICENSE.md` exists but GitHub shows "NOASSERTION" [SECONDARY]. Treat as research-only.
- **Commercial verdict:** ⚠️ no verifiable license.

---

## 3. Diffusion-based (the 2024–2026 quality frontier)

### EMO — Emote Portrait Alive (Alibaba, ECCV 2024)
- **Maturity:** **Demo-only.** The official repo https://github.com/HumanAIGC/emo exists but is a **placeholder** — paper link + project page + citation only, **no code, no weights** — [REAL] (read the README myself). Project page: https://humanaigc.github.io/emote-portrait-alive/ .
- **Quality:** High/expressive (singing, varied head poses, any duration) [SECONDARY, paper]. Direct audio→video diffusion, no landmarks.
- **Real-time:** ❌ No real-time claim [OPEN].
- **One-shot:** Yes [SECONDARY].
- **License:** N/A — nothing released.
- **Commercial verdict:** ❌ unusable (no code).

### Hallo / Hallo2 / Hallo3 (Fudan Generative Vision)
- **Maturity:** All three released with code + weights.
  - Hallo: https://github.com/fudan-generative-vision/hallo (released 2024) [SECONDARY].
  - Hallo2 (ICLR 2025, 4K + hour-long generation): https://github.com/fudan-generative-vision/hallo2 [SECONDARY].
  - Hallo3 (CVPR 2025, video diffusion transformer): https://github.com/fudan-generative-vision/hallo3 [SECONDARY].
- **Quality:** High — among the best open diffusion talking heads; Hallo2 does 4K and tens-of-minutes; Hallo3 pushes dynamic backgrounds [SECONDARY, papers].
- **Real-time:** ❌ **None are real-time.** Reported throughputs: Hallo ~1.2 FPS, Hallo2 ~1.2 FPS, Hallo3 ~0.16 FPS [SECONDARY, CVPR-2026 comparison table in "Real-Time Generation of Streamable Talking Portrait Video" paper, http://openaccess.thecvf.com/content/CVPR2026/papers/Xu_Real-Time_Generation_of_Streamable_Talking_Portrait_Video_with_Reference-Guided_Deep_CVPR_2026_paper.pdf ].
- **One-shot:** Yes [SECONDARY].
- **License: Hallo = MIT [REAL]** (read `LICENSE`); **Hallo2 = MIT [SECONDARY]** (GitHub repo metadata; I did not read the file); **Hallo3 = MIT [REAL]** (read `LICENSE`). ⚠️ Caveat: Hallo2's 4K super-resolution step is CodeFormer-derived and its README requires complying with the **S-Lab License 1.0** (non-commercial research license) for that component [SECONDARY, Hallo2 README] — the MIT code license does not cover that pipeline piece.
- **Commercial verdict:** ✅ MIT code; ⚠️ avoid/isolate the S-Lab HR component for commercial builds; too slow for real-time interaction regardless.

### Loopy (ByteDance + ZJU, ICLR 2025 Oral)
- **Maturity:** **Paper-only.** No official GitHub repo found — only the anonymous project page (https://loopyavatar.github.io/ ) [SECONDARY, searches return paper + project page, no code].
- **Quality:** High — audio-only conditioning with long-term motion dependency, SOTA at publication [SECONDARY, paper arXiv:2409.02634].
- **Real-time:** Not claimed [OPEN].
- **One-shot:** Yes [SECONDARY].
- **License:** [OPEN] — nothing released.
- **Commercial verdict:** ❌ unusable (no code).

### AniPortrait (Tencent Games Zhiji, 2024)
- **Maturity:** Released; official https://github.com/Zejun-Yang/AniPortrait ; audio→landmark→diffusion two-stage; Gradio demo; `-acc` frame-interp flag for faster inference [SECONDARY, repo README].
- **Quality:** High at release (photoreal, pose-diverse) [SECONDARY, paper arXiv:2403.17694].
- **Real-time:** ❌ Not real-time [OPEN for exact numbers].
- **One-shot:** Yes [SECONDARY].
- **License: Apache 2.0 — [REAL]** (read the `LICENSE` file: "Apache License, Version 2.0, January 2004"). An earlier pass misreported "no license file" (a failed sparse-checkout); corrected by direct file read.
- **Commercial verdict:** ✅ Apache-2.0 — commercial-friendly (two-stage diffusion, offline batch only).

### Sonic (CVPR 2025, Ji et al. — Tencent-affiliated author)
- **Maturity:** Released; official https://github.com/jixiaozhong/Sonic ; SVD-based; online demos live [SECONDARY].
- **Quality:** Very high — best lip-sync accuracy in the 2026 comparison (Sync-C 5.17 on HDTF, top of the table) [SECONDARY, SoulX technical report table].
- **Real-time:** ❌ Slow — 1.7 FPS on the CVPR-2026 comparison [SECONDARY]; ~32 GB VRAM claimed [SECONDARY, 2026 community comparison].
- **One-shot:** Yes (single still image → talking head) [SECONDARY].
- **License: CC BY-NC-SA 4.0 — [REAL]** (read `LICENSE`). README explicitly: *"our license is non-commercial. If commercialization is required, please use Tencent Cloud Video Creation Large Model"* [SECONDARY, README]. ❌ research-only.
- **Commercial verdict:** ❌ non-commercial by license; commercial path = Tencent Cloud API (paid).

### PortraitTalk (2024)
- **Maturity:** **Paper-only.** Placeholder repo https://github.com/armtp/portraittalk states *"The official implementation of PortraitTalk will be publicly available upon paper acceptance"* [SECONDARY, repo README]. No code as of 2026-10-03.
- **Commercial verdict:** ❌ unusable (no code).

### Real3D-Portrait (ICLR 2024 Spotlight, Ye et al.)
- **Maturity:** Released; official https://github.com/yerfor/Real3DPortrait ; NeRF-based one-shot; CLI + Gradio + Colab [SECONDARY, repo README].
- **Quality:** High "video reality" via tri-plane/NeRF rendering [SECONDARY, paper].
- **Real-time:** Not claimed as real-time [OPEN].
- **One-shot:** Yes (audio-driven or video-driven) [SECONDARY].
- **License: MIT — [REAL]** (read the `LICENSE` file in the repo).
- **Commercial verdict:** ✅ likely commercial-friendly (MIT per metadata), verify LICENSE file text before shipping [OPEN].

---

## 4. VASA-1 (Microsoft Research Asia, 2024)

- **Maturity:** **Research demonstration only. Microsoft explicitly stated it has "no plans to release an online demo, API, product, additional implementation details, or any related offerings"** due to misuse/deepfake concerns [SECONDARY, https://www.theregister.com/software/2024/04/20/microsoft-unveils-deepfake-tech-thats-too-good-to-release/829531 and Microsoft's research announcement]. No code, no weights, no API as of 2026-10-03.
- **Quality:** SOTA at release — full-face latent dynamics, gaze/distance/emotion control [SECONDARY, paper arXiv:2404.10667].
- **Real-time:** 512×512 at 45 FPS offline batch, up to 40 FPS online streaming with 170 ms preceding latency, on a single RTX 4090 [SECONDARY, Microsoft's reported figures].
- **One-shot:** Yes [SECONDARY].
- **License:** N/A — unreleased.
- **Commercial verdict:** ❌ unusable; the benchmark everything else is compared against, not a building block.

---

## 5. Real-time / streaming variants (the game's shortlist)

### LivePortrait (Kuaishou/KwaiVGI, 2024)
- **Maturity:** Released; https://github.com/KwaiVGI/LivePortrait ; ~14.4k stars; the standard one-shot motion model [SECONDARY].
- **Quality:** High for a real-time model; stitching + retargeting controls [SECONDARY, paper arXiv:2407.03168].
- **Real-time:** ✅ ~12.8 ms/frame on RTX 4090 (≈78 FPS) [SECONDARY, community readme]. Note: it is **video-driven** (needs a driving signal); audio-driven motion needs JoyVASA or similar on top.
- **One-shot:** Yes [SECONDARY].
- **License: MIT — [REAL]** (read `LICENSE`; copyright 2024 Kuaishou Visual Generation and Interaction Center). ⚠️ Third-party note: LivePortrait depends on InsightFace models, whose license is non-commercial — one downstream audit flags swapping the face detector before commercial use [SECONDARY, https://github.com/itsjwill/vanta/blob/HEAD/ENHANCEMENTS.md ]. Verify the detector license [OPEN].
- **Commercial verdict:** ✅ code MIT; audit the face-detection dependency.

### FasterLivePortrait (warmshao, community, 2024–)
- **Maturity:** Released; https://github.com/warmshao/FasterLivePortrait ; ONNX/TensorRT port of LivePortrait + JoyVASA audio-driving integration; Windows one-click package; API mode [SECONDARY, repo README].
- **Quality:** Same as LivePortrait (it's a port) [SECONDARY].
- **Real-time:** ✅ **30+ FPS on RTX 3090 via TensorRT, including pre/post-processing** [SECONDARY, README]. ONNX-runtime path ~20 FPS on RTX 4090 (inference only) per an issue report [SECONDARY, https://github.com/warmshao/fasterliveportrait/issues/100 ].
- **One-shot:** Yes [SECONDARY].
- **License:** README states **code is MIT**, models carry their own licenses [SECONDARY, README]; the repo's `LICENSE` file reads "MIT License" [REAL, verified from the checked-out file]. GitHub metadata shows "NOASSERTION" (file not machine-readable) [SECONDARY].
- **Commercial verdict:** ✅ likely commercial-friendly; verify the LICENSE file text and model-weight licenses.

### JoyVASA (JD Health algo team / JDH, 2024)
- **Maturity:** Released; https://github.com/jdh-algo/JoyVASA ; diffusion-based **audio→motion** generator that plugs into LivePortrait's renderer — this is the missing audio-driven piece for LivePortrait [SECONDARY, repo README].
- **Quality:** Good motion from audio; identity-independent [SECONDARY, paper arXiv:2411.09209].
- **Real-time:** Near-real-time aim; exact FPS [OPEN].
- **One-shot:** Yes [SECONDARY].
- **License: MIT — [REAL]** (read `LICENSE`).
- **Commercial verdict:** ✅ MIT. **Strong candidate: JoyVASA (audio→motion) + LivePortrait/FasterLivePortrait (motion→pixels) = real-time audio-driven portrait, all MIT.**

### MuseTalk (Tencent Music Lyra Lab, 2024; v1.5 current)
- **Maturity:** Released; https://github.com/TMElyralab/MuseTalk ; training + inference + weights all public; v1.5 adds perceptual/GAN/sync losses [SECONDARY, repo README].
- **Quality:** High for lip-sync (latent-space inpainting, 256×256 face region); slight jitter noted [SECONDARY, paper + 2026 comparison].
- **Real-time:** ✅ **30 FPS+ at 256×256 on a Tesla V100**, "negligible starting latency" [SECONDARY, paper arXiv:2410.10122]. Independent streaming-server reports: 42 FPS (RTX 3080Ti) / 72 FPS (RTX 4090) [SECONDARY, LiveTalking README]. **Lip-sync only** — head motion must come from the base video/loop.
- **One-shot:** Yes (any unseen face) [SECONDARY].
- **License: MIT — [REAL]** (read `LICENSE`; copyright 2024 Tencent Music Entertainment Group).
- **Commercial verdict:** ✅ MIT. **Strong candidate for the "talking" layer on top of a looping portrait video.**

### Ditto (Ant Group, ACM MM 2025)
- **Maturity:** Released; https://github.com/antgroup/ditto-talkinghead ; motion-space diffusion with a dedicated streaming pipeline (`stream_pipeline_online.py`); ships ONNX + TensorRT [SECONDARY, repo + awesome-realtime-video-generation].
- **Quality:** High — controllable (fine-grained motion semantics), low first-frame delay [SECONDARY, paper arXiv:2411.19509].
- **Real-time:** ✅ Streaming-native; 45.04 FPS reported on HDTF [SECONDARY, SoulX comparison table]; RTX 4090/3090-class hardware [SECONDARY].
- **One-shot:** Yes [SECONDARY].
- **License: Apache 2.0 — [REAL]** (read `LICENSE`).
- **Commercial verdict:** ✅ Apache-2.0. **Strong candidate: the most "production-latency SDK"-shaped of the open options.**

### SoulX-FlashHead (Soul-AILab, 2026)
- **Maturity:** Released 2026-02-12; https://github.com/Soul-AILab/SoulX-FlashHead ; inference code + distilled Lite/Pro weights on HuggingFace; 1.3B DiT; "oracle-guided infinite streaming" [SECONDARY, repo highlights].
- **Quality:** Best reported sync among streaming models (Sync-C 6.04 Pro) with whole-head generation + emotion [SECONDARY, technical report arXiv:2602.07449].
- **Real-time:** ✅ **Lite: 96 FPS, or 3× concurrent real-time (25+ FPS) streams on one RTX 4090. Pro: 10.8 FPS on one RTX 4090, real-time (25+ FPS) on 2× RTX 5090** [SECONDARY, repo highlights]. Linux/CUDA only.
- **One-shot:** Yes (source image + driving audio) [SECONDARY].
- **License: Apache 2.0 — [REAL]** (read `LICENSE`).
- **Commercial verdict:** ✅ Apache-2.0. **Top 2026 pick for quality+realtime, but the codebase is 8 months old and Pro needs 2× 5090.**

### EchoMimicV3 (Ant Group, AAAI 2026)
- **Maturity:** Released; https://github.com/antgroup/echomimic_v3 ; 1.3B unified multi-modal human animation; Flash (8-step) and preview modes; inference code + weights [SECONDARY, repo README].
- **Quality:** High (whole head + body capable) [SECONDARY].
- **Real-time:** Near — Flash mode 8-step generation; ~12 GB VRAM claimed; not benchmarked at 25 FPS in sources I found [SECONDARY, 2026 community comparison]. Treat exact FPS as [OPEN].
- **One-shot:** Yes [SECONDARY].
- **License: Apache 2.0 — [SECONDARY]** (GitHub repo metadata + README license section; I did not read the file text itself).
- **Commercial verdict:** ✅ likely commercial-friendly (Apache-2.0 per author); verify LICENSE.txt text before shipping [OPEN].

### LiveTalking (lipku, 2023–; streaming server, not a model)
- **Maturity:** Released; https://github.com/lipku/LiveTalking ; 9.7k stars; production streaming engine (WebRTC/RTMP/virtual-cam) wrapping ernerf/musetalk/wav2lip/Ultralight models; TTS + LLM + interruption support [SECONDARY, repo README].
- **Quality:** Depends on the wrapped model (musetalk recommended) [SECONDARY].
- **Real-time:** ✅ Reported: wav2lip256 60 FPS (RTX 3060) / 120 FPS (RTX 3080Ti); musetalk 42 FPS (RTX 3080Ti) / 45 FPS (RTX 3090) / 72 FPS (RTX 4090) [SECONDARY, README performance table].
- **License: Apache 2.0 — [REAL]** (read the `LICENSE` file: "Apache License, Version 2.0, January 2004"). ⚠️ Two caveats: (1) the project **sells a separate commercial version** — the Apache-2.0 open version exists alongside it [SECONDARY, README §7]; (2) its declaration asks that videos published to Bilibili/WeChat Channels/Douyin carry the LiveTalking watermark/credit [SECONDARY, README §8] — a non-license social requirement, but a real constraint on public-facing use.
- **Commercial verdict:** ✅ Apache-2.0 open edition usable; budget for the paid edition if you need its acceleration; plan watermark handling for public video.

### InfiniteTalk (MeiGen-AI, 2025-08)
- **Maturity:** Released; https://github.com/MeiGen-AI/InfiniteTalk ; 8k stars; Wan2.1-14B-based; unlimited-length via streaming mode; ComfyUI + Wan2GP integrations [SECONDARY, repo README]. Successors announced: LongCat-Video-Avatar (2025-12) and LongCat-Video-Avatar-1.5 (2026-05) [SECONDARY, README news].
- **Quality:** High — syncs lips + head + body + expressions, not just the mouth [SECONDARY].
- **Real-time:** ❌ **Not real-time** — 14B model, 40 diffusion steps default; streaming *mode* means long-form generation, not low latency [SECONDARY].
- **One-shot:** Yes (image-to-video or video-to-video dubbing) [SECONDARY].
- **License: Apache 2.0 — [SECONDARY]** (GitHub repo metadata; LICENSE.txt present).
- **Commercial verdict:** ✅ likely commercial-friendly; too heavy for real-time interaction.

### 2025–2026 streaming mentions (watchlist, not fully vetted)
- **LiveTalk (Tencent, announced Dec 2025):** real-time multimodal talking head, <100 ms latency on RTX 4090, "on-policy distillation + identity sinks" — **code and paper "coming soon"** [SECONDARY, awesome-realtime-video-generation]. Maturity: announced only.
- **OmniHuman-1.5 (ByteDance, 2025-08):** single image + audio → hyper-realistic full-body digital human. **No open code** — project page + hosted API only; API pricing ≈ $0.132/second via Runware [SECONDARY, https://runware.ai/docs/models/bytedance-omnihuman-1-5.md ]. Commercial path = paid API.
- **CVPR 2026 "Streamable Talking Portrait Video" (Xu et al.):** reference-guided deep-compression VAEs, 42.3 FPS, beats EchoMimic/Hallo3/Sonic on quality metrics [SECONDARY, CVPR 2026 paper]. [OPEN]: whether code is released — not verified.

---

## 6. Comparison table

| Model | Maturity | Quality | Latency / real-time? | Cost | License (verified) |
|---|---|---|---|---|---|
| FOMM (2019) | Released | Low-mid (2026) | Batch, no stream claim | Free | **MIT [REAL]** |
| DaGAN (2022) | Released | Mid | Batch, no stream claim | Free | **No license file [REAL]** — author contact needed → research-only |
| TPSMM (2022) | Released (community fork) | Mid | Batch, no stream claim | Free | **MIT [REAL]** (fork) |
| SadTalker | Released, v0.0.2 | Moderate | ❌ ~50× slower than realtime (CPU) | Free | **Apache-2.0 [REAL]** |
| Wav2Lip | Released | Dated (96px mouth) | ~1× realtime, CPU-OK | Free (non-comm.) | **No license file [REAL]**; non-commercial only → ❌ research-only |
| PC-AVS | Released | Mid | No claim | Free | **CC BY 4.0 [REAL]** |
| Audio2Head | Released | Mid | No claim | Free | **No license file [REAL]** → research-only |
| MakeItTalk | Paper + forks only | Moderate | No | Free | **[OPEN]** → research-only |
| EMO (Alibaba) | **Demo-only** | High | No claim | — | N/A (no code) [REAL] |
| Hallo (2024) | Released | High | ❌ ~1.2 FPS | Free | **MIT [REAL]** |
| Hallo2 (ICLR'25) | Released | High (4K, long) | ❌ ~1.2 FPS | Free | **MIT [SECONDARY]**; HR step = S-Lab 1.0 (non-comm.) |
| Hallo3 (CVPR'25) | Released | High | ❌ ~0.16 FPS | Free | **MIT [REAL]** |
| Loopy (ByteDance) | **Paper-only** | High | No claim | — | [OPEN] (no code) |
| AniPortrait (Tencent) | Released | High | ❌ not realtime | Free | **Apache-2.0 [REAL]** |
| Sonic (CVPR'25) | Released | Very high (best sync) | ❌ ~1.7 FPS, ~32 GB VRAM | Free (non-comm.) | **CC BY-NC-SA 4.0 [REAL]** → ❌ research-only (paid path: Tencent Cloud API) |
| PortraitTalk | **Paper-only** | — | — | — | N/A (no code) |
| Real3D-Portrait | Released | High (NeRF) | No realtime claim | Free | **MIT [REAL]** |
| VASA-1 (Microsoft) | **Demo-only** | SOTA (2024) | 40 FPS stream / 45 FPS batch (RTX 4090) | — | N/A (unreleased) |
| LivePortrait (Kuaishou) | Released | High (realtime class) | ✅ ~78 FPS (RTX 4090) | Free | **MIT [REAL]** (audit InsightFace dep) |
| FasterLivePortrait | Released | = LivePortrait | ✅ 30+ FPS (RTX 3090, TRT) | Free | **MIT (code) [REAL]**; models separate |
| JoyVASA | Released | Good motion | Near-realtime [OPEN exact FPS] | Free | **MIT [REAL]** |
| MuseTalk 1.5 (Tencent) | Released | High (lip-sync) | ✅ 30+ FPS (V100); 72 FPS (RTX 4090) | Free | **MIT [REAL]** |
| Ditto (Ant, ACM MM'25) | Released | High + controllable | ✅ streaming, ~45 FPS | Free | **Apache-2.0 [REAL]** |
| SoulX-FlashHead (2026) | Released 2026-02 | Highest (streaming) | ✅ Lite 96 FPS (RTX 4090); Pro 10.8 FPS / 25+ FPS on 2×5090 | Free | **Apache-2.0 [REAL]** |
| EchoMimicV3 (Ant, AAAI'26) | Released | High | Near-realtime (Flash 8-step); exact FPS [OPEN] | Free | **Apache-2.0 [SECONDARY]** (metadata + README) |
| LiveTalking (server) | Released | = wrapped model | ✅ 60–120 FPS (wav2lip256); 42–72 FPS (musetalk) | Free (open ed.) | **Apache-2.0 [REAL]**; paid commercial ed. exists |
| InfiniteTalk (2025) | Released | High | ❌ not realtime (14B) | Free | **Apache-2.0 [SECONDARY]** (metadata) |
| LatentSync (ByteDance, 2024) | Released | Very high (diffusion lip-sync) | ❌ ~0.1× realtime, 18–20 GB VRAM | Free | **Apache-2.0 [REAL]** |
| OmniHuman-1.5 (ByteDance) | API + demo page | Very high | Hosted API | **$0.132/s** [SECONDARY] | Proprietary API |
| LiveTalk (Tencent, 2025-12) | Announced only | — | <100 ms claimed | — | [OPEN] (code coming soon) |

---

## 7. Commercial-viability summary

**Commercial-friendly (verified or strongly evidenced):**
- **MIT [REAL]:** LivePortrait, MuseTalk, JoyVASA, Hallo, Hallo3, FOMM, TPSMM(fork), Real3D-Portrait, FasterLivePortrait (code; models separate), PC-AVS (CC BY 4.0 [REAL])
- **Apache-2.0 [REAL]:** SadTalker, Ditto, SoulX-FlashHead, LiveTalking, LatentSync, AniPortrait
- **Apache-2.0 [SECONDARY]:** EchoMimicV3, InfiniteTalk
- **MIT [SECONDARY]:** Hallo2

**Research-only / blocked:**
- **Sonic — CC BY-NC-SA 4.0 [REAL]** (explicit non-commercial; paid commercial path = Tencent Cloud API)
- **Wav2Lip — no license, README non-commercial [REAL/SECONDARY]** (commercial HD model via authors/Sync Labs)
- **DaGAN, Audio2Head — no license file [REAL]** → all rights reserved
- **EMO, VASA-1, Loopy, PortraitTalk — no code released** (demo/paper only)

**Recommended real-time stack for the game (commercial-safe):**
1. **JoyVASA (MIT) → FasterLivePortrait (MIT code)**: audio-driven full-head motion at 30+ FPS on RTX 3090-class GPU. Cheapest path to "photo talks to you" in real time.
2. **Ditto (Apache-2.0)** or **SoulX-FlashHead Lite (Apache-2.0)**: single-model streaming talking heads, 45–96 FPS on RTX 4090 — better quality, heavier GPU.
3. **MuseTalk (MIT)** on a looping idle video: cheapest lip-sync layer if head motion is pre-baked.

**[OPEN] items / follow-ups:**
- Exact GPU FPS for JoyVASA and EchoMimicV3-Flash in streaming mode.
- LivePortrait's InsightFace dependency license (flagged non-commercial by a third-party audit — verify).
- LatentSync weights license: code is Apache-2.0 [REAL], but one 2026 community source says the weights are OpenRAIL++ — conflicting [SECONDARY] claims; verify the weight license on the HF model card before shipping [OPEN].
- Hallo2's S-Lab 1.0 component isolation for commercial builds.
- EchoMimicV3: read the actual LICENSE.txt text before shipping (currently metadata/README-level).
- LiveTalk (Tencent, Dec 2025): watch for code release.
- CVPR 2026 streamable-portrait paper: check whether code is released.

**Sources:** arXiv papers (2404.10667 VASA-1, 2402.17485 EMO, 2409.02634 Loopy, 2403.17694 AniPortrait, 2410.10122 MuseTalk, 2407.03168 LivePortrait, 2411.19509 Ditto, 2602.07449 SoulX-FlashHead, 2411.09209 JoyVASA, 2412.09262 LatentSync, 2410.07718 Hallo2, 2412.07754 PortraitTalk), GitHub repos listed inline, sync.so LatentSync blog (2026-07), runware.ai OmniHuman-1.5 docs, CVPR 2026 open-access paper table.
