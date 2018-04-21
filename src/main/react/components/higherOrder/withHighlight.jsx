import React from 'react';
import * as hljs from "highlight.js";

class WithHighlight extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    const nodes = document.querySelectorAll('pre code');

    for (let i = 0; i < nodes.length; i++) {
      hljs.highlightBlock(nodes[i])
    }
  }

  render() {
    return this.props.children;
  }
}


export default WithHighlight;
