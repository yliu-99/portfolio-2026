// import dependencies
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { Icon } from '@iconify/react';

// import styles
import './ProjectGallery.scss';

// ── Helpers ────────────────────────────────────────────────────────────────────

function getYouTubeId(src) {
    const match = src?.match(/youtube\.com\/embed\/([^?&]+)/);
    return match ? match[1] : null;
}

function getThumb(item) {
    const videoId = item.type === 'video' ? getYouTubeId(item.src) : null;
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : item.src;
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({ gallery, activeIdx, onClose, onNavigate }) {
    const overlayRef = useRef(null);
    const mediaRef   = useRef(null);

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
        const dir      = nextIdx > activeIdx ? 1 : -1;
        const nextSrc  = getThumb(gallery[nextIdx]);
        const preload  = nextSrc
            ? new Promise(res => { const i = new Image(); i.onload = res; i.onerror = res; i.src = nextSrc; })
            : Promise.resolve();
        const anim = new Promise(res => {
            gsap.to(mediaRef.current, { opacity: 0, x: -40 * dir, duration: 0.15, ease: 'power2.in', onComplete: res });
        });
        Promise.all([anim, preload]).then(() => {
            onNavigate(nextIdx);
            gsap.fromTo(mediaRef.current,
                { opacity: 0, x: 40 * dir },
                { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' }
            );
        });
    }, [activeIdx, onNavigate, gallery]);

    const total   = gallery.length;
    const item    = gallery[activeIdx];
    const videoId = item.type === 'video' ? getYouTubeId(item.src) : null;

    return createPortal(
        <div ref={overlayRef} className="lightbox-overlay" onClick={handleClose}>
            <div className="lightbox-modal" onClick={e => e.stopPropagation()}>
                <div ref={mediaRef} className="lightbox-media">
                    {videoId ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                            title={item.caption}
                            className="lightbox-video"
                            allowFullScreen
                            allow="autoplay; encrypted-media"
                        />
                    ) : (
                        <img
                            src={item.src}
                            alt={item.caption ?? `Image ${activeIdx + 1}`}
                            className="lightbox-img"
                        />
                    )}
                </div>
                {total > 1 && (
                    <>
                        <button className="lightbox-nav lightbox-nav--prev" onClick={() => navigate((activeIdx - 1 + total) % total)} aria-label="Previous">
                            <Icon icon="fa-solid:caret-left" />
                        </button>
                        <button className="lightbox-nav lightbox-nav--next" onClick={() => navigate((activeIdx + 1) % total)} aria-label="Next">
                            <Icon icon="fa-solid:caret-right" />
                        </button>
                    </>
                )}
                <div className="lightbox-caption">
                    <span className="font-title uppercase tracking-[0.15em]">{item.caption ?? `Image ${activeIdx + 1}`}</span>
                </div>
            </div>
        </div>,
        document.body
    );
}

// ── Horizontal scroll gallery (scroll-driven via parent ScrollTrigger) ────────
//
//  .h-gallery-clip   clips overflow so the track's off-screen images stay hidden
//  .h-gallery-track  translateX is animated by RevealBlock's ScrollTrigger phase 2

function HorizontalGallery({ items, onOpen }) {
    return (
        <div className="h-gallery-clip">
            <div className="h-gallery-track">
                {items.map((item, i) => {
                    const videoId = item.type === 'video' ? getYouTubeId(item.src) : null;
                    const src     = getThumb(item);

                    return (
                        <div
                            key={i}
                            className="h-gallery__item"
                            onClick={() => onOpen(i)}
                        >
                            <img src={src} alt={item.caption ?? ''} className="h-gallery__img" />
                            {videoId && (
                                <div className="h-gallery__play">
                                    <Icon icon="fa-solid:play" />
                                </div>
                            )}
                            {item.caption && (
                                <div className="h-gallery__caption">
                                    <span className="font-title uppercase">{item.caption}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ── Secondary grid item ───────────────────────────────────────────────────────

function GalleryItem({ item, globalIdx, onClick }) {
    const videoId = item.type === 'video' ? getYouTubeId(item.src) : null;
    const src     = getThumb(item);

    return (
        <div className="gallery-item" onClick={() => onClick(globalIdx)}>
            <img src={src} alt={item.caption ?? ''} className="gallery-item__img" />
            {videoId && (
                <div className="gallery-item__play">
                    <Icon icon="fa-solid:play" />
                </div>
            )}
            {item.caption && (
                <div className="gallery-item__caption">
                    <span className="font-title uppercase">{item.caption}</span>
                </div>
            )}
        </div>
    );
}

// ── Gallery ───────────────────────────────────────────────────────────────────

function ProjectGallery({ gallery = [] }) {
    const [lightboxIdx, setLightboxIdx] = useState(null);

    if (!gallery.length) return null;

    // Split on featured flag; if no flags exist, treat all as featured
    const hasFeaturedFlag = gallery.some(item => item.featured);
    const featured  = hasFeaturedFlag ? gallery.filter(item => item.featured)  : gallery;
    const secondary = hasFeaturedFlag ? gallery.filter(item => !item.featured) : [];

    // Map secondary items back to their original index for the lightbox
    const secondaryIndices = gallery
        .map((item, i) => ({ item, i }))
        .filter(({ item }) => hasFeaturedFlag ? !item.featured : false)
        .map(({ i }) => i);

    return (
        <section className="project-gallery">

            {/* ── Featured: horizontal scroll with zoom ──────────────── */}
            <HorizontalGallery
                items={featured}
                onOpen={setLightboxIdx}
            />

            {/* ── Secondary items ──────────────────────────────────────── */}
            {secondary.length > 0 && (
                <div className="gallery-secondary">
                    <div className="gallery-secondary__header border-t-2 border-black">
                        <span className="font-title uppercase">More</span>
                    </div>
                    <div className="gallery-secondary__grid">
                        {secondary.map((item, i) => (
                            <GalleryItem
                                key={i}
                                item={item}
                                globalIdx={secondaryIndices[i]}
                                onClick={setLightboxIdx}
                            />
                        ))}
                    </div>
                </div>
            )}

            {lightboxIdx !== null && (
                <Lightbox
                    gallery={gallery}
                    activeIdx={lightboxIdx}
                    onClose={() => setLightboxIdx(null)}
                    onNavigate={setLightboxIdx}
                />
            )}

        </section>
    );
}

export default ProjectGallery;
