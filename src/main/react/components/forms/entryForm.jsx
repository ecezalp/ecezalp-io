import React from 'react';
import {TextField} from "material-ui";
import {blue600} from 'material-ui/styles/colors';

export default class EntryForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entry: {
        id: 0,
        title: "",
        shortText: "",
        tags: [],
        text: "",
        isLinkDump: false,
      },
    };
  }

  getTextFieldStyles() {
    return {
      colorBlue: {
        color: blue600,
      },
      borderColorBlue: {
        borderColor: blue600,
      },
    };
  }

  getTextField(title, field, styles) {
    return <TextField hintText={title}
                      onChange={(e) => this.changeEntryField(field, e.target.value)}
                      floatingLabelText={title}
                      value={this.state.entry[field]}
                      errorStyle={styles.errorStyle}
                      underlineFocusStyle={styles.borderColorBlue}
                      underlineStyle={styles.borderColorBlue}
                      floatingLabelStyle={styles.colorBlue}/>
  }

  changeEntryField(field, value) {
    let entry = this.state.entry;
    entry[field] = value;
    this.setState({entry});
  }

  render() {
    let textFieldStyles = this.getTextFieldStyles();

    return <div className="form-container">
      <div className="welcome-text">
        Lorem Ipsum Dolor Sit Amet
      </div>

      <div className="title-containter eio-field">
        {this.getTextField("Title", "title", textFieldStyles)}
      </div>

      <div className="body-container eio-field">
        {this.getTextField("Text", "text", textFieldStyles)}
      </div>

      <div className="text-container eio-field">
        {this.getTextField("Short Text", "shortText", textFieldStyles)}
      </div>

      <div className="tags-container eio-field">
        {this.getTextField("Tags", "tags", textFieldStyles)}
      </div>

    </div>;
  };
}