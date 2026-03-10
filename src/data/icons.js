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
  faSquarePlus,  // FloatingMenu — expand
  faSquareMinus, // FloatingMenu — collapse
  faShuffle, // Boost — shuffle advice
  faUpRightFromSquare, // Obsessions — open detail popup
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
// Preferred: logos: set (full-color branded SVGs — icon-sets.iconify.design/logos)
// Fallback:  simple-icons: set for tools not yet in the logos set
// imgSrc:    local asset for tools with no Iconify entry at all

import garageBandImg  from "../assets/icons/garage-band.webp";
import auditionImg    from "../assets/icons/adobe-audition.png";
import bandlabImg     from "../assets/icons/bandlab.png";
import chatgptImg     from "../assets/icons/chatgpt.svg";
import claudeImg      from "../assets/icons/claude.png";

// ── Project Tool Icon Map ─────────────────────────────────────────────────────
// Maps the lowercase tool key strings used in projectData.js → icon data.
// Used by ProjectHero to render tool icons.
export const projectToolIconMap = {
  // Adobe — all confirmed in logos: set
  'photoshop':     { icon: 'logos:adobe-photoshop' },
  'illustrator':   { icon: 'logos:adobe-illustrator' },
  'indesign':      { icon: 'logos:adobe-indesign' },
  'premier':       { icon: 'logos:adobe-premiere' },
  'after effects': { icon: 'logos:adobe-after-effects' },
  'aftereffects':  { icon: 'logos:adobe-after-effects' },
  'audition':      { imgSrc: auditionImg },

  // Design
  'figma':         { icon: 'logos:figma' },
  'canva':         { icon: 'simple-icons:canva' },

  // Audio
  'garageband':    { imgSrc: garageBandImg },
  'bandlab':       { imgSrc: bandlabImg },

  // Dev
  'vscode':        { icon: 'logos:visual-studio-code' },

  // AI
  'claude':        { imgSrc: claudeImg },
  'chatgpt':       { imgSrc: chatgptImg },
};

export const toolIcons = [
  {
    category: "Design",
    tools: [
      { name: "Photoshop",   icon: "logos:adobe-photoshop" },
      { name: "Illustrator", icon: "logos:adobe-illustrator" },
      { name: "InDesign",    icon: "logos:adobe-indesign" },
      { name: "Figma",       icon: "logos:figma" },
      { name: "Canva",       icon: "simple-icons:canva" },
    ],
  },
  {
    category: "Dev",
    tools: [
      { name: "HTML",    icon: "logos:html-5" },
      { name: "CSS",     icon: "logos:css-3" },
      { name: "JS",      icon: "logos:javascript" },
      { name: "React",   icon: "logos:react" },
      { name: "Node",    icon: "logos:nodejs-icon" },
      { name: "VS Code", icon: "logos:visual-studio-code" },
    ],
  },
  {
    category: "Audio & Video",
    tools: [
      { name: "Premiere Pro",  icon: "logos:adobe-premiere" },
      { name: "After Effects", icon: "logos:adobe-after-effects" },
      { name: "Audition",      imgSrc: auditionImg },
      { name: "GarageBand",    imgSrc: garageBandImg },
      { name: "BandLab",       imgSrc: bandlabImg },
    ],
  },
  {
    category: "AI",
    tools: [
      { name: "Claude",  imgSrc: claudeImg },
      { name: "ChatGPT", imgSrc: chatgptImg },
    ],
  },
];
