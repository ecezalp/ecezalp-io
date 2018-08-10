import React from 'react';
import BlogEntry from "../inputs/blogEntry";
import WithColumns from "../higherOrder/withColumns";
import WithHighlight from "../higherOrder/withHighlight";

export default class InfiniteView extends React.Component {

  constructor(props) {
    super(props);
    this.scrollToElement = this.scrollToElement.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.scrollToElement(newProps);
  }

  scrollToElement({hash}) {
    if (hash !== "") {
      let retries = 0;
      const scroll = () => {
        retries += 0;
        if (retries > 50) return;
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => element.scrollIntoView(), 0);
        } else {
          setTimeout(scroll, 50);
        }
      };
      scroll();
    }
  }


  render() {
    const getPageNumber = ({title, id}) =>
      <a id={`#${title.split(" ").join("-").replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase()}`}
         className="page-number">
        <div className="circle"/>
      </a>;

    const getEntryTitle = ({title}) =>
      <div className="title-entry">
        {title ? title : "rendering"}
      </div>;

    const getHighlightedEntry = ({text}) =>
      <BlogEntry entry={text}/>;

    const formatEntry = (entry, index) =>
      <WithColumns colors={entry.colors} entries={this.props.entries} index={index}>
        <div className="solo-entry-container" key={`solo-entry-${index}-${entry.id}`}>
          <div className="solo-text-container" key={`solo-text-${index}-${entry.id}`}>
            {getPageNumber(entry)}
            {getEntryTitle(entry)}
            <WithHighlight>
              {getHighlightedEntry(entry)}
            </WithHighlight>
          </div>
        </div>
      </WithColumns>;

    const noEntriesYet = formatEntry({title: "", id: "1337"}, 1337);

    const allEntries = this.props.entries.length === 0 ?
      noEntriesYet : this.props.entries.map(formatEntry);

    return <div className="infinite-container" key="infinite-container">
      {allEntries}
    </div>;
  }
}