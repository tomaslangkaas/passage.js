function passage(name, params) {
  params = params || {};
  var oldError,
      lib = passage,
      tests = [],
      results = [],
      timers = [],
      passed = 0,
      speed = params.speed || 1,
      index = -1,
      i,
      suite = {
        name: name,
        run: run,
        add: add,
        stop: stop,
        start: start,
        onprogress: function() {}
      };

  function add(name, test) {
    tests.push([name, test]);
  }

  function run() {
    (lib.queue = lib.queue || []).push(suite);
    if (lib.queue.length === 1) {
      this.start();
    }
  }

  function start() {
    oldError = window.onerror;
    window.onerror = function(msg) {
      results[index] = msg;
      return !params.error;
    };
    passed = 0;
    index = -1;
    results.length = 0;
    timers.length = 0;
    for (i = 0; i < speed; i++) {
      timers[i] = setInterval(next, 0);
    }
  }

  function report(state) {
    suite.onprogress({
      name: suite.name,
      index: index,
      total: tests.length,
      passed: passed,
      failed: index - passed,
      results: results,
      tests: tests,
      running: !state,
      aborted: state && index < tests.length
    });
  }

  function stop() {
    window.onerror = oldError;
    report(true);
    for (i = 0; i < timers.length; i++) {
      clearInterval(timers[i]);
    }
    lib.queue.shift();
    if (lib.queue.length) {
      lib.queue[0].start();
    }
  }

  function next() {
    if (index === -1 || results[index] !== void 0) {
      index++;
      report();
      if (
        index >= tests.length ||
        (params.abort && index > 0 && results[index - 1] !== true)
      ) {
        stop();
      } else if (typeof tests[index][1] === "function") {
        tests[index][1](function(testResult) {
          results[index] =
            testResult === void 0 || testResult === true ?
            (passed++, true) :
            testResult;
        }, assertEqual);
      } else {
        throw "Missing test function";
      }
    }
  }

  function assertEqual(a, b, priorA, priorB) {
    var i = ""; // temp variable, default to empty string
    if (a === b) return true; // true if same type/value or same object reference
    if (typeof a !== typeof b) return false; // false if different types => falsy, 0 === [0], '' === []
    if (typeof a !== "object") return a + i === b + i; // primitive values are compared as strings
    if (a + i !== b + i) return false; // false if string representations of objects differ, [] === {}, {} === null
    //check prior objects for circularity
    if (!priorA) {
      priorA = [];
      priorB = [];
    } else {
      for (i = 0; i < priorA.length; i++) {
        if (priorA[i] === a) return priorB[i] === b;
        if (priorB[i] === b) return false; //priorA[i] !== a;
      }
    }
    priorA.push(a);
    priorB.push(b);
    for (i in a) {
      // check if a and b has same properties with same values, recursively
      if (
        a.hasOwnProperty(i) &&
        (!b.hasOwnProperty(i) || !assertEqual(a[i], b[i], priorA,
          priorB))
      )
        return false;
    }
    for (i in b) {
      // check if b has additional properties
      if (b.hasOwnProperty(i) && !a.hasOwnProperty(i)) return false;
    }
    return true;
  }
  return suite;
}
