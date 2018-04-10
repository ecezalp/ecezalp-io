import syntaxHighlight from './javascript/syntaxHighlight';
import reduceComprehensive from "./javascript/reduceComprehensive";
import blockOnMac from "./javascript/blockOnMac";
import noArgsConstructor from "./javascript/noArgsConstructor";
import linkDump0 from "./javascript/linkDump0";

const blogEntries = [
  blockOnMac,
  noArgsConstructor,
  reduceComprehensive,
  syntaxHighlight,
  linkDump0,
];

const processedBlogEntries = blogEntries.map((entry, index) =>
  Object.assign({}, entry, {
    id: (index + 1).toString(),
    title: entry.text.match(/^.*$/m)[0].substring(2),
  })
).reverse();

export default processedBlogEntries;