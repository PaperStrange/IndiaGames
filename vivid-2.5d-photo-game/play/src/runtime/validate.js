const REQUIRED_METHODS = ['createState', 'reduce', 'getViewModel', 'serialize', 'migrate'];
const CAPABILITIES = new Set(['inspect', 'choose', 'place', 'adjust']);
const IDENTIFIER = /^[a-z][a-z0-9-]*$/;

function require(condition, message) {
  if (!condition) throw new TypeError(message);
}

function plainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}

function nonempty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function identifier(value) {
  return typeof value === 'string' && IDENTIFIER.test(value);
}

/** Reject values JSON would silently lose, including non-finite numbers and sparse arrays. */
export function assertSerializable(value, path = 'value', ancestors = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number') {
    require(Number.isFinite(value), `${path} must contain finite numbers`);
    return;
  }
  require(Array.isArray(value) || plainObject(value), `${path} must contain only JSON data`);
  require(!ancestors.has(value), `${path} must not contain cycles`);
  ancestors.add(value);
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      require(Object.hasOwn(value, index), `${path} must not contain sparse arrays`);
      assertSerializable(value[index], `${path}[${index}]`, ancestors);
    }
  } else {
    for (const [key, child] of Object.entries(value)) {
      assertSerializable(child, `${path}.${key}`, ancestors);
    }
    require(Object.getOwnPropertySymbols(value).length === 0, `${path} cannot contain symbol keys`);
  }
  ancestors.delete(value);
}

