gulp =   require 'gulp'
util =   require 'gulp-util'
coffee = require 'gulp-coffee'
_ =      require 'underscore'
paths =  require '../paths'
plumber = require 'gulp-plumber'

gulp.task 'coffee', ->
    from = _.first(_.keys paths.coffee)
    to = _.first(_.values paths.coffee)
    gulp.src(from)
        .pipe(plumber())
        .pipe(coffee bare: yes)
        .pipe(gulp.dest to)
