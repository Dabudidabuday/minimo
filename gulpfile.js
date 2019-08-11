const { gulp, src, dest, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

function def (cb) {
  console.log ('hello gulp ready');
  cb();
}

// function placePrefix () {
//   return src('css/main.css')
//           .pipe(autoprefixer({
//             cascade: false
//         }))
//         .pipe(dest('dist/css'));
// }

function scssCompile () {
  return src('app/scss/main.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(autoprefixer({
            cascade: false
          }))
          .pipe(dest('dist/css'));
}

// function moveFiles () {
//   return src(['css/main.css', 'css/reset.css', 'css/utils.css'])
//           .pipe(dest('dist/css'));
// }

function syncBrowsers () {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    notify: false
  });
}

function watchFiles () {
  syncBrowsers();
  watch('index.html').on('change', browserSync.reload); // WATCH INDEX.html TO RELOAD browser
  watch('dist/css/main.css').on('change', browserSync.reload); // WATCH CSS TO RELOAD BROWSER
  watch('dist/js/main.js').on('change', browserSync.reload); // WATCH JS TO RELOAD BROWSER
  watch('app/scss/main.scss').on('change', scssCompile); // WATCH SCSS FOR COMPILE
}

exports.default = def;
// exports.move = moveFiles;
// exports.prefixes = placePrefix;
exports.watch = watchFiles;
