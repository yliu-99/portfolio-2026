import "./About.scss";

import AboutMe      from "./AboutMe";
import Values       from "./Values";
import MyTools      from "./MyTool";
import AIAndDesign  from "./AIAndDesign";
import Polaroids    from "./Polaroids";

function About() {
  return (
    <div className="about col-span-12">
      <AboutMe />
      <Values />
      <MyTools />
      <AIAndDesign />
      <Polaroids />
    </div>
  );
}

export default About;