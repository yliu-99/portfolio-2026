// import dependencies
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';

// import styles — only the ::before overlay that Tailwind can't express
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

// ── PDF modal ─────────────────────────────────────────────────────────────────

function PdfModal({ src, onClose }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return createPortal(
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-[6px] z-9999 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative w-[90vw] h-[90vh] bg-white"
                onClick={e => e.stopPropagation()}
            >
                <button
                    className="absolute -top-10 right-0 bg-transparent border border-white/80 text-white w-8 h-8 flex items-center justify-center cursor-pointer text-base hover:bg-white/12"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <Icon icon="fa-solid:xmark" />
                </button>
                <iframe src={src} className="w-full h-full border-0 block" title="PDF viewer" />
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
    const hasPdfLink = !!section.pdfLink;

    if (isAudio) return (
        <div className="flex items-center justify-center w-full p-8">
            <audio
                controls
                className="w-full"
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
        <div
            className="group relative w-full aspect-3/4 overflow-hidden cursor-pointer border-2 border-black"
            onClick={onPdfOpen}
        >
            <iframe
                src={`${section.image}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                className="w-full h-full border-0 block pointer-events-none"
                title="PDF preview"
                tabIndex={-1}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[0.6rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
                <Icon icon="fa-solid:expand" className="text-[2rem] text-white" />
                <span className="font-title uppercase text-[clamp(0.75rem,1vw,0.9rem)] tracking-[0.18em] text-white">
                    View Document
                </span>
            </div>
        </div>
    );

    const mediaClass = 'w-full h-auto aspect-[4/3] object-contain object-center block';
    if (isMp4) return <video src={section.image} className={mediaClass} autoPlay loop muted playsInline />;

    // Image with an attached PDF — show the image but overlay a "View Document" indicator
    if (hasPdfLink) return (
        <div className="group relative w-full cursor-pointer" onClick={onPdfOpen}>
            <img src={section.image} alt={section.title} className={mediaClass} loading="lazy" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[0.6rem] bg-black/30 group-hover:bg-black/50 transition-colors duration-200">
                <Icon icon="fa-solid:file-pdf" className="text-[2rem] text-white" />
                <span className="font-title uppercase text-[clamp(0.75rem,1vw,0.9rem)] tracking-[0.18em] text-white">
                    View Style Guide
                </span>
            </div>
        </div>
    );

    return <img src={section.image} alt={section.title} className={mediaClass} loading="lazy" />;
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
        <section className="blue-multiply-overlay relative isolate w-full border-b-2 border-black max-[900px]:border-b-0">
            <div className="relative z-1 grid grid-cols-[55fr_45fr] min-h-dvh max-[900px]:grid-cols-1 max-[900px]:min-h-0">
                {section.image && (
                    <div className="relative flex items-center pt-12 pr-8 pb-12 pl-16 max-[900px]:py-10 max-[900px]:px-6">
                        {renderFirstMedia(section, 'w-full h-auto aspect-[4/3] object-contain object-center block')}
                    </div>
                )}
                <div className="p-16 flex flex-col justify-center gap-7 max-[900px]:px-8 max-[900px]:py-12">
                    <span data-aos="fade-up" className="block font-title uppercase text-white leading-none tracking-[0.15em] text-[clamp(1.1rem,1.8vw,1.5rem)]">
                        {section.title}
                    </span>
                    <div data-aos="fade-up" data-aos-delay="100">
                        <BodyText
                            text={section.body}
                            className="font-body leading-[1.85] m-0 text-white text-[clamp(1.05rem,1.4vw,1.25rem)] max-w-[60ch] max-[900px]:max-w-full"
                        />
                    </div>
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

        // ── Desktop: pin section, pop cards in consecutively as user scrolls ─
        mm.add('(min-width: 1024px)', () => {
            const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);
            if (!cards.length) return;

            gsap.set(cards, { opacity: 0, scale: 0.88, y: 20 });

            const fired      = [false, false, false];
            const thresholds = [0.25, 0.55, 0.85];

            const popCard = (idx) => {
                if (!cards[idx] || fired[idx]) return;
                fired[idx] = true;
                gsap.to(cards[idx], { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.4)' });
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

        // ── Mobile: fade keypoint paragraphs in as they enter the viewport ────
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

    // Inner layout: 2-col grid on desktop when keypoints present, centred flex otherwise
    const innerClass = [
        'relative z-1 w-full py-20 px-16 max-[900px]:py-14 max-[900px]:px-8',
        hasKeypoints
            ? 'flex flex-col items-center text-center gap-7 lg:grid lg:grid-cols-2 lg:items-center lg:gap-20 lg:max-w-[1300px] lg:mx-auto lg:text-left'
            : 'flex flex-col items-center text-center gap-7 max-w-[900px] mx-auto',
    ].join(' ');

    const cardClass = 'bg-white border-2 border-black px-7 py-6';
    const cardTextClass = 'font-body text-black leading-[1.7] m-0 text-[clamp(0.88rem,1.05vw,1rem)]';

    return (
        <section ref={wrapRef} className="blue-multiply-overlay relative isolate w-full min-h-dvh flex items-center justify-center">
            <div className={innerClass}>

                {/* Left — label + body + mobile keypoints */}
                <div className="flex flex-col items-center text-center gap-7 lg:items-start lg:text-left">
                    <span data-aos="fade-up" className="block font-title uppercase text-white leading-none tracking-[0.15em] text-[clamp(1.1rem,1.8vw,1.5rem)]">
                        {section.title}
                    </span>
                    <div data-aos="fade-up" data-aos-delay="100">
                        <BodyText
                            text={section.body}
                            className="font-body leading-[1.85] m-0 text-white text-[clamp(1.05rem,1.4vw,1.25rem)] max-w-[60ch] max-[900px]:max-w-full"
                        />
                    </div>
                    {hasKeypoints && (
                        <div className="flex flex-col gap-3 w-full lg:hidden">
                            {keypoints.map((kp, i) => (
                                <p
                                    key={i}
                                    ref={el => { kpMobRefs.current[i] = el; }}
                                    className="font-body text-white leading-[1.75] border-l-2 border-white/50 pl-4 text-left text-[clamp(0.95rem,1.3vw,1.1rem)]"
                                >
                                    {kp}
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right — keypoint cards, desktop only */}
                {hasKeypoints && (
                    <div className="hidden lg:flex lg:flex-col lg:gap-6">
                        {keypoints[0] && (
                            <div ref={card1Ref} className={cardClass}>
                                <p className={cardTextClass}>{keypoints[0]}</p>
                            </div>
                        )}
                        {keypoints[1] && (
                            <div ref={card2Ref} className={cardClass}>
                                <p className={cardTextClass}>{keypoints[1]}</p>
                            </div>
                        )}
                        {keypoints[2] && (
                            <div ref={card3Ref} className={cardClass}>
                                <p className={cardTextClass}>{keypoints[2]}</p>
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
    const stRef      = useRef(null);
    const mobileRef  = useRef(null);

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
                if (stRef.current) { stRef.current.kill(); stRef.current = null; }

                const scrollDist = section.offsetWidth * (panels - 1);
                const holdDist   = window.innerHeight * 0.4;
                const tl = gsap.timeline();
                tl.to(track, { x: 0, ease: 'none', duration: holdDist });
                tl.to(track, { x: -scrollDist, ease: 'none', duration: scrollDist });

                stRef.current = ScrollTrigger.create({
                    animation:  tl,
                    trigger:    section,
                    pin:        true,
                    pinSpacing: true,
                    start:      'top top',
                    end:        `+=${scrollDist + holdDist}`,
                    scrub:      1.2,
                    onUpdate: self => {
                        const idx = Math.round(self.progress * (panels - 1));
                        setActiveIdx(prev => prev !== idx ? idx : prev);
                    },
                });
            };

            build();

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

        if (stRef.current) {
            const st       = stRef.current;
            const progress = idx / (middle.length - 1);
            window.scrollTo({ top: st.start + progress * (st.end - st.start), behavior: 'smooth' });
            return;
        }

        const nextImg     = middle[idx]?.image ?? '';
        const isNextImage = nextImg && !/\.(pdf|mp4|mp3|m4a|wav|ogg)$/i.test(nextImg);
        const preload     = isNextImage
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

    const tabBase = 'font-title uppercase cursor-pointer border-2 border-blue px-[1.68rem] py-[0.72rem] text-[clamp(0.9rem,1.32vw,1.08rem)] tracking-[0.18em] transition-colors duration-150 max-[900px]:w-full max-[900px]:text-center';

    return (
        <>
            {/* ── First section: blue bg, image left ────────────────────── */}
            <FirstSection section={first} />

            {/* ── Tabbed middle sections ────────────────────────────────── */}
            {middle.length > 0 && (
                <section ref={sectionRef} className="bg-white w-full border-b-2 border-black lg:flex lg:flex-col lg:min-h-dvh">

                    <div className="flex flex-wrap gap-3 pt-8 px-16 pb-5 lg:pt-20 lg:justify-center max-[900px]:pt-6 max-[900px]:px-6 max-[900px]:pb-4 max-[900px]:gap-2">
                        {middle.map((sec, i) => (
                            <button
                                key={i}
                                onClick={() => handleTabClick(i)}
                                className={`${tabBase} ${i === activeIdx ? 'bg-blue text-white' : 'bg-white text-blue hover:bg-blue/6'}`}
                            >
                                {sec.title}
                            </button>
                        ))}
                    </div>

                    {/* Desktop: all panels in clipped horizontal track, GSAP translates X.
                        Mobile:  only the active panel is shown. */}
                    <div className="overflow-hidden lg:flex-1">
                        <div ref={trackRef} className="flex h-full will-change-transform max-lg:block max-lg:h-auto">
                            {middle.map((sec, i) => (
                                <div
                                    key={i}
                                    ref={i === activeIdx ? mobileRef : null}
                                    className={`shrink-0 basis-full w-full h-full grid grid-cols-[45fr_55fr] max-lg:h-auto max-[900px]:grid-cols-1 ${i !== activeIdx ? 'max-lg:hidden' : ''}`}
                                >
                                    <div className="px-16 py-14 flex flex-col justify-center gap-5 lg:pt-8 max-[900px]:px-6 max-[900px]:py-10 max-[900px]:col-span-full">
                                        <div data-aos="fade-up">
                                            <BodyText
                                                text={sec.body}
                                                className="font-body text-black leading-[1.85] m-0 text-[clamp(1.05rem,1.4vw,1.25rem)] max-w-[60ch] max-[900px]:max-w-full"
                                            />
                                        </div>
                                    </div>
                                    {sec.image && (
                                        <div className="flex items-center pt-12 pr-16 pb-12 pl-8 max-[900px]:pt-0 max-[900px]:px-6 max-[900px]:pb-8">
                                            <PanelMedia
                                                section={sec}
                                                onPdfOpen={() => setPdfSrc(sec.pdfLink ?? sec.image)}
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
