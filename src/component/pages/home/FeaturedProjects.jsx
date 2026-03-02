import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '../../../data/icons';
import { projectsData } from '../../../data/projects-data/projectData';
import './FeaturedProjects.scss';

const featuredProjects = projectsData.filter(p => p.id && p.featured);

function ProjectMedia({ project }) {
  if (project.type === 'vid' && project.media) {
    return (
      <iframe
        src={project.media}
        title={project.title}
        className="featured-media-video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (project.media) {
    return (
      <img
        src={project.media}
        alt={project.title}
        className="object-cover w-full h-full featured-media-img"
      />
    );
  }
  return null;
}

function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const displayedProject = hoveredProject ?? featuredProjects[activeIndex];

  function startCycle() {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex(i => (i + 1) % featuredProjects.length);
    }, 3000);
  }

  function stopCycle() {
    clearInterval(intervalRef.current);
  }

  useEffect(() => {
    startCycle();
    return () => stopCycle();
  }, []);

  return (
    <section className="featured-projects grid grid-cols-12 col-span-12 border-3 border-black bg-white -mx-4 md:-mx-5 lg:-mx-6 h-[85vh] lg:grid-rows-[9rem_1fr] xl:grid-rows-1">

      {/* title — full width on md/lg, sidebar on xl */}
      <div className="col-span-12 xl:col-span-1 flex items-center justify-center p-8 border-b-3 border-black xl:border-b-0 xl:border-r-3 h-24 lg:h-36 xl:h-full">
        <h2 className="font-title text-h3 text-red whitespace-nowrap xl:-rotate-90">FEATURED PROJECTS</h2>
      </div>

      {/* project list — full width on md, 3 cols on lg, 3 cols on xl */}
      <div className="project-list col-span-12 lg:col-span-3 xl:col-span-3 p-8 border-b-3 border-black lg:border-b-0 lg:border-r-3 flex flex-col justify-between">
        <div className="project-item flex flex-col font-title text-h5 tracking-primary">
          {featuredProjects.map((project, i) => (
            <button
              key={project.id}
              onClick={() => navigate(`/projects/${project.slug}`)}
              onMouseEnter={() => { stopCycle(); setActiveIndex(i); setHoveredProject(project); }}
              onMouseLeave={() => { setHoveredProject(null); startCycle(); }}
              className={`featured-project-btn${displayedProject.id === project.id ? ' active' : ''}`}
            >
              <span>{project.title}</span>
              <FontAwesomeIcon icon={faCaretRight} className="featured-caret" />
            </button>
          ))}
        </div>
        <button className="btn" onClick={() => navigate('/projects')}>All Projects</button>
      </div>

      {/* media — full width on md, 9 cols on lg, 8 cols on xl */}
      <div className="media-container col-span-12 lg:col-span-9 xl:col-span-8 h-full overflow-hidden relative">
        <ProjectMedia key={displayedProject.id} project={displayedProject} />
        {Array.isArray(displayedProject.chips) && displayedProject.chips.length > 0 && (
          <div className="featured-chips-overlay">
            {displayedProject.chips.map(chip => (
              <span key={chip} className="featured-chip">{chip}</span>
            ))}
          </div>
        )}
      </div>

    </section>
  );
}

export default FeaturedProjects;
