gulp   =    require 'gulp'
util =      require 'gulp-util'
coffee =    require 'gulp-coffee'
coffeeson = require 'coffeeson'
_ =         require 'underscore'
stream =    require 'stream'
path =      require 'path'
paths  =    require '../paths'

gulp.task 'manifest', ->
    file = _.first(_.keys paths.manifest)
    destonation = _.first _.values paths.manifest
    coffeeson.fileToJSON.pretty file, (err, json) ->
        src = stream.Readable objectMode: yes
        src._read = ->
            @push new util.File
                cwd: ''
                base: ''
                path: path.basename destonation
                contents: new Buffer json
            @.push null
        src.pipe gulp.dest path.dirname destonation
