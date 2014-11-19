'use strict';

var gutil = require('gulp-util')
  , through = require('through2');

function removeHTML(src, patterns) {
  var lines = src.split('\n')
    , scriptSection = false
    , commentingSection = false;

  lines.forEach(function (line, i) {
    var starts = (/<script/i).test(line)
      , stops = (/<\/script/i).test(line)
      , commentStart = (/<!--/).test(line)
      , commentStop = (/-->/).test(line);

    if (starts && !(starts && stops)) {
      var type = line.match(/<script[^>]*type=['"]?([^\s"']*)[^>]*>/i);
      scriptSection = (type === null || type[1] === 'text/javascript');
      lines[i] = '';
    } else if (stops) {
      scriptSection = false;
    }

    if(!scriptSection && commentStart){
      commentingSection = true;
    }

    if (!scriptSection || commentingSection) {
      lines[i] = '';
    }

    if(commentStop){
      commentingSection = false;
    }
  });

  return lines.join('\n');
}

module.exports = function (options) {
  return through.obj(function processContent(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }
    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-striphtml', 'Streaming not supported'));
      return;
    }

    var res = removeHTML(file.contents.toString());
    file.contents = new Buffer(res);
    this.push(file);
    cb();
  });
};
