/* Rules for a remembered route. Pure, read-only helpers; UI and mutations live in engine.js. */
(function (root) {
  var rules = {
    knownBefore: function (state, district) {
      return Object.keys(state.flags).some(function (key) {
        var parts = key.split(':');
        return parts[0] === district && Number(parts[1]) < state.loop - 1;
      });
    },
    canBorrow: function (state, district) {
      return state.loop > 1 && state.phase < 3 && !state.echoUsed &&
        state.momentum >= 1 && rules.knownBefore(state, district);
    },
    holdsBell: function (borrowed, fracture) {
      return borrowed && fracture < 4;
    }
  };
  root.TTB_ECHO = rules;
  if (typeof module !== 'undefined') module.exports = rules;
})(typeof window !== 'undefined' ? window : globalThis);
