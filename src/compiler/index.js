import { parseHtml } from "./parse-html";
// ast语法树解析
export function compileToFunctions(template, options, vm) {
  let root = parseHtml(template);
  return function render(h) {};
}
