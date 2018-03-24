import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBar() {

  const logo = <div className="logo-container">ecezalp.io</div>;

  const options = ['archive', 'blog', 'author'];

  const getOptions = (options) =>
    <div className="options-container">
      {options.map((option) =>
        <div className="option" key={`option-${option}`}>
          <Link to={`/${option}`}>
            <div className="nav-text">{option}</div>
          </Link>
        </div>)}
    </div>;

  return <div id="navbar">
    {logo}
    {getOptions(options)}
  </div>
}