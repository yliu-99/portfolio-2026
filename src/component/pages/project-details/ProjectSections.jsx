import SectionMap from './SectionMap';
import SectionNav from './SectionNav';

function ProjectSections({ sections = [] }) {
    return (
        <div className="col-span-12 w-full flex">

            {/* Sticky section nav — desktop only */}
            <div className="hidden lg:block w-52 shrink-0">
                <SectionNav sections={sections} />
            </div>

            {/* Main content — centered in available space */}
            <div className="min-w-0 w-full max-w-225 mx-auto">
                <SectionMap sections={sections} />
            </div>

        </div>
    );
}

export default ProjectSections;
