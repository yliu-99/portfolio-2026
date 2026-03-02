// import dependencies
import { Icon } from '@iconify/react';

// import data
import { projectToolIconMap } from '../../../data/icons';

// import styles
import './ProjectHero.scss';

function ProjectHero({ project, detail }) {
    // Split role string into individual lines, e.g. "Director, Editor" → ['Director', 'Editor']
    const roles = detail?.role
        ? detail.role.split(',').map(r => r.trim()).filter(Boolean)
        : [];

    return (
        <div className="project-hero">

            {/* ── Title Bar ───────────────────────────────────────────── */}
            <div className="hero-title-bar">
                <h1 className="hero-title">{project.title}</h1>
            </div>

            {/* ── Body ────────────────────────────────────────────────── */}
            <div className="hero-body">

                {/* Sidebar */}
                <aside className="hero-sidebar">

                    {/* Tools */}
                    <div className="hero-sidebar-section">
                        <span className="hero-sidebar-label">Tools:</span>
                        <div className="hero-tool-icons">
                            {project.tools?.map(tool => {
                                const toolData = projectToolIconMap[tool.toLowerCase()];
                                if (!toolData) return null;
                                return (
                                    <div className="hero-tool-icon" key={tool} title={tool}>
                                        {toolData.imgSrc
                                            ? <img src={toolData.imgSrc} alt={tool} />
                                            : <Icon icon={toolData.icon} />
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Role */}
                    {roles.length > 0 && (
                        <div className="hero-sidebar-section">
                            <span className="hero-sidebar-label">Role:</span>
                            <div className="hero-roles">
                                {roles.map(role => (
                                    <span key={role}>{role}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Timeline */}
                    <div className="hero-sidebar-section">
                        <span className="hero-sidebar-label">Timeline:</span>
                        <p className="hero-timeline">{project.timeline}</p>
                    </div>

                </aside>

                {/* Media */}
                <div className="hero-media">
                    {project.type === 'vid' ? (
                        <iframe
                            src={project.media}
                            title={project.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <img src={project.media} alt={project.title} />
                    )}
                </div>

            </div>
        </div>
    );
}

export default ProjectHero;
