'use client';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

type Direction = 'forward' | 'backward';
type Turn = { id: number; direction: Direction; leaf: HTMLElement; ratio: number };

// Keep an inert visual copy, including PDF pixels. The live editor never rotates.
function copyLeaf(surface: HTMLDivElement): HTMLElement {
    const copy = surface.cloneNode(true) as HTMLElement;
    copy.classList.add('turn-paper-copy');
    copy.removeAttribute('id');
    copy.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
    copy.querySelectorAll('.writing-status, .page-light-sweep').forEach(node => node.remove());
    const originals = surface.querySelectorAll('canvas');
    copy.querySelectorAll('canvas').forEach((canvas, index) => {
        const original = originals[index];
        if (original) canvas.getContext('2d')?.drawImage(original, 0, 0);
    });
    copy.inert = true;
    return copy;
}

export function useBookTurn(surface: React.RefObject<HTMLDivElement | null>) {
    const [turn, setTurn] = useState<Turn | null>(null);
    const serial = useRef(0);
    const finishTurn = useCallback((id: number) => setTurn(old => old?.id === id ? null : old), []);
    const beginTurn = useCallback((direction: Direction) => {
        const node = surface.current;
        if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setTurn(null); return; }
        const box = node.getBoundingClientRect();
        if (!box.width || !box.height) return;
        setTurn({ id: ++serial.current, direction, leaf: copyLeaf(node), ratio: box.width / box.height });
    }, [surface]);
    useEffect(() => {
        if (!turn) return;
        // Also releases the editor if motion changes, a tab hides, or animationend is missed.
        const timer = setTimeout(() => finishTurn(turn.id), 1100);
        return () => clearTimeout(timer);
    }, [turn, finishTurn]);
    return { turn, beginTurn, finishTurn };
}

export function TurningLeaf({ turn, surface, onFinish }: {
    turn: Turn;
    surface: React.RefObject<HTMLDivElement | null>;
    onFinish: (id: number) => void;
}) {
    const front = useRef<HTMLDivElement>(null), still = useRef<HTMLDivElement>(null), leaf = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        if (!front.current) return;
        if (turn.direction === 'backward' && surface.current) {
            still.current?.replaceChildren(turn.leaf);
            const updateFace = () => {
                const node = surface.current;
                if (!node) return;
                const pdf = node.querySelector('canvas');
                // PDF rendering is async: never put the previous page's pixels on the incoming leaf.
                if (pdf && (pdf.dataset.renderedPage !== pdf.getAttribute('aria-label')?.replace('PDF page ', '') || pdf.style.display === 'none')) return;
                front.current?.replaceChildren(copyLeaf(node));
                const box = node.getBoundingClientRect();
                if (leaf.current && box.width && box.height) leaf.current.style.aspectRatio = `${box.width}/${box.height}`;
            };
            updateFace();
            const observer = new MutationObserver(updateFace);
            observer.observe(surface.current, { subtree: true, childList: true, attributes: true, attributeFilter: ['style', 'data-rendered-page'] });
            return () => observer.disconnect();
        } else front.current.replaceChildren(turn.leaf);
    }, [turn, surface]);
    return <div className={`page-turn ${turn.direction}`} style={{ aspectRatio: String(turn.ratio) }} aria-hidden="true" inert>
        <div ref={still} className="turn-still" />
        <div className="turn-cast-shadow" />
        <div ref={leaf} className="turn-leaf" style={{ aspectRatio: String(turn.ratio) }} onAnimationEnd={event => { if (event.target === event.currentTarget) onFinish(turn.id); }}>
            <div ref={front} className="turn-front" />
            <div className="turn-back"><div className="turn-fiber" /></div>
            <div className="turn-bend" />
        </div>
    </div>;
}

export function PageGrip({ direction, disabled, onTurn }: { direction: Direction; disabled: boolean; onTurn: () => void }) {
    const origin = useRef<{ x: number; y: number } | null>(null), suppressClick = useRef(false);
    const sign = direction === 'forward' ? -1 : 1;
    return <button className={`page-grip ${direction}`} disabled={disabled} aria-label={direction === 'forward' ? 'Turn to next page' : 'Turn to previous page'}
        title={direction === 'forward' ? 'Click or pull left to turn the page' : 'Click or pull right to turn back'}
        onPointerDown={event => { if (event.button !== 0) return; origin.current = { x: event.clientX, y: event.clientY }; suppressClick.current = false; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={event => { if (!origin.current) return; const pull = Math.max(0, Math.min(1, (event.clientX - origin.current.x) * sign / 90)); event.currentTarget.style.setProperty('--pull', String(pull)); }}
        onPointerUp={event => {
            const start = origin.current; origin.current = null; event.currentTarget.style.removeProperty('--pull');
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            if (!start) return;
            const dx = (event.clientX - start.x) * sign, dy = Math.abs(event.clientY - start.y);
            if (dx > 35 && dy < 100) { suppressClick.current = true; onTurn(); }
            else if (Math.abs(event.clientX - start.x) > 12 || dy > 12) suppressClick.current = true;
        }}
        onPointerCancel={event => { origin.current = null; suppressClick.current = true; event.currentTarget.style.removeProperty('--pull'); }}
        onClick={() => { if (suppressClick.current) { suppressClick.current = false; return; } onTurn(); }}>
        <span aria-hidden="true">{direction === 'forward' ? '›' : '‹'}</span>
    </button>;
}
