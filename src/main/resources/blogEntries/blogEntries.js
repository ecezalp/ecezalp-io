import syntaxHighlight from './how-I-got-syntax-highlighting-for-my-blog';
import reduceComprehensive from "./reduceComprehensive";

const blogEntries = [reduceComprehensive, syntaxHighlight];

const processedBlogEntries = blogEntries.map((entry, index) =>
  Object.assign({}, {text: entry, id: (index + 1).toString(), title: entry.match(/^.*$/m)[0]})
);

export default processedBlogEntries;