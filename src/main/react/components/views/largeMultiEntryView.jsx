import React from 'react';

export default function LargeMultiEntryView({entries}) {

  const getDumpLinks = (text, id) => {
    let allTitles = text
      .match(/\[([^()]*)\]/g)
      .map(link => link
        .replace("[", "")
        .replace("]", ""));
    let allEntries = text
      .match(/\(([^()]*)\)/g)
      .filter(link => link
        .startsWith("(http"))
      .map(link => link
        .replace("(", "")
        .replace(")", ""));
    return allTitles.reduce((acc, el, i) => {
      acc.push(<a href={allEntries[i]} target="_blank" key={`inner-link-${id}-${i}`}>{el}</a>);
      return acc;
    }, [])
  };

  const getLinkDump = (entry, index) => <div className="entry-summary" key={`summary-entry-${entry.id}`}>
    <a className="eio-link"
       href={`/archive#${entry.title.split(" ").join("-").replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase()}`}
       key={`entry-${entry.id}-index-${index}`}>
      <div className="summary-title">{entry.title}</div>
    </a>
    <div className="summary-links">{getDumpLinks(entry.text, entry.id)}</div>
  </div>;

  const getEntrySummary = (entry) => {
    return <a className="eio-link"
              href={`/archive#${entry.title.split(" ").join("-").replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase()}`}
              key={`entry-${entry.id}-index`}>
      <div className="entry-summary entry-sum-container" key={`summary-entry-${entry.id}`}>
        <div className="summary-title">{entry.title}</div>
        <div className="summary-tags">{entry.tags && entry.tags.replace(",", ", ")}</div>
        <div className="summary-text">{entry.shortText}</div>
      </div>
    </a>
  };

  const getEntry = (entry, index) => {
    return <div key={`lg-entry-${index}`} style={{backgroundColor: index % 2 === 0 ? "aliceblue" : ""}}>
      {entry.isLinkDump ? getLinkDump(entry, index) : getEntrySummary(entry)}
    </div>
  };

  return <div className="large-entry-container">
    {entries.map(getEntry)}
  </div>;
}