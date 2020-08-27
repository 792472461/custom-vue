import { warn, createFunction } from "../utils/index";
import { parse } from "./parse";
import { optimize } from "./optimize";
import { generate } from "./generate";
const baseOptions = {};

export function createCompilerCreator(baseCompile) {
  return function createCompiler(baseOptions) {
    function compile(template, options) {
      const finalOptions = Object.create(baseOptions);
      const errors = [];
      const tips = [];

      finalOptions.warn = (msg, tip) => {
        (tip ? tips : errors).push(msg);
      };
      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules = (baseOptions.modules || []).concat(
            options.modules
          );
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (const key in options) {
          if (key !== "modules" && key !== "directives") {
            finalOptions[key] = options[key];
          }
        }
      }
      const compiled = baseCompile(template, finalOptions);
      // errors.push.apply(errors, detectErrors(compiled.ast));
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled;
    }

    return {
      compile,
      compileToFunctions: createCompileToFunctionFn(compile),
    };
  };
}

export function createCompileToFunctionFn(compile) {
  const cache = Object.create(null);
  return function compileToFunctions(template, options = {}, vm) {
    options = Object.create({}, options);
    const warn = options.warn || warn;
    delete options.warn;
    try {
      new Function("return 1");
    } catch (e) {
      if (e.toString().match(/unsafe-eval|CSP/)) {
        warn(
          "It seems you are using the standalone build of Vue.js in an " +
            "environment with Content Security Policy that prohibits unsafe-eval. " +
            "The template compiler cannot work in this environment. Consider " +
            "relaxing the policy to allow unsafe-eval or pre-compiling your " +
            "templates into render functions."
        );
      }
    }
    const key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key];
    }
    const compiled = compile(template, options);
    if (compiled.errors && compiled.errors.length) {
      warn(
        `Error compiling template:\n\n${template}\n\n` +
          compiled.errors.map((e) => `- ${e}`).join("\n") +
          "\n",
        vm
      );
    }
    if (compiled.tips && compiled.tips.length) {
      compiled.tips.forEach((msg) => tip(msg, vm));
    }
    const res = {};
    const fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map((code) => {
      return createFunction(code, fnGenErrors);
    });
    if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
      warn(
        `Failed to generate render function:\n\n` +
          fnGenErrors
            .map(({ err, code }) => `${err.toString()} in\n\n${code}\n`)
            .join("\n"),
        vm
      );
    }
    return (cache[key] = res);
  };
}

export const createCompiler = createCompilerCreator(function baseCompile(
  template,
  options
) {
  const ast = parse(template.trim(), options);
  optimize(ast, options);
  const code = generate(ast, options);
  console.log(code.render, 'code')
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns,
  };
});
const { compile, compileToFunctions } = createCompiler(baseOptions);
export { compile, compileToFunctions };
