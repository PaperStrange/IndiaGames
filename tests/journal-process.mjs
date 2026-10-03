import assert from 'node:assert/strict';
import { NotebookJournal, journalScope, recoverNotebook } from '../lib/notebook-journal.ts';

const journal = new NotebookJournal(localStorage, journalScope('', 'journal-test-user'));
const notebook = text => ({ pages: [{ id: 'page-1', title: text, topic: 'free', paper: 'plain', strokes: [], blocks: [] }] });
const mode = process.argv[2];

if (mode === 'write') {
    const entry = journal.write(notebook('A thought that survives restarting'), 7);
    assert.equal(journal.read().length, 1);
    process.stdout.write(entry.id);
} else if (mode === 'recover') {
    const [entry] = journal.read();
    assert.equal(entry.id, process.argv[3]);
    assert.equal(entry.notebook.pages[0].title, 'A thought that survives restarting');
    assert.equal(entry.baseVersion, 7);
    const recovery = recoverNotebook(journal.read(), notebook('Earlier server copy'), 7);
    assert.equal(recovery.conflict, false);
    assert.equal(recovery.selected.id, entry.id);
    journal.acknowledge(entry);
    assert.equal(journal.read().length, 0);
} else if (mode === 'isolation-and-races') {
    const first = journal.write(notebook('First edit'), 7);
    const second = journal.write(notebook('Second edit'), 7, first);
    journal.acknowledge(first);
    assert.deepEqual(journal.read(), [second]);
    const other = new NotebookJournal(localStorage, journalScope('', 'other-user'));
    assert.deepEqual(other.read(), []);
    assert.throws(() => other.acknowledge(second), /another notebook account/);
    const concurrent = journal.write(notebook('Another tab'), 7);
    assert.equal(recoverNotebook(journal.read(), notebook('Server'), 7).conflict, true);
    assert.equal(recoverNotebook([second], notebook('Newer server'), 8).conflict, true);
    const lostAck = recoverNotebook([second], second.notebook, 8);
    assert.deepEqual(lostAck.pending, []);
    assert.deepEqual(lostAck.acknowledged, [second]);
    journal.acknowledge(second);
    assert.deepEqual(journal.read(), [concurrent]);
} else if (mode === 'quota') {
    const original = journal.write(notebook('Keep this original'), 7);
    assert.throws(() => journal.write(notebook('x'.repeat(20 * 1024 * 1024)), 7, original), { name: 'QuotaExceededError' });
    assert.deepEqual(journal.read(), [original]);
} else {
    throw new Error('Unknown journal test mode.');
}
