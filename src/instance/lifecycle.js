import { createEmptyVNode } from "../vdom/vnode";
import Watcher from "../observe/watcher";
import { noop, warn } from "../utils/index";

export function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    // if (
    //   (vm.$options.template && vm.$options.template.charAt(0) !== "#") ||
    //   vm.$options.el ||
    //   el
    // ) {
    //   warn(
    //     "You are using the runtime-only build of Vue where the template " +
    //       "compiler is not available. Either pre-compile the templates into " +
    //       "render functions, or use the compiler-included build.",
    //     vm
    //   );
    // } else {
    //   warn(
    //     "Failed to mount component: template or render function not defined.",
    //     vm
    //   );
    // }
  }
  console.log("beforeMount");
  let updateComponent;
  updateComponent = () => {
    vm._update(vm._render(), hydrating);
    // vm._render();
  };
  updateComponent();
  // new Watcher(
  //   vm,
  //   updateComponent,
  //   noop,
  //   {
  //     before() {
  //       if (vm._isMounted && !vm._isDestroyed) {
  //         // callHook(vm, "beforeUpdate");
  //         console.log(vm, "beforeUpdate");
  //       }
  //     },
  //   },
  //   true /* isRenderWatcher */
  // );
}
export let activeInstance;

export function setActiveInstance(vm) {
  const prevActiveInstance = activeInstance;
  activeInstance = vm;
  return () => {
    activeInstance = prevActiveInstance;
  };
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    const vm = this;
    const prevEl = vm.$el;
    const prevVnode = vm._vnode;
    const restoreActiveInstance = setActiveInstance(vm);

    vm._vnode = vnode;
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
  };
}
