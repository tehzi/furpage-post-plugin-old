"use strict";

import _ from "underscore";
import fs from "fs";

_(fs.readdirSync("gulp/tasks"))
    .chain()
    .filter(task => /\.js$/.exec(task))
    .map(task => task.slice(0, -3))
    .each(task => require(`./gulp/tasks/${task}`));