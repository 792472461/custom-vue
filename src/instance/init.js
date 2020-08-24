import { initState } from "./state";
import { query, warn } from "../utils/index";
import { mountComponent } from "./lifecycle";
import { initProxy } from "./proxy";
import { initRender } from "./render";
import { createPatchFunction } from "../vdom/patch";
import { compileToFunctions } from "../compiler/index";
import * as nodeOps from "../utils/node-ops";

let uid = 0;
function mount(el, hydrating) {
  mountComponent(this, el, hydrating);
}
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm._uid = uid++;
    vm._isVue = true;
    vm.$options = options;

    // if (process.env.NODE_ENV !== "production") {
    initProxy(vm);
    // } else {
    // vm._renderProxy = vm;
    // }

    vm._self = vm;
    initRender(vm);
    initState(vm);
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = this.$options;
    el = el && query(el);
    if (!options.render) {
      let template = options.template;
      if (template) {
        if (typeof template === "string") {
          if (template.charAt(0) === "#") {
            template = idToTemplate(template);
            /* istanbul ignore if */
            if (!template) {
              warn(
                `Template element not found or is empty: ${options.template}`,
                this
              );
            }
          }
        } else if (template.nodeType) {
          template = template.innerHTML;
        } else {
          if (process.env.NODE_ENV !== "production") {
            warn("invalid template option:" + template, this);
          }
          return this;
        }
      } else if (el) {
        template = getOuterHTML(el);
      }
      if (template) {
        const { render } = compileToFunctions(template, {}, this);
        console.log(render);
        options.render = render;
        // options.staticRenderFns = staticRenderFns;
        // 这些是编译相关的，后面在写
      }
    }
    return mount.call(this, el, false);
  };
  Vue.prototype.__patch__ = createPatchFunction({
    nodeOps,
    modules: [],
  });
}

function getOuterHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    const container = document.createElement("div");
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}
