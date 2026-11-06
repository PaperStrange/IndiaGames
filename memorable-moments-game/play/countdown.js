// Timer-owned lifecycle; game.js owns the DOM and cancels this on every stage change.
export function createCountdown({
  onTick,
  onFinish,
  now = () => Date.now(),
  schedule = (callback, delay) => setInterval(callback, delay),
  unschedule = handle => clearInterval(handle),
}) {
  let handle = null;
  let started = false;
  let generation = 0;

  function cancel() {
    if (handle !== null) unschedule(handle);
    handle = null;
    started = false;
    generation += 1;
  }

  function start() {
    if (started) return false;
    started = true;
    const current = ++generation;
    const deadline = now() + 45000;
    handle = schedule(() => {
      // A queued callback from an earlier screen must not update the current one.
      if (current !== generation) return;
      const remaining = Math.max(0, Math.ceil((deadline - now()) / 1000));
      onTick(remaining);
      if (remaining === 0) {
        unschedule(handle);
        handle = null;
        generation += 1;
        onFinish();
      }
    }, 1000);
    return true;
  }

  return { start, cancel };
}
