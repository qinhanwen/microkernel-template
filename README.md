## 微内核模板

- 项目简介

  简单的实现了一个围绕核心模块展开的微内核模板。所有的插件围绕 Core 模块展开。

- 插件可插拔实现

```javascript
// build/webpack.config.js
// 构建阶段实现
// 通过构建时候在 buildModule 之前，也就是加载 loader ，loader 处理文件内容之前，把文件路径指向空文件
...
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
...
```



```javascript
// src/core/index.js
// 运行时实现
// 根据 config 的 ignore 配置，来忽略一些插件
...
forEach(keys(Core.plugins), plugin => {
  // 调用插件方法
  if (!ignore.includes(plugin)) {
    Core.plugins[plugin].call(this);
  }
});
...
```



## 依赖项

业务依赖：

- lodash 
- event-emitter



构建依赖：

- @babel/core 
- @babel/plugin-transform-runtime
- @babel/preset-env
- @babel/runtime
- @babel/runtime-corejs3
- babel-loader
- webpack
- webpack-cli



## 项目结构

```
├── README.md
├── build // 构建文件目录
│   ├── utils.js
│   └── webpack.config.js
├── dist  // 构建目录
│   └── main.js
├── empty.js // 空文件，用于辅助完成插件可插拔
├── example  // 示例目录
│   └── index.html
├── package.json
├── src
│   ├── core // 核心模块
│   │   └── index.js
│   ├── index.js // 入口文件
│   └── plugins // 插件模块
│       ├── index.js
│       ├── plugin1.js
│       └── plugin2.js
└── yarn.lock
```



## 图

![WX20200325-204355@2x](http://114.55.30.96/WX20200325-204355@2x.png)

