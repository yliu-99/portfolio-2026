import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../../../data/projects-data/projectData';
import { useContactModal } from '../../../context/ContactModalContext';
import './FeaturedProjects.scss';

const featuredProjects = projectsData.filter(p => p.id && p.featured);

function getVideoId(project) {
  if (project.type === 'vid' && project.media) {
    const match = project.media.match(/embed\/([^?]+)/);
    return match ? match[1] : null;
  }
  return null;
}

function getThumbnail(project) {
  if (project.type === 'vid' && project.media) {
    const match = project.media.match(/embed\/([^?]+)/);
    if (match) return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  return project.media ?? null;
}

function ProjectCard({ project, cta }) {
  const navigate  = useNavigate();
  const videoId   = getVideoId(project);
  const thumbnail = getThumbnail(project);
  const cardRef   = useRef(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    if (!cta || !cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCtaVisible(true); },
      { threshold: 0.5 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [cta]);

  return (
    <div
      ref={cardRef}
      className="featured-card"
      onClick={() => navigate(`/projects/${project.slug}`)}
    >
      {/* Always-on muted autoplay video */}
      {videoId && (
        <div className="featured-card__video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&disablekb=1`}
            allow="autoplay"
            title={project.title}
          />
        </div>
      )}

      {/* Image for non-video projects */}
      {!videoId && thumbnail && (
        <img src={thumbnail} alt={project.title} className="featured-card__img" />
      )}

      {/* Red overlay — matches project hero at 30% opacity */}
      <div className="featured-card__red-overlay" />

      {/* Hover overlay — title + chips */}
      <div className="featured-card__overlay">
        <h3 className="featured-card__title font-title tracking-primary">
          {project.title}
        </h3>
        {Array.isArray(project.chips) && project.chips.length > 0 && (
          <div className="featured-card__chips">
            {project.chips.map(chip => (
              <span key={chip} className="featured-chip">{chip}</span>
            ))}
          </div>
        )}
      </div>

      {/* CTA buttons — only on last card, fade in on scroll into view */}
      {cta && (
        <div
          className={`featured-card__cta${ctaVisible ? ' is-visible' : ''}`}
          onClick={e => e.stopPropagation()}
        >
          {cta}
        </div>
      )}

      {/* Invisible hotspot — center 50% of the card, triggers hover effects */}
      <div className="featured-card__hotspot" />
    </div>
  );
}

function FeaturedProjects() {
  const navigate        = useNavigate();
  const { openContact } = useContactModal();

  const ctaButtons = (
    <>
      <button className="btn" onClick={openContact}>Get in Touch</button>
      <button className="btn" onClick={() => navigate('/projects')}>All Projects</button>
    </>
  );

  return (
    <section id="featured-projects" className="col-span-12 -mx-4 md:-mx-5 lg:-mx-16 border-t-3 border-black mt-16">
      {featuredProjects.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          cta={i === featuredProjects.length - 1 ? ctaButtons : null}
        />
      ))}

      {/* Mobile CTA — stacked vertically below cards on xs */}
      <div className="sm:hidden flex flex-col border-t-3 border-black">
        <button className="btn border-b-3 border-black! py-5" onClick={openContact}>Get in Touch</button>
        <button className="btn py-5" onClick={() => navigate('/projects')}>All Projects</button>
      </div>

    </section>
  );
}

export default FeaturedProjects;
