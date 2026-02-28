import { useRef, useEffect } from 'react';
import gsap from 'gsap';

import ProjectsCard from './ProjectCard';
import './ProjectGrid.scss';

function ProjectGrid({ projects }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.project-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.08 }
    );
  }, []);

  return (
    <div className="projects-grid" ref={gridRef}>
      {projects.map(project => (
        <ProjectsCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectGrid;
