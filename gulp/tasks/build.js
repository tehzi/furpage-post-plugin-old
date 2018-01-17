"use strict";

import gulp from "gulp";

gulp.task("build:dev", [
    "coffeeiry",
]);

gulp.task("build", [
    "mode:production",
    "build:dev",
]);

// gulp = require 'gulp'
// uglify = require 'gulp-uglifyjs'
// uglifycss = require 'gulp-uglifycss'
// fs = require 'fs'
// zip = require 'gulp-zip'
//
// gulp.task 'build:temp', ['clean'], ->
//     gulp.start(['coffee', 'cjsx', 'manifest', 'images', 'less', 'jade'])
//
// gulp.task 'build:browserify', ['build:temp'], (cb) ->
//     setTimeout (->
//                 gulp.start('browserify')
//                 cb()), 1000
//
// gulp.task 'build:min', ['build:browserify'], (cb) ->
//     setTimeout (->
//                 gulp.src('dist/background.js')
//                     .pipe(uglify())
//                     .pipe(gulp.dest('.build'))
//                 gulp.src('dist/bundle.js')
//                     .pipe(uglify())
//                     .pipe(gulp.dest('.build'))
//                 gulp.src('dist/*[^js]')
//                     .pipe(gulp.dest '.build')
//                 gulp.src('dist/css/*.css')
//                     .pipe(uglifycss())
//                     .pipe(gulp.dest '.build/css')
//                 cb()), 3000
//
// gulp.task 'build', ['build:min'], ->
//     setTimeout (->
//         fs.readFile './.build/manifest.json', 'utf8', (err, data) ->
//             return console.log(err) if err
//             manifest = eval("(#{data})")
//             name = "#{manifest.name} v#{manifest.version}.zip"
//             gulp.src(['./.build/**'])
//                 .pipe(zip(name))
//                 .pipe(gulp.dest('build'));
//         yes), 5000



