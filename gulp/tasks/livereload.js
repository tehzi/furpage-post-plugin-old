"use strict";

import gulp from "gulp";
import livereload from "gulp-livereload";
import watch from "gulp-watch";
import { buildDir } from "../options/paths";

gulp.task("livereload:start", () => {
    livereload.listen();
});

gulp.task("livereload", () => {
    livereload();
});