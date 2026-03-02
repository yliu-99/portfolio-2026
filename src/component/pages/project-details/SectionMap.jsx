// import dependencies
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// import data
import { projectToolIconMap } from '../../../data/icons';

// import styles
import './SectionMap.scss';

gsap.registerPlugin(ScrollTrigger);


// ── TextBlock ─────────────────────────────────────────────────────────────────

function TextBlock({ heading, body }) {
    return (
        <div className="max-w-185">
            {heading && <h2 className="sm-heading">{heading}</h2>}
            <p className="font-body text-[1.05rem] leading-[1.75] text-black m-0">{body}</p>
        </div>
    );
}


// ── PullQuote ─────────────────────────────────────────────────────────────────

function PullQuote({ quote, author }) {
    return (
        <div className="border-l-4 border-blue pl-10 py-6 flex flex-col gap-3">
            <span className="font-title text-[5rem] text-blue leading-[0.6] mb-2 select-none" aria-hidden="true">"</span>
            <blockquote className="font-title text-h4 uppercase tracking-[0.04em] leading-tight text-black m-0 max-w-170">
                {quote}
            </blockquote>
            {author && (
                <cite className="font-body not-italic text-[0.85rem] tracking-[0.1em] uppercase text-red">
                    — {author}
                </cite>
            )}
        </div>
    );
}


// ── SplitSection ──────────────────────────────────────────────────────────────
// GSAP handles the image zoom on hover.

function SplitSection({ layout = 'imageRight', heading, body, image }) {
    const imgRef = useRef(null);

    const onImgEnter = () => gsap.to(imgRef.current, { scale: 1.04, duration: 0.5, ease: 'power2.out' });
    const onImgLeave = () => gsap.to(imgRef.current, { scale: 1,    duration: 0.5, ease: 'power2.out' });

    return (
        <div className={`sm-split sm-split--${layout}`}>
            <div className="split-text">
                {heading && <h2 className="sm-heading">{heading}</h2>}
                <p className="font-body text-[1.05rem] leading-[1.75] text-black m-0">{body}</p>
            </div>
            <div className="split-image" onMouseEnter={onImgEnter} onMouseLeave={onImgLeave}>
                {image && <img ref={imgRef} src={image} alt={heading || ''} />}
            </div>
        </div>
    );
}


// ── FullImage ─────────────────────────────────────────────────────────────────

function FullImage({ image, alt }) {
    return (
        <div className="w-full aspect-video overflow-hidden border-2 border-black bg-beige">
            {image && <img src={image} alt={alt || ''} className="w-full h-full object-cover block" />}
        </div>
    );
}


// ── ImageGrid ─────────────────────────────────────────────────────────────────
// GSAP handles image scale + opacity on hover.

function ImageGrid({ columns = 3, images = [] }) {
    const onCellEnter = (e) => {
        const img = e.currentTarget.querySelector('img');
        if (img) gsap.to(img, { scale: 1.05, opacity: 1,   duration: 0.45, ease: 'power2.out' });
    };
    const onCellLeave = (e) => {
        const img = e.currentTarget.querySelector('img');
        if (img) gsap.to(img, { scale: 1,    opacity: 0.9, duration: 0.45, ease: 'power2.out' });
    };

    return (
        <div className="sm-image-grid" style={{ '--grid-cols': columns }}>
            {images.map((img, i) => (
                <div key={i} className="ig-cell" onMouseEnter={onCellEnter} onMouseLeave={onCellLeave}>
                    <img src={img.src} alt={img.alt || ''} className="opacity-90" />
                </div>
            ))}
        </div>
    );
}


// ── VideoEmbed ────────────────────────────────────────────────────────────────

