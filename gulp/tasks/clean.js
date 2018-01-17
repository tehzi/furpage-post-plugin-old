"use strict";

import gulp from "gulp";
import clean from "gulp-clean";
import { buildDir, distDir } from "../options/paths";

gulp.task("clean", () => {
    return gulp
        .src([buildDir, distDir], {read: false})
        .pipe(clean({force: true}));
});

// gulp = require 'gulp'
// clean = require 'gulp-clean'
// plumber = require 'gulp-plumber'
//
//
// gulp.task 'clean', ->
//     gulp.src('./{dist,build,.temp,.build}')
//         .pipe(plumber())
//         .pipe(clean())
