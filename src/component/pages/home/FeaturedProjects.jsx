import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../../../data/projects-data/projectData';
import './FeaturedProjects.scss';

const featuredProjects = projectsData.filter(p => p.id && p.featured);

function getThumbnail(project) {
  if (project.type === 'vid' && project.media) {
    const match = project.media.match(/embed\/([^?]+)/);
    if (match) return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  return project.media ?? null;
}

function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [titleHovered, setTitleHovered] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const active = featuredProjects[activeIndex];

  function startCycle() {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex(i => (i + 1) % featuredProjects.length);
    }, 3000);
  }
  function stopCycle() { clearInterval(intervalRef.current); }

  useEffect(() => { startCycle(); return () => stopCycle(); }, []);

  return (
    <>
      <section className="col-span-12 grid grid-cols-12 grid-rows-[auto_1fr] xl:grid-rows-1 border-3 border-black bg-white h-dvh -mx-4 md:-mx-5 lg:-mx-6 overflow-hidden">

        {/* Title — top bar on mobile/lg, left col on xl */}
        <div className="col-span-12 xl:col-span-1 flex items-center justify-center py-3 xl:py-0 px-4 xl:px-3 border-b-3 xl:border-b-0 xl:border-r-3 border-black">
          <h2
            className="font-title text-[1.5rem] md:text-[2.5rem] text-black tracking-primary whitespace-nowrap xl:[writing-mode:vertical-rl] xl:transform-[rotate(180deg)]"
          >
            FEATURED PROJECTS
          </h2>
        </div>

        {/* Main column */}
        <div className="col-span-12 xl:col-span-11 flex flex-col min-h-0">

          {/* Preview strip — simple rectangles */}
          <div className="flex border-b-3 border-black shrink-0 h-20">
            {featuredProjects.map((project, i) => (
              <button
                key={project.id}
                className={`filmstrip-thumb${i === activeIndex ? ' active' : ''}`}
                onMouseEnter={() => { stopCycle(); setActiveIndex(i); }}
                onMouseLeave={startCycle}
                onClick={() => navigate(`/projects/${project.slug}`)}
                aria-label={project.title}
              >
                {getThumbnail(project) && (
                  <img
                    src={getThumbnail(project)}
                    alt={project.title}
                    className="w-full h-full object-cover block"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Media area */}
          <div
            className="relative flex-1 overflow-hidden cursor-pointer"
            onClick={() => navigate(`/projects/${active.slug}`)}
            onMouseEnter={stopCycle}
            onMouseLeave={startCycle}
          >
            {/* Image — dim filter applied only here */}
            {getThumbnail(active) && (
              <img
                key={active.id}
                src={getThumbnail(active)}
                alt={active.title}
                className={`featured-main-img w-full h-full object-cover block${titleHovered ? ' revealed' : ''}`}
              />
            )}

            {/* Title + chips */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              onMouseEnter={() => setTitleHovered(true)}
              onMouseLeave={() => setTitleHovered(false)}
            >
              <h3
                className="featured-title font-title text-blue tracking-primary text-center leading-none px-8"
                style={{ mixBlendMode: 'multiply' }}
              >
                {active.title}
              </h3>
              {Array.isArray(active.chips) && active.chips.length > 0 && (
                <div className="featured-chips-overlay opacity-70">
                  {active.chips.map(chip => (
                    <span key={chip} className="featured-chip">{chip}</span>
                  ))}
                </div>
              )}
            </div>

            {/* All Projects button — bottom right */}
            <div className="absolute bottom-4 right-4" onClick={e => e.stopPropagation()}>
              <button className="btn" onClick={() => navigate('/projects')}>All Projects</button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default FeaturedProjects;
