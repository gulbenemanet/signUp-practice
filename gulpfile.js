'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./public/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('css', function () {
    gulp.src('./public/css/*.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./public/dist/'));
});

gulp.task('run', ['sass','css'])
gulp.task('watch', () => {
    gulp.watch('./public/sass/*.scss', ['sass']);
    gulp.watch('./public/css/*.css',['css']);
});

gulp.task('default',['run','watch']);