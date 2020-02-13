const ejs = require("ejs");
const fs = require("fs-extra");

export default class FileGenerator {
  create(templateFilePath, data, file) {
    ejs.renderFile(templateFilePath, { data }, {}, (err, str) => {
      if (err) {
        console.error(err);
      } else {
        fs.outputFile(file, str)
          .then(() => {
            console.log("success");
          })
          .catch(err => {
            console.error(err);
          });
      }
    });
  }
}
