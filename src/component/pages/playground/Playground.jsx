import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '../../../data/icons';
import { OBSESSIONS } from '../../../data/component-data/obsessionsData';
import { PASSION_PROJECTS } from '../../../data/passionProjectsData';
import { DetailModal } from '../home/home-menu-components/Obsessions';
import './Playground.scss';
import SEO from '../../SEO/SEO';

import enqiBrother   from '../../../assets/page-assets/about/polaroid/enqi-my-brother.jpeg';
import cedarWaxwing  from '../../../assets/playground-assets/photos/cedar-waxwing.jpeg';
import davif         from '../../../assets/playground-assets/photos/davif.jpeg';
import chameleon     from '../../../assets/playground-assets/photos/chameleon.jpeg';
import deer          from '../../../assets/playground-assets/photos/deer.jpeg';
import redWing       from '../../../assets/playground-assets/photos/red-wing.jpeg';
import quebec        from '../../../assets/playground-assets/photos/quebec.jpeg';
import lululemonHike from '../../../assets/playground-assets/photos/lululemon-hike.jpeg';
import hotel         from '../../../assets/playground-assets/photos/hotel.jpeg';
import hCoffee       from '../../../assets/playground-assets/photos/h-coffee.jpeg';
import jellyFish     from '../../../assets/playground-assets/photos/jelly-fish.jpeg';
import fluffyBird    from '../../../assets/playground-assets/photos/fluffy-bird.jpeg';

const PHOTOS = [
  enqiBrother, cedarWaxwing, fluffyBird, redWing, chameleon, deer,
  jellyFish, quebec, lululemonHike, hotel, hCoffee, davif,
];

const ITEMS_PER_PAGE = 3;

// ── Obsession card ─────────────────────────────────────────────────────────────
function ObsessionCard({ item, onOpen }) {
  return (
    <button
      className="group text-left w-full border-2 border-black bg-white overflow-hidden shadow-[3px_7px_6.5px_rgba(0,0,0,0.25)] cursor-pointer relative hover:z-3"
      onClick={() => onOpen(item)}
    >
      <div className="aspect-video bg-[#e8e8e8] overflow-hidden">
        {item.img
          ? <img src={item.img} alt={item.title} className="w-full h-full object-cover block transition-transform duration-400 ease-out group-hover:scale-105" />
          : <div className="w-full h-full bg-linear-to-br from-[#e0e0e0] to-[#ccc]" />
        }
      </div>
      <div className="p-4">
        <p className="font-body text-[0.75rem] tracking-[0.12em] opacity-50 mb-1 uppercase">{item.category}</p>
        <h3 className="font-title text-h5 text-red uppercase tracking-secondary leading-tight flex items-baseline gap-2 flex-wrap">
          {item.title}
          {item.nativeTitle && <span className="font-cjk tracking-normal">{item.nativeTitle}</span>}
        </h3>
      </div>
    </button>
  );
}

