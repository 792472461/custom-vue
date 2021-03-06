import { createElement } from "../vdom/create-elemnt";
import VNode, { createEmptyVNode, createTextVNode } from "../vdom/vnode";
import { toString } from "../utils/index";

export function initRender(vm) {
  // vm._vnode = null; // the root of the child tree
  // vm._staticTrees = null; // v-once cached trees
  // const options = vm.$options;
  // const parentVnode = (vm.$vnode = options._parentVnode); // the placeholder node in parent tree
  // const renderContext = parentVnode && parentVnode.context;
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false);
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);
}

export function renderMixin(Vue) {
  installRenderHelpers(Vue.prototype);

  Vue.prototype._render = function () {
    const vm = this;
    const { render, _parentVnode } = vm.$options;
    let vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (error) {
      console.log(error)
    }

    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (Array.isArray(vnode)) {
        warn(
          "Multiple root nodes returned from render function. Render function " +
            "should return a single root node.",
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    console.log(vnode)
    return vnode;
  };
}

function installRenderHelpers(target) {
  // target._o = markOnce;
  // target._n = toNumber;
  target._s = toString;
  // target._l = renderList;
  // target._t = renderSlot;
  // target._q = looseEqual;
  // target._i = looseIndexOf;
  // target._m = renderStatic;
  // target._f = resolveFilter;
  // target._k = checkKeyCodes;
  // target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  // target._u = resolveScopedSlots;
  // target._g = bindObjectListeners;
  // target._d = bindDynamicKeys;
  // target._p = prependModifier;
}
