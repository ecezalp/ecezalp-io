import React from 'react';
import blogEntries from "../../resources/blogEntries/blogEntries";
import onikscim from '../../resources/onikscim.jpg';
import BlogEntry from './blogEntry';
import {Link} from "react-router-dom";
import Author from "./author";

export default function Main({match}) {

  const componentType = match.path.substring(1);

  const archive = <div className="archive-container">
    {blogEntries.map((entry) =>
      <div className="index-entry-link" key={`link-${entry.id}`}>
        <Link to={`/archive/${entry.id}`}>
          {entry.title}
        </Link>
      </div>)}
  </div>;

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

  const getComponent = () => {
    switch (componentType) {
      case "archive/:id":
        return getEntry();
      case "archive":
        return archive;
      case "author":
        return <Author/>;
      case "blog":
        return blog;
    }
  };

  const getRightBlock = () => {
    let className = (componentType === "archive/:id" || componentType === "blog") ?
      "column-gradient" : "column-no-gradient";
    return <div className={className}/>;
  };

  const innerBlock = <div className="blog-inner-container">
    {getComponent()}
  </div>;

  const leftBlock = <div className="holy-grail-left">
    <img className="onikscim" src={onikscim}/>
  </div>;

  return <div className="main-container">
    {getRightBlock()}
    {innerBlock}
    {leftBlock}
  </div>;
}