import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

import SingingImg from "../../../assets/page-assets/about/singing.JPEG";
import TeapotHillImg from "../../../assets/page-assets/about/teapot-hill.JPEG";


const HERO_IMG = "https://i.postimg.cc/2SjhR5nF/about-me.jpg";
const TOTAL_STAGES = 3;

// ── static content blocks ──────────────────────────────────────────────────

const TitleOverlay = () => (
  <div className="section-title-box font-title text-h2 flex items-start absolute bottom-0 right-0 p-6 text-white">
    <h2>ABOUT ME</h2>
    <span className="triangle">
      <FontAwesomeIcon icon={faCaretRight} />
    </span>
  </div>
);

const Paragraph1 = () => (
  <div className="paragraph-1">
    <p className="font-body font-bold text-h2 mt-4">Hi, I'm Yuhan!</p>
    <p className="font-body text-h5 leading-loose mt-4 ">
      I am a{" "}
      <span className="highlight-primary">multidisciplinary designer</span>,
      and creativity is my way of connecting with the world. As a New Media Design and Web Development student at BCIT, I feel
      excited to spend each day learning new ways of bringing ideas to life
      through design, code, and storytelling. Whatever I am building, I always aim to make something that feels{" "}
      <span className="highlight-blue">meaningful</span>. My biggest
      inspirations come from film, video games, and music, and the
      storytelling within these mediums that{" "}
      <span className="highlight-blue">evokes feelings</span> both
      vulnerable and beautiful, in people.
    </p>
  </div>
);

const Paragraph2 = () => (
  <div className="paragraph-2 font-body text-h5 leading-loose">
    <p>
      Before shifting into tech and design, I earned a {" "}
      <span className="highlight-blue">Bachelor's Degree in Music Performance</span> as a classical soprano and also
      spent two years working as a{" "}
      <span className="highlight-blue">private voice teacher</span>. During this time, I learned both as a student and teacher the ways communication, empathy, and creativity connects people, and how effective storytelling makes an impact on people's lives. These became valuable lessons that I carry into all my creative projects today.
    </p>
  </div>
);

const Paragraph3 = () => (
  <div className="paragraph-3 font-body text-h5 leading-loose">
    <p className="mb-4">
        Though I may seem shy at first, I really love connecting with people and hearing their stories. These connections inspire and motivate me, and I really cherish opportunities to learn <span className="highlight-red">new perspectives</span> and ways of thinking.
    </p>
    <p>
      Outside of school and work, I recharge by making music, spending quality
      time with loved ones, playing video games, cooking, exploring
      the city, and crafting things by hand. These little joys help me
      stay <span className="highlight-red">curious</span>,{" "}
      <span className="highlight-blue">grounded</span>, and{" "}
      <span className="highlight-red">inspired</span> in everything I do.
    </p>
  </div>
);

// ── stage navigation ───────────────────────────────────────────────────────

function StageNav({ stage, onNavigate }) {
  const hintRef = useRef(null);

  useEffect(() => {
    if (!hintRef.current) return;
    const tween = gsap.to(hintRef.current, {
      y: 2,
      duration: 0.7,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => tween.kill();
  }, []);

  return (
    <div className="flex flex-col items-start gap-3 mt-12">

      {/* square indicators */}
      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL_STAGES }).map((_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            aria-label={`Go to section ${i + 1}`}
            className={`transition-all duration-300 cursor-pointer ${
              i === stage
                ? "w-6 h-2.5 bg-blue"
                : "w-2.5 h-2.5 bg-blue/25 hover:bg-blue/50"
            }`}
          />
        ))}
      </div>

      {/* scroll hint — hidden on last stage */}
      {stage < TOTAL_STAGES - 1 && (
        <p className="font-body text-xs text-black/40 tracking-widest uppercase">
          scroll to continue <span ref={hintRef} className="inline-block"><FontAwesomeIcon icon={faCaretDown} /></span>
        </p>
      )}

    </div>
  );
}

// ── stages data ────────────────────────────────────────────────────────────

const stages = [
  { image: HERO_IMG,       Content: Paragraph1, objectPos: "object-center" },
  { image: SingingImg,     Content: Paragraph2, objectPos: "object-right"  },
  { image: TeapotHillImg,  Content: Paragraph3, objectPos: "object-center" },
];

// ── component ─────────────────────────────────────────────────────────────

function AboutMe() {
  const [stage, setStage] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current || window.innerWidth < 1024) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      if (progress < 1 / 3)      setStage(0);
      else if (progress < 2 / 3) setStage(1);
      else                        setStage(2);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStage = (targetStage) => {
    if (!wrapperRef.current) return;
    const wrapperTop = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
    const scrollable = wrapperRef.current.offsetHeight - window.innerHeight;
    const progress = targetStage === 0 ? 0 : (targetStage / TOTAL_STAGES) + 0.02;
    window.scrollTo({ top: wrapperTop + scrollable * progress, behavior: "smooth" });
  };

  const { image, Content, objectPos } = stages[stage];

  return (
    <section className="about-me-container -mx-4 md:-mx-5 lg:-mx-6 col-span-12">

      {/* ── lg+: sticky scroll-driven panel ────────────────────────────── */}
      <div ref={wrapperRef} className="hidden lg:block h-[300vh]">
        <div className="sticky top-18 h-[calc(100vh-4.5rem)] grid grid-cols-12">

          {/* image */}
          <div className="col-span-6 relative overflow-hidden">
            <img
              key={stage}
              src={image}
              alt="About me"
              className={`w-full h-full object-cover ${objectPos} fade-in`}
            />
            {stage === 0 && <TitleOverlay />}
          </div>

          {/* content */}
          <div key={`content-${stage}`} className="col-span-6 p-12 xl:p-24 bg-white overflow-y-auto fade-in flex flex-col justify-center">
            <Content />
            <StageNav stage={stage} onNavigate={scrollToStage} />
          </div>

        </div>
      </div>

      {/* ── md and below: static stacked layout ────────────────────────── */}
      <div className="lg:hidden grid grid-cols-12">
        <div className="col-span-12 relative">
          <img src={HERO_IMG} alt="About me" className="w-full" />
          <TitleOverlay />
        </div>
        <div className="col-span-12 p-8 bg-white">
          <Paragraph1 />
        </div>
        <div className="col-span-12">
          <img src={SingingImg} alt="Singing" className="w-full object-right" />
        </div>
        <div className="col-span-12 p-8 bg-white">
          <Paragraph2 />
        </div>
        <div className="col-span-12">
          <img src={TeapotHillImg} alt="Teapot Hill" className="w-full" />
        </div>
        <div className="col-span-12 p-8 bg-white">
          <Paragraph3 />
        </div>
      </div>

    </section>
  );
}

export default AboutMe;
