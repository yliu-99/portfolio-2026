import { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faPhone } from '../../data/icons';
import { useContactModal } from '../../context/ContactModalContext';
import './ScrollUp.scss';

const GAP_PX = 24;

function ScrollUp() {
  const { openContact } = useContactModal();
  const containerRef = useRef(null);
  const topBtnRef    = useRef(null);

  useEffect(() => {
    const footer = document.querySelector('footer');

    const handleScroll = () => {
      const scrollY    = window.scrollY;
      const viewportH  = window.innerHeight;

      // Show TOP button after scrolling 1vh
      if (scrollY >= viewportH * 0.01) {
        topBtnRef.current?.classList.add('is-visible');
      } else {
        topBtnRef.current?.classList.remove('is-visible');
      }

      // Lift above footer when it enters the viewport
      if (footer && containerRef.current) {
        const footerTop = footer.getBoundingClientRect().top;
        if (footerTop < viewportH) {
          containerRef.current.style.bottom = `${viewportH - footerTop + GAP_PX}px`;
        } else {
          containerRef.current.style.bottom = `${GAP_PX}px`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // set correct state on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="scroll-widget">
      <button
        ref={topBtnRef}
        className="scroll-widget__btn scroll-widget__btn--top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <FontAwesomeIcon icon={faCaretUp} className="scroll-widget__caret" />
        <span>TOP</span>
      </button>
      <button
        className="scroll-widget__btn scroll-widget__btn--contact"
        onClick={openContact}
        aria-label="Contact"
      >
        <FontAwesomeIcon icon={faPhone} />
      </button>
    </div>
  );
}

export default ScrollUp;
