import React from "react";
import {Link} from 'react-router-dom';

export default function LouisRoesch() {

  const getBBlocks = (count, name) =>
    Array.apply(null, {length: count})
      .map((nothing, index) =>
        <b key={`${name}-${index + 1}`} className={`${name}-${index + 1}`}/>
      );

  const darkGreens = getBBlocks(4, 'dark-green');
  const purples = getBBlocks(2, 'purple');
  const yellows = getBBlocks(4, 'yellow');
  const blacks =  getBBlocks(11, 'black');
  const oranges =  getBBlocks(7, 'orange');
  const reds = getBBlocks(5, 'red');
  const browns = getBBlocks(4, 'brown');
  const blues = getBBlocks(8, 'blue');
  const darkRed = getBBlocks(1, 'dark-red');

  const resize = <div className="resize">resize your window</div>;

  const links = <div className="links">
    <Link className="next-link" to="/gallery/1">back</Link>
    <Link className="home-link" to="/">home</Link>
  </div>;

  return <div className="roesch-container">
    <div className="grid">
      {darkGreens}
      {purples}
      {yellows}
      {blacks}
      {oranges}
      {reds}
      {browns}
      {blues}
      {darkRed}
      {resize}
      {links}
    </div>
  </div>
}