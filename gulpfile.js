var gulp = require('gulp')  
var webserver = require('gulp-webserver')  
var less = require('gulp-less');
var path = require('path');
var browserify = require('browserify')  
var babelify = require('babelify')  
var source = require('vinyl-source-stream')  
var nib = require('nib')  
var minify = require('gulp-minify-css')
var concat = require('gulp-concat');

gulp.task('server', function() {  
  gulp.src('./build')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 8080,
      fallback: 'index.html',
      livereload: true
    }))
})

gulp.task('less', function () {
  return gulp.src('./src/**/**/*.less')
    .pipe(less())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('default', function() {  
  gulp.src('./assets/src/main.less')
    .pipe(less())
    .pipe(gulp.dest('./assets/dist/'));
});


gulp.task('build', function() {  
  browserify({
    entries: './src/index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build/js'))
})

gulp.task('watch', function() {  
  gulp.watch('./src/**/*.jsx', ['build'])
  gulp.watch(['./src/styles/**/*.less', './src/components/**/*.less'], ['less'])
})

gulp.task('default', ['server', 'watch'])  