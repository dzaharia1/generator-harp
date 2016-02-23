var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var harp = require('harp');
var minify = require('gulp-minify');

var source  = {
  ejs: 'public/**/*.ejs',
  scss: 'public/css/**/*.scss',
  js: 'public/scripts/ui.js'
}

gulp.task('serve', function () {
  harp.server('.', {
    port: 9000
  }, function () {
    browserSync({
      proxy: 'localhost:9000',
      port: '3000',
      open: false,
      notify: {
        styles: ['opacity: 0', 'position: absolute']
      }
    });
  });
});

gulp.task('watch', function () {
  gulp.watch(source.ejs, function () {
    reload();
  });
  gulp.watch(source.scss, function () {
    reload('/public/css/main.css', { stream: true });
  });
  gulp.watch(source.js, function () {
    reload();
    gulp.src(source.js)
    .pipe(minify({}))
    .pipe(gulp.dest('public/scripts/'))
  })
});

gulp.task('default', ['serve', 'watch']);
