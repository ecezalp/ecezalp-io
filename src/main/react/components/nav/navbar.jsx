import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBar() {

  const options = ['archive', 'blog', 'author'];

  const getOption = (option) => {
    return <div className="option" key={`option-${option}`}>
      <Link to={`/${option}`}>
        <div className="nav-text">{option}</div>
      </Link>
    </div>
  };

  const getOptions = (options) =>
    <div className="options-container">
      {options.map(getOption)}
    </div>;

  const logo = <div className="logo-container">ecezalp.io</div>;

  return <div id="navbar">
    {logo}
    {getOptions(options)}
  </div>
}