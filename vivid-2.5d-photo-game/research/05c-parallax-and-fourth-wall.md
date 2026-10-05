# Expanded Game Research — Parallax/2.5D Products + Fourth-Wall Portrait Games
**Date:** 2026-10-03 · **Companion to:** `01-similar-games.md` (Sakura: "Nobody ships? Expand the game research domain")
**Scope:** (1) parallax/2.5D photo products beyond games; (2) games where portraits/pictures address the PLAYER.
**Evidence labels:** [REAL] = verified on official page/store/help doc; [SECONDARY] = press-reported; [OPEN] = unvalidated. Every product title verified via search — no invented names.

---

## SWEEP 1 — Parallax / 2.5D photo products (beyond games)

### 1.1 Facebook 3D Photos — the largest-scale single-photo 2.5D deployment ever
- **What:** Post a photo, get true depth-parallax you explore by scrolling, tilting the phone, or moving your head in VR (Oculus) [SECONDARY].
- **How it worked:** Launched Oct 2018 at F8 using dual-lens portrait-mode depth. **Feb 2020: expanded to ANY 2D photo** — a mobile-optimized CNN (FBNet/ChamNet architecture search) trained on millions of public 3D-image + depth-map pairs infers per-pixel depth "in under a second on a wide range of devices," including decades-old family photos [SECONDARY].
- **Is it true single-photo depth-parallax?** Yes — post-2020 version. This is the LDI-technique lineage (Shih et al. 2020 came out of this team) [SECONDARY].
- **Status in 2026:** Mixed signals. Facebook's official help page ("Create a 3D photo on Facebook") is still live and describes creation from computer + mobile [REAL — facebook.com/help/414295416095269]. Third-party coverage (2026) claims Meta shifted investment toward AR filters/Horizon and that native 3D posts lost promotion — but that article conflates 3D *models* with 3D *photos* [SECONDARY]. Treat as: feature still documented, momentum [OPEN].
- **Relevance:** The proof that single-photo 2.5D parallax is a mass-consumer-accepted interaction — hundreds of millions of potential users, zero special hardware. Also the caution: even Facebook couldn't make it a lasting format; the depth effect alone doesn't retain.

### 1.2 LucidPix (Lucid Inc.) — AI depth from a single photo, iOS/Android
- **What:** "Turn any art or photo into 3D" — proprietary AI renders point clouds + depth maps "within seconds" on any smartphone; add 3D frames/text/effects; export as GIF, mp4, or image+depth map; 1M+ users claimed [SECONDARY].
- **True single-photo parallax?** Yes — one-tap AI depth on existing 2D photos [SECONDARY].
- **Status 2026:** Listings still live on APK mirrors; latest traced version 2.6.9 (2020-era build) — app appears in maintenance mode, no recent feature news [SECONDARY]. Treat as alive-but-stale.
- **Relevance:** Closest consumer precedent to our 2.5D layer as a *product feature* (frames + effects + share). Nobody attached conversation to it.

### 1.3 PopPic — 3D Photo Camera (iOS)
- **What:** iPhone app using the phone's dual-camera depth: tilt to change viewpoint, pinch to move toward/away from the subject, post-capture focus/depth-of-field adjustment, depth effects and motion, camera-roll import, share to Instagram/Facebook/Snapchat [SECONDARY].
- **True single-photo parallax?** Yes for capture (dual-camera depth) and for imported photos (depth effects) [SECONDARY].
- **Status 2026:** Actively maintained — v1.12.1 (Sept 2026) fixed depth on iPhone 15; 4.7–4.8★ ratings; freemium (Pro $1.79/mo, lifetime $12.99) [SECONDARY].
- **Relevance:** The living reference implementation of phone-based photo parallax UX (tilt/pinch vocabulary). Depth-data-dependent, not pure AI inference.

### 1.4 Fyuse (Fyusion, Inc.) — spatial photography, iOS/Android
- **What:** "Capture space, not time" — move the phone around the subject; the app stitches multi-view captures into an interactive image you tilt/swipe to re-view [SECONDARY].
- **True single-photo parallax?** NO — this is capture-time multi-view, not single-photo depth inference. Different technical family.
- **Status 2026:** Effectively dormant — 5M+ installs, 3.85★, last Android update 2020 (v4.6.9), last iOS update 2018 (v4.5.2) [SECONDARY]. A legacy reference, not a live competitor.
- **Relevance:** Proves the "window into a moment" interaction metaphor ("as if you had a window looking into the past" — CEO Radu Rusu) [SECONDARY] — the exact framing language a talking-portrait product wants.