// ── Passion project lightbox ───────────────────────────────────────────────────
function PassionProjectModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const cardRef    = useRef(null);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' });
    gsap.fromTo(cardRef.current, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.4)' });
  }, []);

  const handleClose = useCallback(() => {
    gsap.to(cardRef.current,    { scale: 0.94, opacity: 0, duration: 0.18, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0,  duration: 0.2, ease: 'power2.in', onComplete: onClose });
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  const prev = () => setImgIndex(i => (i - 1 + project.media.length) % project.media.length);
  const next = () => setImgIndex(i => (i + 1) % project.media.length);

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/75 backdrop-blur-[6px] z-1000 flex items-center justify-center cursor-pointer"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        className="absolute top-6 right-6 w-10 h-10 bg-white border-0 rounded-full text-[0.9rem] cursor-pointer flex items-center justify-center z-1001 hover:bg-[#eee] transition-colors duration-150"
        onClick={e => { e.stopPropagation(); handleClose(); }}
        aria-label="Close"
      >✕</button>

      <div
        ref={cardRef}
        className="bg-white border-2 border-black max-w-2xl w-[90vw] cursor-default overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Media viewer — image or YouTube embed */}
        <div className="relative aspect-video bg-black overflow-hidden">
          {project.media[imgIndex]?.type === 'youtube' ? (
            <iframe
              src={`https://www.youtube.com/embed/${project.media[imgIndex].videoId}?autoplay=1&rel=0&modestbranding=1`}
              allow="autoplay; fullscreen"
              className="w-full h-full border-none block"
              title={project.title}
            />
          ) : project.media[imgIndex]?.type === 'video' ? (
            <video src={project.media[imgIndex].src} autoPlay muted loop playsInline controls className="w-full h-full object-contain block" />
          ) : (
            <img
              src={project.media[imgIndex]}
              alt={`${project.title} — ${imgIndex + 1}`}
              className="w-full h-full object-contain block"
            />
          )}
          {project.media.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white flex items-center justify-center transition-colors duration-150"
                aria-label="Previous image"
              >
                <FontAwesomeIcon icon={faCaretLeft} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white flex items-center justify-center transition-colors duration-150"
                aria-label="Next image"
              >
                <FontAwesomeIcon icon={faCaretRight} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.media.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-150 ${i === imgIndex ? 'bg-white' : 'bg-white/40'}`}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="p-8">
          <p className="font-title text-[0.75rem] tracking-[0.12em] opacity-50 mb-3 uppercase">{project.category}</p>
          <h2 className="font-title text-red text-h3 leading-tight tracking-[0.04em] mb-4 uppercase">{project.title}</h2>
          <p className="font-body text-base leading-relaxed tracking-[0.02em] opacity-70 mb-4">{project.description}</p>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-title text-[0.8rem] tracking-[0.12em] uppercase border-2 border-black px-4 py-2 inline-block hover:text-red hover:border-red transition-colors duration-150"
              onClick={e => e.stopPropagation()}
            >
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

// ── Passion project card ───────────────────────────────────────────────────────
function PassionProjectCard({ project, onOpen }) {
  return (
    <button
      className="group text-left w-full border-2 border-black bg-white overflow-hidden shadow-[3px_7px_6.5px_rgba(0,0,0,0.25)] cursor-pointer relative hover:z-3"
      onClick={() => onOpen(project)}
    >
      <div className="aspect-video bg-[#e8e8e8] overflow-hidden">
        {project.thumbnail?.type === 'video' ? (
          <video src={project.thumbnail.src} autoPlay muted loop playsInline className="w-full h-full object-cover block transition-transform duration-400 ease-out group-hover:scale-105" />
        ) : project.thumbnail?.type === 'youtube' ? (
          <iframe
            src={`https://www.youtube.com/embed/${project.thumbnail.videoId}?autoplay=1&mute=1&loop=1&playlist=${project.thumbnail.videoId}&controls=0&rel=0&playsinline=1&disablekb=1`}
            allow="autoplay"
            className="w-full h-full border-none block pointer-events-none transition-transform duration-400 ease-out group-hover:scale-105"
            title={project.title}
          />
        ) : (
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover block transition-transform duration-400 ease-out group-hover:scale-105" />
        )}
      </div>
      <div className="p-4">
        <p className="font-body text-[0.75rem] tracking-[0.12em] opacity-50 mb-1 uppercase">{project.category}</p>
        <h3 className="font-title text-h5 text-black uppercase tracking-secondary leading-tight">{project.title}</h3>
      </div>
    </button>
  );
}

