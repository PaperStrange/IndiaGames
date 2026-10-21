import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Presentation roles, not story/character IDs. All assets are authored here and
// shipped locally; packs can replace any role without changing this renderer.
export const assetCatalog = Object.freeze([
  { id: 'frame', src: 'art/frame.glb', alt: 'A worn walnut frame with brass fittings and a small lamp.' },
  { id: 'portrait', src: 'art/keeper-portrait.svg', alt: 'A silver-haired keeper holds a letter, with a foggy harbour behind her.' },
  { id: 'workbench', src: 'art/workbench.glb', alt: 'A paint-marked workbench with a lightbox, timetable, brushes and pencils.' },
  { id: 'postcard', src: 'art/postcard.svg', alt: 'A painted station waiting room beneath a green roof.' },
  { id: 'sketch-underlay', src: 'art/sketch-underlay.svg', alt: 'The plan of an empty waiting room, with doors and windows marked.' },
  { id: 'sketch-overlay', src: 'art/sketch-overlay.svg', alt: 'A second drawing adds shared worktables, tools and chairs.' },
]);

const defaults = Object.fromEntries(assetCatalog.map(asset => [asset.id, asset.src]));
const MAX_TILT = Math.PI / 15; // 12 degrees, never a game-success threshold.

function bounded(value, min, max, fallback = min) {
  return Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;
}

function resolveAsset(manifest, role, actorId) {
  const castPortrait = role === 'portrait' && manifest.cast?.[actorId]?.portrait;
  const declared = manifest.assets?.find(asset => asset.id === role)?.src;
  const source = castPortrait || declared || defaults[role];
  if (typeof source !== 'string' || !source || source.startsWith('/') || /^(?:[a-z]+:|\/\/)/i.test(source)
      || source.split('/').includes('..')) throw new Error(`Invalid local asset role: ${role}`);
  return new URL(source, new URL(import.meta.env.BASE_URL, document.baseURI)).href;
}

function disposeObject(object) {
  if (!object) return;
  const geometries = new Set();
  const materials = new Set();
  const textures = new Set();
  object.traverse(node => {
    if (node.geometry) geometries.add(node.geometry);
    for (const material of Array.isArray(node.material) ? node.material : node.material ? [node.material] : []) {
      materials.add(material);
      for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
    }
  });
  for (const texture of textures) {
    texture.dispose();
    if (texture.image instanceof HTMLImageElement) texture.image.src = '';
    else texture.image?.close?.();
  }
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
}

function artPlane(texture, width, height, { transparent = false, opacity = 1 } = {}) {
  const material = new THREE.MeshBasicMaterial({
    map: texture, transparent, opacity, depthWrite: !transparent, toneMapped: false,
    side: THREE.FrontSide,
  });
  return new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
}

/**
 * A disposable, state-free picture stage. update() resolves only when the
 * selected scene is ready, so the caller can keep its usable flat stage visible.
 * No pointer listener, elapsed time or animation can dispatch a story event.
 */
