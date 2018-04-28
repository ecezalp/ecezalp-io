import React from 'react';
import {TextField} from "material-ui";
import {blue600, orange600} from 'material-ui/styles/colors';
import {ChromePicker} from 'react-color';

export default class EntryForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entry: this.getEmptyEntry(),
      isColorPickerVisible: false,
      activeColorIndex: -1,
      password: "",
    };

    this.colorSquareClickHandler = this.colorSquareClickHandler.bind(this);
    this.closeColorPicker = this.closeColorPicker.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getTextFieldStyles() {
    return {
      colorBlue: {
        color: blue600,
      },
      borderColorBlue: {
        borderColor: blue600,
      },
      colorOrange: {
        color: orange600,
      },
      borderColorOrange: {
        borderColor: orange600,
      },
    };
  }

  getPasswordField(styles) {
    return <div className="tags-container eio-field">
      <TextField fullWidth={true}
                 onChange={(e) => this.setState({password: e.target.value})}
                 floatingLabelText={"Password"}
                 value={this.state.password}
                 floatingLabelStyle={styles.colorOrange}
                 underlineFocusStyle={styles.borderColorOrange}
                 underlineStyle={styles.colorOrange}/>
    </div>
  }

  getTextField(title, field, styles) {
    return <div className="tags-container eio-field">
      <TextField hintText={title}
                 onChange={(e) => this.handleEntryChange(field, e.target.value)}
                 floatingLabelText={title}
                 value={this.state.entry[field]}
                 errorStyle={styles.errorStyle}
                 fullWidth={true}
                 underlineFocusStyle={styles.borderColorBlue}
                 underlineStyle={styles.borderColorBlue}
                 floatingLabelStyle={styles.colorBlue}/>
    </div>
  }

  getTextArea(title, field) {
    return <div className="text-container eio-field">
      <div className='text-area-container'>
        {this.getTitle(title)}
        <textarea value={this.state.entry[field]}
                  onChange={(e) => this.handleEntryChange(field, e.target.value)}>
        </textarea>
      </div>
    </div>;
  }

  getCheckbox(title) {
    let isLinkDump = !this.state.entry.isLinkDump;
    let checkboxClassName = `hex-square check is-${isLinkDump ? 'checked' : 'not-checked'}`;

    return <div className="islinkdump-container eio-field">
      <div className={'checkbox-container'}>
        {this.getTitle(title)}
        <div className={checkboxClassName}
             onClick={() => this.handleEntryChange("isLinkDump", isLinkDump)}>
          {!isLinkDump && <i className="material-icons">check_box</i>}
        </div>
      </div>
    </div>;
  }

  getTitle(title) {
    return <div className={'text-area-title'}>
      {title}
    </div>
  }

  handleEntryChange(field, value) {
    let entry = this.state.entry;
    entry[field] = value;
    this.setState({entry});
  }

  colorSquareClickHandler(index) {
    this.setState({isColorPickerVisible: true, activeColorIndex: index});
  }

  getColorSquare(hex, index) {
    return <div key={`hex-${index}`}
                className="hex-square"
                style={{backgroundColor: hex}}
                onClick={() => this.colorSquareClickHandler(index)}/>;
  }

  getColorsContainer() {
    return <div className="colors-container eio-field">
      {this.getTitle("Colors")}
      {this.state.entry.colors.map((color, index) => this.getColorSquare(color, index))}
    </div>
  }

  getColorPicker() {
    return <div className="color-picker-container eio-field">
      {this.state.activeColorIndex > -1 && <div>
        <i className="material-icons" onClick={this.closeColorPicker}>close</i>
        <ChromePicker color={this.state.entry.colors[this.state.activeColorIndex]}
                      onChangeComplete={(color, event) => this.handleColorChange(color, event)}/>
      </div>}
    </div>
  }

  closeColorPicker() {
    this.setState({activeColorIndex: -1})
  }

  handleColorChange(color) {
    let entry = this.state.entry;
    entry.colors[this.state.activeColorIndex] = color.hex;
    this.setState({entry})
  }

  getSubmitButton() {
    if (this.state.password === "password") {
      return <div className="submit-button">
        <i className="material-icons" onClick={this.handleSubmit}>send</i>
      </div>
    }
  }

  handleSubmit() {
    this.props.create(this.state.entry);
    this.setState({entry: this.getEmptyEntry(), password: ""})
  }

  getEmptyEntry() {
    return Object.assign({}, {
      id: 0,
      title: "",
      shortText: "",
      tags: [],
      text: "",
      isLinkDump: false,
      colors: ["", "", "", "", "", "", ""],
    });
  }

  render() {
    let textFieldStyles = this.getTextFieldStyles();

    return <div className="form-container">
      {this.getTextField("Title", "title", textFieldStyles)}
      {this.getTextField("Tags", "tags", textFieldStyles)}
      {this.getTextArea("Text", "text")}
      {this.getTextArea("Short Text", "shortText")}
      {this.getCheckbox("Link Dump")}
      {this.getColorsContainer()}
      {this.getColorPicker()}
      {this.getPasswordField(textFieldStyles)}
      {this.getSubmitButton()}
    </div>
  };
}