### 1.5 Seene — discontinued
- Niche 3D-photo social network; user moved the camera slightly to build a depth map; **acquired by Snapchat in 2016 and discontinued** [SECONDARY]. Relevance: the earliest consumer attempt; talent/IP went to Snap (Spectacles/AR lineage).

### 1.6 Shipped GAMES using parallax/depth portraits — negative result
- Searched for games combining true single-photo depth-parallax with portraits. **None found.** In games, "2.5D" means layered parallax-scrolling backgrounds (Ori, Hollow Knight), pseudo-3D perspectives (Inside, Klonoa, Pandemonium), or 2D sprites in 3D space — never photo-depth portraits [SECONDARY]. **The 2.5D portrait remains unclaimed in games** [OPEN — negative search result, not proof of nonexistence].

### 1.7 What "2.5D" means in the Japanese industry — terminology warning
- **In Japan, 2.5次元 does NOT mean photo-depth.** It means **2.5-Dimensional musicals**: stage productions based on 2D anime/manga/games brought into 3D live performance. Term coined by fans; Japan 2.5-Dimensional Musical Association founded 2014; ~1.6M attendees in 2013; 123 productions drawing 1.32M in 2015 (Wikipedia, "2.5D musical"; thefreelibrary.com) [SECONDARY].
- **Why this matters for us:** if we say "2.5D photo game" to Japanese partners, they will hear "stage adaptation," not "depth parallax." Use 「奥行きパララックス」/ "depth-parallax photo" language in JP contexts, or expect confusion.
- **Design lesson from 2.5D musicals:** the genre's core discipline is *fidelity to the 2D original* — makeup/costuming that precisely depicts the original character, acting that mimics the original expressions (Wikipedia) [SECONDARY]. The Japanese 2.5D audience punishes dimensionalizations that betray the source. Directly applicable: our portrait animation must preserve the identity and character of the original photo — drift breaks the contract.

---

## SWEEP 2 — Games where portraits/pictures address the PLAYER

### 2.1 Doki Doki Literature Club! (Team Salvato, 2017 — free; Plus! 2021 paid)
- **Portrait mechanic:** Monika becomes self-aware she is in a dating sim, deletes the other girls' character files, and addresses **the player, not the protagonist**. Act 3 is a direct conversation with her in an infinite-space classroom. She drags your cursor to her name at choice screens, comments if she detects you're streaming/recording, and the only way to progress is to delete `monika.chr` from the game's files yourself [SECONDARY].
- **How it creates being-perceived:** file manipulation (she acts on your filesystem), input seizure (cursor drag), stream detection, and save-system taunts ("there's no need to save anymore") [SECONDARY].
- **Platform:** PC/Mac (free), Plus! on PC/PS/Xbox/Switch [SECONDARY].
- **Reception:** Massive cult hit — millions of downloads, one of the defining indie horror phenomena of the 2010s [SECONDARY].
- **Relevance:** The gold standard for "a face on screen that knows YOU are there." Her sprite is a static 2D portrait — and it still terrified millions. Evidence for the self-QA thesis that *perceived attention beats visual depth*.

### 2.2 IMSCARED (Ivan Zanotti — 2012 freeware; 2016 Steam "A Pixelated Nightmare")
- **Portrait mechanic:** The antagonist White Face (literally a floating white face) escapes the game window: it creates an `imscared` folder **on your desktop**, drops files there that are required for progression (you must delete `heart.txt` to win), fakes Blue Screens of Death and crashes, and fires a jumpscare on your desktop *after* you've quit the game [SECONDARY — Wikipedia, GamesRadar].
- **How it creates being-perceived:** the game acts on your OS outside its window — the horror lives on your computer, not in the game [SECONDARY].
- **Platform:** PC [SECONDARY].
- **Reception:** Cult classic of meta-horror; the Steam edition added the "Loneliness" ending and the Restorer character [SECONDARY].
- **Relevance:** The "portrait reaches out of the frame" pattern — directly translatable: our portrait could act outside its frame (notifications, wallpaper, lock-screen presence).

