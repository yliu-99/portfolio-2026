import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.scss';

function getYouTubeThumbnail(url) {
  const match = url?.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
}

function getVideoId(url) {
  const match = url?.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
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

function ProjectsCard({ project }) {
  const isVideo = project.type === 'vid';
  // vid-type: prefer hoverVideoId (preview clip) over the full media video
  const videoId = isVideo
    ? (project.hoverVideoId ?? getVideoId(project.media))
    : null;
  const mediaSrc = isVideo
    ? getYouTubeThumbnail(project.media)
    : project.media;
  // img-type: hoverVideoId drives the hover-reveal pattern
  const hoverVidId = !isVideo ? (project.hoverVideoId ?? null) : null;

  const videoRef = useRef(null);
  const hoverRef = useRef(null);

  // videoReady — vid-type always-on: hide thumbnail once playing
  // hoverReady — img-type hover: only reveal hover video once it's buffered
  const videoReady = useYTReady(videoRef, !!videoId);
  const hoverReady = useYTReady(hoverRef, !!hoverVidId);

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`project-card block aspect-video no-underline text-black border-2 border-black overflow-hidden shadow-[3px_7px_6.5px_rgba(0,0,0,0.25)]${isVideo ? ' is-video' : ''}${hoverReady ? ' hover-video-ready' : ''}`}
    >
      <div className="card-media relative w-full h-full overflow-hidden bg-beige">

        {/* vid-type: thumbnail sits above iframe until video starts playing */}
        {videoId && mediaSrc && (
          <img
            src={mediaSrc}
            alt={project.title}
            className={`card-img card-img--placeholder${videoReady ? ' is-hidden' : ''}`}
          />
        )}

        {/* Always-on video iframe (vid-type) */}
        {videoId && (
          <iframe
            ref={videoRef}
            src={ytSrc(videoId)}
            allow="autoplay"
            title={project.title}
          />
        )}

        {/* Static image (img-type default) */}
        {!isVideo && mediaSrc && (
          <img src={mediaSrc} alt={project.title} className="card-img" />
        )}

        {/* Preloaded hover video (img-type) — in DOM so YouTube buffers early;
            CSS only reveals it once hoverReady via .hover-video-ready on the card */}
        {hoverVidId && (
          <iframe
            ref={hoverRef}
            className="card-hover-video"
            src={ytSrc(hoverVidId)}
            allow="autoplay"
            title={`${project.title} — video`}
          />
        )}

        {/* Overlay — chips top, title + description bottom */}
        <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none">
          <div className="flex flex-wrap gap-1">
            {Array.isArray(project.chips) && project.chips.map(chip => (
              <span key={chip} className="font-body text-[0.75rem] py-[0.15rem] px-2 border border-white/60 text-white leading-[1.4]">{chip}</span>
            ))}
          </div>
          <div className="card-overlay-content">
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <h4 className="font-title text-h5 text-white m-0 leading-none uppercase tracking-secondary">{project.title}</h4>
              <span className="font-body text-[0.8rem] text-white whitespace-nowrap shrink-0">{project.year}</span>
            </div>
            <p className="font-body text-[0.8rem] text-white/75 leading-[1.4] m-0 line-clamp-1">
              {project.shortDescription || project.description || ''}
            </p>
          </div>
        </div>

      </div>
    </Link>
  );
}

export default ProjectsCard;
