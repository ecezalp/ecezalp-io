import React from 'react';
import blogEntries from "../../resources/blogEntries/blogEntries";
import BlogEntry from './blogEntry';
import {Link} from "react-router-dom";
import Author from "./author";
import hljs from "highlight.js";

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      componentType: this.props.match.path.substring(1),
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({componentType: newProps.match.path.substring(1)});
    hljs.initHighlightingOnLoad();
    console.log("hit");
  }

  componentWillUpdate() {
    console.log("updated");
  }

  getHeart() {
    return <div className="heart"/>;
  }

  getArchive() {
    return <div className="archive-container">
      {blogEntries.map((entry) =>
        <div className="index-entry-link" key={`link-${entry.id}`}>
          {this.getHeart()}
          <Link className="eio-link" to={`/archive/${entry.id}`}>
            <BlogEntry key={`entry-link-${entry.id}`} entry={entry.title}/>
          </Link>
        </div>)}
    </div>
  };

  getTags(tags) {
    return tags.map((tag, tagIndex) =>
      <div className="tag-container" key={`tag-${tagIndex}`}>
        <div className="tag-name">
          {tag}
        </div>
      </div>);
  }

  getBlog() {
    return <div className="blog-entry-container">
      {blogEntries.map((entry) =>
        <Link className="eio-link" to={`/archive/${entry.id}`} key={`entry-${entry.id}`}>
          {entry.isLinkDump ? this.getLinkDump(entry) : this.getShortEntry(entry)}
        </Link>)}
    </div>;
  }

  getLinkDump(entry) {
    return <div className="short-title">{entry.title}</div>
  }

  getShortEntry(entry) {
    return <div className="short-entry">
      <div className="short-title">{entry.title}</div>
      <div className="tags">{this.getTags(entry.tags)}</div>
      <div className="short-text">{entry.shortText}</div>
    </div>
  }

  getEntry() {
    let entry = blogEntries.filter(entry => entry.id === this.props.match.params.id);
    return entry.length > 0 && <div className="solo-entry-container">
      <BlogEntry entry={entry[0].text}/>
    </div>;
  };

  getComponent() {
    switch (this.state.componentType) {
      case "archive/:id":
        return this.getEntry();
      case "archive":
        return this.getArchive();
      case "author":
        return <Author/>;
      case "blog":
        return this.getBlog();
    }
  };

  render() {
    hljs.initHighlightingOnLoad();
    return <div className="blog-inner-container">
      {this.getComponent()}
    </div>;
  }
}