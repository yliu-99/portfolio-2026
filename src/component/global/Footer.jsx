// import dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram, faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

// import styles
import './Footer.scss';


function Footer() {
  return (
    <footer className="footer col-span-full bottom-0 bg-red text-beige p-4 border-t-black border-t-3">
    <div className="footer-container grid grid-cols-2 md:grid-cols-3 ">
      <div className="name text-h5 font-title uppercase flex justify-center items-center">
        <a href="/">Yuhan Liu.</a>
      </div>
      <div className="copyright hidden md:flex justify-center items-center">
        <p className="text-center font-body">
          © 2026 Yuhan Liu. All rights reserved.
        </p>
      </div>
      <div className="social-links flex justify-center gap-4">
        <a
          href="https://www.linkedin.com/in/yuhan-liu-1a571524b/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          href="https://www.youtube.com/@Yuhan_Liu"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a
          href="https://github.com/yliu-99"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          href="mailto:yuhancreates@gmail.com"
          className="social-link"
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
