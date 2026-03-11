import { useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

import { POLAROID_PHOTOS as PHOTOS } from '../../../data/component-data/polaroidsData';
import './Polaroids.scss';

const VARIANTS = [
  { rotate: -4, offsetY: 0 },
  { rotate:  3, offsetY: 0 },
  { rotate: -2, offsetY: 0 },
  { rotate:  5, offsetY: 0 },
  { rotate: -6, offsetY: 0 },
  { rotate:  2, offsetY: 0 },
  { rotate: -3, offsetY: 0 },
  { rotate:  4, offsetY: 0 },
];


// ── PolaroidCard ─────────────────────────────────────────────────────────────

function PolaroidCard({ photo, variant, onClick }) {
  return (
    <div
      className="polaroid-card shrink-0 flex flex-col items-center cursor-pointer relative z-1"
      style={{ '--rotate': `${variant.rotate}deg`, '--offset-y': `${variant.offsetY}px` }}
      onClick={() => onClick(photo)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(photo)}
      aria-label={`View photo: ${photo.caption}`}
    >
      {/* Pin */}
      <div className="w-2.5 h-2.5 bg-white rounded-full border-2 border-white shadow-[0_1px_4px_rgba(0,0,0,0.3)] relative z-2 shrink-0" aria-hidden="true" />

      {/* Frame */}
      <div className="polaroid-frame bg-white p-[0.65rem] pb-[2.4rem] xl:p-[0.78rem] xl:pb-[2.88rem] w-42.5 xl:w-51 border-2 border-black">
        <div className="w-full aspect-square overflow-hidden bg-[#e0e0e0]">
          {photo.src
            ? <img src={photo.src} alt={photo.caption} loading="lazy" className="w-full h-full object-cover object-center block pointer-events-none" />
            : <div className="w-full h-full bg-linear-to-br from-[#e8e8e8] to-[#d0d0d0]" />
          }
        </div>
        <p className="font-body text-[0.62rem] xl:text-[0.74rem] text-center text-[#555] mt-[0.55rem] tracking-[0.05em] line-clamp-2 leading-snug h-7 xl:h-[2.1rem] overflow-hidden">{photo.caption}</p>
      </div>
    </div>
  );
}


// ── PolaroidModal ─────────────────────────────────────────────────────────────

function PolaroidModal({ photo, onClose }) {
  const overlayRef = useRef(null);
  const cardRef    = useRef(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 },              { opacity: 1, duration: 0.25, ease: 'power2.out' });
    gsap.fromTo(cardRef.current,    { scale: 0.85, opacity: 0 }, { scale: 1,   opacity: 1, duration: 0.3, ease: 'back.out(1.5)' });
  }, []);

  const handleClose = useCallback(() => {
    gsap.to(cardRef.current,    { scale: 0.9, opacity: 0, duration: 0.2, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.22, ease: 'power2.in', onComplete: onClose });
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/82 z-1000 flex items-center justify-center cursor-pointer"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        className="absolute top-6 right-6 w-10 h-10 bg-white border-0 rounded-full text-[0.9rem] cursor-pointer flex items-center justify-center z-1001 transition-colors duration-150 hover:bg-[#eee]"
        onClick={e => { e.stopPropagation(); handleClose(); }}
        aria-label="Close"
      >✕</button>

      <div
        ref={cardRef}
        className="bg-white p-4 pb-12 cursor-default shadow-[0_24px_64px_rgba(0,0,0,0.55)] max-w-[90vw]"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-[clamp(240px,38vw,520px)] aspect-square overflow-hidden bg-[#e0e0e0]">
          {photo.src
            ? <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover block" />
            : <div className="w-full h-full bg-linear-to-br from-[#e8e8e8] to-[#d0d0d0]" />
          }
        </div>
        <p className="font-body text-[0.85rem] text-center text-[#555] mt-[0.85rem] tracking-[0.06em]">{photo.caption}</p>
      </div>
    </div>,
    document.body
  );
}


// ── Polaroids ─────────────────────────────────────────────────────────────────

function Polaroids() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const [active, setActive] = useState(null);

  const doubled = [...PHOTOS, ...PHOTOS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const raf = requestAnimationFrame(() => {
      const totalWidth = track.scrollWidth / 2;
      tweenRef.current = gsap.to(track, {
        x: -totalWidth,
        duration: 120,
        ease: 'none',
        repeat: -1,
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      tweenRef.current?.kill();
    };
  }, []);

  return (
    <section className="relative bg-blue pt-14 pb-20 overflow-hidden select-none -mx-4 md:-mx-5 lg:-mx-6 min-h-screen flex flex-col justify-center border-b-3 border-white">

      {/* Header */}
      <div className="flex flex-col items-center mb-14">
        <h2 className="font-title text-white uppercase tracking-[0.15em] text-h3 text-center">Polaroid Wall</h2>
        <div className="border-b-3 border-white w-24 mt-1"></div>
        <p className="font-body text-white text-h6 tracking-secondary mt-6">people, places, and things that keep me motivated and inspired</p>
      </div>

      {/* Stage */}
      <div className="relative">

        {/* String — kept as a class only for the ::after pseudo-element in SCSS */}
        <div
          className="polaroid-string absolute top-13.25 -left-[2%] -right-[2%] h-0.5 bg-white z-0 pointer-events-none"
          aria-hidden="true"
        />

        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => tweenRef.current?.pause()}
          onMouseLeave={() => tweenRef.current?.play()}
        >
          <div ref={trackRef} className="flex items-start gap-10 px-12 pt-12 pb-20 will-change-transform">
            {doubled.map((photo, i) => (
              <PolaroidCard
                key={i}
                photo={photo}
                variant={VARIANTS[i % VARIANTS.length]}
                onClick={setActive}
              />
            ))}
          </div>
        </div>

      </div>

      {active && <PolaroidModal photo={active} onClose={() => setActive(null)} />}

    </section>
  );
}

export default Polaroids;
