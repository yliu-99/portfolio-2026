// import dependencies


// import components
import ProjectHero from './ProjectHero';
import SuggestedProjects from './SuggestedProjects';
import ProjectSections from './ProjectSections';

// import styles
import './ProjectDetails.scss';

function ProjectDetails() {
  return (
    <div className="project-details">
      <ProjectHero />
      <ProjectSections />
      <SuggestedProjects />
    </div>
  );
}
export default ProjectDetails;