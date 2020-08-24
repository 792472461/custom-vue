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
  function createFunction(code, errors) {
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

  var warnNonPresent = function warnNonPresent(target, key) {
    warn$1("Property or method \"".concat(key, "\" is not defined on the instance but ") + "referenced during render. Make sure that this property is reactive, " + "either in the data option, or for class-based components, by " + "initializing the property. " + "See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.", target);
  };

  var warnReservedPrefix = function warnReservedPrefix(target, key) {
    warn$1("Property \"".concat(key, "\" must be accessed with \"$data.").concat(key, "\" because ") + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + "prevent conflicts with Vue internals. " + "See: https://vuejs.org/v2/api/#data", target);
  };

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

  var hasHandler = {
    has: function has(target, key) {
      var has = (key in target);
      var isAllowed = allowedGlobals(key) || typeof key === "string" && key.charAt(0) === "_" && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) warnReservedPrefix(target, key);else warnNonPresent(target, key);
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === "string" && !(key in target)) {
        if (key in target.$data) warnReservedPrefix(target, key);else warnNonPresent(target, key);
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
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
    }

    console.log(arguments); // if (Array.isArray(children) && typeof children[0] === 'function') {
    // }

    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }

    var vnode, ns;

    if (typeof tag === "string") {
      var Ctor;
      console.log(tag);
      ns = context.$vnode && context.$vnode.ns || getTagNamespace(tag); // 这里先判断是不是html基本标签

      if (isReservedTag(tag)) {
        if (isDef$1(data) && isDef$1(data.nativeOn)) {
          warn("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">.", context);
        }

        vnode = new VNode(parsePlatformTagName(tag), data, children, undefined, undefined, context);
      } else if ((!data || !data.pre) && isDef$1(Ctor = resolveAsset(context.$options, "components", tag))) ; else {
        vnode = new VNode(tag, data, children, undefined, undefined, context);
      }

      console.log(vnode);
    }

    console.log(vnode, 'vnode');

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
    Vue.prototype._render = function () {
      var vm = this;
      var _vm$$options = vm.$options,
          render = _vm$$options.render,
          _parentVnode = _vm$$options._parentVnode;
      console.log(render);
      var vnode;

      try {
        vnode = render.call(vm._renderProxy, vm.$createElement);
      } catch (error) {}

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
      return vnode;
    };
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

      if (isDef$1(tag)) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement(vnode, creatingElmInVPre)) {
          warn("Unknown custom element: <" + tag + "> - did you " + "register the component correctly? For recursive components, " + 'make sure to provide the "name" option.', vnode.context);
        }

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
        console.log(parentElm);
        createElm(vnode, insertedVnodeQueue, oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm));

        if (isDef$1(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef$1(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }

      console.log(oldVnode, vnode, hydrating, removeOnly);
    };
  }

  var isPlainTextElement = makeMap("script,style,textarea", true);
  var isUnaryTag = makeMap("area,base,br,col,embed,frame,hr,img,input,isindex,keygen," + "link,meta,param,source,track,wbr");

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

        var compiled = baseCompile(template, finalOptions);
        errors.push.apply(errors, detectErrors(compiled.ast));
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
  var baseOptions = {};
  var createCompiler = createCompilerCreator(function baseCompile(template, options) {
    var ast = parse(template.trim(), options);
    optimize(ast, options);
    var code = generate();
    return {
      ast: ast,
      render: code.render,
      staticRenderFns: code.staticRenderFns
    };
  });
  function generate() {} // ast语法树解析
  // export function compileToFunctions(template, options, vm) {
  //   let root = parseHtml(template);
  //   return function render(h) {};
  // }

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
              render = _compileToFunctions.render;

          console.log(render);
          options.render = render; // options.staticRenderFns = staticRenderFns;
          // 这些是编译相关的，后面在写
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
