#!/usr/bin/env node
import fs from 'fs';
const commandLineArgs = require("command-line-args");

import {ComponentGenerator } from "./src/generate/component/ComponentGenerator";

const optionDefinitions = [
  { name: "component", alias: "c", type: String },
  { name: "module", alias: "m", type: String },
  { name: "folder", alias: "f", type: Boolean }
];
const options = commandLineArgs(optionDefinitions);

options.isRootFolder = fs.existsSync(`${process.cwd()}/package.json`) ? true : false;
options.typescript = fs.existsSync(`${process.cwd()}/tsconfig.json`) ? true : false;
if (options.isRootFolder) {
  let content = fs.readFileSync(`${process.cwd()}/package.json` , "utf8");
  const json = JSON.parse(content);
  if(json && json.dependencies) {
    if(json.dependencies.vue) {
      options.vue = true;
    }
    if(json.dependencies.vuex) {
      options.vuex = true;
    }
  }
} else {
  console.log("Vue Project not found");
}

if (options.component) {
  options.isCompontsFolderExist =fs.existsSync(`${process.cwd()}/src/components`) ? true : false;
  new ComponentGenerator().create(options);
} else if (options.module) {
} else {
  console.log("command not found");
}

/**
 * <p>
 * Importing created module into store
 * </p>
 * @param moduleName - module name
 * @param storeFile - path for store location
 * @param type - file type
 */
let importToStore = (moduleName:string, storeFile:string, type:string) => {
  let content = fs.readFileSync(storeFile, "utf8");
  content = content.replace(/modules: {/i, (substring: string) => {
    return `${substring}\n  ${moduleName}`;
  });
  let index = content.lastIndexOf("import ");
  content = content.slice(0,index) + content.slice(index).replace(/import .* from .*;/gi, (substring: string) => {
    return `${substring} \n import { ${moduleName} } from "./${moduleName}/index.${type}";`
  });
  fs.writeFileSync(storeFile, content);
}