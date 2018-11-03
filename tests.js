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

  passage('errors')
    .add('done("fail message")', function(done){
      done("fail message");
    })
    .add('throw', function(done){
      throw "fail message";
    })
    .add('throw async', function(done){
      setTimeout(function(){
        throw "fail message";
      }, 50);
    })
    .progress(function(state){
      if(!state.running){
        done(state.passed === 0);
      }
    })
    .start();

});

basicTests.add('abort processing', function(done){

  passage('abort', {abort:true})
    .add('first failure', function(done){
      done(false);
    })
    .add('should never run', function(done){
      done();
    })
    .progress(function(state){
      if(!state.running){
        done(state.aborted);
      }
    })
    .start();

});
