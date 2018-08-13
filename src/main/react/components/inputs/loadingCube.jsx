import React from 'react';

export default function LoadingCube() {

  const getNineDivs =
    <React.Fragment>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
    </React.Fragment>;

  const getFace = (side, index) =>
    <div className={`face ${side}`} key={`face-${index}`}>
      {getNineDivs}
    </div>;

  const sides = ["front", "top", "right", "left", "bottom", "back"];

  return <div className="solo-entry-container">
    <figure>
    {sides.map(getFace)}
  </figure>
  </div>
}