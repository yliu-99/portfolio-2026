// import assets
import bumblebee from '../../../assets/global-assets/bumble-bee-blue.png';

// import dependencies
import { Icon } from '@iconify/react';

// import styles
import './ProjectOverview.scss';

// ── helpers ───────────────────────────────────────────────────────────────────

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

function formatDate(year = '') {
    const [mm, yy] = year.split('/');
    if (!mm || !yy) return year.toUpperCase();
    return `${MONTHS[parseInt(mm, 10) - 1]} 20${yy}`;
}

// ── component ─────────────────────────────────────────────────────────────────

function ProjectOverview({ project, detail }) {
    const overview   = detail?.overview ?? {};
    const description = overview.description ?? project?.description ?? '—';
    const teamLabel  = overview.teamType === 'team' ? 'Team Project' : 'Solo Project';
    const dateLabel  = formatDate(project?.year ?? '');

    return (
        <section className="project-overview border-b-2 border-black">
            <div className="overview-grid">

                {/* Left — bee with label overlaid */}
                <div className="overview-cell overview-left border-r-2 border-black">
                    <div className="overview-bee-wrap">
                        <img src={bumblebee} alt="" className="overview-bee" aria-hidden="true" />
                        <span className="overview-label font-title uppercase text-blue">Overview</span>
                    </div>
                </div>

                {/* Middle — description */}
                <div className="overview-cell overview-middle border-r-2 border-black">
                    <p className="overview-description text-center font-body text-blue m-0 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Right — date + team type stacked */}
                <div className="overview-right">
                    <div className="overview-cell overview-reveal-cell justify-center border-b-2 border-black">
                        <Icon icon="fa-solid:eye" className="overview-reveal-icon" aria-hidden="true" />
                        <span className="overview-reveal-label font-title uppercase">Date</span>
                        <span className="overview-reveal-value overview-date font-title uppercase">{dateLabel}</span>
                    </div>
                    <div className="overview-cell overview-reveal-cell justify-center">
                        <Icon icon="fa-solid:eye" className="overview-reveal-icon" aria-hidden="true" />
                        <span className="overview-reveal-label font-title uppercase">Type</span>
                        <span className="overview-reveal-value overview-team font-title uppercase">{teamLabel}</span>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default ProjectOverview;
