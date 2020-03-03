const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackModuleRule,
} = require("customize-cra");
const theme = require("./theme");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme,
  }),
  addWebpackModuleRule({
    test: /\.module.less$/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          modules: true,
        },
      },
      {
        loader: "less-loader",
      },
    ],
  })
);
