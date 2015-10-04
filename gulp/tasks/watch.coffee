gulp =  require 'gulp'
watch = require 'gulp-watch'
livereload = require 'gulp-livereload'
path =  require 'path'
paths = require '../paths'
_ =     require 'underscore'

gulp.task 'watch', ->
    livereload.listen();
    gulp.watch _.first(_.keys paths.coffee),   ['coffee']
    gulp.watch _.first(_.keys paths.cjsx),     ['cjsx']
    gulp.watch _.first(_.keys paths.manifest), ['manifest']
    gulp.watch _.first(_.keys paths.images),   ['images']
    gulp.watch _.first(_.keys paths.less),     ['less', 'jade']
        .on 'change', livereload.changed
    gulp.watch paths.temp.mask,                ['browserify']
        .on 'change', livereload.changed
    gulp.watch _.first(_.keys paths.jade),     ['jade']
        .on 'change', livereload.changed