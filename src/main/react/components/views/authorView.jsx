import React from "react";
import aboutUs from "../../../resources/about/aboutUs.png";

export default function AuthorView() {

  const firstSkills = ["TDD", "Agile", "Pair Programming", "Git"];
  const secondSkills = ["JavaScript", "React.js", "Redux", "Webpack", "Gulp",];
  const thirdSkills = ["Jasmine", "Enzyme", "BDD", "Phantom.js", "CSS"];
  const fourthSkills = ["Java", "Spring", "JUnit", "JBPM", "SQL", "Fluentlenium"];

  const allSkills = [firstSkills, secondSkills, thirdSkills, fourthSkills];

  const getSkills = (skills, index) => {
    return <div className={`line`} key={`line-${index}`}>
      {skills.map((item, i) => <div key={`line-${index}-item-${i}`} className="line-item">
        <div className="heart"/>
        {item}
      </div>)}
    </div>
  };

  const skills = <div className="skills-container">
    {allSkills.map((skill, index) => getSkills(skill, index))}
  </div>;

  const pic = <img className="author-pic" src={aboutUs}/>;

  const title = <div className="title-container">
    <div className="title-name">Ece Özalp</div>
  </div>;

  const email = <div className="admin">admin@ecezalp.io</div>;

  return <div className="author-container">
    {pic}
    {title}
    {skills}
    {email}
  </div>
}