import React from 'react';
import {BrowserRouter as Router, Route,} from 'react-router-dom'
import hljs from 'highlight.js';
import Navbar from './components/nav/navbar';
import Main from './components/main';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  entry({match}) {
    return <Main match={match}/>;
  }

  componentDidUpdate(){
    hljs.initHighlightingOnLoad();
  }

  render() {
    return <Router>
      <div className="blog-container">
        <Navbar/>

        <Route exact path="/" component={this.entry}/>
        <Route path="/author" component={this.entry}/>
        <Route path="/archive" component={this.entry}/>
        <Route exact path="/blog" component={this.entry}/>
        <Route path="/blog/:id" component={this.entry}/>

      </div>
    </Router>
  }
}