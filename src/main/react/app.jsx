import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import MenuIcons from './components/inputs/menuIcons';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import blogEntries from "../resources/blogEntries/blogEntries";

import Author from "./components/views/authorView";
import SingleEntryView from "./components/views/singleEntryView";
import SmallMultiEntryView from "./components/views/smallMultiEntryView";
import LargeMultiEntryView from "./components/views/largeMultiEntryView";

import WithHighlight from "./components/higherOrder/withHighlight";


export default function App() {

  const getSingleEntry = ({match}) => {
    return <WithHighlight>
      <SingleEntryView entry={blogEntries.filter(entry => entry.id.toString() === match.params.id)[0]}
                       totalEntryCount={blogEntries.length}/>
    </WithHighlight>;
  };

  const getSmallMultiEntry = () => {
    return <SmallMultiEntryView entries={blogEntries}/>;
  };

  const getLargeMultiEntry = () => {
    return <LargeMultiEntryView entries={blogEntries}/>;
  };

  const getAuthor = () => {
    return <Author/>;
  };

  return <MuiThemeProvider>
    <Router>
      <div className="main-container">
        <div className="column-gradient">
          <MenuIcons/>
        </div>

        <div className="blog-inner-container">
          <Route exact path="/" component={getSmallMultiEntry}/>
          <Route path="/author" component={getAuthor}/>
          <Route path="/blog" component={getLargeMultiEntry}/>

          <Switch>
            <Route exact path="/archive" component={getSmallMultiEntry}/>
            <Route path="/archive/:id" component={getSingleEntry}/>
          </Switch>
        </div>

        <div className="column-gradient"/>

      </div>
    </Router>
  </MuiThemeProvider>
}