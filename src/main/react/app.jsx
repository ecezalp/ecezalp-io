import React from 'react';
import Author from "./components/views/authorView";
import SmallMultiEntryView from "./components/views/smallMultiEntryView";
import InfiniteView from "./components/views/infiniteView";
import LandingView from "./components/views/landingView";
import AlternateView from "./components/views/alternateView";

import EntryForm from './components/forms/entryForm';
import WithColumns from "./components/higherOrder/withColumns";
import WithEntries from "./components/higherOrder/withEntries";
import EntryRepository from "./components/repositories/entryRepository";
import {MuiThemeProvider} from "material-ui";
import {BrowserRouter, Route} from "react-router-dom";

export default function App() {

  const entryRepository = new EntryRepository();

  const scrollUp = () => window.scrollTo(0, 0);

  const getSmallMultiEntry = () => {
    scrollUp();
    return <WithColumns>
      <WithEntries entryRepository={entryRepository}>
        <SmallMultiEntryView/>
      </WithEntries>
    </WithColumns>;
  };

  const getInfiniteView = (props) => {
    if (props.history.location.hash === "") scrollUp();
    return <WithEntries entryRepository={entryRepository}>
      <InfiniteView hash={props.history.location.hash}/>
    </WithEntries>;
  };

  const getAuthor = () => {
    scrollUp();
    return <WithColumns>
      <Author/>
    </WithColumns>
  };

  const getLandingView = () => {
    scrollUp();
    return <WithColumns>
      <LandingView isTextVisible={true}/>
    </WithColumns>
  };

  const getEntryForm = () => {
    scrollUp();
    return <WithColumns>
      <WithEntries entryRepository={entryRepository}>
        <EntryForm entryRepository={entryRepository}/>
      </WithEntries>
    </WithColumns>
  };

  const getAlternate = () => {
    return <AlternateView/>;
  };

  return <MuiThemeProvider>
    <BrowserRouter>
      <div className="blog-inner-container">
        <Route exact path="/" component={getLandingView}/>
        <Route path="/author" component={getAuthor}/>
        <Route path="/small-list" component={getSmallMultiEntry}/>
        <Route exact path="/archive" component={getInfiniteView}/>
        <Route path="/entries/new" component={getEntryForm}/>
        <Route path="/alternate" component={getAlternate}/>
      </div>
    </BrowserRouter>
  </MuiThemeProvider>;
};