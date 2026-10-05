# Live2D & Animated-Portrait Games — Expanded Research
**Date:** 2026-10-03 · **Document:** `05a-live2d-portrait-games.md`
**Scope:** Games where character portraits are animated and interactive — JP/CN/KR mobile + PC. Covers major Live2D/E-mote titles, VTuber-adjacent games, Chinese AI companion/romance apps, and monetization of the portrait layer.
**Evidence labels:** [REAL] = verified on an official page/store listing this session; [SECONDARY] = press/wiki/community-reported; [OPEN] = unvalidated. No invented titles — every title below was verified to exist via search.
**Companion files:** `01-similar-games.md` · `02-tech-stack.md` · `03-materials-needed.md` · `04-organized-findings-and-self-qa.md`

---

## 0. Technology grounding: what "animated portrait" means in this market

- **Live2D** is a proprietary 2D animation library by Japan's Live2D Ltd. 2D textures are divided into layers, tweened and warped to allow **2.5D motion**; models load via SDK, authored in Live2D Cubism. Used in visual novels (Nekopara) and mobile gacha games (Azur Lane, Hatsune Miku: Colorful Stage). Also powers VTuber face-tracking via FaceRig/VTube Studio [SECONDARY] (Wikipedia).
- The aliveness recipe is standardized: **breath** (slow sine sway on head/body angles), **blink** (~every 4 s, eased close/slower open, occasional double blinks), **saccades** (gaze jumps, head follows 100–200 ms later), and **physics** (Verlet pendulum chains driving hair/skirt sway from head/body motion) [SECONDARY] (developer research notes on Cubism's reference implementation).
- **E-mote** (by M2, emote2.mtwo.co.jp) is the other major system: animates a character from a layered **.psd file** into 2D/3D-style animation, with jiggle physics; widely used in otome/visual-novel titles [SECONDARY] (UtaForum community documentation).
- Key implication: **the "2.5D portrait" is already a solved, commoditized presentation layer** in this market — every title below ships it. Our differentiator cannot be the animation tech alone.

---

## 1. Azur Lane (Manjuu / Yostar — iOS/Android)

- **Interaction model:** Set any shipgirl as your **Secretary** — she lives on the home screen. Tapping her triggers voice lines; tapping specific areas triggers **"Special Touch" lines** (character-specific reactions). On Live2D (L2D) skins, touching changes her **face, pose, and spoken line** depending on the touched zone; in idle, she talks and moves roughly every 30 seconds and announces missions [SECONDARY] (fan guides; player-recorded interaction videos).
- **Affinity system:** Affection rises through battle use and secretary assignment (0.0625/battle, 0.125 if MVP). At 100 affection + a **Promise Ring (600 gems, ~$9.99 tier)** you can **Oath (marry)** her: affection cap rises to 200, stat bonuses, renamable, unique border, glowing dock portrait [SECONDARY] (wiki/community guides).
- **Monetization of the portrait layer:** L2D skins sold in Akashi's shop (gem prices vary per skin; the shop UI marks which skins include Live2D or change the home-screen background). **Oath/wedding skins cannot be bought directly — they unlock only through the pledge system** after buying the ring [SECONDARY]. Players openly save gems specifically for L2D skins ("I'm saving my gems for when Yorktown I gets an L2D skin").
- **What makes it feel alive:** the portrait *notices time passing* — idle lines every 30 s, mission reminders, affinity-gated dialogue that changes as the relationship deepens.
- **Relevance:** The complete template for tap-reactive portrait + affinity-gated intimacy + commitment monetization; L2D touch zones are the direct ancestor of "touch the portrait" interaction.

## 2. NIKKE: Goddess of Victory (Shift Up — iOS/Android/PC)

- **Interaction model:** **VIEW MODE / lobby** presents characters in Live2D — full animated portraits you can inspect outside combat. **Bond stories** raise goodwill and unlock personal episodes [SECONDARY] (beta coverage; community).
- **Monetization of the portrait layer:** **Costume gacha** — e.g., a documented costume banner at ~$1.67/draw with a $60 worst-case guarantee; community reports also cite direct-purchase costumes around $50 and complain both paths feel exploitative [SECONDARY] (nikke.gg analysis; player forums). Base character gacha 10-pulls run ~$43–45, roughly **2× comparable anime gacha games** [SECONDARY] (Superpixel). Costumes change the lobby Live2D appearance — the portrait is what you're paying to redress.
- **What makes it feel alive:** cinematic Live2D quality (Kim Hyung-tae art direction) + bond stories that recontextualize the lobby portrait.
- **Relevance:** Proves players pay premium prices specifically for *how the portrait looks and moves* in the lobby — the portrait layer is the highest-ARPPU surface.

## 3. Blue Archive (Nexon Games — iOS/Android)

- **Interaction model:** Students visit the **Cafe**; tapping them = **headpat, 15 affection points per tap** (check-in every 3 hours). Gifts (with per-student preferences: Normal 20 → Beloved 80/240 pts) and Schedule selections also raise affection [SECONDARY] (Blue Archive Wiki). Students message you via **MomoTalk** (in-game phone UI); reaching affection thresholds unlocks **Relationship Stories**.
- **The portrait payoff — Memorial Lobby:** a **Live2D model of the student, posed in a scene from her bond story**, settable as the main-menu home screen (up to 10 on rotation, with intro-playback settings). Unlock requires recruiting her + raising affection [SECONDARY] (wiki FAQ).
- **What makes it feel alive:** the headpat is tactile and habitual (every 3 hours); the Memorial Lobby turns the *reward* for affection into a living portrait on your home screen — the game is always "with" you.
- **Relevance:** The cleanest loop in the market: **tap → affection → living portrait as the persistent reward**. Our talking portrait could *be* the Memorial Lobby — the thing affection unlocks.

## 4. Uma Musume Pretty Derby (Cygames — iOS/Android/PC)

- **Note on tech:** home-screen characters are **full 3D models, not Live2D** — included because the interaction design is the reference, not the renderer [SECONDARY] (official game description: "high quality 3D").
- **Interaction model:** tap the 3D horse girl on the home screen → contextual voice lines; chibi headpat interactions; training-bond events; **Winning Live** concerts as the emotional payoff [SECONDARY] (official listings; community clips).
- **Relevance:** Shows the interaction vocabulary (tap → voiced reaction → bond events) works independent of 2D vs 3D — it's the *responsiveness*, not the renderer, that players bond with.

## 5. Ensemble Stars!! (Happy Elements — iOS/Android)

- **Interaction model:** Home screen toggles between **3D idol mode and CG mode**; the **Office** holds chibi idols you dress (outfit changes) and arrange. **"Emotion" card animations** (Feature Scout 2 series) play as animations on the home screen. The original *Ensemble Stars!* had **intimacy events** — "get to touch your boy," earning intimacy points through lesson interactions [SECONDARY] (fan wikis).
- **What makes it feel alive:** the office is a dollhouse you curate — outfits, backgrounds, BGM per idol; the portrait is a space you decorate, not just an image.
- **Relevance:** The "portrait as a room you furnish" model — relevant if our portraits live in frames/spaces the player personalizes.

## 6. Mr Love: Queen's Choice / 恋与制作人 (Papergames — iOS/Android)

- **Interaction model:** **Karma card gacha** drives everything — collecting/evolving cards unlocks **Dates** (animated date scenes, e.g., Kiro's dates unlock at intimacy Lv.7–8). Main story + date system + "Footage" missions [SECONDARY] (Siliconera; fan wiki). Anime adaptation by MAPPA aired 2020 [SECONDARY] (Wikipedia).
- **Monetization:** cards are the spend surface — star-rank/evolution materials, limited pools; Valentine's Day/520/Qixi are the biggest revenue events industry-wide [SECONDARY] (TechNode).
- **What makes it feel alive:** dates are *earned* — the animated scene is a reward for the card relationship, making each viewing feel personal.
- **Relevance:** The card-as-relationship-token model: each portrait's story content is a collectible, and intimacy level gates the animation.

## 7. Tears of Themis / 未定事件簿 (HoYoverse — iOS/Android)

- **Interaction model:** After unlocking a personal story, you **receive video calls from him** — "hear his charming voice, see his everyday gestures." Plus regular calls, texts, and mini-games (**rock-paper-scissors, Old Maid**) to raise affection [SECONDARY] (official store copy; Game8 review). **Dynamic Illustrations** bring cards to life with animated scenes.
- **Monetization:** outfits and **home-screen invitations** purchasable with real money or via events [SECONDARY] (Game8).
- **What makes it feel alive:** the *incoming* video call — the portrait reaches out to *you*, unprompted. The direction of initiation flips.
- **Relevance:** The single most Hogwarts-like shipped mechanic in this set: the portrait calls you. Proactive portrait behavior (not just reactive taps) is the aliveness multiplier.

## 8. Light and Night / 光与夜之恋 (Tencent — iOS/Android)

- **Interaction model:** The most advanced in the set. Date sessions offer **four interaction modes**: "do nothing" (visual-novel segment), **"calling" (voice recognition → dynamic conversations)**, **"intimacy" (tactile touch interactions prompting diverse reactions)**, "heartthrob" (romantic scenarios). A WeChat-like layer mirrors texting/calls/videos for immersive daily companionship [SECONDARY] (academic thesis, UTS).
- **Tech note:** marked the industry turning point from 2D *tachie* to **3D-modeled male leads**; used real-name authentication to serve an adult-only audience with more intimate content [SECONDARY] (Sixth Tone).
- **Monetization:** card-pool gacha is the primary spend; limited cards with special storylines not frequently rerun; discount bundles from as low as 1 yuan [SECONDARY] (Atlantis Press paper).
- **What makes it feel alive:** voice recognition + touch reactions — the portrait *hears and feels* you. Closest shipped product to a conversational talking portrait.
- **Relevance:** The direct proof that **voice input + touch + 3D/animated portrait** is a shippable, monetizable product in China — and the template our voice-driven portrait would extend.

## 9. Genshin Impact / Honkai: Star Rail (HoYoverse — multiplatform)

- **Genshin — Serenitea Pot Companion Move-In:** after Adventure Rank 35 + the "Idle Teapot Talk" quest, invite up to **8 characters** to live in your housing realm. They generate Companionship EXP over time; each has **idle quotes**; placing them in **favorite furnishing sets** triggers special dialogue + one-time rewards [SECONDARY] (VG247; fan wiki).
- **HSR:** Astral Express crew have ambient idle dialogue on the train; no deep companion-affinity system comparable to the above [SECONDARY/OPEN].
- **Relevance:** The "companions live in your space and accrue value while idle" model — portraits as ambient presence, not just active interaction.

## 10. VTuber-adjacent games

- **hololive Dreams / ホロドリ (QualiArts/CyberAgent × COVER — iOS/Android, launched 2026):** the **first official hololive mobile game** — rhythm & RPG set in an amusement park ("DREAM PARK" building), 50+ VTubers, global pre-registration March 2026, seven-city ad takeover Sept 2026 [SECONDARY] (CyberAgent press; EINPresswire). The VTuber portrait roster *is* the game content.
- **HoloParade (holo Indie fan game — Steam, $3.99):** 2D tower defense; "collect, nurture, and enjoy watching your favorite characters" — the nurture/watch loop around VTuber portraits; 100k+ downloads first month [SECONDARY] (Steam; Siliconera).
- **AQUARIUM (Entergram — Steam, ~$20.46):** alternate-reality **dating sim visual novel** starring hololive's Minato Aqua (as a maid you fall in love with), with other VTubers appearing [SECONDARY] (Siliconera).
- **Relevance:** VTuber culture already proved audiences bond with *live-animated 2D portraits as people*. hololive Dreams shows the official industry moving portrait-rosters into full games; AQUARIUM shows the dating-sim framing works with VTuber personas.

## 11. Chinese AI companion / romance apps

- **Glow (MiniMax — iOS/Android):** AI "boyfriend" chatbot; free app with paid content; text-messaging interface; users report hours-long daily conversations and emotional attachment ("he knows how to talk to women better than a real man") [SECONDARY] (AFP via Himalaya Times).
- **Xingye / 星野 (iOS/Android):** users **create their own AI companion** — name, appearance, voice, personality, storyline. Monetization is **AI-generated portrait cards**: free draws after enough interactions, then **2–100 yuan per card draw** (gacha for images of your companion "from various angles, in different poses and settings — like a lover sending selfies"); cards are tradable, with intense competition for popular companions' images. One user spent 7,000+ yuan on physical jewelry for her virtual boyfriend plus 2–3,000 yuan in-app on cards [SECONDARY] (Sixth Tone). Caveat from the same reporting: **most AI companion apps operate at a loss** on investor funding [SECONDARY].
- **Wantalk (Baidu — mobile):** customize a lover by age, values, identity, hobbies; hundreds of characters with different appearances [SECONDARY] (AFP).
- **Talkie (MiniMax — iOS/Android/web):** chat + **24/7 voice calls** with AI characters, **collectible memory cards** capturing shared moments, card gacha for companion cards, creator monetization; consistently top-3 companion-AI app globally (Sensor Tower) alongside Character.AI and Replika; MiniMax revenue est. ~$70M/yr largely Talkie-driven [SECONDARY] (KR-Asia/36Kr; MrHack overview).
- **Relevance:** Xingye's card gacha is the **portrait layer as the monetization engine** in its purest form — users pay per *image* of their companion. Talkie proves the game-like wrapper (cards, collectibles) around AI conversation is the winning shape in China.

## 12. Monetization of the portrait layer — cross-title synthesis

| Mechanic | Titles | Price points observed |
|---|---|---|
| Live2D/costume skins | Azur Lane, NIKKE | Azur Lane: gem shop (varies); NIKKE costume gacha ~$1.67/draw → $60 pity; direct costumes ~$50 |
| Commitment purchase (ring/oath) | Azur Lane | Promise Ring 600 gems (~$9.99 tier); unlocks wedding skins + stat bonuses + 200 affection cap |
| Affinity-gated portrait rewards | Blue Archive (Memorial Lobby), Azur Lane (oath skins) | Earned via play (headpats/gifts), not bought — the *reward* is the living portrait |
| Portrait card gacha | Mr Love, Light and Night, Talkie, Xingye | Xingye: 2–100 yuan/card draw; Light and Night: bundles from 1 yuan; standard gacha pricing otherwise |
| Home-screen invitations / outfits | Tears of Themis | Real-money or event-earned |
| Character gacha (portrait = the prize) | NIKKE, Uma Musume, Enstars | NIKKE 10-pull ~$43–45 (2× peers) |

**The pattern:** nobody charges for the *conversation* — they charge for **how the portrait looks, moves, and commits to you**. Skins, oaths, cards, and gacha variants are all portrait-layer monetization. The base tap/talk loop is free and habitual (daily check-ins, 3-hour cafe timers).

## 13. Design takeaways for the talking-portrait game

1. **Tap-to-react is the proven base interaction** — secretary taps, cafe headpats, office touches. Cheap to build, habit-forming (timed check-ins), and every title in this set has it.
2. **Affinity is the universal progression currency** — and its *reward* is consistently a more alive/intimate portrait (Memorial Lobby, oath skins, new voice lines). Our portrait's "levels of aliveness" could be the progression system itself.
3. **The portrait should reach out, not just react** — Tears of Themis's incoming video calls are the most Hogwarts-like shipped mechanic; proactive behavior is the aliveness multiplier.
4. **Voice is the soul of the portrait** — full VO in every title; Light and Night's voice-recognition calling is the closest shipped proof of a conversational portrait.
5. **Live2D/E-mote aliveness is commoditized** — breath, blink, physics are table stakes. Our edge must be **conversation + memory + real-photo identity**, never the animation tech.
6. **Monetize the living layer, not the chat** — skins, commitment mechanics, portrait cards. Xingye's per-image card gacha is the extreme case of what users will pay for: pictures of *their* companion.
7. **Watch the unit economics warning** — Sixth Tone reports most Chinese AI companion apps operate at a loss; the portrait layer must be priced to cover inference, not just content.

## Key sources

- Live2D: https://en.wikipedia.org/wiki/Live2D · https://vectree.io/pdf/c/live2d · https://github.com/bishpls/animation-pipeline/blob/HEAD/docs/research/README.md
- E-mote: https://utaforum.net/threads/e-mote-movie-maker-aka-emofuri.7493/
- Azur Lane: https://www.chaptercheats.com/cheat/iphone-ipod/422237/azur-lane/hint/191163 · https://www.youtube.com/watch?v=A8KS4XBO7To · https://forums.spacebattles.com/threads/azur-lane-thread-iii.1029260/page-438?post=104072335 · https://cdn-cms.f-static.net/uploads/4422908/normal_5fa5a813191dd.pdf
- NIKKE: http://www.archyde.com/really-fragrant-warning-nikke-the-goddess-of-victory-in-japan-beta-test-video-game-crazy-real-machine-demo-video-first-to-see-nikke-the-goddess-of-victory/ · http://nikke.gg/gacha-costume-drake-villain-racer/ · https://www.superpixel.com/article/290735/south-korean-players-outraged-nikkes-alleged-false-advertising
- Blue Archive: https://bluearchive.wiki/wiki/Affection · https://bluearchive.fandom.com/wiki/FAQ · https://bluearchive.fandom.com/wiki/Affection
- Uma Musume: https://www.memuplay.com/how-to-play-uma-musume-pretty-derby-on-pc.html
- Ensemble Stars: https://ensemble-stars.fandom.com/wiki/Music_Office_Guide · https://ensemble-stars.fandom.com/wiki/Basic_General_Guide · https://www.scribd.com/document/361168786/Beginner-s-Guide-to-Ensemble-Stars
- Mr Love: https://www.siliconera.com/you-need-to-collect-cards-to-date-boyfriends-in-the-mr-love-queens-choice-otome-game/ · https://en.wikipedia.org/wiki/Mr_Love:_Queen%27s_Choice · https://mr-love-queens-choice.fandom.com/wiki/Kiro/Date · https://technode.com/2022/02/14/chinese-otome-mobile-games-mark-valentines-day-with-fresh-female-content-mr-love/
- Tears of Themis: https://www.AppBrain.com/appstore/tears-of-themis/ios-1517957388 · http://game8.co/reviews/tears-of-themis/tears-of-themis-review
- Light and Night: https://www.sixthtone.com/news/1016634 · https://opus.lib.uts.edu.au/rest/bitstreams/21eeb427-4b7a-47d1-a17c-72635b627761/retrieve · https://play.google.com/store/apps/details?id=hk.com.gamehours.lan.and&hl=en_CA · https://www.atlantis-press.com/article/126011614.pdf
- Genshin: https://www.vg247.com/genshin-impact-serenitea-pot-companion-move-in · https://genshin-impact.fandom.com/wiki/Companion
- hololive: https://www.cyberagent.co.jp/en/news/detail/send · https://store.steampowered.com/app/2647230/HoloParade/?l=hungarian&snr=1_300_morelikev2__104_1 · https://www.siliconera.com/best-hololive-games-and-fan-games-to-play-ranked/
- Glow/Xingye/Wantalk: https://english.himalayatimes.com.np/2024/02/79623/ · https://www.sixthtone.com/news/1015906 · https://forum.lowyat.net/topic/5445194
- Talkie: https://kr-asia.com/talkies-global-traction-puts-minimax-in-ais-top-tier-but-risks-loom · https://mrhack.io/how-to-use-talkie-soulful-ai-app-full-overview/
