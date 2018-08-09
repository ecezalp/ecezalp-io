import React from 'react';

export default class WithEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
    }
  }

  componentDidMount() {
    this.props.entryRepository.findAll().then((entries) => {
      this.setState({entries});
    });
  }

  renderChildrenWithProps() {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        entries: this.state.entries || [],
      })
    )
  }

  render() {
    return <div className="with-entries-container">
      {this.renderChildrenWithProps()}
    </div>;
  }
}
