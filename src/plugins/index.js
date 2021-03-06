const pluginMap = {};
const requireFiles = require.context("./", true, /\.js$/);
requireFiles.keys().forEach(path => {
  const name = path.replace(/^(\.\/)/i, "").replace(/\.js$/g, "");
  if (!name) {
    return;
  }
  pluginMap[name] = requireFiles(path);
});

// 导出所有插件
export default pluginMap;
