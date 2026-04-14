// import dependencies
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';

// import styles
import './ProjectContent.scss';

gsap.registerPlugin(ScrollTrigger);

const PLACEHOLDER_BODY = 'Content coming soon — check back later.';

// ── Body text — splits on double newlines for multi-paragraph support ─────────

function BodyText({ text, className }) {
    const paragraphs = (text || PLACEHOLDER_BODY).split(/\n\n+/).filter(p => p.trim());
    return paragraphs.map((para, i) => (
        <p key={i} className={className}>{para.trim()}</p>
    ));
}

// ── PDF popup ─────────────────────────────────────────────────────────────────

function PdfModal({ src, onClose }) {
    return createPortal(
        <div className="pdf-overlay" onClick={onClose}>
            <div className="pdf-modal" onClick={e => e.stopPropagation()}>
                <button className="pdf-close" onClick={onClose} aria-label="Close">
                    <Icon icon="fa-solid:xmark" />
                </button>
                <iframe src={src} className="pdf-frame" title="PDF viewer" />
            </div>
        </div>,
        document.body
    );
}

// ── Per-panel media renderer ──────────────────────────────────────────────────

function PanelMedia({ section, onPdfOpen }) {
    if (!section.image) return null;
    const isPdf   = /\.pdf$/i.test(section.image);
    const isMp4   = /\.mp4$/i.test(section.image);
    const isAudio = /\.(mp3|m4a|wav|ogg)$/i.test(section.image);

    if (isAudio) return (
        <div className="content-audio-wrap">
            <audio
                controls
                className="content-audio"
                src={section.image}
                onPlay={section.startTime ? e => {
                    if (!e.currentTarget.dataset.seeked) {
                        e.currentTarget.currentTime = section.startTime;
                        e.currentTarget.dataset.seeked = '1';
                    }
                } : undefined}
            />
        </div>
    );

    if (isPdf) return (
        <div className="content-pdf-preview" onClick={onPdfOpen}>
            <iframe
                src={`${section.image}#toolbar=0&navpanes=0&scrollbar=0`}
                className="content-pdf-frame"
                title="PDF preview"
                tabIndex={-1}
            />
            <div className="content-pdf-overlay">
                <Icon icon="fa-solid:expand" className="content-pdf-icon" />
                <span className="font-title uppercase">View Document</span>
            </div>
        </div>
    );

    if (isMp4) return <video src={section.image} className="content-img" autoPlay loop muted playsInline />;

    return <img src={section.image} alt={section.title} className="content-img" />;
}

// ── First section — blue bg, image LEFT, multiply ─────────────────────────────

function renderFirstMedia(section, className) {
    const isMp4 = /\.mp4$/i.test(section.image ?? '');
    if (!section.image) return null;
    return isMp4
        ? <video src={section.image} className={className} autoPlay loop muted playsInline />
        : <img src={section.image} alt={section.title} className={className} />;
}

function FirstSection({ section }) {
    return (
        <section className="project-first-section border-b-2 border-black">
            <div className="first-section-inner">
                {section.image && (
                    <div className="first-section-media">
                        {renderFirstMedia(section, 'first-section-img')}
                    </div>
                )}
                <div className="first-section-text">
                    <span className="first-section-label font-title uppercase">{section.title}</span>
                    <BodyText text={section.body} className="font-body leading-relaxed m-0" />
                </div>
            </div>
        </section>
    );
}

// ── Last section ──────────────────────────────────────────────────────────────

