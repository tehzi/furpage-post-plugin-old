gulp =    require 'gulp'
watch =   require 'gulp-watch'
{argv} =  require 'yargs'
{spawn} = require 'child_process'
_ =       require 'underscore'

gulp.task 'gulpfile', ->
    p = null
    restart() if restart
    restart = (e) ->
        p.kill() if !_.isNull p
        p = spawn 'gulp', [], stdio: 'inherit'
    gulp.watch './{gulpfile.js,gulp/**/*.coffee}', restart
