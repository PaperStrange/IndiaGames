/** Handles fragmented UTF-8/SSE, pings, errors and truncated streams. */
export async function consumeCompanionStream(response: Response, onText: (text: string) => void, signal?: AbortSignal): Promise<string> {
    if (!response.ok) { const error = await response.json().catch(() => ({})) as {error?: string}; throw new Error(error.error || 'The companion could not respond.'); }
    if (!response.body) throw new Error('The connection did not provide a response.');
    const reader = response.body.getReader(), decoder = new TextDecoder();
    let buffer = '', text = '', stopped = false;
    const abort = () => { void reader.cancel().catch(() => {}); };
    signal?.addEventListener('abort', abort, { once: true });
    const parseEvent = (event: string) => {
        const data = event.split('\n').filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n');
        if (!data) return;
        const item = JSON.parse(data) as {type?: string; delta?: {type?: string; text?: string}; error?: {message?: string}};
        if (item.type === 'error') throw new Error(item.error?.message || 'The reply was interrupted.');
        if (item.type === 'message_stop') stopped = true;
        if (item.type === 'content_block_delta' && item.delta?.type === 'text_delta' && item.delta.text) { text += item.delta.text; onText(text); }
    };
    try {
        while (true) {
            if (signal?.aborted) throw new DOMException('Stopped', 'AbortError');
            const { value, done } = await reader.read();
            buffer += decoder.decode(value, {stream: !done}).replace(/\r/g, '');
            let boundary;
            while ((boundary = buffer.indexOf('\n\n')) !== -1) { parseEvent(buffer.slice(0, boundary)); buffer = buffer.slice(boundary + 2); }
            if (done) break;
        }
        if (signal?.aborted) throw new DOMException('Stopped', 'AbortError');
        if (buffer.trim()) parseEvent(buffer);
        if (!stopped) throw new Error('The connection ended early. Your partial reply and original ink are kept.');
        if (!text.trim()) throw new Error('The companion sent an empty reply. Your ink is still here.');
        return text;
    } finally { signal?.removeEventListener('abort', abort); await reader.cancel().catch(() => {}); reader.releaseLock(); }
}
