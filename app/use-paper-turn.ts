'use client';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { readJson } from '@/lib/capture-recovery';
import type { PaperCapture } from '@/lib/paper-capture';
import type { Page } from '@/lib/notebook';

type Options = {
    apiBase: string; activeId: string; enabled: boolean; busy: () => boolean; isCurrent: (id: string) => boolean;
    createPage: (capture: PaperCapture) => Page;
    updatePage: (fn: (page: Page) => Page, history: boolean, id: string) => void;
    reply: (text: string, page: Page, capture: PaperCapture) => Promise<void>;
};

export function usePaperTurn(options: Options) {
    const [reading, setReading] = useState<string>(), [message, setMessage] = useState('');
    const job = useRef<{ pageId: string; current: boolean } | undefined>(undefined), mounted = useRef(true);
    const latest = useRef(options); latest.current = options;
    useEffect(() => { mounted.current = true; return () => { mounted.current = false; if (job.current) job.current.current = false; }; }, []);
    useEffect(() => { if (job.current && job.current.pageId !== options.activeId) interrupt(); }, [options.activeId]);
    function interrupt() {
        // 编辑使结果失效；已发出的识别请求继续完成并计费。
        if (job.current) job.current.current = false;
        setReading(undefined); setMessage('');
    }
    async function start(capture: PaperCapture, correction?: string) {
        if (!latest.current.enabled) { toast.message('Connect a vision-capable provider in Companion settings.'); return; }
        if (latest.current.busy()) { toast.message('Finish or stop the current reply before asking about a paper page.'); return; }
        interrupt();
        const page = latest.current.createPage(capture);
        const current = { pageId: page.id, current: true }; job.current = current;
        setReading(page.id); setMessage('Reading your paper…');
        const fade = new Promise<void>(resolve => setTimeout(resolve, 5000));
        try {
            const response = await fetch(`${latest.current.apiBase}/api/companion`, { method: 'POST', headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ mode: 'vision', captureId: capture.id, notebookId: capture.notebookId, pageId: page.id }), signal: AbortSignal.timeout(60000) });
            const result = await readJson<{ text: string }>(response);
            const text = correction?.trim() || result.text.trim();
            if (!text) throw new Error('No readable handwriting was returned. The original photo is kept.');
            if (text.length > 12000) throw new Error('This page exceeds the reply input limit. Crop a shorter passage; the complete original is kept.');
            if (!current.current || !mounted.current || !latest.current.isCurrent(page.id)) return;
            const interpreted = { ...page, capture: { ...page.capture!, transcription: text } };
            latest.current.updatePage(() => interpreted, false, page.id);
            setMessage('The ink is settling…');
            await fade;
            if (!current.current || !mounted.current || !latest.current.isCurrent(page.id)) return;
            setMessage('The companion is answering…');
            await latest.current.reply(text, interpreted, capture);
        } catch (cause) {
            if (current.current && mounted.current) toast.error(cause instanceof Error ? cause.message : 'This page could not be read. Your original is kept.');
        } finally {
            if (job.current === current && mounted.current) { setReading(undefined); setMessage(''); }
        }
    }
    return { reading, message, start, interrupt };
}
