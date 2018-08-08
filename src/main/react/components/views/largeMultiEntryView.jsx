import React from 'react';

export default function LargeMultiEntryView({entries}) {

  const getTags = (tags) => {
    return tags.split(",").map((tag, tagIndex) =>
      <div className="tag-container" key={`tag-${tagIndex}`}>
        <div className="tag-name">
          {tag}
        </div>
      </div>);
  };

  const getLinkDump = (entry) => <div className="entry-summary">
    <div className="summary-title">{entry.title}</div>
  </div>;

  const getEntrySummary = (entry) => {
    return <div className="entry-summary">
      <div className="summary-tags">{getTags(entry.tags)}</div>
      <div className="summary-title">{entry.title}</div>
      <div className="summary-text">{entry.shortText}</div>
    </div>
  };

  const getEntry = (entry) => {
    return <a className="eio-link"
                 href={`/archive#${entry.title.split(" ").join("-").replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase()}`}
                 key={`entry-${entry.id}`}
    >
      {entry.isLinkDump ? getLinkDump(entry) : getEntrySummary(entry)}
    </a>
  };

  return <div className="blog-entry-container">
    {entries.map(getEntry)}
  </div>;
}