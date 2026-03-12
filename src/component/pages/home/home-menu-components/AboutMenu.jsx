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

function AboutMenu() {
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
    <MenuTemplate title="About Yuhan">
      <div className="w-full flex-1 flex flex-col items-center justify-between text-center">

        <div ref={contentRef} className="w-full flex flex-col items-center gap-4">
          {page === 0 ? (
            <>
              <div className="relative w-36">
                <Link
                  to="/about"
                  aria-label="Go to About page"
                  className="font-title text-h4 text-black flex items-center justify-center gap-1.5 group transform-gpu hover:opacity-70 transition-opacity duration-150"
                >
                  Yuhan Liu
                  <FontAwesomeIcon icon={faUpRightFromSquare} className="text-[0.6rem] opacity-60 shrink-0" />
                </Link>
                <img
                  src={profilePic}
                  alt="Yuhan Liu"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-title uppercase text-h5 tracking-[0.08em] text-red">
                  Designer
                </p>
                <p className="font-body text-[0.85rem] tracking-[0.05em] opacity-60 flex items-center justify-center gap-1">
                  <FontAwesomeIcon icon={faLocationDot} className="text-[0.75rem]" />
                  Vancouver, BC
                </p>
              </div>
            </>
          ) : page === 1 ? (
            <p className="font-body normal-case text-h6 leading-relaxed tracking-[0.03em] opacity-80 px-1">
              I am a Multidisciplinary Designer based in Vancouver, working across{" "}
              <span className="font-bold text-blue">graphic</span>,{" "}
              <span className="font-bold text-blue">motion</span>,{" "}
              <span className="font-bold text-blue">sound</span>,{" "}
              <span className="font-bold text-blue">UX/UI</span>,{" "}
              <span className="font-bold text-blue">and more</span>.
            </p>
          ) : page === 2 ? (
            <p className="font-body normal-case text-h6 leading-relaxed tracking-[0.03em] opacity-80 px-1">
              My biggest inspirations for design, storytelling and brand-building come from{" "}
              <span className="font-bold text-red">film</span>,{" "}
              <span className="font-bold text-red">music</span>, and{" "}
              <span className="font-bold text-red">video games</span>.
            </p>
          ) : (
            <p className="font-body normal-case text-h6 leading-relaxed tracking-[0.03em] opacity-80 px-1">
              These spaces keep me <span className="font-bold">connected</span> to the{" "}
              <span className="font-bold">culture and issues around us</span>, and continuously shape how I bring ideas to life and{" "}
              <span className="font-bold">problem solve</span> through my own work.
            </p>
          )}
        </div>

        {/* Navigation row: prev · next */}
        <div className="w-full flex items-center justify-between">
          <button
            onClick={() => setPage(p => (p - 1 + PAGES.length) % PAGES.length)}
            aria-label="Previous page"
            className={`text-black/40 cursor-pointer transition-opacity ${page === 0 ? "invisible" : ""}`}
          >
            <FontAwesomeIcon icon={faCaretLeft} className="bounce-x-reverse text-[1rem]" />
          </button>
          <button
            onClick={next}
            aria-label="Next page"
            className="text-black/40 cursor-pointer"
          >
            <FontAwesomeIcon icon={faCaretRight} className="bounce-x text-[1rem]" />
          </button>
        </div>

      </div>
    </MenuTemplate>
  );
}

export default AboutMenu;
