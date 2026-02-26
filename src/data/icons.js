// ── Centralized Icon Registry ─────────────────────────────────────────────
// All icons used in the portfolio live here.
// FontAwesome: import the object and re-export it from this file.
// Iconify: add the icon ID string to the toolIcons data below.
// Never import icons directly in components — always go through this file.

// Navigation & UI
export {
  faBars,        // HamburgerMenu — mobile nav open
  faXmark,       // HamburgerMenu — mobile nav close
  faCaretDown,   // HomeHero, AboutMe — scroll hint / directional indicator
  faCaretRight,  // AboutMe — section title indicator
  faPlus,        // FloatingMenu — expand
  faMinus,       // FloatingMenu — collapse
} from "@fortawesome/free-solid-svg-icons";

// Social & Contact
export {
  faEnvelope,   // Footer, HamburgerMenu — email link
} from "@fortawesome/free-solid-svg-icons";

export {
  faLinkedin,   // Footer, HamburgerMenu — LinkedIn
  faInstagram,  // HamburgerMenu — Instagram
  faYoutube,    // Footer, HamburgerMenu — YouTube
  faGithub,     // Footer, HamburgerMenu — GitHub
} from "@fortawesome/free-brands-svg-icons";


// ── Tool Icons (Iconify) ──────────────────────────────────────────────────
// Used in MyTools. Icon IDs are strings passed to <Icon icon="..." />.
// To add a tool: append an entry to the relevant group array.

export const toolIcons = [
  {
    category: "Adobe",
    tools: [
      { name: "Photoshop",    icon: "simple-icons:adobephotoshop"   },
      { name: "Illustrator",  icon: "simple-icons:adobeillustrator" },
      { name: "InDesign",     icon: "simple-icons:adobeindesign"    },
      { name: "Premiere Pro", icon: "simple-icons:adobepremierepro" },
      { name: "Audition",     icon: "simple-icons:adobeaudition"    },
      { name: "After Effects",icon: "simple-icons:adobeaftereffects"},
      { name: "Lightroom",    icon: "simple-icons:adobelightroom"   },
      { name: "Dimension",    icon: "simple-icons:adobedimension"   },
      { name: "Fresco",       icon: "simple-icons:adobefresco"      },
    ],
  },
  {
    category: "Design & Dev",
    tools: [
      { name: "Figma",        icon: "simple-icons:figma"              },
      { name: "Canva",        icon: "simple-icons:canva"              },
      { name: "VS Code",      icon: "simple-icons:visualstudiocode"   },
    ],
  },
  {
    category: "Audio",
    tools: [
      { name: "GarageBand",   icon: "simple-icons:garageband"  },
      { name: "BandLab",      icon: "simple-icons:bandlab"     },
    ],
  },
  {
    category: "AI",
    tools: [
      { name: "Claude",       icon: "simple-icons:claude"   },
      { name: "ChatGPT",      icon: "simple-icons:chatgpt"  },
    ],
  },
];
