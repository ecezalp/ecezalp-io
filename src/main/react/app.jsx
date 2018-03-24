import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import hljs from 'highlight.js';
import Navbar from './components/nav/navbar';
import Main from './components/main';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    hljs.initHighlightingOnLoad();
  }

  blog({match}) {
    return <Main type="blog" match={match}/>;
  }

  archive({match}) {
    return <Main type="archive" match={match}/>;
  }

  author({match}) {
    return <Main type="author" match={match}/>;
  }


  render() {
    return <Router>
      <div className="blog-container">
        <Navbar/>

        <Route exact path="/" component={this.blog}/>
        <Route path="/archive" component={this.archive}/>
        <Route path="/blog" component={this.blog}/>
        <Route path="/author" component={this.author}/>

      </div>
    </Router>
  }
}