const _toString = Object.prototype.toString;

var isHTMLTag = makeMap(
  "html,body,base,head,link,meta,style,title," +
    "address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section," +
    "div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul," +
    "a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby," +
    "s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video," +
    "embed,object,param,source,canvas,script,noscript,del,ins," +
    "caption,col,colgroup,table,thead,tbody,td,th,tr," +
    "button,datalist,fieldset,form,input,label,legend,meter,optgroup,option," +
    "output,progress,select,textarea," +
    "details,dialog,menu,menuitem,summary," +
    "content,element,shadow,template,blockquote,iframe,tfoot"
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  "svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face," +
    "foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern," +
    "polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",
  true
);

export function isObject(obj) {
  return obj !== null && typeof obj === "object";
}

export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}

export function query(el) {
  if (typeof el === "string") {
    const selected = document.querySelector(el);
    if (!selected) {
      return document.createElement("div");
    }
    return selected;
  } else {
    return el;
  }
}

export const warn = console.error;

export function isPlainObject(obj) {
  return _toString.call(obj) === "[object Object]";
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

export const noop = () => {};

export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => map[val.toLowerCase()] : (val) => map[val];
}

/**
 * Check if value is primitive.
 */
export function isPrimitive(value) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    // $flow-disable-line
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
}

export function isDef(v) {
  return v !== undefined && v !== null;
}

export function isUndef(v) {
  return v === undefined || v === null;
}

export function parsePlatformTagName(_) {
  return _;
}

export function isReservedTag(tag) {
  return isHTMLTag(tag) || isSVG(tag);
}

export function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return "svg";
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === "math") {
    return "math";
  }
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g;
export const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});

/**
 * Create a cached version of a pure function.
 */
export function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
