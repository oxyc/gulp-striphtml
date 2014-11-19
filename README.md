gulp-striphtml [![Build Status](https://secure.travis-ci.org/oxyc/gulp-striphtml.svg?branch=master)](http://travis-ci.org/oxyc/gulp-striphtml) [![NPM version](https://badge.fury.io/js/gulp-striphtml.png)](http://badge.fury.io/js/gulp-striphtml)
=================

> Strip away HTML and keep JavaScript so that you can eg. lint inline javascript.

## Install

    npm install gulp-striphtml --save-dev

## Usage

```js
var jshint = require('gulp-jshint');
var striphtml = require('gulp-striphtml');
var gulp   = require('gulp');

gulp.task('lint', function() {
  return gulp.src('./*.html')
    .pipe(striphtml())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
```

## Release History

* 2014-11-20    v0.0.1    Initial version.

## License

MIT
