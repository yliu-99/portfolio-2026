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
    if (!p.id || p.hidden) return false;
    if (!activeFilter) return true;
    return p.category === activeFilter;
  });

  return (
    <div className="projects-container col-span-12">

      {/* Page title + description — both covered by blue multiply bg */}
      <div className="projects-title-box bg-blue text-white mix-blend-multiply px-8 pt-6 pb-8 mb-12">
        <div className="font-title text-h2 flex items-center gap-3 mb-6">
          <h1 className="mt-2">MY PROJECTS</h1>
          <span><FontAwesomeIcon icon={faCaretRight} /></span>
        </div>
        <p className="font-body text-white/90 max-w-xl" style={{ fontSize: '20px', lineHeight: 1.7 }}>
          My work intentionally spans across multiple disciplines, including graphic design, video production, and motion graphics. I want to address all the layers of a brand, from the static to the dynamic, and create work that can live.
        </p>
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
