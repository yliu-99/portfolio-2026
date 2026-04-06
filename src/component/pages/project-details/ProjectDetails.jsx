// import dependencies
import { useParams, Link } from 'react-router-dom';

// import data
import { projectsData }    from '../../../data/projects-data/projectData';
import { projectDetailData } from '../../../data/projects-data/projectDetailData';

// import components
import ProjectHero     from './ProjectHero';
import ProjectOverview from './ProjectOverview';
import ProjectGallery  from './ProjectGallery';
import ProjectContent  from './ProjectContent';
import ProjectNav      from './ProjectNav';
import SuggestedProjects from './SuggestedProjects';
import SEO from '../../SEO/SEO';

function getOgImage(project) {
    if (project.type === 'vid' && project.media) {
        const match = project.media.match(/embed\/([^?]+)/);
        if (match) return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }
    if (typeof project.media === 'string' && project.media.startsWith('http')) {
        return project.media;
    }
    return null;
}

// import styles
import './ProjectDetails.scss';

function ProjectDetails() {
    const { slug } = useParams();
    const project = projectsData.find(p => p.slug === slug);
    const detail  = projectDetailData.find(p => p.slug === slug);

    if (!project || !detail) {
        return (
            <div className="col-span-12 flex flex-col items-center justify-center py-40 gap-4">
                <span className="font-title text-h3 text-black tracking-[0.06em]">Project Not Found</span>
                <Link to="/projects" className="font-body text-[0.9rem] text-blue underline">
                    ← Back to Projects
                </Link>
            </div>
        );
    }

    const seoTitle = `${project.title} | Yuhan Liu — BCIT New Media Student, Vancouver`;
    const seoDescription = `${project.description} A project by Yuhan Liu, BCIT New Media Design student in Vancouver, BC.`;
    const seoKeywords = [
        ...(project.chips ?? []),
        ...(project.tools ?? []),
        project.category,
        'bcit', 'bcit new media', 'new media design', 'vancouver designer', 'yuhan liu',
    ].filter(Boolean).join(', ');

    return (
        <div className="project-details-wrap col-span-12 flex flex-col gap-0 -mx-4 md:-mx-5 lg:-mx-16">
            <SEO
                title={seoTitle}
                description={seoDescription}
                keywords={seoKeywords}
                canonicalUrl={`/projects/${slug}`}
                ogImage={getOgImage(project)}
                ogType="article"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'CreativeWork',
                    name: project.title,
                    description: project.description,
                    url: `https://yuhanliu.ca/projects/${slug}`,
                    keywords: project.chips?.join(', '),
                    dateCreated: project.year,
                    author: {
                        '@type': 'Person',
                        name: 'Yuhan Liu',
                        url: 'https://yuhanliu.ca',
                        affiliation: {
                            '@type': 'EducationalOrganization',
                            name: 'British Columbia Institute of Technology (BCIT)',
                        },
                    },
                }}
            />

            {/* 1 — Full-viewport hero */}
            <ProjectHero project={project} />

            {/* 2 — Overview strip: description, date, solo/team */}
            <ProjectOverview project={project} detail={detail} />

            {/* 3 — Gallery: all project media */}
            <ProjectGallery gallery={detail.gallery ?? []} />

            {/* 4 — Tabbed narrative sections (up to 6) */}
            <ProjectContent sections={detail.sections ?? []} />

            {/* 5 — Previous / Next project navigation */}
            <ProjectNav currentSlug={slug} />

            {/* 6 — Suggested related projects */}
            <SuggestedProjects suggested={detail.suggested ?? []} category={project.category} />
        </div>
    );
}

export default ProjectDetails;
