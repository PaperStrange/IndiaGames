'use client';
import React from 'react';
import { getStroke } from 'perfect-freehand';
import { type Stroke, type Block, type ReplyFont } from '@/lib/notebook';
import { graphemes, wrapReply, MEDIA } from '@/lib/reply-presentation';
export function outline(stroke: Stroke) {
    const points = getStroke(stroke.points, { size: stroke.size, thinning: .55, smoothing: .6, streamline: .45, simulatePressure: false, last: true });
    if (!points.length)
        return '';
    return `M ${points.map(p => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' L ')} Z`;
}
export function strokeLine(stroke: Stroke) { return stroke.points.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' '); }
export const InkStroke = React.memo(function InkStroke({ stroke }: {
    stroke: Stroke;
}) { return stroke.tool === 'highlight' ? <path d={strokeLine(stroke)} fill="none" stroke={stroke.color} strokeWidth={stroke.size * 6} opacity=".28" strokeLinecap="round" strokeLinejoin="round"/> : <path d={outline(stroke)} fill={stroke.color}/>; });
export function HandText({ text, x = 0, y = 0, kind = 'ink-writing', lineHeight = 38, font = 'hand', streaming = false, erased = [] }: {
    text: string;
    x?: number;
    y?: number;
    kind?: string;
    lineHeight?: number;
    font?: ReplyFont;
    streaming?: boolean;
    erased?: number[];
}) {
    const lines = wrapReply(text, font, kind.includes('ink-user') ? 44 : undefined); let cursor = 0;
    return <text x={x} y={y} className={`${kind} reply-font-${font}`} aria-label={text}>{lines.map((l,i)=><tspan key={i} x={x} dy={i?lineHeight:0} aria-hidden="true">{graphemes(l||' ').map((c,j)=>{const index=cursor++;return <tspan className="ink-character" data-ink-char={index} key={j} style={{visibility:erased.includes(index)?'hidden':undefined,animationDelay:streaming?'0s':`${.22+index*.005}s`}}>{c}</tspan>;})}</tspan>)}</text>;
}
export function Mitosis() {
    return <g aria-label="Mitosis diagram: chromosomes condense, line up, separate, and form two nuclei">
 {[0, 1, 2, 3].map((n) => <g key={n} transform={`translate(${n * 155 + 56} 65)`}><ellipse className="ink-soft draw-line" rx={n === 3 ? 41 : 43} ry={47} fillOpacity=".5"/>{n === 0 ? <><ellipse className="ink-line draw-line" rx="22" ry="27" strokeDasharray="3 5"/><path className="ink-line draw-line" d="M -13 -14 l 15 27 m 0 -27 l -15 27 M 8 -14 l 9 20 m 0 -20 l -9 20"/></> : n === 1 ? <><path className="ink-line draw-line" d="M -8 -24 l 16 15 m 0 -15 l -16 15 M -8 -4 l 16 15 m 0 -15 l -16 15 M -8 16 l 16 15 m 0 -15 l -16 15"/><path className="ink-line draw-line" strokeOpacity=".4" d="M -35 0 L -10 -18 M -35 0 L -10 5 M -35 0 L -10 22 M 35 0 L 10 -18 M 35 0 L 10 5 M 35 0 L 10 22"/></> : n === 2 ? <><path className="ink-line draw-line" d="M -12 -23 l -9 8 l 9 8 M -12 -1 l -9 8 l 9 8 M -12 19 l -9 8 l 9 8 M 12 -23 l 9 8 l -9 8 M 12 -1 l 9 8 l -9 8 M 12 19 l 9 8 l -9 8"/></> : <><ellipse className="ink-line draw-line" cx="-18" cy="0" rx="16" ry="27"/><ellipse className="ink-line draw-line" cx="18" cy="0" rx="16" ry="27"/><path className="ink-line draw-line" d="M -20 -13 l 5 23 m 29 -23 l 5 23"/><path className="ink-line draw-line" strokeDasharray="3 4" d="M 0 -45 L 0 45"/></>}{n < 3 && <path className="ink-line draw-line" strokeOpacity=".5" d="M 54 0 h 31 m -7 -5 l 7 5 l -7 5"/>}<text className="ink-caption" textAnchor="middle" y="90">{['Prophase', 'Metaphase', 'Anaphase', 'Telophase'][n]}</text></g>)}<text x="286" y="208" textAnchor="middle" className="ink-caption">then cytokinesis → two daughter cells</text></g>;
}
export function Coordinates() { return <g aria-label="Coordinate plane with point P at x equals 3, y equals 2" transform="translate(55 12)"><g stroke="#768660" strokeWidth=".9" opacity=".26">{[0, 1, 2, 3, 4, 5, 6].map(i => <React.Fragment key={i}><path d={`M ${i * 39} 0 V 218`}/><path d={`M 0 ${i * 34} H 252`}/></React.Fragment>)}</g><path className="ink-line draw-line" d="M 0 171 H 267 m -7 -5 l 7 5 l -7 5 M 39 218 V -8 m -5 7 l 5 -7 l 5 7"/><text x="278" y="178" className="ink-caption">x</text><text x="31" y="-17" className="ink-caption">y</text><text x="20" y="193" className="ink-caption">0</text><path className="ink-line draw-line" stroke="#9b6d4d" strokeDasharray="6 6" d="M 156 171 V 103 H 39"/><circle cx="156" cy="103" r="5" fill="#718149"/><text className="ink-heading" x="172" y="87">P (3, 2)</text><text className="ink-caption" x="148" y="196">3</text><text className="ink-caption" x="15" y="111">2</text><HandText text={'3 across\n2 up\n\nx first, then y.'} x={330} y={55} kind="ink-writing" lineHeight={40}/><path className="ink-line draw-line" strokeOpacity=".5" d="M 292 105 Q 263 112 223 106 m 7 -5 l -7 5 l 8 4"/></g>; }
export function Doodle() { return <g aria-label="A smiling stick figure with raised arms" transform="translate(263 79)"><circle className="ink-line draw-line" cx="0" cy="-8" r="42"/><path className="ink-line draw-line" strokeWidth="3" d="M -15 -15 v 3 M 15 -15 v 3 M -16 4 Q 0 25 18 3 M 0 34 L -1 113 M 0 66 L -57 23 L -70 6 M 1 67 L 54 22 L 66 0 M -1 113 L -34 167 M -1 113 L 33 165"/><path className="ink-line draw-line" strokeWidth="1.5" strokeOpacity=".7" d="M -81 -23 l -13 -8 M -76 -42 l -4 -13 M 69 -28 l 14 -6 M 72 -46 l 4 -12"/><text x="-125" y="217" className="ink-caption">hello, lovely human.</text></g>; }
export function TableDrawing({ text }: {
    text: string;
}) { const rows = text.split('\n').map(r => r.split('|')); const cols = rows[0].length; const widths = cols === 2 ? [210, 380] : [150, 235, 210]; return <g role="table" aria-label="Handwritten summary table">{rows.map((row, i) => <g key={i} role="row"><path className="ink-line draw-line" strokeOpacity=".55" d={`M -3 ${i * 42 - 28} Q 283 ${i * 42 - 31} 608 ${i * 42 - 27}`}/>{row.map((cell, j) => <text role={i === 0 ? 'columnheader' : 'cell'} key={j} x={widths.slice(0, j).reduce((a, b) => a + b, 0) + 11} y={i * 42} className={i ? 'ink-caption' : 'ink-heading'}>{cell}</text>)}</g>)}{widths.slice(0, -1).map((_, i) => <path key={i} className="ink-line draw-line" strokeOpacity=".5" d={`M ${widths.slice(0, i + 1).reduce((a, b) => a + b, 0)} -30 V ${rows.length * 42 - 22}`}/>)}<path className="ink-line draw-line" strokeOpacity=".5" d={`M -3 ${rows.length * 42 - 28} H 608`}/></g>; }
export function InkBlock({ b, animated, onAnswer, onSource, streaming = false, erased = [] }: {
    b: Block;
    animated: boolean;
    onAnswer: (id: string, value: string) => void;
    onSource: (id?: string) => void;
    streaming?: boolean;
    erased?: number[];
}) {
    return <g transform={`translate(${b.x} ${b.y})`} className={animated ? 'inking' : ''} data-block-kind={b.kind} data-block-y={b.y} data-block-id={b.id}>
 {b.source && <text className="context-chip" y={-22} role={b.sourcePageId ? 'button' : undefined} tabIndex={b.sourcePageId ? 0 : undefined} onPointerDown={e => e.stopPropagation()} onClick={() => b.sourcePageId && onSource(b.sourcePageId)} onKeyDown={e => { if (e.key === 'Enter' && b.sourcePageId)
        onSource(b.sourcePageId); }} style={b.sourcePageId ? { cursor: 'pointer', textDecoration: 'underline' } : undefined}>↳ {b.source.slice(0, 78)}</text>}
 {b.kind === 'user' ? <HandText text={b.text} kind="ink-writing ink-user" erased={b.erased}/> : b.kind === 'text' ? <HandText text={b.text} font={b.font} streaming={streaming} erased={b.erased}/> : b.kind === 'mitosis' ? <><Mitosis /><text x="286" y="253" textAnchor="middle" className="ink-caption">{b.text}</text></> : b.kind === 'coordinates' ? <Coordinates /> : b.kind === 'doodle' ? <Doodle /> : b.kind === 'table' ? <g className={`reply-font-${b.font || 'hand'}`}><TableDrawing text={b.text}/></g> : b.kind === 'sticker' || b.kind === 'picture' || b.kind === 'video' ? <ReplyMedia b={b}/> : <><HandText text={b.text} kind="ink-heading"/><HandText text={b.question || ''} y={49} kind="ink-writing ink-small"/><foreignObject x="0" y="78" width="615" height="205"><div className="quiz-choices" onPointerDown={e => e.stopPropagation()}>{b.choices?.map(choice => <button key={choice} className={b.selected === choice ? (choice === b.answer ? 'correct' : 'wrong') : ''} onClick={() => onAnswer(b.id, choice)}>{choice}</button>)}</div>{b.feedback && <div className="quiz-answer" role="status">{b.feedback}</div>}</foreignObject></>}
 </g>;
}

function ReplyMedia({ b }: { b: Block }) {
    const media = b.mediaUrl?{src:b.mediaUrl,caption:b.text}:b.media&&MEDIA[b.media]; if (!media) return null;
    return <foreignObject x="0" y="-12" width="615" height={b.h} className="reply-media-object">
        <figure className={`reply-media ${b.kind}`} onPointerDown={e => e.stopPropagation()}>
            {b.kind === 'video' ? <video controls playsInline preload="metadata" poster={b.media==='cell-film'?MEDIA['cell-film'].poster:undefined} aria-label={b.text||'Play video'}><source src={media.src} type="video/mp4"/><track kind="captions" src="/replies/cell-division.vtt" srcLang="en" label="English" default/>Your browser cannot play this film. One cell divides into two daughter cells.</video> : <img src={media.src} alt={b.text} width={b.media === 'owl' ? 225 : 580} height={b.media === 'owl' ? 225 : 360}/>}
            <figcaption>{media.caption}</figcaption>
        </figure>
    </foreignObject>;
}
