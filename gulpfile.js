var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');


var scriptsToConcat = [

    './js/plugins.js',
    './js/vektor/device.js',
    './js/vektor/devices/vektordevices.js',
    './js/vektor/devices/vdrive.js',
    './js/vektor/devices/vdrivelite.js',
    './js/vektor/devices/vfleet.js',
    './js/vektor/devices/vfleetcan.js',
    './js/vektor/devices/vmax.js',
    './js/vektor/devices/vmini.js',
    './js/vektor/devices/vmoto.js',
    './js/script.js',
]


gulp.task('default', function() {
    gulp.src(scriptsToConcat)
        .pipe(plumber())
        .pipe(concat('combined.js'))
        .pipe(minify())
        .pipe(gulp.dest('./js/'))
});

gulp.task('watch', function () {
    watch('./js/*.js', function (files, cb) {
        gulp.start('default', cb);
    });
});