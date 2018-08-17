import React from "react";
import {Link} from 'react-router-dom';

export default class LouisRoesch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeColorSchemeIndex: 5,
    }
  }

  getBBlocks(count, name, color) {
    return Array.apply(null, {length: count})
      .map((nothing, index) =>
        <b
          key={`${name}-${index + 1}`}
          className={`${name}-${index + 1}`}
          style={{backgroundColor: color}}
        />
      );
  }

  getGridPatches(scheme) {
    const darkGreens = this.getBBlocks(4, 'dark-green', scheme["darkGreen"]);
    const purples = this.getBBlocks(2, 'purple', scheme["purple"]);
    const yellows = this.getBBlocks(4, 'yellow', scheme["yellow"]);
    const blacks = this.getBBlocks(11, 'black', scheme["black"]);
    const oranges = this.getBBlocks(7, 'orange', scheme["orange"]);
    const reds = this.getBBlocks(5, 'red', scheme["red"]);
    const browns = this.getBBlocks(4, 'brown', scheme["brown"]);
    const blues = this.getBBlocks(8, 'blue', scheme["blue"]);
    const darkRed = this.getBBlocks(1, 'dark-red', scheme["darkRed"]);

    return [...darkGreens, ...purples, ...yellows, ...blacks, ...oranges, ...reds, ...browns, ...blues, ...darkRed];
  };

  getLinks() {
    return <React.Fragment>
      <Link className="home-link link" to="/">home</Link>
      <div className="links">
        <Link className="link" to="/gallery/1">back</Link>
        <Link className="link" to="/gallery/3">next</Link>
      </div>
    </React.Fragment>
  }

  getTitle() {
    return <div className="title">
      <div className="link" onClick={() => this.setState({activeColorSchemeIndex: 0})}>1</div>
      <div className="link" onClick={() => this.setState({activeColorSchemeIndex: 1})}>2</div>
      <div className="link" onClick={() => this.setState({activeColorSchemeIndex: 2})}>3</div>
      <div className="link" onClick={() => this.setState({activeColorSchemeIndex: 3})}>4</div>
      <div className="link" onClick={() => this.setState({activeColorSchemeIndex: 4})}>5</div>
      <div className="link" onClick={() => this.setState({activeColorSchemeIndex: 5})}>6</div>
    </div>
  }

  render() {
    const scheme = this.getColorHelper()[this.state.activeColorSchemeIndex];

    return <div className="roesch-container">
      <div className="grid" style={{backgroundColor: scheme["backgroundColor"]}}>
        {this.getGridPatches(scheme)}
        {this.getTitle()}
        {this.getLinks()}
      </div>
    </div>
  }

  getColorHelper() {
    const scheme1 = {
      backgroundColor: "#CAC4CE",
      darkGreen: "#8D86C9",
      yellow: "#242038",
      blue: "#725AC1",
      purple: "#60E1E0",
      orange: "#6369D1",
      red: "#bd2a18",
      darkRed: "#8b291b",
      brown: "#F7ECE1",
      black: "#000000",
    };

    const scheme2 = {
      black: "#000000",
      backgroundColor: "#96aa66",
      darkGreen: "#2c3320",
      yellow: "#efe54e",
      blue: "#4f6f7b",
      purple: "#713948",
      orange: "#cd5829",
      red: "#bd2a18",
      darkRed: "#8b291b",
      brown: "#6f4836",
    };

    const scheme3 = {
      backgroundColor: "#BEE7E8",
      darkGreen: "#000000",
      yellow: "#FFC1CF",
      blue: "#7D8CC4",
      purple: "#A0D2DB",
      orange: "#B38D97",
      red: "#33CA7F",
      darkRed: "#61988E",
      brown: "#A0B2A6",
      black: "#594157",
    };

    const scheme4 = {
      black: "#9A348E",
      backgroundColor: "#F9DBBD",
      darkGreen: "#180856",
      yellow: "#DA627D",
      blue: "#FCA17D",
      purple: "#FFC4EB",
      orange: "#F7EBE8",
      red: "#E54B4B",
      darkRed: "#3B3561",
      brown: "#EAD94C",
    };

    const scheme5 = {
      backgroundColor: "#F6FFF8",
      darkGreen: "#4392F1",
      yellow: "#DC493A",
      blue: "#0D0628",
      purple: "#A6A2A2",
      orange: "#847577",
      red: "#ff9838",
      darkRed: "#EAF4F4",
      brown: "#CCE3DE",
      black: "#36C9C6"
    };

    const scheme6 = {
      black: "#240B36",
      backgroundColor: "#F7F3E3",
      darkGreen: "#712F79",
      yellow: "#F2DC5D",
      blue: "#A4031F",
      purple: "#DB9065",
      orange: "#B38D97",
      red: "#F2A359",
      darkRed: "#B3B6B7",
      brown: "#6F1A07",
    };


    return [scheme1, scheme4, scheme3, scheme6, scheme2, scheme5];
  }
}