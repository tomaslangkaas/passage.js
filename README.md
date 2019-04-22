# passage.js
ECMAScript 3 compatible sequential asynchronuous testrunner/taskrunner

```javascript
var testSuite = passage('Test suite #1');

testSuite.add('test #1', function(done, equals){
  done(equals(2 + 2, 4));
});

testSuite.onprogress = function(progress){
  if(!progress.running){
    console.log(progress.name + ': Passed ' + progress.passed + ' of ' + progress.total);
  }
}

testSuite.run();

>"Test suite #1: Passed 1 of 1"
```

[Run tests](https://tomaslangkaas.github.io/passage.js/) online.
