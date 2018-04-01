import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import hljs from 'highlight.js';
import Navbar from './components/nav/navbar';
import Main from './components/main';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  entry({match}) {
    setTimeout(() => {
      hljs.initHighlightingOnLoad()
    }, 500);
    return <Main match={match}/>;
  }

  render() {
    return <Router>
      <div className="blog-container">
        <Navbar/>

        <Route exact path="/" component={this.entry}/>
        <Route path="/author" component={this.entry}/>
        <Route path="/blog" component={this.entry}/>

        <Switch>
          <Route exact path="/archive" component={this.entry}/>
          <Route path="/archive/:id" component={this.entry}/>
        </Switch>

      </div>
    </Router>
  }
}