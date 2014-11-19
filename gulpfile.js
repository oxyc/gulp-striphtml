'use strict';

var gulp = require('gulp')
  , jshint = require('gulp-jshint')
  , mocha = require('gulp-mocha');

gulp.task('lint', function() {
  return gulp.src(['./{,*/}*.{js,json}', '.jshintrc'])
    .pipe(jshint({ predef: ['it'] }))
    .pipe(jshint.reporter('default'));
});

gulp.task('mocha', function() {
  return gulp.src('test/test.js')
    .pipe(mocha({reporter: 'spec' }));
});

gulp.task('test', ['lint', 'mocha']);
gulp.task('default', ['test']);
