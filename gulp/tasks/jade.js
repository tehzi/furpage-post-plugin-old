"use strict";

import gulp from "gulp";
import jade from "gulp-jade";
import plumber from "gulp-plumber";
import {
    buildDir,
    jadeSrc
} from "../options/paths";

function task() {
    return (
        gulp.src(jadeSrc)
            .pipe(plumber())
            .pipe(jade())
            .pipe(gulp.dest(buildDir))
    );
}

gulp.task("jade", ["clean"], task);
gulp.task("jade:watch", task);