function LastSection({ section }) {
    const wrapRef   = useRef(null);
    const card1Ref  = useRef(null);
    const card2Ref  = useRef(null);
    const card3Ref  = useRef(null);
    const kpMobRefs = useRef([]);

    const keypoints    = section.keypoints ?? [];
    const hasKeypoints = keypoints.length > 0;

    useEffect(() => {
        if (!hasKeypoints) return;

        const mm = gsap.matchMedia();

        // ── Desktop: pin section, pop cards in as user scrolls ───────────────
        mm.add('(min-width: 1024px)', () => {
            const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);
            if (!cards.length) return;

            // Each card has its own resting rotation + x offset for an organic look
            const resting = [
                { rotation: -3.5, x: 10  },   // card 1 — left col, tilts counter-clockwise
                { rotation:  2.2, x: -16 },   // card 2 — right col top, tilts clockwise
                { rotation: -1.6, x: 20  },   // card 3 — right col bottom, slight tilt
            ];

            cards.forEach((card, i) => {
                // Start hidden, already at resting rotation so it pops in place
                gsap.set(card, {
                    opacity: 0, scale: 0.82, y: 24,
                    rotation: resting[i].rotation * 2,   // enter with doubled tilt, settle to half
                    x: resting[i].x,
                });
            });

            const fired      = [false, false, false];
            const thresholds = [0.25, 0.55, 0.85];

            const popCard = (idx) => {
                if (!cards[idx] || fired[idx]) return;
                fired[idx] = true;
                gsap.to(cards[idx], {
                    opacity: 1, scale: 1, y: 0,
                    rotation: resting[idx].rotation,
                    x: resting[idx].x,
                    duration: 0.55,
                    ease: 'back.out(1.5)',
                });
            };

            let st;
            const frame = requestAnimationFrame(() => {
                if (!wrapRef.current) return;
                st = ScrollTrigger.create({
                    trigger:             wrapRef.current,
                    pin:                 true,
                    pinSpacing:          true,
                    start:               'top top',
                    end:                 () => `+=${window.innerHeight * 2}`,
                    invalidateOnRefresh: true,
                    onUpdate:            self => thresholds.forEach((t, i) => { if (self.progress >= t) popCard(i); }),
                });
            });

            return () => { cancelAnimationFrame(frame); if (st) st.kill(); };
        });

        // ── Mobile: fade in keypoint paragraphs as they enter the viewport ───
        mm.add('(max-width: 1023px)', () => {
            const items = kpMobRefs.current.filter(Boolean);
            if (!items.length) return;

            gsap.set(items, { opacity: 0, y: 12 });
            const triggers = items.map(el =>
                ScrollTrigger.create({
                    trigger: el,
                    start:   'top 90%',
                    onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }),
                })
            );

            return () => triggers.forEach(t => t.kill());
        });

        return () => mm.revert();
    }, [hasKeypoints]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section ref={wrapRef} className="project-last-section">
            <div className={`last-section-inner${hasKeypoints ? ' last-section-inner--kp' : ''}`}>

                {/* Left column — card 1 (desktop only) */}
                {hasKeypoints && (
                    <div className="last-kp-col">
                        {keypoints[0] && (
                            <div ref={card1Ref} className="keypoint-card">
                                <p className="keypoint-card__text font-body">{keypoints[0]}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Centre — label + body text + mobile keypoints */}
                <div className="last-section-center">
                    <span className="last-section-label font-title uppercase">{section.title}</span>
                    <BodyText text={section.body} className="font-body leading-relaxed m-0" />
                    {hasKeypoints && (
                        <div className="last-kp-mobile">
                            {keypoints.map((kp, i) => (
                                <p
                                    key={i}
                                    ref={el => { kpMobRefs.current[i] = el; }}
                                    className="keypoint-mobile font-body"
                                >
                                    {kp}
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right column — cards 2 & 3 (desktop only) */}
                {hasKeypoints && (
                    <div className="last-kp-col">
                        {keypoints[1] && (
                            <div ref={card2Ref} className="keypoint-card">
                                <p className="keypoint-card__text font-body">{keypoints[1]}</p>
                            </div>
                        )}
                        {keypoints[2] && (
                            <div ref={card3Ref} className="keypoint-card">
                                <p className="keypoint-card__text font-body">{keypoints[2]}</p>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </section>
    );
}

// ── Main component ────────────────────────────────────────────────────────────

function ProjectContent({ sections = [] }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [pdfSrc,    setPdfSrc]    = useState(null);

    const sectionRef = useRef(null);
    const trackRef   = useRef(null);
    const stRef      = useRef(null);   // ScrollTrigger instance (desktop only)
    const mobileRef  = useRef(null);   // mobile fade target

    if (!sections.length) return null;

    const first  = sections[0];
    const last   = sections.length > 1 ? sections[sections.length - 1] : null;
    const middle = sections.length > 2 ? sections.slice(1, sections.length - 1) : [];

    // ── Desktop scroll-driven horizontal panel transitions ────────────────────
    useEffect(() => {
        if (middle.length <= 1) return;

        const mm = gsap.matchMedia();

        mm.add('(min-width: 1024px)', () => {
            const section = sectionRef.current;
            const track   = trackRef.current;
            if (!section || !track) return;

            const panels = middle.length;

            const build = () => {
                // Kill the previous ScrollTrigger before rebuilding
                if (stRef.current) { stRef.current.kill(); stRef.current = null; }

                // Total horizontal distance to translate the track
                const scrollDist = section.offsetWidth * (panels - 1);

                const tl = gsap.timeline();
                tl.to(track, { x: -scrollDist, ease: 'none' });

                stRef.current = ScrollTrigger.create({
                    animation:   tl,
                    trigger:     section,
                    pin:         true,
                    pinSpacing:  true,
                    start:       'top top',
                    end:         `+=${scrollDist}`,
                    scrub:       0.8,
                    // Snap cleanly to each panel boundary
                    snap: {
                        snapTo:   1 / (panels - 1),
                        duration: { min: 0.2, max: 0.5 },
                        ease:     'power2.inOut',
                    },
                    onUpdate: self => {
                        const idx = Math.round(self.progress * (panels - 1));
                        setActiveIdx(prev => prev !== idx ? idx : prev);
                    },
                });
            };

            build();

            // Rebuild after resize so scroll distance stays accurate
            let resizeTimer;
            const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 200); };
            window.addEventListener('resize', onResize);

            return () => {
                clearTimeout(resizeTimer);
                window.removeEventListener('resize', onResize);
                if (stRef.current) { stRef.current.kill(); stRef.current = null; }
            };
        });

        return () => mm.revert();
    }, [middle.length]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Tab click ─────────────────────────────────────────────────────────────
    const handleTabClick = (idx) => {
        if (idx === activeIdx) return;
        setPdfSrc(null);

        // Desktop: scroll to the snap point that corresponds to this tab
        if (stRef.current) {
            const st       = stRef.current;
            const progress = idx / (middle.length - 1);
            window.scrollTo({ top: st.start + progress * (st.end - st.start), behavior: 'smooth' });
            return;
        }

        // Mobile: fade the visible panel out, swap, fade in
        const nextImg      = middle[idx]?.image ?? '';
        const isNextImage  = nextImg && !/\.(pdf|mp4|mp3|m4a|wav|ogg)$/i.test(nextImg);
        const preload      = isNextImage
            ? new Promise(res => { const i = new Image(); i.onload = res; i.onerror = res; i.src = nextImg; })
            : Promise.resolve();

        const anim = new Promise(res => {
            gsap.to(mobileRef.current, { opacity: 0, y: 8, duration: 0.12, ease: 'power2.in', onComplete: res });
        });

        Promise.all([anim, preload]).then(() => {
            setActiveIdx(idx);
            gsap.fromTo(mobileRef.current,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
            );
        });
    };

    return (
        <>
            {/* ── First section: blue bg, image left ────────────────────── */}
            <FirstSection section={first} />

            {/* ── Tabbed middle sections ────────────────────────────────── */}
            {middle.length > 0 && (
                <section ref={sectionRef} className="project-content border-b-2 border-black">

                    <div className="content-tab-nav">
                        {middle.map((sec, i) => (
                            <button
                                key={i}
                                onClick={() => handleTabClick(i)}
                                className={`content-tab font-title uppercase ${i === activeIdx ? 'content-tab--active' : ''}`}
                            >
                                {sec.title}
                            </button>
                        ))}
                    </div>

                    {/* Desktop: all panels side-by-side in a clipped horizontal track.
                        Mobile:  only the active panel shown (content-panel--active). */}
                    <div className="content-track-clip">
                        <div ref={trackRef} className="content-track">
                            {middle.map((sec, i) => (
                                <div
                                    key={i}
                                    ref={i === activeIdx ? mobileRef : null}
                                    className={`content-panel${i === activeIdx ? ' content-panel--active' : ''}`}
                                >
                                    <div className="content-text">
                                        <BodyText text={sec.body} className="font-body text-black leading-relaxed m-0" />
                                    </div>
                                    {sec.image && (
                                        <div className="content-image">
                                            <PanelMedia
                                                section={sec}
                                                onPdfOpen={() => setPdfSrc(sec.image)}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {pdfSrc && <PdfModal src={pdfSrc} onClose={() => setPdfSrc(null)} />}

                </section>
            )}

            {/* ── Last section ──────────────────────────────────────────── */}
            {last && <LastSection section={last} />}
        </>
    );
}

export default ProjectContent;
