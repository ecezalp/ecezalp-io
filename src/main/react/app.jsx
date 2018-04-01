import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import hljs from 'highlight.js';
import Navbar from './components/nav/navbar';
import Main from './components/main';

export default function App() {

  const getKeyToRerender = () => {
    return Math.floor((Math.random() * 100) + 1);
  };

  const entry = ({match}) => {
    setTimeout(hljs.initHighlightingOnLoad(), 400);
    return <Main key={getKeyToRerender()} match={match}/>;
  };

  return <Router>
    <div className="blog-container">
      <Navbar/>

      <Route exact path="/" component={entry}/>
      <Route path="/author" component={entry}/>
      <Route path="/blog" component={entry}/>

      <Switch>
        <Route exact path="/archive" component={entry}/>
        <Route path="/archive/:id" component={entry}/>
      </Switch>
    </div>
  </Router>
}