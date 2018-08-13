import React from 'react';
import {Link} from 'react-router-dom';
import LoadingCube from "../inputs/loadingCube";

export default function LandingView({isTextVisible}) {

  const style = {
    visibility: isTextVisible ? "inline" : "hidden",
  };

  const getLoadingOrText = (isTextVisible) => {
    if (isTextVisible) {
      return <div>software</div>;
    } else {
      return <div className="loading-style">loading...</div>;
    }
  };

  const title = <div className="landing-title">
    <div style={style}>my</div>
    {getLoadingOrText(isTextVisible)}
    <div style={style}>adventures</div>
  </div>;

  const subtitle = <div className="landing-subtitle" style={style}>
    <div className="subtitle">a blog by</div>
    <div className="full-name">Ece Özalp</div>
  </div>;

  const cube = <Link to="/small-list">
    <LoadingCube/>
  </Link>;

  return <div className="solo-entry-container">
    <div className="landing-container">
      {title}
      {cube}
      {subtitle}
    </div>
  </div>
}