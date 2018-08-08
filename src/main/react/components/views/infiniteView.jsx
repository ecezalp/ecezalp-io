import React from 'react';
import BlogEntry from "../inputs/blogEntry";
import WithColumns from "../higherOrder/withColumns";
import WithHighlight from "../higherOrder/withHighlight";

export default class InfiniteView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allEntries: [],
      hash: "",
    };
    this.scrollToElement = this.scrollToElement.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({allEntries: newProps.allEntries}, () => {
      console.log(this.state)
    });
    this.scrollToElement(newProps);
  }

  scrollToElement({hash}) {
    if (hash !== this.state.hash) {
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
    let allEntries = this.state.allEntries || [];
    console.log(allEntries);

    const getPageNumber = ({title, id}) =>
      <a id={`#${title.split(" ").join("-").replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase()}`}
         className="page-number">
        {id}
      </a>;

    const getEntryTitle = ({title}) =>
      <div className="title-entry">
        {title ? title : "rendering"}
      </div>;

    const getHighlightedEntry = ({text}) =>
      <BlogEntry entry={text}/>;

    const formatEntry = (entry, index) =>
      <WithColumns colors={entry.colors} entries={allEntries} index={index}>
        <div className="solo-entry-container" key={`solo-entry-${index}`}>
          <div className="solo-text-container" key={`solo-text-${index}`}>
            {getPageNumber(entry)}
            {getEntryTitle(entry)}
            <WithHighlight>
              {getHighlightedEntry(entry)}
            </WithHighlight>
            {console.log("hi")}
          </div>
        </div>
      </WithColumns>;

    return <div className="infinite-container" key="infinite-container">
      {allEntries.map(formatEntry)}
    </div>;
  }
}