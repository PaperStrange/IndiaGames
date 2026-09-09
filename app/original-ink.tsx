'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { type Page, bounds } from '@/lib/notebook';
import { InkStroke } from './ink-art';

export function OriginalInk({ open, onOpenChange, page, onRestore, onCloseAutoFocus }: {
    open: boolean; onOpenChange: (open: boolean) => void; page?: Page;
    onRestore: (exchange: string) => void; onCloseAutoFocus: (event: Event) => void;
}) {
    const exchanges = [...new Set([...(page?.blocks || []).map(b => b.absorbedBy), ...(page?.strokes || []).map(s => s.absorbedBy)].filter((id): id is string => !!id))].reverse();
    return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="modal vellum-dialog originals-dialog" onCloseAutoFocus={onCloseAutoFocus}><DialogHeader><DialogTitle>Nothing is lost in the ink.</DialogTitle><DialogDescription>Your original words and marks, kept on this page. Restore an exchange to replace its reply with your input.</DialogDescription></DialogHeader>
        {!exchanges.length && <p>After your first reply, the ink that faded will be kept here.</p>}
        {exchanges.map(id => {
            const words = page!.blocks.filter(b => b.absorbedBy === id), strokes = page!.strokes.filter(s => s.absorbedBy === id), area = bounds(strokes);
            return <article className="original-exchange" key={id}>
                {words.map(b => <p key={b.id}>{b.text}</p>)}
                {area && <svg className="original-strokes" role="img" aria-label="Preserved original handwriting" viewBox={`${area.x - 16} ${area.y - 16} ${Math.max(180, area.right - area.x + 32)} ${Math.max(80, area.bottom - area.y + 32)}`}>
                    {strokes.map(s => <InkStroke key={s.id} stroke={s}/>)}
                </svg>}
                <button className="quiet-button" onClick={() => { onRestore(id); onOpenChange(false); }}>Restore this ink to the page</button>
            </article>;
        })}
        <button className="modal-primary" onClick={() => onOpenChange(false)}>Back to my notebook</button>
    </DialogContent></Dialog>;
}
