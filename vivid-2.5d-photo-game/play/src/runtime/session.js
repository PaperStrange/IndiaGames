import { assertSerializable, validatePack, validateViewModel } from './validate.js';

export const SAVE_SCHEMA_VERSION = 1;
export const PROFILES = Object.freeze(['remembered', 'neutral']);

export function saveKey(storyId, profile = 'remembered') {
  return `vivid:save:${storyId}:${profile}`;
}

function browserStorage() {
  try { return globalThis.localStorage; } catch { return null; }
}

function clone(value) {
  assertSerializable(value);
  return JSON.parse(JSON.stringify(value));
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validateEnvelope(envelope, pack, profile) {
  if (!isObject(envelope) || envelope.storyId !== pack.manifest.id || envelope.profile !== profile) {
    throw new Error('This saved record does not match the selected story and study profile.');
  }
  for (const key of ['schemaVersion', 'contentRevision', 'storySaveVersion']) {
    if (!Number.isSafeInteger(envelope[key]) || envelope[key] < 1) throw new Error(`Invalid saved ${key}.`);
  }
  if (envelope.schemaVersion > SAVE_SCHEMA_VERSION || envelope.contentRevision > pack.manifest.revision
      || envelope.storySaveVersion > pack.manifest.saveVersion) {
    const error = new Error('This story was saved by a newer version. The original record is being kept.');
    error.code = 'FUTURE_SAVE';
    throw error;
  }
  if (envelope.schemaVersion !== SAVE_SCHEMA_VERSION || !Object.hasOwn(envelope, 'state')) {
    throw new Error('The saved record has an unsupported format.');
  }
  return pack.migrate({ version: envelope.storySaveVersion, state: envelope.state });
}

/**
 * A story session owns one semantic checkpoint and one storage namespace.
 * Unknown or damaged saves are never overwritten by normal play. Recovery is
 * deliberately explicit; it keeps the current in-memory progress. Reset starts
 * the active story/profile again. Neither operation touches another story.
 */
export function createSession({ pack, profile = 'remembered', storage = browserStorage() } = {}) {
  validatePack(pack);
  if (!PROFILES.includes(profile)) throw new TypeError('Unknown study profile');
  const key = saveKey(pack.manifest.id, profile);
  const legacyImport = pack.legacyImport;
  const usesLegacy = legacyImport?.profiles.includes(profile) === true;
  let state = pack.createState({ profile });
  let status = Object.freeze({ kind: 'ok', message: 'Progress is kept on this device.' });
  let protectedRecord = false;
  let disposed = false;
  const subscribers = new Set();

  function setStatus(kind, message) {
    status = Object.freeze({ kind, message });
  }

  function checkState(candidate) {
    assertSerializable(candidate, 'story state');
    if (Object.hasOwn(candidate, 'profile') && candidate.profile !== profile) {
      throw new Error('The checkpoint belongs to a different study profile.');
    }
    validateViewModel(pack.getViewModel(candidate), pack.manifest);
    return candidate;
  }

  function unavailable() {
    setStatus('unavailable', 'Device storage is unavailable. You can keep playing, but this visit may not be saved.');
  }

  if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function'
      || typeof storage.removeItem !== 'function') {
    storage = null;
    unavailable();
  } else {
    let raw;
    let legacy = false;
    try {
      raw = storage.getItem(key);
      if (raw === null && usesLegacy) {
        raw = storage.getItem(legacyImport.key);
        legacy = raw !== null;
      }
    } catch {
      // A failed read does not mean the slot is empty. Preserve an unreadable
      // record until explicit recovery, even if writing might still work.
      protectedRecord = true;
      unavailable();
    }
    if (raw !== undefined && raw !== null) {
      try {
        const data = JSON.parse(raw);
        if (legacy && isObject(data) && Number.isSafeInteger(data.version) && data.version > legacyImport.version) {
          const error = new Error('The earlier prototype memory was written by a newer version. The original record is being kept.');
          error.code = 'FUTURE_SAVE';
          throw error;
        }
        const restored = legacy
          ? pack.migrateLegacy(data, { profile })
          : validateEnvelope(data, pack, profile);
        state = checkState(restored);
      } catch (error) {
        protectedRecord = true;
        if (error.code === 'FUTURE_SAVE') setStatus('future', error.message);
        else setStatus('corrupt', 'This saved record could not be read. It is preserved while you play a temporary visit. Choose recovery only if you want to replace it.');
      }
    }
  }

  function envelope() {
    return {
      schemaVersion: SAVE_SCHEMA_VERSION,
      storyId: pack.manifest.id,
      contentRevision: pack.manifest.revision,
      storySaveVersion: pack.manifest.saveVersion,
      profile,
      state: clone(pack.serialize(state)),
    };
  }

  function persist() {
    if (disposed || protectedRecord) return false;
    if (!storage) { unavailable(); return false; }
    const record = JSON.stringify(envelope());
    try {
      storage.setItem(key, record);
      setStatus('ok', 'Progress is kept on this device.');
      return true;
    } catch {
      unavailable();
      return false;
    }
  }

  function notify() {
    for (const subscriber of [...subscribers]) subscriber(clone(state), status);
  }

  function clearOwnedRecords() {
    if (!storage) { unavailable(); return false; }
    try {
      storage.removeItem(key);
      if (usesLegacy) storage.removeItem(legacyImport.key);
      protectedRecord = false;
      return true;
    } catch {
      unavailable();
      return false;
    }
  }

  return {
    get status() { return status; },
    get key() { return key; },
    getState() { return clone(state); },
    dispatch(event) {
      if (disposed) return clone(state);
      if (!isObject(event) || typeof event.type !== 'string' || !event.type.trim()) return clone(state);
      let semanticEvent;
      try { semanticEvent = clone(event); } catch { return clone(state); }
      // Reducers receive copies: accidental external mutation cannot alter a
      // checkpoint or make a rejected transition partially change the session.
      const next = checkState(pack.reduce(clone(state), semanticEvent));
      const changed = JSON.stringify(next) !== JSON.stringify(state);
      if (changed) {
        state = next;
        persist();
        notify();
      }
      return clone(state);
    },
    subscribe(subscriber) {
      if (typeof subscriber !== 'function') throw new TypeError('Subscriber must be a function');
      if (disposed) return () => {};
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },
    recover() {
      if (disposed) return false;
      const cleared = clearOwnedRecords();
      const saved = cleared && persist();
      notify();
      return saved;
    },
    reset() {
      if (disposed) return false;
      state = checkState(pack.createState({ profile }));
      const cleared = clearOwnedRecords();
      // Store a fresh checkpoint as well as deleting the legacy key. If a tab
      // from the old prototype writes its key later it cannot resurrect memory.
      const saved = cleared && persist();
      notify();
      return saved;
    },
    dispose() {
      disposed = true;
      subscribers.clear();
    },
  };
}
