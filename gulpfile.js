var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var plumber = require('gulp-plumber');


var scriptsToConcat = [

    './js/vektorchooser/vektorchooser.js',
    './js/vektorchooser/DeviceCollection.js',
    './js/vektorchooser/Events.js',
    //models
    './js/vektorchooser/models/*.js',
    //devices
    './js/vektorchooser/devices/*.js',

    //views
    './js/vektorchooser/views/*.js'
];



gulp.task('default', function() {
    gulp.src(scriptsToConcat)
        .pipe(plumber())
        .pipe(concat('combined.js'))
        .pipe(minify())
        .pipe(gulp.dest('./js/'))
});

gulp.task('watch', function () {
    watch('js/vektorchooser/**/*.js', function () {
        gulp.start('default');
    });
});
