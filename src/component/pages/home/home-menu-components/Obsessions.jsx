import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '../../../../data/icons';
import MenuTemplate from './MenuTemplate';
import { OBSESSIONS } from '../../../../data/component-data/obsessionsData';


// ── Detail modal ──────────────────────────────────────────────────────────────

function DetailModal({ item, onClose }) {
    const overlayRef = useRef(null);
    const cardRef    = useRef(null);

    useEffect(() => {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' });
        gsap.fromTo(cardRef.current, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.4)' });
    }, []);

    const handleClose = useCallback(() => {
        gsap.to(cardRef.current,    { scale: 0.94, opacity: 0, duration: 0.18, ease: 'power2.in' });
        gsap.to(overlayRef.current, { opacity: 0,  duration: 0.2,  ease: 'power2.in', onComplete: onClose });
    }, [onClose]);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [handleClose]);

    return createPortal(
        <div
            ref={overlayRef}
            className="fixed inset-0 bg-black/75 z-1000 flex items-center justify-center cursor-pointer"
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
                className="bg-white border-2 border-black max-w-2xl w-[90vw] cursor-default font-title uppercase overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {item.img && (
                    <img src={item.img} alt={item.title} className="w-full aspect-video object-cover block" />
                )}
                <div className="p-10">
                    <p className="text-sm tracking-[0.12em] opacity-50 mb-3">{item.category}</p>
                    <h2 className="text-red text-h3 leading-tight tracking-[0.04em] mb-6 flex items-baseline gap-3">
                        {item.title}
                        {item.nativeTitle && (
                            <span className="font-cjk tracking-normal">{item.nativeTitle}</span>
                        )}
                    </h2>
                    <p className="font-body normal-case text-base leading-relaxed tracking-[0.03em] opacity-70">
                        {item.detail}
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
}


// ── Obsessions ────────────────────────────────────────────────────────────────

function Obsessions() {
    const [index,     setIndex]     = useState(0);
    const [active,    setActive]    = useState(null);
    const [paused,    setPaused]    = useState(false);
    const contentRef  = useRef(null);
    const prevIndexRef = useRef(0);

    const item = OBSESSIONS[index];

    // Slide animation on index change
    useEffect(() => {
        const dir = index > prevIndexRef.current ? 1 : -1;
        prevIndexRef.current = index;
        const el = contentRef.current;
        gsap.fromTo(el,
            { x: dir * 40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
    }, [index]);

    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => {
            setIndex(i => (i + 1) % OBSESSIONS.length);
        }, 4000);
        return () => clearInterval(id);
    }, [paused]);

    return (
        <MenuTemplate title="Latest Obsession">
            <div
                className="flex flex-col items-center gap-3 w-full overflow-hidden"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div ref={contentRef} className="flex flex-col items-center gap-3 w-full">
                    {/* Clickable title */}
                    <button
                        className="font-title uppercase text-red text-h5 leading-tight tracking-secondary text-center cursor-pointer hover:opacity-70 transition-opacity duration-150 min-h-[3.35rem] flex items-center justify-center gap-2"
                        onClick={() => setActive(item)}
                        aria-label={`Learn more about ${item.title}`}
                    >
                        {item.title}
                        {item.nativeTitle && (
                            <span className="font-cjk tracking-normal">{item.nativeTitle}</span>
                        )}
                        <FontAwesomeIcon icon={faUpRightFromSquare} className="text-[0.65rem] opacity-60 shrink-0" />
                    </button>

                    {/* Category */}
                    <p className="text-[0.85rem] tracking-[0.12em] opacity-50">{item.category}</p>

                    {/* Image */}
                    <div className="w-full aspect-video bg-[#e8e8e8] overflow-hidden">
                        {item.img
                            ? <img src={item.img} alt={item.title} className="w-full h-full object-cover block" />
                            : <div className="w-full h-full bg-linear-to-br from-[#e0e0e0] to-[#ccc]" />
                        }
                    </div>
                </div>

                {/* Pagination dots */}
                <div className="flex items-center gap-2 mt-1">
                    {OBSESSIONS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setIndex(i); setPaused(false); }}
                            aria-label={`Go to obsession ${i + 1}`}
                            className={`w-2 h-2 rounded-full transition-colors duration-150 ${i === index ? 'bg-black' : 'bg-black/25'}`}
                        />
                    ))}
                </div>
            </div>

            {active && <DetailModal item={active} onClose={() => setActive(null)} />}
        </MenuTemplate>
    );
}

export default Obsessions;
