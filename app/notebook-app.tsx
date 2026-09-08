'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PenLine, Highlighter, Eraser, Type, MousePointer2, Undo2, Redo2, Plus, BookOpen, FileText, ChevronLeft, ChevronRight, ChevronDown, ArrowUp, ArrowUpRight, Check, Download, Menu, X, Sparkles, Settings2, HelpCircle, Maximize2, LoaderCircle, Leaf, FlaskConical, Smile, Table2, GraduationCap, Feather, Link2, NotebookPen, MoreHorizontal, RotateCcw, Flame, Sun } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Toaster, toast } from 'sonner';
import { type Page, type Block, type Stroke, type Point, type Tool, type Notebook, initialNotebook, newPage, uid, block, nextY, pageHeight, replyFor, topicFor, feedbackFor, bounds, WIDTH } from '@/lib/notebook';
import { InkStroke, InkBlock, outline, strokeLine, Coordinates } from './ink-art';
import PdfPage from './pdf-page';
import { BookLayers, ParchmentMaterial } from './parchment-material';
import './parchment.css';
import { useBookTurn, TurningLeaf, PageGrip } from './book-turn';
const COLORS = ['#40372a', '#526344', '#8a4f36'];
const apiPath = (base: string, path: string) => `${base.replace(/\/$/, '')}${path}`;
function ToolTip({ label, children }: {
    label: string;
    children: React.ReactNode;
}) { return <Tooltip><TooltipTrigger asChild>{children}</TooltipTrigger><TooltipContent side="bottom" sideOffset={9}>{label}</TooltipContent></Tooltip>; }
export default function NotebookApp({ apiBase = '' }: {
    apiBase?: string;
}) {
    const isMobile = useIsMobile();
    const [candlelight, setCandlelight] = useState(true), [warmth, setWarmth] = useState(65), [tabVisible, setTabVisible] = useState(true), [preferencesLoaded, setPreferencesLoaded] = useState(false);
    const menuButton = useRef<HTMLButtonElement>(null);
    useEffect(() => { const visibility = () => setTabVisible(!document.hidden); visibility(); document.addEventListener('visibilitychange', visibility); return () => document.removeEventListener('visibilitychange', visibility); }, []);
    const [data, setData] = useState<Notebook | null>(null), [active, setActive] = useState(''), [tool, setTool] = useState<Tool>('pen'), [color, setColor] = useState(COLORS[0]), [size, setSize] = useState(3.2), [prompt, setPrompt] = useState('');
    const [saving, setSaving] = useState<'loading' | 'saved' | 'saving' | 'error'>('loading'), [loadError, setLoadError] = useState(false), [live, setLive] = useState(false), [busy, setBusy] = useState(false), [auto, setAuto] = useState(false), [penOnly, setPenOnly] = useState(false), [settings, setSettings] = useState(false), [help, setHelp] = useState(false), [newOpen, setNewOpen] = useState(false), [newTitle, setNewTitle] = useState(''), [mobileOpen, setMobileOpen] = useState(false), [reader, setReader] = useState(false), [zoom, setZoom] = useState(100), [animated, setAnimated] = useState<string[]>([]), [typePoint, setTypePoint] = useState<{
        x: number;
        y: number;
    } | null>(null), [undoTick, setUndoTick] = useState(0), [selection, setSelection] = useState<{
        x: number;
        y: number;
        right: number;
        bottom: number;
    } | null>(null), [readingText, setReadingText] = useState(''), [uploading, setUploading] = useState(false), [readerHeight, setReaderHeight] = useState(1000), [saveProblem, setSaveProblem] = useState('');
    const current = data?.pages.find(p => p.id === active) || data?.pages[0];
    const revision = useRef(0), dataRef = useRef<Notebook | null>(null), activeRef = useRef(''), currentRef = useRef<Page | undefined>(undefined), dirtyRef = useRef(false), loadedRef = useRef(false), saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined), saveChain = useRef<Promise<unknown>>(Promise.resolve()), responseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined), busyRef = useRef(false), stage = useRef<HTMLDivElement>(null), svg = useRef<SVGSVGElement>(null), inkPath = useRef<SVGPathElement>(null), drawing = useRef<Stroke | null>(null), pointerId = useRef<number | null>(null), erasing = useRef(false), selectionStart = useRef<Point | null>(null), histories = useRef<Record<string, {
        undo: Page[];
        redo: Page[];
    }>>({}), fileInput = useRef<HTMLInputElement>(null), promptInput = useRef<HTMLInputElement>(null), pdfHeight = useRef(1000), markedStrokes = useRef<Stroke[]>([]), mounted = useRef(true), lastSentStroke = useRef<Record<string, number>>({}), liveDocText = useRef(''), readingPaper = useRef<HTMLDivElement>(null), pdfBoxes = useRef<Array<{
        text: string;
        x: number;
        y: number;
        w: number;
        h: number;
    }>>([]);
    const { turn, beginTurn, finishTurn } = useBookTurn(readingPaper);
    useEffect(() => { if (!reader || !readingPaper.current)
        return; const observer = new ResizeObserver(() => { const r = readingPaper.current?.getBoundingClientRect(); if (r && r.width) {
        const h = r.height / r.width * WIDTH;
        pdfHeight.current = h;
        setReaderHeight(h);
    } }); observer.observe(readingPaper.current); return () => observer.disconnect(); }, [reader, active]);
    useEffect(() => { if (reader && current) {
        const key = current.document ? String(current.document.page) : 'sample';
        markedStrokes.current = current.annotations?.[key] || [];
        setUndoTick(t => t + 1);
    } }, [reader, active, current?.document?.page]);
    useEffect(() => { currentRef.current = current; activeRef.current = active; dataRef.current = data; }, [data, active, current]);
    const load = useCallback(async () => { setSaving('loading'); try {
        const r = await fetch(apiPath(apiBase, '/api/notebook'));
        if (!r.ok)
            throw Error();
        const payload = await r.json() as {
            notebook?: Notebook;
            version: number;
        };
        revision.current = payload.version || 0;
        setSaveProblem('');
        const next: Notebook = payload.notebook?.pages?.length ? payload.notebook : initialNotebook();
        dataRef.current = next;
        setData(next);
        setActive(next.pages[0].id);
        activeRef.current = next.pages[0].id;
        loadedRef.current = true;
        dirtyRef.current = !payload.notebook;
        setLoadError(false);
        setSaving('saved');
    }
    catch {
        setLoadError(true);
        setSaving('error');
        if (!dataRef.current) {
            const next = initialNotebook();
            setData(next);
            dataRef.current = next;
            setActive(next.pages[0].id);
            activeRef.current = next.pages[0].id;
        }
    } }, [apiBase]);
    useEffect(() => { mounted.current = true; void load(); fetch(apiPath(apiBase, '/api/companion')).then(r => r.json()).then(d => setLive(!!(d as {
        live?: boolean;
    }).live)).catch(() => { }); try {
        const prefs = JSON.parse(localStorage.getItem('enchanted-preferences') || '{}');
        setPenOnly(!!prefs.penOnly);
        setAuto(!!prefs.auto);
        setCandlelight(prefs.candlelight !== false);
        if (typeof prefs.warmth === 'number' && Number.isFinite(prefs.warmth)) setWarmth(Math.max(20, Math.min(100, prefs.warmth)));
    }
    catch { } setPreferencesLoaded(true); return () => { mounted.current = false; clearTimeout(responseTimer.current); clearTimeout(saveTimer.current); }; }, [apiBase, load]);
    useEffect(() => { if (!preferencesLoaded) return; try {
        localStorage.setItem('enchanted-preferences', JSON.stringify({ auto, penOnly, candlelight, warmth }));
    }
    catch { } }, [auto, penOnly, candlelight, warmth, preferencesLoaded]);
    const save = useCallback((snapshot: Notebook) => { if (!loadedRef.current)
        return; setSaving('saving'); saveChain.current = saveChain.current.catch(() => { }).then(async () => { try {
        const r = await fetch(apiPath(apiBase, '/api/notebook'), { method: 'PUT', headers: { 'content-type': 'application/json', 'X-Notebook-Version': String(revision.current) }, body: JSON.stringify(snapshot) });
        const result = await r.json() as {
            version?: number;
            error?: string;
        };
        if (!r.ok) {
            setSaveProblem(result.error || 'Your notes could not be saved. Please try again.');
            throw Error();
        }
        revision.current = result.version || revision.current;
        if (mounted.current) {
            setSaveProblem('');
            setSaving('saved');
        }
    }
    catch {
        if (mounted.current)
            setSaving('error');
    } }); }, [apiBase]);
    useEffect(() => { if (data && dirtyRef.current && loadedRef.current) {
        clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => { save(data); dirtyRef.current = false; }, 650);
    } return () => clearTimeout(saveTimer.current); }, [data, save]);
    useEffect(() => { const flush = () => { if (dirtyRef.current && dataRef.current && loadedRef.current) {
        void fetch(apiPath(apiBase, '/api/notebook'), { method: 'PUT', headers: { 'content-type': 'application/json', 'X-Notebook-Version': String(revision.current) }, body: JSON.stringify(dataRef.current), keepalive: true });
    } }; window.addEventListener('pagehide', flush); return () => window.removeEventListener('pagehide', flush); }, [apiBase]);
    function mutate(fn: (d: Notebook) => Notebook) { setData(old => { if (!old)
        return old; const next = fn(old); dataRef.current = next; dirtyRef.current = true; return next; }); setSaving('saving'); }
    function updatePage(fn: (p: Page) => Page, history = true, id = activeRef.current) { const old = dataRef.current?.pages.find(p => p.id === id); if (!old)
        return; if (history) {
        const h = histories.current[id] || (histories.current[id] = { undo: [], redo: [] });
        h.undo.push(structuredClone(old));
        h.undo = h.undo.slice(-35);
        h.redo = [];
        setUndoTick(t => t + 1);
    } mutate(d => ({ ...d, pages: d.pages.map(p => p.id === id ? fn(p) : p) })); }
    function undo(redo = false) { const id = activeRef.current, h = histories.current[id], p = dataRef.current?.pages.find(p => p.id === id); if (!h || !p)
        return; const from = redo ? h.redo : h.undo, to = redo ? h.undo : h.redo, previous = from.pop(); if (!previous)
        return; to.push(structuredClone(p)); updatePage(() => previous, false); setUndoTick(t => t + 1); }
    function go(id: string) { if (id !== activeRef.current || reader) { const pages = dataRef.current?.pages || []; const from = pages.findIndex(p => p.id === activeRef.current), to = pages.findIndex(p => p.id === id); beginTurn(to >= 0 && to < from ? 'backward' : 'forward'); } clearTimeout(responseTimer.current); setActive(id); activeRef.current = id; setReader(false); setSelection(null); setTypePoint(null); setMobileOpen(false); setAnimated([]); setZoom(100); markedStrokes.current = []; stage.current?.scrollTo({ top: 0 }); }
    function turnPage(direction: 'forward' | 'backward') { if (pointerId.current !== null) return; const pages = dataRef.current?.pages || []; const index = pages.findIndex(p => p.id === activeRef.current), next = pages[index + (direction === 'forward' ? 1 : -1)]; if (next) { go(next.id); if (next.document) { setReader(true); setTool('select'); } } }
    function turnPdf(direction: 'forward' | 'backward') { const doc = currentRef.current?.document; if (!doc || pointerId.current !== null) return; const next = doc.page + (direction === 'forward' ? 1 : -1); if (next < 1 || next > doc.total) return; beginTurn(direction); updatePage(p => ({ ...p, document: p.document ? { ...p.document, page: next } : undefined }), false); markedStrokes.current = []; setSelection(null); stage.current?.scrollTo({ top: 0 }); }
    function showDialog(kind: 'new' | 'help' | 'settings') { setMobileOpen(false); if (kind === 'new') setNewOpen(true); else if (kind === 'help') setHelp(true); else setSettings(true); }
    function restoreNotebookFocus(event: Event) { event.preventDefault(); if (isMobile) menuButton.current?.focus({ preventScroll: true }); else promptInput.current?.focus({ preventScroll: true }); }
    function create(title = newTitle, topic = 'free') { const p = newPage(title.trim() || 'Untitled thought', topic); mutate(d => ({ ...d, pages: [...d.pages, p] })); go(p.id); setNewOpen(false); setNewTitle(''); return p; }
    function scrollToWriting(y: number) { setTimeout(() => { if (stage.current && svg.current) {
        const s = svg.current.getBoundingClientRect().width / WIDTH;
        stage.current.scrollTo({ top: Math.max(0, y * s - 180), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    } }, 80); }
    async function send(text = prompt, options: {
        source?: string;
        page?: Page;
        ink?: boolean;
    } = {}) {
        let p = options.page || currentRef.current;
        if (!p || busyRef.current)
            return;
        if (!text.trim() && !options.ink) {
            promptInput.current?.focus();
            return;
        }
        if (reader && !options.page) {
            const source = p.document ? `${p.document.name} · page ${p.document.page}` : 'A short guide to coordinates · page 1';
            const topic = p.document ? topicFor(selectedPassage(), 'reading') : 'coordinates';
            p = create('A question from my reading', topic);
            options = { ...options, page: p, source };
        }
        busyRef.current = true;
        setBusy(true);
        setPrompt('');
        setTypePoint(null);
        setSelection(null);
        const pageId = p.id;
        let y = nextY(p);
        const additions: Block[] = [];
        if (!options.ink) {
            additions.push(block('user', text.trim(), y, Math.max(54, Math.ceil(text.length / 50) * 43)));
            y += additions[0].h + 42;
        }
        let replies: Block[] = [];
        try {
            if (live) {
                const newInk = p.strokes.slice(lastSentStroke.current[pageId] || 0);
                const crop = await inkCrop(newInk);
                const res = await fetch(apiPath(apiBase, '/api/companion'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ prompt: text, topic: p.topic, context: p.blocks.filter(b => b.kind === 'text' || b.kind === 'user').slice(-8).map(b => ({ role: b.kind === 'user' ? 'user' : 'assistant', text: b.text })), strokes: newInk, image: crop, source: options.source || '', documentText: liveDocText.current.slice(0, 10000), placement: { x: 68, y } }) });
                const answer = await res.json() as {
                    text: string;
                    diagram: Block['kind'];
                    error?: string;
                };
                if (!res.ok)
                    throw new Error(answer.error || 'The companion could not respond.');
                replies = [block('text', String(answer.text), y, Math.max(100, Math.ceil(String(answer.text).length / 52) * 37 + 35), { source: options.source })];
                if (['mitosis', 'coordinates', 'doodle'].includes(answer.diagram))
                    replies.push(block(answer.diagram, '', y + replies[0].h + 32, 280));
                lastSentStroke.current[pageId] = p.strokes.length;
            }
            else if (options.ink) {
                replies = [block('text', 'Your ink is here. To try a sample reply, type\nwhat you wrote below, or pick a prompt.\nReading any handwriting needs the live companion.', y, 130)];
            }
            else {
                const quiz = [...p.blocks].reverse().find(b => b.kind === 'quiz');
                const match = quiz?.choices?.find(c => c.toLowerCase().replace(/\s/g, '') === text.toLowerCase().replace(/\s/g, '').replace(/[.!?]$/, ''));
                if (quiz && match) {
                    replies = [block('text', feedbackFor(quiz, match), y, 100)];
                    updatePage(old => ({ ...old, blocks: old.blocks.map(b => b.id === quiz.id ? { ...b, selected: match, feedback: feedbackFor(b, match) } : b) }), false, pageId);
                }
                else
                    replies = replyFor(text, p, y, options.source);
            }
            await new Promise(r => setTimeout(r, live ? 0 : 650));
            if (!mounted.current)
                return;
            setAnimated(replies.map(b => b.id));
            updatePage(old => ({ ...old, topic: topicFor(text, old.topic), blocks: [...old.blocks, ...additions, ...replies] }), true, pageId);
            if (activeRef.current === pageId)
                scrollToWriting(y - 60);
        }
        catch (e) {
            toast.error(e instanceof Error ? e.message : 'Could not get a response. Your writing is safe.');
            setPrompt(text);
        }
        finally {
            busyRef.current = false;
            if (mounted.current)
                setBusy(false);
        }
    }
    async function inkCrop(strokes: Stroke[]) { const b = bounds(strokes); if (!b)
        return undefined; const c = document.createElement('canvas'); const scale = Math.min(2, 1200 / Math.max(b.right - b.x + 32, b.bottom - b.y + 32)); c.width = Math.ceil((b.right - b.x + 32) * scale); c.height = Math.ceil((b.bottom - b.y + 32) * scale); const ctx = c.getContext('2d'); if (!ctx)
        return undefined; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); ctx.scale(scale, scale); ctx.translate(16 - b.x, 16 - b.y); for (const s of strokes) {
        ctx.fillStyle = s.color;
        if (s.tool === 'pen')
            ctx.fill(new Path2D(outline(s)));
        else {
            ctx.strokeStyle = s.color;
            ctx.lineWidth = s.size * 6;
            ctx.globalAlpha = .3;
            ctx.stroke(new Path2D(strokeLine(s)));
            ctx.globalAlpha = 1;
        }
    } return c.toDataURL('image/png').split(',')[1]; }
    function sample(topic: string, text: string) { let p = currentRef.current; if (!p)
        return; if (reader || p.topic !== topic && p.blocks.length > 0) {
        p = create(topic === 'mitosis' ? 'How cells divide' : topic === 'doodle' ? 'Another little friend' : topic === 'language' ? 'A or an?' : 'Coordinates, untangled', topic);
    }
    else if (p.topic !== topic) {
        updatePage(old => ({ ...old, topic }));
        p = { ...p, topic };
    } setReader(false); void send(text, { page: p }); }
    const point = (e: React.PointerEvent<SVGSVGElement>): Point => { const r = e.currentTarget.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * WIDTH, (e.clientY - r.top) / r.height * (reader ? pdfHeight.current : pageHeight(currentRef.current!)), e.pointerType === 'pen' ? (e.pressure || .1) : .5]; };
    function eraseAt(pt: Point) { const p = currentRef.current; if (!p)
        return; const radius = 14; const hit = (s: Stroke) => s.points.some((a, i) => { const b = s.points[i + 1] || a, dx = b[0] - a[0], dy = b[1] - a[1], len = dx * dx + dy * dy, t = len ? Math.max(0, Math.min(1, ((pt[0] - a[0]) * dx + (pt[1] - a[1]) * dy) / len)) : 0; return Math.hypot(pt[0] - a[0] - t * dx, pt[1] - a[1] - t * dy) < radius; }); if (reader) {
        storeAnnotations(markedStrokes.current.filter(s => !hit(s)));
    }
    else
        updatePage(old => ({ ...old, strokes: old.strokes.filter(s => !hit(s)) }), false); }
    function down(e: React.PointerEvent<SVGSVGElement>) { if (turn || !currentRef.current || e.button !== 0 || pointerId.current !== null || penOnly && e.pointerType !== 'pen' || (e.target as Element).closest('button'))
        return; if (tool === 'select' && !reader) {
        return;
    } const p = point(e); if (tool === 'type' && !reader) {
        setTypePoint({ x: Math.max(40, Math.min(500, p[0])), y: Math.max(110, p[1]) });
        promptInput.current?.focus();
        return;
    } e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); pointerId.current = e.pointerId; clearTimeout(responseTimer.current); if (tool === 'erase') {
        erasing.current = true;
        if (!reader)
            updatePage(old => old);
        eraseAt(p);
        return;
    } if (tool === 'select') {
        selectionStart.current = p;
        setSelection({ x: p[0], y: p[1], right: p[0], bottom: p[1] });
        return;
    } drawing.current = { id: uid(), points: [p], color: tool === 'highlight' ? '#b1ad39' : color, size, tool: tool === 'highlight' ? 'highlight' : 'pen' }; paintCurrent(); }
    function paintCurrent() { const s = drawing.current, node = inkPath.current; if (!s || !node)
        return; if (s.tool === 'highlight') {
        node.setAttribute('d', strokeLine(s));
        node.setAttribute('fill', 'none');
        node.setAttribute('stroke', s.color);
        node.setAttribute('stroke-width', String(s.size * 6));
        node.setAttribute('opacity', '.28');
    }
    else {
        node.setAttribute('d', outline(s));
        node.setAttribute('fill', s.color);
        node.setAttribute('stroke', 'none');
        node.setAttribute('opacity', '1');
    } }
    function move(e: React.PointerEvent<SVGSVGElement>) { if (pointerId.current !== e.pointerId)
        return; const p = point(e); if (erasing.current) {
        eraseAt(p);
        return;
    } if (selectionStart.current) {
        const a = selectionStart.current;
        setSelection({ x: Math.min(a[0], p[0]), y: Math.min(a[1], p[1]), right: Math.max(a[0], p[0]), bottom: Math.max(a[1], p[1]) });
        return;
    } if (!drawing.current)
        return; const events = typeof e.nativeEvent.getCoalescedEvents === 'function' ? e.nativeEvent.getCoalescedEvents() : []; const r = e.currentTarget.getBoundingClientRect(), h = reader ? pdfHeight.current : pageHeight(currentRef.current!); const points: Point[] = events.length ? events.map(ev => [(ev.clientX - r.left) / r.width * WIDTH, (ev.clientY - r.top) / r.height * h, ev.pointerType === 'pen' ? (ev.pressure || .1) : .5]) : [p]; drawing.current.points.push(...points); paintCurrent(); }
    function up(e: React.PointerEvent<SVGSVGElement>) { if (pointerId.current !== e.pointerId)
        return; try {
        e.currentTarget.releasePointerCapture(e.pointerId);
    }
    catch { } pointerId.current = null; erasing.current = false; selectionStart.current = null; const s = drawing.current; drawing.current = null; inkPath.current?.setAttribute('d', ''); if (s) {
        if (s.points.length === 1)
            s.points.push([s.points[0][0] + .1, s.points[0][1] + .1, s.points[0][2]]);
        if (reader) {
            storeAnnotations([...markedStrokes.current, s]);
            const b = bounds([s]);
            if (b)
                setSelection(b);
            setUndoTick(t => t + 1);
        }
        else {
            updatePage(p => ({ ...p, strokes: [...p.strokes, s] }));
            if (auto && live)
                responseTimer.current = setTimeout(() => void send('', { ink: true }), 1600);
        }
    } }
    function cancel(e: React.PointerEvent<SVGSVGElement>) { if (pointerId.current === e.pointerId) {
        pointerId.current = null;
        drawing.current = null;
        erasing.current = false;
        selectionStart.current = null;
        inkPath.current?.setAttribute('d', '');
    } }
    function answer(id: string, choice: string) { updatePage(p => ({ ...p, blocks: p.blocks.map(b => b.id === id ? { ...b, selected: choice, feedback: feedbackFor(b, choice) } : b) })); }
    function typeOnPage(e: React.FormEvent) { e.preventDefault(); if (typePoint && prompt.trim()) {
        const b = block('user', prompt.trim(), typePoint.y, Math.max(60, Math.ceil(prompt.length / 50) * 43), { x: typePoint.x });
        updatePage(p => ({ ...p, blocks: [...p.blocks, b] }));
        setPrompt('');
        setTypePoint(null);
        setTool('pen');
    }
    else
        void send(); }
    function openReader() { if (!reader) beginTurn('forward'); const p = dataRef.current?.pages.find(p => !p.document); if (p) {
        setActive(p.id);
        activeRef.current = p.id;
    } pdfHeight.current = 1000; pdfBoxes.current = []; liveDocText.current = ''; setReader(true); setMobileOpen(false); setTool('select'); setZoom(100); setSelection(null); markedStrokes.current = []; setReadingText(''); stage.current?.scrollTo({ top: 0 }); }
    async function importFile(e: React.ChangeEvent<HTMLInputElement>) { const file = e.target.files?.[0]; if (!file)
        return; e.target.value = ''; if (file.size > 15 * 1024 * 1024) {
        toast.error('Please choose a PDF smaller than 15 MB.');
        return;
    } setUploading(true); try {
        const fd = new FormData();
        fd.append('file', file);
        const r = await fetch(apiPath(apiBase, '/api/documents'), { method: 'POST', body: fd });
        const d = await r.json() as {
            id: string;
            error?: string;
        };
        if (!r.ok)
            throw Error(d.error || 'Could not import this PDF.');
        const p = newPage(file.name.replace(/\.pdf$/i, ''), 'reading');
        p.paper = 'plain';
        p.document = { id: d.id, name: file.name, page: 1, total: 1 };
        mutate(n => ({ ...n, pages: [...n.pages, p] }));
        go(p.id);
        setReader(true);
        setTool('select');
        toast.success('PDF imported. Mark a passage to explore it.');
    }
    catch (e) {
        toast.error(e instanceof Error ? e.message : 'Import failed. Please try again.');
    }
    finally {
        setUploading(false);
    } }
    function storeAnnotations(strokes: Stroke[]) { markedStrokes.current = strokes; const p = currentRef.current; if (p) {
        const key = p.document ? String(p.document.page) : 'sample';
        updatePage(old => ({ ...old, annotations: { ...old.annotations, [key]: strokes } }), false);
    } setUndoTick(t => t + 1); }
    function selectedPassage() { if (!currentRef.current?.document) {
        const rect = readingPaper.current?.getBoundingClientRect();
        if (!selection || !rect)
            return 'Every point can be described by an ordered pair (x, y). The first number is its horizontal position, or abscissa. The second is its vertical position, or ordinate.';
        const scale = WIDTH / rect.width;
        const parts = Array.from(readingPaper.current?.querySelectorAll('.reader-excerpt p') || []).filter(el => { const r = el.getBoundingClientRect(); return (r.bottom - rect.top) * scale >= selection.y && (r.top - rect.top) * scale <= selection.bottom + 20; }).map(el => el.textContent);
        return parts.join(' ') || 'An ordered pair (x, y) locates a point: x across, y up.';
    } if (!selection)
        return liveDocText.current; const rect = readingPaper.current?.getBoundingClientRect(), c = readingPaper.current?.querySelector('canvas')?.getBoundingClientRect(); const offset = rect && c ? (c.top - rect.top) / rect.width * WIDTH : 0; const found = pdfBoxes.current.filter(b => b.y + offset + b.h >= selection.y - 12 && b.y + offset <= selection.bottom + 18 && b.x + b.w >= selection.x - 12 && b.x <= selection.right + 12).map(b => b.text).join(' '); return found || 'No text was found inside this mark. A live companion can inspect handwriting; try marking a text passage.'; }
    function openSource(id?: string) { if (!id || id === 'sample') {
        openReader();
        return;
    } const p = dataRef.current?.pages.find(p => p.id === id); if (p) {
        go(id);
        setReader(true);
        setTool('select');
    } }
    function explainReading() { const p = currentRef.current; if (!p)
        return; const selected = window.getSelection()?.toString().trim(); const sourceText = selected || selectedPassage(); const name = p.document ? `${p.document.name} · page ${p.document.page}` : 'A short guide to coordinates · page 1'; const note = newPage(p.document ? `${p.document.name.replace(/\.pdf$/i, '')} — notes` : 'A passage, understood', p.document ? topicFor(sourceText, 'reading') : 'coordinates'); note.blocks = [block('user', 'Help me understand this passage.', 122, 60, { source: name, sourcePageId: p.document ? p.id : 'sample' })]; if (!live) {
        if (p.document && note.topic === 'reading') {
            note.blocks.push(block('text', sourceText ? `The passage you marked:\n${sourceText.slice(0, 220)}\n\nYour source and ink are linked here.\nA live companion can explain any document.\nTry the sample reading for a worked explanation.` : 'Your marked page is linked here.\nThis PDF has no selectable text.\nA live companion can read the page visually.\nTry the sample reading for a worked explanation.', 225, 350, { source: name }));
        }
        else
            note.blocks.push(...replyFor('Explain coordinates', note, 230, name));
    } mutate(d => ({ ...d, pages: [...d.pages, note] })); go(note.id); if (live)
        void send(`Explain this selected passage: ${sourceText.slice(0, 6000)}`, { page: note, source: name });
    else
        setAnimated(note.blocks.slice(1).map(b => b.id)); }
    function exportPage() { if (!svg.current || !current)
        return; const clone = svg.current.cloneNode(true) as SVGSVGElement; clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); clone.setAttribute('width', String(WIDTH)); clone.setAttribute('height', String(pageHeight(current))); const style = document.createElementNS('http://www.w3.org/2000/svg', 'style'); style.textContent = '.ink-writing,.ink-caption,.ink-heading{font-family:cursive;fill:#536544;font-size:31px}.ink-user{fill:#414735;font-size:37px}.ink-small,.ink-caption{font-size:25px}.ink-line{fill:none;stroke:#61734b;stroke-width:2.3;stroke-linecap:round}.ink-soft{fill:#e0e4bf;stroke:#7a8b5c;stroke-width:2}.paper-kicker,.paper-date,.page-footer,.context-chip{font-family:sans-serif;font-size:12px;fill:#8b9278}.quiz-choices{display:flex;gap:8px}.quiz-choices button{font-size:22px;border:1px solid #819364;background:#e7eacb}.quiz-answer{font-size:22px;color:#536544}'; clone.insertBefore(style, clone.firstChild); const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); rect.setAttribute('width', '100%'); rect.setAttribute('height', '100%'); rect.setAttribute('fill', '#f3f0de'); clone.insertBefore(rect, style.nextSibling); const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml' })); const a = document.createElement('a'); a.href = url; a.download = current.title.replace(/[^a-z0-9]+/gi, '-') + '.svg'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 10000); toast.success('Page exported.'); }
    useEffect(() => { const key = (e: KeyboardEvent) => { if ((e.target as HTMLElement).matches('input,textarea,[contenteditable]'))
        return; if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo(e.shiftKey);
        return;
    } if (e.key === 'Escape') {
        setMobileOpen(false);
        setTypePoint(null);
        setSelection(null);
        setTool('select');
    } const mapping: Record<string, Tool> = { p: 'pen', h: 'highlight', e: 'erase', t: 'type', v: 'select' }; if (mapping[e.key.toLowerCase()] && !e.ctrlKey && !e.metaKey)
        setTool(mapping[e.key.toLowerCase()]); }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, [undoTick]);
    const pageIndex = data?.pages.findIndex(p => p.id === current?.id) ?? 0;
    const history = histories.current[active], height = current ? pageHeight(current) : 1000;
    const drawingHandlers = { onPointerDown: down, onPointerMove: move, onPointerUp: up, onPointerCancel: cancel };
    return <TooltipProvider delayDuration={250}><SidebarProvider className="app parchment" data-light={candlelight ? "candle" : "day"} data-visible={tabVisible} style={{ "--warmth": warmth / 100 } as React.CSSProperties}><button className={`mobile-scrim ${mobileOpen ? 'open' : ''}`} aria-label="Close notebook menu" onClick={() => setMobileOpen(false)}/><Sidebar collapsible="none" className={`rail ${mobileOpen ? 'open' : ''}`} aria-label="Notebook pages" inert={isMobile && !mobileOpen} aria-hidden={isMobile && !mobileOpen}><div className="brand"><Feather className="brand-mark" strokeWidth={1.2}/><div className="brand-name">Enchanted<span>notebook</span></div></div><button className="new-page" onClick={() => showDialog('new')}><Plus size={17}/>New page</button><div className="rail-label">YOUR NOTEBOOK</div><nav className="pages">{data?.pages.map((p, i) => <button key={p.id} onClick={() => { go(p.id); if (p.document) {
        setReader(true);
        setTool('select');
    } }} className={`page-link ${active === p.id && !reader ? 'active' : active === p.id && p.document ? 'active' : ''}`} aria-current={active === p.id ? 'page' : undefined}><span className="page-number">{String(i + 1).padStart(2, '0')}</span><span><b>{p.title}</b><small>{p.document ? 'Imported PDF' : p.topic === 'mitosis' ? 'A study in small beginnings' : p.topic === 'coordinates' ? 'Making room for understanding' : p.topic === 'doodle' ? 'An unhurried doodle' : p.topic === 'language' ? 'Words, sounds & little rules' : 'Room for a thought'}</small></span></button>)}</nav><div className="rail-label">READ & REFLECT</div><button className="reading-link" onClick={openReader}><BookOpen size={17}/>A short guide to coordinates</button><button className="reading-link" onClick={() => fileInput.current?.click()} disabled={uploading}>{uploading ? <LoaderCircle className="spinning"/> : <Plus size={17}/>}Import a PDF</button><input ref={fileInput} type="file" accept="application/pdf,.pdf" style={{ display: 'none' }} onChange={importFile}/><div className="rail-bottom"><div className="companion-label"><Sparkles size={17}/>{live ? 'Your companion is here' : 'A companion in the margins'}</div><p>Follow a thought.<br />See where the ink takes you.</p><span className="sample-badge">{live ? 'LIVE COMPANION' : 'INTERACTIVE DEMO'}</span><span className="release-label">alpha 0.2</span><div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}><button className="quiet-button" onClick={() => showDialog('help')}><HelpCircle size={15}/>How it works</button><button className="quiet-button" aria-label="Settings" onClick={() => showDialog('settings')}><Settings2 size={16}/></button></div></div></Sidebar>
 <main className="workbench" inert={isMobile && mobileOpen}><header className="topbar"><div className="breadcrumb"><button ref={menuButton} className="icon-button menu-button" aria-label="Open notebook menu" onClick={() => setMobileOpen(true)}><Menu /></button><span>My notebook</span><span>/</span><strong>{reader ? 'Reading room' : 'A place to think'}</strong></div><div className="top-actions"><ToolTip label={candlelight ? "Switch to daylight" : "Light the candle"}><button className="lighting-toggle" aria-label="Candlelight" aria-pressed={candlelight} onClick={() => setCandlelight(v => !v)}>{candlelight ? <Flame size={15} /> : <Sun size={15} />}<span>{candlelight ? "Candlelight" : "Daylight"}</span></button></ToolTip><button className={`saved ${saving === 'error' ? 'error' : ''}`} style={{ background: 'none', border: 0 }} onClick={() => saving === 'error' && (loadError ? void load() : data && save(data))} aria-disabled={saving !== 'error'}>{saving === 'saved' ? <Check size={13}/> : saving === 'error' ? <RotateCcw size={13}/> : <LoaderCircle size={13} className="spinning"/>}<span>{saving === 'saved' ? 'All changes saved' : saving === 'error' ? 'Retry saving' : saving === 'loading' ? 'Opening notebook' : 'Saving your ink'}</span></button><button className="text-action" onClick={exportPage} disabled={reader || !current}><Download size={17}/><span>Export page</span></button><button className="icon-button" aria-label="Notebook settings" onClick={() => showDialog('settings')}><MoreHorizontal /></button></div></header>{loadError && <div className="error-banner">Saved notes could not be opened. This session is temporary.<button onClick={() => void load()}>Try again</button></div>}
 {saveProblem && !loadError && <div className="error-banner" role="alert">{saveProblem}</div>}<div ref={stage} className="canvas-stage"><div className="stage-heading"><div>{reader ? <h1>{current?.document ? current.document.name : 'The reading room'}</h1> : <input className="rename-input" aria-label="Page title" value={current?.title || 'Opening your notebook…'} onChange={e => updatePage(p => ({ ...p, title: e.target.value.slice(0, 80) }), false)}/>}<div className="subline">{reader ? <><BookOpen size={13}/>Read a little. Wonder a little.</> : <><Leaf size={13}/>One thought can lead anywhere.</>}</div></div><div className="paper-controls"><DropdownMenu><DropdownMenuTrigger asChild><button className="icon-button" aria-label="Paper style" disabled={reader}><NotebookPen size={18}/></button></DropdownMenuTrigger><DropdownMenuContent align="end">{(['grid', 'lined', 'plain'] as const).map(p => <DropdownMenuItem key={p} onClick={() => updatePage(old => ({ ...old, paper: p }))}>{current?.paper === p && <Check size={14}/>} {p.charAt(0).toUpperCase() + p.slice(1)} paper</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu><button className="icon-button" aria-label={zoom === 100 ? 'Zoom in' : 'Fit page'} onClick={() => setZoom(z => z === 100 ? 135 : 100)}><Maximize2 size={17}/></button><span className="zoom-label" style={{ fontSize: 12 }}>{zoom}%</span></div></div>
 <div className="toolbar" role="toolbar" aria-label="Writing tools">{([{ id: 'pen', label: 'Pen (P)', icon: PenLine }, { id: 'highlight', label: 'Highlighter (H)', icon: Highlighter }, { id: 'erase', label: 'Eraser (E)', icon: Eraser }, { id: 'type', label: 'Place text (T)', icon: Type }, { id: 'select', label: reader ? 'Select a passage (V)' : 'Scroll / navigate (V)', icon: MousePointer2 }] as const).map(item => <ToolTip key={item.id} label={item.label}><button className={`tool ${tool === item.id ? 'active' : ''}`} aria-label={item.label} aria-pressed={tool === item.id} disabled={reader && item.id === 'type'} onClick={() => { setTool(item.id); setTypePoint(null); }}><item.icon strokeWidth={1.6}/></button></ToolTip>)}<div className="separator"/>{COLORS.map((c, i) => <ToolTip key={c} label={['Graphite ink', 'Moss ink', 'Sepia ink'][i]}><button aria-label={['Graphite ink', 'Moss ink', 'Sepia ink'][i]} aria-pressed={color === c} className={`color-dot ${color === c ? 'active' : ''}`} style={{ background: c }} onClick={() => { setColor(c); setTool('pen'); }}/></ToolTip>)}<Slider className="stroke-size" aria-label="Pen thickness" min={1.5} max={7} step={.5} value={[size]} onValueChange={v => setSize(v[0])}/><div className="separator"/><ToolTip label="Undo (⌘/Ctrl Z)"><button className="tool" aria-label="Undo" disabled={reader ? markedStrokes.current.length === 0 : !history?.undo.length} onClick={() => { if (reader) {
        storeAnnotations(markedStrokes.current.slice(0, -1));
        setSelection(null);
    }
    else
        undo(); }}><Undo2 size={17}/></button></ToolTip><ToolTip label="Redo (⌘/Ctrl Shift Z)"><button className="tool" aria-label="Redo" disabled={reader || !history?.redo.length} onClick={() => undo(true)}><Redo2 size={17}/></button></ToolTip></div>
 {!reader && current && <nav className="book-pagination" aria-label="Turn notebook pages"><button aria-label="Previous notebook page" disabled={pageIndex <= 0 || !!turn} onClick={() => turnPage('backward')}><ChevronLeft size={14}/><span>Previous</span></button><span aria-live="polite">Leaf {String(pageIndex + 1).padStart(2, '0')} <em>/</em> {String(data?.pages.length || 1).padStart(2, '0')}</span><button aria-label="Next notebook page" disabled={pageIndex >= (data?.pages.length || 1) - 1 || !!turn} onClick={() => turnPage('forward')}><span>Next</span><ChevronRight size={14}/></button></nav>}
 {current && <div className={`paper-shell ${reader ? 'reading-panel' : ''}`} style={zoom !== 100 ? { width: `${zoom}%`, maxWidth: `${782 * zoom / 100}px` } : undefined}><BookLayers /><div ref={readingPaper} className={`paper ${reader ? 'plain' : current.paper}`} style={!reader ? { aspectRatio: `${WIDTH}/${height}` } : {}}><ParchmentMaterial pageKey={`${current.id}:${reader}:${current.document?.page || 0}`} />{busy && <div className="writing-status" role="status"><Feather size={14} className="spinning"/>The ink is finding its words…</div>}{reader ? <><div className="reader-caption"><span>{current.document ? 'YOUR READING' : 'FROM THE READING ROOM'}</span><span>{current.document ? `${current.document.page} / ${current.document.total}` : '01 / 01'}</span></div>{current.document ? <PdfPage key={current.document.id} url={apiPath(apiBase, `/api/documents/${current.document.id}`)} pageNumber={current.document.page} onLoaded={(total, h, text, boxes) => { liveDocText.current = text; pdfBoxes.current = boxes; if (current.document?.total !== total)
        updatePage(p => ({ ...p, document: p.document ? { ...p.document, total } : undefined }), false); }}/> : <div className="reader-excerpt"><div className="eyebrow">A SMALL LESSON IN FINDING THINGS</div><h2>A point has a place.<br />Coordinates tell us where.</h2><p>Imagine two paths crossing at right angles. One runs across the page; the other runs up and down. Their meeting place is the <em>origin</em>.</p><div className="excerpt-focus"><p style={{ margin: 0 }}>Every point can be described by an ordered pair, <em>(x, y)</em>. The first number is its horizontal position, or <em>abscissa</em>. The second is its vertical position, or <em>ordinate</em>.</p></div><div className="formula">P = (3, 2)</div><p>To find P, start at the origin. Move three units to the right along the x-axis, then two units up. That little journey ends at one unique point.</p><svg viewBox="0 -35 620 260" style={{ width: '100%', height: 'auto', marginTop: 20 }}><Coordinates /></svg><div className="chapter-rule"/><p className="read-note">An original sample passage, prepared for this notebook.<br />Circle or highlight a thought, then choose “Explore this passage”.</p></div>}<svg className="reader-overlay" viewBox={`0 0 ${WIDTH} ${readerHeight}`} preserveAspectRatio="none" {...drawingHandlers}>{markedStrokes.current.map(s => <InkStroke key={s.id} stroke={s}/>)}<path ref={inkPath} strokeLinecap="round" strokeLinejoin="round"/>{selection && <rect className="selection-box" x={selection.x} y={selection.y} width={Math.max(4, selection.right - selection.x)} height={Math.max(4, selection.bottom - selection.y)}/>}</svg></> : <svg ref={svg} className={`ink-svg ${tool === 'select' || penOnly ? 'pan' : ''}`} viewBox={`0 0 ${WIDTH} ${height}`} {...drawingHandlers} aria-label="Notebook page. Draw with a pen, mouse, or touch. Use the text tool to place writing." role="group"><text className="paper-kicker" x="68" y="57">{current.topic === 'doodle' ? 'A MOMENT OF PLAY' : current.topic === 'free' ? 'A FRESH PAGE' : 'NOTES & LITTLE DISCOVERIES'}</text><text className="paper-date" textAnchor="end" x="692" y="57">{String((data?.pages.findIndex(p => p.id === current.id) || 0) + 1).padStart(2, '0')}</text><line x1="68" y1="78" x2="692" y2="78" stroke="#a3ab8866"/>{current.blocks.length === 0 && current.strokes.length === 0 && <><text x="68" y="160" className="page-empty-hint">What are you wondering about?</text><text x="68" y="206" className="page-empty-hint" style={{ fontSize: 27 }}>Make a mark. A thought. A little beginning.</text></>}{current.blocks.map(b => <InkBlock key={b.id} b={b} animated={animated.includes(b.id)} onAnswer={answer} onSource={openSource}/>)}{current.strokes.map(s => <InkStroke key={s.id} stroke={s}/>)}<path ref={inkPath} strokeLinecap="round" strokeLinejoin="round"/>{typePoint && <g><line x1={typePoint.x} y1={typePoint.y - 27} x2={typePoint.x} y2={typePoint.y + 8} stroke={color} strokeWidth="2"/><text x={typePoint.x + 10} y={typePoint.y} className="page-empty-hint" fontSize="25">Type below to write here…</text></g>}<text className="page-footer" x="380" y={height - 37} textAnchor="middle">ENCHANTED NOTEBOOK</text></svg>}</div>{turn && <TurningLeaf key={turn.id} turn={turn} surface={readingPaper} onFinish={finishTurn}/>}<PageGrip direction="backward" disabled={!!turn || (reader && current.document ? current.document.page <= 1 : pageIndex <= 0)} onTurn={() => reader && current.document ? turnPdf('backward') : turnPage('backward')}/><PageGrip direction="forward" disabled={!!turn || (reader && current.document ? current.document.page >= current.document.total : pageIndex >= (data?.pages.length || 1) - 1)} onTurn={() => reader && current.document ? turnPdf('forward') : turnPage('forward')}/></div>}
 {reader && <><div className="reader-actions"><button onClick={explainReading}><Sparkles size={16}/>Explore this passage<ArrowUpRight size={15}/></button><button onClick={() => { const p = dataRef.current?.pages.find(p => !p.document); if (p)
        go(p.id);
    else
        setReader(false); markedStrokes.current = []; }}><PenLine size={16}/>Back to notebook</button></div>{current?.document && <div className="reader-pager"><button className="icon-button" aria-label="Previous PDF page" disabled={current.document.page <= 1 || !!turn} onClick={() => turnPdf('backward')}><ChevronLeft /></button><span>Page {current.document.page} of {current.document.total}</span><button className="icon-button" aria-label="Next PDF page" disabled={current.document.page >= current.document.total || !!turn} onClick={() => turnPdf('forward')}><ChevronRight /></button></div>}</>}
 </div>
 <footer className="composer-area"><div className="suggestions"><span>A little inspiration</span><button disabled={busy} onClick={() => sample('mitosis', 'Show me how cells divide.')}><FlaskConical />Cells divide</button><button disabled={busy} onClick={() => sample('doodle', 'Draw a happy guy.')}><Smile />Draw something</button><button disabled={busy} onClick={() => sample('language', 'Make a table comparing a and an.')}><Table2 />A or an?</button><button disabled={busy || !current} onClick={() => void send('Quiz me on this topic.')}><GraduationCap />Quiz me</button></div><form className="composer" onSubmit={typeOnPage}><PenLine size={18}/><input ref={promptInput} aria-label={typePoint ? 'Text to place on page' : 'Write to your companion'} value={prompt} maxLength={1000} onChange={e => setPrompt(e.target.value)} placeholder={typePoint ? 'Write something here, then place it on the page…' : reader ? 'Explore a passage, or ask about your reading…' : 'Write a thought… the page will write back.'}/>{!reader && <ToolTip label={live ? 'Read my new handwriting' : 'Try a handwriting reply'}><button type="button" className="icon-button" aria-label="Read my ink" disabled={busy || !current?.strokes.length} onClick={() => void send('', { ink: true })}><Sparkles size={17}/></button></ToolTip>}<ToolTip label={typePoint ? 'Place on the page' : 'Write to companion'}><button className="send-button" aria-label={typePoint ? 'Place text' : 'Send thought'} disabled={busy || !prompt.trim()}>{busy ? <LoaderCircle className="spinning"/> : <ArrowUp />}</button></ToolTip></form><div className="composer-hint"><span>{live ? 'Write freely. Your companion replies on the page.' : 'Sample replies · cells, coordinates, language & doodles'}</span><span>Pen, touch, or a little typing.</span></div></footer></main></SidebarProvider>
 <Dialog open={newOpen} onOpenChange={setNewOpen}><DialogContent className="modal vellum-dialog" onCloseAutoFocus={restoreNotebookFocus}><DialogHeader><DialogTitle>A fresh page.</DialogTitle><DialogDescription>Give this thought a place to begin.</DialogDescription></DialogHeader><form onSubmit={e => { e.preventDefault(); create(); }}><label className="modal-label" htmlFor="new-title">Page title</label><input autoFocus id="new-title" className="modal-field" value={newTitle} maxLength={80} placeholder="What’s on your mind?" onChange={e => setNewTitle(e.target.value)}/><button className="modal-primary" style={{ marginTop: 18 }} type="submit">Open a new page</button></form></DialogContent></Dialog>
 <Dialog open={settings} onOpenChange={setSettings}><DialogContent className="modal vellum-dialog" onCloseAutoFocus={restoreNotebookFocus}><DialogHeader><DialogTitle>Make yourself at home.</DialogTitle><DialogDescription>A few small things for the way you write.</DialogDescription></DialogHeader><div className="settings-row"><div>Candlelight<small>A living glow across the parchment.</small></div><Switch aria-label="Candlelight setting" checked={candlelight} onCheckedChange={setCandlelight}/></div><div className="light-setting"><label htmlFor="light-warmth">Light warmth <span>{warmth}%</span></label><Slider id="light-warmth" aria-label="Light warmth" min={20} max={100} step={5} value={[warmth]} onValueChange={v => setWarmth(v[0])} disabled={!candlelight}/><small>Your motion preference is respected.</small></div><div className="settings-row"><div>Stylus only<small>Let your finger scroll; use a pen to draw.</small></div><Switch aria-label="Stylus only" checked={penOnly} onCheckedChange={setPenOnly}/></div><div className="settings-row"><div>Reply when I pause<small>{live ? 'The companion responds after a short pause.' : 'Available with a live handwriting companion.'}</small></div><Switch aria-label="Reply when I pause" checked={auto && live} onCheckedChange={setAuto} disabled={!live}/></div><div className="settings-row"><div>Companion<small>{live ? 'Connected. Your ink is interpreted by AI.' : 'Sample mode. No live AI is connected.'}</small></div><Sparkles size={19}/></div><p>{live ? 'Only new ink and relevant note context are sent for a reply.' : 'Sample prompts work without an AI account. Freehand drawing, PDF reading, notes, and quizzes are interactive. Understanding arbitrary handwriting and documents needs a live AI connection.'}</p><details className="release-history"><summary>Development journal · alpha 0.2</summary><p><b>Alpha 0.2 — Candlelit vellum</b><br />Layered parchment, moving light, physical page turns, and clearer dialogs.</p><p><b>Alpha 0.1 — Original notebook</b><br />Preserved as the first development milestone.</p></details><button className="modal-primary" onClick={() => setSettings(false)}>Back to my notebook</button></DialogContent></Dialog>
 <Dialog open={help} onOpenChange={setHelp}><DialogContent className="modal vellum-dialog" onCloseAutoFocus={restoreNotebookFocus}><DialogHeader><DialogTitle>Think with your hands.</DialogTitle><DialogDescription>Everything happens here, on the page.</DialogDescription></DialogHeader><div className="help-list"><div><BookOpen/><span><b>Turn a leaf.</b> Use Previous / Next, choose a page in your notebook, or pull a page-edge tab inward. The writing area stays yours to draw on.</span></div><div><PenLine /><span><b>Make your mark.</b> Draw with a mouse, finger, or stylus. Use the highlighter, eraser, and undo to find your flow.</span></div><div><Sparkles /><span><b>Follow a thought.</b> Try an inspiration prompt or type a question about cells, coordinates, “a” versus “an”, or a happy doodle.</span></div><div><BookOpen /><span><b>Read and wonder.</b> Open the sample reading or import a PDF. Mark a passage, then create a linked note.</span></div><div><GraduationCap /><span><b>Make it stick.</b> Ask “Quiz me”, pick an answer on the page, and learn from the feedback.</span></div></div><p>Notes save automatically. The demo uses sample companion replies; open-ended handwriting recognition requires a live AI connection.</p><button className="modal-primary" onClick={() => setHelp(false)}>Let’s make a little ink</button></DialogContent></Dialog><Toaster position="bottom-right" richColors theme="dark"/></TooltipProvider>;
}
