#!/usr/bin/env node
const fs = require("fs-extra");
const commandLineArgs = require("command-line-args");

import {ComponentGenerator } from "./src/generate/component/ComponentGenerator";

const optionDefinitions = [
  { name: "component", alias: "c", type: String },
  { name: "module", alias: "m", type: String },
  { name: "folder", alias: "f", type: Boolean }
];
const options = commandLineArgs(optionDefinitions);

options.isRootFolder= fs.existsSync(`${process.cwd()}/package.json`) ? true : false;

if (options.component) {
  options.isCompontsFolderExist =fs.existsSync(`${process.cwd()}/src/components`) ? true : false;
  new ComponentGenerator().create(options);
} else if (options.module) {
} else {
  console.log("command not found");
}
