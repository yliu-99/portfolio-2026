import { Link } from 'react-router-dom';
import './ProjectCard.scss';

function getYouTubeThumbnail(url) {
  const match = url.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
}

function getVideoId(url) {
  const match = url?.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function ProjectsCard({ project }) {
  const isVideo = project.type === 'vid';
  const videoId = isVideo ? getVideoId(project.media) : null;
  const mediaSrc = isVideo
    ? getYouTubeThumbnail(project.media)
    : project.media;

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`project-card flex flex-col no-underline text-black border-2 border-black overflow-hidden shadow-[3px_7px_6.5px_rgba(0,0,0,0.25)]${isVideo ? ' is-video' : ''}`}
    >
      <div className="card-media relative flex-1 min-h-0 aspect-video overflow-hidden bg-beige">
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&disablekb=1`}
            allow="autoplay"
            title={project.title}
          />
        ) : mediaSrc ? (
          <img src={mediaSrc} alt={project.title} />
        ) : null}

        {/* Overlay — chips top, title + description bottom */}
        <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none">
          {/* Chips — top */}
          <div className="flex flex-wrap gap-1">
            {Array.isArray(project.chips) && project.chips.map(chip => (
              <span key={chip} className="font-body text-[0.75rem] py-[0.15rem] px-[0.5rem] border border-white/60 text-white leading-[1.4]">{chip}</span>
            ))}
          </div>

          {/* Title + description — bottom */}
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
