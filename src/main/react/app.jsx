import React from 'react';
import Author from "./components/views/authorView";
import SingleEntryView from "./components/views/singleEntryView";
import SmallMultiEntryView from "./components/views/smallMultiEntryView";
import LargeMultiEntryView from "./components/views/largeMultiEntryView";

import EntryForm from './components/forms/entryForm';

import WithHighlight from "./components/higherOrder/withHighlight";
import EntryRepository from "./components/repositories/entryRepository";
import {MuiThemeProvider} from "material-ui";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import MenuIcons from "./components/inputs/menuIcons";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: []
    };

    this.entryRepository = new EntryRepository();
    this.getSmallMultiEntry = this.getSmallMultiEntry.bind(this);
    this.getSingleEntry= this.getSingleEntry.bind(this);
    this.getLargeMultiEntry = this.getLargeMultiEntry.bind(this);
    this.getEntryForm = this.getEntryForm.bind(this);
  }

  componentWillMount() {
    this.entryRepository.findAll().then((entries) => {
      this.setState({entries});
    });
  }

  getSingleEntry({match}) {
    return <WithHighlight>
      <SingleEntryView entry={this.state.entries.filter(entry => entry.id.toString() === match.params.id)[0]}
                       totalEntryCount={this.state.entries.length}/>
    </WithHighlight>;
  };

  getSmallMultiEntry() {
    return <SmallMultiEntryView entries={this.state.entries}/>;
  };

  getLargeMultiEntry() {
    return <LargeMultiEntryView entries={this.state.entries}/>;
  };

  getAuthor() {
    return <Author/>;
  };

  getEntryForm(props) {
    let componentProps = {};
    if (props.location.pathname.endsWith("/new")) {
      return <EntryForm {...componentProps} create={this.entryRepository.create}/>
    } else {

    }
    return <EntryForm {...componentProps}/>;
  };

  render() {
    return <MuiThemeProvider>
      <BrowserRouter>
        <div className="main-container">
          <div className="column-gradient">
            <MenuIcons entries={this.state.entries}/>
          </div>

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

          <div className="column-gradient"/>

        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  }
}