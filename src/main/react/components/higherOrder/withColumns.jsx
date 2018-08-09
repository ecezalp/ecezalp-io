import React from 'react';
import MenuIcons from "../inputs/menuIcons";

export default function WithColumns (props) {

  let columnStyle = {};

  columnStyle.display = "flex";
  columnStyle.justifyContent = "flex-end";
  columnStyle.minHeight = "100vh";
  columnStyle.minWidth = "22.5%";

  if (props.colors && props.colors.length === 7) {
    columnStyle.background = `linear-gradient(rgb(185, 237, 252) 0%, ${props.colors[0]} 5%, ${props.colors[1]} 18%, ${props.colors[2]} 30%, ${props.colors[3]} 43%, ${props.colors[4]} 56%, ${props.colors[5]} 69%, ${props.colors[6]} 82%, rgb(185, 237, 252) 100%)`;
  } else {
    columnStyle.background = "#B9DFF9";
  }

  return <div className="main-container" key={`main-container-${props.index}`}>
      <div className="gradient" style={columnStyle} key={`text-gradient-right-${props.index}`}>
        <MenuIcons/>
      </div>
      {props.children}
      <div className="gradient" style={columnStyle} key={`text-gradient-left-${props.index}`}/>
    </div>
}