export async function createRenderer({ container, onUnavailable = () => {} }) {
  if (!(container instanceof HTMLElement)) throw new TypeError('A renderer container is required.');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch (cause) {
    throw new Error('The 3D view is unavailable. The illustrated view remains playable.', { cause });
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.className = 'vivid-world-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none';
  container.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-3, 3, 3, -3, .1, 30);
  camera.position.set(0, .35, 8);
  camera.lookAt(0, .18, 0);
  const stage = new THREE.Group();
  scene.add(stage);
  const ambient = new THREE.HemisphereLight(0xf1e9cf, 0x304a48, 2.7);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xffe1a8, 4.2);
  key.position.set(-3, 4, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x91babb, 2.1);
  fill.position.set(4, 1, 3);
  scene.add(fill);
  const lamp = new THREE.PointLight(0xffc96f, .8, 3, 2);
  lamp.position.set(1.05, -.9, 1.05);
  stage.add(lamp);

  const gltfLoader = new GLTFLoader();
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let disposed = false;
  let failed = false;
  let epoch = 0;
  let currentKey = null;
  let pending = null;
  let abort = null;
  let model = null;
  let latest = null;
  let tilt = 0;
  let targetTilt = 0;
  let manualReducedMotion = false;
  let frame = 0;
  let sceneKind = 'portrait';
  let overlay = null;
  let underlay = null;
  let postcard = null;
  let portrait = null;
  let visualNodes = {};
  let loadCount = 0;

  function fail(reason) {
    if (disposed || failed) return;
    failed = true;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    abort?.abort();
    onUnavailable(reason);
  }

  function fitCamera() {
    if (disposed || failed) return;
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    const aspect = width / height;
    const contentWidth = sceneKind === 'workbench' ? 5.65 : 3.7;
    const contentHeight = sceneKind === 'workbench' ? 4.2 : 4.65;
    const vertical = Math.max(contentHeight, contentWidth / aspect);
    camera.left = -vertical * aspect / 2;
    camera.right = vertical * aspect / 2;
    camera.top = vertical / 2 + (sceneKind === 'portrait' ? .12 : 0);
    camera.bottom = -vertical / 2 + (sceneKind === 'portrait' ? .12 : 0);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    requestDraw();
  }

  function draw() {
    frame = 0;
    if (disposed || failed) return;
    const difference = targetTilt - tilt;
    tilt = manualReducedMotion || mediaQuery.matches || Math.abs(difference) < .0004 ? targetTilt : tilt + difference * .2;
    stage.rotation.y = tilt;
    stage.rotation.x = sceneKind === 'workbench' ? -.10 : 0;
    try {
      renderer.render(scene, camera);
    } catch {
      fail('The 3D view stopped drawing. Continue in the illustrated view.');
      return;
    }
    if (Math.abs(targetTilt - tilt) > .0004) frame = requestAnimationFrame(draw);
  }

  function requestDraw() {
    if (!disposed && !failed && !frame) frame = requestAnimationFrame(draw);
  }

  async function fetchBytes(url, signal) {
    const result = await fetch(url, { signal, credentials: 'same-origin' });
    if (!result.ok) throw new Error(`Artwork could not load (${result.status}).`);
    return result.arrayBuffer();
  }

  async function loadTexture(url, signal) {
    const bytes = await fetchBytes(url, signal);
    if (signal.aborted) throw new DOMException('Asset loading cancelled', 'AbortError');
    const blob = new Blob([bytes], { type: url.endsWith('.svg') ? 'image/svg+xml' : 'image/png' });
    const objectURL = URL.createObjectURL(blob);
    const image = new Image();
    try {
      await new Promise((resolve, reject) => {
        const cancel = () => { image.src = ''; reject(new DOMException('Asset loading cancelled', 'AbortError')); };
        image.onload = () => { signal.removeEventListener('abort', cancel); resolve(); };
        image.onerror = () => { signal.removeEventListener('abort', cancel); reject(new Error('The illustrated artwork could not be decoded.')); };
        signal.addEventListener('abort', cancel, { once: true });
        image.src = objectURL;
      });
      if (signal.aborted) throw new DOMException('Asset loading cancelled', 'AbortError');
      const texture = new THREE.Texture(image);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
      texture.needsUpdate = true;
      return texture;
    } finally {
      image.onload = null;
      image.onerror = null;
      URL.revokeObjectURL(objectURL);
    }
  }

  async function buildScene(kind, manifest, actorId, signal) {
    const group = new THREE.Group();
    const role = kind === 'workbench' ? 'workbench' : 'frame';
    const modelURL = resolveAsset(manifest, role, actorId);
    const bytes = await fetchBytes(modelURL, signal);
    const gltf = await gltfLoader.parseAsync(bytes, modelURL.slice(0, modelURL.lastIndexOf('/') + 1));
    group.add(gltf.scene);
    const textures = [];
    try {
      if (signal.aborted) throw new DOMException('Asset loading cancelled', 'AbortError');
      if (kind === 'portrait') {
        const texture = await loadTexture(resolveAsset(manifest, 'portrait', actorId), signal);
        textures.push(texture);
        const picture = artPlane(texture, 2.58, 3.335);
        picture.name = 'PaintedPortrait';
        picture.position.set(0, .25, .142);
        group.add(picture);
      } else {
        // A pack's selected scene loads only its own art. Keeping each load
        // sequential makes cancellation predictable and bounds transient memory.
        for (const [name, assetRole, z] of [
          ['Postcard', 'postcard', .154],
          ['SketchUnderlay', 'sketch-underlay', .163],
          ['SketchOverlay', 'sketch-overlay', .175],
        ]) {
          const texture = await loadTexture(resolveAsset(manifest, assetRole, actorId), signal);
          textures.push(texture);
          const paper = artPlane(texture, 3.48, 2.436, { transparent: name !== 'Postcard' });
          paper.name = name;
          paper.position.set(.05, .03, z);
          group.add(paper);
        }
      }
      return group;
    } catch (error) {
      disposeObject(group);
      // A texture can have loaded just before its plane was attached.
      for (const texture of textures) texture.dispose();
      throw error;
    }
  }

  function applyView() {
    if (!model || !latest || disposed || failed) return;
    const presentation = latest.scene;
    if (sceneKind === 'portrait') {
      const steady = presentation.light === 'steady';
      lamp.visible = true;
      lamp.intensity = steady ? 1.2 : .42;
      const shade = visualNodes.LampShade;
      if (shade) shade.rotation.z = presentation.notchBraced ? 0 : .065;
      const wedge = visualNodes.Wedge;
      if (wedge) {
        // Do not mutate shared model geometry or author game state from its
        // position. This merely displays a semantic reducer checkpoint.
        wedge.position.x = presentation.wedgePlaced ? .72 : .9;
        wedge.position.z = presentation.wedgePlaced ? .29 : .37;
      }
      const placement = presentation.placement;
      if (visualNodes.LetterProp) visualNodes.LetterProp.visible = ['private', 'letter', 'recess', 'sheltered-recess'].includes(placement);
      if (visualNodes.DedicationProp) visualNodes.DedicationProp.visible = ['archive', 'dedication', 'harbour-edge', 'harbour-facing-edge'].includes(placement);
      if (visualNodes.ClothProp) visualNodes.ClothProp.visible = ['neutral', 'cloth', 'cleaning-cloth', 'cloth-rest', 'ledge'].includes(placement);
      if (portrait) portrait.material.color.set(steady ? 0xffffff : 0xe7efee);
      if (visualNodes.LampGlow?.material) visualNodes.LampGlow.material.emissiveIntensity = steady ? 1.2 : .45;
    } else {
      lamp.visible = false;
      const alignment = bounded(presentation.alignment, 0, 6, 0);
      const target = bounded(presentation.alignmentTarget, 0, 6, 3);
      // The illustration is only a preview. REVEAL remains a validated story
      // event and is never dispatched here when registration lines coincide.
      if (overlay) {
        overlay.position.x = .05 + (alignment - target) * .12;
        overlay.rotation.z = (alignment - target) * .008;
        overlay.visible = Number(presentation.clueCount) >= 1 || presentation.revealed === true;
        overlay.material.opacity = presentation.revealed ? 1 : .85;
      }
      if (underlay) underlay.visible = Number(presentation.clueCount) >= 1 || presentation.revealed === true;
      if (postcard) postcard.visible = !presentation.revealed && Number(presentation.clueCount) === 0;
    }
    requestDraw();
  }

  async function update(viewModel, manifest) {
    if (disposed || failed) return;
    if (!viewModel?.scene || !['portrait', 'workbench'].includes(viewModel.scene.kind)) {
      fail('This scene needs the illustrated view.');
      return;
    }
    latest = viewModel;
    const kind = viewModel.scene.kind;
    const actorId = viewModel.scene.actorId;
    const roles = kind === 'portrait' ? ['frame', 'portrait'] : ['workbench', 'postcard', 'sketch-underlay', 'sketch-overlay'];
    let key;
    try {
      key = JSON.stringify([kind, roles.map(role => resolveAsset(manifest, role, actorId))]);
    } catch (error) {
      fail(error.message);
      throw error;
    }
    targetTilt = bounded(viewModel.scene.view, -1, 1, 0) * MAX_TILT;
    if (currentKey === key) {
      if (pending) await pending;
      applyView();
      return;
    }
    abort?.abort();
    abort = new AbortController();
    const thisAbort = abort;
    const thisEpoch = ++epoch;
    currentKey = key;
    if (model) {
      stage.remove(model);
      disposeObject(model);
      model = null;
    }
    pending = (async () => {
      let loaded;
      try {
        loaded = await buildScene(kind, manifest, actorId, thisAbort.signal);
        if (disposed || failed || epoch !== thisEpoch || thisAbort.signal.aborted) {
          disposeObject(loaded);
          return;
        }
        model = loaded;
        sceneKind = kind;
        visualNodes = {};
        model.traverse(node => { if (node.name) visualNodes[node.name] = node; });
        overlay = visualNodes.SketchOverlay;
        underlay = visualNodes.SketchUnderlay;
        postcard = visualNodes.Postcard;
        portrait = visualNodes.PaintedPortrait;
        stage.add(model);
        loadCount += 1;
        fitCamera();
        applyView();
      } catch (error) {
        if (error.name === 'AbortError' || disposed || epoch !== thisEpoch) return;
        fail('Some 3D artwork could not load. Continue in the illustrated view.');
        throw error;
      } finally {
        if (epoch === thisEpoch) pending = null;
      }
    })();
    await pending;
  }

  function setTilt(value, { immediate = false } = {}) {
    if (disposed || failed) return;
    targetTilt = bounded(value, -1, 1, 0) * MAX_TILT;
    if (immediate) tilt = targetTilt;
    requestDraw();
  }

  function setReducedMotion(value) {
    if (disposed || failed) return;
    manualReducedMotion = value === true;
    if (manualReducedMotion) tilt = targetTilt;
    requestDraw();
  }

  function contextLost(event) {
    event.preventDefault();
    fail('The 3D view lost its graphics context. Your story continues in the illustrated view.');
  }

  const resize = new ResizeObserver(fitCamera);
  resize.observe(container);
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  const reducedMotionChanged = () => { tilt = targetTilt; requestDraw(); };
  mediaQuery.addEventListener('change', reducedMotionChanged);
  fitCamera();

  function stats() {
    return {
      activeTriangles: renderer.info.render.triangles,
      drawCalls: renderer.info.render.calls,
      pixelRatio: renderer.getPixelRatio(),
      geometries: renderer.info.memory.geometries,
      textures: renderer.info.memory.textures,
      loadCount,
      sceneKind,
      disposed,
      failed,
      activeAnimation: Boolean(frame),
      tiltRadians: tilt,
      targetTiltRadians: targetTilt,
      reducedMotion: manualReducedMotion || mediaQuery.matches,
    };
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    ++epoch;
    abort?.abort();
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    resize.disconnect();
    mediaQuery.removeEventListener('change', reducedMotionChanged);
    renderer.domElement.removeEventListener('webglcontextlost', contextLost);
    stage.remove(model);
    disposeObject(model);
    model = null;
    latest = null;
    visualNodes = {};
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    scene.clear();
  }

  return { update, setTilt, setReducedMotion, dispose, stats };
}
