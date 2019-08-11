'use strict';
/**
  * @gulpfile {for practice}
  * browsersyncs on files changes and compiles scss to css (dist folder);
  * use "gulp watch" command to start;
  */

const { gulp, src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const del = require('del');

function deleteDistFolder () {
  return del('dist');
}

function startBrowserSync () {
  browserSync.init({
    server: {
      baseDir: './'
    },
    open: false,
    notify: false,
    port: 3000
  });
}

function compileScss () {
  return src('app/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(dest('dist'));
}

function watchFiles () {
  startBrowserSync();

  watch('index.html').on('change', browserSync.reload);

  watch('app/scss/**/*.scss').on('change', compileScss);
  watch('dist/main.css').on('change', browserSync.reload);
}

exports.watch = series(deleteDistFolder, compileScss, watchFiles);
