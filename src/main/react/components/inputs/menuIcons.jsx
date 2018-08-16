import React from 'react';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router-dom';

export default function MenuIcons() {

  const pages = [
    {title: "gallery", to: "/gallery/1"},
    {title: "archive", to: "/small-list"},
    {title: "blog", to: `/archive`},
    {title: "author", to: "/author"},
    {title: "upload", to:"/entries/new"},
    {title: "home", to: "/"},
  ];

  return <div className="icon-container">
    {pages.map((page, index) =>
      <Link className="menu-icon-text" to={page.to} key={`page-${index}`}>
        <div>{page.title.toLowerCase()}</div>
      </Link>)}
  </div>
};