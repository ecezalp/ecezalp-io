import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import hljs from 'highlight.js';
import Main from './components/main';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';

export default function App() {

  const getKeyToRerender = () => {
    return Math.floor((Math.random() * 100) + 1);
  };

  const entry = ({match}) => {
    setTimeout(hljs.initHighlightingOnLoad(), 400);
    return <Main key={getKeyToRerender()} match={match}/>;
  };

  const getRightBlock = (withIcons) => {

    return withIcons ? <div className="column-gradient">{getIcons()}</div> : <div className="column-gradient"/>;
  };

  const getIcons = () => {
    const styles = {
      smallIcon: {
        width: 36,
        height: 36,
        color: "black",
      },
      small: {
        width: 72,
        height: 72,
        padding: 16,
        color: "black",
      },
    };

    const icons = [
      {className: "fas fa-circle", to: "/archive/1"},
      {className: "fas fa-th-large", to: "/blog"},
      {className: "fas fa-th", to: "/archive"},
      {className: "fas fa-thumbtack", to: "/author"},
    ];

    return <div className="icon-container">
      {icons.map((icon, index) =>
        <Link to={icon.to}>
          <IconButton key={`icon-${index}`}
                      iconStyle={styles.smallIcon}
                      style={styles.small}
                      iconClassName={icon.className}/>
        </Link>)}
    </div>
  };

  return <MuiThemeProvider>
    <Router>
      <div className="main-container">

        {getRightBlock(true)}


        <Route exact path="/" component={entry}/>
        <Route path="/author" component={entry}/>
        <Route path="/blog" component={entry}/>

        <Switch>
          <Route exact path="/archive" component={entry}/>
          <Route path="/archive/:id" component={entry}/>
        </Switch>

        {getRightBlock()}

      </div>
    </Router>
  </MuiThemeProvider>
}