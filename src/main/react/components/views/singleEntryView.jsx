import React from 'react';
import BlogEntry from "../inputs/blogEntry";
import {Link} from "react-router-dom";

export default function SingleEntryView({entry, totalEntryCount}) {

  const pageNumber = <div className="page-number">{entry.id}</div>;

  const isThereNextEntry = (title) => title === "Next" && entry.id < totalEntryCount;

  const isTherePrevEntry = (title) => title === "Prev" && entry.id > 1;

  const getButtonWithTitle = (title) => {
    let linkTo = title === "Next" ? `/archive/${entry.id + 1}` : `/archive/${entry.id - 1}`;
    let visibility = (isThereNextEntry(title) || isTherePrevEntry(title)) ? "visible" : "hidden";
    let iconClassName = title === "Next" ? "fas fa-arrow-right" : "fas fa-arrow-left";

    return <Link className="eio-link" to={linkTo} style={{visibility}}>
      <div className="tag-container" key={`${title}-button`} style={{visibility}}>
          <i className={iconClassName} style={{padding: "5px"}}/>
      </div>
    </Link>
  };

  const prevAndNextButtons = <div className="button-container">
    {getButtonWithTitle("Prev")}
    {getButtonWithTitle("Next")}
  </div>;

  const formattedEntry = <BlogEntry entry={entry.text}/>;

  const entryTitle = <div className="title-entry">{entry.title}</div>;

  return <div className="solo-entry-container">
    {entryTitle}
    {prevAndNextButtons}
    {formattedEntry}
    {prevAndNextButtons}
    {pageNumber}
  </div>;
}