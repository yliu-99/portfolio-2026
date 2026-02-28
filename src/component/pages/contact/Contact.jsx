import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faCopy, faCheck, faPaperPlane,
  faLinkedin, faInstagram, faYoutube, faGithub,
} from '../../../data/icons';
import './Contact.scss';

const EMAIL = 'yuhancreates@gmail.com';

const SOCIAL_LINKS = [
  { icon: faLinkedin,  href: 'https://www.linkedin.com/in/yuhan-liu-1a571524b/', label: 'LinkedIn'  },
  { icon: faInstagram, href: 'https://instagram.com/_yuhan.liu_',                label: 'Instagram' },
  { icon: faYoutube,   href: 'https://www.youtube.com/@Yuhan_Liu',               label: 'YouTube'   },
  { icon: faGithub,    href: 'https://github.com/yliu-99',                        label: 'GitHub'    },
];

function Contact() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="contact-page col-span-12">
      <div className="contact-card">

        {/* Title box — matches site section heading style */}
        <div className="contact-title-box font-title flex items-center gap-3 bg-blue text-white pl-6 pr-6">
          <h1 className="mt-2">CONTACT</h1>
          <FontAwesomeIcon icon={faCaretRight} />
        </div>

        <div className="contact-body">
          {/* Name */}
          <p className="contact-name font-title">YUHAN LIU</p>

          {/* Email row */}
          <div className="contact-email-row">
            <span className="contact-email-text font-body">{EMAIL}</span>
            <button
              className={`contact-icon-btn${copied ? ' copied' : ''}`}
              onClick={handleCopy}
              aria-label="Copy email address"
              title="Copy email"
            >
              <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
            </button>
            <a
              className="contact-icon-btn"
              href={`mailto:${EMAIL}`}
              aria-label="Open email app"
              title="Send email"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </a>
          </div>

          {/* Divider */}
          <hr className="contact-divider" />

          {/* Social links */}
          <div className="contact-social-row">
            {SOCIAL_LINKS.map(({ icon, href, label }) => (
              <a
                key={label}
                className="contact-social-link"
                href={href}
                target="_blank"
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
    </div>
  );
}

export default Contact;
