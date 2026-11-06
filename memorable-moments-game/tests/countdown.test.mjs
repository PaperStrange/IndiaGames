import assert from 'node:assert/strict';
import test from 'node:test';
import { createCountdown } from '../play/countdown.js';

function fixture() {
  let time = 100000;
  let nextHandle = 0;
  const callbacks = new Map();
  const active = new Set();
  const ticks = [];
  let finished = 0;
  const timer = createCountdown({
    now: () => time,
    schedule: (callback, delay) => {
      assert.equal(delay, 1000);
      const handle = nextHandle++;
      callbacks.set(handle, callback);
      active.add(handle);
      return handle;
    },
    unschedule: handle => active.delete(handle),
    onTick: value => ticks.push(value),
    onFinish: () => { finished += 1; },
  });
  return {
    timer, ticks, active,
    finished: () => finished,
    advance: delta => { time += delta; },
    tick: handle => callbacks.get(handle)(),
  };
}

test('repeated start owns only one interval and leaves the initial display alone', () => {
  const f = fixture();
  assert.equal(f.timer.start(), true);
  assert.equal(f.timer.start(), false);
  assert.deepEqual([...f.active], [0]);
  assert.deepEqual(f.ticks, []);
});

test('delayed ticks use wall time instead of counting scheduled callbacks', () => {
  const f = fixture();
  f.timer.start();
  f.advance(1000); f.tick(0);
  f.advance(10000); f.tick(0);
  assert.deepEqual(f.ticks, [44, 34]);
  assert.equal(f.finished(), 0);
});

test('expiry clamps at zero, finishes once and needs cancel before restarting', () => {
  const f = fixture();
  f.timer.start();
  f.advance(46000); f.tick(0);
  f.tick(0); // Simulate a callback already queued when the interval was cleared.
  assert.deepEqual(f.ticks, [0]);
  assert.equal(f.finished(), 1);
  assert.equal(f.active.size, 0);
  assert.equal(f.timer.start(), false);
  f.timer.cancel();
  assert.equal(f.timer.start(), true);
});

test('cancel is safe before start and removes an active zero-valued handle', () => {
  const f = fixture();
  f.timer.cancel(); f.timer.cancel();
  f.timer.start(); f.timer.cancel();
  f.advance(60000); f.tick(0);
  assert.equal(f.active.size, 0);
  assert.deepEqual(f.ticks, []);
  assert.equal(f.finished(), 0);
});

test('a canceled screen cannot update or finish a later timer', () => {
  const f = fixture();
  f.timer.start();
  f.advance(12000); f.tick(0);
  f.timer.cancel(); f.timer.start();
  f.advance(1000); f.tick(0); f.tick(1);
  assert.deepEqual(f.ticks, [33, 44]);
  assert.deepEqual([...f.active], [1]);
  assert.equal(f.finished(), 0);
});
