var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    cssnano = require("gulp-cssnano");

var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
    })
};

gulp.task('sass', function () {
    return gulp
        .src('./sass/*.scss')
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass())
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(cssnano())
        .pipe(rename({extname: ".min.css"}))
        .pipe(gulp.dest("./build/css"));
});

gulp.task('scripts', function () {
    return gulp
        .src('./js/*.js')
        .pipe(uglify())
        .pipe(rename({extname: ".min.js"}))
        .pipe(gulp.dest("./build/js"));
});

gulp.task('browser-sync', function () {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('watch', function () {
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('js/*.js', ['scripts']);
});

gulp.task('default', ['watch', 'browser-sync']);