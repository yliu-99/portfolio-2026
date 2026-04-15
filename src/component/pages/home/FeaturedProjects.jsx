import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../../../data/projects-data/projectData';
import { useContactModal } from '../../../context/ContactModalContext';
import './FeaturedProjects.scss';

const featuredProjects = projectsData.filter(p => p.id && p.featured);

function getVideoId(project) {
  if (project.type === 'vid' && project.media) {
    // Prefer hoverVideoId (preview clip) for cards/featured
    if (project.hoverVideoId) return project.hoverVideoId;
    const match = project.media.match(/embed\/([^?]+)/);
    return match ? match[1] : null;
  }
  // img-type with hoverVideoId uses the hover overlay pattern, not always-on
  return null;
}

function getThumbnail(project) {
  if (project.type === 'vid' && project.media) {
    const match = project.media.match(/embed\/([^?]+)/);
    if (match) return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  return project.media ?? null;
}

// Builds a muted autoplay loop src with enablejsapi so postMessage events fire
function ytSrc(id) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&enablejsapi=1`;
}

// Listens for YouTube's postMessage onStateChange=1 (playing).
// Falls back to revealing after fallbackMs if postMessage is unavailable.
function useYTReady(ref, enabled, fallbackMs = 4000) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!enabled || ready) return;
    const timer = setTimeout(() => setReady(true), fallbackMs);
    const onMsg = (e) => {
      if (e.origin !== 'https://www.youtube.com') return;
      if (!ref.current || e.source !== ref.current.contentWindow) return;
      try {
        const d = JSON.parse(e.data);
        if (d.event === 'onStateChange' && d.info === 1) setReady(true);
      } catch {}
    };
    window.addEventListener('message', onMsg);
    return () => { clearTimeout(timer); window.removeEventListener('message', onMsg); };
  }, [enabled, ready]);
  return ready;
}

function ProjectCard({ project, cta }) {
  const navigate  = useNavigate();
  const videoId   = getVideoId(project);
  const thumbnail = getThumbnail(project);
  const cardRef   = useRef(null);
  const videoRef  = useRef(null);
  const hoverRef  = useRef(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  // img-type: hoverVideoId drives the hover-reveal pattern
  const hoverVidId = !videoId ? (project.hoverVideoId ?? null) : null;

  // videoReady — vid-type: fade thumbnail out once video starts playing
  // hoverReady — img-type: only reveal hover video once buffered (no spinner flash)
  const videoReady = useYTReady(videoRef, !!videoId);
  const hoverReady = useYTReady(hoverRef, !!hoverVidId);

  // ── CTA visibility via IntersectionObserver ───────────────────────────────
  useEffect(() => {
    if (!cta || !cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCtaVisible(true); },
      { threshold: 0.5 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [cta]);

  return (
    <div
      ref={cardRef}
      className={`featured-card${hoverReady ? ' hover-video-ready' : ''}`}
      onClick={() => navigate(`/projects/${project.slug}`)}
    >
      {/* Thumbnail — always rendered.
          For vid-type: acts as placeholder above iframe, fades when video plays.
          For img-type: static default, fades on hover once hover video is ready. */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt={project.title}
          loading="lazy"
          className={`featured-card__img${videoReady ? ' featured-card__img--hidden' : ''}`}
        />
      )}

      {/* Always-on video (vid-type, e.g. Apex) */}
      {videoId && (
        <div className="featured-card__video">
          <iframe
            ref={videoRef}
            src={ytSrc(videoId)}
            allow="autoplay"
            title={project.title}
          />
        </div>
      )}

      {/* Preloaded hover video (img-type with hoverVideoId, e.g. Submarine)
          In DOM immediately so YouTube buffers; CSS only reveals on hover+ready */}
      {hoverVidId && (
        <div className="featured-card__hover-video">
          <iframe
            ref={hoverRef}
            src={ytSrc(hoverVidId)}
            allow="autoplay"
            title={`${project.title} — video`}
          />
        </div>
      )}

      {/* Red overlay — matches project hero at 30% opacity */}
      <div className="featured-card__red-overlay" />

      {/* Hover overlay — title + chips */}
      <div className="featured-card__overlay">
        <h3 className="featured-card__title font-title tracking-primary">
          {project.title}
        </h3>
        {Array.isArray(project.chips) && project.chips.length > 0 && (
          <div className="featured-card__chips">
            {project.chips.map(chip => (
              <span key={chip} className="featured-chip">{chip}</span>
            ))}
          </div>
        )}
      </div>

      {/* CTA buttons — only on last card, fade in on scroll into view */}
      {cta && (
        <div
          className={`featured-card__cta${ctaVisible ? ' is-visible' : ''}`}
          onClick={e => e.stopPropagation()}
        >
          {cta}
        </div>
      )}

      {/* Invisible hotspot — center 50% of the card, triggers hover effects */}
      <div className="featured-card__hotspot" />
    </div>
  );
}

function FeaturedProjects() {
  const navigate        = useNavigate();
  const { openContact } = useContactModal();

  const ctaButtons = (
    <>
      <button className="btn" onClick={openContact}>Get in Touch</button>
      <button className="btn" onClick={() => navigate('/projects')}>All Projects</button>
    </>
  );

  return (
    <section id="featured-projects" className="col-span-12 -mx-4 md:-mx-5 lg:-mx-16 border-t-3 border-black mt-16">
      {featuredProjects.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          cta={i === featuredProjects.length - 1 ? ctaButtons : null}
        />
      ))}

      {/* Mobile CTA — stacked vertically below cards on xs */}
      <div className="sm:hidden flex flex-col">
        <button className="btn border-none! py-5" onClick={openContact}>Get in Touch</button>
        <hr className="border-t-2 border-black m-0" />
        <button className="btn border-none! py-5" onClick={() => navigate('/projects')}>All Projects</button>
      </div>

    </section>
  );
}

export default FeaturedProjects;
