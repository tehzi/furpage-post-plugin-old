"use strict";

import gulp from "gulp";
import watch from "gulp-watch";
import {
    buildDir,
    coffeeSrc,
    imagesSrc,
    lessSrc,
    manifestFile
} from "../options/paths";

gulp.task("watch", ["clean", "build:dev", "mode:watch", "livereload:start"], () => {
    watch(`${buildDir}/*`, () => gulp.start("livereload"));
    watch(coffeeSrc, () => gulp.start("coffeeiry:watch"));
    watch(imagesSrc, () => gulp.start("images:watch"));
    watch(lessSrc, () => gulp.start("less:watch"));
    watch(manifestFile, () => gulp.start("manifest:watch"));
});