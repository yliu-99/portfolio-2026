import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gsap from 'gsap';
import {
  faCaretRight, faXmark,
  faCopy, faCheck, faPaperPlane,
  faLinkedin, faInstagram, faYoutube, faGithub,
} from '../../data/icons';
import { useContactModal } from '../../context/ContactModalContext';
import './ContactModal.scss';

const EMAIL = 'yuhancreates@gmail.com';

const SOCIAL_LINKS = [
  { icon: faLinkedin,  href: 'https://www.linkedin.com/in/yuhan-liu-1a571524b/', label: 'LinkedIn'  },
  { icon: faInstagram, href: 'https://instagram.com/_yuhan.liu_',                label: 'Instagram' },
  { icon: faYoutube,   href: 'https://www.youtube.com/@Yuhan_Liu',               label: 'YouTube'   },
  { icon: faGithub,    href: 'https://github.com/yliu-99',                        label: 'GitHub'    },
];

function ContactModal() {
  const { isOpen, closeContact } = useContactModal();
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef(null);
  const cardRef    = useRef(null);

  // Animate in when opened
  useEffect(() => {
    if (!isOpen || !overlayRef.current || !cardRef.current) return;
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: 'power2.out' }
    );
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 28, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
    );
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  function handleClose() {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' });
    gsap.to(cardRef.current, {
      opacity: 0, y: 20, scale: 0.96,
      duration: 0.2, ease: 'power2.in',
      onComplete: closeContact,
    });
  }

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!isOpen) return null;

  return (
    <div className="contact-overlay" ref={overlayRef} onClick={handleClose}>
      <div className="contact-card" ref={cardRef} onClick={(e) => e.stopPropagation()}>

        {/* Title bar */}
        <div className="contact-title-box font-title flex items-center justify-between bg-blue text-white pl-6 pr-4">
          <div className="flex items-center gap-3">
            <h2 className="mt-2">CONTACT</h2>
            <FontAwesomeIcon icon={faCaretRight} />
          </div>
          <button className="contact-close-btn" onClick={handleClose} aria-label="Close contact">
            <FontAwesomeIcon icon={faXmark} />
          </button>
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

export default ContactModal;
