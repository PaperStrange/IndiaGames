import { catalog } from "./stories/catalog.js";
import { createSession, loadStory } from "./runtime/index.js";

const $ = (id) => document.getElementById(id);
const base = import.meta.env.BASE_URL;
const params = new URLSearchParams(location.search);
const profile = params.get("profile") === "neutral" ? "neutral" : "remembered";
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
let motion = !reduced.matches;
let flat = params.get("flat") === "1";
let current = null,
  session = null,
  world = null,
  generation = 0,
  rendererGeneration = 0;
let vm = null,
  selectedObject = null,
  confirmReset = false,
  controls = new AbortController();
let transcript = [],
  lastTranscript = "",
  worldPointer = null;
$("motion").checked = motion;
$("flat").checked = flat;
document.body.classList.toggle("motion-off", !motion);

function element(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}
function localAsset(src) {
  return `${base}${src}`;
}
function makeCards() {
  $("story-cards").replaceChildren(
    ...catalog.map((entry, index) => {
      const card = element("button", "story-card");
      card.dataset.story = entry.id;
      card.type = "button";
      const presentation = entry.presentation || {};
      const art = element(
        "div",
        `card-art ${presentation.kind === "workbench" ? "paper" : ""}`,
      );
      art.setAttribute("aria-hidden", "true");
      art.append(element("span", "card-index", `0${index + 1}`));
      const mount = element(
        "div",
        presentation.kind === "workbench" ? "card-postcard" : "card-frame",
      );
      if (presentation.art) {
        const img = element("img");
        img.src = localAsset(presentation.art);
        img.alt = "";
        mount.append(img);
      }
      art.append(mount);
      if (presentation.kind === "workbench")
        art.append(element("span", "card-stamp", "POST / 02"));
      const body = element("div", "card-body"),
        meta = element("div", "card-meta");
      meta.append(
        element("span", "", entry.subtitle),
        element("span", "", "A small story"),
      );
      body.append(
        meta,
        element("h2", "", entry.title),
        element("p", "", entry.description),
      );
      const enter = element("span", "card-enter");
      enter.append(
        element("span", "", entry.duration),
        element("span", "", "↗"),
      );
      body.append(enter);
      card.append(art, body);
      card.addEventListener("click", () => openStory(entry));
      return card;
    }),
  );
}
function disposeWorld() {
  rendererGeneration++;
  releaseWorldPointer();
  world?.dispose();
  world = null;
  $("world").classList.remove("has-three");
  $("three-world").replaceChildren();
}
function showFlat(reason = "Illustrated world") {
  disposeWorld();
  $("render-label").textContent = reason;
}
async function startWorld() {
  disposeWorld();
  if (flat || !current) {
    $("render-label").textContent = "Flat illustration";
    return;
  }
  const token = rendererGeneration,
    storyToken = generation;
  const stale = () =>
    token !== rendererGeneration || storyToken !== generation || flat;
  $("render-label").textContent = "Opening the world…";
  let candidate;
  try {
    const { createRenderer } = await import("./renderers/world.js");
    if (stale()) return;
    candidate = await createRenderer({
      container: $("three-world"),
      onUnavailable: () => {
        if (!stale()) showFlat("Illustration · 3D unavailable");
      },
    });
    if (stale()) {
      candidate.dispose();
      return;
    }
    world = candidate;
    candidate.setReducedMotion(!motion);
    await candidate.update(vm, current.manifest);
    if (stale()) {
      candidate.dispose();
      return;
    }
    candidate.setTilt(motion ? vm.scene.view || 0 : 0, { immediate: !motion });
    $("world").classList.add("has-three");
    $("render-label").textContent = "A little world in 3D";
  } catch {
    candidate?.dispose();
    if (!stale()) showFlat("Illustration · 3D unavailable");
  }
}
function leaveStory({ focus = true } = {}) {
  generation++;
  controls.abort();
  session?.dispose();
  session = null;
  current = null;
  vm = null;
  disposeWorld();
  selectedObject = null;
  confirmReset = false;
  transcript = [];
  lastTranscript = "";
  $("transcript-lines").replaceChildren();
  $("transcript").open = false;
  $("reset").textContent = "Forget this story";
  $("experience").hidden = true;
  $("gallery").hidden = false;
  $("load-error").hidden = true;
  history.replaceState(null, "", location.pathname + location.search);
  if (focus)
    ($("gallery-title").setAttribute("tabindex", "-1"),
      $("gallery-title").focus({ preventScroll: true }));
}
async function openStory(entry) {
  leaveStory({ focus: false });
  const token = generation;
  const card = document.querySelector(`[data-story="${entry.id}"]`);
  card?.classList.add("pending");
  try {
    const pack = await loadStory(entry);
    if (token !== generation) return;
    current = pack;
    let storage;
    try {
      storage = window.localStorage;
    } catch {
      storage = {
        getItem() {
          throw new Error("Storage unavailable");
        },
        setItem() {
          throw new Error("Storage unavailable");
        },
        removeItem() {
          throw new Error("Storage unavailable");
        },
      };
    }
    session = createSession({ pack, profile, storage });
    session.subscribe(() => render());
    $("gallery").hidden = true;
    $("experience").hidden = false;
    $("load-error").hidden = true;
    history.replaceState(
      null,
      "",
      `${location.pathname}${location.search}#${encodeURIComponent(entry.id)}`,
    );
    render();
    $("story-title").setAttribute("tabindex", "-1");
    $("story-title").focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
    await startWorld();
  } catch (e) {
    if (token !== generation) return;
    leaveStory({ focus: false });
    $("load-error").textContent =
      "This story could not be opened. Your saved visits have not been replaced. Try the other story or reload this page.";
    $("load-error").hidden = false;
    console.warn("Story could not be loaded:", e.message);
  } finally {
    card?.classList.remove("pending");
  }
}
function dispatch(event) {
  if (!session) return;
  selectedObject = null;
  confirmReset = false;
  $("reset").textContent = "Forget this story";
  $("interaction-status").textContent = "";
  session.dispatch(event);
}
function actionButton(action) {
  const button = element("button", "action-button", action.label);
  button.type = "button";
  button.dataset.action = action.id;
  button.disabled = !!action.disabled;
  if (typeof action.selected === "boolean") {
    button.setAttribute("aria-pressed", String(action.selected));
    button.classList.toggle("selected", action.selected);
  }
  if (action.hint) button.append(element("small", "", action.hint));
  button.addEventListener("click", () => dispatch(action.event), {
    signal: controls.signal,
  });
  return button;
}
function placementControl(action) {
  const wrap = element("div", "place-control");
  wrap.dataset.place = action.id;
  const object = element("button", "action-button", action.objectLabel),
    target = element(
      "button",
      "action-button destination",
      action.destinationLabel,
    );
  object.type = target.type = "button";
  object.dataset.action = action.id;
  target.dataset.destination = action.id;
  object.disabled = target.disabled = !!action.disabled;
  const hint = element(
    "p",
    "",
    `Select ${action.objectLabel.toLowerCase()}, then its place. You can also drag it across.`,
  );
  const select = () => {
    selectedObject = action.id;
    object.classList.add("selected");
    object.setAttribute("aria-pressed", "true");
    $("interaction-status").textContent =
      `${action.objectLabel} selected. Choose ${action.destinationLabel.toLowerCase()}.`;
  };
  object.setAttribute("aria-pressed", "false");
  object.addEventListener(
    "click",
    (event) => {
      if (!suppressClick || event.detail === 0) select();
      suppressClick = false;
    },
    { signal: controls.signal },
  );
  target.addEventListener(
    "click",
    () => {
      if (selectedObject === action.id) dispatch(action.event);
      else
        $("interaction-status").textContent =
          `Select ${action.objectLabel.toLowerCase()} first.`;
    },
    { signal: controls.signal },
  );
  let drag = null,
    suppressClick = false;
  const clear = () => {
    const previous = drag;
    drag = null;
    wrap.classList.remove("dragging");
    if (previous && object.hasPointerCapture(previous.id))
      object.releasePointerCapture(previous.id);
  };
  const cancel = () => {
    if (!drag) return;
    suppressClick = true;
    clear();
    if (selectedObject === action.id) selectedObject = null;
    object.classList.remove("selected");
    object.setAttribute("aria-pressed", "false");
    $("interaction-status").textContent =
      "Placement cancelled. The object has stayed where it was.";
  };
  object.addEventListener(
    "pointerdown",
    (event) => {
      if (!event.isPrimary || event.button !== 0 || action.disabled) return;
      suppressClick = false;
      drag = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        moved: false,
      };
      object.setPointerCapture(event.pointerId);
    },
    { signal: controls.signal },
  );
  object.addEventListener(
    "pointermove",
    (event) => {
      if (!drag || drag.id !== event.pointerId) return;
      if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 6) {
        drag.moved = true;
        wrap.classList.add("dragging");
      }
    },
    { signal: controls.signal },
  );
  object.addEventListener(
    "pointerup",
    (event) => {
      if (!drag || drag.id !== event.pointerId) return;
      const moved = drag.moved,
        hit = document.elementFromPoint(event.clientX, event.clientY);
      suppressClick = moved;
      clear();
      if (moved && (hit === target || target.contains(hit)))
        dispatch(action.event);
      else if (moved) {
        $("interaction-status").textContent =
          "The object stays with you. Select it and choose its place when you are ready.";
      }
    },
    { signal: controls.signal },
  );
  object.addEventListener(
    "pointercancel",
    (event) => {
      if (drag?.id === event.pointerId) cancel();
    },
    { signal: controls.signal },
  );
  object.addEventListener("lostpointercapture", cancel, {
    signal: controls.signal,
  });
  document.addEventListener(
    "pointerdown",
    (event) => {
      if (drag && event.pointerId !== drag.id) cancel();
    },
    { signal: controls.signal },
  );
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") cancel();
    },
    { signal: controls.signal },
  );
  controls.signal.addEventListener("abort", clear, { once: true });
  wrap.append(object, target, hint);
  return wrap;
}
function adjustmentControl(action) {
  const wrap = element("div", "adjust-control"),
    label = element("label", "", action.label),
    input = element("input");
  input.type = "range";
  input.min = action.min;
  input.max = action.max;
  input.step = action.step;
  input.value = action.value;
  input.id = `adjust-${action.id}`;
  input.dataset.action = action.id;
  input.disabled = !!action.disabled;
  label.htmlFor = input.id;
  const hintId = `hint-${action.id}`;
  input.setAttribute("aria-describedby", hintId);
  const commit = (value) => dispatch({ ...action.event, value: Number(value) });
  input.addEventListener("change", () => commit(input.value), {
    signal: controls.signal,
  });
  input.addEventListener(
    "input",
    () => {
      const preview = {
        ...vm,
        scene: { ...vm.scene, alignment: Number(input.value) },
      };
      $("world").style.setProperty(
        "--alignment",
        `${(Number(input.value) - (vm.scene.alignmentTarget || 0)) * 8}px`,
      );
      const active = world,
        token = rendererGeneration;
      Promise.resolve(active?.update(preview, current.manifest)).catch(() => {
        if (world === active && token === rendererGeneration)
          showFlat("Illustration · 3D unavailable");
      });
    },
    { signal: controls.signal },
  );
  const minus = element("button", "action-button", "−"),
    plus = element("button", "action-button", "+");
  minus.type = plus.type = "button";
  minus.setAttribute("aria-label", `Decrease ${action.label.toLowerCase()}`);
  plus.setAttribute("aria-label", `Increase ${action.label.toLowerCase()}`);
  minus.dataset.action = `${action.id}-minus`;
  plus.dataset.action = `${action.id}-plus`;
  minus.disabled = action.disabled || action.value <= action.min;
  plus.disabled = action.disabled || action.value >= action.max;
  minus.addEventListener(
    "click",
    () => commit(Math.max(action.min, action.value - action.step)),
    { signal: controls.signal },
  );
  plus.addEventListener(
    "click",
    () => commit(Math.min(action.max, action.value + action.step)),
    { signal: controls.signal },
  );
  const hint = element(
    "p",
    "action-group-label",
    action.hint || "Use the slider, arrow keys or step buttons.",
  );
  hint.id = hintId;
  wrap.append(label, minus, input, plus, hint);
  return wrap;
}
function render() {
  if (!current || !session) return;
  const focusedElement = document.activeElement;
  const focusRole =
    focusedElement?.dataset?.destination !== undefined
      ? "destination"
      : "action";
  const focused = focusedElement?.dataset?.[focusRole];
  const focusedAdjustment = focusedElement
    ?.closest(".adjust-control")
    ?.querySelector("input")?.dataset.action;
  const focusWasAction = $("actions").contains(focusedElement);
  controls.abort();
  controls = new AbortController();
  selectedObject = null;
  vm = current.getViewModel(session.getState());
  for (const [id, value] of Object.entries({
    "story-title": vm.title,
    "story-kicker": vm.kicker,
    speaker: vm.speaker,
    narration: vm.text,
    "story-progress": vm.progress,
    "choice-summary": vm.choiceSummary || "",
  }))
    $(id).textContent = value || "";
  $("speaker").hidden = !vm.speaker;
  $("inspection").hidden = !vm.inspection;
  $("inspection-title").textContent = vm.inspection?.title || "";
  $("inspection-text").textContent = vm.inspection?.text || "";
  $("world").classList.toggle("workbench", vm.scene.kind === "workbench");
  $("world").classList.toggle("steady", vm.scene.light === "steady");
  $("world").classList.toggle("has-placement", !!vm.scene.placement);
  $("world").classList.toggle("notch-braced", !!vm.scene.notchBraced);
  $("world").classList.toggle("wedge-placed", !!vm.scene.wedgePlaced);
  $("world").dataset.notchBraced = String(!!vm.scene.notchBraced);
  $("world").dataset.wedgePlaced = String(!!vm.scene.wedgePlaced);
  $("world").dataset.placement = vm.scene.placement || "";
  $("world").dataset.view = String(vm.scene.view || 0);
  $("world").style.setProperty(
    "--alignment",
    `${((vm.scene.alignment || 0) - (vm.scene.alignmentTarget || 0)) * 8}px`,
  );
  const actor = current.manifest.cast?.[vm.scene.actorId];
  const portrait =
    actor?.portrait ||
    current.manifest.assets.find((a) => a.id === "portrait")?.src;
  if (portrait) $("flat-art").src = localAsset(portrait);
  else $("flat-art").removeAttribute("src");
  $("scene-caption").textContent = vm.scene.memory
    ? "An earlier watch · a recollection"
    : current.manifest.subtitle;
  $("scene-description").textContent = vm.scene.details?.length
    ? vm.scene.details.join(" · ")
    : actor?.description || "A workbench waits for a closer look.";
  $("flat-world").style.transform = motion
    ? `perspective(900px) rotateY(${(vm.scene.view || 0) * 6}deg)`
    : "";
  $("world").setAttribute(
    "aria-label",
    `${vm.scene.kind === "portrait" ? "A framed painted portrait" : "A station workbench and lightbox"}. ${$("scene-description").textContent}${vm.scene.placement ? " An object is now in its remembered place." : ""}`,
  );
  if (world) {
    const active = world,
      token = rendererGeneration;
    Promise.resolve(active.update(vm, current.manifest)).catch(() => {
      if (world === active && token === rendererGeneration)
        showFlat("Illustration · 3D unavailable");
    });
    if (!motion) active.setTilt(0, { immediate: true });
  }
  const groups = new Map();
  $("actions").replaceChildren();
  for (const action of vm.actions) {
    const key = action.group || "";
    let group = groups.get(key);
    if (!group) {
      group = element("div", "action-group");
      if (key) group.append(element("p", "action-group-label", key));
      groups.set(key, group);
      $("actions").append(group);
    }
    group.append(
      action.kind === "place"
        ? placementControl(action)
        : action.kind === "adjust"
          ? adjustmentControl(action)
          : actionButton(action),
    );
  }
  if (
    vm.actions.length === 1 &&
    !["place", "adjust"].includes(vm.actions[0].kind)
  )
    $("actions").querySelector("button")?.classList.add("primary");
  const status = session.status;
  $("storage-status").textContent =
    status.message || "Your visit is remembered in this browser.";
  $("storage-status").classList.toggle("warning", status.kind !== "ok");
  $("recover").hidden = !["corrupt", "future"].includes(status.kind);
  const line = [
    vm.speaker ? `${vm.speaker}: ${vm.text}` : vm.text,
    vm.inspection ? `${vm.inspection.title}: ${vm.inspection.text}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  if (line !== lastTranscript) {
    transcript.push(line);
    lastTranscript = line;
    $("transcript-lines").append(element("li", "", line));
  }
  if (focusWasAction) {
    const candidates = [
      ...$("actions").querySelectorAll("[data-action],[data-destination]"),
    ];
    const next =
      candidates.find(
        (el) => !el.disabled && el.dataset[focusRole] === focused,
      ) ||
      candidates.find(
        (el) =>
          !el.disabled &&
          el.tagName === "INPUT" &&
          el.dataset.action === focusedAdjustment,
      ) ||
      $("actions").querySelector(
        "button:not(:disabled),input:not(:disabled)",
      ) ||
      $("back");
    next.focus({ preventScroll: true });
  }
}
$("back").addEventListener("click", () => leaveStory());
$("home-link").addEventListener("click", (e) => {
  e.preventDefault();
  leaveStory();
});
$("settings-toggle").addEventListener("click", () => {
  $("settings").hidden = !$("settings").hidden;
  $("settings-toggle").setAttribute(
    "aria-expanded",
    String(!$("settings").hidden),
  );
});
function applyMotion(enabled) {
  motion = enabled;
  $("motion").checked = motion;
  document.body.classList.toggle("motion-off", !motion);
  $("motion-hint").textContent = motion
    ? "Drag gently to look around"
    : "Gentle movement is off";
  world?.setReducedMotion(!motion);
  settleWorld();
  if (current) render();
}
$("motion").addEventListener("change", () => applyMotion($("motion").checked));
reduced.addEventListener("change", () => {
  if (reduced.matches) applyMotion(false);
});
$("flat").addEventListener("change", () => {
  flat = $("flat").checked;
  startWorld();
});
$("reset").addEventListener("click", () => {
  if (!session) return;
  if (!confirmReset) {
    confirmReset = true;
    $("reset").textContent = "Confirm: forget this story";
    return;
  }
  transcript = [];
  lastTranscript = "";
  $("transcript-lines").replaceChildren();
  confirmReset = false;
  $("reset").textContent = "Forget this story";
  session.reset();
});
$("recover").addEventListener("click", () => {
  session?.recover();
  render();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    selectedObject = null;
    confirmReset = false;
    $("reset").textContent = "Forget this story";
    $("actions")
      .querySelectorAll(".place-control .selected")
      .forEach((el) => {
        el.classList.remove("selected");
        el.setAttribute("aria-pressed", "false");
      });
    $("interaction-status").textContent = "Selection cancelled.";
  }
});
$("world").addEventListener("pointerdown", (event) => {
  if (!motion || !vm || !event.isPrimary || event.button !== 0) return;
  releaseWorldPointer();
  worldPointer = { id: event.pointerId, x: event.clientX };
  $("world").setPointerCapture(event.pointerId);
});
$("world").addEventListener("pointermove", (event) => {
  if (!motion || !vm || !worldPointer || event.pointerId !== worldPointer.id)
    return;
  const tilt = Math.max(
    -1,
    Math.min(1, (event.clientX - worldPointer.x) / 140 + (vm.scene.view || 0)),
  );
  world?.setTilt(tilt);
  $("flat-world").style.transform =
    `perspective(900px) rotateY(${tilt * 12}deg)`;
});
function releaseWorldPointer() {
  const previous = worldPointer;
  worldPointer = null;
  if (previous && $("world").hasPointerCapture(previous.id))
    $("world").releasePointerCapture(previous.id);
}
function settleWorld(event) {
  if (event && (!worldPointer || event.pointerId !== worldPointer.id)) return;
  releaseWorldPointer();
  if (vm) {
    world?.setTilt(motion ? vm.scene.view || 0 : 0, { immediate: !motion });
    $("flat-world").style.transform = motion
      ? `perspective(900px) rotateY(${(vm.scene.view || 0) * 6}deg)`
      : "";
  }
}
for (const name of ["pointerup", "pointercancel", "lostpointercapture"])
  $("world").addEventListener(name, settleWorld);
document.addEventListener("pointerdown", (event) => {
  if (worldPointer && event.pointerId !== worldPointer.id) settleWorld();
});
window.addEventListener("pagehide", () => {
  generation++;
  controls.abort();
  session?.dispose();
  disposeWorld();
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    const entry = catalog.find((item) => item.id === current?.manifest.id);
    if (entry) openStory(entry);
  }
});
makeCards();
$("motion-hint").textContent = motion
  ? "Drag gently to look around"
  : "Gentle movement is off";
function routeBookmark() {
  // The skip link is a document anchor, not a story navigation request.
  if (location.hash === "#main") return;
  let requestedStory = "";
  try {
    requestedStory = decodeURIComponent(location.hash.slice(1));
  } catch {
    /* Invalid bookmarks return to the collection. */
  }
  const entry = catalog.find((item) => item.id === requestedStory);
  if (entry) {
    if (entry.id !== current?.manifest.id) openStory(entry);
  } else leaveStory({ focus: false });
}
window.addEventListener("hashchange", routeBookmark);
routeBookmark();
