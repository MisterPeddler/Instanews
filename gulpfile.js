var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint');

gulp.task('scripts', ['lint'], function(){
  gulp.src('./js/*.js') // What files do we want gulp to consume?
      .pipe(uglify()) // Call the uglify function on these files
      .pipe(rename({ extname: '.min.js' })) // Rename the uglified file
      .pipe(gulp.dest('./build/js')) // Where do we put the result?
});

gulp.task('watch', function() {
   gulp.watch('js/*.js', ['scripts']);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
gulp.watch(['css/style.css', 'build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('lint', function(){
    return gulp.src('js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['watch', 'browserSync']);
