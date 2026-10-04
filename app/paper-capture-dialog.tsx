'use client';
import { useEffect, useRef, useState } from 'react';
import { Camera, RotateCw, Download, Upload, LoaderCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { captureUrl, type CaptureMetadata, type PaperCapture } from '@/lib/paper-capture';
import { preparePhoto } from '@/lib/prepare-photo';
import { exportCapture, readJson, restoreCapture, uploadCapture } from '@/lib/capture-recovery';
import type { CompanionStatus } from '@/lib/companion-types';
import './paper-capture.css';

type Props = { open: boolean; onOpenChange: (open: boolean) => void; apiBase: string; notebookId: string;
    initialId?: string; status: CompanionStatus | null; onAsk: (capture: PaperCapture) => void; onSettings: () => void };
const fullCrop = { left: 0, top: 0, right: 1, bottom: 1 };

export function PaperCaptureDialog({ open, onOpenChange, apiBase, notebookId, initialId, status, onAsk, onSettings }: Props) {
    const [captures, setCaptures] = useState<PaperCapture[]>([]), [selected, setSelected] = useState<PaperCapture>();
    const [file, setFile] = useState<File>(), [prepared, setPrepared] = useState<Blob>(), [preview, setPreview] = useState('');
    const [metadata, setMetadata] = useState<CaptureMetadata>();
    const [working, setWorking] = useState(''), [problem, setProblem] = useState(''), [more, setMore] = useState(false);
    const generation = useRef(0), request = useRef(0), alive = useRef(true);
    useEffect(() => { alive.current = true; return () => { alive.current = false; request.current++; generation.current++; }; }, []);
    async function refresh() {
        const sequence = ++request.current;
        const result = await readJson<{ captures: PaperCapture[]; more: boolean }>(await fetch(`${apiBase}/api/captures?notebookId=${encodeURIComponent(notebookId)}`, { signal: AbortSignal.timeout(15000) }));
        if (alive.current && sequence === request.current) { setCaptures(result.captures); setMore(result.more); }
    }
    useEffect(() => {
        if (!open) return;
        let active = true;
        setProblem('');
        void refresh().catch(cause => { if (active) setProblem(cause.message); });
        if (initialId) void fetchSource(initialId).then(response => readJson<{ capture: PaperCapture }>(response)).then(result => {
            if (active) { setFile(undefined); setSelected(result.capture); }
        }).catch(cause => { if (active) setProblem(cause.message); });
        return () => { active = false; };
    }, [open, initialId]);
    async function fetchSource(id: string) { return fetch(captureUrl(apiBase, id), { signal: AbortSignal.timeout(15000) }); }
    useEffect(() => {
        const sequence = ++generation.current;
        setPrepared(undefined);
        if (!file || !metadata) return;
        setWorking('Preparing your reading copy…'); setProblem('');
        void preparePhoto(file, metadata).then(blob => { if (sequence === generation.current && alive.current) setPrepared(blob); })
            .catch(cause => { if (sequence === generation.current && alive.current) setProblem(cause.message); })
            .finally(() => { if (sequence === generation.current && alive.current) setWorking(''); });
    }, [file, metadata?.rotation, metadata?.crop]);
    useEffect(() => {
        if (!prepared) { setPreview(''); return; }
        const url = URL.createObjectURL(prepared); setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [prepared]);
    function choose(photo?: File) {
        if (!photo) return;
        setMetadata({ id: crypto.randomUUID(), notebookId, pageLabel: selected?.pageLabel || photo.name.replace(/\.[^.]+$/, '').slice(0, 80) || 'Paper page', parentId: selected?.id, rotation: 0, crop: { ...fullCrop } });
        setFile(photo); setProblem('');
    }
    function transform(change: Partial<CaptureMetadata>) { setMetadata(previous => previous && ({ ...previous, ...change, id: crypto.randomUUID() })); }
    async function perform(label: string, operation: () => Promise<void>) {
        setWorking(label); setProblem('');
        try { await operation(); } catch (cause) { if (alive.current) setProblem(cause instanceof Error ? cause.message : 'The action failed. Your photo is retained.'); }
        finally { if (alive.current) setWorking(''); }
    }
    function download(blob: Blob, name: string) {
        const url = URL.createObjectURL(blob), link = document.createElement('a');
        link.href = url; link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    const providerName = status?.config.providerId === 'built-in' ? status.builtIn.provider : status?.config.providers.find(provider => provider.id === status.config.providerId)?.name;
    return <Dialog open={open} onOpenChange={next => { if (!working) onOpenChange(next); }}>
        <DialogContent className="modal vellum-dialog capture-dialog"><DialogHeader>
            <DialogTitle>Your paper notebook</DialogTitle>
            <DialogDescription>Keep a real page here. Ask when you are ready.</DialogDescription>
        </DialogHeader>
        <p className="capture-disclosure">Saving keeps the original photo and reading copy in your private notebook. Ask sends only the reading copy to {providerName || 'your configured provider'}. Original photos can contain camera location metadata; reading copies contain pixels only.</p>
        <fieldset disabled={!!working} className="capture-controls">
            <label className="capture-file"><Camera size={18}/>Take photo<input aria-label="Take a photo of a notebook page" type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={event => { choose(event.target.files?.[0]); event.target.value = ''; }}/></label>
            <label className="capture-file"><Upload size={18}/>{selected ? 'Retake from file' : 'Choose photo'}<input aria-label="Choose a notebook photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={event => { choose(event.target.files?.[0]); event.target.value = ''; }}/></label>
            <label className="capture-file">Restore sources<input aria-label="Restore paper source recovery file" type="file" accept="application/json,.json" onChange={event => {
                const recovery = event.target.files?.[0]; event.target.value = '';
                if (recovery) void perform('Restoring sources…', async () => { const capture = await restoreCapture(apiBase, notebookId, recovery); setSelected(capture); setFile(undefined); await refresh(); });
            }}/></label>
        </fieldset>
        {file && metadata ? <section className="capture-review" aria-label="Review photo">
            {preview && <img src={preview} alt="Prepared notebook photo"/>}
            <label>Physical page label<input className="modal-field" maxLength={80} value={metadata.pageLabel} disabled={!!working} onChange={event => transform({ pageLabel: event.target.value })}/></label>
            <button disabled={!!working} onClick={() => transform({ rotation: ((metadata.rotation + 90) % 360) as CaptureMetadata['rotation'], crop: { ...fullCrop } })}><RotateCw size={16}/>Rotate 90°</button>
            <div className="capture-crops">{(['left', 'right', 'top', 'bottom'] as const).map(edge => <label key={edge}>{edge} crop
                <input aria-label={`${edge} crop`} type="range" min="0" max="95" step="1" disabled={!!working} value={Math.round((edge === 'right' || edge === 'bottom' ? 1 - metadata.crop[edge] : metadata.crop[edge]) * 100)} onChange={event => {
                    const crop = { ...metadata.crop, [edge]: edge === 'right' || edge === 'bottom' ? 1 - Number(event.target.value) / 100 : Number(event.target.value) / 100 };
                    if (crop.right - crop.left >= .05 && crop.bottom - crop.top >= .05) transform({ crop });
                }}/></label>)}</div>
            <p>Unsaved photo · {selected ? 'A retake keeps earlier sources available.' : 'No AI request has been sent.'}</p>
            <button className="modal-primary" disabled={!!working || !prepared || !metadata.pageLabel.trim()} onClick={() => void perform('Saving original and reading copy…', async () => {
                const capture = await uploadCapture(apiBase, metadata, file, prepared!);
                setSelected(capture); setFile(undefined); await refresh();
            })}>Save paper page</button>
            <button disabled={!!working} onClick={() => setFile(undefined)}>Discard unsaved selection</button>
        </section> : selected ? <section className="capture-review" aria-label="Saved paper source">
            <img src={captureUrl(apiBase, selected.id, 'prepared')} alt={`Reading copy of ${selected.pageLabel}`}/>
            <b>{selected.pageLabel}</b><p>Saved original · {new Date(selected.createdAt).toLocaleString()}{selected.parentId ? ' · retake' : ''}</p>
            <div className="capture-controls"><a href={captureUrl(apiBase, selected.id, 'original')} download><Download size={16}/>Download original</a>
            <button disabled={!!working} onClick={() => void perform('Preparing recovery file…', async () => download(await exportCapture(apiBase, selected), `paper-source-${selected.id}.json`))}>Export sources & revisions</button></div>
            {status?.live && status.vision ? <button className="modal-primary" disabled={!!working} onClick={() => onAsk(selected)}>Ask about this page</button> : <button className="modal-primary" onClick={onSettings}>Connect a vision companion</button>}
            <button disabled={!!working} onClick={() => { setSelected(undefined); setFile(undefined); }}>Capture a different page</button>
        </section> : <p className="capture-empty">A photograph is the bridge between your paper notebook and its companion. Capture or choose one handwritten page.</p>}
        {working && <p className="capture-status" role="status"><LoaderCircle className="spinning" size={16}/>{working}</p>}
        {problem && <p className="capture-problem" role="alert">{problem}<button disabled={!!working} onClick={() => void perform('Refreshing sources…', refresh)}>Refresh saved pages</button></p>}
        <section className="capture-sources"><h3>Saved paper pages</h3>{captures.map(capture => <button key={capture.id} disabled={!!working} aria-pressed={selected?.id === capture.id} onClick={() => { setSelected(capture); setFile(undefined); setProblem(''); }}><span>{capture.pageLabel}</span><small>{new Date(capture.createdAt).toLocaleString()}{capture.parentId ? ' · retake' : ''}</small></button>)}
            {more && <p>The latest 200 sources are listed. Earlier sources remain accessible through their reply links.</p>}
        </section>
        </DialogContent>
    </Dialog>;
}
