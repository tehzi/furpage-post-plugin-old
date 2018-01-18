"use strict";

import gulp from "gulp";
import git from "gulp-git";
import bump from "gulp-bump";
import version from "gulp-tag-version";
import { packageFile } from "../options/paths";

function task(type) {
    return (
        gulp.src(packageFile)
            .pipe(bump({type}))
            .pipe(gulp.dest("./"))
            .pipe(git.commit("Увеличиваю номер версии"))
            .pipe(version())
    );
}

gulp.task('patch', () => task('patch'));
gulp.task('feature', () => task('minor'));
gulp.task('release', () => task('major'));