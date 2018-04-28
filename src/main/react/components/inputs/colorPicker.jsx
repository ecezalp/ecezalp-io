import React from 'react';


export default class ColorPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedColor: "",
    };

    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.color !== this.state.selectedColor) {
      this.setState({selectedColor: newProps.color})
    }
  }

  handleChangeComplete(color) {
    this.setState({selectedColor: color.hex});
  };

  render() {
    return <ChromePicker color={this.state.selectedColor}
                         onChangeComplete={this.handleChangeComplete}/>
  }
}
