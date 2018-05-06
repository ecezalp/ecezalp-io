import React from 'react';
import MenuIcons from "../inputs/menuIcons";

export default function WithColumns (props) {

  let columnStyle = {};

  columnStyle.display = "flex";
  columnStyle.justifyContent = "flex-end";
  columnStyle.minHeight = "100vh";
  columnStyle.minWidth = "22.5%";

  if (props.colors && props.colors.length === 7) {
    columnStyle.background = `linear-gradient(${props.colors[0]} 0%, ${props.colors[1]} 16%, ${props.colors[2]} 30%, ${props.colors[3]} 44%, ${props.colors[4]} 64%, ${props.colors[5]} 78%, ${props.colors[6]} 100%)`;
  } else {
    columnStyle.background = "linear-gradient(rgba(214, 197, 166, 1) 0%, rgba(249, 226, 185, 1) 16%, rgba(248, 245, 236, 1) 30%, rgba(247, 193, 185, 1) 44%, rgba(178, 212, 247, 1) 64%, rgba(249, 226, 185, 1) 78%, rgba(226, 122, 174, 1) 100%)";
  }

  return <div className="main-container">
      <div className="test-gradient" style={columnStyle}>
        <MenuIcons entries={props.entries}/>
      </div>
      {props.children}
      <div className="test-gradient" style={columnStyle}/>
    </div>
}

