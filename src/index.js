import { initMixin } from "./instance/init";
import { renderMixin } from "./instance/render";
import { lifecycleMixin } from "./instance/lifecycle";
class Vue {
  constructor(options) {
    this._init(options);
  }
}

initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

export default Vue;
