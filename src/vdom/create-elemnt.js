import {
  isPrimitive,
  isDef,
  isUndef,
  noop,
  parsePlatformTagName,
  isReservedTag,
  getTagNamespace,
} from "../utils/index";
import VNode, { createEmptyVNode } from "./vnode";
import {
  simpleNormalizeChildren,
  normalizeChildren,
} from "./helpers/normalize-children";

const SIMPLE_NORMALIZE = 1;
const ALWAYS_NORMALIZE = 2;
export function createElement(
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
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

export function _createElement(
  context,
  tag,
  data,
  children,
  normalizationType
) {
  // 首先对data校验  data不能是响应式的
  if (isDef(data) && isDef(data.__ob__)) {
    warn(
      `Avoid using observed data object as vnode data: ${JSON.stringify(
        data
      )}\n` + "Always create fresh vnode data objects in each render!",
      context
    );
    return createEmptyVNode();
  }
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }

  // if (Array.isArray(children) && typeof children[0] === 'function') {
  // }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  let vnode, ns;
  if (typeof tag === "string") {
    let Ctor;
    ns = (context.$vnode && context.$vnode.ns) || getTagNamespace(tag);

    // 这里先判断是不是html基本标签
    if (isReservedTag(tag)) {
      if (isDef(data) && isDef(data.nativeOn)) {
        warn(
          "The .native modifier for v-on is only valid on components but it was used on <" +
            tag +
            ">.",
          context
        );
      }
      vnode = new VNode(
        parsePlatformTagName(tag),
        data,
        children,
        undefined,
        undefined,
        context
      );
    } else if (
      (!data || !data.pre) &&
      isDef((Ctor = resolveAsset(context.$options, "components", tag)))
    ) {
      // 组件逻辑
    } else {
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }

  } else {
    // 组件逻辑
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    // if (isDef(ns)) applyNS(vnode, ns);
    // if (isDef(data)) registerDeepBindings(data);
    return vnode;
  } else {
    return createEmptyVNode();
  }
}
