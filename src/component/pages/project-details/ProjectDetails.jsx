// import dependencies
import { useParams, Link } from 'react-router-dom';

// import data
import { projectsData } from '../../../data/projects-data/projectData';
import { projectDetailData } from '../../../data/projects-data/projectDetailData';

// import components
import ProjectHero from './ProjectHero';
import SuggestedProjects from './SuggestedProjects';
import ProjectSections from './ProjectSections';

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

  return (
    <div className="col-span-12 flex flex-col">
      <ProjectHero project={project} detail={detail} />
      <ProjectSections sections={detail.sections} />
      <SuggestedProjects suggested={detail.suggested} />
    </div>
  );
}

export default ProjectDetails;
