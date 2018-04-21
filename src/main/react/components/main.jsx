import React from 'react';
import blogEntries from "../../resources/blogEntries/blogEntries";
import Author from "./views/authorView";
import hljs from "highlight.js";
import SmallMultiEntryView from "./views/smallMultiEntryView";
import LargeMultiEntryView from "./views/largeMultiEntryView";
import SingleEntryView from "./views/singleEntryView";

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

  getComponent() {
    switch (this.state.componentType) {
      case "archive/:id":
        return ;
      case "archive":
        return ;
      case "author":
        return ;
      case "blog":
        return
    }
  };

  render() {
    hljs.initHighlightingOnLoad();
    return
      {this.getComponent()}
  }
}