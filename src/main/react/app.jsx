import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import hljs from 'highlight.js';
import Main from './components/main';
import MenuIcons from './components/menuIcons';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default function App() {

  const getKeyToRerender = () => {
    return Math.floor((Math.random() * 100) + 1);
  };

  const entry = ({match}) => {
    setTimeout(hljs.initHighlightingOnLoad(), 400);
    return <Main key={getKeyToRerender()} match={match}/>;
  };

  return <MuiThemeProvider>
    <Router>
      <div className="main-container">

        <div className="column-gradient">
          <MenuIcons/>
        </div>

        <Redirect exact from="/" to="/blog"/>
        <Route path="/author" component={entry}/>
        <Route path="/blog" component={entry}/>

        <Switch>
          <Route exact path="/archive" component={entry}/>
          <Route path="/archive/:id" component={entry}/>
        </Switch>

        <div className="column-gradient"/>

      </div>
    </Router>
  </MuiThemeProvider>
}