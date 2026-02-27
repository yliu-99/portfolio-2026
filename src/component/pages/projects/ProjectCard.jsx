import { useState } from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

import { faCaretRight } from "../../../data/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Helper to extract YouTube video ID from embed URL
function getYouTubeId(url) {
  const match = url.match(/(?:\/embed\/|v=)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function ProjectsCard({ project, index, variant = 'default' }) {
  const [mediaLoaded, setMediaLoaded] = useState(false);

  return (
    <div 
      className={`project-card project-card--${variant}`}
      style={{ '--animation-delay': `${index * 0.1}s` }}
    >
      <Link to={`/projects/${project.slug}`} className="card-link">
        <div className="project-media">
          {project.type === 'video' && getYouTubeId(project.media) ? (
            <YouTube
              videoId={getYouTubeId(project.media)}
              opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: 1,
                  mute: 1,
                  controls: 0,
                  loop: 1,
                  start: 10,
                  playlist: getYouTubeId(project.media),
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0
                },
              }}
              className={mediaLoaded ? 'loaded youtube-player' : 'youtube-player'}
              onReady={() => setMediaLoaded(true)}
              style={{
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
              }}
            />
          ) : project.type === 'video' ? (
            <video
              src={project.media}
              autoPlay
              muted
              loop
              playsInline
              className={mediaLoaded ? 'loaded' : ''}
              onLoadedData={() => setMediaLoaded(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <img 
              src={project.media} 
              alt={project.title}
              onLoad={() => setMediaLoaded(true)}
              className={mediaLoaded ? 'loaded' : ''}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
          <div className="media-overlay"></div>
        </div>
        
        <div className="project-content">
          <div className="project-header">
            <h3 className="project-title">{project.title}</h3>
            <div className="project-year">{project.year || ''}</div>
          </div>
          
          <div className="project-description">
            {project.description || 'project description will be up shortly'}
          </div>
          
          <div className="project-chips">
            {project.chips.map((chip, chipIndex) => (
              <span 
                key={chip} 
                className="chip"
                style={{ '--chip-delay': `${chipIndex * 0.05}s` }}
              >
                {chip}
              </span>
            ))}
          </div>
          
          {variant === 'detailed' && (
            <div className="project-meta">
              <span className="view-project">
                View Project
              </span>
              <span className='triangle'>
                <FontAwesomeIcon icon={faCaretRight} />
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default ProjectsCard;