import { keys, forEach, isString, isFunction, isObject } from "lodash";
import eventEmitter from "event-emitter";

export default class Core {
  constructor(config = {}) {
    let ignore = config.ignore || []; // 获得需要忽略的插件数组，插件可插拔实现2
    // TODO
    // 配置项可以根据具体业务来处理

    eventEmitter(this); // 为当前实例 添加 on、once、emit、off 方法

    forEach(keys(Core.plugins), plugin => {
      // 调用插件方法
      if (!ignore.includes(plugin)) {
        Core.plugins[plugin].call(this);
      }
    });
  }

  destroy() {
    // 派发销毁事件
    this.emit("destroy");
  }

  static install(pluginName, plugin) {
    // 静态安装方法
    if (!isString(pluginName)) {
      throw new TypeError("pluginName is not a string");
    }
    if (!isFunction(plugin)) {
      throw new TypeError("plugin is not a function");
    }
    if (!isObject(Core.plugins)) {
      Core.plugins = {};
    }
    Core.plugins[pluginName] = plugin;
  }
}
