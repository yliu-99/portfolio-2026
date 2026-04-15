// import dependencies
import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';

gsap.registerPlugin(ScrollTrigger);

// import assets
import dragonflyBlue from '../../../assets/global-assets/dragonfly-blue.png';

// import data
import { projectsData }    from '../../../data/projects-data/projectData';
import { projectDetailData } from '../../../data/projects-data/projectDetailData';

// import components
import ProjectHero     from './ProjectHero';
import ProjectOverview from './ProjectOverview';
import ProjectGallery  from './ProjectGallery';
import ProjectContent  from './ProjectContent';
import SuggestedProjects from './SuggestedProjects';
import SEO from '../../SEO/SEO';

// import styles
import './ProjectDetails.scss';

// ── helpers ───────────────────────────────────────────────────────────────────

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

function formatDate(year = '') {
    const [mm, yy] = year.split('/');
    if (!mm || !yy) return year.toUpperCase();
    return `${MONTHS[parseInt(mm, 10) - 1]} 20${yy}`;
}

// ── MetaStrip — date / team type with reveal hover cells ─────────────────────

function MetaStrip({ project, detail }) {
    const dateLabel = formatDate(project?.year ?? '');
    const teamLabel = detail?.overview?.teamType === 'team' ? 'Team Project' : 'Solo Project';

    return (
        <div className="meta-strip border-b-2 border-black">
            <div className="meta-cell">
                <Icon icon="fa-solid:eye" className="meta-cell__icon" aria-hidden="true" />
                <span className="meta-cell__label font-title uppercase">Date</span>
                <span className="meta-cell__value font-title uppercase">{dateLabel}</span>
            </div>
            <div className="meta-cell meta-cell--right border-l-2 border-black">
                <Icon icon="fa-solid:eye" className="meta-cell__icon" aria-hidden="true" />
                <span className="meta-cell__label font-title uppercase">Type</span>
                <span className="meta-cell__value font-title uppercase">{teamLabel}</span>
            </div>
        </div>
    );
}

// ── SpecsStrip — animated marquee of tools / roles / timeline ────────────────

