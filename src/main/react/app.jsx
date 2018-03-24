import React from 'react';
import hljs from 'highlight.js';

import Main from './components/main';
import Navbar from './components/nav/navbar';

export default class App extends React.Component {

  componentWillMount() {
    hljs.initHighlightingOnLoad();
  }

  render() {
    return <div className="blog-container">
      <Navbar/>
      <Main/>
    </div>
  }
}