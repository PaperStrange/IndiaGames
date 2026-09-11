'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import './demo.css';

type Profile = {
  id: string;
  name: string;
  epithet: string;
  corePromise: string;
  ink: string;
  welcomeNote: string;
  placement: string;
  bestFor: string;
};

const seedProfiles: Profile[] = [
  { id: 'mara-hearthwick', name: 'Mara Hearthwick', epithet: 'The Hearthbound Keeper', corePromise: 'You do not have to solve the whole night at once.', ink: '#a96f42', welcomeNote: 'The kettle is already warm. Put down the first true thing you know.', placement: 'lower margin', bestFor: 'reflection and one next step' },
  { id: 'orin-quillglass', name: 'Orin Quillglass', epithet: 'The Lantern Archivist', corePromise: 'Separate what is known from what is merely glowing.', ink: '#1b3145', welcomeNote: 'I have opened a clean page for the evidence. Write the question first.', placement: 'outside margin', bestFor: 'study notes and sources' },
  { id: 'talia-fernroot', name: 'Talia Fernroot', epithet: 'The Greenhouse Alchemist', corePromise: 'Every difficult mixture has a process, a limit, and a safer test.', ink: '#58734b', welcomeNote: 'Before we add anything to the cauldron, tell me what is already in it.', placement: 'side card', bestFor: 'experiments and making' },
  { id: 'cassian-starling', name: 'Cassian Starling', epithet: 'The Night Cartographer', corePromise: 'A choice becomes less frightening when its paths are visible.', ink: '#55518a', welcomeNote: 'The map is incomplete on purpose. Give me your destination and constraints.', placement: 'map layer', bestFor: 'routes and consequences' },
  { id: 'vesper-flint', name: 'Vesper Flint', epithet: 'The Mirror Duelist', corePromise: 'A strong idea should survive a fair challenge.', ink: '#806078', welcomeNote: 'Choose the rules before we cross blades. I can test the idea or the plan.', placement: 'beside the claim', bestFor: 'critique and rehearsal' },
  { id: 'mira-moonthread', name: 'Mira Moonthread', epithet: 'The Dream Cartographer', corePromise: 'The unfinished thought is often where the doorway is.', ink: '#6f4d75', welcomeNote: 'I found a loose thread in the corner of the page. Pull it once, gently.', placement: 'around related strokes', bestFor: 'creative sparks and worldbuilding' },
];

const responses: Record<string, string> = {
  'mara-hearthwick': 'The page can hold one true thing first. What would make the next ten minutes kinder?',
  'orin-quillglass': 'I can separate the observation from the guess. Keep the original mark, then add one source or example.',
  'talia-fernroot': 'Let us name the inputs before we change the mixture. A small test gives us a safer next move.',
  'cassian-starling': 'I see three routes. Which constraint matters most: speed, safety, or the chance to learn?',
  'vesper-flint': 'I will challenge the claim fairly. First, tell me what evidence would change your mind.',
  'mira-moonthread': 'There is a doorway in that fragment. Keep the image, then give it one concrete place to begin.',
};

function ProfileCard({ profile, selected, onSelect }: { profile: Profile; selected: boolean; onSelect: () => void }) {
  return (
    <button className={`profile-card${selected ? ' selected' : ''}`} onClick={onSelect} style={{ '--profile-ink': profile.ink } as React.CSSProperties}>
      <span className="profile-swatch" aria-hidden="true" />
      <span className="profile-name">{profile.name}</span>
      <span className="profile-epithet">{profile.epithet}</span>
      <span className="profile-promise">{profile.corePromise}</span>
      <span className="profile-best">Best for {profile.bestFor}</span>
    </button>
  );
}

