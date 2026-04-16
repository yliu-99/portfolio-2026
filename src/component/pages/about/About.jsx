import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSquarePlus, faSquareMinus, faCaretDown } from "../../../data/icons";

import cvPdf from "../../../assets/page-assets/about/yuhan-liu-master-cv.pdf";
import Values from "./Values";
import AIAndDesign from "./AIAndDesign";
import AboutMe from "./AboutMe";
import WhatIDo from "./WhatIDo";
import GetInTouch from "./GetInTouch";
import "./About.scss";

import heroImg from "../../../assets/page-assets/about/about-me.jpg";

// ── Section 1 + 2: Intro ──────────────────────────────────────────────────
const TITLES = [
  "Multidisciplinary Designer",
  "Tech Enthusiast",
  "Singer / Musician",
  "Cat Mom",
  "Movie Lover",
  "Gamer",
  "Cinnamoroll Collector",
  "Matcha Addict",
  "Gen-Z",
  "Campfire Guitarist",
];


function IntroSection() {
  const hiRef = useRef(null);

  useEffect(() => {
    if (!hiRef.current) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 1 });
    tl.to(hiRef.current, { rotation: 4,  duration: 0.12, ease: "power1.inOut" })
      .to(hiRef.current, { rotation: -2, duration: 0.12, ease: "power1.inOut" })
      .to(hiRef.current, { rotation: 4,  duration: 0.12, ease: "power1.inOut" })
      .to(hiRef.current, { rotation: -2, duration: 0.12, ease: "power1.inOut" })
      .to(hiRef.current, { rotation: 4,  duration: 0.12, ease: "power1.inOut" })
      .to(hiRef.current, { rotation: 0,  duration: 0.2,  ease: "power1.out"  });
    return () => tl.kill();
  }, []);

  const [titleIdx, setTitleIdx] = useState(0);
  const timerRef = useRef(null);

  const handleTitleClick = () => {
    setTitleIdx(prev => (prev + 1) % TITLES.length);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setTitleIdx(0), 3000);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <section className="relative grid grid-cols-12 gap-4 items-center pb-16 overflow-visible">
      {/* Photo — cols 2–5 */}
      <div className="col-span-12 md:col-start-2 md:col-span-4 flex justify-start overflow-hidden md:pr-8 relative z-1">
        <img src={heroImg} alt="Yuhan Liu" className="w-full h-[70vh] object-cover border-2 border-black" />
      </div>

      {/* Text + buttons — cols 6–11 */}
      <div className="col-span-12 md:col-start-6 md:col-span-6 md:pl-8 flex flex-col gap-8 relative z-1 text-center md:text-left">
        <h1 className="font-title tracking-primary text-black" style={{ fontSize: "clamp(2rem, 5vw, 4.209rem)" }}>
          <span ref={hiRef} className="inline-block" style={{ transformOrigin: "bottom left" }}>Hi,</span>
          {" "}I'm Yuhan!
        </h1>
        <p className="font-body leading-snug" style={{ fontSize: "clamp(1.2rem, 2.5vw, 2.369rem)" }}>
          I'm a{" "}
          <span
            onClick={handleTitleClick}
            className="text-red font-bold underline underline-offset-4 decoration-red cursor-pointer select-none"
            title="Click to cycle"
          >
            {TITLES[titleIdx]}
          </span>
          <br />based in <FontAwesomeIcon icon={faLocationDot} /> Vancouver.
        </p>
        <p className="font-body text-black/70 font-semibold" style={{ fontSize: "clamp(1rem, 1.5vw, 1.333rem)" }}>
          I design to facilitate a connection between people and what they care about. Then, I use storytelling to turn that connection into action.
        </p>
        <div className="flex gap-3 mt-2 justify-center md:justify-start">
          <Link
            to="/projects"
            className="font-title uppercase tracking-primary px-5 py-2 border-2 border-black bg-white text-black hover:border-red hover:text-red transition-colors duration-200"
            style={{ fontSize: "clamp(0.8rem, 1vw, 1.1rem)" }}
          >
            Projects
          </Link>
          <a
            href={cvPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="font-title uppercase tracking-primary px-5 py-2 border-2 border-black bg-white text-black hover:border-red hover:text-red transition-colors duration-200"
            style={{ fontSize: "clamp(0.8rem, 1vw, 1.1rem)" }}
          >
            Download CV
          </a>
        </div>
        <p className="font-body text-black/70 italic font-semibold mt-8" style={{ fontSize: "clamp(0.8rem, 1vw, 1.1rem)" }}>I hope getting to know me is a fun experience.</p>
        <div className="flex justify-center md:justify-start mt-4">
          <FontAwesomeIcon icon={faCaretDown} className="text-black/30 caret-bounce text-2xl" />
        </div>
      </div>
    </section>
  );
}

// ── Section 3: Accordion sections ─────────────────────────────────────────
const SECTIONS = [
  { id: "what-i-do",      label: "What I Do",         content: <WhatIDo /> },
  { id: "read-the-lore",  label: "Read the Lore",     content: <AboutMe /> },
  { id: "deck-of-values", label: "My Deck of Values", content: <Values /> },
  { id: "ai-and-design",  label: "AI + Design",       content: <AIAndDesign /> },
  { id: "get-in-touch",   label: "Get in Touch",       content: <GetInTouch /> },
];

function AccordionItem({ label, content, isOpen, onToggle, sectionRef }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    gsap.set(bodyRef.current, { height: isOpen ? "auto" : 0 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!bodyRef.current) return;
    gsap.to(bodyRef.current, {
      height: isOpen ? "auto" : 0,
      duration: 0.4,
      ease: isOpen ? "power2.out" : "power2.in",
    });
  }, [isOpen]);

  return (
    <div ref={sectionRef} className="mb-3">
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-start-2 lg:col-span-10">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between px-3 py-2 border-2 border-black bg-white font-title uppercase tracking-secondary text-h5 text-left select-none shadow-[3px_7px_6.5px_rgba(0,0,0,0.25)] transition-colors duration-200 hover:text-red"
          >
            {label}
            <FontAwesomeIcon
              icon={isOpen ? faSquareMinus : faSquarePlus}
              className="text-blue shrink-0"
            />
          </button>
        </div>
      </div>
      <div ref={bodyRef} className="overflow-hidden">
        <div className="pb-8 pt-6">
          {content ?? (
            <div className="grid grid-cols-12">
              <p className="col-span-12 lg:col-start-3 lg:col-span-8 font-body text-black/40 text-sm">Coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContentSection() {
  const [openId, setOpenId] = useState(SECTIONS[0].id);
  const sectionRefs = useRef({});

  const handleToggle = (id) => {
    const opening = openId !== id;
    setOpenId(prev => prev === id ? null : id);

    if (opening) {
      // Wait for the previous section's close animation (0.4s) to finish
      // before scrolling so the layout is stable
      setTimeout(() => {
        const el = sectionRefs.current[id];
        if (!el) return;
        const navHeight = document.querySelector('.nav-wrapper')?.offsetHeight ?? 92;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 420);
    }
  };

  return (
    <section className="mt-16 mb-16">
      {SECTIONS.map(section => (
        <AccordionItem
          key={section.id}
          {...section}
          sectionRef={el => sectionRefs.current[section.id] = el}
          isOpen={openId === section.id}
          onToggle={() => handleToggle(section.id)}
        />
      ))}
    </section>
  );
}

// ── Main About page ────────────────────────────────────────────────────────
function About() {
  return (
    <div className="about col-span-12 px-0">
      <IntroSection />
      <ContentSection />
    </div>
  );
}

export default About;
