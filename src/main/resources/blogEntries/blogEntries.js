import syntaxHighlight from './javascript/syntaxHighlight';
import reduceComprehensive from "./javascript/reduceComprehensive";
import blockOnMac from "./javascript/blockOnMac";
import noArgsConstructor from "./javascript/noArgsConstructor";
import linkDump0 from "./javascript/linkDump0";
import jsonInSql from "./javascript/jsonInSql";

const blogEntries = [
  blockOnMac,
  noArgsConstructor,
  reduceComprehensive,
  syntaxHighlight,
  linkDump0,
  jsonInSql,
];

const processedBlogEntries = blogEntries.map((entry, index) =>
  Object.assign({}, entry, {
    id: index + 1,
  })
).reverse();

export default processedBlogEntries;