function VideoEmbed({ url, caption }) {
    return (
        <div>
            <div className="video-embed-wrapper">
                <iframe
                    src={url}
                    title={caption || 'Video'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
            {caption && (
                <p className="font-body text-[0.82rem] text-black opacity-55 mt-2 text-center tracking-[0.04em]">
                    {caption}
                </p>
            )}
        </div>
    );
}


// ── FigmaEmbed ────────────────────────────────────────────────────────────────

function FigmaEmbed({ url, caption }) {
    return (
        <div>
            <div className="figma-embed-wrapper">
                <iframe
                    src={url}
                    title={caption || 'Figma prototype'}
                    allowFullScreen
                />
            </div>
            {caption && (
                <p className="font-body text-[0.82rem] text-black opacity-55 mt-2 text-center tracking-[0.04em]">
                    {caption}
                </p>
            )}
        </div>
    );
}


// ── StatsRow ──────────────────────────────────────────────────────────────────

function StatsRow({ stats = [] }) {
    return (
        <div
            className="sm-stats-row grid border-2 border-black bg-white overflow-hidden"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}
        >
            {stats.map((stat, i) => (
                <div key={i} className="stat-item flex flex-col items-center text-center p-10">
                    <span
                        className="font-title text-blue leading-none mb-2"
                        style={{ fontSize: 'clamp(2rem, 4vw, var(--font-size-h2))' }}
                    >
                        {stat.value}
                    </span>
                    <span className="font-body text-[0.78rem] tracking-[0.1em] uppercase text-black opacity-65">
                        {stat.label}
                    </span>
                </div>
            ))}
        </div>
    );
}


// ── TagList ───────────────────────────────────────────────────────────────────
// GSAP handles chip background invert on hover.

