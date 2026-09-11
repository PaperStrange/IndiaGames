'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import './demo.css';
import './demo-tabs.css';

export type DemoMode = 'home' | 'notebook' | 'clip' | 'game';

type Profile = {
  id: string;
  name: string;
  epithet: string;
  corePromise: string;
  ink: string;
  welcomeNote: string;
  placement: string;
  bestFor: string;
  portrait: string;
};

const seedProfiles: Profile[] = [
  { id: 'mara-hearthwick', name: 'Mara Hearthwick', epithet: 'The Hearthbound Keeper', corePromise: 'You do not have to solve the whole night at once.', ink: '#a96f42', welcomeNote: 'The kettle is already warm. Put down the first true thing you know.', placement: 'lower margin', bestFor: 'reflection and one next step', portrait: '/demo/companions/mara-hearthwick.png' },
  { id: 'orin-quillglass', name: 'Orin Quillglass', epithet: 'The Lantern Archivist', corePromise: 'Separate what is known from what is merely glowing.', ink: '#1b3145', welcomeNote: 'I have opened a clean page for the evidence. Write the question first.', placement: 'outside margin', bestFor: 'study notes and sources', portrait: '' },
  { id: 'talia-fernroot', name: 'Talia Fernroot', epithet: 'The Greenhouse Alchemist', corePromise: 'Every difficult mixture has a process, a limit, and a safer test.', ink: '#58734b', welcomeNote: 'Before we add anything to the cauldron, tell me what is already in it.', placement: 'side card', bestFor: 'experiments and making', portrait: '/demo/companions/talia-fernroot.png' },
  { id: 'cassian-starling', name: 'Cassian Starling', epithet: 'The Night Cartographer', corePromise: 'A choice becomes less frightening when its paths are visible.', ink: '#55518a', welcomeNote: 'The map is incomplete on purpose. Give me your destination and constraints.', placement: 'map layer', bestFor: 'routes and consequences', portrait: '/demo/companions/cassian-starling.png' },
  { id: 'vesper-flint', name: 'Vesper Flint', epithet: 'The Mirror Duelist', corePromise: 'A strong idea should survive a fair challenge.', ink: '#806078', welcomeNote: 'Choose the rules before we cross blades. I can test the idea or the plan.', placement: 'beside the claim', bestFor: 'critique and rehearsal', portrait: '/demo/companions/vesper-flint.png' },
  { id: 'mira-moonthread', name: 'Mira Moonthread', epithet: 'The Dream Cartographer', corePromise: 'The unfinished thought is often where the doorway is.', ink: '#6f4d75', welcomeNote: 'I found a loose thread in the corner of the page. Pull it once, gently.', placement: 'around related strokes', bestFor: 'creative sparks and worldbuilding', portrait: '/demo/companions/mira-moonthread.png' },
];

const portraitById: Record<string, string> = {
  'pip-bramblefoot': '/demo/companions/pip-bramblefoot.png',
  'cassian-starling': '/demo/companions/cassian-starling.png',
  'mira-moonthread': '/demo/companions/mira-moonthread.png',
  'talia-fernroot': '/demo/companions/talia-fernroot.png',
  'mara-hearthwick': '/demo/companions/mara-hearthwick.png',
  'vesper-flint': '/demo/companions/vesper-flint.png',
};

const responses: Record<string, string> = {
  'mara-hearthwick': 'The page can hold one true thing first. What would make the next ten minutes kinder?',
  'orin-quillglass': 'I can separate the observation from the guess. Keep the original mark, then add one source or example.',
  'talia-fernroot': 'Let us name the inputs before we change the mixture. A small test gives us a safer next move.',
  'cassian-starling': 'I see three routes. Which constraint matters most: speed, safety, or the chance to learn?',
  'vesper-flint': 'I will challenge the claim fairly. First, tell me what evidence would change your mind.',
  'mira-moonthread': 'There is a doorway in that fragment. Keep the image, then give it one concrete place to begin.',
};

const tabs = [
  { href: '/demo', label: 'Overview', mode: 'home' as DemoMode },
  { href: '/demo/notebook', label: 'Notebook flow', mode: 'notebook' as DemoMode },
  { href: '/demo/clip', label: 'Product clip', mode: 'clip' as DemoMode },
  { href: '/demo/game', label: 'Playable loop', mode: 'game' as DemoMode },
];

function DemoHeader({ active }: { active: DemoMode }) {
  return (
    <header className="showcase-topbar">
      <a className="showcase-brand" href="/" aria-label="Open the notebook"><span className="brand-glyph">✦</span><span>The Luminous Ledger</span></a>
      <nav className="showcase-tabs" aria-label="Live demo tabs">
        {tabs.map(tab => <a key={tab.href} className={tab.mode === active ? 'active' : ''} href={tab.href} aria-current={tab.mode === active ? 'page' : undefined}>{tab.label}</a>)}
      </nav>
      <a className="open-notebook" href="/">Open notebook</a>
    </header>
  );
}

