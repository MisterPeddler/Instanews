var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    babel = require('gulp-babel');

var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
    })
};

gulp.task('scripts', ['lint'], function() {
    gulp.src('./js/*.js') 
        .pipe(plumber(plumberErrorHandler))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(rename({
            extname: '.min.js'
        })) // Rename the uglified file
        .pipe(gulp.dest('./build/js')); // Where do we put the result?
});

// gulp.task('babel', () => {
//     return gulp.src('./js/*.js')
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(gulp.dest('build/js'));
// });

gulp.task('sass', function() {
   gulp.src('./sass/style.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function() {
    gulp.watch(['index.html','js/*.js'] ,['scripts']);
    //gulp.watch(['index.html','js/*.js'] ,['babel']);
    gulp.watch('sass/*scss', ['sass']);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(['build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('lint', function() {
    return gulp.src('js/*.js')
    .pipe(plumber(plumberErrorHandler))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['watch', 'browserSync']);
