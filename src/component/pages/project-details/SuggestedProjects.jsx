// import data
import { projectsData } from '../../../data/projects-data/projectData';

// import components
import ProjectsCard from '../projects/ProjectCard';

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
        <section className="w-full border-t-2 border-black px-8 py-16">

            <h2 className="font-title text-h4 uppercase tracking-[0.06em] text-black mb-10">
                {heading}
            </h2>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {projects.map(project => (
                    <ProjectsCard key={project.slug} project={project} />
                ))}
            </div>

        </section>
    );
}

export default SuggestedProjects;
