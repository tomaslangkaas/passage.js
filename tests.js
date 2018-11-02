var basicTests = passage('Basic tests');

basicTests.add('done()', function(done){
  done();
});

basicTests.add('done(true)', function(done){
  done(true);
});

basicTests.add('setTimeout(done)', function(done){
  setTimeout(done, 50);
});


basicTests.add('capture errors', function(done){

  var tests = passage('errors');

  tests.add('done("fail message")', function(done){
    done("fail message");
  });

  tests.add('throw', function(done){
    throw "fail message";
  });

  tests.add('throw async', function(done){
    setTimeout(function(){
      throw "fail message";
    }, 50);
  });

  tests.onprogress = function(state){
    if(!state.running){
      done(state.passed === 0);
    }
  };

  tests.start();

});
