// import styles
import './ProjectHero.scss';

// ── helpers ───────────────────────────────────────────────────────────────────

// Extract YouTube video ID from an embed URL and return the maxresdefault thumbnail
function getYouTubeThumbnail(embedUrl = '') {
    const match = embedUrl.match(/\/embed\/([^?&]+)/);
    return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
}

// Split title string into two lines at ~floor(words/2) boundary
function splitTitle(title = '') {
    const words = title.trim().split(/\s+/);
    if (words.length <= 1) return [title, ''];
    const split = Math.floor(words.length / 2);
    return [words.slice(0, split).join(' '), words.slice(split).join(' ')];
}

// ── component ─────────────────────────────────────────────────────────────────

function ProjectHero({ project }) {
    const [titleLine1, titleLine2] = splitTitle(project.title);

    // Background priority: explicit heroImage → img media → YouTube thumbnail (fallback)
    const heroBg = project.heroImage
        ?? (project.type === 'img' ? project.media : null)
        ?? (project.type === 'vid' ? getYouTubeThumbnail(project.media) : null);

    // heroVideoId field overrides type-based video detection (e.g. img-type projects with a bg video)
    const heroVidId = project.heroVideoId
        ?? (project.type === 'vid' ? (project.media?.match(/\/embed\/([^?&]+)/)?.[1] ?? null) : null);
    const autoplaySrc = heroVidId
        ? `https://www.youtube.com/embed/${heroVidId}?autoplay=1&mute=1&loop=1&playlist=${heroVidId}&controls=0&rel=0&modestbranding=1&playsinline=1`
        : null;

    return (
        <section className="hero-section relative w-full h-dvh flex flex-col justify-end">

            {/* Background media — image always rendered as placeholder;
                iframe loads on top and naturally covers it once buffered */}
            <div className="absolute inset-0 bg-black overflow-hidden">
                {heroBg && (
                    <img
                        src={heroBg}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                )}
                {autoplaySrc && (
                    <iframe
                        src={autoplaySrc}
                        title={project.title}
                        className="hero-video-bg"
                        allow="autoplay; encrypted-media"
                        allowFullScreen={false}
                    />
                )}
            </div>

            {/* Red overlay 30% */}
            <div className="hero-red-overlay absolute inset-0 bg-red" />

            {/* Title + chips — bottom left aligned to grid margin */}
            <div className="relative px-4 sm:px-8 pb-10 max-w-[90vw]">

                {/* Line 1 — solid blue */}
                <h1 className="hero-title-line text-blue m-0 leading-none">
                    {titleLine1}
                </h1>

                {/* Line 2 — blue × multiply over the dark bg */}
                {titleLine2 && (
                    <h1 className="hero-title-line hero-title-multiply text-blue m-0 leading-none">
                        {titleLine2}
                    </h1>
                )}

                {/* Chips */}
                {project.chips?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                        {project.chips.map(chip => (
                            <span key={chip} className="hero-chip">{chip}</span>
                        ))}
                    </div>
                )}
            </div>

        </section>
    );
}

export default ProjectHero;
