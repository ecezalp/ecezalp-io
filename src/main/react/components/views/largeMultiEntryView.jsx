import React from 'react';
import {Link} from "react-router-dom";

export default function LargeMultiEntryView({entries}) {

  const getTags = (tags) => {
    return tags.map((tag, tagIndex) =>
      <div className="tag-container" key={`tag-${tagIndex}`}>
        <div className="tag-name">
          {tag}
        </div>
      </div>);
  };

  const getLinkDump = (entry) => <div className="summary-title">{entry.title}</div>;

  const getEntrySummary = (entry) => {
    return <div className="entry-summary">
      <div className="summary-title">{entry.title}</div>
      <div className="summary-text">{entry.shortText}</div>
      <div className="summary-tags">{getTags(entry.tags)}</div>
    </div>
  };

  const getEntry = (entry) => <Link className="eio-link" to={`/archive/${entry.id}`} key={`entry-${entry.id}`}>
    {entry.isLinkDump ? getLinkDump(entry) : getEntrySummary(entry)}
  </Link>;

  return <div className="blog-entry-container">
    {entries.map(getEntry)}
  </div>;
}