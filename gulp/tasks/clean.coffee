gulp = require 'gulp'
clean = require 'gulp-clean'


gulp.task 'clean', ->
    gulp.src('./{dist,.temp}')
        .pipe(clean())
