gulp =       require 'gulp'
browserify = require 'gulp-browserify'
path       = require 'path'
paths =      require '../paths'
rename =     require 'gulp-rename'
_ =          require 'underscore'

gulp.task 'browserify', ->
    dist = paths.temp[_.first(_.filter _.keys(paths.temp), (key) -> !_.contains ['controller'], key)]
    gulp.src paths.temp.controller, read: no
        .pipe browserify()
        .pipe rename path.basename dist
        .pipe gulp.dest path.dirname dist