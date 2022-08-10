var gulp = require('gulp');
var shelljs = require('shelljs');
var path = require('path');


gulp.task('run-sample', function() {
    shelljs.exec('node samples/NodeJs/embed.js');
});

