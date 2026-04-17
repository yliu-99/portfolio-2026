import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import profilePic from "../../../../assets/page-assets/home/profile-photo.jpg";
import MenuTemplate from "./MenuTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUpRightFromSquare, faCaretLeft, faCaretRight } from "../../../../data/icons";
import "./AboutMenu.scss";

const PAGES = [
  { id: "profile" },
  { id: "text1", body: null },
  { id: "text2", body: null },
  { id: "text3", body: null },
];

function AboutMenu({ isOpen, onToggle, className }) {
  const [page, setPage] = useState(0);
  const contentRef = useRef(null);
  const prevPage = useRef(0);

  const next = () => setPage(p => (p + 1) % PAGES.length);

  useEffect(() => {
    const dir = page > prevPage.current ? 1 : -1;
    prevPage.current = page;
    gsap.fromTo(
      contentRef.current,
      { x: dir * 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [page]);

  return (
    <MenuTemplate title="About Yuhan" isOpen={isOpen} onToggle={onToggle} className={className}>
      <div className="w-full flex-1 flex flex-col items-center text-center">

        <div ref={contentRef} className="w-full flex-1 flex flex-col items-center">
          {page === 0 ? (
            <>
              {/* Image — sits on top of the blue box */}
              <div className="relative w-36 z-10 shrink-0">
                <Link
                  to="/about"
                  aria-label="Go to About page"
                  className="font-title text-h4 text-black flex items-center justify-center gap-1.5 group transform-gpu hover:opacity-70 transition-opacity duration-150"
                >
                  <span className="underline underline-offset-4">Yuhan Liu</span>
                </Link>
                <img
                  src={profilePic}
                  alt="Yuhan Liu"
                  className="w-full aspect-square object-cover"
                />
              </div>
              {/* Blue box — full card width, fills to bottom card edge */}
              <div className="w-[calc(100%+1.5rem)] -mx-3 -mb-5 flex-1 bg-blue text-white flex flex-col items-center justify-between px-3 pt-4 pb-4">
                <div className="flex flex-col gap-1 items-center">
                  <p className="font-title uppercase text-h5 tracking-[0.08em]">Designer</p>
                  <p className="font-body text-[0.85rem] tracking-[0.05em] opacity-80 flex items-center justify-center gap-1">
                    <FontAwesomeIcon icon={faLocationDot} className="text-[0.75rem]" />
                    Vancouver, BC
                  </p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <button
                    onClick={() => setPage(p => (p - 1 + PAGES.length) % PAGES.length)}
                    aria-label="Previous page"
                    className="text-white/40 cursor-pointer invisible"
                  >
                    <FontAwesomeIcon icon={faCaretLeft} className="bounce-x-reverse text-[1rem]" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next page"
                    className="text-white/40 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faCaretRight} className="bounce-x text-[1rem]" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center px-1">
              {page === 1 ? (
                <p className="font-body normal-case text-h6 leading-relaxed tracking-[0.03em] opacity-80">
                  I am a Multidisciplinary Designer based in Vancouver, working across{" "}
                  <span className="font-bold text-blue">graphic</span>,{" "}
                  <span className="font-bold text-blue">motion</span>,{" "}
                  <span className="font-bold text-blue">sound</span>,{" "}
                  <span className="font-bold text-blue">UX/UI</span>,{" "}
                  <span className="font-bold text-blue">and more</span>.
                </p>
              ) : page === 2 ? (
                <p className="font-body normal-case text-h6 leading-relaxed tracking-[0.03em] opacity-80">
                  I work across disciplines in order to build{" "}
                  <span className="font-bold text-blue">layered experiences</span>{" "}
                  for brands. Shifting perspectives allows me to always make space for <span className="font-bold text-blue">depth and dimension</span> in a concept.
                </p>
              ) : (
                <p className="font-body normal-case text-h6 leading-relaxed tracking-[0.03em] opacity-80">
                  My biggest inspirations for design, storytelling and brand-building come from{" "}
                  <span className="font-bold text-red">film</span>,{" "}
                  <span className="font-bold text-red">music</span>, and{" "}
                  <span className="font-bold text-red">video games</span>.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Navigation row — only for text pages; nav on profile page lives inside the blue box */}
        {page !== 0 && (
          <div className="w-full flex items-center justify-between mt-auto">
            <button
              onClick={() => setPage(p => (p - 1 + PAGES.length) % PAGES.length)}
              aria-label="Previous page"
              className="text-black/40 cursor-pointer"
            >
              <FontAwesomeIcon icon={faCaretLeft} className="bounce-x-reverse text-[1rem]" />
            </button>
            {page === PAGES.length - 1 ? (
              <Link
                to="/projects"
                className="font-title uppercase tracking-primary text-[0.7rem] px-3 py-1.5 border-2 border-black bg-white text-black hover:border-blue hover:text-blue transition-colors duration-200"
              >
                See Projects
              </Link>
            ) : (
              <button onClick={next} aria-label="Next page" className="text-black/40 cursor-pointer">
                <FontAwesomeIcon icon={faCaretRight} className="bounce-x text-[1rem]" />
              </button>
            )}
          </div>
        )}

      </div>
    </MenuTemplate>
  );
}

export default AboutMenu;