// ── Photo lightbox ────────────────────────────────────────────────────────────
function PhotoLightbox({ photos, startIndex, onClose }) {
  const overlayRef = useRef(null);
  const imgRef     = useRef(null);
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' });
    gsap.fromTo(imgRef.current, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.4)' });
  }, []);

  const handleClose = useCallback(() => {
    gsap.to(imgRef.current,     { scale: 0.94, opacity: 0, duration: 0.18, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0,  duration: 0.2, ease: 'power2.in', onComplete: onClose });
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     handleClose();
      if (e.key === 'ArrowLeft')  setIndex(i => (i - 1 + photos.length) % photos.length);
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose, photos.length]);

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/85 backdrop-blur-[6px] z-1000 flex items-center justify-center cursor-pointer"
      onClick={handleClose}
    >
      <button
        className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full text-[0.9rem] flex items-center justify-center z-1001 hover:bg-[#eee] transition-colors duration-150 cursor-pointer"
        onClick={e => { e.stopPropagation(); handleClose(); }}
        aria-label="Close"
      >✕</button>

      <button
        onClick={e => { e.stopPropagation(); setIndex(i => (i - 1 + photos.length) % photos.length); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors duration-150 cursor-pointer"
        aria-label="Previous"
      ><FontAwesomeIcon icon={faCaretLeft} className="text-white text-lg" /></button>

      <button
        onClick={e => { e.stopPropagation(); setIndex(i => (i + 1) % photos.length); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors duration-150 cursor-pointer"
        aria-label="Next"
      ><FontAwesomeIcon icon={faCaretRight} className="text-white text-lg" /></button>

      <img
        ref={imgRef}
        src={photos[index]}
        alt={`Photo ${index + 1}`}
        className="max-h-[90vh] max-w-[90vw] object-contain cursor-default"
        onClick={e => e.stopPropagation()}
      />

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); setIndex(i); }}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-150 ${i === index ? 'bg-white' : 'bg-white/35'}`}
          />
        ))}
      </div>
    </div>,
    document.body
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
function Playground() {
  const [page, setPage] = useState(0);
  const [activeObsession, setActiveObsession] = useState(null);
  const [activeProject,   setActiveProject]   = useState(null);
  const [photoIndex,      setPhotoIndex]      = useState(null);

  const totalPages = Math.ceil(OBSESSIONS.length / ITEMS_PER_PAGE);
  const pageItems  = OBSESSIONS.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <div className="playground-container col-span-12">
      <SEO
        title="Playground | Yuhan Liu | Multidisciplinary Designer in Vancouver"
        description="Yuhan Liu's creative playground — obsessions, passion projects, photography, and personal work outside the portfolio."
        canonicalUrl="/playground"
        keywords="creative playground, passion projects, photography, personal work, yuhan liu"
      />

      {/* Page title */}
      <h1 className="font-title uppercase text-red mt-8 mb-2" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>Playground</h1>

      {/* Boba shop chip — sits directly under title */}
      <span className="font-body text-[0.85rem] tracking-[0.08em] px-4 py-1.5 border-2 border-black text-black uppercase bg-white inline-block mb-4">
        the thought that comes to me standing in line at the boba shop
      </span>

      {/* Descriptor chips */}
      <div className="flex flex-wrap gap-2 mb-12">
        {['small projects', 'fun ideas', "what's on my mind"].map(chip => (
          <span key={chip} className="font-body text-[0.85rem] tracking-[0.08em] px-4 py-1.5 border-2 border-black text-black uppercase bg-white">
            {chip}
          </span>
        ))}
      </div>

      {/* Cool things I'm working on */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-title text-h3 uppercase tracking-secondary">Other Projects</h2>
          <FontAwesomeIcon icon={faCaretRight} className="text-red" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PASSION_PROJECTS.map(p => (
            <PassionProjectCard key={p.id} project={p} onOpen={setActiveProject} />
          ))}
          {/* Placeholder slots */}
          {Array.from({ length: Math.max(0, 3 - PASSION_PROJECTS.length) }).map((_, i) => (
            <div key={i} className="border-2 border-black/20 border-dashed bg-white/50 aspect-video flex items-center justify-center">
              <p className="font-body text-sm tracking-[0.1em] opacity-30 uppercase">Coming Soon</p>
            </div>
          ))}
        </div>
      </section>

      {/* All obsessions */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-title text-h4 uppercase tracking-secondary">All Obsessions</h2>
          {totalPages > 1 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="text-black/40 disabled:opacity-20 cursor-pointer disabled:cursor-default"
                aria-label="Previous page"
              >
                <FontAwesomeIcon icon={faCaretLeft} className="text-lg" />
              </button>
              <span className="font-body text-sm opacity-50">{page + 1} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="text-black/40 disabled:opacity-20 cursor-pointer disabled:cursor-default"
                aria-label="Next page"
              >
                <FontAwesomeIcon icon={faCaretRight} className="text-lg" />
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pageItems.map((item, i) => (
            <ObsessionCard key={item.title + i} item={item} onOpen={setActiveObsession} />
          ))}
        </div>
      </section>

      {/* Photography */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-title text-h4 uppercase tracking-secondary">Photos</h2>
          <FontAwesomeIcon icon={faCaretRight} className="text-red" />
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {PHOTOS.map((src, i) => (
            <button
              key={i}
              className="group block w-full overflow-hidden cursor-pointer break-inside-avoid relative hover:z-3"
              onClick={() => setPhotoIndex(i)}
            >
              <img src={src} alt={`Photo ${i + 1}`} className="w-full block object-cover transition-transform duration-400 ease-out group-hover:scale-105" />
            </button>
          ))}
        </div>
      </section>

      {activeObsession && <DetailModal   item={activeObsession} onClose={() => setActiveObsession(null)} />}
      {activeProject   && <PassionProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      {photoIndex !== null && <PhotoLightbox photos={PHOTOS} startIndex={photoIndex} onClose={() => setPhotoIndex(null)} />}

    </div>
  );
}

export default Playground;
