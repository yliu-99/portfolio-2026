// import dependencies
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

// import data
import { projectsData } from '../../../data/projects-data/projectData';

// import styles
import './ProjectNav.scss';

function ProjectNav({ currentSlug }) {
    const visible = projectsData.filter(p => p.slug);
    const idx  = visible.findIndex(p => p.slug === currentSlug);
    const prev = idx > 0 ? visible[idx - 1] : null;
    const next = idx < visible.length - 1 ? visible[idx + 1] : null;

    return (
        <nav className="project-nav bg-blue">

            {/* Previous */}
            <div className={`project-nav-side ${!prev ? 'project-nav-side--empty' : ''}`}>
                {prev ? (
                    <Link to={`/projects/${prev.slug}`} className="project-nav-link">
                        <Icon icon="fa-solid:caret-left" className="project-nav-caret" />
                        <span className="font-title uppercase text-white project-nav-text">Previous</span>
                    </Link>
                ) : null}
            </div>

            <div className="project-nav-divider" />

            {/* Next */}
            <div className={`project-nav-side project-nav-side--right ${!next ? 'project-nav-side--empty' : ''}`}>
                {next ? (
                    <Link to={`/projects/${next.slug}`} className="project-nav-link">
                        <span className="font-title uppercase text-white project-nav-text">Next</span>
                        <Icon icon="fa-solid:caret-right" className="project-nav-caret" />
                    </Link>
                ) : null}
            </div>

        </nav>
    );
}

export default ProjectNav;
