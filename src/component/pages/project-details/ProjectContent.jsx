// import dependencies
import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { Icon } from '@iconify/react';

// import styles
import './ProjectContent.scss';

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

// ── Shared media renderer ─────────────────────────────────────────────────────

function renderMedia(section, className) {
    const isMp4 = /\.mp4$/i.test(section.image ?? '');
    if (!section.image) return null;
    return isMp4
        ? <video src={section.image} className={className} autoPlay loop muted playsInline />
        : <img src={section.image} alt={section.title} className={className} />;
}

// ── First section — blue bg, image LEFT, multiply ─────────────────────────────

function FirstSection({ section }) {
    return (
        <section className="project-first-section border-b-2 border-black">
            <div className="first-section-inner">
                {section.image && (
                    <div className="first-section-media">
                        {renderMedia(section, 'first-section-img')}
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

// ── Last section — no image, beige conclusion ─────────────────────────────────

function LastSection({ section }) {
    return (
        <section className="project-last-section border-b-2 border-black">
            <div className="last-section-inner">
                <span className="last-section-label font-title uppercase">{section.title}</span>
                <BodyText text={section.body} className="font-body leading-relaxed m-0" />
            </div>
        </section>
    );
}

// ── Main component ────────────────────────────────────────────────────────────

function ProjectContent({ sections = [] }) {
    const [activeIdx,  setActiveIdx]  = useState(0);
    const [pdfOpen,    setPdfOpen]    = useState(false);
    const panelRef = useRef(null);

    if (!sections.length) return null;

    const first  = sections[0];
    const last   = sections.length > 1 ? sections[sections.length - 1] : null;
    const middle = sections.length > 2 ? sections.slice(1, sections.length - 1) : [];

    const active  = middle[activeIdx];
    const isPdf   = /\.pdf$/i.test(active?.image ?? '');
    const isMp4   = /\.mp4$/i.test(active?.image ?? '');
    const isAudio = /\.(mp3|m4a|wav|ogg)$/i.test(active?.image ?? '');

    const handleTabClick = (idx) => {
        if (idx === activeIdx) return;
        setPdfOpen(false);

        const nextImg = middle[idx].image ?? '';
        const isNextImage = nextImg && !/\.(pdf|mp4|mp3|m4a|wav|ogg)$/i.test(nextImg);

        const preload = isNextImage
            ? new Promise(res => { const i = new Image(); i.onload = res; i.onerror = res; i.src = nextImg; })
            : Promise.resolve();

        const anim = new Promise(res => {
            gsap.to(panelRef.current, { opacity: 0, y: 8, duration: 0.12, ease: 'power2.in', onComplete: res });
        });

        Promise.all([anim, preload]).then(() => {
            setActiveIdx(idx);
            gsap.fromTo(panelRef.current,
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
                <section className="project-content border-b-2 border-black">

                    {/* Process section header */}
                    <div className="content-process-header border-b-2 border-black">
                        <span className="font-title uppercase">Process</span>
                    </div>

                    <div className="content-tab-nav">
                        {middle.map((section, i) => (
                            <button
                                key={i}
                                onClick={() => handleTabClick(i)}
                                className={`content-tab font-title uppercase ${i === activeIdx ? 'content-tab--active' : ''}`}
                            >
                                {section.title}
                            </button>
                        ))}
                    </div>

                    {active && (
                        <div ref={panelRef} className="content-body">

                            <div className="content-text">
                                <BodyText text={active.body} className="font-body text-black leading-relaxed m-0" />
                            </div>

                            {active.image && (
                                <div className="content-image">
                                    {isAudio ? (
                                        <div className="content-audio-wrap">
                                            <audio
                                                controls
                                                className="content-audio"
                                                src={active.image}
                                                onPlay={active.startTime ? (e) => {
                                                    const el = e.currentTarget;
                                                    if (!el.dataset.seeked) {
                                                        el.currentTime = active.startTime;
                                                        el.dataset.seeked = '1';
                                                    }
                                                } : undefined}
                                            />
                                        </div>
                                    ) : isPdf ? (
                                        <div className="content-pdf-preview" onClick={() => setPdfOpen(true)}>
                                            <iframe
                                                src={`${active.image}#toolbar=0&navpanes=0&scrollbar=0`}
                                                className="content-pdf-frame"
                                                title="PDF preview"
                                                tabIndex={-1}
                                            />
                                            <div className="content-pdf-overlay">
                                                <Icon icon="fa-solid:expand" className="content-pdf-icon" />
                                                <span className="font-title uppercase">View Document</span>
                                            </div>
                                        </div>
                                    ) : isMp4 ? (
                                        <video src={active.image} className="content-img" autoPlay loop muted playsInline />
                                    ) : (
                                        <img src={active.image} alt={active.title} className="content-img" />
                                    )}
                                </div>
                            )}

                        </div>
                    )}

                    {pdfOpen && <PdfModal src={active.image} onClose={() => setPdfOpen(false)} />}

                </section>
            )}

            {/* ── Last section: no image ─────────────────────────────────── */}
            {last && <LastSection section={last} />}
        </>
    );
}

export default ProjectContent;
