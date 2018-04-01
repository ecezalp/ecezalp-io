import React from "react";
import aboutUs from "../../resources/about/aboutUs.jpg";

export default function Author(props) {

  const firstLine = ["TDD", "Agile", "Pair Programming", "Git"];
  const secondLine = ["JavaScript", "React.js", "Redux", "Webpack", "Gulp",];
  const thirdLine = [ "Jasmine", "Enzyme", "BDD", "Phantom.js", "CSS"];
  const fourthLine = ["Java", "Spring", "JUnit", "JBPM", "SQL", "Fluentlenium"];

  const lines = [firstLine, secondLine, thirdLine, fourthLine];

  const getLine = (line, index) => {
    return <div className={`line line-${index}`}>{line.map(item => <div className="line-item">
      <div className="heart"/>
      {item}
    </div>)}
    </div>
  };

  return <div className="author-container">
    <img className="author-pic" src={aboutUs}/>
    <div className="title-container">
      <div className="title-name">Ece Özalp</div>
      <div className="title-title">Full Stack Web Developer</div>
    </div>
    <div className="lines-container">
      {lines.map((line, index) => getLine(line, index))}
    </div>
    <div className="admin">admin@ecezalp.io</div>
  </div>
}