import React from 'react';
import {Link} from 'react-router-dom';

export default function SmallMultiEntryView({entries}) {

  const getEntry = (entry) => {
    return <div className="index-entry-link" key={`link-${entry.id}`}>
      <Link className="eio-link title-hashlink"
            to={`/archive#${entry.title.split(" ").join("-").replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase()}`}>
        {entry.title}
      </Link>
      <div className="summary-tags">{entry.tags && entry.tags.replace(",", ", ")}</div>
    </div>
  };

  return <div className="archive-container">
    {entries.map(getEntry)}
  </div>
}