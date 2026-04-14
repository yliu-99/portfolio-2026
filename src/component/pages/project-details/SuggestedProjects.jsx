// import data
import { projectsData } from '../../../data/projects-data/projectData';

// import components
import ProjectsCard from '../projects/ProjectCard';

// import styles
import './SuggestedProjects.scss';

const CATEGORY_LABELS = {
    'video':          'More Video Projects',
    'motion':         'More Video Projects',
    'graphic design': 'More Design Projects',
};

function SuggestedProjects({ suggested = [], category = '' }) {
    const projects = suggested
        .map(slug => projectsData.find(p => p.slug === slug))
        .filter(Boolean);

    if (!projects.length) return null;

    const heading = CATEGORY_LABELS[category?.toLowerCase()] ?? 'More Projects';

    return (
        <section className="suggested-projects">
            <div className="suggested-projects__inner">

                <span className="suggested-projects__title font-title uppercase">
                    {heading}
                </span>

                <div className="suggested-projects__grid">
                    {projects.map(project => (
                        <ProjectsCard key={project.slug} project={project} />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default SuggestedProjects;