function TagList({ heading, tags = [] }) {
    const onChipEnter = (e) => gsap.to(e.currentTarget, { backgroundColor: '#25242F', color: '#FFFFFF', duration: 0.2, ease: 'power2.out' });
    const onChipLeave = (e) => gsap.to(e.currentTarget, { backgroundColor: 'transparent', color: '#25242F', duration: 0.2, ease: 'power2.out' });

    return (
        <div className="flex flex-col gap-4">
            {heading && (
                <span className="font-body font-bold text-[0.75rem] tracking-[0.15em] uppercase text-black block">
                    {heading}
                </span>
            )}
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <span
                        key={i}
                        className="font-body text-[0.85rem] py-1 px-3 border-[1.5px] border-black text-black tracking-[0.04em] cursor-default"
                        onMouseEnter={onChipEnter}
                        onMouseLeave={onChipLeave}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}


// ── ProjectNav ────────────────────────────────────────────────────────────────
// GSAP handles the background/color transition on hover.

function ProjectNav({ prev, next }) {
    const onNavEnter = (e) => gsap.to(e.currentTarget, { backgroundColor: '#3639FB', color: '#FFFFFF', duration: 0.25, ease: 'power2.out' });
    const onNavLeave = (e) => gsap.to(e.currentTarget, { backgroundColor: 'transparent', color: '#25242F', duration: 0.25, ease: 'power2.out' });

    return (
        <nav className="flex justify-between border-y-2 border-black">

            {prev ? (
                <Link
                    to={`/projects/${prev.slug}`}
                    className="flex-1 flex flex-col gap-1 py-7 px-8 no-underline text-black"
                    onMouseEnter={onNavEnter}
                    onMouseLeave={onNavLeave}
                >
                    <span className="font-body font-bold text-[0.72rem] tracking-[0.18em] uppercase">← Prev</span>
                    <span className="font-title text-h5 tracking-[0.06em]">{prev.title}</span>
                </Link>
            ) : <div className="flex-1" />}

            {next ? (
                <Link
                    to={`/projects/${next.slug}`}
                    className="flex-1 flex flex-col gap-1 py-7 px-8 no-underline text-black items-end text-right border-l border-black"
                    onMouseEnter={onNavEnter}
                    onMouseLeave={onNavLeave}
                >
                    <span className="font-body font-bold text-[0.72rem] tracking-[0.18em] uppercase">Next →</span>
                    <span className="font-title text-h5 tracking-[0.06em]">{next.title}</span>
                </Link>
            ) : <div className="flex-1 border-l border-black" />}

        </nav>
    );
}


// ── ProjectMeta ───────────────────────────────────────────────────────────────

function ProjectMeta({ role, timeline, tools, client }) {
    return (
        <div
            className="sm-project-meta grid border-2 border-black bg-white overflow-hidden"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}
        >
            {role && (
                <div className="meta-item flex flex-col gap-2 p-6">
                    <span className="font-body font-bold text-[0.75rem] tracking-[0.15em] uppercase text-black block">Role</span>
                    <span className="font-body text-[0.95rem] text-black leading-normal">{role}</span>
                </div>
            )}
            {timeline && (
                <div className="meta-item flex flex-col gap-2 p-6">
                    <span className="font-body font-bold text-[0.75rem] tracking-[0.15em] uppercase text-black block">Timeline</span>
                    <span className="font-body text-[0.95rem] text-black leading-normal">{timeline}</span>
                </div>
            )}
            {client && (
                <div className="meta-item flex flex-col gap-2 p-6">
                    <span className="font-body font-bold text-[0.75rem] tracking-[0.15em] uppercase text-black block">Client</span>
                    <span className="font-body text-[0.95rem] text-black leading-normal">{client}</span>
                </div>
            )}
            {tools?.length > 0 && (
                <div className="meta-item flex flex-col gap-2 p-6">
                    <span className="font-body font-bold text-[0.75rem] tracking-[0.15em] uppercase text-black block">Tools</span>
                    <div className="flex flex-wrap gap-2">
                        {tools.map(tool => {
                            const toolData = projectToolIconMap[tool.toLowerCase()];
                            if (!toolData) return (
                                <span key={tool} className="font-body text-[0.85rem] text-black">{tool}</span>
                            );
                            return (
                                <div
                                    key={tool}
                                    className="w-8 h-8 bg-black rounded-md flex items-center justify-center text-white text-h6 shrink-0"
                                    title={tool}
                                >
                                    {toolData.imgSrc
                                        ? <img src={toolData.imgSrc} alt={tool} className="w-[60%] h-[60%] object-contain brightness-0 invert" />
                                        : <Icon icon={toolData.icon} />
                                    }
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}


// ── Goals / Project Overview ──────────────────────────────────────────────────

function Goals({ body }) {
    return (
        <div className="border-2 border-black bg-beige p-10">
            <span className="font-body font-bold text-[0.75rem] tracking-[0.15em] uppercase text-black block mb-4">
                Project Overview
            </span>
            <p
                className="font-body text-[1.05rem] leading-[1.75] text-black m-0"
                dangerouslySetInnerHTML={{ __html: body }}
            />
        </div>
    );
}


// ── ProcessImage ──────────────────────────────────────────────────────────────
// Full-width image without a forced aspect ratio — lets the image breathe.

function ProcessImage({ image, alt }) {
    return (
        <div className="w-full overflow-hidden border-2 border-black bg-beige">
            {image && <img src={image} alt={alt || ''} className="w-full h-auto block" />}
        </div>
    );
}


// ── PdfEmbed ──────────────────────────────────────────────────────────────────

function PdfEmbed({ src, title }) {
    return (
        <div>
            <div className="pdf-embed-wrapper">
                <iframe src={src} title={title || 'PDF document'} allowFullScreen />
            </div>
            {title && (
                <p className="font-body text-[0.82rem] text-black opacity-55 mt-2 text-center tracking-[0.04em]">
                    {title}
                </p>
            )}
        </div>
    );
}


// ── ComingSoon ────────────────────────────────────────────────────────────────

function ComingSoon() {
    return (
        <div className="border-2 border-black bg-white flex flex-col items-center justify-center py-24 gap-4">
            <h3 className="font-title text-h3 text-blue tracking-[0.06em]">Coming Soon</h3>
            <p className="font-body text-h6 text-black m-0 tracking-[0.04em]">
                This section is still under construction. In the meantime, check out my other projects!
            </p>
        </div>
    );
}


// ── Section type registry ─────────────────────────────────────────────────────

const SECTION_COMPONENTS = {
    textBlock:    TextBlock,
    pullQuote:    PullQuote,
    splitSection: SplitSection,
    fullImage:    FullImage,
    imageGrid:    ImageGrid,
    videoEmbed:   VideoEmbed,
    figmaEmbed:   FigmaEmbed,
    statsRow:     StatsRow,
    tagList:      TagList,
    projectNav:   ProjectNav,
    projectMeta:  ProjectMeta,
    goals:        Goals,
    processImage: ProcessImage,
    pdfEmbed:     PdfEmbed,
    comingSoon:   ComingSoon,
};


// ── SectionMap (main export) ──────────────────────────────────────────────────
// Each section child fades + slides up as it scrolls into view.

function SectionMap({ sections = [] }) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) return;
        const els = Array.from(mapRef.current.children);

        const ctx = gsap.context(() => {
            els.forEach(el => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 48 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.65,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 88%',
                        },
                    }
                );
            });
        }, mapRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="flex flex-col gap-20 py-20" ref={mapRef}>
            {sections.map((section, i) => {
                const Component = SECTION_COMPONENTS[section.type];
                if (!Component) return null;
                return (
                    <div key={i} id={`section-${i}`}>
                        <Component {...section} />
                    </div>
                );
            })}
        </div>
    );
}

export default SectionMap;
