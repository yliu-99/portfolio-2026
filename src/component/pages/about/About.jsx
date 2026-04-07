import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Icon } from "@iconify/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSquarePlus, faSquareMinus } from "../../../data/icons";

import { toolIcons } from "../../../data/icons";
import cvPdf from "../../../assets/page-assets/about/yuhan-liu-master-cv.pdf";
import dragonflyRed  from "../../../assets/global-assets/dragonfly-red.png";
import Values from "./Values";
import AIAndDesign from "./AIAndDesign";
import AboutMe from "./AboutMe";
import GetInTouch from "./GetInTouch";
import "./About.scss";

import heroImg from "../../../assets/page-assets/about/about-me.jpg";

// ── All tools flattened for the marquee ────────────────────────────────────
const allTools = toolIcons.flatMap(g => g.tools);

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

const FEEL_WORDS = [
  "feel", "dream", "inspired", "connect", "motivated", "hope", "move", "remember", "wonder", "empathize", "create", "belong","crave", "laugh", "think", "grow", "explore", "believe", "care", "share", "play",
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

  const [feelIdx, setFeelIdx] = useState(0);
  const feelIntervalRef = useRef(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    feelIntervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setFeelIdx(prev => (prev + 1) % FEEL_WORDS.length);
      }
    }, 400);
    return () => clearInterval(feelIntervalRef.current);
  }, []);

  const handleTitleClick = () => {
    setTitleIdx(prev => (prev + 1) % TITLES.length);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setTitleIdx(0), 3000);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <section className="relative grid grid-cols-12 gap-4 items-center pb-16 overflow-visible">
      {/* Red dragonfly — background, right edge */}
      <img
        src={dragonflyRed}
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 -right-4 md:-right-5 lg:-right-16 w-156 md:w-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none select-none mix-blend-multiply z-0"
      />

      {/* Photo — cols 1–5 */}
      <div className="col-span-12 md:col-span-5 flex justify-start overflow-hidden md:pr-8 relative z-1">
        <img src={heroImg} alt="Yuhan Liu" className="w-full h-[70vh] object-cover border-2 border-black" />
      </div>

      {/* Text + buttons — cols 6–12 */}
      <div className="col-span-12 md:col-start-6 md:col-span-7 flex flex-col gap-8 relative z-1 text-center md:text-left">
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
          I make designs that tell <span className="text-blue">stories</span>.<br />
          Stories that make people{" "}
          <span
            className="text-red inline-block"
            onMouseEnter={() => { isPausedRef.current = true; }}
            onMouseLeave={() => { isPausedRef.current = false; }}
          >
            {FEEL_WORDS[feelIdx]}
          </span>.
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
      </div>
    </section>
  );
}

// ── Section 3: Tools marquee ───────────────────────────────────────────────
const imgSrcs = allTools.filter(t => t.imgSrc).map(t => t.imgSrc);

function ToolsMarquee() {
  const [ready, setReady] = useState(imgSrcs.length === 0);

  useEffect(() => {
    if (imgSrcs.length === 0) return;
    let loaded = 0;
    imgSrcs.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => {
        if (++loaded === imgSrcs.length) setReady(true);
      };
      img.src = src;
    });
  }, []);

  // Triple items so the seam never shows during the loop
  const items = [...allTools, ...allTools, ...allTools];

  return (
    <div className="tools-marquee py-8 overflow-hidden">
      <div className={`tools-marquee__track flex gap-8${ready ? '' : ' paused'}`}>
        {items.map((tool, i) => (
          <div key={i} className="tools-marquee__item shrink-0 flex items-center justify-center w-8 h-8 text-black/70">
            {tool.imgSrc
              ? <img src={tool.imgSrc} alt={tool.name} className="w-8 h-8 object-contain" />
              : <Icon icon={tool.icon} width={32} height={32} />
            }
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section 4: Accordion sections ─────────────────────────────────────────
const SECTIONS = [
  { id: "read-the-lore",  label: "Read the Lore",     content: <AboutMe /> },
  { id: "deck-of-values", label: "My Deck of Values", content: <Values /> },
  { id: "ai-and-design",  label: "AI + Design",       content: <AIAndDesign /> },
  { id: "get-in-touch",   label: "Get in Touch",       content: <GetInTouch /> },
];

function AccordionItem({ label, content, isOpen, onToggle }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    gsap.to(bodyRef.current, {
      height: isOpen ? "auto" : 0,
      duration: 0.4,
      ease: isOpen ? "power2.out" : "power2.in",
    });
  }, [isOpen]);

  useEffect(() => {
    gsap.set(bodyRef.current, { height: isOpen ? "auto" : 0 });
  }, []);

  return (
    <div className="border-t-2 border-black">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-0 py-5 font-title uppercase tracking-primary text-h5 text-left transition-colors duration-200 hover:text-red"
      >
        {label}
        <FontAwesomeIcon
          icon={isOpen ? faSquareMinus : faSquarePlus}
          className="text-blue"
        />
      </button>
      <div ref={bodyRef} className="overflow-hidden">
        <div className="pb-8">
          {content ?? <p className="font-body text-black/40 text-sm">Coming soon.</p>}
        </div>
      </div>
    </div>
  );
}

function ContentSection() {
  const [openId, setOpenId] = useState(SECTIONS[0].id);

  return (
    <section className="mt-16 mb-16">
      {SECTIONS.map(section => (
        <AccordionItem
          key={section.id}
          {...section}
          isOpen={openId === section.id}
          onToggle={() => setOpenId(prev => prev === section.id ? null : section.id)}
        />
      ))}
      <div className="border-t-2 border-black" />
    </section>
  );
}

// ── Main About page ────────────────────────────────────────────────────────
function About() {
  return (
    <div className="about col-span-12 px-0">
      <IntroSection />
      <ToolsMarquee />
      <ContentSection />
    </div>
  );
}

export default About;
