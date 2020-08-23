import { observe } from "../observe/index";
import { isPlainObject, warn, hasOwn, noop } from "../utils/index";

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop,
};

export function initState(vm) {
  const options = vm.$options;
  if (options.props) {
    initProps(vm, options.props);
  }
  if (options.methods) {
    initMethods(vm, options.methods);
  }
  if (options.data) {
    initData(vm);
  } else {
    observe((vm._data = {}), true /* asRootData */);
  }
  if (options.computed) {
  }
  if (options.watch) {
  }
}

function initProps() {}

function initData(vm) {
  console.log(vm.$options.data);
  let data = vm.$options.data;
  data = vm._data = typeof data === "function" ? getData(data) : data;
  console.log(data);
  if (!isPlainObject(data)) {
    data = {};
    warn(
      "data functions should return an object:\n" +
        "https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function",
      vm
    );
  }
  const keys = Object.keys(data);
  const props = vm.$options.props;
  const methods = vm.$options.methods;
  let i = keys.length;
  while (i--) {
    const key = keys[i];
    if (methods && hasOwn(methods, key)) {
      warn(`Method "${key}" has already been defined as a data property.`, vm);
    }
    if (props && hasOwn(props, key)) {
      warn(
        `The data property "${key}" is already declared as a prop. ` +
          `Use prop default value instead.`,
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key);
    }
  }
  // console.log(data);
  observe(data);
}

function initMethods() {}

export function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  try {
    return data.call(vm, vm);
  } catch (e) {
    // handleError(e, vm, `data()`);
    return {};
  } finally {
  }
}

export function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

export function isReserved(str) {
  const c = (str + "").charCodeAt(0);
  return c === 0x24 || c === 0x5f;
}
