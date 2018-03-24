import React from 'react';
import hljs from 'highlight.js';

import BlogEntry from "./blogEntry";
import blogEntries from "../resources/blogEntries/blogEntries";

// Hishida Shunsō
import onikscim from "../resources/onikscim.jpg";

export default class App extends React.Component {

  componentWillMount() {
   hljs.initHighlightingOnLoad();
  }

  render() {
  return <div className="blog-container">
    <div className="blog-inner-container">
      {blogEntries.map((entry, index) => <BlogEntry key={index} entry={entry}/>)}
    </div>
    <div className="oniks-container">
      <img src={onikscim}/>
    </div>
  </div>
  }
}