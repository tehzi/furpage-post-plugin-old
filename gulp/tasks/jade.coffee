gulp = require 'gulp'
jade = require 'gulp-jade'
plumber = require 'gulp-plumber'
_ = require 'underscore'
paths = require '../paths'

gulp.task 'jade', ->
    from = _.first(_.keys paths.jade)
    to = _.first(_.values paths.jade)
    gulp.src(from)
        .pipe(plumber())
        .pipe(jade())
        .pipe(gulp.dest to)