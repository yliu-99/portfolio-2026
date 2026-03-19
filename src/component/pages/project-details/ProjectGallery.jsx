// import dependencies
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { Icon } from '@iconify/react';

// import styles
import './ProjectGallery.scss';

// ── Helpers ────────────────────────────────────────────────────────────────────

function getYouTubeId(src) {
    const match = src.match(/youtube\.com\/embed\/([^?&]+)/);
    return match ? match[1] : null;
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({ gallery, activeIdx, onClose, onNavigate }) {
    const overlayRef  = useRef(null);
    const mediaRef    = useRef(null);
    const lightboxIdx = activeIdx;

    useEffect(() => {
        gsap.fromTo(overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: 'power2.out' }
        );
        gsap.fromTo(mediaRef.current,
            { opacity: 0, scale: 0.94 },
            { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
        );
    }, []);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const handleClose = () => {
        gsap.to(overlayRef.current, {
            opacity: 0, duration: 0.18, ease: 'power2.in', onComplete: onClose,
        });
    };

    const navigate = useCallback((nextIdx) => {
        const dir = nextIdx > lightboxIdx ? 1 : -1;
        gsap.to(mediaRef.current, {
            opacity: 0, x: -40 * dir, duration: 0.15, ease: 'power2.in',
            onComplete: () => {
                onNavigate(nextIdx);
                gsap.fromTo(mediaRef.current,
                    { opacity: 0, x: 40 * dir },
                    { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' }
                );
            },
        });
    }, [lightboxIdx, onNavigate]);

    const total = gallery.length;
    const item  = gallery[lightboxIdx];
    const videoId = item.type === 'video' ? getYouTubeId(item.src) : null;
    const autoplaySrc = videoId
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
        : null;

    return createPortal(
        <div ref={overlayRef} className="lightbox-overlay" onClick={handleClose}>
            <div className="lightbox-modal" onClick={e => e.stopPropagation()}>

                <div ref={mediaRef} className="lightbox-media">
                    {videoId ? (
                        <iframe
                            src={autoplaySrc}
                            title={item.caption}
                            className="lightbox-video"
                            allowFullScreen
                            allow="autoplay; encrypted-media"
                        />
                    ) : (
                        <img
                            src={item.src}
                            alt={item.caption ?? `Image ${lightboxIdx + 1}`}
                            className="lightbox-img"
                        />
                    )}
                </div>

                {total > 1 && (
                    <>
                        <button className="lightbox-nav lightbox-nav--prev" onClick={() => navigate((lightboxIdx - 1 + total) % total)} aria-label="Previous">
                            <Icon icon="fa-solid:caret-left" />
                        </button>
                        <button className="lightbox-nav lightbox-nav--next" onClick={() => navigate((lightboxIdx + 1) % total)} aria-label="Next">
                            <Icon icon="fa-solid:caret-right" />
                        </button>
                    </>
                )}

                <div className="lightbox-caption">
                    <span className="font-title uppercase tracking-[0.15em]">{item.caption ?? `Image ${lightboxIdx + 1}`}</span>
                </div>

            </div>
        </div>,
        document.body
    );
}

// ── Gallery ───────────────────────────────────────────────────────────────────

function ProjectGallery({ gallery = [] }) {
    const [activeIdx,    setActiveIdx]    = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const mediaRef = useRef(null);

    if (!gallery.length) return null;

    const total = gallery.length;
    const item  = gallery[activeIdx];
    const videoId = item.type === 'video' ? getYouTubeId(item.src) : null;
    const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

    const navigate = (nextIdx) => {
        if (nextIdx === activeIdx) return;
        const dir = nextIdx > activeIdx ? 1 : -1;
        gsap.to(mediaRef.current, {
            opacity: 0, x: -40 * dir, duration: 0.18, ease: 'power2.in',
            onComplete: () => {
                setActiveIdx(nextIdx);
                gsap.fromTo(mediaRef.current,
                    { opacity: 0, x: 40 * dir },
                    { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' }
                );
            },
        });
    };

    const prev = () => navigate((activeIdx - 1 + total) % total);
    const next = () => navigate((activeIdx + 1) % total);

    return (
        <section className="project-gallery">

            <div className="gallery-media-wrap">
                <div className="gallery-media" ref={mediaRef}>
                    {videoId ? (
                        /* Video — show thumbnail with play button */
                        <div className="gallery-video-thumb" onClick={() => setLightboxOpen(true)}>
                            <img src={thumbnail} alt={item.caption} className="gallery-img" />
                            <div className="gallery-play-btn">
                                <Icon icon="fa-solid:play" />
                            </div>
                        </div>
                    ) : (
                        /* Image — clickable for lightbox */
                        <img
                            src={item.src}
                            alt={item.caption ?? `Gallery image ${activeIdx + 1}`}
                            className="gallery-img gallery-img--clickable"
                            onClick={() => setLightboxOpen(true)}
                        />
                    )}
                </div>

                {total > 1 && (
                    <>
                        <button onClick={prev} className="gallery-nav-btn gallery-nav-btn--prev" aria-label="Previous image">
                            <Icon icon="fa-solid:caret-left" />
                        </button>
                        <button onClick={next} className="gallery-nav-btn gallery-nav-btn--next" aria-label="Next image">
                            <Icon icon="fa-solid:caret-right" />
                        </button>
                    </>
                )}

                <div className="gallery-caption-bar">
                    <span className="gallery-caption-text font-title uppercase">
                        {item.caption ?? `Image ${activeIdx + 1}`}
                    </span>
                    <span className="gallery-caption-index font-title">
                        {String(activeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                </div>
            </div>

            {lightboxOpen && (
                <Lightbox
                    gallery={gallery}
                    activeIdx={activeIdx}
                    onClose={() => setLightboxOpen(false)}
                    onNavigate={setActiveIdx}
                />
            )}

        </section>
    );
}

export default ProjectGallery;
