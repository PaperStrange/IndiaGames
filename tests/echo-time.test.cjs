const { test } = require('node:test');
const assert = require('node:assert/strict');
const rules = require('../js/echo-time.js');
const state = () => ({loop:2,phase:0,momentum:1,echoUsed:false,flags:{'square:0':'Help Mina'}});

test('only a district learned in an earlier loop can buy time', () => {
  assert.equal(rules.canBorrow(state(),'square'), true);
  assert.equal(rules.canBorrow({...state(),flags:{'square:1':'Dance'}},'square'), false);
  assert.equal(rules.canBorrow({...state(),loop:1},'square'), false);
  assert.equal(rules.canBorrow(state(),'gate'), false);
});
test('the time budget requires Momentum, resets each loop, and ends at midnight', () => {
  assert.equal(rules.canBorrow({...state(),momentum:0},'square'), false);
  assert.equal(rules.canBorrow({...state(),echoUsed:true},'square'), false);
  assert.equal(rules.canBorrow({...state(),phase:3},'square'), false);
  assert.equal(rules.canBorrow({...state(),loop:3},'square'), true);
});
test('catastrophe overrides borrowed time; normal actions never hold the bell', () => {
  assert.equal(rules.holdsBell(true,3), true);
  assert.equal(rules.holdsBell(true,4), false);
  assert.equal(rules.holdsBell(false,1), false);
});
