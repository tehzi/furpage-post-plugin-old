"use strict";

import gulp from "gulp";
import { option } from "../options";

gulp.task("mode:production", () => {
   option.developMode = false;
   return process.env.NODE_ENV = 'production';
});

gulp.task("mode:watch", () => {
    option.watchMode = true;
});