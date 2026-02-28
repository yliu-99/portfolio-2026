import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '../../../data/icons';
import { projectsData } from '../../../data/projects-data/projectData';
import ProjectGrid from './ProjectGrid';
import './Projects.scss';

const FILTERS = [
  { label: 'All',    value: null             },
  { label: 'Design', value: 'graphic design' },
  { label: 'Video',  value: 'video'          },
  { label: 'Motion', value: 'motion'         },
];

function Projects() {
  const [activeFilter, setActiveFilter] = useState(null);

  const filtered = projectsData.filter(p => {
    if (!p.id) return false;
    if (!activeFilter) return true;
    return p.category === activeFilter;
  });

  return (
    <div className="projects-container col-span-12">

      {/* Page title — styled like the About Me section heading */}
      <div className="projects-title-box font-title text-h2 flex items-center gap-3 bg-blue text-white pl-6 pr-6 mb-12">
        <h1 className="mt-2">MY PROJECTS</h1>
        <span><FontAwesomeIcon icon={faCaretRight} /></span>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        {FILTERS.map(f => (
          <button
            key={f.label}
            className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid — key forces remount so GSAP re-runs on filter change */}
      <ProjectGrid key={activeFilter} projects={filtered} />

    </div>
  );
}

export default Projects;
