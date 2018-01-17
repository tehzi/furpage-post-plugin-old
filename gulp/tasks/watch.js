"use strict";

import gulp from "gulp";
import watch from "gulp-watch";
import { coffeeSrc } from "../options/paths";
// import livereload from "gulp-livereload";
// watch = require 'gulp-watch'
// path =  require 'path'
// paths = require '../options/paths'
// _ =     require 'underscore'

gulp.task("watch", ["clean", "build:dev", "mode:watch"], () => {
    // livereload.listen();
    watch(coffeeSrc, () => gulp.start("coffeeiry:watch"));
});

// gulp.task 'watch', ->
//     livereload.listen();
//     gulp.watch _.first(_.keys paths.coffee),   ['coffee']
//     gulp.watch _.first(_.keys paths.cjsx),     ['cjsx']
//     gulp.watch _.first(_.keys paths.manifest), ['manifest']
//     gulp.watch _.first(_.keys paths.images),   ['images']
//     gulp.watch _.first(_.keys paths.less),     ['less', 'jade']
//         .on 'change', livereload.changed
//     gulp.watch paths.temp.mask,                ['browserify']
//         .on 'change', livereload.changed
//     gulp.watch _.first(_.keys paths.jade),     ['jade']
//         .on 'change', livereload.changed