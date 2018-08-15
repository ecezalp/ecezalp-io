import React from "react";

export default function AlternateView() {

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

  return <div className="alternate-view-container">
    <div className="left-page">
      <div className="grid">
        <b className="one"/>
        <b className="two"/>
        <b className="three"/>
        <b className="four"/>
        <b className="five"/>
        <b className="six"/>
        <b className="seven"/>
        <b className="eight"/>
        <b className="nine"/>
        <b className="ten"/>
        <b className="eleven"/>
        <b className="twelve"/>
        <b className="thirteen"/>
        <b className="fourteen"/>
        <b className="fifteen"/>
        <b className="sixteen"/>
        <b className="seventeen"/>
        <b className="eighteen"/>
        <b className="nineteen"/>
        <b className="twenty"/>
        <div className="one">software</div>
        <div className="two">development</div>
        <div className="three">design & css</div>
        <div className="four">serverless</div>
        <div className="five">orchestration & choreography</div>

      </div>
    </div>
    <div className="right-page">
      <div className="grid">
        {header}
        {adventures}
        {footer}
      </div>
    </div>
  </div>
}