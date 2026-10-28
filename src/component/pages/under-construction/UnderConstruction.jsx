import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLinkedin, faInstagram, faYoutube, faGithub,
} from '../../../data/icons';
import SEO from '../../SEO/SEO';
import './UnderConstruction.scss';

const EMAIL = 'yuhancreates@gmail.com';

const LINKS = [
  { icon: faEnvelope,  href: `mailto:${EMAIL}`,                                  label: 'Email'     },
  { icon: faLinkedin,  href: 'https://www.linkedin.com/in/yuhan-liu-1a571524b/', label: 'LinkedIn'  },
  { icon: faInstagram, href: 'https://instagram.com/_yuhan.liu_',                label: 'Instagram' },
  { icon: faYoutube,   href: 'https://www.youtube.com/@Yuhan_Liu',               label: 'YouTube'   },
  { icon: faGithub,    href: 'https://github.com/yliu-99',                        label: 'GitHub'    },
];

function UnderConstruction() {
  return (
    <div className="under-construction-page">
      <SEO
        title="Yuhan Liu | Site Under Construction"
        description="Yuhan Liu's portfolio is currently being rebuilt. Find links to connect in the meantime."
        canonicalUrl="/"
      />

      <div className="under-construction-card">
        <p className="uc-eyebrow font-title">YUHAN LIU</p>
        <h1 className="uc-heading font-title">
          UNDER<br />CONSTRUCTION
        </h1>
        <p className="uc-message font-body">
          The site's getting a rebuild. In the meantime, here's where to find me.
        </p>

        <div className="uc-link-row">
          {LINKS.map(({ icon, href, label }) => (
            <a
              key={label}
              className="uc-link"
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
            >
              <FontAwesomeIcon icon={icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UnderConstruction;
