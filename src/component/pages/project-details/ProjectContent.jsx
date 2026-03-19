// import dependencies
import { useState, useRef } from 'react';
import gsap from 'gsap';

// import styles
import './ProjectContent.scss';

const PLACEHOLDER_BODY = 'Content coming soon — check back later.';

function ProjectContent({ sections = [] }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const panelRef = useRef(null);

    if (!sections.length) return null;

    const active = sections[activeIdx];

    const handleTabClick = (idx) => {
        if (idx === activeIdx) return;
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

            {/* ── Tab nav — full width at top ───────────────────────────── */}
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

            {/* ── Body row: text left, image right ─────────────────────── */}
            <div ref={panelRef} className="content-body">

                <div className="content-text">
                    <p className="font-body text-black leading-relaxed m-0">
                        {active.body || PLACEHOLDER_BODY}
                    </p>
                </div>

                {active.image && (
                    <div className="content-image">
                        {/\.mp4$/i.test(active.image) ? (
                            <video
                                src={active.image}
                                className="content-img"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        ) : (
                            <img
                                src={active.image}
                                alt={active.title}
                                className="content-img"
                            />
                        )}
                    </div>
                )}

            </div>

        </section>
    );
}

export default ProjectContent;
