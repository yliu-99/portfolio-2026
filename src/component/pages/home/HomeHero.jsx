// import dependancies
import { useEffect, useState } from "react";
// import images
import mothHero from "../../../assets/page-assets/home/moth-hero.svg";
import circleText from "../../../assets/page-assets/home/circle-text.svg";
// import components

// import styles
import "./HomeHero.scss";

function HomeHero() {

    // setup state for animated numbers
  const [leftNumbers, setLeftNumbers] = useState(
    Array(20)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10)),
  ); 
  const [rightNumbers, setRightNumbers] = useState(
    Array(20)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10)),
  ); 
 //   animate numbers on an interval
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldUpdate = Math.random() > 0.6;
      if (shouldUpdate) {
        setLeftNumbers(prev => {
          const newNumbers = [...prev];
          // Change only 1-2 numbers at a time
          const numChanges = Math.random() > 0.5 ? 1 : 2;
          for (let i = 0; i < numChanges; i++) {
            const randomIndex = Math.floor(Math.random() * newNumbers.length);
            newNumbers[randomIndex] = Math.floor(Math.random() * 10);
          }
          return newNumbers;
        });
        
        setRightNumbers(prev => {
          const newNumbers = [...prev];
          const numChanges = Math.random() > 0.5 ? 1 : 2;
          for (let i = 0; i < numChanges; i++) {
            const randomIndex = Math.floor(Math.random() * newNumbers.length);
            newNumbers[randomIndex] = Math.floor(Math.random() * 10);
          }
          return newNumbers;
        });
      }
    }, 100);
  }, []);

  return (
    <div className="container col-span-full">
      <div className="hero-elements col-span-full">
        <div className="animated-numbers left text-black opacity-50 font-title tracking-numbers">
        {leftNumbers.map((num, index) => (
          <span key={index} className="number">{num}</span>
        ))}
      </div>
        <div className="left-label font-title tracking-primary">
          <span className=" text-black opacity-70 text-h5">PORTFOLIO</span>
          <span className="year text-red text-h6">2025</span>
        </div>
        <div className="hero-graphic relative col-start-5 col-end-8">
          <div className="moth max-w-120">
            <img
              src={mothHero}
              alt="Luna moth decorative illustration with the word 'design' in the center"
              className="w-full"
            />
          </div>
          <div className="animated-text absolute">
            <img
              src={circleText}
              alt="Rotating circular text animation"
              className="w-full"
            />
          </div>
        </div>
        <div className="right-label font-title tracking-primary">
          <span className="text-black opacity-70 text-h6">SCROLL</span>
          <span className="text-red text-h5">TO EXPLORE</span>
        </div>
        <div className="animated-numbers right text-black opacity-50 font-title tracking-numbers">
        {rightNumbers.map((num, index) => (
          <span key={index} className="number">{num}</span>
        ))}
      </div>
      </div>
    </div>
  );
}

export default HomeHero;
