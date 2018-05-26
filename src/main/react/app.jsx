import React from 'react';
import Author from "./components/views/authorView";
import SingleEntryView from "./components/views/singleEntryView";
import SmallMultiEntryView from "./components/views/smallMultiEntryView";
import LargeMultiEntryView from "./components/views/largeMultiEntryView";

import EntryForm from './components/forms/entryForm';

import WithHighlight from "./components/higherOrder/withHighlight";
import WithColumns from "./components/higherOrder/withColumns";
import EntryRepository from "./components/repositories/entryRepository";
import {MuiThemeProvider} from "material-ui";
import {BrowserRouter, Route, Switch} from "react-router-dom";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      colors: [],
    };

    this.entryRepository = new EntryRepository();
    this.getSmallMultiEntry = this.getSmallMultiEntry.bind(this);
    this.getSingleEntry = this.getSingleEntry.bind(this);
    this.getLargeMultiEntry = this.getLargeMultiEntry.bind(this);
    this.getEntryForm = this.getEntryForm.bind(this);
    this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
  }

  componentWillMount() {
    this.entryRepository.findAll().then((entries) => {
      this.setState({entries});
    });
  }

  updateBackgroundColor(match, entry) {
    if(entry && entry.colors) {
      if (this.state.colors !== entry.colors) {
        this.setState({colors: entry.colors});
      }
    }
  }

  getSingleEntry({match}) {
    let selectedEntry = this.state.entries.filter(entry => entry.id.toString() === match.params.id)[0];
    this.updateBackgroundColor(match, selectedEntry);

    return <WithHighlight>
      <SingleEntryView entry={selectedEntry || {id: "", text: ""}}
                       totalEntryCount={this.state.entries.length}/>
    </WithHighlight>;
  };

  getSmallMultiEntry() {
    return <SmallMultiEntryView {...this.state}/>;
  };

  getLargeMultiEntry() {
    return <LargeMultiEntryView {...this.state}/>;
  };

  getAuthor() {
    return <Author/>;
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
    return <EntryForm entryRepository={this.entryRepository}
                      id={this.getNextId()}/>;
  };

  render() {
    return <MuiThemeProvider>
      <BrowserRouter>
        <WithColumns {...this.state}>
          <div className="blog-inner-container">
            <Route exact path="/" component={this.getSmallMultiEntry}/>
            <Route path="/author" component={this.getAuthor}/>
            <Route path="/blog" component={this.getLargeMultiEntry}/>

            <Switch>
              <Route exact path="/archive" component={this.getSmallMultiEntry}/>
              <Route path="/archive/:id" component={this.getSingleEntry}/>
            </Switch>

            <Switch>
              <Route path="/entries/new" component={this.getEntryForm}/>
            </Switch>
          </div>
        </WithColumns>
      </BrowserRouter>
    </MuiThemeProvider>
  }
}