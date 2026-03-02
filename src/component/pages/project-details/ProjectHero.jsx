// import dependencies
import { Icon } from '@iconify/react';

// import data
import { projectToolIconMap } from '../../../data/icons';

// import styles
import './ProjectHero.scss';

function ProjectHero({ project }) {
    const roles = project.role ?? [];

    return (
        <div className="w-full border border-black">

            {/* ── Title Bar ───────────────────────────────────────────── */}
            <div className="bg-blue px-8 py-5 border-b-2 border-black">
                <h1 className="hero-title">{project.title}</h1>
            </div>

            {/* ── Body ────────────────────────────────────────────────── */}
            <div className="grid grid-cols-[28%_1fr] max-md:grid-cols-1">

                {/* Sidebar */}
                <aside className="bg-white border-r border-black flex flex-col justify-center gap-10 px-8 py-10 max-md:border-r-0 max-md:border-t max-md:border-black max-md:order-2 max-md:gap-7 max-md:p-6">

                    {/* Tools */}
                    <div className="flex flex-col gap-[0.65rem]">
                        <span className="font-body font-bold text-h6 tracking-[0.15em] uppercase text-black">Tools:</span>
                        <div className="flex flex-wrap gap-2">
                            {project.tools?.map(tool => {
                                const toolData = projectToolIconMap[tool.toLowerCase()];
                                if (!toolData) return null;
                                return (
                                    <div
                                        key={tool}
                                        title={tool}
                                        className="w-10 h-10 flex items-center justify-center shrink-0"
                                    >
                                        {toolData.imgSrc
                                            ? <img src={toolData.imgSrc} alt={tool} className="w-full h-full object-contain" />
                                            : <Icon icon={toolData.icon} width={40} height={40} />
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Role */}
                    {roles.length > 0 && (
                        <div className="flex flex-col gap-[0.65rem]">
                            <span className="font-body font-bold text-h6 tracking-[0.15em] uppercase text-black">Role:</span>
                            <div className="flex flex-col gap-[0.1rem]">
                                {roles.map(role => (
                                    <span key={role} className="font-body text-h6 text-black leading-normal capitalize">
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Timeline */}
                    <div className="flex flex-col gap-[0.65rem]">
                        <span className="font-body font-bold text-h6 tracking-[0.15em] uppercase text-black">Timeline:</span>
                        <p className="font-body text-h6 text-black m-0 leading-normal">{project.timeline}</p>
                    </div>

                </aside>

                {/* Media */}
                <div className="bg-black aspect-video overflow-hidden relative max-md:order-1 max-md:w-full">
                    {project.type === 'vid' ? (
                        <iframe
                            src={project.media}
                            title={project.title}
                            className="absolute inset-0 w-full h-full border-0 block"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <img
                            src={project.media}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover block"
                        />
                    )}
                </div>

            </div>
        </div>
    );
}

export default ProjectHero;
