"use strict";

import _ from "underscore";
import gulp  from "gulp";
import gulpIf from "gulp-if";
import uglify from "gulp-uglify";
import replaceTask from "gulp-replace-task";
import path from "path";
import source from "vinyl-source-stream";
import browserify from "browserify";
import coffeeify from "coffeeify";
import watchify from "watchify";
import buffer from "gulp-buffer";
import rename from "gulp-rename";
import { option } from "../options";
import {
    buildDir,
    initFiles
} from "../options/paths";
import eventStream from "event-stream";
// import sourcemaps from "gulp-sourcemaps";

const cache = {};

function bundler(file, debug = false, coffeeifyMode = true, watchifyMode = true) {
    const bundler = browserify(file, {
        extensions: [coffeeifyMode ? '.coffee' : '.js'],
        // sourceMaps: debug,
        // debug,
        cache
    });
    if(coffeeifyMode) {
        bundler.transform("coffeeify", {
            // sourceMap: "js",
            // sourceMap: debug,
            transpile: {
                "presets": ["env"],
                "plugins": ["transform-react-jsx"]
            },
        })
        .transform("babelify",  {
            sourceMapsAbsolute: true,
            "presets": ["env"],
            "plugins": ["transform-react-jsx"]
        });
    }
    if(watchifyMode) {
        console.log(`WATCHIFY ${file}`);
        bundler.plugin(watchify, {
            ignoreWatch: ['**/node_modules/**', '**/bower_components/**']
        });
    }
    return bundler.bundle();
}

function task() {
    const tasks = _(initFiles).map(file =>
        bundler(file, option.developMode, true, option.watchMode)
        .pipe(source(path.basename(file)))
        .on('error', function(err) {
            console.error(err.toString());
            this.emit("end");
        })

        .pipe(buffer())
        .pipe(rename(path => {
            path.dirname = ".";
            path.extname = ".js";
            if(path.basename === 'init') {
                path.basename = "bundle";
            }
            if(path.basename === 'Main') {
                path.basename = "background";
            }
        }))
        .pipe(gulpIf(
            !option.developMode,
            replaceTask({
                prefix: '',
                patterns: [{
                    match: '"production" === process.env.NODE_ENV',
                    replacement: 'true',
                }]
            })
        ))
        .pipe(gulpIf(!option.developMode, uglify().on('error', function(err) {
            log(err.toString());
            this.emit('end');
        })))
        .pipe(gulp.dest(buildDir)));

    return eventStream.merge.apply(null, tasks);
}

gulp.task("coffeeiry", ["clean"], task);
gulp.task("coffeeiry:watch", task);