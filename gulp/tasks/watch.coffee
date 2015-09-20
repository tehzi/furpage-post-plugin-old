gulp =  require 'gulp'
watch = require 'gulp-watch'
path =  require 'path'
paths = require '../paths'
_ =     require 'underscore'

gulp.task 'watch', ->
    gulp.watch _.first(_.keys paths.coffee), ['coffee']
    gulp.watch _.first(_.keys paths.cjsx),   ['cjsx']
    gulp.watch _.first(_.filter _.keys(paths.temp), (key) -> !_.contains ['controller'], key), ['browserify', 'coffee', 'cjsx']