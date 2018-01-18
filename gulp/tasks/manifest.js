"use strict";

import fs from "fs";
import gulp from "gulp";
import replaceTask from "gulp-replace-task";
import {
    buildDir,
    manifestFile,
    packageFile
} from "../options/paths";

function task(type) {
    const { version = false } = JSON.parse(fs.readFileSync(packageFile));
    if(version) {
        return (
            gulp.src(manifestFile)
                .pipe(replaceTask({
                    prefix: "",
                    patterns: [{
                        match: "%%VERSION%%",
                        replacement: version,
                    }]
                }))
                .pipe(gulp.dest(buildDir))
        );
    }
}

gulp.task("manifest", ["clean"], task);
gulp.task("manifest:watch", task);