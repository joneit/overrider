'use strict';

var gulp        = require('gulp'),
    $$          = require('gulp-load-plugins')();

var runSequence = require('run-sequence'),
    exec        = require('child_process').exec,
    path        = require('path');

var name     = 'overrider',
    srcDir   = './',
    testDir  = './test/',
    buildDir  = './build/';

//  //  //  //  //  //  //  //  //  //  //  //

gulp.task('lint', lint);
gulp.task('test', test);
gulp.task('doc', doc);
gulp.task('enclose', enclose);

gulp.task('build', function(callback) {
    clearBashScreen();
    runSequence(
        'lint',
        'test',
        'doc',
        'enclose',
        callback);
});

gulp.task('watch', function () {
    gulp.watch(['index.js'], ['build']);
});

gulp.task('default', ['build', 'watch']);

//  //  //  //  //  //  //  //  //  //  //  //

function lint() {
    return gulp.src(srcDir + 'index.js')
        .pipe($$.excludeGitignore())
        .pipe($$.eslint())
        .pipe($$.eslint.format())
        .pipe($$.eslint.failAfterError());
}

function test(cb) {
    return gulp.src(testDir + 'index.js')
        .pipe($$.mocha({reporter: 'spec'}));
}

function doc(cb) {
    exec(path.resolve('jsdoc.sh'), function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
}

function enclose() {
    return gulp.src(srcDir + 'index.js')
        .pipe($$.replace(
            '\'use strict\';',
            '\'use strict\';\n\n(function(){\n\n'
        ))
        .pipe($$.replace(
            'module.exports = overrider;',
            'window.overrider = overrider;\n\n})();'
        ))

        .pipe($$.rename(name + '.js'))
        .pipe(gulp.dest(buildDir))

        .pipe($$.uglify())
        .pipe($$.rename(name + '.min.js'))
        .pipe(gulp.dest(buildDir))
}

function clearBashScreen() {
    var ESC = '\x1B';
    console.log(ESC + 'c'); // (VT-100 escape sequence)
}
