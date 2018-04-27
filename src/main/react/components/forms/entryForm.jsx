import React from 'react';
import {TextField, Checkbox} from "material-ui";
import {blue600} from 'material-ui/styles/colors';

import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

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

  getCheckboxStyles() {
    return {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
      },
    };
  }

  getTextField(title, field, styles) {
    return <TextField hintText={title}
                      onChange={(e) => this.changeEntryField(field, e.target.value)}
                      floatingLabelText={title}
                      value={this.state.entry[field]}
                      errorStyle={styles.errorStyle}
                      fullWidth={true}
                      underlineFocusStyle={styles.borderColorBlue}
                      underlineStyle={styles.borderColorBlue}
                      floatingLabelStyle={styles.colorBlue}/>
  }

  getTextArea(title, field) {
    return <div className={'text-area-container'}>
      {this.getTitle(title)}
      <textarea value={this.state.entry[field]}
                onChange={(e) => this.changeEntryField(field, e.target.value)}>
        </textarea>
    </div>;
  }

  getCheckbox(title) {
    return <div className={'text-area-container'}>
      <div className="checkbox">
        <label>
          {this.getTitle(title)}
          <input type="checkbox"/>
        </label>
      </div>
    </div>;
  }

  getTitle(title) {
    return <div className={'text-area-title'}>
      {title}
    </div>
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
        {this.getTextArea("Text", "text")}
      </div>

      <div className="islinkdump-container eio-field">
        {this.getCheckbox("Link Dump")}
      </div>

      <div className="text-container eio-field">
        {this.getTextArea("Short Text", "shortText")}
      </div>

      <div className="tags-container eio-field">
        {this.getTextField("Tags", "tags", textFieldStyles)}
      </div>

    </div>;
  };
}