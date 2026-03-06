// import dependencies
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import LogoFull from '../../assets/global-assets/logo-main.png';
import { useLogoRotation } from '../../hooks/useLogoRotation';
import { useContactModal } from '../../context/ContactModalContext';

// import styles
import './Header.scss';

function Header() {
  const logoRef     = useRef(null);
  const logoImgRef  = useRef(null);
  const navLinksRef = useRef(null);
  const headerRef   = useRef(null);
  const navBarRef   = useRef(null);
  const lastScrollY = useRef(0);
  const isHidden    = useRef(false);
  const { openContact } = useContactModal();

  useEffect(() => {
    gsap.set(logoRef.current, { y: '2rem' });
  }, []);

  useLogoRotation(logoImgRef);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown  = currentScrollY > lastScrollY.current;

      if (scrollingDown && currentScrollY > 50 && !isHidden.current) {
        isHidden.current = true;
        gsap.to(navLinksRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3, ease: 'power2.out' });
        gsap.to(navBarRef.current,   { borderBottomColor: 'transparent', duration: 0.3, ease: 'power2.out' });
        gsap.to(headerRef.current,   { backgroundColor: 'transparent',   duration: 0.3, ease: 'power2.out' });
        gsap.to(logoRef.current,     { scale: 0.7, transformOrigin: 'left center', duration: 0.4, ease: 'power2.out' });
      } else if (!scrollingDown && isHidden.current) {
        isHidden.current = false;
        gsap.to(navLinksRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3, ease: 'power2.out' });
        gsap.to(navBarRef.current,   { borderBottomColor: '',  duration: 0.3, ease: 'power2.out' });
        gsap.to(headerRef.current,   { backgroundColor: '',    duration: 0.3, ease: 'power2.out' });
        gsap.to(logoRef.current,     { scale: 1, transformOrigin: 'left center', duration: 0.4, ease: 'power2.out' });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={headerRef} className="header bg-beige">
      <div className="header-content">
        <div className="nav-items">
          <ul ref={navBarRef} className='font-title text-blue uppercase text-h4 h-18 pl-16 pr-16 flex items-center border-b-3 border-red'>
            <li ref={logoRef} className='home-logo flex items-center'>
              <a href="/"><img ref={logoImgRef} src={LogoFull} alt="Logo" className="logo-img max-w-16"/></a>
            </li>
            <li ref={navLinksRef} className='flex gap-14 ml-auto items-center'>
              <a href="/"           className='flex justify-center'>Home</a>
              <a href="/about"      className='flex justify-center'>About Me</a>
              <a href="/projects"   className='flex justify-center'>Projects</a>
              <a href="/playground" className='flex justify-center'>Playground</a>
              <button onClick={openContact} className="contact-nav-btn">Contact</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
