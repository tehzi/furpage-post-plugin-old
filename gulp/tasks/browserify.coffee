gulp =       require 'gulp'
browserify = require 'gulp-browserify'
path       = require 'path'
plumber =    require 'gulp-plumber'
paths =      require '../paths'
rename =     require 'gulp-rename'
_ =          require 'underscore'

gulp.task 'browserify', ->
    controllers = _.omit(paths.temp, 'mask')
    _.each paths.temp, (item, key) ->
        gulp.src(key, read: no)
            .pipe(plumber())
            .pipe(browserify())
            .pipe(rename path.basename item)
            .pipe(gulp.dest path.dirname item)