"use strict";

import gulp from "gulp";
import zip from "gulp-zip";
import fs from "fs";
import {
    buildDir,
    distDir,
    packageFile
} from "../options/paths";

gulp.task("zip", ["build"], () => {
    const {
        version = false,
        name = false,
    } = JSON.parse(fs.readFileSync(packageFile));
    if(version && name) {
        const plugin = `${name}_${version}.zip`;
        return (
            gulp.src([`${buildDir}/**`])
                .pipe(zip(plugin))
                .pipe(gulp.dest(distDir))
        );
    }
});
