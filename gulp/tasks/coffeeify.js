"use strict";

import "babel-register";
import _ from "underscore";
import gulp  from "gulp";
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

const cache = {};

function bundler(file, debug = false, coffeeifyMode = true, watchifyMode = true) {
    const bundler = browserify(file, {
        extensions: [coffeeifyMode ? '.coffee' : '.js'],
        debug,
        cache
    });
    if(coffeeifyMode) {
        bundler.transform("coffeeify", {
            transpile: {
                "presets": ["env"],
                "plugins": ["transform-react-jsx"]
            },
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
        .on('error', function(err) {
            console.error(err.toString());
            this.emit("end");
        })
        .pipe(source(path.basename(file)))
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
        .pipe(gulp.dest(buildDir)));

    return eventStream.merge.apply(null, tasks);
}

gulp.task("coffeeiry", ["clean"], task);
gulp.task("coffeeiry:watch", ["clean"], task);