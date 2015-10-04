gulp =   require 'gulp'
util =   require 'gulp-util'
cjsx =   require 'gulp-cjsx'
_ =      require 'underscore'
paths =  require '../paths'
plumber = require 'gulp-plumber'

gulp.task 'cjsx', ->
    from = _.first(_.keys paths.cjsx)
    to = _.first(_.values paths.cjsx)
    gulp.src(from)
        .pipe(plumber())
        .pipe(cjsx bare: yes)
        .pipe(gulp.dest to)
