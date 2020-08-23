import { makeMap } from "../utils/index";
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
const doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being passed as HTML comment when inlined in page
const comment = /^<!\--/;
const conditionalComment = /^<!\[/;
const decodingMap = {
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&amp;": "&",
  "&#10;": "\n",
  "&#9;": "\t",
  "&#39;": "'",
};
const encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;
export const isPlainTextElement = makeMap("script,style,textarea", true);

export const isUnaryTag = makeMap(
  "area,base,br,col,embed,frame,hr,img,input,isindex,keygen," +
    "link,meta,param,source,track,wbr"
);

export function parseHtml(html, options) {
  const stack = [];
  let index = 0;
  let last, lastTag;
  while (html) {
    last = html;
    if (!lastTag || !isPlainTextElement(lastTag)) {
      let textEnd = html.indexOf("<");
      if (textEnd === 0) {
        // End tag:
        const endTagMatch = html.match(endTag);
        if (endTagMatch) {
          const curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue;
        }
        // Start tag:
        const startTagMatch = parseStartTag();
        console.log(startTagMatch, "startTagMatch");

        if (startTagMatch) {
          handleStartTag(startTagMatch);
          // if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
          //   advance(1);
          // }
          continue;
        }
      }
      let text, rest, next;
      if (textEnd >= 0) {
        text = html.substring(0, textEnd);
      }
      if (textEnd < 0) {
        text = html;
      }
      if (text) {
        advance(text.length);
        chars(text, index - text.length, index);
      }
    }
  }
  function chars(text, start, end) {
    console.log('文本', text, start, end);
  }
  function handleStartTag(match) {
    const tagName = match.tagName;
    const unarySlash = match.unarySlash;
    const unary = isUnaryTag(tagName) || !!unarySlash;
    const l = match.attrs.length;
    const attrs = new Array(l);

    if (!unary) {
      stack.push({
        tag: tagName,
        lowerCasedTag: tagName.toLowerCase(),
        attrs: attrs,
        start: match.start,
        end: match.end,
      });
      lastTag = tagName;
    }
  }

  function advance(n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag() {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
        start: index,
      };
      advance(start[0].length);

      let end, attr;
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(dynamicArgAttribute) || html.match(attribute))
      ) {
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
    console.log("结束标签:", tagName);
  }
}
