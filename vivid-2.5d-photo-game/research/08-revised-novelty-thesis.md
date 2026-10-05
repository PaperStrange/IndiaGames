# Revised Novelty Thesis — After the Domain Expansion
**Date:** 2026-10-03 · **Document:** `08-revised-novelty-thesis.md`
**Trigger:** Sakura's challenge — "Nobody ships? Expand the game research domain plz."
**Method:** three expansion tracks (05a Live2D portrait games · 05b AI-NPC conversation games · 05c parallax + fourth-wall games) + firsthand multi-platform spot-checks (07) + Hogwarts concept reference (06).

## Verdict: the challenge was right — the original claim was too broad
The original thesis ("no shipped product combines free-text conversation + moving portrait + touch-the-frame") collapsed distinct pairs into one claim. The honest revision: **each pair ships; the triple doesn't.**

### What actually ships (verified)
1. **Photo-depth alone — shipped at massive scale.** Facebook 3D Photos (still live in 2026, "Make 3D" flow documented [REAL]); PopPic (App Store 4.8★, but original domain parked and site footer © 2021 — maintenance questionable [REAL/SECONDARY]); LucidPix (stale). No conversation attached to any of them. FB is the proof that depth-parallax is mass-consumer-accepted — and the caution that depth alone doesn't retain.
2. **Conversational portraits — shipped, but canned or not photo-based.**
   - Live2D games (Azur Lane, Blue Archive, NIKKE, Uma Musume, Mr Love, Tears of Themis, Light and Night): rich tap/affinity/voice-line interaction, zero free-text conversation — all dialogue canned. Monetization sits on the portrait layer (skins, oaths, card gacha), never the chat. Xingye's per-image card gacha (2–100 yuan/draw) is the extreme: users pay per *picture* of their companion.
   - **Whispers from the Star** (Anuttacon, Steam Aug 2025, Very Positive 1.6k, FREE DEMO): real-time AI voice/text/video calls with a 3D astronaut — the closest shipped analog to our concept. Its two wounds are our requirements: conversation needs a *game framework* around it, and compliance must be built in from day one.
   - HeyGen LiveAvatar: real-time talking photo, verified hands-on by the main agent (seconds of latency, zero signup).
3. **Free-text NPC conversation — shipped, but never with a living portrait.**
   - Event[0] (2016, 2M+ procedural lines, mood system — pre-LLM proof), Façade (2005, the architectural ancestor), Suck Up! (Proxima, released **Oct 1, 2025** — correction: desk research said 2023 — HK$108, voice-or-text persuasion with phrase challenges), Mantella Skyrim mod (~30k downloads, STT→LLM→TTS with memory via summarization), Vaudeville/Inworld detective games.
   - Failure ledger: AI Dungeon (GPT-3 costs forced the $10 tier; retired from Steam Mar 2024), Where Winds Meet (no adjudication layer — players jailbroke quests via narration injection), Project Milo ("never a game," killed by Kinect cost-reduction), xAI companions (retired ~Aug 2026, cause [OPEN]).
4. **"Being perceived" — shipped extensively, and it beats visual depth.**
   - DDLC's *static 2D sprite* terrified millions; OneShot (named OS username, talks to *you*); Undertale (memory across sessions); P.T. (the unseen watcher attached to your back); Layers of Fear (paintings change when unobserved); IMSCARED (acts on your desktop).
   - Evidence for the self-QA thesis: **perceived attention beats visual depth.** The cheapest vividness is input-side (the portrait notices you), not render-side.

### The remaining gap (narrower, still unclaimed [OPEN])
No shipped product combines **a still photo** given **depth-parallax** that **holds free conversation** inside a **game framework**. Pairs exist everywhere; the triple doesn't.

### What this changes about the novelty
- The **2.5D layer is the least defended** part of the novelty — Facebook shipped it to hundreds of millions. It cannot be the moat; at best it's the signature presentation.
- The **most defended** part is photo-identity + free conversation + game framework + memory. Nobody has put a *real photo's* identity (not an illustrated character, not a 3D avatar) into an open-conversation game loop.
- The Hogwarts reference (06) now reads as the design spec, not just inspiration: portraits have *jobs* (guard/advisor/messenger), *power-scaled minds* (dialogue depth tiered by character importance — canon justifies the LLM cost architecture), *pretend sleep* (idle awareness), and the *photo→portrait ladder* (reactive photo earns full portrait-hood as progression).

## Design laws added by the expansion (banked)
1. **Tap-to-react + affinity** (Live2D): the portrait's "levels of aliveness" as the progression system; Memorial Lobby / oath skins prove the living portrait is the reward players pay for.
2. **The portrait reaches out** (Tears of Themis incoming calls [SECONDARY]): proactive behavior is the aliveness multiplier — don't build only reactive taps.
3. **Authored persona + LLM surface** (Façade → Ubisoft NEO NPC): human-written personality/backstory, generative AI opens the interaction. Never bolt an LLM onto a face.
4. **Conversation needs a purpose** (Suck Up!'s persuasion, Vaudeville's interrogation, Event[0]'s relationship management): free speech with an objective beats open chat.
5. **Adjudication layer separate from dialogue** (Where Winds Meet): never let LLM output become game fact.
6. **Memory is the moat** (Mantella, Undertale): identity persistence across sessions via summarization.
7. **Cost is a design constraint** (AI Dungeon, Suck Up! tokens): decide the LLM tier and meter model before launch.
8. **A demo is not a game** (Project Milo): the game loop must exist independently of the talking-face wow.
9. **JP terminology warning**: 2.5D (2.5次元) means stage musicals in Japan — use depth-parallax language (奥行きパララックス) with Japanese partners. Design lesson from the genre: dimensionalization must preserve fidelity to the 2D original — identity drift breaks the contract.
10. **Monetize the living layer, not the chat** (Xingye, NIKKE, Azur Lane): skins, commitment mechanics, portrait cards. The base talk loop is free and habitual.

## Corrections applied to earlier files
- Suck Up!: release Oct 1, 2025 (not 2023), HK$108, Proxima, no demo.
- Tears of Themis / Light and Night "video/voice call" claims: NOT confirmed in CN store copy — remain [SECONDARY], downgraded from implied-verified.
- PopPic: original domain parked; maintenance questionable.

## Open items carried to tonight
- Whispers from the Star free demo: the single highest-value firsthand play available (needs Steam + mic + Anuttacon account — a staged ask).
- xAI retirement cause: still [OPEN] — the biggest unknown in the research.
- Form factor (mobile/web vs framed installation), conversation engine tier (live LLM vs scripted vs hybrid), and cast sourcing — tonight's decisions, now informed by the Hogwarts rules (06) and the revised gap above.