function ProfileCard({ profile, selected, onSelect }: { profile: Profile; selected: boolean; onSelect: () => void }) {
  return (
    <button className={`profile-card${selected ? ' selected' : ''}`} onClick={onSelect} style={{ '--profile-ink': profile.ink } as React.CSSProperties}>
      {profile.portrait ? <img className="profile-portrait" src={profile.portrait} alt="" aria-hidden="true" /> : <span className="profile-portrait profile-portrait-placeholder" aria-hidden="true">O</span>}
      <span className="profile-card-copy"><span className="profile-swatch" aria-hidden="true" /><span className="profile-name">{profile.name}</span><span className="profile-epithet">{profile.epithet}</span><span className="profile-promise">{profile.corePromise}</span><span className="profile-best">Best for {profile.bestFor}</span></span>
    </button>
  );
}

function TabIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="tab-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>;
}

export default function DemoShowcase({ mode = 'home' }: { mode?: DemoMode }) {
  const [profiles, setProfiles] = useState(seedProfiles);
  const [selectedId, setSelectedId] = useState(seedProfiles[0].id);
  const [response, setResponse] = useState('');
  const [inkStarted, setInkStarted] = useState(false);
  const [inkSaved, setInkSaved] = useState(false);
  const [liveProfilesLoaded, setLiveProfilesLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const selected = profiles.find(profile => profile.id === selectedId) || profiles[0];

  useEffect(() => {
    let cancelled = false;
    fetch('/demo/companion_profiles.json')
      .then(result => result.ok ? result.json() as Promise<{ profiles?: Array<Record<string, unknown>> }> : Promise.reject(new Error('profile registry unavailable')))
      .then(payload => {
        if (cancelled || !Array.isArray(payload.profiles)) return;
        const mapped = payload.profiles.slice(0, 6).map((raw, index) => {
          const presence = (raw.notebookPresence || {}) as Record<string, unknown>;
          const id = String(raw.id || seedProfiles[index]?.id);
          return {
            id,
            name: String(raw.name || seedProfiles[index]?.name),
            epithet: String(raw.epithet || seedProfiles[index]?.epithet),
            corePromise: String(raw.corePromise || seedProfiles[index]?.corePromise),
            ink: String(presence.ink || seedProfiles[index]?.ink),
            welcomeNote: String(raw.welcomeNote || seedProfiles[index]?.welcomeNote),
            placement: String(presence.placement || seedProfiles[index]?.placement),
            bestFor: Array.isArray(raw.bestFor) ? String(raw.bestFor[0]) : seedProfiles[index]?.bestFor || 'notes and ideas',
            portrait: portraitById[id] || seedProfiles[index]?.portrait || '/demo/companions/mara-hearthwick.png',
          };
        });
        if (mapped.length && !cancelled) {
          setProfiles(mapped);
          setSelectedId(current => mapped.some(profile => profile.id === current) ? current : mapped[0].id);
          setLiveProfilesLoaded(true);
        }
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  const pointFromEvent = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height };
  }, []);

  const startInk = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const point = pointFromEvent(event);
    if (!canvas || !point) return;
    drawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    const context = canvas.getContext('2d');
    if (!context) return;
    context.strokeStyle = selected.ink;
    context.lineWidth = 4;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.beginPath();
    context.moveTo(point.x, point.y);
    setInkStarted(true);
    setInkSaved(false);
  }, [pointFromEvent, selected.ink]);

  const moveInk = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const point = pointFromEvent(event);
    const context = canvas?.getContext('2d');
    if (!point || !context) return;
    context.lineTo(point.x, point.y);
    context.stroke();
  }, [pointFromEvent]);

  const finishInk = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas?.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  }, []);

  const clearInk = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context) context.clearRect(0, 0, canvas.width, canvas.height);
    setInkStarted(false);
    setInkSaved(false);
    setResponse('');
  }, []);

  const askCompanion = () => {
    if (!inkStarted) {
      setResponse('Draw a small mark first. The companion waits for the page to speak.');
      return;
    }
    setResponse(responses[selected.id] || responses['mara-hearthwick']);
    setInkSaved(true);
  };

  return (
    <main className="showcase-shell">
      <DemoHeader active={mode} />

      {mode === 'home' && <>
        <section className="showcase-hero home-hero">
          <div className="hero-copy"><p className="eyebrow">PRODUCT TOUR / ALPHA 0.3</p><h1>A notebook that answers without taking the page away.</h1><p className="hero-lede">Enchanted Notebook turns handwriting, reading, and reflection into one continuous surface. The user writes first. The page keeps the original mark while a companion helps with the next move.</p><div className="hero-actions"><a className="primary-action" href="/demo/notebook">Try notebook flow</a><a className="secondary-action" href="/demo/clip">Watch product clip</a></div><p className="hero-note">A focused tour of the working product surface.</p></div>
          <div className="hero-visual"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><img src="/demo/alpha-0.3.jpg" alt="Enchanted Notebook alpha 0.3 folio" /><div className="hero-caption"><span>THE PRODUCT</span><strong>alpha 0.3</strong><small>write / pause / reply / keep</small></div></div>
        </section>
        <section className="home-proof" aria-label="Product pillars"><a href="/demo/notebook"><span>01</span><strong>Write in place</strong><p>Pen, touch, stylus, text placement, page turns, and PDF reading share one folio.</p></a><a href="/demo/clip"><span>02</span><strong>Keep the source</strong><p>Responses can be partial, cancelled, or wrong without erasing the user's original ink.</p></a><a href="/demo/game"><span>03</span><strong>Make the loop legible</strong><p>A compact playable flow teaches the product promise: write, pause, reply, keep.</p></a></section>
        <section className="home-callout"><div><p className="eyebrow">WHY THIS SURFACE</p><h2>Companionship belongs in the margin.</h2><p>The product's creative edge is a persistent identity that responds as notes, route overlays, source marks, and small cards, rather than pulling the user into a separate chat screen.</p></div><a className="primary-action" href="/demo/notebook">Open the working surface</a></section>
      </>}

      {mode === 'notebook' && <section className="demo-section notebook-tab"><TabIntro eyebrow="01 / NOTEBOOK FLOW" title="Write first. Let the page answer." description="This is the real interaction slice: draw a mark, choose a companion, and keep the response beside the source stroke. Nothing here refers to an external story or resource." /><div className="try-grid"><div className="mini-folio"><div className="folio-header"><span>PAGE 01 / FIRST TRUE THING</span><span className="registry-state">{liveProfilesLoaded ? 'profile registry loaded' : 'local profile seed'}</span></div><canvas ref={canvasRef} className="ink-pad" width={760} height={300} onPointerDown={startInk} onPointerMove={moveInk} onPointerUp={finishInk} onPointerCancel={finishInk} aria-label="Draw a thought for the companion" /><div className="folio-controls"><button onClick={askCompanion}>Write to {selected.name.split(' ')[0]}</button><button onClick={clearInk}>Clear page</button><span>{inkSaved ? 'Saved as a source stroke' : inkStarted ? 'Ink is still yours' : 'Use a mouse, touch, or pen'}</span></div>{response && <div className="folio-response" style={{ color: selected.ink }}><b>{selected.name}</b><span>{response}</span><small>placement hint: {selected.placement}</small></div>}</div><div className="profile-picker"><div className="picker-heading"><span>COMPANION REGISTRY</span><small>{profiles.length} original profiles</small></div><div className="profile-grid">{profiles.map(profile => <ProfileCard key={profile.id} profile={profile} selected={profile.id === selected.id} onSelect={() => { setSelectedId(profile.id); setResponse(''); }} />)}</div><div className="welcome-note" style={{ borderColor: selected.ink }}><span className="welcome-label">{selected.name} / {selected.placement}</span><p>{selected.welcomeNote}</p></div></div></div></section>}

      {mode === 'clip' && <section className="demo-section clip-tab"><TabIntro eyebrow="02 / PRODUCT CLIP" title="The working loop, in one view." description="This clip is made from the product's own alpha surface. It shows the exact promise the app can demonstrate today: immediate ink, a pause, a sample reply, and the source kept intact." /><div className="video-layout"><div className="video-frame"><video controls preload="metadata" poster="/demo/product-flow-preview.jpg"><source src="/demo/product-flow-preview.mp4" type="video/mp4" />Your browser does not support the video element.</video><span className="video-tag">16-second product flow / alpha 0.3</span></div><div className="clip-storyboard"><div><b>WRITE</b><span>Draw with pen, touch, stylus, or text placement.</span></div><div><b>PAUSE</b><span>The page waits without taking ownership of the source mark.</span></div><div><b>REPLY</b><span>Sample companions return a bounded response with a placement hint.</span></div><div><b>KEEP</b><span>Original ink remains available after success, failure, or cancellation.</span></div></div></div></section>}

      {mode === 'game' && <section className="demo-section game-tab"><TabIntro eyebrow="03 / PLAYABLE PRODUCT LOOP" title="Practice the promise." description="The mini-game mirrors the product's own event order. Complete the page loop in sequence, then see the same trust rule the notebook uses: the source stays yours." /><div className="game-section"><div className="game-copy"><p className="eyebrow">PAGEFLOW PRACTICE</p><h2>Write. Pause. Reply. Keep.</h2><p>Choose the next event in the real notebook lifecycle. The game rewards correct sequencing and explains why each state matters.</p><a className="secondary-action" href="/demo/flash-game.html" target="_blank" rel="noreferrer">Open standalone game</a></div><div className="game-frame"><iframe title="Pageflow Practice playable game" src="/demo/flash-game.html" /></div></div></section>}

      <footer className="showcase-footer"><span>Build Interactive Demo / Enchanted Notebook</span><span>Original ink stays yours.</span></footer>
    </main>
  );
}
