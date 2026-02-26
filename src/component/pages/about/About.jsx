import "./About.scss";

import AboutMe from "./AboutMe";
import Values from "./Values";
import MyTools from "./MyTool";

function About() {
  return (
    <div className="about col-span-12">
      <AboutMe />
      <Values />
      <MyTools/>
    </div>
  );
}

export default About;