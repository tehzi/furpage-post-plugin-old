gulp = require 'gulp'
less = require 'gulp-less'
rename = require 'gulp-rename'
path = require 'path'
paths = require '../options/paths'
_ = require 'underscore'
plumber = require 'gulp-plumber'

gulp.task 'less', ->
    from = _.first(_.keys paths.less)
    to = _.first(_.values paths.less)
    gulp.src(from)
        .pipe(plumber())
        .pipe(less(paths: [path.join(__dirname, 'less', 'includes')]))
        .pipe(rename path.basename to)
        .pipe(gulp.dest path.dirname to)