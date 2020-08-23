import { isObject, def } from "../utils/index";

export class Observe {
  constructor(value) {
    this.value = value;
    this.vmCount = 0;
    def(value, "__ob__", this);
    if (Array.isArray(value)) {
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  walk(data) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}

function defineReactive(data, key, value) {
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newVal) {
      if (newVal === value) return;
      value = newVal;
    },
  });
}

export function observe(data) {
  if (!isObject(data)) {
    return;
  }
  let ob;
  new Observe(data);
}
