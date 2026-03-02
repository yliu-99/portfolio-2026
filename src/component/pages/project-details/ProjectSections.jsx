import SectionMap from './SectionMap';

function ProjectSections({ sections = [] }) {
    return (
        <div className="col-span-12 max-w-225 mx-auto w-full">
            <SectionMap sections={sections} />
        </div>
    );
}

export default ProjectSections;
