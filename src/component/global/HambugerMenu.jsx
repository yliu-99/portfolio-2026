// import dependencies
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faEnvelope, faLinkedin, faInstagram, faYoutube, faGithub } from "../../data/icons";
import { useLogoRotation } from "../../hooks/useLogoRotation";
import { useContactModal } from "../../context/ContactModalContext";

import LogoFull from "../../assets/global-assets/logo-main.png";
import "./HamburgerMenu.scss";

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const logoImgRef     = useRef(null);
  const logoRef        = useRef(null);
  const containerRef   = useRef(null);
  const hamburgerRef   = useRef(null);
  const grainRef       = useRef(null);
  const lastScrollY    = useRef(0);
  const isHidden       = useRef(false);
  const { openContact } = useContactModal();

  useLogoRotation(logoImgRef);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown  = currentScrollY > lastScrollY.current;

      if (scrollingDown && currentScrollY > 50 && !isHidden.current) {
        isHidden.current = true;
        containerRef.current.classList.add('is-hidden');
        gsap.to(hamburgerRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(grainRef.current,     { opacity: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(containerRef.current, { borderBottomColor: 'transparent', backgroundColor: 'transparent', duration: 0.3, ease: 'power2.out' });
        gsap.to(logoRef.current,      { scale: 0.7, transformOrigin: 'left center', duration: 0.4, ease: 'power2.out' });
      } else if (!scrollingDown && isHidden.current) {
        isHidden.current = false;
        containerRef.current.classList.remove('is-hidden');
        gsap.to(hamburgerRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(grainRef.current,     { opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(containerRef.current, { borderBottomColor: '', backgroundColor: '', duration: 0.3, ease: 'power2.out' });
        gsap.to(logoRef.current,      { scale: 1, transformOrigin: 'left center', duration: 0.4, ease: 'power2.out' });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hamburger-menu">
      {/* Top bar */}
      <div ref={containerRef} className="mobile-menu-container relative p-6 grid grid-cols-12 items-center border-b-3 border-black bg-beige">
        <div ref={grainRef} className="hm-grain" aria-hidden="true" />
        <div ref={logoRef} className="logo col-start-1 flex justify-start relative z-2">
          <Link to="/">
            <img ref={logoImgRef} src={LogoFull} alt="Logo" className="logo-img max-w-8 -h-auto" />
          </Link>
        </div>
        <button
          ref={hamburgerRef}
          className="hamburger-btn text-blue col-start-11 col-end-13 flex justify-end text-h4"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-50 bg-beige flex flex-col p-6">
          <div className="hm-grain" aria-hidden="true" />
          {/* X close button */}
          <button
            className="self-end text-blue text-h4 mb-10"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          {/* Nav links */}
          <nav className="flex flex-col gap-6 font-title text-h3 text-blue uppercase mb-auto text-center">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About Me
            </Link>
            <Link to="/projects" onClick={() => setIsOpen(false)}>
              Projects
            </Link>
            <Link to="/playground" onClick={() => setIsOpen(false)}>
              Playground
            </Link>
            <button onClick={() => { setIsOpen(false); openContact(); }} className="contact-nav-btn">
              Contact
            </button>
          </nav>

          {/* Social links */}
          <div className="social-links flex gap-6 text-blue text-h4 justify-center">
            <a
              href="https://www.linkedin.com/in/yuhan-liu-1a571524b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://instagram.com/_yuhan.liu_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.youtube.com/@Yuhan_Liu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://github.com/yliu-99"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="mailto:yuhancreates@gmail.com" aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
