gulp =   require 'gulp'
util =   require 'gulp-util'
cjsx =   require 'gulp-cjsx'
_ =      require 'underscore'
paths =  require '../paths'

gulp.task 'cjsx', ->
    gulp.src _.first _.keys paths.cjsx
        .pipe cjsx bare: yes
        .on 'error', util.log
        .pipe gulp.dest _.first _.values paths.cjsx
