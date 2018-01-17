gulp  = require 'gulp'
paths = require '../options/paths'
_ =     require 'underscore'

gulp.task 'images', ->
    mask = _.first _.keys   paths.images
    dist = _.first _.values paths.images
    gulp.src mask
        .pipe gulp.dest dist