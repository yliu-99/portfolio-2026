import SectionMap from './SectionMap';
import SectionNav from './SectionNav';

function ProjectSections({ sections = [] }) {
    return (
        <div className="col-span-12 w-full flex items-start">

            {/* Sticky section nav — desktop only */}
            <div className="hidden lg:block w-52 shrink-0">
                <SectionNav sections={sections} />
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0 max-w-[900px]">
                <SectionMap sections={sections} />
            </div>

        </div>
    );
}

export default ProjectSections;
