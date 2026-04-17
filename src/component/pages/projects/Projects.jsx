import { useState } from 'react';

import { projectsData } from '../../../data/projects-data/projectData';
import ProjectGrid from './ProjectGrid';
import SEO from '../../SEO/SEO';
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
      <SEO
        title="Projects | Yuhan Liu | Multidisciplinary Designer in Vancouver"
        description="Browse Yuhan Liu's creative projects spanning graphic design, branding, motion graphics, and video production."
        canonicalUrl="/projects"
        keywords="graphic design projects, branding, motion graphics, video production, yuhan liu portfolio"
      />

      {/* Page title */}
      <h1 className="font-title uppercase text-blue px-4 md:px-8 mt-8 mb-12" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>My Projects</h1>

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
