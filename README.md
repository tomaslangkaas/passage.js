# passage.js
ECMAScript 3 compatible sequential asynchronuous testrunner/taskrunner

````javascript
var testSuite = passage('test suite #1');

testSuite.add('test #1', function(done, equals){
  done(equals(2 + 2, 4));
})
```