### 2.3 OneShot (Future Cat — 2014 free; 2016 Steam remake; 2022 World Machine Edition on PS/Xbox/Switch)
- **Portrait mechanic:** You are not Niko — you are a **god the protagonist Niko talks to**. Niko addresses you by your OS username / console profile name. The Entity (villain) sends fake OS error messages addressing you by name and changes your desktop wallpaper. Puzzles require manipulating files outside the game window. Closing the window without saving kills Niko (original 2014 build). Ending: Niko thanks you and **walks off the game screen onto your desktop** [SECONDARY — OneShot Wiki, Nintendo Life, FilmStories interview with creator Eliza Velasquez].
- **How it creates being-perceived:** the player/character separation is the whole premise — "What if you and your character are two different people, and you're going to talk?" (Velasquez) [SECONDARY]. The game treats your computer as part of its world.
- **Platform:** PC; consoles 2022 (World Machine Edition adapts the PC-specific tricks to in-game desktop metaphors) [SECONDARY].
- **Reception:** Beloved indie; the console port was well reviewed [SECONDARY].
- **Relevance:** The closest structural template for our game: a small, likeable face that knows you are a separate being and talks *to you*, with the device itself as part of the fiction.

### 2.4 Undertale (Toby Fox, 2015)
- **Portrait mechanic:** Flowey is aware of saves, resets, and your behavior across playthroughs — he mocks you for reloading and calls out genocide-run players directly. The genocide route is a "fourth-wall dissolve": empty encounters, slowed music, deserted towns, narration that addresses "you" the player. Chara speaks to the player directly at the end of genocide and **permanently taints your save files** [SECONDARY].
- **How it creates being-perceived:** memory across sessions — the game remembers what *you* did, not just what the protagonist did [SECONDARY].
- **Platform:** PC/Mac/Linux, PS4/Vita, Switch, Xbox [SECONDARY].
- **Reception:** Landmark indie — millions sold, enormous cultural footprint [SECONDARY].
- **Relevance:** Memory is the retention primitive (matches the a16z companion thesis in 01). A portrait that remembers you across sessions is the cheapest "alive" signal — no animation required.

### 2.5 Layers of Fear (Bloober Team, 2016; remake 2023)
- **Portrait mechanic:** Paintings **change when you're not looking** — each time you look away and back, the portrait is subtly different. Rooms rearrange behind you; painted things become real. The mansion's art is the antagonist's medium [SECONDARY — Bloody Disgusting, Fextralife].
- **How it creates being-perceived:** change-on-unobserved — the painting behaves differently when it thinks you're not watching, which implies it *knows* when you are [SECONDARY].
- **Platform:** PC, PS4, Xbox One, Switch (2016); remake on PC/PS5/Xbox Series (2023) [SECONDARY].
- **Reception:** Well-received psychological horror; launched a series [SECONDARY].
- **Relevance:** The only shipped game where **portraits themselves are the interactive surface** — and the mechanic is gaze-contingent behavior. Directly portable: our portrait could subtly react to whether the camera sees the player looking.

### 2.6 P.T. (Kojima / del Toro, 2014 — PS4 playable teaser, delisted)
- **Portrait mechanic:** The ghost Lisa is **attached to the player's back** from the moment you pick up the flashlight — dataminer Lance McDonald proved she shadows your every step, invisible because the camera emulates your field of view. You hear her behind you; turning reveals nothing [SECONDARY — AV Club, Kotaku, Game Informer]. Plus a Kojima fourth-wall sequence where the hauntings "break your game" [SECONDARY — NME].
- **How it creates being-perceived:** the unseen watcher — the threat perceives you continuously while remaining unperceived. The horror is *asymmetric perception* [SECONDARY].
- **Platform:** PS4 only; removed from PSN, undownloadable — playable only on consoles that still have it installed [SECONDARY].
- **Reception:** Landmark horror teaser; obsession object for streamers and dataminers for a decade [SECONDARY].
- **Relevance:** The purest "portrait watches you" mechanic ever shipped — perception without visibility. For our game: the portrait knowing you're there (via camera/mic) even when it "isn't looking" is the Hogwarts feeling.

### 2.7 There Is No Game: Wrong Dimension (Draw Me a Pixel, 2020)
- **Portrait mechanic:** The narrator — the game *program itself* — pleads with **you, the user**, not to play, addresses you directly throughout, and puzzles are solved by manipulating HUD and interface elements outside the game fiction [SECONDARY — CBR, Vooks, ScreenRant].
- **How it creates being-perceived:** sustained direct address + UI-as-playground; comedic rather than horror [SECONDARY].
- **Platform:** PC, Switch, mobile [SECONDARY].
- **Reception:** Well-reviewed comedy adventure [SECONDARY].
- **Relevance:** Proves the same fourth-wall toolkit works for comedy/playfulness — our game need not be horror to use direct address.

