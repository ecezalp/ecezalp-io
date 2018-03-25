import React from 'react';
import blogEntries from "../../resources/blogEntries/blogEntries";
import onikscim from '../../resources/onikscim.jpg';
import BlogEntry from './blogEntry';
import {Link} from "react-router-dom";
import hljs from "highlight.js";

export default function Main({match}) {

  const archive = <div className="archive-container">
    {blogEntries.map((entry) =>
      <div className="index-entry-link" key={`link-${entry.id}`}>
        <Link to={`/blog/${entry.id}`}>
          {entry.title}
        </Link>
      </div>)}
  </div>;

  const author = <div className="author-container">this is me </div>;

  const blog = <div className="blog-entry-container">
    {blogEntries.map((entry) =>
      <BlogEntry key={`entry-${entry.id}`} entry={entry.text}/>)}
  </div>;

  const getEntry = () => {
    let entry = blogEntries.filter(entry => entry.id === match.params.id);
    return entry.length > 0 && <div className="solo-entry-container">
      <BlogEntry entry={entry[0].text}/>
    </div>;
  };

  const entry = getEntry();

  const getComponent = (component) => {

    switch (component) {
      case "archive":
        return archive;
      case "author":
        return author;
      case "blog":
        return blog;
      case "blog/:id":
        return entry;
    }
  };

  const rightBlock = <div className="holy-grail-right"/>;

  const innerBlock = <div className="blog-inner-container">
    {getComponent(match.path.substring(1))}
  </div>;

  const leftBlock = <div className="holy-grail-left">
    <img className="onikscim" src={onikscim}/>
  </div>;

  return <div className="main-container">
    {rightBlock}
    {innerBlock}
    {leftBlock}
  </div>;
}