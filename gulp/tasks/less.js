"use strict";

import gulp from "gulp";
import less from "gulp-less";
import plumber from "gulp-plumber";
import rename from "gulp-rename";
import cssmin from "gulp-cssmin";
import gulpIf from "gulp-if"
import { option } from "../options";
import {
    buildDir,
    lessFile,
    styleName
} from "../options/paths";

function task() {
    return(
        gulp.src(lessFile)
            .pipe(plumber())
            .pipe(less())
            .pipe(gulpIf(!option.developMode, cssmin()))
            .pipe(rename(styleName))
            .pipe(gulp.dest(buildDir))
    );
}

gulp.task("less", ["clean"], task);
gulp.task("less:watch", task);