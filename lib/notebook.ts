export type Point = [
    number,
    number,
    number
];
export type Tool = 'pen' | 'highlight' | 'erase' | 'type' | 'select';
export type Stroke = {
    revision?: number;
    id: string;
    points: Point[];
    color: string;
    size: number;
    tool: 'pen' | 'highlight';
    absorbedBy?: string;
};
export type ReplyFont = 'hand' | 'book' | 'mono';
export type ReplyFormat = 'auto' | 'text' | 'emoji' | 'table' | 'sticker' | 'picture' | 'video';
export type Block = {
    pendingInput?: boolean; recognitionId?: string; inkIds?: string[]; erased?: number[]; erasedRegions?: {index:number;x:number;y:number;w:number;h:number}[]; mediaUrl?: string; runId?:string; citations?:{id:string;title:string;excerpt:string;url?:string;pageId?:string;notebookId?:string}[];
    id: string;
    kind: 'user' | 'text' | 'mitosis' | 'coordinates' | 'doodle' | 'table' | 'quiz' | 'sticker' | 'picture' | 'video';
    text: string;
    x: number;
    y: number;
    h: number;
    source?: string;
    sourcePageId?: string;
    question?: string;
    answer?: string;
    choices?: string[];
    selected?: string;
    feedback?: string;
    font?: ReplyFont;
    absorbedBy?: string;
    exchangeId?: string;
    media?: 'owl' | 'forest' | 'cell-film';
};
export type Page = {
    notebookId?: string;
    id: string;
    title: string;
    topic: string;
    paper: 'grid' | 'lined' | 'plain';
    strokes: Stroke[];
    blocks: Block[];
    annotations?: Record<string, Stroke[]>;
    document?: {
        id: string;
        name: string;
        page: number;
        total: number;
    };
};
export type Notebook = {
    books?: {id:string;title:string}[];
    pages: Page[];
};
export const WIDTH = 760;
export const uid = () => typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Array.from(crypto.getRandomValues(new Uint8Array(16))).map(n => n.toString(16).padStart(2, '0')).join('');
export const block = (kind: Block['kind'], text: string, y: number, h: number, extra: Partial<Block> = {}): Block => ({ id: uid(), kind, text, x: 68, y, h, ...extra });
export function newPage(title = 'Untitled thought', topic = 'free'): Page { return { id: uid(), title, topic, paper: 'grid', strokes: [], blocks: [] }; }
export function initialNotebook(): Notebook {
    const first = newPage('A little curiosity', 'mitosis');
    first.blocks = [block('user', 'How does one cell become two?', 122, 54), block('text', 'A little choreography, called mitosis.\nFirst, the cell copies its DNA. Then it separates\nthe copies so each new cell gets a complete set.', 209, 125), block('mitosis', 'One cell. Two identical beginnings.', 375, 237), block('text', 'The lovely part? This is happening inside you\nright now — helping you grow, heal, and renew.', 671, 87)];
    const second = newPage('Coordinates, untangled', 'coordinates');
    second.blocks = [block('user', 'Help me make sense of coordinates.', 122, 60), block('text', 'Think of (x, y) as directions to a tiny place.\nx tells you how far to walk across.\ny tells you how far to walk up.', 220, 130), block('coordinates', 'For (3, 2): three right, then two up.', 390, 275)];
    const third = newPage('Small happy things', 'doodle');
    third.blocks = [block('user', 'Draw a happy guy.', 122, 60), block('doodle', 'A little friend for the margin.', 235, 300)];
    return { pages: [first, second, third] };
}
export function nextY(page: Page) { return Math.max(122, ...page.blocks.filter(b => !b.absorbedBy).map(b => b.y + b.h + 42), ...page.strokes.filter(s => !s.absorbedBy).map(s => Math.max(...s.points.map(p => p[1])) + 38)); }
export function pageHeight(page: Page) { return Math.max(1000, nextY(page) + 120); }
export function topicFor(prompt: string, current = 'free') {
    if (/mitos|cell|divide|division|biology|细胞|分裂/i.test(prompt))
        return 'mitosis';
    if (/coordinat|\(\s*-?\d+\s*,|cartesian|axis|axes|坐标/i.test(prompt))
        return 'coordinates';
    if (/draw|happy|guy|doodle|smil|stick|画|快乐/i.test(prompt))
        return 'doodle';
    if (/grammar|vowel|consonant|a or an|article|语法|元音/i.test(prompt))
        return 'language';
    return current;
}
export function replyFor(prompt: string, page: Page, y: number, source?: string): Block[] {
    const topic = topicFor(prompt, page.topic);
    if (/quiz|test me|考|测验/i.test(prompt))
        return [quizBlock(topic, y)];
    if (/table|summari|summary|compare|表格|总结/i.test(prompt)) {
        if (topic === 'coordinates')
            return [block('text', 'Here is the map in a nutshell.', y, 50, { source }), block('table', 'Part|Meaning|Example\nx|Horizontal position|3 steps right\ny|Vertical position|2 steps up\n(x, y)|An ordered pair|(3, 2)', y + 85, 205)];
        if (topic === 'language')
            return [block('table', 'Sound|Article|Example\nConsonant|a|a university\nVowel|an|an hour\nLetter name|listen first|an MBA', y, 215, { source })];
        return [block('text', 'Let’s put the whole dance on one page.', y, 50, { source }), block('table', 'Stage|What happens\nProphase|Chromosomes condense\nMetaphase|They line up in the middle\nAnaphase|Sister chromatids separate\nTelophase|Two nuclei form\nCytokinesis|The cell splits into two', y + 90, 280)];
    }
    if (/example|例子/i.test(prompt) && topic === 'language')
        return [block('text', 'Listen to the first sound, not the first letter.\n\n“a university” → starts with a “y” sound\n“an hour” → starts with a vowel sound\n“an MBA” → M sounds like “em”\n\nYour turn: a honest answer, or an honest answer?', y, 250, { source })];
    if (topic === 'mitosis')
        return [block('text', 'Before mitosis, DNA is copied. The chromosomes\nline up, their copies separate, and two new\nnuclei form. Then the cell splits in two.\nBoth daughter cells keep the same DNA.', y, 155, { source }), block('mitosis', 'Copy. Line up. Separate. Begin again.', y + 193, 237)];
    if (topic === 'coordinates')
        return [block('text', 'The first number is x: move across.\nThe second is y: move up or down.\nFor (3, 2), go 3 right and 2 up from (0, 0).\nThe order matters: (2, 3) is a different point.', y, 155, { source }), block('coordinates', 'Try finding (2, 3). Where would it be?', y + 195, 275)];
    if (topic === 'doodle')
        return [block('text', 'A happy little guy, coming right up.', y, 50, { source }), block('doodle', 'Sometimes a small drawing says enough.', y + 88, 270)];
    if (topic === 'language')
        return [block('text', 'Choose “a” or “an” by the sound that follows.\nUse “an” before a vowel sound, and “a” before\na consonant sound. Spelling can be sneaky:\n“an hour”, but “a university”.\n\nTry asking me for a few more examples.', y, 230, { source })];
    return [block('text', 'This sample companion knows cells, coordinates,\n“a” versus “an”, and one very happy little guy.\nTry one of those, or keep writing freely here.\nOpen-ended replies need a live AI connection.', y, 175, { source })];
}
export function quizBlock(topic: string, y: number): Block {
    if (topic === 'coordinates')
        return block('quiz', 'Your turn · a tiny coordinates challenge', y, 250, { question: 'From (0, 0), walk 3 right and 2 up. Where are you?', choices: ['(2, 3)', '(3, 2)', '(-3, 2)'], answer: '(3, 2)' });
    if (topic === 'language')
        return block('quiz', 'Your turn · listen to the first sound', y, 250, { question: 'Which phrase is correct?', choices: ['a hour', 'an hour', 'Both are correct'], answer: 'an hour' });
    return block('quiz', 'Your turn · a tiny biology challenge', y, 250, { question: 'What separates during anaphase?', choices: ['Sister chromatids', 'Cell membranes', 'Whole daughter cells'], answer: 'Sister chromatids' });
}
export function feedbackFor(b: Block, choice: string) {
    if (choice === b.answer)
        return b.answer === '(3, 2)' ? 'Exactly! x comes first, then y. Three across, two up.' : b.answer === 'an hour' ? 'Yes! The h is silent, so “hour” begins with a vowel sound.' : 'Exactly! Sister chromatids move to opposite poles.';
    return b.answer === '(3, 2)' ? 'Almost. Keep the order: x (across), then y (up). Try again.' : b.answer === 'an hour' ? 'Listen to “hour”: the h is silent. Try the vowel-sound article.' : 'Not quite. The DNA copies move apart before the cell splits. Try again.';
}
export function bounds(strokes: Stroke[]) {
    const pts = strokes.flatMap(s => s.points);
    return pts.length ? { x: Math.min(...pts.map(p => p[0])), y: Math.min(...pts.map(p => p[1])), right: Math.max(...pts.map(p => p[0])), bottom: Math.max(...pts.map(p => p[1])) } : null;
}
