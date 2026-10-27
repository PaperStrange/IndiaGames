/* Bell Square's bounded causal event. Pure rules: no DOM or mutations. */
(function (root) {
  var EVENT = 'square-alley-noon';
  var ACTION = 'prepare-mina-route';
  function day(loop) {
    return {loop: loop, status: 'pending', preparation: null, resolvedAt: null};
  }
  function eligibility(state) {
    if (state.phase !== 0) return {ok: false, reason: 'late'};
    if (!state.squareClue) return {ok: false, reason: 'unseen'};
    if (state.squareClue.loop >= state.loop) return {ok: false, reason: 'next-loop'};
    if (state.squareDay.status !== 'pending') return {ok: false, reason: 'resolved'};
    if (state.squareDay.preparation) return {ok: false, reason: 'prepared'};
    return {ok: true, reason: 'ready'};
  }
  function settle(state, commit) {
    var current = state.squareDay;
    var next = {loop: current.loop, status: current.status,
      preparation: current.preparation, resolvedAt: current.resolvedAt};
    var clue = state.squareClue, event = null;
    var interrupted = state.fracture >= 4;
    var hold = !!commit.borrowed && !interrupted;
    if (commit.actionId === ACTION && eligibility(state).ok) {
      next.preparation = {actionId: ACTION, loop: state.loop, phase: state.phase, place: 'square'};
    }
    if (state.phase === 0 && next.status === 'pending' && (interrupted || !hold)) {
      var witness = !interrupted && commit.place.root === 'square';
      next.status = interrupted ? 'interrupted' : next.preparation ? 'safe' : 'blocked';
      next.resolvedAt = {eventId: EVENT, loop: state.loop, phase: interrupted ? state.phase : 1, scheduledPhase: 1,
        place: commit.place.root, knowledge: interrupted ? 'interrupted' : witness ? 'witnessed' : 'reported'};
      if (witness && next.status === 'blocked' && !clue) {
        clue = {eventId: EVENT, loop: state.loop, phase: 1, place: 'square'};
      }
      event = {status: next.status, provenance: next.resolvedAt};
    }
    return {day: next, clue: clue, event: event, hold: hold, interrupted: interrupted};
  }
  var rules = {EVENT: EVENT, ACTION: ACTION, day: day, eligibility: eligibility, settle: settle};
  root.TTB_SQUARE = rules;
  if (typeof module !== 'undefined') module.exports = rules;
})(typeof window !== 'undefined' ? window : globalThis);
