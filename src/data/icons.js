// ── Centralized Icon Registry ─────────────────────────────────────────────
// All icons used in the portfolio live here.
// FontAwesome: import the object and re-export it from this file.
// Iconify: add the icon ID string to the toolIcons data below.
// Never import icons directly in components — always go through this file.

// Navigation & UI
export {
  faBars, // HamburgerMenu — mobile nav open
  faXmark, // HamburgerMenu — mobile nav close
  faCaretDown, // HomeHero, AboutMe — scroll hint / directional indicator
  faCaretRight, // AboutMe — section title indicator
  faPlus, // FloatingMenu — expand
  faMinus, // FloatingMenu — collapse
} from "@fortawesome/free-solid-svg-icons";

// Social & Contact
export {
  faEnvelope, // Footer, HamburgerMenu — email link
  faCopy,     // Contact — copy email to clipboard
  faCheck,    // Contact — copy confirmation feedback
  faPaperPlane, // Contact — open mailto link
} from "@fortawesome/free-solid-svg-icons";

export {
  faLinkedin, // Footer, HamburgerMenu — LinkedIn
  faInstagram, // HamburgerMenu — Instagram
  faYoutube, // Footer, HamburgerMenu — YouTube
  faGithub, // Footer, HamburgerMenu — GitHub
} from "@fortawesome/free-brands-svg-icons";

// ── Tool Icons (Iconify) ──────────────────────────────────────────────────
// Used in MyTools. Icon IDs are strings passed to <Icon icon="..." />.
// For tools without an Iconify icon, use imgSrc with an imported asset instead.
// To add a tool: append an entry to the relevant group array.

// for theses, make sure sizing and colors aligns with other icons
import chatgptSvg from "../assets/icons/chatgpt.svg";
import garageBandImg from "../assets/icons/garage-band.webp";

export const toolIcons = [
  {
    category: "Design & Dev",
    tools: [
      { name: "Photoshop", icon: "simple-icons:adobephotoshop" },
      { name: "Illustrator", icon: "simple-icons:adobeillustrator" },
      { name: "InDesign", icon: "simple-icons:adobeindesign" },
      { name: "Figma", icon: "simple-icons:figma" },
      { name: "VS Code", icon: "simple-icons:visualstudiocode" },
      { name: "Canva", icon: "simple-icons:canva" },
    ],
  },
  {
    category: "Audio & Video",
    tools: [
      { name: "Premiere Pro", icon: "simple-icons:adobepremierepro" },
      { name: "After Effects", icon: "simple-icons:adobeaftereffects" },
      { name: "Audition", icon: "simple-icons:adobeaudition" },
      // update icon for garageband into svg if possible
      // { name: "GarageBand", imgSrc: garageBandImg },
      { name: "BandLab", icon: "simple-icons:bandlab" },
    ],
  },
  {
    category: "AI",
    tools: [
      { name: "Claude", icon: "simple-icons:claude" },
      { name: "ChatGPT", imgSrc: chatgptSvg },
    ],
  },
];