export function isLocalAssetPath(value) {
  if (!nonempty(value) || /[\\?#\u0000-\u001f]/.test(value) || value.startsWith('/')) return false;
  let decoded;
  try { decoded = decodeURIComponent(value); } catch { return false; }
  return !/[\\:\u0000-\u001f]/.test(decoded) && !decoded.startsWith('/')
    && decoded.split('/').every(part => part.length > 0 && part !== '.' && part !== '..');
}

export function validateManifest(manifest) {
  require(plainObject(manifest), 'A story manifest must be an object');
  assertSerializable(manifest, 'manifest');
  require(identifier(manifest.id), 'Story id must be a stable lowercase identifier');
  for (const key of ['revision', 'saveVersion']) {
    require(Number.isSafeInteger(manifest[key]) && manifest[key] >= 1, `${key} must be a positive integer`);
  }
  for (const key of ['title', 'subtitle', 'description', 'duration', 'releaseProfile']) {
    require(nonempty(manifest[key]), `manifest.${key} must provide readable text`);
  }
  require(plainObject(manifest.cast), 'manifest.cast must be an actor map');
  for (const [id, actor] of Object.entries(manifest.cast)) {
    require(identifier(id) && plainObject(actor), `Invalid actor ${id}`);
    for (const key of ['name', 'pronouns', 'description']) {
      require(nonempty(actor[key]), `Actor ${id} needs ${key}`);
    }
  }
  require(Array.isArray(manifest.assets), 'manifest.assets must be an array');
  const assetIds = new Set();
  for (const asset of manifest.assets) {
    require(plainObject(asset) && identifier(asset.id), 'Every asset needs a stable id');
    require(!assetIds.has(asset.id), `Duplicate asset id ${asset.id}`);
    assetIds.add(asset.id);
    require(isLocalAssetPath(asset.src), `Asset ${asset.id} must use a local public-relative path`);
    require(nonempty(asset.alt), `Asset ${asset.id} needs an accessible description`);
  }
  for (const [id, actor] of Object.entries(manifest.cast)) {
    if (actor.portrait !== undefined) {
      require(isLocalAssetPath(actor.portrait), `Actor ${id} portrait must use a local public-relative path`);
      require(manifest.assets.some(asset => asset.src === actor.portrait),
        `Actor ${id} portrait must be declared in manifest.assets`);
    }
  }
  require(Array.isArray(manifest.capabilities) && manifest.capabilities.length > 0,
    'manifest.capabilities must declare supported interactions');
  require(new Set(manifest.capabilities).size === manifest.capabilities.length,
    'manifest.capabilities cannot contain duplicates');
  require(manifest.capabilities.every(kind => CAPABILITIES.has(kind)),
    'Story requests an interaction without an accessible runtime implementation');
  return manifest;
}

/** The same view model drives the visual scene and complete HTML interaction path. */
export function validateViewModel(viewModel, manifest) {
  require(plainObject(viewModel), 'getViewModel must return an object');
  assertSerializable(viewModel, 'viewModel');
  for (const key of ['title', 'kicker', 'text', 'phase']) {
    require(nonempty(viewModel[key]), `viewModel.${key} needs readable text`);
  }
  require(typeof viewModel.speaker === 'string', 'viewModel.speaker must be text (empty is allowed)');
  require(typeof viewModel.progress === 'string' || Number.isFinite(viewModel.progress),
    'viewModel.progress must be readable text or a finite number');
  const scene = viewModel.scene;
  require(plainObject(scene) && ['portrait', 'workbench'].includes(scene.kind), 'Unsupported scene kind');
  require([-1, 0, 1].includes(scene.view), 'Scene view must be left, center, or right');
  require(['low', 'steady'].includes(scene.light), 'Scene light must have a flat-renderer equivalent');
  require(scene.actorId === null || scene.actorId === undefined || Object.hasOwn(manifest.cast, scene.actorId),
    `Scene references an unknown actor ${scene.actorId}`);
  require(Array.isArray(scene.details) && scene.details.every(detail => typeof detail === 'string'),
    'Scene details must provide text equivalents');
  require(scene.placement === null || typeof scene.placement === 'string', 'Scene placement must be a semantic id');
  const assetIds = new Set(manifest.assets.map(asset => asset.id));
  for (const id of [...(scene.assetIds || []), ...(scene.portraitAssetId ? [scene.portraitAssetId] : [])]) {
    require(assetIds.has(id), `Scene references unknown asset ${id}`);
  }
  require(Array.isArray(viewModel.actions), 'View model needs an actions array');
  const actionIds = new Set();
  for (const action of viewModel.actions) {
    require(plainObject(action) && identifier(action.id), 'Every action needs a stable id');
    require(!actionIds.has(action.id), `Duplicate action ${action.id}`);
    actionIds.add(action.id);
    require(nonempty(action.label), `Action ${action.id} needs an accessible label`);
    require(manifest.capabilities.includes(action.kind), `Action ${action.id} uses undeclared capability ${action.kind}`);
    require(plainObject(action.event) && nonempty(action.event.type), `Action ${action.id} needs a semantic event`);
    require(action.disabled === undefined || typeof action.disabled === 'boolean', `Invalid disabled flag on ${action.id}`);
    if (action.hint !== undefined) require(typeof action.hint === 'string', `Action ${action.id} hint must be text`);
    if (action.kind === 'place') {
      require(nonempty(action.objectLabel) && nonempty(action.destinationLabel),
        `Placement ${action.id} needs object and destination labels for click/tap/keyboard`);
    }
    if (action.kind === 'adjust') {
      require([action.value, action.min, action.max, action.step].every(Number.isFinite)
        && action.min < action.max && action.step > 0 && action.value >= action.min && action.value <= action.max,
      `Adjustment ${action.id} needs a valid accessible range`);
    }
  }
  if (viewModel.inspection !== undefined && viewModel.inspection !== null) {
    require(plainObject(viewModel.inspection) && nonempty(viewModel.inspection.title)
      && nonempty(viewModel.inspection.text), 'Inspection needs a title and text equivalent');
  }
  return viewModel;
}

export function validatePack(pack) {
  require(plainObject(pack), 'A story module must export pack');
  validateManifest(pack.manifest);
  for (const name of REQUIRED_METHODS) {
    require(typeof pack[name] === 'function', `Story ${pack.manifest.id} is missing ${name}`);
  }
  if (pack.legacyImport !== undefined) {
    const legacy = pack.legacyImport;
    require(plainObject(legacy) && nonempty(legacy.key) && !legacy.key.startsWith('vivid:save:'),
      'Legacy import needs a separate storage key');
    require(Array.isArray(legacy.profiles) && legacy.profiles.length > 0
      && legacy.profiles.every(profile => ['remembered', 'neutral'].includes(profile))
      && new Set(legacy.profiles).size === legacy.profiles.length, 'Legacy import needs explicit unique profiles');
    require(Number.isSafeInteger(legacy.version) && legacy.version >= 1, 'Legacy import needs its supported version');
    require(typeof pack.migrateLegacy === 'function', 'Legacy import requires a migration function');
  }
  const state = pack.createState({ profile: 'remembered' });
  assertSerializable(state, 'initial state');
  const saved = pack.serialize(state);
  assertSerializable(saved, 'serialized state');
  const restored = pack.migrate({ version: pack.manifest.saveVersion, state: saved });
  assertSerializable(restored, 'restored state');
  validateViewModel(pack.getViewModel(state), pack.manifest);
  validateViewModel(pack.getViewModel(restored), pack.manifest);
  return pack;
}

export async function loadStory(entry) {
  require(plainObject(entry) && identifier(entry.id) && typeof entry.load === 'function', 'Invalid catalog entry');
  const module = await entry.load();
  const pack = validatePack(module.pack);
  require(pack.manifest.id === entry.id, 'Loaded story id differs from its catalog entry');
  return pack;
}
