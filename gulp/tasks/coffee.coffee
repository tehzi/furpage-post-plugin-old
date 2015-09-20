gulp =   require 'gulp'
util =   require 'gulp-util'
coffee = require 'gulp-coffee'
_ =      require 'underscore'
paths =  require '../paths'

gulp.task 'coffee', ->
    gulp.src _.first _.keys paths.coffee
        .pipe coffee bare: yes
        .on 'error', util.log
        .pipe gulp.dest _.first _.values paths.coffee
