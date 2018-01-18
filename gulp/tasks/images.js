"use strict";

import gulp from "gulp";
import {
    buildDir,
    imagesSrc
} from "../options/paths";

function task() {
    return gulp.src(imagesSrc)
        .pipe(gulp.dest(buildDir));
}

gulp.task("images", ["clean"], task);
gulp.task("images:watch", task);