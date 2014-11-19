'use strict';

var assert = require('assert')
  , gutil = require('gulp-util')
  , fs = require('fs')
  , striphtml = require('../');

it('should strip all html', function(done) {
  var stream = striphtml()
    , file = new gutil.File({
        path: 'test/fixture.html'
      , cwd: 'test/'
      , base: 'test/'
      , contents: fs.readFileSync('test/fixture.html')
    });

  stream.on('data', function(file) {
    assert(file);
    assert(file.contents);
    assert.equal(String(file.contents), fs.readFileSync('test/expected.html', 'utf8'));
  });
  stream.on('end', done);

  stream.write(file);
  stream.end();
});
