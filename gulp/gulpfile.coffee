fs = require 'fs'
_ = require 'underscore'
scriptFilter = require './utils/scriptFilter'
tasks = fs.readdirSync './gulp/tasks'
          .filter scriptFilter

_.each tasks, (task) -> require "./tasks/#{task}"
