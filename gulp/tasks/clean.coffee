gulp = require 'gulp'
clean = require 'gulp-clean'
plumber = require 'gulp-plumber'


gulp.task 'clean', ->
    gulp.src('./{dist,build,.temp,.build}')
        .pipe(plumber())
        .pipe(clean())
