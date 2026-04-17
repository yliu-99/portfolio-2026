import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '../../../data/icons';
import { OBSESSIONS } from '../../../data/component-data/obsessionsData';
import { PASSION_PROJECTS } from '../../../data/passionProjectsData';
import { DetailModal } from '../home/home-menu-components/Obsessions';
import './Playground.scss';

const ITEMS_PER_PAGE = 3;

// ── Obsession card ─────────────────────────────────────────────────────────────
function ObsessionCard({ item, onOpen }) {
  return (
    <button
      className="text-left w-full border-2 border-black bg-white overflow-hidden shadow-[3px_7px_6.5px_rgba(0,0,0,0.25)] hover:opacity-80 transition-opacity duration-150 cursor-pointer"
      onClick={() => onOpen(item)}
    >
      <div className="aspect-video bg-[#e8e8e8] overflow-hidden">
        {item.img
          ? <img src={item.img} alt={item.title} className="w-full h-full object-cover block" />
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
          <p className="font-body text-base leading-relaxed tracking-[0.02em] opacity-70">{project.description}</p>
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
      className="text-left w-full border-2 border-black bg-white overflow-hidden shadow-[3px_7px_6.5px_rgba(0,0,0,0.25)] hover:opacity-80 transition-opacity duration-150 cursor-pointer"
      onClick={() => onOpen(project)}
    >
      <div className="aspect-video bg-[#e8e8e8] overflow-hidden">
        <img
          src={project.thumbnail?.type === 'youtube'
            ? `https://img.youtube.com/vi/${project.thumbnail.videoId}/maxresdefault.jpg`
            : project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover block"
        />
      </div>
      <div className="p-4">
        <p className="font-body text-[0.75rem] tracking-[0.12em] opacity-50 mb-1 uppercase">{project.category}</p>
        <h3 className="font-title text-h5 text-black uppercase tracking-secondary leading-tight">{project.title}</h3>
      </div>
    </button>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
function Playground() {
  const [page, setPage] = useState(0);
  const [activeObsession, setActiveObsession] = useState(null);
  const [activeProject,   setActiveProject]   = useState(null);

  const totalPages = Math.ceil(OBSESSIONS.length / ITEMS_PER_PAGE);
  const pageItems  = OBSESSIONS.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <div className="playground-container col-span-12">

      {/* Page title + description */}
      <div className="playground-title-box bg-red text-white px-8 pt-6 pb-8 mb-12">
        <div className="font-title text-h2 flex items-center gap-3 mb-6">
          <h1 className="mt-2">PLAYGROUND</h1>
          <span><FontAwesomeIcon icon={faCaretRight} /></span>
        </div>
        <p className="font-body text-white/90 max-w-xl" style={{ fontSize: '20px', lineHeight: 1.7 }}>
          The wild ideas I come up with standing in line at the boba shop. Experiments, passion projects, and things that exist purely because I wanted to make them.
        </p>
      </div>

      {/* Cool things I'm working on */}
      <section className="mb-16 px-4 md:px-8">
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
      <section className="mb-16 px-4 md:px-8">
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

      {activeObsession && <DetailModal   item={activeObsession} onClose={() => setActiveObsession(null)} />}
      {activeProject   && <PassionProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}

    </div>
  );
}

export default Playground;
