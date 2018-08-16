import React from "react";
import {Link} from 'react-router-dom';

export default function ErnstKeller() {

  const adventures = <React.Fragment>
    <div className="ad">ad</div>
    <div className="vent">vent</div>
    <div className="ures">ures</div>
  </React.Fragment>;

  const header = <div className="header">
    <div className="large">coding</div>
    <div className="small">and all else required to tell a story with web development</div>
    <div className="pull-left">2018</div>
  </div>;

  const footer = <div className="footer">
    <div className="line1">Newest trends in design and software</div>
    <div className="line2">Authored by Ece Ozalp</div>
  </div>;

  const getPatches = () => {
    return ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty']
      .map(number => <b className={number}/>);
  };

  const getWords = () => {
    return [
      {className: "one", text: "software"},
      {className: "two", text: "development"},
      {className: "three", text: "devops daily"},
      {className: "four", text: "serverless"},
      {className: "five", text: "orchestration & choreography"},
      {className: "six", text: "site reliability"},
      {className: "seven", text: "product design"},
      {className: "eight", text: "change"},
      {className: "nine", text: "management"},
    ].map(item => <div className={item.className}>{item.text}</div>)
  };

  const getLinks = () =>
    <React.Fragment>
      <Link className="home-link" to="/">home</Link>
      <Link className="next-link" to="/gallery/2">next</Link>
    </React.Fragment>;

  const rightPage = <div className="right-page">
    <div className="grid">
      {header}
      {adventures}
      {footer}
    </div>
  </div>;

  const leftPage = <div className="left-page">
    <div className="grid">
      {getPatches()}
      {getWords()}
      {getLinks()}
    </div>
  </div>;

  return <div className="alternate-view-container">
    {leftPage}
    {rightPage}
  </div>
}