module.exports = {
  options: {
    // appname: {
    //   desc: "请输入项目名称",
    //   type: String,
    //   required: true,
    // },
    "skip-install": {
      desc: "跳过下载node_modules",
      type: Boolean,
      required: false,
    },
  },
  prompts: [
    {
      type: "input",
      name: "appname",
      message: "请输入项目名称",
      store: true,
    },
  ],
  filesToCopy: [
    {
      input: "gitignore.tpl",
      output: ".gitignore",
    },
    {
      input: "npmignore.tpl",
      output: ".npmignore",
    },
    {
      input: "README.md.tpl",
      output: "README.md",
    },
    {
      input: "editorconfig.tpl",
      output: ".editorconfig",
    },
    {
      input: "favicon.ico",
      output: "src/favicon.ico",
    },
    {
      input: "index.js.tpl",
      output: "src/index.js",
    },
  ],
  filesToRender: [
    {
      input: "package.json.tpl",
      output: "package.json",
    },
    {
      input: "index.html.tpl",
      output: "src/index.html",
    },
  ],
  dirsToCreate: ["src"],
};
