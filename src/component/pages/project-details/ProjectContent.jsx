// import dependencies
import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { Icon } from '@iconify/react';

// import styles
import './ProjectContent.scss';

const PLACEHOLDER_BODY = 'Content coming soon — check back later.';

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

// ── Content ───────────────────────────────────────────────────────────────────

function ProjectContent({ sections = [] }) {
    const [activeIdx,  setActiveIdx]  = useState(0);
    const [pdfOpen,    setPdfOpen]    = useState(false);
    const panelRef = useRef(null);

    if (!sections.length) return null;

    const active  = sections[activeIdx];
    const isPdf   = /\.pdf$/i.test(active.image ?? '');
    const isMp4   = /\.mp4$/i.test(active.image ?? '');

    const handleTabClick = (idx) => {
        if (idx === activeIdx) return;
        setPdfOpen(false);
        gsap.to(panelRef.current, {
            opacity: 0, y: 8, duration: 0.12, ease: 'power2.in',
            onComplete: () => {
                setActiveIdx(idx);
                gsap.fromTo(panelRef.current,
                    { opacity: 0, y: 8 },
                    { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
                );
            },
        });
    };

    return (
        <section className="project-content border-b-2 border-black">

            {/* ── Tab nav ───────────────────────────────────────────────── */}
            <div className="content-tab-nav">
                {sections.map((section, i) => (
                    <button
                        key={i}
                        onClick={() => handleTabClick(i)}
                        className={`content-tab font-title uppercase ${i === activeIdx ? 'content-tab--active' : ''}`}
                    >
                        {section.title}
                    </button>
                ))}
            </div>

            {/* ── Body ──────────────────────────────────────────────────── */}
            <div ref={panelRef} className="content-body">

                <div className="content-text">
                    <p className="font-body text-black leading-relaxed m-0">
                        {active.body || PLACEHOLDER_BODY}
                    </p>
                </div>

                {active.image && (
                    <div className="content-image">
                        {isPdf ? (
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

            {pdfOpen && <PdfModal src={active.image} onClose={() => setPdfOpen(false)} />}

        </section>
    );
}

export default ProjectContent;
