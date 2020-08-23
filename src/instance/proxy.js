/* not type checking this file because flow doesn't play well with Proxy */

import { warn, makeMap } from "../utils/index";

let initProxy;

const warnNonPresent = (target, key) => {
  warn(
    `Property or method "${key}" is not defined on the instance but ` +
      "referenced during render. Make sure that this property is reactive, " +
      "either in the data option, or for class-based components, by " +
      "initializing the property. " +
      "See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.",
    target
  );
};

const warnReservedPrefix = (target, key) => {
  warn(
    `Property "${key}" must be accessed with "$data.${key}" because ` +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      "prevent conflicts with Vue internals. " +
      "See: https://vuejs.org/v2/api/#data",
    target
  );
};

const hasProxy = typeof Proxy !== "undefined";

if (hasProxy) {
  const isBuiltInModifier = makeMap(
    "stop,prevent,self,ctrl,shift,alt,meta,exact"
  );
  new Proxy(Object.create(null), {
    set(target, key, value) {
      if (isBuiltInModifier(key)) {
        warn(`Avoid overwriting built-in modifier in config.keyCodes: .${key}`);
        return false;
      } else {
        target[key] = value;
        return true;
      }
    },
  });
}

const hasHandler = {
  has(target, key) {
    const has = key in target;
    const isAllowed =
      allowedGlobals(key) ||
      (typeof key === "string" &&
        key.charAt(0) === "_" &&
        !(key in target.$data));
    if (!has && !isAllowed) {
      if (key in target.$data) warnReservedPrefix(target, key);
      else warnNonPresent(target, key);
    }
    return has || !isAllowed;
  },
};

const getHandler = {
  get(target, key) {
    if (typeof key === "string" && !(key in target)) {
      if (key in target.$data) warnReservedPrefix(target, key);
      else warnNonPresent(target, key);
    }
    return target[key];
  },
};

initProxy = function initProxy(vm) {
  if (hasProxy) {
    // determine which proxy handler to use
    const options = vm.$options;
    const handlers =
      options.render && options.render._withStripped ? getHandler : hasHandler;
    vm._renderProxy = new Proxy(vm, handlers);
  } else {
    vm._renderProxy = vm;
  }
};

export { initProxy };