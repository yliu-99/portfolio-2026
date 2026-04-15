// import assets
import bumblebee from '../../../assets/global-assets/bumble-bee-blue.png';

// import styles
import './ProjectOverview.scss';

// ── component ─────────────────────────────────────────────────────────────────

function ProjectOverview({ detail }) {
    const description = detail?.overview?.description ?? '—';

    return (
        <section className="project-overview">
            <div className="overview-centered">
                <div className="overview-bee-wrap">
                    <img src={bumblebee} alt="" className="overview-bee" aria-hidden="true" />
                    <span className="overview-label font-title uppercase text-blue">Overview</span>
                </div>
                <p className="overview-description font-body text-blue m-0 leading-relaxed">
                    {description}
                </p>
            </div>
        </section>
    );
}

export default ProjectOverview;
