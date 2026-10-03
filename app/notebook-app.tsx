'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PenLine, Highlighter, Eraser, Type, MousePointer2, Undo2, Redo2, Plus, BookOpen, FileText, ChevronLeft, ChevronRight, ChevronDown, ArrowUp, ArrowUpRight, Check, Download, Menu, X, Sparkles, Settings2, HelpCircle, Maximize2, LoaderCircle, Leaf, FlaskConical, Smile, Table2, GraduationCap, Feather, Link2, NotebookPen, MoreHorizontal, RotateCcw, Flame, Sun } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Toaster, toast } from 'sonner';
import { type Page, type Block, type Stroke, type Point, type Tool, type Notebook, type ReplyFont, type ReplyFormat, initialNotebook, newPage, uid, block, nextY, pageHeight, replyFor, topicFor, feedbackFor, bounds, WIDTH } from '@/lib/notebook';
import { InkStroke, InkBlock, HandText, outline, strokeLine, Coordinates } from './ink-art';
import PdfPage from './pdf-page';
import { BookLayers, ParchmentMaterial } from './parchment-material';
import './parchment.css';
import './folio.css';
import './diary.css';
import { chooseFormat, presentReply, mediaReply, replyHeight } from '@/lib/reply-presentation';
import { consumeCompanionStream } from '@/lib/companion-stream';
import { measurePaper } from '@/lib/paper-plane';
import { OriginalInk } from './original-ink';
import {CompanionSettings,Choice} from './companion-settings';
import {useInkFlow} from './use-ink-flow';
import {visibleInkText} from '@/lib/ink-text';
import {INPUT_END_MS} from '@/lib/ink-cycle';
import {eraseStroke} from '@/lib/erase-ink';
import type {CompanionStatus} from '@/lib/companion-types';
import { useBookTurn, TurningLeaf, PageGrip } from './book-turn';
import { NotebookJournal, journalScope, recoverNotebook, type JournalEntry } from '@/lib/notebook-journal';
import { SaveIndicator, type SaveState } from './save-indicator';
const FONTS: Record<ReplyFont, string> = { hand: 'Handwritten', book: 'Book serif', mono: 'Typewriter' };
const FORMATS: Record<ReplyFormat, string> = { auto: 'Automatic', text: 'Plain text', emoji: 'With emojis', table: 'Table', sticker: 'Sticker', picture: 'Picture', video: 'Video' };
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
    const [companionStatus,setCompanionStatus]=useState<CompanionStatus|null>(null),[crossNotebook,setCrossNotebook]=useState(false),[runLabel,setRunLabel]=useState(''),[newBook,setNewBook]=useState(false);
    const [candlelight, setCandlelight] = useState(true), [warmth, setWarmth] = useState(65), [tabVisible, setTabVisible] = useState(true), [preferencesLoaded, setPreferencesLoaded] = useState(false);
    const [depth, setDepth] = useState(true), [replyFont, setReplyFont] = useState<ReplyFont>('hand'), [replyFormat, setReplyFormat] = useState<ReplyFormat>('auto'), [originalOpen, setOriginalOpen] = useState(false), [composing, setComposing] = useState(false), [dissolving, setDissolving] = useState<string[]>([]), [streamingId, setStreamingId] = useState(''), [announcement, setAnnouncement] = useState(''), [controlsOpen, setControlsOpen] = useState(false);
    const pendingInk = useRef<Record<string, Set<string>>>({}), promptRef = useRef(''), draftPages = useRef<Record<string, string>>({}), abortReply = useRef<AbortController | null>(null), paperMap = useRef<ReturnType<typeof measurePaper> | null>(null), paperMapHeight = useRef(1000), folio = useRef<HTMLDivElement>(null), lightFrame = useRef(0);
    const menuButton = useRef<HTMLButtonElement>(null);
    useEffect(() => { const visibility = () => setTabVisible(!document.hidden); visibility(); document.addEventListener('visibilitychange', visibility); return () => document.removeEventListener('visibilitychange', visibility); }, []);
    const [data, setData] = useState<Notebook | null>(null), [active, setActive] = useState(''), [tool, setTool] = useState<Tool>('pen'), [color, setColor] = useState(COLORS[0]), [size, setSize] = useState(3.2), [prompt, setPrompt] = useState('');
    const [saving, setSaving] = useState<SaveState>('loading'), [loadError, setLoadError] = useState(false), [live, setLive] = useState(false), [busy, setBusy] = useState(false), [auto, setAuto] = useState(true), [penOnly, setPenOnly] = useState(false), [settings, setSettings] = useState(false), [help, setHelp] = useState(false), [newOpen, setNewOpen] = useState(false), [newTitle, setNewTitle] = useState(''), [mobileOpen, setMobileOpen] = useState(false), [reader, setReader] = useState(false), [zoom, setZoom] = useState(100), [animated, setAnimated] = useState<string[]>([]), [typePoint, setTypePoint] = useState<{
        x: number;
        y: number;
    } | null>(null), [undoTick, setUndoTick] = useState(0), [selection, setSelection] = useState<{
        x: number;
        y: number;
        right: number;
        bottom: number;
    } | null>(null), [readingText, setReadingText] = useState(''), [uploading, setUploading] = useState(false), [readerHeight, setReaderHeight] = useState(1000), [saveProblem, setSaveProblem] = useState('');
    const current = data?.pages.find(p => p.id === active) || data?.pages[0];
    const journal = useRef<NotebookJournal | null>(null);
    const pendingSave = useRef<JournalEntry | undefined>(undefined);
    const syncBlocked = useRef(false);
    const [recoveryNeeded, setRecoveryNeeded] = useState(false);
    const loadSequence = useRef(0);
    const syncing = useRef(false);
    const deviceSaveFailed = useRef(false);
    const remoteCopy = useRef<Notebook | null>(null);
    const revision = useRef(0), dataRef = useRef<Notebook | null>(null), activeRef = useRef(''), currentRef = useRef<Page | undefined>(undefined), dirtyRef = useRef(false), loadedRef = useRef(false), saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined), saveChain = useRef<Promise<unknown>>(Promise.resolve()), responseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined), busyRef = useRef(false), stage = useRef<HTMLDivElement>(null), svg = useRef<SVGSVGElement>(null), inkPath = useRef<SVGPathElement>(null), drawing = useRef<Stroke | null>(null), pointerId = useRef<number | null>(null), erasing = useRef(false), selectionStart = useRef<Point | null>(null), histories = useRef<Record<string, {
        undo: Page[];
        redo: Page[];
    }>>({}), fileInput = useRef<HTMLInputElement>(null), promptInput = useRef<HTMLInputElement>(null), pdfHeight = useRef(1000), markedStrokes = useRef<Stroke[]>([]), mounted = useRef(true), liveDocText = useRef(''), readingPaper = useRef<HTMLDivElement>(null), pdfBoxes = useRef<Array<{
        text: string;
        x: number;
        y: number;
        w: number;
        h: number;
    }>>([]);
    const flow=useInkFlow({apiBase,status:companionStatus,activeId:active,surface:readingPaper,readPage:id=>dataRef.current?.pages.find(p=>p.id===id),updatePage,reply:(text,page,ids)=>respond(text,{page,inputIds:ids})});
    const books=data?.books?.length?data.books:[{id:'main',title:'My notebook'}],bookId=current?.notebookId||'main',visiblePages=data?.pages.filter(p=>(p.notebookId||'main')===bookId)||[];
    const { turn, beginTurn, finishTurn } = useBookTurn(readingPaper);
    useEffect(() => { if (!reader || !readingPaper.current)
        return; const observer = new ResizeObserver(() => { const el = readingPaper.current; if (el && el.offsetWidth) {
        const h = el.offsetHeight / el.offsetWidth * WIDTH;
        pdfHeight.current = h;
        setReaderHeight(h);
    } }); observer.observe(readingPaper.current); return () => observer.disconnect(); }, [reader, active]);
    useEffect(() => { if (reader && current) {
        const key = current.document ? String(current.document.page) : 'sample';
        markedStrokes.current = current.annotations?.[key] || [];
        setUndoTick(t => t + 1);
    } }, [reader, active, current?.document?.page]);
    useEffect(() => { currentRef.current = current; activeRef.current = active; dataRef.current = data; }, [data, active, current]);
    const load = useCallback(async () => {
      const sequence = ++loadSequence.current;
      setSaving('loading');
      try {
        const r = await fetch(apiPath(apiBase, '/api/notebook'));
        if (!r.ok)
            throw Error('Your saved notebook could not be opened.');
        const payload = await r.json() as {
            notebook: Notebook | null;
            version: number;
            owner: string;
        };
        if (sequence !== loadSequence.current || !mounted.current) return;
        revision.current = payload.version;
        remoteCopy.current = payload.notebook;
        setSaveProblem('');
        journal.current = new NotebookJournal(localStorage, journalScope(apiBase, payload.owner));
        const recovery = recoverNotebook(journal.current.read(), payload.notebook, payload.version);
        recovery.acknowledged.forEach(entry => journal.current!.acknowledge(entry));
        pendingSave.current = recovery.selected;
        syncBlocked.current = recovery.conflict;
        setRecoveryNeeded(recovery.conflict);
        const next: Notebook = structuredClone(recovery.selected?.notebook || payload.notebook || initialNotebook());
        next.books ||= [{id:'main',title:'My notebook'}];
        dataRef.current = next;
        setData(next);
        setActive(next.pages[0].id);
        activeRef.current = next.pages[0].id;
        loadedRef.current = true;
        setLoadError(false);
        if (recovery.conflict) {
            setSaveProblem('Your device and server have different copies. Your device copy is open. Export the recovery copies before resolving these changes.');
            setSaving('local');
        } else if (recovery.selected || !payload.notebook) {
            pendingSave.current = journal.current.write(next, payload.version, recovery.selected);
            dirtyRef.current = true;
            setSaving('local');
        } else {
            dirtyRef.current = false;
            setSaving('saved');
        }
    }
    catch (cause) {
        if (sequence !== loadSequence.current || !mounted.current) return;
        if (loadedRef.current) deviceSaveFailed.current = true;
        setLoadError(!loadedRef.current);
        setSaving('error');
        setSaveProblem(cause instanceof Error ? cause.message : 'Your saved notebook could not be opened.');
    } }, [apiBase]);
    useEffect(() => { mounted.current = true; void load(); fetch(apiPath(apiBase, '/api/companion/settings')).then(r=>r.json()).then(d=>{const status=d as CompanionStatus;if(status.config){setCompanionStatus(status);setLive(status.live);}}).catch(()=>{}); try {
        const prefs = JSON.parse(localStorage.getItem('enchanted-preferences') || '{}');
        setPenOnly(!!prefs.penOnly);
        setAuto(prefs.flowEnabled !== false);
        setDepth(prefs.depth !== false);
        if (['hand','book','mono'].includes(prefs.replyFont)) setReplyFont(prefs.replyFont);
        if (['auto','text','emoji','table','sticker','picture','video'].includes(prefs.replyFormat)) setReplyFormat(prefs.replyFormat);
        setCandlelight(prefs.candlelight !== false);
        if (typeof prefs.warmth === 'number' && Number.isFinite(prefs.warmth)) setWarmth(Math.max(20, Math.min(100, prefs.warmth)));
    }
    catch { } setPreferencesLoaded(true); return () => { mounted.current = false; clearTimeout(responseTimer.current); clearTimeout(saveTimer.current); abortReply.current?.abort(); cancelAnimationFrame(lightFrame.current); }; }, [apiBase, load]);
    useEffect(() => { if (!preferencesLoaded) return; try {
        localStorage.setItem('enchanted-preferences', JSON.stringify({ flowEnabled: auto, penOnly, candlelight, warmth, depth, replyFont, replyFormat }));
    }
    catch { } }, [auto, penOnly, candlelight, warmth, depth, replyFont, replyFormat, preferencesLoaded]);
    const save = useCallback(async () => {
        if (!loadedRef.current || syncing.current || syncBlocked.current || deviceSaveFailed.current || !journal.current) return;
        syncing.current = true;
        try {
            while (pendingSave.current && !deviceSaveFailed.current) {
                const entry = pendingSave.current;
                const response = await fetch(apiPath(apiBase, '/api/notebook'), {
                    method: 'PUT',
                    headers: { 'content-type': 'application/json', 'X-Notebook-Version': String(entry.baseVersion) },
                    body: JSON.stringify(entry.notebook),
                });
                const result = await response.json() as { version?: number; error?: string };
                if (!response.ok) {
                    if (response.status === 409) {
                        syncBlocked.current = true;
                        setRecoveryNeeded(true);
                    }
                    throw new Error(result.error || 'Sync failed. Your device copy is retained. Retry when connected.');
                }
                if (!Number.isSafeInteger(result.version) || result.version! <= entry.baseVersion) {
                    throw new Error('The server did not confirm a saved version. Your device copy is retained.');
                }
                revision.current = result.version!;
                remoteCopy.current = entry.notebook;
                if (pendingSave.current?.id === entry.id) {
                    journal.current.acknowledge(entry);
                    pendingSave.current = undefined;
                } else if (pendingSave.current) {
                    pendingSave.current = journal.current.write(pendingSave.current.notebook, result.version!, pendingSave.current);
                    journal.current.acknowledge(entry);
                }
            }
            if (!deviceSaveFailed.current) {
                dirtyRef.current = false;
                if (mounted.current) { setSaveProblem(''); setSaving('saved'); }
            }
        } catch (cause) {
            if (mounted.current) {
                setSaving(deviceSaveFailed.current ? 'error' : pendingSave.current ? 'local' : 'error');
                setSaveProblem(cause instanceof Error ? cause.message : 'Sync failed. Retry when connected.');
            }
        } finally {
            syncing.current = false;
        }
    }, [apiBase]);
    useEffect(() => { if (data && dirtyRef.current && loadedRef.current) {
        clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => { void save(); }, 650);
    } return () => clearTimeout(saveTimer.current); }, [data, save]);
    useEffect(() => {
        const reconnect = () => { void save(); };
        window.addEventListener('online', reconnect);
        return () => window.removeEventListener('online', reconnect);
    }, [save]);
    function mutate(fn: (d: Notebook) => Notebook) {
        const old = dataRef.current; if (!old) return;
        const next = fn(old); dataRef.current = next; dirtyRef.current = true;
        currentRef.current = next.pages.find(p => p.id === activeRef.current) || next.pages[0];
        setData(next); setSaving('saving');
        try {
            if (!journal.current) throw new Error('Open your saved notebook before writing.');
            pendingSave.current = journal.current.write(next, revision.current, pendingSave.current);
            deviceSaveFailed.current = false;
            setSaving('local');
        } catch (cause) {
            // 保存失败时保留当前页面，界面明确显示未保存状态。
            dirtyRef.current = false;
            deviceSaveFailed.current = true;
            setSaving('error');
            setSaveProblem(cause instanceof Error ? cause.message : 'Device saving failed. Keep this tab open and export your page.');
        }
    }
    function retrySave() {
        if (loadError) { void load(); return; }
        if (syncBlocked.current) return;
        if (dataRef.current && journal.current && saving === 'error') {
            mutate(() => dataRef.current!);
        }
        if (dirtyRef.current) void save();
    }
    function exportRecovery() {
        const blob = new Blob([JSON.stringify({ current: dataRef.current, server: remoteCopy.current, pending: journal.current?.read() }, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob), link = document.createElement('a');
        link.href = url; link.download = 'notebook-recovery.json'; link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    function updatePage(fn: (p: Page) => Page, history = true, id = activeRef.current) { const old = dataRef.current?.pages.find(p => p.id === id); if (!old)
        return; if (history) {
        const h = histories.current[id] || (histories.current[id] = { undo: [], redo: [] });
        h.undo.push(structuredClone(old));
        h.undo = h.undo.slice(-35);
        h.redo = [];
        setUndoTick(t => t + 1);
    } mutate(d => ({ ...d, pages: d.pages.map(p => p.id === id ? fn(p) : p) })); }
    function undo(redo = false) { if (busyRef.current) return; const id = activeRef.current, h = histories.current[id], p = dataRef.current?.pages.find(p => p.id === id); if (!h || !p)
        return; const from = redo ? h.redo : h.undo, to = redo ? h.undo : h.redo, previous = from.pop(); if (!previous)
        return; flow.inputStart(id); to.push(structuredClone(p)); updatePage(() => previous, false); setUndoTick(t => t + 1); }
    function go(id: string) { abortReply.current?.abort(); draftPages.current[activeRef.current] = promptRef.current; const draft = draftPages.current[id] || ''; promptRef.current = draft; setPrompt(draft); if (id !== activeRef.current || reader) { const pages = dataRef.current?.pages || []; const from = pages.findIndex(p => p.id === activeRef.current), to = pages.findIndex(p => p.id === id); beginTurn(to >= 0 && to < from ? 'backward' : 'forward'); } clearTimeout(responseTimer.current); setActive(id); activeRef.current = id; currentRef.current = dataRef.current?.pages.find(p => p.id === id); setReader(false); setSelection(null); setTypePoint(null); setMobileOpen(false); setAnimated([]); setDissolving([]); setZoom(100); markedStrokes.current = []; stage.current?.scrollTo({ top: 0 }); }
    function turnPage(direction: 'forward' | 'backward') { if (pointerId.current !== null) return; const pages = dataRef.current?.pages.filter(p=>(p.notebookId||'main')===(currentRef.current?.notebookId||'main')) || []; const index = pages.findIndex(p => p.id === activeRef.current), next = pages[index + (direction === 'forward' ? 1 : -1)]; if (next) { go(next.id); if (next.document) { setReader(true); setTool('select'); } } }
    function turnPdf(direction: 'forward' | 'backward') { const doc = currentRef.current?.document; if (!doc || pointerId.current !== null) return; const next = doc.page + (direction === 'forward' ? 1 : -1); if (next < 1 || next > doc.total) return; beginTurn(direction); updatePage(p => ({ ...p, document: p.document ? { ...p.document, page: next } : undefined }), false); markedStrokes.current = []; setSelection(null); stage.current?.scrollTo({ top: 0 }); }
    function showDialog(kind: 'new' | 'help' | 'settings') { setMobileOpen(false); if (kind === 'new') {setNewBook(false);setNewOpen(true);} else if (kind === 'help') setHelp(true); else setSettings(true); }
    function restoreNotebookFocus(event: Event) { event.preventDefault(); if (isMobile) menuButton.current?.focus({ preventScroll: true }); else promptInput.current?.focus({ preventScroll: true }); }
    function create(title=newTitle,topic='free') {const p=newPage(title.trim()||'Untitled thought',topic);p.notebookId=currentRef.current?.notebookId||'main';mutate(d=>({...d,pages:[...d.pages,p]}));go(p.id);setNewOpen(false);setNewTitle('');return p;}
    function createNotebook(){const id=uid(),p=newPage('A fresh beginning');p.notebookId=id;mutate(d=>({...d,books:[...(d.books||[{id:'main',title:'My notebook'}]),{id,title:newTitle.trim()||'My new notebook'}],pages:[...d.pages,p]}));go(p.id);setNewOpen(false);setNewTitle('');}
    function scrollToWriting(y: number) {
        setTimeout(() => {
            if (!stage.current || !svg.current || drawing.current) return;
            const blocks = Array.from(svg.current.querySelectorAll<SVGGElement>('[data-block-y]'));
            const target = blocks.sort((a, b) => Math.abs(Number(a.dataset.blockY) - y) - Math.abs(Number(b.dataset.blockY) - y))[0];
            const top = target ? stage.current.scrollTop + target.getBoundingClientRect().top - stage.current.getBoundingClientRect().top - (isMobile ? 70 : 105) : Math.max(0, y * svg.current.getBoundingClientRect().width / WIDTH - 180);
            stage.current.scrollTo({ top: Math.max(0, top), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        }, 80);
    }
    function editPrompt(value:string){flow.inputStart(activeRef.current);abortReply.current?.abort();promptRef.current=value;setPrompt(value);}
    function stopReply(){abortReply.current?.abort();flow.restore(activeRef.current);setAnimated([]);}
    function restoreInk(exchange:string){flow.inputStart(activeRef.current);updatePage(p=>({...p,blocks:p.blocks.filter(b=>b.exchangeId!==exchange&&b.recognitionId!==exchange&&!(b.recognitionId&&b.absorbedBy===exchange)).map(b=>b.absorbedBy===exchange?{...b,absorbedBy:undefined,pendingInput:true}:b),strokes:p.strokes.map(s=>s.absorbedBy===exchange?{...s,absorbedBy:undefined}:s)}));setDissolving([]);toast.success('Your original ink is back on the page.');}
    async function send(text=promptRef.current,options:{source?:string;page?:Page;ink?:boolean;automatic?:boolean;sample?:boolean}={}){let p=options.page||currentRef.current;if(!p||busyRef.current)return;if(options.sample){await respond(text,{...options,page:p});return;}if(reader&&!options.page)p=create('A question from my reading',p.topic);if(text.trim()){const input=block('user',text.trim(),typePoint?.y||nextY(p),replyHeight(text,'hand',44),{x:typePoint?.x||68,pendingInput:true,source:options.source});updatePage(old=>({...old,blocks:[...old.blocks,input]}),true,p.id);promptRef.current='';setPrompt('');draftPages.current[p.id]='';setTypePoint(null);}flow.begin(p.id);}
    async function respond(text:string,options:{source?:string;page:Page;sample?:boolean;inputIds?:string[]}){
        const p=options.page,pageId=p.id;if(busyRef.current||activeRef.current!==pageId){flow.restore(pageId);return;}
        if(!live&&!options.sample){flow.restore(pageId);toast.message('Connect AI in Settings → Models for a reply to your writing.',{action:{label:'Settings',onClick:()=>showDialog('settings')}});return;}
        const inputIds=new Set(options.inputIds||[]),inputs=p.blocks.filter(b=>inputIds.has(b.id)),inkIds=new Set(inputs.flatMap(b=>b.inkIds||[])),exchange=uid(),controller=new AbortController();abortReply.current=controller;
        const y=inputs.length?Math.min(...inputs.map(b=>b.y)):nextY(p),font=replyFont,format=chooseFormat(text,replyFormat);busyRef.current=true;setBusy(true);setAnnouncement('');setSelection(null);
        let committed=false,latest='',streamBlock:Block|undefined,flushTimer:ReturnType<typeof setTimeout>|undefined;const artifacts:Block[]=[];
        const commit=(replies:Block[])=>{if(!mounted.current||committed||controller.signal.aborted)return;committed=true;setAnimated(replies.map(b=>b.id));updatePage(old=>({...old,strokes:old.strokes.map(s=>inkIds.has(s.id)?{...s,absorbedBy:exchange}:s),blocks:[...old.blocks.map(b=>inputIds.has(b.id)?{...b,absorbedBy:exchange,pendingInput:false}:b),...replies.map(b=>({...b,exchangeId:exchange}))]}),true,pageId);};
        const flush=()=>{clearTimeout(flushTimer);flushTimer=undefined;if(!latest||!streamBlock||!mounted.current||controller.signal.aborted)return;if(!committed){streamBlock={...streamBlock,text:latest,h:replyHeight(latest,font)};commit([streamBlock]);}else updatePage(old=>({...old,blocks:old.blocks.map(b=>b.id===streamBlock!.id?{...b,text:latest,h:replyHeight(latest,font)}:b)}),false,pageId);};
        try{if(options.sample){const replies=presentReply(text,p,y,format,font,options.source);commit(replies);setAnnouncement(replies.filter(b=>b.kind==='text').map(b=>b.text).join(' '));}
        else{streamBlock=block('text','',y,60,{font,source:options.source});setStreamingId(streamBlock.id);const res=await fetch(apiPath(apiBase,'/api/companion'),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({prompt:text,format,notebookId:p.notebookId||'main',pageId,crossNotebook,context:p.blocks.filter(b=>!inputIds.has(b.id)&&(b.kind==='text'||b.kind==='user')).slice(-8).map(b=>({role:b.kind==='user'?'user':'assistant',text:visibleInkText(b)})),source:options.source||'',documentText:liveDocText.current.slice(0,10000)}),signal:controller.signal});
        await consumeCompanionStream(res,partial=>{latest=partial;if(!committed)flush();else if(!flushTimer)flushTimer=setTimeout(flush,60);},controller.signal,event=>{if(event.type==='route'){setRunLabel(event.run.model+' · '+event.run.reason);streamBlock!.runId=event.run.id;}if(event.type==='status')setAnnouncement(event.message);if(event.type==='memory')toast.message(event.message);if(event.type==='citations'){streamBlock!.citations=event.citations;updatePage(old=>({...old,blocks:old.blocks.map(b=>b.id===streamBlock!.id?{...b,citations:event.citations}:b)}),false,pageId);}if(event.type==='artifact')artifacts.push(block(event.kind,event.caption,0,event.kind==='sticker'?270:435,{mediaUrl:event.url,font}));});flush();
        if(artifacts.length){let cursor=y+replyHeight(latest,font)+30;updatePage(old=>({...old,blocks:[...old.blocks,...artifacts.map(b=>{const next={...b,y:cursor,exchangeId:exchange};cursor+=b.h+24;return next;})]}),false,pageId);}
        if(format==='table'){const rows=latest.trim().split('\n').filter(r=>r.includes('|')&&!/^[\s|:-]+$/.test(r)).slice(0,8);if(rows.length>1)updatePage(old=>({...old,blocks:old.blocks.map(b=>b.id===streamBlock!.id?{...b,kind:'table',text:rows.map(r=>r.replace(/^\||\|$/g,'').split('|').slice(0,3).map(c=>c.trim().slice(0,27)).join('|')).join('\n'),h:rows.length*42+30}:b)}),false,pageId);}
        setAnnouncement(latest);setCrossNotebook(false);}
        }catch(e){flush();if(!committed)flow.restore(pageId);toast.error(e instanceof Error&&e.name==='AbortError'?'Reply stopped. Your ink and any partial reply are kept.':e instanceof Error?e.message:'Could not get a reply. Your ink is kept.');}
        finally{clearTimeout(flushTimer);if(abortReply.current===controller)abortReply.current=null;busyRef.current=false;if(mounted.current){setBusy(false);setStreamingId('');}}
    }
    useEffect(()=>{clearTimeout(responseTimer.current);if(!auto||busy||composing||reader||settings||newOpen||help||originalOpen||controlsOpen||mobileOpen||pointerId.current!==null||!current||!flow.canBegin(current.id))return;const hasInk=current.strokes.some(s=>s.tool==='pen'&&!s.absorbedBy),pending=current.blocks.some(b=>b.pendingInput&&!b.absorbedBy&&visibleInkText(b));if(!prompt.trim()&&!hasInk&&!pending)return;const id=current.id;responseTimer.current=setTimeout(()=>{if(activeRef.current===id&&!drawing.current)void send(promptRef.current,{ink:hasInk,automatic:true});},INPUT_END_MS);return()=>clearTimeout(responseTimer.current);},[prompt,auto,busy,composing,reader,active,undoTick,settings,newOpen,help,originalOpen,controlsOpen,mobileOpen]);
    function illuminate(e: React.PointerEvent<HTMLDivElement>) {
        if (!candlelight || !tabVisible || e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const node = folio.current; if (!node) return;
        const x = e.clientX, y = e.clientY; cancelAnimationFrame(lightFrame.current);
        lightFrame.current = requestAnimationFrame(() => {
            const r = node.getBoundingClientRect(), px = Math.max(0, Math.min(1, (x - r.left) / r.width)), py = Math.max(0, Math.min(1, (y - r.top) / r.height));
            node.style.setProperty('--lamp-x', `${px * 100}%`); node.style.setProperty('--lamp-y', `${py * 100}%`); node.style.setProperty('--shadow-x', `${(px - .5) * -22}px`);
        });
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
    } setReader(false); void send(text, { page: p, sample:true }); }
    const mappedPoint = (e: { clientX: number; clientY: number; pressure: number; pointerType: string }): Point => {
        if (!paperMap.current && readingPaper.current) paperMap.current = measurePaper(readingPaper.current);
        const p = paperMap.current?.(e.clientX, e.clientY) || { x: 0, y: 0 };
        return [p.x * WIDTH, p.y * paperMapHeight.current, e.pointerType === 'pen' ? (e.pressure || .1) : .5];
    };
    const point = (e: React.PointerEvent<SVGSVGElement>): Point => mappedPoint(e);
    function eraseAt(pt:Point){const p=currentRef.current;if(!p)return;const radius=14;if(reader){storeAnnotations(markedStrokes.current.flatMap(s=>eraseStroke(s,pt,radius)));return;}const erased=new Map<string,number[]>(),regions=new Map<string,NonNullable<Block['erasedRegions']>>();for(const b of p.blocks.filter(b=>!b.absorbedBy&&(b.kind==='user'||b.kind==='text')&&pt[1]>=b.y-40&&pt[1]<=b.y+b.h)){const group=Array.from(svg.current?.querySelectorAll<SVGGElement>('[data-block-id]')||[]).find(el=>el.dataset.blockId===b.id);if(!group)continue;const indices=new Set(b.erased||[]),boxes=[...(b.erasedRegions||[])];for(const glyph of group.querySelectorAll<SVGTSpanElement>('[data-ink-char]')){const i=Number(glyph.dataset.inkChar);if(indices.has(i))continue;const box=glyph.getBBox(),dx=Math.max(box.x+b.x-pt[0],0,pt[0]-box.x-b.x-box.width),dy=Math.max(box.y+b.y-pt[1],0,pt[1]-box.y-b.y-box.height);if(Math.hypot(dx,dy)<radius){indices.add(i);boxes.push({index:i,x:box.x+b.x,y:box.y+b.y,w:box.width,h:box.height});}}if(indices.size!==(b.erased?.length||0)){erased.set(b.id,[...indices]);regions.set(b.id,boxes);}}updatePage(old=>({...old,strokes:old.strokes.flatMap(s=>s.absorbedBy?[s]:eraseStroke(s,pt,radius)),blocks:old.blocks.map(b=>erased.has(b.id)?{...b,erased:erased.get(b.id),erasedRegions:regions.get(b.id),pendingInput:b.kind==='user'?true:b.pendingInput}:b)}),false);}
    function down(e: React.PointerEvent<SVGSVGElement>) { if (turn || !currentRef.current || e.button !== 0 || pointerId.current !== null || penOnly && e.pointerType !== 'pen' || (e.target as Element).closest('button,video,foreignObject'))
        return; if (tool === 'select' && !reader) {
        return;
    } paperMap.current = readingPaper.current ? measurePaper(readingPaper.current) : null; paperMapHeight.current = reader ? pdfHeight.current : e.currentTarget.viewBox.baseVal.height; const p = point(e); if (tool === 'type' && !reader) {
        setTypePoint({ x: Math.max(40, Math.min(140, p[0])), y: Math.max(110, p[1]) });
        promptInput.current?.focus();
        return;
    } if(!reader&&(tool==='pen'||tool==='erase')){flow.inputStart(activeRef.current);abortReply.current?.abort();} e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); pointerId.current = e.pointerId; clearTimeout(responseTimer.current); if (tool === 'erase') {
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
        return; const events = typeof e.nativeEvent.getCoalescedEvents === 'function' ? e.nativeEvent.getCoalescedEvents() : []; const points: Point[] = events.length ? events.map(ev => mappedPoint(ev)) : [p]; drawing.current.points.push(...points); paintCurrent(); }
    function up(e: React.PointerEvent<SVGSVGElement>) { if (pointerId.current !== e.pointerId)
        return; try {
        e.currentTarget.releasePointerCapture(e.pointerId);
    }
    catch { } const wasErasing=erasing.current; pointerId.current = null; erasing.current = false; if(wasErasing)setUndoTick(t=>t+1); selectionStart.current = null; const s = drawing.current; drawing.current = null; inkPath.current?.setAttribute('d', ''); if (s) {
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
            if (s.tool === 'pen') (pendingInk.current[activeRef.current] ||= new Set()).add(s.id);
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
    function typeOnPage(e: React.FormEvent) { e.preventDefault(); if (typePoint && prompt.trim() && !auto) {
        const b = block('user', prompt.trim(), typePoint.y, replyHeight(prompt, 'hand', 44), { x: typePoint.x });
        updatePage(p => ({ ...p, blocks: [...p.blocks, b] }));
        editPrompt('');
        setTypePoint(null);
        setTool('pen');
    }
    else
        void send(); }
    function openReader() { abortReply.current?.abort(); clearTimeout(responseTimer.current); if (!reader) beginTurn('forward'); const p = dataRef.current?.pages.find(p => !p.document); if (p) {
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
        const p = newPage(file.name.replace(/\.pdf$/i, ''), 'reading');p.notebookId=currentRef.current?.notebookId||'main';
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
    function selectedPassage() {
        const paper = readingPaper.current, map = paper ? measurePaper(paper) : null, sheetHeight = pdfHeight.current;
        if (!currentRef.current?.document) {
            if (!selection || !paper || !map) return 'Every point can be described by an ordered pair (x, y). The first number is its horizontal position, or abscissa. The second is its vertical position, or ordinate.';
            const parts = Array.from(paper.querySelectorAll('.reader-excerpt p')).filter(el => {
                const r = el.getBoundingClientRect(); return map(r.left,r.bottom).y * sheetHeight >= selection.y && map(r.left,r.top).y * sheetHeight <= selection.bottom + 20;
            }).map(el => el.textContent);
            return parts.join(' ') || 'An ordered pair (x, y) locates a point: x across, y up.';
        }
        if (!selection) return liveDocText.current;
        // The PDF canvas spans the untransformed sheet width; use layout offsets, not projected bounds.
        const canvas = paper?.querySelector('canvas');
        let offset = 0, parent: HTMLElement | null | undefined = canvas;
        while (parent && parent !== paper) { offset += parent.offsetTop; parent = parent.offsetParent as HTMLElement | null; }
        offset = paper?.offsetWidth ? offset / paper.offsetWidth * WIDTH : 0;
        const found = pdfBoxes.current.filter(b => b.y + offset + b.h >= selection.y - 12 && b.y + offset <= selection.bottom + 18 && b.x + b.w >= selection.x - 12 && b.x <= selection.right + 12).map(b => b.text).join(' ');
        return found || 'No text was found inside this mark. A live companion can inspect handwriting; try marking a text passage.';
    }
    function openSource(id?: string) { if (!id || id === 'sample') {
        openReader();
        return;
    } const p = dataRef.current?.pages.find(p => p.id === id); if (p) {
        go(id);
        setReader(true);
        setTool('select');
    } }
    function explainReading() { const p = currentRef.current; if (!p)
        return; const selected = window.getSelection()?.toString().trim(); const sourceText = selected || selectedPassage(); const name = p.document ? `${p.document.name} · page ${p.document.page}` : 'A short guide to coordinates · page 1'; const note = newPage(p.document ? `${p.document.name.replace(/\.pdf$/i, '')} — notes` : 'A passage, understood', p.document ? topicFor(sourceText, 'reading') : 'coordinates'); note.notebookId=p.notebookId||'main'; note.blocks = [block('user', 'Help me understand this passage.', 122, 60, { source: name, sourcePageId: p.document ? p.id : 'sample' })]; if (!live) {
        if (p.document && note.topic === 'reading') {
            note.blocks.push(block('text', sourceText ? `The passage you marked:\n${sourceText.slice(0, 220)}\n\nYour source and ink are linked here.\nA live companion can explain any document.\nTry the sample reading for a worked explanation.` : 'Your marked page is linked here.\nThis PDF has no selectable text.\nA live companion can read the page visually.\nTry the sample reading for a worked explanation.', 225, 350, { source: name }));
        }
        else
            note.blocks.push(...replyFor('Explain coordinates', note, 230, name));
    } mutate(d => ({ ...d, pages: [...d.pages, note] })); go(note.id); if (live)
        void send(`Explain this selected passage: ${sourceText.slice(0, 6000)}`, { page: note, source: name });
    else
        setAnimated(note.blocks.slice(1).map(b => b.id)); }
    async function exportPage() {
        if (!svg.current || !current) return;
        try {
            const clone = svg.current.cloneNode(true) as SVGSVGElement, ns = 'http://www.w3.org/2000/svg';
            clone.setAttribute('xmlns', ns); clone.setAttribute('width', String(WIDTH)); clone.setAttribute('height', String(pageHeight(current)));
            clone.querySelectorAll('.absorbed-ink,.ink-draft').forEach(el => el.remove());
            const inlineAsset = async (path: string) => {
                const r = await fetch(path); if (!r.ok) throw Error('An illustration could not be included. Please try again.');
                const blob = await r.blob(); return new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(blob); });
            };
            for (const foreign of clone.querySelectorAll('.reply-media-object')) {
                const img = foreign.querySelector('img'), video = foreign.querySelector('video'), sticker = !!foreign.querySelector('.sticker');
                const src = img?.getAttribute('src') || video?.getAttribute('poster'); if (!src) continue;
                const g = document.createElementNS(ns, 'g'), image = document.createElementNS(ns, 'image');
                image.setAttribute('href', await inlineAsset(src)); image.setAttribute('y','-12'); image.setAttribute('width',sticker ? '225' : '580'); image.setAttribute('height',sticker ? '225' : '363'); g.appendChild(image);
                const caption = document.createElementNS(ns, 'text'); caption.setAttribute('y', sticker ? '238' : '378'); caption.setAttribute('class','media-caption'); caption.textContent = (foreign.querySelector('figcaption')?.textContent || '') + (video ? ' · play the film in your notebook' : ''); g.appendChild(caption); foreign.replaceWith(g);
            }
            const style = document.createElementNS(ns, 'style');
            style.textContent = '.ink-writing,.ink-caption,.ink-heading{font-family:cursive;fill:#53462d;font-size:31px}.ink-user{fill:#40372a;font-size:37px}.ink-small,.ink-caption{font-size:25px}.reply-font-book{font-family:Georgia,serif;font-size:25px}.reply-font-mono{font-family:monospace;font-size:22px}.ink-line{fill:none;stroke:#676443;stroke-width:2.3;stroke-linecap:round}.ink-soft{fill:#e0e4bf;stroke:#7a8b5c;stroke-width:2}.paper-kicker,.paper-date,.page-footer,.context-chip,.media-caption{font-family:sans-serif;font-size:12px;fill:#796747}.quiz-choices{display:flex;gap:8px}.quiz-choices button{font-size:22px;border:1px solid #819364;background:#e7eacb}.quiz-answer{font-size:22px;color:#536544}';
            clone.insertBefore(style,clone.firstChild); const rect = document.createElementNS(ns,'rect'); rect.setAttribute('width','100%'); rect.setAttribute('height','100%'); rect.setAttribute('fill','#f3e6c9'); clone.insertBefore(rect,style.nextSibling);
            const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)],{type:'image/svg+xml'}));
            const a = document.createElement('a'); a.href=url; a.download=current.title.replace(/[^a-z0-9]+/gi,'-')+'.svg'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),10000); toast.success('Page exported. Films are included as stills.');
        } catch(e) { toast.error(e instanceof Error ? e.message : 'Could not export this page. Please try again.'); }
    }
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
    const pageIndex = visiblePages.findIndex(p=>p.id===current?.id);
    const history = histories.current[active], height = current ? Math.max(pageHeight(current), prompt.trim() && !reader ? (typePoint?.y || nextY(current)) + replyHeight(prompt, 'hand', 44) + 120 : 0) : 1000;
    const drawingHandlers = { onPointerDown: down, onPointerMove: move, onPointerUp: up, onPointerCancel: cancel };
    return <TooltipProvider delayDuration={250}><SidebarProvider className="app parchment" data-light={candlelight ? "candle" : "day"} data-visible={tabVisible} data-depth={depth} style={{ "--warmth": warmth / 100 } as React.CSSProperties}><button className={`mobile-scrim ${mobileOpen ? 'open' : ''}`} aria-label="Close notebook menu" onClick={() => setMobileOpen(false)}/><Sidebar collapsible="none" className={`rail ${mobileOpen ? 'open' : ''}`} aria-label="Notebook pages" inert={isMobile && !mobileOpen} aria-hidden={isMobile && !mobileOpen}><div className="brand"><Feather className="brand-mark" strokeWidth={1.2}/><div className="brand-name">Enchanted<span>notebook</span></div></div><button className="new-page" onClick={() => showDialog('new')}><Plus size={17}/>New page</button><div className="book-picker"><Choice label="Your notebooks" value={bookId} options={books.map(b=>({value:b.id,label:b.title}))} onChange={id=>{const p=data?.pages.find(p=>(p.notebookId||'main')===id);if(p)go(p.id);}}/><button className="new-notebook-button" onClick={()=>{setMobileOpen(false);setNewTitle('');setNewBook(true);setNewOpen(true);}}>+ New notebook</button></div><nav className="pages">{visiblePages.map((p, i) => <button key={p.id} onClick={() => { go(p.id); if (p.document) {
        setReader(true);
        setTool('select');
    } }} className={`page-link ${active === p.id && !reader ? 'active' : active === p.id && p.document ? 'active' : ''}`} aria-current={active === p.id ? 'page' : undefined}><span className="page-number">{String(i + 1).padStart(2, '0')}</span><span><b>{p.title}</b><small>{p.document ? 'Imported PDF' : p.topic === 'mitosis' ? 'A study in small beginnings' : p.topic === 'coordinates' ? 'Making room for understanding' : p.topic === 'doodle' ? 'An unhurried doodle' : p.topic === 'language' ? 'Words, sounds & little rules' : 'Room for a thought'}</small></span></button>)}</nav><div className="rail-label">READ & REFLECT</div><button className="reading-link" onClick={openReader}><BookOpen size={17}/>A short guide to coordinates</button><button className="reading-link" onClick={() => fileInput.current?.click()} disabled={uploading}>{uploading ? <LoaderCircle className="spinning"/> : <Plus size={17}/>}Import a PDF</button><input ref={fileInput} type="file" accept="application/pdf,.pdf" style={{ display: 'none' }} onChange={importFile}/><div className="rail-bottom"><div className="companion-label"><Sparkles size={17}/>{companionStatus?.config.name||'A companion in the margins'}</div><p>Follow a thought.<br />See where the ink takes you.</p><span className="sample-badge">{live?'AI CONFIGURED':'AI SETUP NEEDED'}</span><span className="release-label">alpha 0.4</span><div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}><button className="quiet-button" onClick={() => showDialog('help')}><HelpCircle size={15}/>How it works</button><button className="quiet-button" aria-label="Settings" onClick={() => showDialog('settings')}><Settings2 size={16}/></button></div></div></Sidebar>
 <main className="workbench" inert={isMobile && mobileOpen}>
 <header className="topbar">
   <div className="breadcrumb"><button ref={menuButton} className="icon-button menu-button" aria-label="Open notebook menu" onClick={() => setMobileOpen(true)}><Menu /></button><span>My notebook</span><span>/</span><strong>{reader ? 'Reading room' : 'A place to think'}</strong></div>
   <div className="top-actions">
     <ToolTip label={candlelight ? 'Switch to daylight' : 'Light the candle'}><button className="lighting-toggle" aria-label="Candlelight" aria-pressed={candlelight} onClick={() => setCandlelight(v => !v)}>{candlelight ? <Flame size={15} /> : <Sun size={15} />}<span>{candlelight ? 'Candlelight' : 'Daylight'}</span></button></ToolTip>
     <SaveIndicator state={saving} retry={retrySave} />
     <button className="text-action" aria-label="Export page" onClick={exportPage} disabled={reader || !current}><Download size={17}/><span>Export page</span></button>
     <button className="icon-button" aria-label="Notebook settings" onClick={() => showDialog('settings')}><MoreHorizontal /></button>
   </div>
 </header>
 {loadError && <div className="error-banner" role="alert">{saveProblem || 'Saved notes could not be opened.'}<button onClick={() => void load()}>Try again</button></div>}
 {recoveryNeeded && <div className="error-banner"><button onClick={exportRecovery}>Export recovery copies</button><span>Both copies are retained. Sync is paused.</span></div>}
 {saveProblem && !loadError && <div className="error-banner" role="alert">{saveProblem}</div>}<div ref={stage} className="canvas-stage"><div className="stage-heading"><div>{reader ? <h1>{current?.document ? current.document.name : 'The reading room'}</h1> : <input className="rename-input" aria-label="Page title" value={current?.title || 'Opening your notebook…'} onChange={e => updatePage(p => ({ ...p, title: e.target.value.slice(0, 80) }), false)}/>}<div className="subline">{reader ? <><BookOpen size={13}/>Read a little. Wonder a little.</> : <><Leaf size={13}/>One thought can lead anywhere.</>}</div></div><div className="paper-controls"><DropdownMenu><DropdownMenuTrigger asChild><button className="icon-button" aria-label="Paper style" disabled={reader}><NotebookPen size={18}/></button></DropdownMenuTrigger><DropdownMenuContent align="end">{(['grid', 'lined', 'plain'] as const).map(p => <DropdownMenuItem key={p} onClick={() => updatePage(old => ({ ...old, paper: p }))}>{current?.paper === p && <Check size={14}/>} {p.charAt(0).toUpperCase() + p.slice(1)} paper</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu><button className="icon-button" aria-label={zoom === 100 ? 'Zoom in' : 'Fit page'} onClick={() => setZoom(z => z === 100 ? (isMobile ? 175 : 135) : 100)}><Maximize2 size={17}/></button><span className="zoom-label" style={{ fontSize: 12 }}>{zoom}%</span></div></div>
 <div className="toolbar" role="toolbar" aria-label="Writing tools">{([{ id: 'pen', label: 'Pen (P)', icon: PenLine }, { id: 'highlight', label: 'Highlighter (H)', icon: Highlighter }, { id: 'erase', label: 'Eraser (E)', icon: Eraser }, { id: 'type', label: 'Place text (T)', icon: Type }, { id: 'select', label: reader ? 'Select a passage (V)' : 'Scroll / navigate (V)', icon: MousePointer2 }] as const).map(item => <ToolTip key={item.id} label={item.label}><button className={`tool ${tool === item.id ? 'active' : ''}`} aria-label={item.label} aria-pressed={tool === item.id} disabled={reader && item.id === 'type'} onClick={() => { setTool(item.id); setTypePoint(null); }}><item.icon strokeWidth={1.6}/></button></ToolTip>)}<div className="separator"/>{COLORS.map((c, i) => <ToolTip key={c} label={['Graphite ink', 'Moss ink', 'Sepia ink'][i]}><button aria-label={['Graphite ink', 'Moss ink', 'Sepia ink'][i]} aria-pressed={color === c} className={`color-dot ${color === c ? 'active' : ''}`} style={{ background: c }} onClick={() => { setColor(c); setTool('pen'); }}/></ToolTip>)}<Slider className="stroke-size" aria-label="Pen thickness" min={1.5} max={7} step={.5} value={[size]} onValueChange={v => setSize(v[0])}/><div className="separator"/><ToolTip label="Undo (⌘/Ctrl Z)"><button className="tool" aria-label="Undo" disabled={reader ? markedStrokes.current.length === 0 : !history?.undo.length} onClick={() => { if (reader) {
        storeAnnotations(markedStrokes.current.slice(0, -1));
        setSelection(null);
    }
    else
        undo(); }}><Undo2 size={17}/></button></ToolTip><ToolTip label="Redo (⌘/Ctrl Shift Z)"><button className="tool" aria-label="Redo" disabled={reader || !history?.redo.length} onClick={() => undo(true)}><Redo2 size={17}/></button></ToolTip></div>
 {!reader && current && <nav className="book-pagination" aria-label="Turn notebook pages"><button aria-label="Previous notebook page" disabled={pageIndex <= 0 || !!turn} onClick={() => turnPage('backward')}><ChevronLeft size={14}/><span>Previous</span></button><span aria-live="polite">Leaf {String(pageIndex + 1).padStart(2, '0')} <em>/</em> {String(visiblePages.length||1).padStart(2, '0')}</span><button aria-label="Next notebook page" disabled={pageIndex >= visiblePages.length - 1 || !!turn} onClick={() => turnPage('forward')}><span>Next</span><ChevronRight size={14}/></button></nav>}
 {current && <div ref={folio} onPointerMove={illuminate} data-long={height > 2400} className={`paper-shell ${reader ? 'reading-panel' : ''}`} style={zoom !== 100 ? { width: `${zoom}%`, maxWidth: `${782 * zoom / 100}px` } : undefined}><BookLayers /><div ref={readingPaper} className={`paper ${reader ? 'plain' : current.paper}`} style={!reader ? { aspectRatio: `${WIDTH}/${height}` } : {}}><ParchmentMaterial pageKey={`${current.id}:${reader}:${current.document?.page || 0}`} candlelight={candlelight} warmth={warmth} visible={tabVisible} />{busy && <div className="writing-status" role="status"><Feather size={14} className="spinning"/>{streamingId ? 'The page is writing back…' : 'A thought is becoming ink…'}</div>}{reader ? <><div className="reader-caption"><span>{current.document ? 'YOUR READING' : 'FROM THE READING ROOM'}</span><span>{current.document ? `${current.document.page} / ${current.document.total}` : '01 / 01'}</span></div>{current.document ? <PdfPage key={current.document.id} url={apiPath(apiBase, `/api/documents/${current.document.id}`)} pageNumber={current.document.page} onLoaded={(total, h, text, boxes) => { liveDocText.current = text; pdfBoxes.current = boxes; if (current.document?.total !== total)
        updatePage(p => ({ ...p, document: p.document ? { ...p.document, total } : undefined }), false); }}/> : <div className="reader-excerpt"><div className="eyebrow">A SMALL LESSON IN FINDING THINGS</div><h2>A point has a place.<br />Coordinates tell us where.</h2><p>Imagine two paths crossing at right angles. One runs across the page; the other runs up and down. Their meeting place is the <em>origin</em>.</p><div className="excerpt-focus"><p style={{ margin: 0 }}>Every point can be described by an ordered pair, <em>(x, y)</em>. The first number is its horizontal position, or <em>abscissa</em>. The second is its vertical position, or <em>ordinate</em>.</p></div><div className="formula">P = (3, 2)</div><p>To find P, start at the origin. Move three units to the right along the x-axis, then two units up. That little journey ends at one unique point.</p><svg viewBox="0 -35 620 260" style={{ width: '100%', height: 'auto', marginTop: 20 }}><Coordinates /></svg><div className="chapter-rule"/><p className="read-note">An original sample passage, prepared for this notebook.<br />Circle or highlight a thought, then choose “Explore this passage”.</p></div>}<svg className="reader-overlay" viewBox={`0 0 ${WIDTH} ${readerHeight}`} preserveAspectRatio="none" {...drawingHandlers}>{markedStrokes.current.map(s => <InkStroke key={s.id} stroke={s}/>)}<path ref={inkPath} strokeLinecap="round" strokeLinejoin="round"/>{selection && <rect className="selection-box" x={selection.x} y={selection.y} width={Math.max(4, selection.right - selection.x)} height={Math.max(4, selection.bottom - selection.y)}/>}</svg></> : <svg ref={svg} className={`ink-svg ${tool === 'select' || penOnly ? 'pan' : ''}`} viewBox={`0 0 ${WIDTH} ${height}`} {...drawingHandlers} aria-label="Notebook page. Draw with a pen, mouse, or touch. Use the text tool to place writing." role="group"><text className="paper-kicker" x="68" y="57">{current.topic === 'doodle' ? 'A MOMENT OF PLAY' : current.topic === 'free' ? 'A FRESH PAGE' : 'NOTES & LITTLE DISCOVERIES'}</text><text className="paper-date" textAnchor="end" x="692" y="57">{String((data?.pages.findIndex(p => p.id === current.id) || 0) + 1).padStart(2, '0')}</text><line x1="68" y1="78" x2="692" y2="78" stroke="#a3ab8866"/>{current.blocks.length === 0 && current.strokes.length === 0 && !prompt && <><text x="68" y="160" className="page-empty-hint">What are you wondering about?</text><text x="68" y="206" className="page-empty-hint" style={{ fontSize: 27 }}>Make a mark. A thought. A little beginning.</text></>}{current.blocks.map(b => <g key={b.id} className={b.absorbedBy ? `absorbed-ink ${dissolving.includes(b.id) ? 'dissolving' : ''}` : b.pendingInput&&flow.cycle?.fading?'flow-ink':undefined} aria-hidden={!!b.absorbedBy} data-original-id={b.absorbedBy ? b.id : undefined}><InkBlock b={b} animated={animated.includes(b.id)} streaming={streamingId === b.id} onAnswer={answer} onSource={openSource}/></g>)}{current.strokes.map(s => <g key={s.id} className={s.absorbedBy ? `absorbed-ink ${dissolving.includes(s.id) ? 'dissolving' : ''}` : flow.cycle?.fading&&flow.cycle.strokes.includes(s.id)?'flow-ink':undefined} aria-hidden={!!s.absorbedBy}><InkStroke stroke={s}/></g>)}{prompt.trim() && <g className="ink-draft"><HandText text={prompt} x={typePoint?.x || 68} y={typePoint?.y || nextY(current)} kind="ink-writing ink-user"/></g>}<path ref={inkPath} strokeLinecap="round" strokeLinejoin="round"/>{typePoint && !prompt && <g><line x1={typePoint.x} y1={typePoint.y - 27} x2={typePoint.x} y2={typePoint.y + 8} stroke={color} strokeWidth="2"/><text x={typePoint.x + 10} y={typePoint.y} className="page-empty-hint" fontSize="25">Type below to write here…</text></g>}<text className="page-footer" x="380" y={height - 37} textAnchor="middle">ENCHANTED NOTEBOOK</text></svg>}</div>{turn && <TurningLeaf key={turn.id} turn={turn} surface={readingPaper} onFinish={finishTurn}/>}<PageGrip direction="backward" disabled={!!turn || (reader && current.document ? current.document.page <= 1 : pageIndex <= 0)} onTurn={() => reader && current.document ? turnPdf('backward') : turnPage('backward')}/><PageGrip direction="forward" disabled={!!turn || (reader && current.document ? current.document.page >= current.document.total : pageIndex >= visiblePages.length - 1)} onTurn={() => reader && current.document ? turnPdf('forward') : turnPage('forward')}/></div>}
 {reader && <><div className="reader-actions"><button onClick={explainReading}><Sparkles size={16}/>Explore this passage<ArrowUpRight size={15}/></button><button onClick={() => { const p = dataRef.current?.pages.find(p => !p.document); if (p)
        go(p.id);
    else
        setReader(false); markedStrokes.current = []; }}><PenLine size={16}/>Back to notebook</button></div>{current?.document && <div className="reader-pager"><button className="icon-button" aria-label="Previous PDF page" disabled={current.document.page <= 1 || !!turn} onClick={() => turnPdf('backward')}><ChevronLeft /></button><span>Page {current.document.page} of {current.document.total}</span><button className="icon-button" aria-label="Next PDF page" disabled={current.document.page >= current.document.total || !!turn} onClick={() => turnPdf('forward')}><ChevronRight /></button></div>}</>}
 </div>
 <footer className="composer-area"><div className="suggestions"><span>Try a sample</span><button disabled={busy} onClick={() => sample('mitosis', 'Show me how cells divide.')}><FlaskConical />Cells divide</button><button disabled={busy} onClick={() => sample('doodle', 'Draw a happy guy.')}><Smile />Draw something</button><button disabled={busy} onClick={() => sample('language', 'Make a table comparing a and an.')}><Table2 />A or an?</button><button disabled={busy || !current} onClick={() => current&&void send('Quiz me on this topic.',{sample:true,page:current})}><GraduationCap />Quiz me</button></div>
 <div className="flow-status" role="status">{flow.message}</div><div className="reply-controls"><label className="companion-recall"><Switch size="sm" aria-label="Across notebooks for this reply" checked={crossNotebook} onCheckedChange={setCrossNotebook}/><span>Across notebooks</span></label><label className="flow-toggle"><Switch size="sm" aria-label="Reply on pause" checked={auto} onCheckedChange={setAuto}/><span>Reply on pause</span></label>
 <DropdownMenu onOpenChange={setControlsOpen}><DropdownMenuTrigger asChild><button className="reply-control-button" aria-label="Reply lettering"><Type/><span>{FONTS[replyFont]}</span><ChevronDown/></button></DropdownMenuTrigger><DropdownMenuContent className="reply-menu" side="top" align="start"><DropdownMenuRadioGroup value={replyFont} onValueChange={v => setReplyFont(v as ReplyFont)}>{Object.entries(FONTS).map(([value,label]) => <DropdownMenuRadioItem value={value} key={value}>{label}</DropdownMenuRadioItem>)}</DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>
 <DropdownMenu onOpenChange={setControlsOpen}><DropdownMenuTrigger asChild><button className="reply-control-button" aria-label="Reply format"><Sparkles/><span>{replyFormat === 'auto' ? 'Format' : FORMATS[replyFormat]}</span><ChevronDown/></button></DropdownMenuTrigger><DropdownMenuContent className="reply-menu" side="top" align="start"><DropdownMenuRadioGroup value={replyFormat} onValueChange={v => setReplyFormat(v as ReplyFormat)}>{Object.entries(FORMATS).map(([value,label]) => <DropdownMenuRadioItem value={value} key={value}>{label}</DropdownMenuRadioItem>)}</DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>
 <button className="reply-control-button originals-button" disabled={reader || busy} aria-label="Original ink" onClick={() => { setMobileOpen(false); setOriginalOpen(true); }}><RotateCcw/><span>Original ink</span></button></div>
 <form className="composer" onSubmit={typeOnPage}><PenLine size={18}/><input ref={promptInput} aria-label={typePoint ? 'Text to place on page' : 'Write to your companion'} value={prompt} maxLength={1000} onChange={e => editPrompt(e.target.value)} onCompositionStart={() => { setComposing(true); clearTimeout(responseTimer.current); }} onCompositionEnd={() => setComposing(false)} onKeyDown={e => { if (e.key === 'Enter' && (e.nativeEvent.isComposing || composing)) e.preventDefault(); }} placeholder={typePoint ? auto ? 'Write here. Pause and the ink will answer…' : 'Write here, then place your words on the page…' : reader ? 'Ask about your reading…' : auto ? 'Write a thought. Pause. Watch the ink…' : 'Write a thought… the page will write back.'}/>
 {busy ? <button type="button" className="stop-reply" onClick={stopReply}>Stop reply</button> : !reader && <ToolTip label="Read my new handwriting"><button type="button" className="icon-button" aria-label="Read my ink" disabled={!current?.strokes.some(s => !s.absorbedBy && s.tool === 'pen')} onClick={() => void send('', { ink: true })}><Sparkles size={17}/></button></ToolTip>}
 <ToolTip label={typePoint && !auto ? 'Place on the page' : 'Write to companion now'}><button className="send-button" aria-label={typePoint && !auto ? 'Place text' : 'Send thought'} disabled={busy || !prompt.trim() || composing}><ArrowUp /></button></ToolTip></form><div className="composer-hint"><span><button className="companion-model-label" onClick={()=>showDialog('settings')}>{live?runLabel||'AI configured · view model settings':'Connect AI in Settings · samples available'}</button></span><span>{auto ? 'Pause → OCR + fade · originals kept' : 'Pen, touch, or a little typing.'}</span></div><div className="stream-announcement" aria-live="polite" aria-atomic="true">{announcement}</div></footer></main></SidebarProvider>
 <OriginalInk open={originalOpen} onOpenChange={setOriginalOpen} page={current} onRestore={restoreInk} onCloseAutoFocus={restoreNotebookFocus}/>

 <Dialog open={newOpen} onOpenChange={setNewOpen}><DialogContent className="modal vellum-dialog" onCloseAutoFocus={restoreNotebookFocus}><DialogHeader><DialogTitle>{newBook?'A new notebook.':'A fresh page.'}</DialogTitle><DialogDescription>Give this thought a place to begin.</DialogDescription></DialogHeader><form onSubmit={e => { e.preventDefault(); newBook?createNotebook():create(); }}><label className="modal-label" htmlFor="new-title">{newBook?'Notebook title':'Page title'}</label><input autoFocus id="new-title" className="modal-field" value={newTitle} maxLength={80} placeholder="What’s on your mind?" onChange={e => setNewTitle(e.target.value)}/><button className="modal-primary" style={{ marginTop: 18 }} type="submit">{newBook?'Open a new notebook':'Open a new page'}</button></form></DialogContent></Dialog>
 <CompanionSettings open={settings} onOpenChange={setSettings} apiBase={apiBase} onStatus={s=>{setCompanionStatus(s);setLive(s.live);}} books={books} onCloseAutoFocus={restoreNotebookFocus} appearance={<><div className="settings-row"><div>Candlelight<small>A living glow across the parchment.</small></div><Switch aria-label="Candlelight setting" checked={candlelight} onCheckedChange={setCandlelight}/></div><div className="light-setting"><label htmlFor="light-warmth">Light warmth <span>{warmth}%</span></label><Slider id="light-warmth" aria-label="Light warmth" min={20} max={100} step={5} value={[warmth]} onValueChange={v => setWarmth(v[0])} disabled={!candlelight}/><small>Your motion preference is respected.</small></div><div className="settings-row"><div>Raised folio<small>An angled sheet, deep binding, and cast shadows.</small></div><Switch aria-label="Raised folio" checked={depth} onCheckedChange={setDepth}/></div><div className="settings-row"><div>Stylus only<small>Let your finger scroll; use a pen to draw.</small></div><Switch aria-label="Stylus only" checked={penOnly} onCheckedChange={setPenOnly}/></div><div className="settings-row"><div>Reply when I pause<small>Your ink fades as a reply appears. Originals are kept.</small></div><Switch aria-label="Reply when I pause" checked={auto} onCheckedChange={setAuto}/></div></>}/>
 <Dialog open={help} onOpenChange={setHelp}><DialogContent className="modal vellum-dialog" onCloseAutoFocus={restoreNotebookFocus}><DialogHeader><DialogTitle>Think with your hands.</DialogTitle><DialogDescription>Everything happens here, on the page.</DialogDescription></DialogHeader><div className="help-list"><div><BookOpen/><span><b>Turn a leaf.</b> Use Previous / Next, choose a page in your notebook, or pull a page-edge tab inward. The writing area stays yours to draw on.</span></div><div><PenLine /><span><b>Make your mark.</b> Draw with a mouse, finger, or stylus. Use the highlighter, eraser, and undo to find your flow.</span></div><div><Sparkles /><span><b>Follow a thought.</b> Write and pause: your ink fades and a reply appears in its place. Choose lettering or a format below. Open “Original ink” to bring your input back.</span></div><div><BookOpen /><span><b>Read and wonder.</b> Open the sample reading or import a PDF. Mark a passage, then create a linked note.</span></div><div><GraduationCap /><span><b>Make it stick.</b> Ask “Quiz me”, pick an answer on the page, and learn from the feedback.</span></div></div><p>Notes save automatically. On-device OCR reads English handwriting; connected vision can read other languages. Connect a provider for open-ended answers. The inspiration buttons are explicit samples.</p><button className="modal-primary" onClick={() => setHelp(false)}>Let’s make a little ink</button></DialogContent></Dialog><Toaster position="bottom-right" richColors theme="dark"/></TooltipProvider>;
}
