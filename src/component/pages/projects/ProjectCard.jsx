import { Link } from 'react-router-dom';
import { faCaretRight } from "../../../data/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ProjectCard.scss';

function getYouTubeThumbnail(url) {
  const match = url.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
}

function ProjectsCard({ project }) {
  const mediaSrc = project.type === 'vid'
    ? getYouTubeThumbnail(project.media)
    : project.media;

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="project-card"
    >
      <div className="card-media">
        {mediaSrc && <img src={mediaSrc} alt={project.title} />}

        {/* Chips — always visible, anchored to bottom of image */}
        <div className="card-media-footer">
          <div className="card-chips">
            {Array.isArray(project.chips) && project.chips.map(chip => (
              <span key={chip} className="chip">{chip}</span>
            ))}
          </div>
        </div>

        {/* VIEW PROJECT — top right, hover only */}
        <div className="card-view-project">
          VIEW PROJECT <FontAwesomeIcon icon={faCaretRight} />
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h4 className="card-title tracking-secondary">{project.title}</h4>
          <span className="card-year">{project.year}</span>
        </div>
        <p className="card-description">
          {project.shortDescription || project.description || 'Project description coming soon.'}
        </p>
      </div>
    </Link>
  );
}

export default ProjectsCard;
