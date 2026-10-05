'use client';
import { inputDraft, hasOverlappingInk } from '@/lib/ink-draft';
import type { Page } from '@/lib/notebook';
import './ink-recovery.css';

export function InkRecovery({ page, fading, busy, move, annotate, retry }: {
    page: Page; fading: boolean; busy: boolean;
    move: () => void; annotate: () => void; retry: () => void;
}) {
    const draft = inputDraft(page);
    if ((!draft.strokes.length && !draft.blocks.length) || fading || busy) return null;
    return <section className="ink-recovery" aria-label="Unsent ink">
        <p>{hasOverlappingInk(page) ? 'Your ink overlaps this page. Move it intact, or keep it as an annotation.'
            : 'Your ink is saved here. Continue writing, or choose an action.'}</p>
        <div>
            <button className="ink-recovery-primary" onClick={move}>Move ink to a fresh leaf</button>
            <button onClick={annotate}>Keep as annotation</button>
            <button onClick={retry}>Read this ink</button>
        </div>
    </section>;
}
