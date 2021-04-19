const Generator = require("yeoman-generator");
const remote = require("yeoman-remote");
const config = require("./config.js");
const mkdirp = require("mkdirp");
const path = require("path");
const _ = require("lodash");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    for (let optionName in config.options) {
      this.option(optionName, config.options[optionName]);
    }
  }

  prompting() {
    return this.prompt(config.prompts).then((answers) => {
      this.answers = answers;
      // this.config.set("appname", this.answers.appname);
    });
  }

  writing() {
    const templateData = {
      appname: this.answers.appname || this.appname, // Default to current folder name
    };
    const copy = (input, output) => {
      this.fs.copy(
        this.templatePath(input),
        // input,
        this.destinationPath(output)
      );
    };
    // from local template using EJS
    const copyTpl = (input, output, data) => {
      this.fs.copyTpl(
        this.templatePath(input),
        this.destinationPath(output),
        data
      );
    };

    // Make Dirs
    config.dirsToCreate.forEach((item) => {
      mkdirp(item);
    });

    // Render Files
    config.filesToRender.forEach((file) => {
      if (!file.if || templateData[file.if]) {
        copyTpl(file.input, file.output, templateData);
      }
    });

    // Copy Files
    config.filesToCopy.forEach((file) => {
      if (!file.if || templateData[file.if]) {
        copy(file.input, file.output);
      }
    });
  }

  install() {
    if (!this.options["skip-install"]) {
      this.npmInstall();
    }
  }
};
