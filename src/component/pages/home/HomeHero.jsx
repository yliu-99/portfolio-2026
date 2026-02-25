// import dependencies
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

// import images
import mothHero from "../../../assets/page-assets/home/moth-hero.svg";
import circleText from "../../../assets/page-assets/home/circle-text.svg";

// import components

// import styles
import "./HomeHero.scss";

function HomeHero() {

  // ── Animated numbers state ───────────────────────────────────────────────
  const rand = () => Math.floor(Math.random() * 10);
  const isMd = () => window.matchMedia("(min-width: 768px)").matches;

  const [leftNumbers, setLeftNumbers] = useState(
    () => Array(isMd() ? 24 : 16).fill(0).map(rand)
  );
  const [rightNumbers, setRightNumbers] = useState(
    () => Array(isMd() ? 24 : 16).fill(0).map(rand)
  );

  // adjust count on breakpoint change
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => {
      const count = e.matches ? 24 : 16;
      setLeftNumbers(Array(count).fill(0).map(rand));
      setRightNumbers(Array(count).fill(0).map(rand));
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // number flicker interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const flicker = (prev) => {
          const next = [...prev];
          const count = Math.random() > 0.5 ? 1 : 2;
          for (let i = 0; i < count; i++) {
            next[Math.floor(Math.random() * next.length)] = Math.floor(Math.random() * 10);
          }
          return next;
        };
        setLeftNumbers(flicker);
        setRightNumbers(flicker);
      }
    }, 500);
    return () => clearInterval(interval); // cleanup
  }, []);

  // ── GSAP refs ────────────────────────────────────────────────────────────
  const heroRef      = useRef(null);
  const graphicRef   = useRef(null);
  const circleRef    = useRef(null);
  const leftNumRef   = useRef(null);
  const rightNumRef  = useRef(null);
  const leftLblRef   = useRef(null);
  const rightLblRef  = useRef(null);
  const triangleRef  = useRef(null);

  // entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(graphicRef.current, {
        opacity: 0, scale: 0.85, duration: 1.2, ease: "power3.out"
      });
      gsap.from([leftNumRef.current, rightNumRef.current], {
        opacity: 0, duration: 0.8, delay: 0.4, stagger: 0.1, ease: "power2.out"
      });
      gsap.from([leftLblRef.current, rightLblRef.current], {
        opacity: 0, duration: 0.8, delay: 0.6, stagger: 0.1, ease: "power2.out"
      });
      gsap.to(triangleRef.current, {
        y: 5, duration: 0.6, ease: "power1.inOut", yoyo: true, repeat: -1, delay: 1.4
      });

      // ── Circle text stepped rotation (6 words × 60°) ─────────────────────
      gsap.set(circleRef.current, { yPercent: -50, transformOrigin: "50% 50%" });
      const STEP     = 60;   // 360° / 6 words
      const ROT_DUR  = 2.50; // main rotation per step
      const BUMP_DUR = 0.25; // overshoot
      const BACK_DUR = 0.25; // settle
      const tl = gsap.timeline({ repeat: -1, delay: 1.2 });
      for (let i = 1; i <= 6; i++) {
        const deg = STEP * i;
        tl.to(circleRef.current, { rotation: deg,     duration: ROT_DUR,  ease: "power1.in" })
          .to(circleRef.current, { rotation: deg + 2, duration: BUMP_DUR, ease: "power1.inOut" })
          .to(circleRef.current, { rotation: deg,     duration: BACK_DUR, ease: "power1.inOut" });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section ref={heroRef} className="col-span-12">
      <div className="hero-elements grid grid-cols-12 items-center min-h-[calc(100dvh-4rem)] md:min-h-[70vh]">

        {/* Col 1 — left numbers */}
        <div ref={leftNumRef}
          className="animated-numbers left col-start-1 col-end-2 font-title tracking-numbers text-black/50">
          {leftNumbers.map((n, i) => <span key={i}>{n}</span>)}
        </div>

        {/* Col 3 — left label */}
        <div ref={leftLblRef}
          className="left-label col-start-3 col-end-4 font-title tracking-primary">
          <span className="text-black/70 text-h5">PORTFOLIO</span>
          <span className="text-red text-h6">2026</span>
        </div>

        {/* Cols 5–8 — hero graphic */}
        <div ref={graphicRef}
          className="hero-graphic justify-center align-middle md:pt-60 col-start-2 col-end-12 sm:col-start-3 sm:col-end-11 md:col-start-4 md:col-end-10">
          <div className="moth">
            <img
              src={mothHero}
              alt="Luna moth decorative illustration with the word 'design' in the center"
              className="w-full"
            />
          </div>
          <div ref={circleRef} className="animated-text">
            <img
              src={circleText}
              alt="Rotating circular text animation"
              className="w-full"
            />
          </div>
        </div>

        {/* Col 10 — right label */}
        <div ref={rightLblRef}
          className="right-label col-start-10 col-end-11 font-title tracking-primary">
          <span className="text-black/70 text-h6">CHECKOUT</span>
          <div className="explore-text">
        <span className="text-red text-h5">MY WORK</span>
          <span ref={triangleRef} className="triangle"><FontAwesomeIcon icon={faCaretDown} /></span>
          </div>
          
        </div>

        {/* Col 12 — right numbers */}
        <div ref={rightNumRef}
          className="animated-numbers right col-start-12 col-end-13 font-title tracking-numbers text-black/50">
          {rightNumbers.map((n, i) => <span key={i}>{n}</span>)}
        </div>

      </div>
    </section>
  );
}

export default HomeHero;