function SpecsStrip({ project }) {
    const trackRef = useRef(null);
    const tweenRef = useRef(null);

    const toolsStr = project.tools?.map(t => t.toUpperCase()).join(' | ') ?? '';
    const rolesStr = project.role?.map(r => r.toUpperCase()).join(' | ') ?? '';
    const timeStr  = (project.timeline ?? '').toUpperCase();

    useEffect(() => {
        const ctx = gsap.context(() => {
            tweenRef.current = gsap.to(trackRef.current, {
                xPercent: -50,
                duration: 28,
                ease: 'none',
                repeat: -1,
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div
            className="specs-strip overflow-hidden bg-white"
            onMouseEnter={() => tweenRef.current?.pause()}
            onMouseLeave={() => tweenRef.current?.resume()}
        >
            <div ref={trackRef} className="specs-track flex items-center will-change-transform whitespace-nowrap">
                {[0, 1].map(i => (
                    <div key={i} className="specs-segment flex items-center shrink-0">

                        <div className="flex items-center gap-3 px-10">
                            <span className="specs-label">TOOLS:</span>
                            <span className="specs-value">{toolsStr || '—'}</span>
                        </div>

                        <img src={dragonflyBlue} alt="" className="specs-dragonfly" />

                        <div className="flex items-center gap-3 px-10">
                            <span className="specs-label">ROLES:</span>
                            <span className="specs-value">{rolesStr || '—'}</span>
                        </div>

                        <img src={dragonflyBlue} alt="" className="specs-dragonfly" />

                        <div className="flex items-center gap-3 px-10">
                            <span className="specs-label">TIMELINE:</span>
                            <span className="specs-value">{timeStr || '—'}</span>
                        </div>

                        <img src={dragonflyBlue} alt="" className="specs-dragonfly" />

                    </div>
                ))}
            </div>
        </div>
    );
}

// ── RevealBlock ───────────────────────────────────────────────────────────────
//
//  Three sticky layers inside a tall scroll container:
//    reveal-specs   (z-30) — always visible above everything
//    reveal-overview (z-10) — gets covered as gallery slides in
//    reveal-gallery  (z-20) — three-phase ScrollTrigger:
//      Phase 1  gallery rises up from below into the right 10% of the screen
//               (yPercent 100 → 0, xPercent stays at 90)
//      Phase 2  gallery sweeps left across the full viewport (xPercent 90 → 0)
//      Phase 3  gallery track translates left, revealing all images in sequence
//               Only after all images have scrolled through does the page move on.

function RevealBlock({ project, detail, gallery }) {
    const wrapRef        = useRef(null);
    const specsRef       = useRef(null);
    const overviewRef    = useRef(null);
    // galleryRef — the sticky container (never transformed, so sticky stays intact)
    const galleryRef     = useRef(null);
    // innerRef  — the element that slides in; child of the sticky container
    const innerRef       = useRef(null);

    useEffect(() => {
        const wrap     = wrapRef.current;
        const specs    = specsRef.current;
        const overview = overviewRef.current;
        const panel    = galleryRef.current;  // sticky container
        const inner    = innerRef.current;    // animated child
        if (!wrap || !specs || !overview || !panel || !inner) return;

        const SLIDE_H = window.innerHeight;

        // ── CSS var: specs height, used by overview + gallery sticky tops ─────
        const syncSpecsH = () =>
            wrap.style.setProperty('--specs-h', `${specs.offsetHeight}px`);
        syncSpecsH();
        const ro = new ResizeObserver(syncSpecsH);
        ro.observe(specs);

        const mm = gsap.matchMedia();
        mm.add('(min-width: 1024px)', () => {

            const track = panel.querySelector('.h-gallery-track');

            // Distance the track needs to travel to reveal all images
            const dist = () =>
                track ? Math.max(0, track.scrollWidth - panel.clientWidth) : 0;

            // ── Build a single timeline: slide-in → then scroll track left ────
            //    Durations are in "arbitrary units" that map to scroll distance.
            //    SLIDE_H units = 1 viewport of scroll; dist() units = pixel count.
            const buildTimeline = () => {
                const d        = dist();
                // Hold scroll distance = overview's full rendered height so the
                // gallery doesn't start until the user has scrolled past it all.
                const holdDist = overview.offsetHeight;

                // Timeline scroll budget:
                //   Hold      overviewHeight — wait until user has scrolled past the overview
                //   Rise      SLIDE_H × 0.35 — gallery enters from bottom-right
                //   Sweep     SLIDE_H × 0.65 — gallery sweeps left to full viewport
                //   Track     d              — horizontal image scroll
                //   Buffer    SLIDE_H × 2    — sticky holds after animation so
                //                             scrub:1.5 has time to complete
                const totalAnim = holdDist + SLIDE_H * 1.0 + d;
                wrap.style.height = `${totalAnim + window.innerHeight * 2}px`;

                // Kill any existing triggers so we can recreate cleanly
                ScrollTrigger.getAll()
                    .filter(st => st.vars?.id === 'reveal')
                    .forEach(st => st.kill());

                const tl = gsap.timeline();

                // Hold — locks gallery off-screen until user scrolls through the
                // full overview height, giving them time to read before the reveal.
                tl.fromTo(inner,
                    { yPercent: 100, xPercent: 90 },
                    { yPercent: 100, xPercent: 90, ease: 'none', duration: holdDist }
                );

                // Phase 1 — gallery rises up into the right 10% of the screen
                tl.to(inner,
                    { yPercent: 0, xPercent: 90, ease: 'none', duration: SLIDE_H * 0.35 }
                );

                // Phase 2 — gallery sweeps left to cover the full viewport
                tl.to(inner,
                    { xPercent: 0, ease: 'none', duration: SLIDE_H * 0.65 }
                );

                // Phase 3 — track scrolls left to expose all images
                if (track && d > 0) {
                    tl.to(track, { x: -d, ease: 'none', duration: d }, '>');
                }

                ScrollTrigger.create({
                    id:        'reveal',
                    animation: tl,
                    trigger:   wrap,
                    start:     'top top',
                    end:       `+=${totalAnim}`,
                    scrub:     1.5,
                    // Snap animation to complete if the user fast-scrolls past end
                    // before the scrub tween has finished.
                    onLeave:   self => self.animation.progress(1),
                });
            };

            // Build once immediately, then rebuild after images load for accurate scrollWidth
            buildTimeline();

            const imgs    = Array.from(panel.querySelectorAll('img'));
            const pending = imgs.filter(img => !img.complete);
            if (pending.length) {
                Promise.all(
                    pending.map(img =>
                        new Promise(res => {
                            img.addEventListener('load',  res, { once: true });
                            img.addEventListener('error', res, { once: true });
                        })
                    )
                ).then(buildTimeline);
            }
        });

        return () => { ro.disconnect(); mm.revert(); };
    }, []);

    return (
        <div ref={wrapRef} className="reveal-wrap">

            {/* Specs marquee — sticky below nav, always above gallery */}
            <div ref={specsRef} className="reveal-specs">
                <SpecsStrip project={project} />
            </div>

            {/* Overview — sticky below specs, covered as gallery slides in */}
            <div ref={overviewRef} className="reveal-overview">
                <ProjectOverview detail={detail} />
            </div>

            {/* Gallery sticky shell — never transformed so position:sticky stays intact */}
            <div ref={galleryRef} className="reveal-gallery">
                {/* Inner wrapper — this is what slides in from the right */}
                <div ref={innerRef} className="reveal-gallery__inner">
                    <ProjectGallery gallery={gallery} />
                </div>
            </div>

        </div>
    );
}

// ── SEO helpers ───────────────────────────────────────────────────────────────

function getOgImage(project) {
    if (project.type === 'vid' && project.media) {
        const match = project.media.match(/embed\/([^?]+)/);
        if (match) return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }
    if (typeof project.media === 'string' && project.media.startsWith('http')) {
        return project.media;
    }
    return null;
}

// ── Page component ────────────────────────────────────────────────────────────

function ProjectDetails() {
    const { slug } = useParams();
    const project = projectsData.find(p => p.slug === slug);
    const detail  = projectDetailData.find(p => p.slug === slug);

    if (!project || !detail) {
        return (
            <div className="col-span-12 flex flex-col items-center justify-center py-40 gap-4">
                <span className="font-title text-h3 text-black tracking-[0.06em]">Project Not Found</span>
                <Link to="/projects" className="font-body text-[0.9rem] text-blue underline">
                    ← Back to Projects
                </Link>
            </div>
        );
    }

    const seoTitle = `${project.title} | Yuhan Liu — BCIT New Media Student, Vancouver`;
    const seoDescription = `${project.description} A project by Yuhan Liu, BCIT New Media Design student in Vancouver, BC.`;
    const seoKeywords = [
        ...(project.chips ?? []),
        ...(project.tools ?? []),
        project.category,
        'bcit', 'bcit new media', 'new media design', 'vancouver designer', 'yuhan liu',
    ].filter(Boolean).join(', ');

    return (
        <div className="project-details-wrap col-span-12 flex flex-col gap-0 -mx-4 md:-mx-5 lg:-mx-16">
            <SEO
                title={seoTitle}
                description={seoDescription}
                keywords={seoKeywords}
                canonicalUrl={`/projects/${slug}`}
                ogImage={getOgImage(project)}
                ogType="article"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'CreativeWork',
                    name: project.title,
                    description: project.description,
                    url: `https://yuhanliu.ca/projects/${slug}`,
                    keywords: project.chips?.join(', '),
                    dateCreated: project.year,
                    author: {
                        '@type': 'Person',
                        name: 'Yuhan Liu',
                        url: 'https://yuhanliu.ca',
                        affiliation: {
                            '@type': 'EducationalOrganization',
                            name: 'British Columbia Institute of Technology (BCIT)',
                        },
                    },
                }}
            />

            {/* 1 — Full-viewport hero */}
            <ProjectHero project={project} />

            {/* 2 — Date / team type horizontal strip */}
            <MetaStrip project={project} detail={detail} />

            {/* 3 + 4 + 5 — Specs (sticky) + Overview (sticky, behind) + Gallery (slides in from right) */}
            <RevealBlock
                project={project}
                detail={detail}
                gallery={detail.gallery ?? []}
            />

            {/* 6 — Tabbed narrative sections */}
            <ProjectContent sections={detail.sections ?? []} />

            {/* 7 — Suggested related projects */}
            <SuggestedProjects suggested={detail.suggested ?? []} category={project.category} />
        </div>
    );
}

export default ProjectDetails;