---

## Synthesis — the "being perceived" toolkit (for tonight's discussion)
Verified mechanics that make a player feel *seen by* a face on screen:
1. **Direct address by name** — OneShot (OS username), DDLC (stream detection) [SECONDARY]
2. **Acting outside the window** — IMSCARED (desktop files), OneShot (wallpaper, OS dialogs), DDLC (file deletion as progression) [SECONDARY]
3. **Seizing the player's input** — DDLC (cursor drag) [SECONDARY]
4. **Memory across sessions/resets** — Undertale (genocide taint), DDLC (save taunts) [SECONDARY]
5. **The unseen watcher** — P.T. (Lisa attached to your back) [SECONDARY]
6. **Change-when-unobserved** — Layers of Fear (paintings shift when you look away) [SECONDARY]
7. **UI-as-playground** — There Is No Game (HUD manipulation) [SECONDARY]

**The remaining gap:** paintings that watch/change exist (Layers of Fear); faces that talk to the player exist (DDLC, OneShot); single-photo depth-parallax exists (Facebook 3D Photos, LucidPix, PopPic). **No shipped product combines a depth-parallax portrait that both moves in 2.5D AND converses with the player.** The combination is still unclaimed [OPEN — negative search result].

## Key sources
- FB 3D Photos: https://petapixel.com/2020/02/28/facebook-now-lets-you-turn-any-2d-photo-into-a-3d-image-using-ai/ · https://www.facebook.com/help/414295416095269?locale=en_US · https://www.slashgear.com/facebook-taps-ai-to-turn-almost-any-2d-photo-into-a-3d-image-28611571/
- LucidPix: https://apkpure.com/lucidpix-3d-photo-creator/com.lucid.lucidpix · PopPic: https://apps.appfollow.io/ios/poppic-3d-photo-camera/1368935143?country=pl · Fyuse: https://fstoppers.com/apps/introducing-fyuse-new-app-revolutionizes-3d-photography-50132 · https://www.androidrank.org/application/fyuse_3d_photos/com.fyusion.fyuse · Seene: https://www.3dmag.com/news/f8-2018-facebook-3d-capture-with-3d-photos-3d-memories/
- 2.5D musicals: https://en.wikipedia.org/wiki/2.5D_musical · https://www.thefreelibrary.com/Anime+Magnetism%3A+How+a+new+genre+of+stage+productions+inspired+by...-a0586241505
- DDLC: https://www.pcgamesn.com/doki-doki-literature-club/doki-doki-literature-club-visual-novel · https://www.rockpapershotgun.com/how-doki-doki-literature-club-frames-you · https://bloody-disgusting.com/editorials/3559587/craft-fourth-wall-breaking-anxiety-doki-doki-literature-club/
- IMSCARED: https://en.wikipedia.org/wiki/Imscared · https://www.gamesradar.com/its-time-to-be-afraid-your-console-again/
- OneShot: https://oneshot.wiki.gg/wiki/OneShot · https://www.nintendolife.com/reviews/switch-eshop/oneshot-world-machine-edition · https://filmstories.co.uk/features/breaking-the-fourth-wall-in-video-games-for-fun-and-profit/
- Undertale: https://medium.com/@aaronnemoyten/undertales-punishing-genocide-run-is-what-we-deserve-e7ef59451b9 · https://whatisesports.xyz/undertale-breaking-fourth-wall-rpgs/
- Layers of Fear: https://bloody-disgusting.com/editorials/3504318/play-layers-fear/ · https://fextralife.com/layers-of-fear-review/?query-0-page=1046&cst
- P.T.: https://www.avclub.com/p-t-hack-reveals-a-horror-game-thats-somehow-even-sca-1837983220 · https://kotaku.com/the-scariest-thing-in-p-t-was-following-you-all-along-1837985295 · https://www.nme.com/features/gaming-features/the-irrefutable-horror-of-p-t-3229290
- There Is No Game: https://www.cbr.com/there-is-no-game-wrong-dimension-review/ · https://screenrant.com/there-is-no-game-wrong-dimension-review/
