import { createFunction } from "../utils/index";

export function generate(ast, options) {
  const code = ast ? genElement(ast) : '_c("div")';
  return {
    render: `with(this) {return ${code}}`,
    staticRenderFns: [],
  };
}

export function genElement(el) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }
  let code;
  let data;
  code = `_c('${el.tag}', {attrs: ${JSON.stringify(el.attrsMap)}}, ${
    el.children ? genChildren(el) : ""
  })`;
  // if (!el.plain || (el.pre && state.maybeComponent(el))) {
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

export function genChildren(el) {
  const children = el.children;
  if (children.length) {
    return children
      .map((children) => gen(children))
      .filter(Boolean)
      .join(",");
  }
}

export function gen(node) {
  if (node.type === 1) {
    return genElement(node);
  } else {
    let text = node.text;
    if (node.type === 3) {
      return "";
    } else {
      return genText(node);
    }
  }
}

export function genText(text) {
  return `_v(${
    text.type === 2
      ? text.expression // no need for () because already wrapped in _s()
      : transformSpecialNewlines(JSON.stringify(text.text))
  })`;
}

export function genProps(attrs) {
  let staticProps = ``;
  let dynamicProps = ``;
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    const value = transformSpecialNewlines(prop.value);
    // if (prop.dynamic) {
    //   dynamicProps += `${prop.name},${value},`;
    // } else {
    staticProps += `"${prop.name}":${value},`;
    // }
  }
  staticProps = `{${staticProps.slice(0, -1)}}`;
  //  if (dynamicProps) {
  //    return `_d(${staticProps},[${dynamicProps.slice(0, -1)}])`;
  //  } else {
  return staticProps;
  //  }
}

// #3895, #4268
function transformSpecialNewlines(text) {
  return text.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
// with (this) {
//   return _c(
//     "div",
//     { attrs: { id: "app", class: "root" } },
//     _c("p", { attrs: { class: "p" } }, _v(_s(message)))
//   );
// }
// with(this){return _c('div', {attrs: {"id":"app","class":"root"}},_c('p', {attrs: {"class":"p"}}_v(_s(message))),)}
