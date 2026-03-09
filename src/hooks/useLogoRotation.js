import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives a smooth scroll-linked rotation on a logo element.
 * Rotation maps 0→360° across the full page scroll length.
 * Animates back to 0 when navigating to a new page.
 *
 * @param {React.RefObject} logoRef - ref attached to the logo <img>
 */
export function useLogoRotation(logoRef) {
  const location = useLocation();
  const quickToRef = useRef(null);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    // Initialize GSAP state on the element before creating quickTo
    gsap.set(el, { rotation: 0 });

    // quickTo handles smooth interpolation on each ScrollTrigger update
    quickToRef.current = gsap.quickTo(el, 'rotation', {
      duration: 0.5,
      ease: 'power2.out',
    });

    // ScrollTrigger handles scroll detection reliably (works with overflow: clip)
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        quickToRef.current(self.progress * 360);
      },
    });

    return () => trigger.kill();
  }, []);

  // Reset on route change via the same quickTo channel
  useEffect(() => {
    if (!quickToRef.current) return;
    quickToRef.current(0);
  }, [location.pathname]);
}
