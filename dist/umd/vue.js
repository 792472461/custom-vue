(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var _toString = Object.prototype.toString;
  var isHTMLTag = makeMap("html,body,base,head,link,meta,style,title," + "address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section," + "div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul," + "a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby," + "s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video," + "embed,object,param,source,canvas,script,noscript,del,ins," + "caption,col,colgroup,table,thead,tbody,td,th,tr," + "button,datalist,fieldset,form,input,label,legend,meter,optgroup,option," + "output,progress,select,textarea," + "details,dialog,menu,menuitem,summary," + "content,element,shadow,template,blockquote,iframe,tfoot"); // this map is intentionally selective, only covering SVG elements that may
  // contain child elements.

  var isSVG = makeMap("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face," + "foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern," + "polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", true);
  function isObject(obj) {
    return obj !== null && _typeof(obj) === "object";
  }
  function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }
  function query(el) {
    if (typeof el === "string") {
      var selected = document.querySelector(el);

      if (!selected) {
        return document.createElement("div");
      }

      return selected;
    } else {
      return el;
    }
  }
  var warn$1 = console.error;
  function isPlainObject(obj) {
    return _toString.call(obj) === "[object Object]";
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  var noop = function noop() {};
  function makeMap(str, expectsLowerCase) {
    var map = Object.create(null);
    var list = str.split(",");

    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }

    return expectsLowerCase ? function (val) {
      return map[val.toLowerCase()];
    } : function (val) {
      return map[val];
    };
  }
  /**
   * Check if value is primitive.
   */

  function isPrimitive(value) {
    return typeof value === "string" || typeof value === "number" || // $flow-disable-line
    _typeof(value) === "symbol" || typeof value === "boolean";
  }
  function isDef$1(v) {
    return v !== undefined && v !== null;
  }
  function isUndef$1(v) {
    return v === undefined || v === null;
  }
  function parsePlatformTagName(_) {
    return _;
  }
  function isReservedTag(tag) {
    return isHTMLTag(tag) || isSVG(tag);
  }
  function getTagNamespace(tag) {
    if (isSVG(tag)) {
      return "svg";
    } // basic support for MathML
    // note it doesn't support other MathML elements being component roots


    if (tag === "math") {
      return "math";
    }
  }
  /**
   * Create a cached version of a pure function.
   */

  function cached(fn) {
    var cache = Object.create(null);
    return function cachedFn(str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  }
  function createFunction(code) {
    var errors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    try {
      return new Function(code);
    } catch (err) {
      errors.push({
        err: err,
        code: code
      });
      return noop;
    }
  }
  function toString(val) {
    return val == null ? "" : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
  }

  var Observe = /*#__PURE__*/function () {
    function Observe(value) {
      _classCallCheck(this, Observe);

      this.value = value;
      this.vmCount = 0;
      def(value, "__ob__", this);

      if (Array.isArray(value)) {
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observe, [{
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var value = data[key];
          defineReactive(data, key, value);
        }
      }
    }, {
      key: "observeArray",
      value: function observeArray(items) {
        for (var i = 0, l = items.length; i < l; i++) {
          observe(items[i]);
        }
      }
    }]);

    return Observe;
  }();

  function defineReactive(data, key, value) {
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newVal) {
        if (newVal === value) return;
        value = newVal;
      }
    });
  }

  function observe(data) {
    if (!isObject(data)) {
      return;
    }
    new Observe(data);
  }

  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  };
  function initState(vm) {
    var options = vm.$options;

    if (options.props) {
      initProps(vm, options.props);
    }

    if (options.methods) {
      initMethods(vm, options.methods);
    }

    if (options.data) {
      initData(vm);
    } else {
      observe(vm._data = {});
    }

    if (options.computed) ;

    if (options.watch) ;
  }

  function initProps() {}

  function initData(vm) {
    console.log(vm.$options.data);
    var data = vm.$options.data;
    data = vm._data = typeof data === "function" ? getData(data) : data;
    console.log(data);

    if (!isPlainObject(data)) {
      data = {};
      warn$1("data functions should return an object:\n" + "https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function", vm);
    }

    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;

    while (i--) {
      var key = keys[i];

      if (methods && hasOwn(methods, key)) {
        warn$1("Method \"".concat(key, "\" has already been defined as a data property."), vm);
      }

      if (props && hasOwn(props, key)) {
        warn$1("The data property \"".concat(key, "\" is already declared as a prop. ") + "Use prop default value instead.", vm);
      } else if (!isReserved(key)) {
        proxy(vm, "_data", key);
      }
    } // console.log(data);


    observe(data);
  }

  function initMethods() {}

  function getData(data, vm) {
    // #7573 disable dep collection when invoking data getters
    try {
      return data.call(vm, vm);
    } catch (e) {
      // handleError(e, vm, `data()`);
      return {};
    } finally {}
  }
  function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
      return this[sourceKey][key];
    };

    sharedPropertyDefinition.set = function proxySetter(val) {
      this[sourceKey][key] = val;
    };

    Object.defineProperty(target, key, sharedPropertyDefinition);
  }
  function isReserved(str) {
    var c = (str + "").charCodeAt(0);
    return c === 0x24 || c === 0x5f;
  }

  var createEmptyVNode = function createEmptyVNode(text) {
    var node = new VNode();
    node.text = text;
    node.isComment = true;
    return node;
  };
  function createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val));
  }

  var VNode = /*#__PURE__*/function () {
    // tag: string | void;
    // data: VNodeData | void;
    // children: ?Array<VNode>;
    // text: string | void;
    // elm: Node | void;
    // ns: string | void;
    // context: Component | void; // rendered in this component's scope
    // key: string | number | void;
    // componentOptions: VNodeComponentOptions | void;
    // componentInstance: Component | void; // component instance
    // parent: VNode | void; // component placeholder node
    // // strictly internal
    // raw: boolean; // contains raw HTML? (server only)
    // isStatic: boolean; // hoisted static node
    // isRootInsert: boolean; // necessary for enter transition check
    // isComment: boolean; // empty comment placeholder?
    // isCloned: boolean; // is a cloned node?
    // isOnce: boolean; // is a v-once node?
    // asyncFactory: Function | void; // async component factory function
    // asyncMeta: Object | void;
    // isAsyncPlaceholder: boolean;
    // ssrContext: Object | void;
    // fnContext: Component | void; // real context vm for functional nodes
    // fnOptions: ?ComponentOptions; // for SSR caching
    // devtoolsMeta: ?Object; // used to store functional render context for devtools
    // fnScopeId: ?string; // functional scope id support
    function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
      _classCallCheck(this, VNode);

      this.tag = tag;
      this.data = data;
      this.children = children;
      this.text = text;
      this.elm = elm;
      this.ns = undefined;
      this.context = context;
      this.fnContext = undefined;
      this.fnOptions = undefined;
      this.fnScopeId = undefined;
      this.key = data && data.key;
      this.componentOptions = componentOptions;
      this.componentInstance = undefined;
      this.parent = undefined;
      this.raw = false;
      this.isStatic = false;
      this.isRootInsert = true;
      this.isComment = false;
      this.isCloned = false;
      this.isOnce = false;
      this.asyncFactory = asyncFactory;
      this.asyncMeta = undefined;
      this.isAsyncPlaceholder = false;
    } // DEPRECATED: alias for componentInstance for backwards compat.

    /* istanbul ignore next */


    _createClass(VNode, [{
      key: "child",
      get: function get() {
        return this.componentInstance;
      }
    }]);

    return VNode;
  }();

  function mountComponent(vm, el, hydrating) {
    vm.$el = el;

    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode; // if (
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
    var updateComponent;

    updateComponent = function updateComponent() {
      vm._update(vm._render(), hydrating); // vm._render();

    };

    updateComponent(); // new Watcher(
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
  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
      var vm = this;
      var prevEl = vm.$el;
      var prevVnode = vm._vnode;
      vm._vnode = vnode;

      if (!prevVnode) {
        // initial render
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
        /* removeOnly */
        );
      } else {
        // updates
        vm.$el = vm.__patch__(prevVnode, vnode);
      }
    };
  }

  /* not type checking this file because flow doesn't play well with Proxy */
  var initProxy;

  var hasProxy = typeof Proxy !== "undefined";

  if (hasProxy) {
    var isBuiltInModifier = makeMap("stop,prevent,self,ctrl,shift,alt,meta,exact");
    new Proxy(Object.create(null), {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn$1("Avoid overwriting built-in modifier in config.keyCodes: .".concat(key));
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var allowedGlobals = makeMap("Infinity,undefined,NaN,isFinite,isNaN," + "parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent," + "Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl," + "require" // for Webpack/Browserify
  );

  initProxy = function initProxy(vm) {
    // if (hasProxy) {
    //   // determine which proxy handler to use
    //   const options = vm.$options;
    //   const handlers =
    //     options.render && options.render._withStripped ? getHandler : hasHandler;
    //   vm._renderProxy = new Proxy(vm, handlers);
    // } else {
    vm._renderProxy = vm; // }
  };

  // statically analyzing the template at compile time.
  //
  // For plain HTML markup, normalization can be completely skipped because the
  // generated render function is guaranteed to return Array<VNode>. There are
  // two cases where extra normalization is needed:
  // 1. When the children contains components - because a functional component
  // may return an Array instead of a single root. In this case, just a simple
  // normalization is needed - if any child is an Array, we flatten the whole
  // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
  // because functional components already normalize their own children.

  function simpleNormalizeChildren(children) {
    for (var i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        return Array.prototype.concat.apply([], children);
      }
    }

    return children;
  } // 2. When the children contains constructs that always generated nested Arrays,
  // e.g. <template>, <slot>, v-for, or when the children is provided by user
  // with hand-written render functions / JSX. In such cases a full normalization
  // is needed to cater to all possible types of children values.

  function normalizeChildren(children) {
    return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
  }

  function normalizeArrayChildren(children, nextIndex) {
    var res = [];
    var i, c, lastIndex, last;

    for (i = 0; i < children.length; i++) {
      c = children[i];
      console.log(c);
      if (isUndef(c) || typeof c === "boolean") continue;
      lastIndex = res.length - 1;
      last = res[lastIndex];

      if (Array.isArray(c)) {
        if (c.length > 0) {
          c = normalizeArrayChildren(c, "".concat(nestedIndex || "", "_").concat(i)); // merge adjacent text nodes

          if (isTextNode(c[0]) && isTextNode(last)) {
            res[lastIndex] = createTextVNode(last.text + c[0].text);
            c.shift();
          }

          res.push.apply(res, c);
        }
      } else if (isPrimitive(c)) {
        if (isTextNode(last)) {
          // merge adjacent text nodes
          // this is necessary for SSR hydration because text nodes are
          // essentially merged when rendered to HTML strings
          res[lastIndex] = createTextVNode(last.text + c);
        } else if (c !== "") {
          // convert primitive to vnode
          res.push(createTextVNode(c));
        }
      } else {
        if (isTextNode(c) && isTextNode(last)) {
          // merge adjacent text nodes
          res[lastIndex] = createTextVNode(last.text + c.text);
        } else {
          // default key for nested array children (likely generated by v-for)
          if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
            c.key = "__vlist".concat(nestedIndex, "_").concat(i, "__");
          }

          res.push(c);
        }
      }
    }

    return res;
  }

  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;
  function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = undefined;
    }

    if (alwaysNormalize === true) {
      normalizationType = ALWAYS_NORMALIZE;
    }

    return _createElement(context, tag, data, children, normalizationType);
  }
  function _createElement(context, tag, data, children, normalizationType) {
    // 首先对data校验  data不能是响应式的
    if (isDef$1(data) && isDef$1(data.__ob__)) {
      warn("Avoid using observed data object as vnode data: ".concat(JSON.stringify(data), "\n") + "Always create fresh vnode data objects in each render!", context);
      return createEmptyVNode();
    }

    if (isDef$1(data) && isDef$1(data.is)) {
      tag = data.is;
    }

    if (!tag) {
      // in case of component :is set to falsy value
      return createEmptyVNode();
    } // if (Array.isArray(children) && typeof children[0] === 'function') {
    // }


    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }

    var vnode, ns;

    if (typeof tag === "string") {
      var Ctor;
      ns = context.$vnode && context.$vnode.ns || getTagNamespace(tag); // 这里先判断是不是html基本标签

      if (isReservedTag(tag)) {
        if (isDef$1(data) && isDef$1(data.nativeOn)) {
          warn("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">.", context);
        }

        vnode = new VNode(parsePlatformTagName(tag), data, children, undefined, undefined, context);
      } else if ((!data || !data.pre) && isDef$1(Ctor = resolveAsset(context.$options, "components", tag))) ; else {
        vnode = new VNode(tag, data, children, undefined, undefined, context);
      }
    }

    if (Array.isArray(vnode)) {
      return vnode;
    } else if (isDef$1(vnode)) {
      // if (isDef(ns)) applyNS(vnode, ns);
      // if (isDef(data)) registerDeepBindings(data);
      return vnode;
    } else {
      return createEmptyVNode();
    }
  }

  function initRender(vm) {
    // vm._vnode = null; // the root of the child tree
    // vm._staticTrees = null; // v-once cached trees
    // const options = vm.$options;
    // const parentVnode = (vm.$vnode = options._parentVnode); // the placeholder node in parent tree
    // const renderContext = parentVnode && parentVnode.context;
    vm._c = function (a, b, c, d) {
      return createElement(vm, a, b, c, d, false);
    }; // normalization is always applied for the public version, used in
    // user-written render functions.


    vm.$createElement = function (a, b, c, d) {
      return createElement(vm, a, b, c, d, true);
    };
  }
  function renderMixin(Vue) {
    installRenderHelpers(Vue.prototype);

    Vue.prototype._render = function () {
      var vm = this;
      var _vm$$options = vm.$options,
          render = _vm$$options.render,
          _parentVnode = _vm$$options._parentVnode;
      var vnode;

      try {
        vnode = render.call(vm._renderProxy, vm.$createElement);
      } catch (error) {
        console.log(error);
      }

      if (Array.isArray(vnode) && vnode.length === 1) {
        vnode = vnode[0];
      } // return empty vnode in case the render function errored out


      if (!(vnode instanceof VNode)) {
        if (Array.isArray(vnode)) {
          warn("Multiple root nodes returned from render function. Render function " + "should return a single root node.", vm);
        }

        vnode = createEmptyVNode();
      } // set parent


      vnode.parent = _parentVnode;
      console.log(vnode);
      return vnode;
    };
  }

  function installRenderHelpers(target) {
    // target._o = markOnce;
    // target._n = toNumber;
    target._s = toString; // target._l = renderList;
    // target._t = renderSlot;
    // target._q = looseEqual;
    // target._i = looseIndexOf;
    // target._m = renderStatic;
    // target._f = resolveFilter;
    // target._k = checkKeyCodes;
    // target._b = bindObjectProps;

    target._v = createTextVNode;
    target._e = createEmptyVNode; // target._u = resolveScopedSlots;
    // target._g = bindObjectListeners;
    // target._d = bindDynamicKeys;
    // target._p = prependModifier;
  }

  var hooks = ["create", "activate", "update", "remove", "destroy"];
  var SSR_ATTR = "data-server-rendered";
  var ignoredElements = [];
  function createPatchFunction(backend) {
    var i, j;
    var cbs = {};
    console.log(backend);
    var modules = backend.modules,
        nodeOps = backend.nodeOps;

    for (i = 0; i < hooks.length; ++i) {
      cbs[hooks[i]] = [];

      for (j = 0; j < modules.length; ++j) {
        if (isDef$1(modules[j][hooks[i]])) {
          cbs[hooks[i]].push(modules[j][hooks[i]]);
        }
      }
    }

    function invokeDestroyHook(vnode) {
      var i, j;
      var data = vnode.data;

      if (isDef$1(data)) {
        if (isDef$1(i = data.hook) && isDef$1(i = i.destroy)) i(vnode);

        for (i = 0; i < cbs.destroy.length; ++i) {
          cbs.destroy[i](vnode);
        }
      }

      if (isDef$1(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }

    function isUnknownElement(vnode, inVPre) {
      if (!vnode) {
        return;
      }

      return !inVPre && !vnode.ns && !(ignoredElements.length && ignoredElements.some(function (ignore) {
        return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
      })) && isUnknownElement(vnode.tag);
    }

    function assertNodeMatch(node, vnode, inVPre) {
      if (isDef$1(vnode.tag)) {
        return vnode.tag.indexOf("vue-component") === 0 || !isUnknownElement(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
      } else {
        return node.nodeType === (vnode.isComment ? 8 : 3);
      }
    }

    function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
      var i;
      var tag = vnode.tag,
          data = vnode.data,
          children = vnode.children;
      inVPre = inVPre || data && data.pre;
      vnode.elm = elm;

      if (isTrue(vnode.isComment) && isDef$1(vnode.asyncFactory)) {
        vnode.isAsyncPlaceholder = true;
        return true;
      } // assert node match


      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }

      if (isDef$1(data)) {
        if (isDef$1(i = data.hook) && isDef$1(i = i.init)) i(vnode, true
        /* hydrating */
        );

        if (isDef$1(i = vnode.componentInstance)) {
          // child component. it should have hydrated its own tree.
          initComponent(vnode, insertedVnodeQueue);
          return true;
        }
      }
    }

    function emptyNodeAt(elm) {
      return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
    }

    function createChildren(vnode, children, insertedVnodeQueue) {
      console.log(vnode.elm, "createChildren");

      if (Array.isArray(children)) {
        for (var _i = 0; _i < children.length; ++_i) {
          createElm(children[_i], insertedVnodeQueue, vnode.elm, null);
        }
      } else if (isPrimitive(vnode.text)) {
        nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
      }
    }

    function insert(parent, elm, ref) {
      if (isDef$1(parent)) {
        if (isDef$1(ref)) {
          if (nodeOps.parentNode(ref) === parent) {
            nodeOps.insertBefore(parent, elm, ref);
          }
        } else {
          nodeOps.appendChild(parent, elm);
        }
      }
    }

    function invokeCreateHooks(vnode, insertedVnodeQueue) {
      for (var _i2 = 0; _i2 < cbs.create.length; ++_i2) {
        cbs.create[_i2](emptyNode, vnode);
      }

      i = vnode.data.hook; // Reuse variable

      if (isDef$1(i)) {
        if (isDef$1(i.create)) i.create(emptyNode, vnode);
        if (isDef$1(i.insert)) insertedVnodeQueue.push(vnode);
      }
    }

    function createRmCb(childElm, listeners) {
      function remove() {
        if (--remove.listeners === 0) {
          removeNode(childElm);
        }
      }

      remove.listeners = listeners;
      return remove;
    }

    function removeNode(el) {
      var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

      if (isDef$1(parent)) {
        nodeOps.removeChild(parent, el);
      }
    }

    function removeAndInvokeRemoveHook(vnode, rm) {
      if (isDef$1(rm) || isDef$1(vnode.data)) {
        var _i3;

        var listeners = cbs.remove.length + 1;

        if (isDef$1(rm)) {
          // we have a recursively passed down rm callback
          // increase the listeners count
          rm.listeners += listeners;
        } else {
          // directly removing
          rm = createRmCb(vnode.elm, listeners);
        } // recursively invoke hooks on child component root node


        if (isDef$1(_i3 = vnode.componentInstance) && isDef$1(_i3 = _i3._vnode) && isDef$1(_i3.data)) {
          removeAndInvokeRemoveHook(_i3, rm);
        }

        for (_i3 = 0; _i3 < cbs.remove.length; ++_i3) {
          cbs.remove[_i3](vnode, rm);
        }

        if (isDef$1(_i3 = vnode.data.hook) && isDef$1(_i3 = _i3.remove)) {
          _i3(vnode, rm);
        } else {
          rm();
        }
      } else {
        removeNode(vnode.elm);
      }
    }

    function removeVnodes(vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];

        if (isDef$1(ch)) {
          if (isDef$1(ch.tag)) {
            removeAndInvokeRemoveHook(ch);
            invokeDestroyHook(ch);
          } else {
            // Text node
            removeNode(ch.elm);
          }
        }
      }
    }

    var creatingElmInVPre = 0;

    function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
      var data = vnode.data;
      var children = vnode.children;
      var tag = vnode.tag;
      debugger;

      if (isDef$1(tag)) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement(vnode, creatingElmInVPre)) {
          warn("Unknown custom element: <" + tag + "> - did you " + "register the component correctly? For recursive components, " + 'make sure to provide the "name" option.', vnode.context);
        }

        console.log(vnode);
        vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef$1(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      } else if (vnode.isComment === true) {
        vnode.elm = nodeOps.createComment(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      } else {
        vnode.elm = nodeOps.createTextNode(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      }
    }

    return function patch(oldVnode, vnode, hydrating, removeOnly) {
      if (isUndef$1(vnode)) {
        if (isDef$1(oldVnode)) invokeDestroyHook(oldVnode);
        return;
      }
      var insertedVnodeQueue = [];

      if (isUndef$1(oldVnode)) ; else {
        console.log(oldVnode);
        var isRealElement = isDef$1(oldVnode.nodeType);
        console.log(isRealElement);

        if (isRealElement) {
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (hydrating === true) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            }

            warn("The client-side rendered virtual DOM tree is not matching " + "server-rendered content. This is likely caused by incorrect " + "HTML markup, for example nesting block-level elements inside " + "<p>, or missing <tbody>. Bailing hydration and performing " + "full client-side render.");
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        }

        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);
        createElm(vnode, insertedVnodeQueue, oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm));

        if (isDef$1(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef$1(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        } // const oldElm = oldVnode;
        // const parentElm = oldElm.parentNode;

      }

      console.log(oldVnode, vnode, hydrating, removeOnly);
    };
  }

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 标签开头的正则 捕获的内容是标签名

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配标签结尾的 </div>

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

  var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
  var decodingMap = {
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&amp;": "&",
    "&#10;": "\n",
    "&#9;": "\t",
    "&#39;": "'"
  };
  var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
  var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;
  var isPlainTextElement = makeMap("script,style,textarea", true);
  var isUnaryTag = makeMap("area,base,br,col,embed,frame,hr,img,input,isindex,keygen," + "link,meta,param,source,track,wbr");

  function decodeAttr(value, shouldDecodeNewlines) {
    var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
    return value.replace(re, function (match) {
      return decodingMap[match];
    });
  }

  function parseHtml(html) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var stack = [];
    var index = 0;
    var lastTag;

    while (html) {

      if (!lastTag || !isPlainTextElement(lastTag)) {
        var textEnd = html.indexOf("<");

        if (textEnd === 0) {
          // End tag:
          var endTagMatch = html.match(endTag);

          if (endTagMatch) {
            var curIndex = index;
            advance(endTagMatch[0].length);
            parseEndTag(endTagMatch[1], curIndex, index);
            continue;
          } // Start tag:


          var startTagMatch = parseStartTag();

          if (startTagMatch) {
            handleStartTag(startTagMatch); // if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            //   advance(1);
            // }

            continue;
          }
        }

        var text = void 0;

        if (textEnd >= 0) {
          text = html.substring(0, textEnd);
        }

        if (textEnd < 0) {
          text = html;
        }

        if (text) {
          advance(text.length);
          chars(text, index - text.length);
        }
      }
    }

    function advance(n) {
      index += n;
      html = html.substring(n);
    }

    function chars(text, start, end) {
      if (options.chars) {
        options.chars(text, index - text.length, index);
      }
    }

    function handleStartTag(match) {
      var tagName = match.tagName;
      var unarySlash = match.unarySlash;
      var unary = isUnaryTag(tagName) || !!unarySlash;
      var l = match.attrs.length;
      var attrs = new Array(l);

      for (var i = 0; i < l; i++) {
        var args = match.attrs[i];
        var value = args[3] || args[4] || args[5] || "";
        var shouldDecodeNewlines = tagName === "a" && args[1] === "href" ? options.shouldDecodeNewlinesForHref : options.shouldDecodeNewlines;
        attrs[i] = {
          name: args[1],
          value: decodeAttr(value, shouldDecodeNewlines)
        };

        if (options.outputSourceRange) {
          attrs[i].start = args.start + args[0].match(/^\s*/).length;
          attrs[i].end = args.end;
        }
      }

      if (!unary) {
        stack.push({
          tag: tagName,
          lowerCasedTag: tagName.toLowerCase(),
          attrs: attrs,
          start: match.start,
          end: match.end
        });
        lastTag = tagName;
      }

      if (options.start) {
        options.start(tagName, attrs, unary, match.start, match.end);
      }
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: [],
          start: index
        };
        advance(start[0].length);
        var end, attr;

        while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
          attr.start = index;
          advance(attr[0].length);
          attr.end = index;
          match.attrs.push(attr);
        }

        if (end) {
          match.unarySlash = end[1];
          advance(end[0].length);
          match.end = index;
          return match;
        }
      }
    }

    function parseEndTag(tagName, start, end) {
      var pos, lowerCasedTagName;
      if (start == null) start = index;
      if (end == null) end = index;

      if (tagName) {
        lowerCasedTagName = tagName.toLowerCase();

        for (pos = stack.length - 1; pos >= 0; pos--) {
          if (stack[pos].lowerCasedTag === lowerCasedTagName) {
            break;
          }
        }
      } else {
        // If no tag name is provided, clean shop
        pos = 0;
      }

      if (pos >= 0) {
        // Close all the open elements, up the stack
        for (var i = stack.length - 1; i >= pos; i--) {
          if ((i > pos || !tagName) && warn$1) {
            warn$1("tag <".concat(stack[i].tag, "> has no matching end tag."), {
              start: stack[i].start,
              end: stack[i].end
            });
          }

          if (options.end) {
            options.end(stack[i].tag, start, end);
          }
        } // Remove the open elements from the stack


        stack.length = pos;
        lastTag = pos && stack[pos - 1].tag;
      } else if (lowerCasedTagName === "br") {
        if (options.start) {
          options.start(tagName, [], true, start, end);
        }
      } else if (lowerCasedTagName === "p") {
        if (options.start) {
          options.start(tagName, [], false, start, end);
        }

        if (options.end) {
          options.end(tagName, start, end);
        }
      }
    }
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
  var buildRegex = cached(function (delimiters) {
    var open = delimiters[0].replace(regexEscapeRE, "\\$&");
    var close = delimiters[1].replace(regexEscapeRE, "\\$&");
    return new RegExp(open + "((?:.|\\n)+?)" + close, "g");
  });
  function parse(template) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var root, currentParent;
    var stack = [];
    parseHtml(template, {
      start: function start(tag, attrs, unary) {
        var element = createASTElement(tag, attrs, currentParent);

        if (!root) {
          root = element;
        }

        if (!unary) {
          currentParent = element;
          stack.push(element);
        }
      },
      end: function end(tag, start, _end) {
        var element = stack.pop();
        currentParent = stack[stack.length - 1];

        if (currentParent) {
          element.parent = currentParent;
          currentParent.children.push(element);
        }
      },
      chars: function chars(text, start, end) {
        if (!currentParent) {
          return;
        }

        var children = currentParent.children;
        var child, res;

        if (text !== " " && (res = parseText(text, options.delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== " " || !children.length || children[children.length - 1].text !== " ") {
          child = {
            type: 3,
            text: text
          };
        }

        if (child) {
          children.push(child);
        }
      }
    });
    return root;
  }

  function makeAttrsMap(attrs) {
    var map = {};

    for (var i = 0, l = attrs.length; i < l; i++) {
      if (map[attrs[i].name]) {
        warn("duplicate attribute: " + attrs[i].name, attrs[i]);
      }

      map[attrs[i].name] = attrs[i].value;
    }

    return map;
  }

  function createASTElement(tag, attrs, parent) {
    return {
      type: 1,
      tag: tag,
      attrsList: attrs,
      attrsMap: makeAttrsMap(attrs),
      parent: parent,
      children: []
    };
  }
  function parseText(text, delimiters) {
    var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;

    if (!tagRE.test(text)) {
      return;
    }

    var tokens = [];
    var rawTokens = [];
    var lastIndex = tagRE.lastIndex = 0;
    var match, index, tokenValue;

    while (match = tagRE.exec(text)) {
      index = match.index; // push text token

      if (index > lastIndex) {
        rawTokens.push(tokenValue = text.slice(lastIndex, index));
        tokens.push(JSON.stringify(tokenValue));
      } // tag token


      var exp = parseFilters(match[1].trim());
      tokens.push("_s(".concat(exp, ")"));
      rawTokens.push({
        "@binding": exp
      });
      lastIndex = index + match[0].length;
    }

    if (lastIndex < text.length) {
      rawTokens.push(tokenValue = text.slice(lastIndex));
      tokens.push(JSON.stringify(tokenValue));
    }

    return {
      expression: tokens.join("+"),
      tokens: rawTokens
    };
  }
  var validDivisionCharRE = /[\w).+\-_$\]]/;
  function parseFilters(exp) {
    var inSingle = false;
    var inDouble = false;
    var inTemplateString = false;
    var inRegex = false;
    var curly = 0;
    var square = 0;
    var paren = 0;
    var lastFilterIndex = 0;
    var c, prev, i, expression, filters;

    for (i = 0; i < exp.length; i++) {
      prev = c;
      c = exp.charCodeAt(i);

      if (inSingle) {
        if (c === 0x27 && prev !== 0x5c) inSingle = false;
      } else if (inDouble) {
        if (c === 0x22 && prev !== 0x5c) inDouble = false;
      } else if (inTemplateString) {
        if (c === 0x60 && prev !== 0x5c) inTemplateString = false;
      } else if (inRegex) {
        if (c === 0x2f && prev !== 0x5c) inRegex = false;
      } else if (c === 0x7c && // pipe
      exp.charCodeAt(i + 1) !== 0x7c && exp.charCodeAt(i - 1) !== 0x7c && !curly && !square && !paren) {
        if (expression === undefined) {
          // first filter, end of expression
          lastFilterIndex = i + 1;
          expression = exp.slice(0, i).trim();
        } else {
          pushFilter();
        }
      } else {
        switch (c) {
          case 0x22:
            inDouble = true;
            break;
          // "

          case 0x27:
            inSingle = true;
            break;
          // '

          case 0x60:
            inTemplateString = true;
            break;
          // `

          case 0x28:
            paren++;
            break;
          // (

          case 0x29:
            paren--;
            break;
          // )

          case 0x5b:
            square++;
            break;
          // [

          case 0x5d:
            square--;
            break;
          // ]

          case 0x7b:
            curly++;
            break;
          // {

          case 0x7d:
            curly--;
            break;
          // }
        }

        if (c === 0x2f) {
          // /
          var j = i - 1;
          var p = void 0; // find first non-whitespace prev char

          for (; j >= 0; j--) {
            p = exp.charAt(j);
            if (p !== " ") break;
          }

          if (!p || !validDivisionCharRE.test(p)) {
            inRegex = true;
          }
        }
      }
    }

    if (expression === undefined) {
      expression = exp.slice(0, i).trim();
    } else if (lastFilterIndex !== 0) {
      pushFilter();
    }

    function pushFilter() {
      (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
      lastFilterIndex = i + 1;
    }

    if (filters) {
      for (i = 0; i < filters.length; i++) {
        expression = wrapFilter(expression, filters[i]);
      }
    }

    return expression;
  }

  function generate(ast, options) {
    var code = ast ? genElement(ast) : '_c("div")';
    return {
      render: "with(this) {console.log(this); return ".concat(code, "}"),
      staticRenderFns: []
    };
  }
  function genElement(el) {
    if (el.parent) {
      el.pre = el.pre || el.parent.pre;
    }

    var code;
    code = "_c('".concat(el.tag, "', {attrs: ").concat(JSON.stringify(el.attrsMap), "}, ").concat(el.children ? genChildren(el) : "", ")"); // if (!el.plain || (el.pre && state.maybeComponent(el))) {
    //   data = genData(el, state);
    // }
    // const children = el.inlineTemplate ? null : genChildren(el, state, true);
    // code = `_c('${el.tag}'${
    //   data ? `,${data}` : "" // data
    // }${
    //   children ? `,${children}` : "" // children
    // })`;
    // module transforms
    // for (let i = 0; i < state.transforms.length; i++) {
    //   code = state.transforms[i](el, code);
    // }

    return code;
  }
  function genChildren(el) {
    var children = el.children;

    if (children.length) {
      return children.map(function (children) {
        return gen(children);
      }).filter(Boolean).join(",");
    }
  }
  function gen(node) {
    if (node.type === 1) {
      return genElement(node);
    } else {
      var text = node.text;

      if (node.type === 3) {
        return "";
      } else {
        return genText(node);
      }
    }
  }
  function genText(text) {
    return "_v(".concat(text.type === 2 ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text)), ")");
  }

  function transformSpecialNewlines(text) {
    return text.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  } // with (this) {
  //   return _c(
  //     "div",
  //     { attrs: { id: "app", class: "root" } },
  //     _c("p", { attrs: { class: "p" } }, _v(_s(message)))
  //   );
  // }
  // with(this){return _c('div', {attrs: {"id":"app","class":"root"}},_c('p', {attrs: {"class":"p"}}_v(_s(message))),)}

  var baseOptions = {};
  function createCompilerCreator(baseCompile) {
    return function createCompiler(baseOptions) {
      function compile(template, options) {
        var finalOptions = Object.create(baseOptions);
        var errors = [];
        var tips = [];

        finalOptions.warn = function (msg, tip) {
          (tip ? tips : errors).push(msg);
        };

        if (options) {
          // merge custom modules
          if (options.modules) {
            finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
          } // merge custom directives


          if (options.directives) {
            finalOptions.directives = extend(Object.create(baseOptions.directives || null), options.directives);
          } // copy other options


          for (var key in options) {
            if (key !== "modules" && key !== "directives") {
              finalOptions[key] = options[key];
            }
          }
        }

        var compiled = baseCompile(template, finalOptions); // errors.push.apply(errors, detectErrors(compiled.ast));

        compiled.errors = errors;
        compiled.tips = tips;
        return compiled;
      }

      return {
        compile: compile,
        compileToFunctions: createCompileToFunctionFn(compile)
      };
    };
  }
  function createCompileToFunctionFn(compile) {
    var cache = Object.create(null);
    return function compileToFunctions(template) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var vm = arguments.length > 2 ? arguments[2] : undefined;
      options = Object.create({}, options);
      var warn = options.warn || warn;
      delete options.warn;

      try {
        new Function("return 1");
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn("It seems you are using the standalone build of Vue.js in an " + "environment with Content Security Policy that prohibits unsafe-eval. " + "The template compiler cannot work in this environment. Consider " + "relaxing the policy to allow unsafe-eval or pre-compiling your " + "templates into render functions.");
        }
      }

      var key = options.delimiters ? String(options.delimiters) + template : template;

      if (cache[key]) {
        return cache[key];
      }

      var compiled = compile(template, options);

      if (compiled.errors && compiled.errors.length) {
        warn("Error compiling template:\n\n".concat(template, "\n\n") + compiled.errors.map(function (e) {
          return "- ".concat(e);
        }).join("\n") + "\n", vm);
      }

      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) {
          return tip(msg, vm);
        });
      }

      var res = {};
      var fnGenErrors = [];
      res.render = createFunction(compiled.render, fnGenErrors);
      res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
        return createFunction(code, fnGenErrors);
      });

      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn("Failed to generate render function:\n\n" + fnGenErrors.map(function (_ref) {
          var err = _ref.err,
              code = _ref.code;
          return "".concat(err.toString(), " in\n\n").concat(code, "\n");
        }).join("\n"), vm);
      }

      return cache[key] = res;
    };
  }
  var createCompiler = createCompilerCreator(function baseCompile(template, options) {
    var ast = parse(template.trim(), options);
    var code = generate(ast);
    console.log(code.render, 'code');
    return {
      ast: ast,
      render: code.render,
      staticRenderFns: code.staticRenderFns
    };
  });

  var _createCompiler = createCompiler(baseOptions),
      compileToFunctions = _createCompiler.compileToFunctions;

  var namespaceMap = {
    svg: "http://www.w3.org/2000/svg",
    math: "http://www.w3.org/1998/Math/MathML"
  };
  function createElement$1(tagName, vnode) {
    var elm = document.createElement(tagName);

    if (tagName !== "select") {
      return elm;
    } // false or null will remove the attribute but undefined will not


    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
      elm.setAttribute("multiple", "multiple");
    }

    return elm;
  }
  function createElementNS(namespace, tagName) {
    return document.createElementNS(namespaceMap[namespace], tagName);
  }
  function createTextNode(text) {
    return document.createTextNode(text);
  }
  function createComment(text) {
    return document.createComment(text);
  }
  function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
  }
  function removeChild(node, child) {
    node.removeChild(child);
  }
  function appendChild(node, child) {
    node.appendChild(child);
  }
  function parentNode(node) {
    return node.parentNode;
  }
  function nextSibling(node) {
    return node.nextSibling;
  }
  function tagName(node) {
    return node.tagName;
  }
  function setTextContent(node, text) {
    node.textContent = text;
  }
  function setStyleScope(node, scopeId) {
    node.setAttribute(scopeId, "");
  }

  var nodeOps = /*#__PURE__*/Object.freeze({
    __proto__: null,
    namespaceMap: namespaceMap,
    createElement: createElement$1,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    setStyleScope: setStyleScope
  });

  var uid = 0;

  function mount(el, hydrating) {
    mountComponent(this, el, hydrating);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm._uid = uid++;
      vm._isVue = true;
      vm.$options = options; // if (process.env.NODE_ENV !== "production") {

      initProxy(vm); // } else {
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
      var options = this.$options;
      el = el && query(el);

      if (!options.render) {
        var template = options.template;

        if (template) {
          if (typeof template === "string") {
            if (template.charAt(0) === "#") {
              template = idToTemplate(template);
              /* istanbul ignore if */

              if (!template) {
                warn$1("Template element not found or is empty: ".concat(options.template), this);
              }
            }
          } else if (template.nodeType) {
            template = template.innerHTML;
          } else {
            if (process.env.NODE_ENV !== "production") {
              warn$1("invalid template option:" + template, this);
            }

            return this;
          }
        } else if (el) {
          template = getOuterHTML(el);
        }

        if (template) {
          var _compileToFunctions = compileToFunctions(template, {}, this),
              render = _compileToFunctions.render,
              staticRenderFns = _compileToFunctions.staticRenderFns;

          console.log(render);
          options.render = render;
          options.staticRenderFns = staticRenderFns;
        }
      }

      return mount.call(this, el, false);
    };

    Vue.prototype.__patch__ = createPatchFunction({
      nodeOps: nodeOps,
      modules: []
    });
  }

  function getOuterHTML(el) {
    if (el.outerHTML) {
      return el.outerHTML;
    } else {
      var container = document.createElement("div");
      container.appendChild(el.cloneNode(true));
      return container.innerHTML;
    }
  }

  var Vue = function Vue(options) {
    _classCallCheck(this, Vue);

    this._init(options);
  };

  initMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
