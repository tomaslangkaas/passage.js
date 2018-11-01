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
