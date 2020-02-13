const path = require("path");
import FileGenerator from "../../FileGenerator";

export class ComponentGenerator {
  constructor() {}

  create(options: any) {
    const componentRootDir = `${process.cwd()}/src/components`;
    const templateFilePath = `${process.cwd()}/src/templates/components/ComponentTemplate.vue`;
    let file = `${
      options.isCompontsFolderExist ? componentRootDir : process.cwd()
    }/${options.component}.vue`;

    if (options.folder) {
      const folder = path.join(
        options.isCompontsFolderExist ? componentRootDir : process.cwd(),
        options.component
      );
      file = `${folder}/${options.component}.vue`;
    }

    const data = {
      title: options.component
    };

    new FileGenerator().create(templateFilePath, data, file);
  }
}
