gulp = require 'gulp'
less = require 'gulp-less'
rename = require 'gulp-rename'
path = require 'path'
paths = require '../paths'
_ = require 'underscore'

gulp.task 'less', ->
    gulp.src _.first _.keys paths.less
        .pipe less
            paths: [path.join(__dirname, 'less', 'includes')]
        .pipe rename path.basename _.first _.values paths.less
        .pipe gulp.dest path.dirname _.first _.values paths.less