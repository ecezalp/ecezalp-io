import syntaxHighlight from './javascript/entries/syntaxHighlight';
import reduceComprehensive from "./javascript/entries/reduceComprehensive";
import blockOnMac from "./javascript/entries/blockOnMac";
import noArgsConstructor from "./javascript/entries/noArgsConstructor";

const blogEntries = [blockOnMac, noArgsConstructor, reduceComprehensive, syntaxHighlight];

const processedBlogEntries = blogEntries.map((entry, index) =>
  Object.assign({}, entry, {
    id: (index + 1).toString(),
    title: entry.text.match(/^.*$/m)[0].substring(2),
  })
);

export default processedBlogEntries;