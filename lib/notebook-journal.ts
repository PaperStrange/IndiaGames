import { z } from 'zod';
import type { Notebook } from './notebook';

const PREFIX = 'enchanted:pending:v1:';
const entrySchema = z.object({
    schema: z.literal(1),
    id: z.string().uuid(),
    scope: z.string().min(1),
    baseVersion: z.number().int().nonnegative(),
    createdAt: z.number().int().nonnegative(),
    notebook: z.object({ pages: z.array(z.object({ id: z.string() }).passthrough()).min(1) }).passthrough(),
});

export type JournalEntry = {
    schema: 1;
    id: string;
    scope: string;
    baseVersion: number;
    createdAt: number;
    notebook: Notebook;
};

export function journalScope(apiBase: string, owner: string): string {
    if (!owner.trim()) throw new Error('Notebook identity is required for device saving.');
    return JSON.stringify([apiBase.replace(/\/$/, ''), owner]);
}

export class NotebookJournal {
    private readonly storage: Storage;
    readonly scope: string;

    constructor(storage: Storage, scope: string) {
        this.storage = storage;
        this.scope = scope;
    }

    read(): JournalEntry[] {
        const entries: JournalEntry[] = [];
        for (let index = 0; index < this.storage.length; index++) {
            const key = this.storage.key(index);
            if (!key?.startsWith(PREFIX)) continue;
            const raw = this.storage.getItem(key);
            if (raw === null) continue;
            const entry = entrySchema.parse(JSON.parse(raw));
            if (entry.scope === this.scope) entries.push(entry as JournalEntry);
        }
        return entries.sort((a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id));
    }

    write(notebook: Notebook, baseVersion: number, previous?: JournalEntry): JournalEntry {
        if (previous && previous.scope !== this.scope) {
            throw new Error('The device record belongs to another notebook account.');
        }
        const entry: JournalEntry = {
            schema: 1, id: crypto.randomUUID(), scope: this.scope,
            baseVersion, createdAt: Date.now(), notebook: structuredClone(notebook),
        };
        entrySchema.parse(entry);
        // 新记录成功保存后才删除被替代的记录；写入失败时保留原始记录。
        this.storage.setItem(PREFIX + entry.id, JSON.stringify(entry));
        if (previous) this.remove(previous);
        return entry;
    }

    acknowledge(entry: JournalEntry): void {
        this.remove(entry);
    }

    private remove(entry: JournalEntry): void {
        if (entry.scope !== this.scope) throw new Error('The device record belongs to another notebook account.');
        const key = PREFIX + entry.id;
        const current = this.storage.getItem(key);
        if (current !== null && current !== JSON.stringify(entry)) {
            throw new Error('The device record changed. Keep both copies for recovery.');
        }
        this.storage.removeItem(key);
    }
}

export function recoverNotebook(entries: JournalEntry[], remote: Notebook | null, version: number) {
    const remoteText = JSON.stringify(remote);
    const acknowledged = entries.filter(entry => JSON.stringify(entry.notebook) === remoteText);
    const pending = entries.filter(entry => !acknowledged.includes(entry));
    const selected = pending.at(-1);
    const conflict = pending.length > 1 || !!selected && selected.baseVersion !== version;
    return { acknowledged, pending, selected, conflict };
}