export default function DemoShowcase() {
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
          const bestFor = Array.isArray(raw.bestFor) ? String(raw.bestFor[0]) : seedProfiles[index]?.bestFor || 'notes and ideas';
          return {
            id: String(raw.id || seedProfiles[index]?.id),
            name: String(raw.name || seedProfiles[index]?.name),
            epithet: String(raw.epithet || seedProfiles[index]?.epithet),
            corePromise: String(raw.corePromise || seedProfiles[index]?.corePromise),
            ink: String(presence.ink || seedProfiles[index]?.ink),
            welcomeNote: String(raw.welcomeNote || seedProfiles[index]?.welcomeNote),
            placement: String(presence.placement || seedProfiles[index]?.placement),
            bestFor,
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
    canvasRef.current?.releasePointerCapture(event.pointerId);
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
      <header className="showcase-topbar">
        <a className="showcase-brand" href="/" aria-label="Open the notebook"><span className="brand-glyph">✦</span><span>The Luminous Ledger</span></a>
        <nav className="showcase-nav" aria-label="Demo sections">
          <a href="#try">Try the flow</a><a href="#video">Watch the reference</a><a href="#game">Play the game</a><a className="open-notebook" href="/">Open notebook</a>
        </nav>
      </header>

      <section className="showcase-hero">
        <div className="hero-copy">
          <p className="eyebrow">LIVE DEMO / ALPHA 0.3 + COMPANIONS</p>
          <h1>Write first. Let the page answer.</h1>
          <p className="hero-lede">The notebook turns a stroke into a living exchange: ink arrives immediately, a companion responds in its own margin, and the original mark stays yours.</p>
          <div className="hero-actions"><a className="primary-action" href="#try">Try the ink flow</a><a className="secondary-action" href="#game">Play Ink Spark Sprint</a></div>
          <p className="hero-note">A private interactive showcase for the Enchanted Notebook project.</p>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <img src="/demo/alpha-0.3.jpg" alt="The Enchanted Notebook alpha 0.3 folio" />
          <div className="hero-caption"><span>THE NOTEBOOK</span><strong>alpha 0.3</strong><small>preserved ink / responsive page</small></div>
        </div>
      </section>

      <section className="feature-ribbon" aria-label="Main capabilities">
        <div><span className="feature-number">01</span><strong>Ink in the moment</strong><p>Pointer-aware vector strokes, text placement, undo and restore.</p></div>
        <div><span className="feature-number">02</span><strong>Companion on the page</strong><p>Profiles carry voice, placement hints, boundaries and memory rules.</p></div>
        <div><span className="feature-number">03</span><strong>Reading becomes action</strong><p>PDFs, source notes, quizzes, media replies and playable experiments.</p></div>
      </section>

      <section id="try" className="demo-section try-section">
        <div className="section-heading"><p className="eyebrow">01 / INTERACTION LOOP</p><h2>Choose a companion, then leave a mark.</h2><p>Draw a thought in the small folio below. The demo keeps the source stroke visible and places a local response beside it.</p></div>
        <div className="try-grid">
          <div className="mini-folio">
            <div className="folio-header"><span>PAGE 01 / FIRST TRUE THING</span><span className="registry-state">{liveProfilesLoaded ? 'profile registry loaded' : 'local profile seed'}</span></div>
            <canvas ref={canvasRef} className="ink-pad" width={760} height={300} onPointerDown={startInk} onPointerMove={moveInk} onPointerUp={finishInk} onPointerCancel={finishInk} aria-label="Draw a thought for the companion" />
            <div className="folio-controls"><button onClick={askCompanion}>Write to {selected.name.split(' ')[0]}</button><button onClick={clearInk}>Clear page</button><span>{inkSaved ? 'Saved as a source stroke' : inkStarted ? 'Ink is still yours' : 'Use a mouse, touch, or pen'}</span></div>
            {response && <div className="folio-response" style={{ color: selected.ink }}><b>{selected.name}</b><span>{response}</span><small>placement hint: {selected.placement}</small></div>}
          </div>
          <div className="profile-picker"><div className="picker-heading"><span>COMPANION REGISTRY</span><small>{profiles.length} original profiles</small></div><div className="profile-grid">{profiles.map(profile => <ProfileCard key={profile.id} profile={profile} selected={profile.id === selected.id} onSelect={() => { setSelectedId(profile.id); setResponse(''); }} />)}</div><div className="welcome-note" style={{ borderColor: selected.ink }}><span className="welcome-label">{selected.name} / {selected.placement}</span><p>{selected.welcomeNote}</p></div></div>
        </div>
      </section>

      <section id="video" className="demo-section reference-section">
        <div className="section-heading"><p className="eyebrow">02 / REFERENCE CLIP</p><h2>The visual north star is a page that feels alive.</h2><p>The supplied notebook reference shaped the project's page-first interaction: handwritten input, local rendering, contextual response and tablet-like directness.</p></div>
        <div className="video-layout"><div className="video-frame"><video controls preload="metadata" poster="/demo/harry-potter-notebook-demo.jpg"><source src="/demo/harry-potter-notebook-demo.mp4" type="video/mp4" />Your browser does not support the video element.</video><span className="video-tag">16-second preview / source reference</span></div><div className="reference-notes"><div><b>Immediate ink</b><span>Strokes belong to the user before any model call begins.</span></div><div><b>Local handwriting</b><span>Semantic response and visual rendering stay separate.</span></div><div><b>Context on the page</b><span>Notes, diagrams, media and follow-ups share one surface.</span></div></div></div>
      </section>

      <section id="game" className="demo-section game-section"><div className="game-copy"><p className="eyebrow">03 / PLAYABLE FLASH-STYLE DEMO</p><h2>Ink Spark Sprint</h2><p>Catch ten sparks before the page cools. This standalone HTML5 mini-game illustrates quick feedback, progress, touch input and a companion reward state.</p><a className="secondary-action" href="/demo/flash-game.html" target="_blank" rel="noreferrer">Open game in a new tab</a></div><div className="game-frame"><iframe title="Ink Spark Sprint playable game" src="/demo/flash-game.html" /></div></section>

      <section className="closing-section"><div><p className="eyebrow">NEXT STEP</p><h2>Open the full notebook when you want the whole surface.</h2><p>Use the live notebook for page turns, PDF reading, annotations, sample replies, quizzes, media blocks and SVG export.</p></div><a className="primary-action" href="/">Open the Enchanted Notebook</a></section>
      <footer className="showcase-footer"><span>Build Interactive Demo / Enchanted Notebook</span><span>Original ink stays yours.</span></footer>
    </main>
  );
}

