import React from 'react';
import {Link} from 'react-router-dom';
import BlogEntry from "../inputs/blogEntry";

export default function SmallMultiEntryView({entries}) {

const heart = <div className="heart"/>;

  const getEntry = (entry) => {
    return <div className="index-entry-link" key={`link-${entry.id}`}>
      {heart}
      <Link className="eio-link"
            to={`/archive#${entry.title.split(" ").join("-").replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase()}`}>
        <BlogEntry key={`entry-link-${entry.id}`} entry={entry.title}/>
      </Link>
    </div>
  };

  return <div className="archive-container">
    {entries.map(getEntry)}
  </div>
}