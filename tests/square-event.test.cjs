const {test} = require('node:test');
const assert = require('node:assert/strict');
const rules = require('../js/square-event.js');
const echo = require('../js/echo-time.js');
const clue = {eventId:rules.EVENT,loop:1,phase:1,place:'square'};
const state = (extra={}) => ({loop:1,phase:0,fracture:1,squareClue:null,squareDay:rules.day(1),...extra});
const commit = (extra={}) => ({actionId:'ordinary',place:{root:'square'},borrowed:false,...extra});
const preparedState = (extra={}) => state({loop:2,squareClue:clue,squareDay:rules.day(2),...extra});
const prep = () => commit({actionId:rules.ACTION});

test('Noon blockage is independent of a correct, wrong or blank forecast', () => {
  for (const picked of [0,1,undefined]) {
    const result = rules.settle(state({predictions:{'1:0':picked}}),commit());
    assert.equal(result.day.status,'blocked');
    assert.deepEqual(result.clue,clue);
    assert.equal(result.event.provenance.knowledge,'witnessed');
  }
});

test('ordinary travel elsewhere produces a report, not an eyewitness clue', () => {
  const result=rules.settle(state(),commit({place:{root:'gate'}}));
  assert.equal(result.day.status,'blocked');
  assert.equal(result.clue,null);
  assert.equal(result.event.provenance.knowledge,'reported');
  assert.equal(result.event.provenance.place,'gate');
});

test('late arrival cannot manufacture a clue or resolve the event again', () => {
  const morning=rules.settle(state(),commit({place:{root:'gate'}}));
  const afternoon=rules.settle(state({phase:1,squareDay:morning.day}),commit());
  assert.equal(afternoon.clue,null);
  assert.equal(afternoon.event,null);
  assert.equal(afternoon.day.status,'blocked');
});

test('earned preparation requires a prior-loop clue, Dawn and an unused opportunity', () => {
  assert.equal(rules.eligibility(state()).reason,'unseen');
  assert.equal(rules.eligibility(state({squareClue:clue})).reason,'next-loop');
  assert.equal(rules.eligibility(preparedState()).ok,true);
  assert.equal(rules.eligibility(preparedState({phase:1})).reason,'late');
  assert.equal(rules.eligibility(preparedState({squareDay:{...rules.day(2),preparation:{}}})).reason,'prepared');
  assert.equal(rules.eligibility(preparedState({squareDay:{...rules.day(2),status:'safe'}})).reason,'resolved');
});

test('ordinary preparation works without Momentum and yields the well outcome', () => {
  const result=rules.settle(preparedState({momentum:0}),prep());
  assert.equal(result.day.status,'safe');
  assert.equal(result.day.preparation.actionId,rules.ACTION);
  assert.equal(result.hold,false);
  assert.deepEqual(result.clue,clue);
  assert.equal(result.event.provenance.loop,2);
});

test('borrowed preparation holds Dawn; following normal travel resolves the prepared crossing', () => {
  const first=rules.settle(preparedState(),{...prep(),borrowed:true});
  assert.equal(first.day.status,'pending');
  assert.equal(first.hold,true);
  assert.equal(first.event,null);
  const next=rules.settle(preparedState({fracture:2,squareDay:first.day}),commit({place:{root:'hospice'}}));
  assert.equal(next.day.status,'safe');
  assert.equal(next.event.provenance.knowledge,'reported');
  assert.deepEqual(next.clue,clue);
});

test('a borrowed ordinary visit cannot witness a bell that has not rung', () => {
  const result=rules.settle(state(),commit({borrowed:true}));
  assert.equal(result.day.status,'pending');
  assert.equal(result.clue,null);
  assert.equal(result.event,null);
});

test('Fracture four interrupts a normal or borrowed Dawn before the scheduled event', () => {
  for (const borrowed of [false,true]) {
    const result=rules.settle(state({fracture:4}),commit({borrowed}));
    assert.equal(result.hold,false);
    assert.equal(result.interrupted,true);
    assert.equal(result.day.status,'interrupted');
    assert.equal(result.clue,null);
    assert.equal(result.event.provenance.phase,0);
    assert.equal(result.event.provenance.scheduledPhase,1);
    assert.equal(result.event.provenance.knowledge,'interrupted');
  }
});

test('interrupted preparation is not a successful crossing and does not erase prior knowledge', () => {
  const result=rules.settle(preparedState({fracture:4}),{...prep(),borrowed:true});
  assert.equal(result.day.status,'interrupted');
  assert.equal(result.day.preparation.actionId,rules.ACTION);
  assert.deepEqual(result.clue,clue);
});

test('catastrophe after Noon preserves an already resolved outcome and its original provenance', () => {
  const noon=rules.settle(preparedState(),prep());
  const later=rules.settle(preparedState({phase:1,fracture:4,squareDay:noon.day}),commit({place:{root:'gate'}}));
  assert.equal(later.interrupted,true);
  assert.equal(later.day.status,'safe');
  assert.deepEqual(later.day.resolvedAt,noon.day.resolvedAt);
  assert.equal(later.event,null);
});

test('another loop resets only its event state; prior-loop clue and route can still enable borrowing', () => {
  const next=preparedState({loop:3,squareDay:rules.day(3),momentum:1,echoUsed:false,flags:{'square:0':'Help Mina'}});
  assert.equal(rules.eligibility(next).ok,true);
  assert.equal(echo.canBorrow(next,'square'),true);
  assert.equal(next.squareDay.preparation,null);
  assert.equal(next.squareDay.resolvedAt,null);
});

test('event settlement does not mutate inputs and a consumed day cannot award another event', () => {
  const before=preparedState();Object.freeze(before.squareDay);Object.freeze(before.squareClue);Object.freeze(before);
  const after=rules.settle(before,prep());
  assert.equal(before.squareDay.status,'pending');
  const duplicate=rules.settle({...before,squareDay:after.day},prep());
  assert.equal(duplicate.event,null);
  assert.deepEqual(duplicate.day,after.day);
});
