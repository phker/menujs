
import Vue from 'vue';
import Contextmenu from "./components/Contextmenu";
import Submenu from "./components/Submenu";
import { COMPONENT_NAME } from "./constant";

const ContextmenuConstructor = Vue.extend(Contextmenu);
Vue.component(COMPONENT_NAME, Submenu);

function install(Vue) {  
  Vue.prototype.$contextmenu = (options) => {
    let instance = new ContextmenuConstructor();
    instance.items = options.items;
    instance.position.x = options.x || 0;
    instance.position.y = options.y || 0;
    if (options.event) {
      instance.position.x = options.event.clientX;
      instance.position.y = options.event.clientY;
    }
    instance.customClass = options.customClass;
    options.minWidth && (instance.style.minWidth = options.minWidth);
    options.zIndex && (instance.style.zIndex = options.zIndex);
    instance.$mount();
  }
}

if (window && window.Vue) {
  install(window.Vue)
}

if (!Array.prototype.find) {
    //由于有些浏览器不支持array.find(),这里做一个简单的扩展
    Array.prototype.find = Array.prototype.find || function (callback) {
        for(var i = 0, length = this.length; i < length; i++) {
            var item = this[i];
            if(callback(item)) {
                return item;
            }
        }
        return null;
    };
    //使用方法
    //Array.find(function (item) {
    //    return item.a === 2;
    //})
}

export default {
  install
}
