import React from 'react';
import Author from "./components/views/authorView";
import SmallMultiEntryView from "./components/views/smallMultiEntryView";
import LargeMultiEntryView from "./components/views/largeMultiEntryView";
import InfiniteView from "./components/views/infiniteView";

import EntryForm from './components/forms/entryForm';
import WithColumns from "./components/higherOrder/withColumns";
import EntryRepository from "./components/repositories/entryRepository";
import {MuiThemeProvider} from "material-ui";
import {BrowserRouter, Route} from "react-router-dom";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      colors: [],
    };

    this.entryRepository = new EntryRepository();
    this.getSmallMultiEntry = this.getSmallMultiEntry.bind(this);
    this.getLargeMultiEntry = this.getLargeMultiEntry.bind(this);
    this.getEntryForm = this.getEntryForm.bind(this);
    this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
    this.getInfiniteView = this.getInfiniteView.bind(this);
    this.getAuthor = this.getAuthor.bind(this);
  }

  componentWillMount() {
    this.entryRepository.findAll().then((entries) => {
      this.setState({entries});
    });
  }

  updateBackgroundColor(match, entry) {
    if (entry && entry.colors) {
      if (this.state.colors !== entry.colors) {
        this.setState({colors: entry.colors});
      }
    }
  }

  getSmallMultiEntry() {
    return <WithColumns {...this.state}>
      <SmallMultiEntryView {...this.state}/>
    </WithColumns>;
  };

  getLargeMultiEntry() {
    return <WithColumns {...this.state}>
      <LargeMultiEntryView {...this.state}/>
    </WithColumns>
  };

  getInfiniteView(props) {
    if (props.history.location.hash === "") window.scrollTo(0, 0);
    return <InfiniteView allEntries={this.state.entries || []} hash={props.history.location.hash}/>;
  }

  getAuthor() {
    return <WithColumns {...this.state}>
      <Author/>
    </WithColumns>
  };

  getNextId() {
    let currentId = this.state.entries.reduce((acc, entry) => {
      if (entry.id > acc) {
        acc = entry.id;
      }
      return acc;
    }, 0);
    return currentId + 1;
  }

  getEntryForm() {
    return <WithColumns {...this.state}>
      <EntryForm entryRepository={this.entryRepository}
                 id={this.getNextId()}/>
    </WithColumns>;
  };

  render() {
    return <MuiThemeProvider>
      <BrowserRouter>
        <div className="blog-inner-container">
          <Route exact path="/" component={this.getSmallMultiEntry}/>
          <Route path="/author" component={this.getAuthor}/>
          <Route path="/large-list" component={this.getLargeMultiEntry}/>
          <Route path="/small-list" component={this.getSmallMultiEntry}/>
          <Route exact path="/archive" component={this.getInfiniteView}/>
          <Route path="/entries/new" component={this.getEntryForm}/>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  }
};