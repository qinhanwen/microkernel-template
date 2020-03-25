const { resolve } = require("./utils");

const emptyJsPath = resolve("empty.js");
let ignorePlugins = ["plugin2"];

module.exports = {
  mode: "development",
  entry: resolve("src", "index.js"),
  resolve: {
    extensions: [".js"],
    alias: {
      "@": resolve("src")
    }
  },
  output:{
    library: 'starter',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    {
      // 插件可插拔实现1：去除不需要使用的插件，在构建的时候将目录指向空文件
      apply(compiler) {
        compiler.hooks.compilation.tap("ignorePlugins", compilation => {
          compilation.hooks.buildModule.tap("ignorePluginsPath", module => {
            if (module.resource) {
              const pluginName =
                module.resource.match(/([\w_-]*).js/) &&
                module.resource.match(/([\w_-]*).js/)[1];
              if (ignorePlugins.includes(pluginName)) {
                module.resource = emptyJsPath;
              }
            }
          });
        });
      }
    }
  ]
};
