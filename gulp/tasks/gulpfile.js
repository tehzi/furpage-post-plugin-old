"use strict";

import _ from "underscore";
import { spawn } from "child_process";
import gulp from "gulp";
import watch from "gulp-watch";

gulp.task("gulpfile", () => {
    let p = null;
    const restart = () => {
        if(!_.isNull(p)) {
            p.kill();
            console.log("gulp was reloaded");
        }
        p = spawn("gulp", ["watch"], { stdio: "inherit" });

    };
    restart();
    watch(["gulpfile.babel.js", "gulp/**/*.js"], restart);
});
