// import dependencies
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faEnvelope, faLinkedin, faInstagram, faYoutube, faGithub } from "../../data/icons";
import { useLogoRotation } from "../../hooks/useLogoRotation";
import { useContactModal } from "../../context/ContactModalContext";

import LogoFull from "../../assets/global-assets/logo-main-texture.svg";
import "./HamburgerMenu.scss";

function HamburgerMenu() {
  const [isOpen, setIsOpen]  = useState(false);
  const logoImgRef   = useRef(null);
  const logoRef      = useRef(null);
  const containerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const progressRef  = useRef(null);
  const lastScrollY  = useRef(0);
  const isHidden     = useRef(false);
  const { openContact } = useContactModal();

  useLogoRotation(logoImgRef);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown  = currentScrollY > lastScrollY.current;

      // Update scroll progress bar width
      if (progressRef.current) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress  = docHeight > 0 ? currentScrollY / docHeight : 0;
        progressRef.current.style.width = `${progress * 100}%`;
      }

      // Hide bar on scroll down, reveal on scroll up
      if (scrollingDown && currentScrollY > 50 && !isHidden.current) {
        isHidden.current = true;
        containerRef.current.classList.add('is-hidden');
        gsap.to(hamburgerRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(logoRef.current,      { scale: 0.7, transformOrigin: 'left center', duration: 0.4, ease: 'power2.out' });
      } else if (!scrollingDown && isHidden.current) {
        isHidden.current = false;
        containerRef.current.classList.remove('is-hidden');
        gsap.to(hamburgerRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(logoRef.current,      { scale: 1, transformOrigin: 'left center', duration: 0.4, ease: 'power2.out' });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hamburger-menu">
      {/* Scroll progress line — grows left → right with scroll depth */}
      <div ref={progressRef} className="scroll-progress-bar" />

      {/* Top bar */}
      <div ref={containerRef} className="mobile-menu-container relative flex items-start justify-between px-6 pt-5">
        <div ref={logoRef} className="logo relative z-2">
          <Link to="/">
            <img ref={logoImgRef} src={LogoFull} alt="Logo" className="logo-img h-16 w-auto" />
          </Link>
        </div>

        <button
          ref={hamburgerRef}
          className="hamburger-btn relative z-2"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Full-screen overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-50 bg-beige flex flex-col p-6">
          <div className="hm-grain" aria-hidden="true" />

          <button
            className="self-end text-blue text-h4 mb-10 relative z-2"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <nav className="flex flex-col gap-6 font-title text-h3 text-blue uppercase mb-auto text-center relative z-2">
            <Link to="/"           onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about"      onClick={() => setIsOpen(false)}>About Me</Link>
            <Link to="/projects"   onClick={() => setIsOpen(false)}>Projects</Link>
            <Link to="/playground" onClick={() => setIsOpen(false)}>Playground</Link>
            <button
              onClick={() => { setIsOpen(false); openContact(); }}
              className="contact-nav-btn"
            >
              Contact
            </button>
          </nav>

          <div className="social-links flex gap-6 text-blue text-h4 justify-center relative z-2">
            <a href="https://www.linkedin.com/in/yuhan-liu-1a571524b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://instagram.com/_yuhan.liu_" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.youtube.com/@Yuhan_Liu" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="https://github.com/yliu-99" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
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
