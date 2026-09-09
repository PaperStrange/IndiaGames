import { block, replyFor, topicFor, type Block, type Page, type ReplyFont, type ReplyFormat } from './notebook';

export const MEDIA = {
    owl: { src: '/replies/owl-sticker.webp', caption: 'A little companion · sample sticker' },
    forest: { src: '/replies/moonlit-forest.webp', caption: 'Moonlit woodland · sample picture' },
    'cell-film': { src: '/replies/cell-division.mp4', poster: '/replies/cell-division-poster.webp', caption: 'Cell division · simplified sample film' },
} as const;

export function graphemes(text: string): string[] {
    return typeof Intl.Segmenter === 'function' ? Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text), s => s.segment) : Array.from(text);
}

export function wrapReply(text: string, font: ReplyFont = 'hand', maxUnits?: number): string[] {
    const limit = maxUnits || (font === 'book' ? 42 : font === 'mono' ? 43 : 52);
    const width = (c: string) => /[\u2e80-\uffef]|\p{Extended_Pictographic}/u.test(c) ? (font === 'hand' ? 3 : 2.2) : font === 'mono' ? 1 : /[MW@#%]/.test(c) ? 2.2 : /[A-Z]/.test(c) ? 1.25 : /[il.,'’! :;]/.test(c) ? .55 : 1;
    const size = (t: string) => graphemes(t).reduce((n,c) => n + width(c),0);
    return text.split('\n').flatMap(line => {
        if (!line.trim()) return [' '];
        const parts: string[] = []; let row = '';
        for (const word of line.split(/\s+/)) {
            if (row && size(row + ' ' + word) > limit) { parts.push(row); row = ''; }
            if (size(word) > limit) {
                for (const c of graphemes(word)) { if (row && size(row + c) > limit) { parts.push(row); row = ''; } row += c; }
            } else row += (row ? ' ' : '') + word;
        }
        if (row) parts.push(row); return parts;
    });
}
export const replyHeight = (text: string, font: ReplyFont = 'hand', maxUnits?: number) => Math.max(48, wrapReply(text, font, maxUnits).length * 38 + 16);

export function chooseFormat(text: string, selected: ReplyFormat): ReplyFormat {
    if (selected !== 'auto') return selected;
    if (/sticker|贴纸/i.test(text)) return 'sticker';
    if (/video|film|movie|视频/i.test(text)) return 'video';
    if (/picture|photo|forest|图片|照片/i.test(text)) return 'picture';
    if (/emoji|表情/i.test(text)) return 'emoji';
    return 'auto';
}

export function mediaReply(format: ReplyFormat, y: number, font: ReplyFont): Block[] | null {
    if (format === 'sticker') return [block('text', 'A little company for your thoughts. 🦉', y, replyHeight('A little company for your thoughts. 🦉', font), { font }), block('sticker', MEDIA.owl.caption, y + 85, 270, { media: 'owl', font })];
    if (format === 'picture') return [block('text', 'A quiet place to let a thought wander.', y, replyHeight('A quiet place to let a thought wander.', font), { font }), block('picture', MEDIA.forest.caption, y + 85, 410, { media: 'forest', font })];
    if (format === 'video') return [block('text', 'Watch one cell become two. Tap play.', y, replyHeight('Watch one cell become two. Tap play.', font), { font }), block('video', MEDIA['cell-film'].caption, y + 85, 435, { media: 'cell-film', font })];
    return null;
}

export function presentReply(text: string, page: Page, y: number, format: ReplyFormat, font: ReplyFont, source?: string): Block[] {
    const media = mediaReply(format, y, font); if (media) return media;
    let blocks = replyFor(format === 'table' ? `Make a table. ${text}` : text, page, y, source);
    if (format === 'text') blocks = blocks.filter(b => b.kind === 'text' || b.kind === 'quiz' || b.kind === 'table');
    if (format === 'emoji') {
        const topic = topicFor(text, page.topic);
        const t = topic === 'mitosis' ? '🧬 Copy the DNA.\n↔️ Line up and separate the copies.\n🌱 Form two nuclei, then two daughter cells.\nEach gets a complete set.' : topic === 'coordinates' ? '🧭 Read (x, y) in that order.\n➡️ x moves across. ⬆️ y moves up.\n📍 (3, 2) means three right, then two up.' : topic === 'language' ? '👂 Listen to the first sound.\n🔤 A consonant sound takes “a”.\n✨ A vowel sound takes “an”.\nAn hour. A university.' : '🦉 A thought begins with a mark.\n✨ Keep wondering. Keep making little discoveries.\n🌿 This is a sample reply from your notebook.';
        blocks = [block('text', t, y, replyHeight(t, font), { font, source })];
    }
    let cursor = y;
    return blocks.map(b => { const h = b.kind === 'text' ? replyHeight(b.text, font) : b.h; const next = { ...b, y: cursor, h, font }; cursor += h + 38; return next; });
}
