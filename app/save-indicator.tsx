import { Check, LoaderCircle, RotateCcw } from 'lucide-react';

export type SaveState = 'loading' | 'saved' | 'saving' | 'local' | 'error';

const labels: Record<SaveState, string> = {
    loading: 'Opening notebook', saved: 'Synced', saving: 'Saving on device',
    local: 'Saved on device · sync pending', error: 'Save needs attention',
};

export function SaveIndicator({ state, retry }: { state: SaveState; retry: () => void }) {
    const canRetry = state === 'error' || state === 'local';
    return <button className={`saved ${state === 'error' ? 'error' : ''}`}
        style={{ background: 'none', border: 0 }} onClick={canRetry ? retry : undefined}
        aria-disabled={!canRetry} aria-live="polite">
        {state === 'saved' || state === 'local' ? <Check size={13} />
            : state === 'error' ? <RotateCcw size={13} /> : <LoaderCircle size={13} className="spinning" />}
        <span>{labels[state]}</span>
    </button>;
}
