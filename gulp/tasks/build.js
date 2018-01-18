"use strict";

import gulp from "gulp";

gulp.task("build:dev", [
    "coffeeiry",
    "images",
    "jade",
    "less",
    "manifest",
]);

gulp.task("build", [
    "mode:production",
    "build:dev",
]);


