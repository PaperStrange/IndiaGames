'use client';
import { useEffect, useRef, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
export default function PdfPage({ url, pageNumber, onLoaded }: {
    url: string;
    pageNumber: number;
    onLoaded: (total: number, height: number, text: string, boxes: Array<{
        text: string;
        x: number;
        y: number;
        w: number;
        h: number;
    }>) => void;
}) {
    const canvas = useRef<HTMLCanvasElement>(null), callback = useRef(onLoaded);
    callback.current = onLoaded;
    const [error, setError] = useState(''), [loading, setLoading] = useState(true);
    useEffect(() => {
        let cancelled = false;
        let task: {
            destroy: () => Promise<void>;
        } | undefined;
        (async () => { setLoading(true); setError(''); try {
            const pdfjs = await import('pdfjs-dist');
            pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
            const load = pdfjs.getDocument({ url });
            task = load;
            const doc = await load.promise;
            const page = await doc.getPage(pageNumber);
            const view = page.getViewport({ scale: 1 });
            const viewport = page.getViewport({ scale: 760 / view.width });
            const text = await page.getTextContent();
            if (cancelled || !canvas.current)
                return;
            const ctx = canvas.current.getContext('2d');
            if (!ctx)
                throw Error('Canvas is unavailable.');
            canvas.current.width = viewport.width * 1.5;
            canvas.current.height = viewport.height * 1.5;
            await page.render({ canvas: canvas.current, canvasContext: ctx, viewport, transform: [1.5, 0, 0, 1.5, 0, 0] }).promise;
            if (!cancelled) {
                canvas.current.dataset.renderedPage = String(pageNumber);
                callback.current(doc.numPages, viewport.height, text.items.map(item => 'str' in item ? item.str : '').join(' '), text.items.filter(item => 'str' in item).map(item => { if (!('str' in item))
                    return { text: '', x: 0, y: 0, w: 0, h: 0 }; const transform = pdfjs.Util.transform(viewport.transform, item.transform); return { text: item.str, x: transform[4], y: transform[5] - Math.abs(transform[3]), w: item.width * viewport.scale, h: Math.max(12, Math.abs(transform[3])) }; }));
                setLoading(false);
            }
        }
        catch (e) {
            if (!cancelled) {
                setError(e instanceof Error ? e.message : 'This PDF could not be opened.');
                setLoading(false);
            }
        } })();
        return () => { cancelled = true; void task?.destroy(); };
    }, [url, pageNumber]);
    return <>{loading && <div className="reader-loading"><LoaderCircle className="spinning" size={25}/>Opening your reading…</div>}{error && <div className="reader-error" role="alert">This PDF could not be opened. {error}</div>}<canvas ref={canvas} className="reading-canvas" aria-label={`PDF page ${pageNumber}`} style={{ display: loading || error ? 'none' : 'block' }}/></>;
}
