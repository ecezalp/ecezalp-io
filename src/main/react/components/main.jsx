import React from 'react';
import blogEntries from "../../resources/blogEntries/blogEntries";
import onikscim from '../../resources/onikscim.jpg';
import BlogEntry from './blogEntry';

export default function Main() {
  return <div className="main-container">
    <div className="holy-grail-right">
    </div>
    <div className="blog-inner-container">
      {blogEntries.map((entry, index) => <BlogEntry key={index} entry={entry}/>)}
    </div>
    <div className="holy-grail-left">
      <img className="onikscim" src={onikscim}/>
    </div>
  </div>
}