import "./About.scss";

import AboutMe from "./AboutMe";
import Values from "./Values";

function About() {
  return (
    <div className="about col-span-12">
      <AboutMe />
      <Values />
    </div>
  );
}

export default About;