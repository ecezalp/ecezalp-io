import React from 'react';
import blogEntries from "../../resources/blogEntries/blogEntries";
import onikscim from '../../resources/onikscim.jpg';
import BlogEntry from './blogEntry';
import {Link} from "react-router-dom";

export default function Main({match}) {

  const archive = <div className="archive-container">
    {blogEntries.map((entry, index) =>
      <div className="index-entry-link">
        <Link key={`link-${index}`} to={entry.link}/>
      </div>)}
  </div>;

  const author = <div className="author-container">this is me </div>;

  const blog = <div className="blog-entry-container">
    {blogEntries.map((entry, index) =>
      <BlogEntry key={`entry-${index}`} entry={entry}/>)}
  </div>;

  const getComponent = (component) => {
    switch (component) {
      case "archive":
        return archive;
      case "author":
        return author;
      case "blog":
        return blog;
    }
  };

  const getRightBlock = <div className="holy-grail-right"/>;

  const getLeftBlock = <div className="holy-grail-left">
    <img className="onikscim" src={onikscim}/>
  </div>;

  return <div className="main-container">
    {getRightBlock}
    <div className="blog-inner-container">
      {getComponent(match.path.substring(1))}
    </div>
    {getLeftBlock}
  </div>;
}