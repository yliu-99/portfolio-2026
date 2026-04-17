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
  const [isOpen, setIsOpen]  = useState(false);
  const logoImgRef   = useRef(null);
  const logoRef      = useRef(null);
  const containerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const progressRef  = useRef(null);
  const overlayRef   = useRef(null);
  const backdropRef  = useRef(null);
  const lastScrollY  = useRef(0);
  const isHidden     = useRef(false);
  const { openContact } = useContactModal();

  useLogoRotation(logoImgRef);

  // Initialise overlay off-screen and backdrop inert before any interaction
  useEffect(() => {
    gsap.set(overlayRef.current,  { x: '100%', pointerEvents: 'none' });
    gsap.set(backdropRef.current, { pointerEvents: 'none' });
  }, []);

  const openMenu = () => {
    setIsOpen(true);
    document.body.classList.add('menu-is-open');
    gsap.killTweensOf(overlayRef.current);
    gsap.set(overlayRef.current, { pointerEvents: 'all' });
    gsap.set(backdropRef.current, { pointerEvents: 'all' });
    gsap.to(overlayRef.current, { x: '0%', duration: 0.45, ease: 'power3.out' });
  };

  const closeMenu = () => {
    gsap.killTweensOf(overlayRef.current);
    gsap.set(backdropRef.current, { pointerEvents: 'none' });
    gsap.to(overlayRef.current, {
      x: '100%', duration: 0.3, ease: 'power3.in',
      onComplete: () => {
        setIsOpen(false);
        document.body.classList.remove('menu-is-open');
        if (overlayRef.current) gsap.set(overlayRef.current, { pointerEvents: 'none' });
      },
    });
  };

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
      <div ref={containerRef} className="mobile-menu-container relative flex items-start justify-between px-6 lg:px-16 pt-5">
        <div ref={logoRef} className="logo relative z-2">
          <Link to="/">
            <img ref={logoImgRef} src={LogoFull} alt="Logo" className="logo-img h-12 lg:h-16 w-auto" />
          </Link>
        </div>

        <button
          ref={hamburgerRef}
          className="hamburger-btn relative z-2"
          onClick={openMenu}
          aria-label="Open menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Backdrop — transparent click-catcher behind the menu panel */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-199"
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Menu panel — always in DOM, GSAP slides it in/out from the right.
          Mobile: full-screen (left-0). Desktop: right-side drawer (auto width). */}
      <div
        ref={overlayRef}
        className="mobile-menu-overlay fixed top-0 right-0 bottom-0 max-lg:left-0 z-200 bg-beige flex flex-col p-6 lg:px-12 lg:py-8 lg:border-l-2 lg:border-black"
      >
        <div className="hm-grain" aria-hidden="true" />

        <button
          className="self-end text-blue text-h4 mb-10 relative z-2"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <nav className="flex flex-col gap-6 font-title text-h3 text-blue uppercase mb-auto text-center lg:text-left relative z-2">
          <Link to="/"           onClick={closeMenu} className="lg:hover:text-red lg:transition-colors lg:duration-200">Home</Link>
          <Link to="/about"      onClick={closeMenu} className="lg:hover:text-red lg:transition-colors lg:duration-200">About Me</Link>
          <Link to="/projects"   onClick={closeMenu} className="lg:hover:text-red lg:transition-colors lg:duration-200">Projects</Link>
          <Link to="/playground" onClick={closeMenu} className="lg:hover:text-red lg:transition-colors lg:duration-200">Playground</Link>
          <button
            onClick={() => { closeMenu(); openContact(); }}
            className="contact-nav-btn lg:text-left lg:hover:text-red lg:transition-colors lg:duration-200"
          >
            Contact
          </button>
        </nav>

        <div className="social-links flex gap-6 text-blue text-h4 justify-center lg:justify-start relative z-2">
          <a href="https://www.linkedin.com/in/yuhan-liu-1a571524b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="lg:hover:text-red lg:transition-colors lg:duration-200">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://instagram.com/_yuhan.liu_" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="lg:hover:text-red lg:transition-colors lg:duration-200">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.youtube.com/@Yuhan_Liu" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="lg:hover:text-red lg:transition-colors lg:duration-200">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://github.com/yliu-99" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="lg:hover:text-red lg:transition-colors lg:duration-200">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="mailto:yuhancreates@gmail.com" aria-label="Email" className="lg:hover:text-red lg:transition-colors lg:duration-200">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HamburgerMenu;
