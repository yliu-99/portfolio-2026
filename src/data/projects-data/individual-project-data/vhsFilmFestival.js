import moodboard     from "../../../assets/project-assets/vhs/moodboard.jpg";
import originalLogo  from "../../../assets/project-assets/vhs/original-logo.jpg";
import colors from "../../../assets/project-assets/vhs/colors.png";
import typography from "../../../assets/project-assets/vhs/typography.png";
import logo from "../../../assets/project-assets/vhs/logo.png";
import website from "../../../assets/project-assets/vhs/website.jpg";
import webPromo from "../../../assets/project-assets/vhs/web-promo.jpg";
import poster from "../../../assets/project-assets/vhs/poster.jpg";
import ticket from "../../../assets/project-assets/vhs/ticket.jpg";
import longSleeve from "../../../assets/project-assets/vhs/longsleeve-merch.jpg";
import shortSleeve from "../../../assets/project-assets/vhs/shortsleeve-merch.jpg";
import tote from "../../../assets/project-assets/vhs/tote.jpg";

export const vhsFilmFestivalDetail = {
  id: "vhs",
  slug: "vhs-film-festival-branding",

  overview: {
    description:
      "A redesign project for a Vancouver-based horror film festival — assessing existing branding problems and creating updated solutions across logo, website, social media, merchandise, and event materials.",
    teamType: "solo",
  },

  gallery: [
    { src: website,     caption: "Website Redesign",   featured: true },
    { src: poster,      caption: "Event Poster",        },
    { src: ticket,      caption: "Event Ticket",        },
    { src: longSleeve,  caption: "Merch — Long Sleeve ", featured: true },
    { src: shortSleeve, caption: "Merch — Short Sleeve", featured: true },
    { src: tote,        caption: "Merch — Tote Bag" },
    { src: logo,        caption: "New Logo", featured: true },
    { src: colors,      caption: "Color Palette" },
    { src: typography,  caption: "Typography" },
    { src: webPromo,    caption: "Web Promo" },
  ],

  sections: [
    {
      title: "Challenge",
      body: "The goal of this project was to assess the branding of an existing local organization, identify problem areas, and come up with solutions with real-life design applications. I chose the Vancouver Horror Show Film Festival because of my personal love for horror, and because having attended one of their events before, I came away without a strong impression of their brand — which felt like an interesting problem to work on.",
      image: originalLogo,
    },
    {
      title: "Analysis",
      body: "My main finding was that VHS's existing branding didn't immediately read as \"horror.\" Their brand colours — neon blue, pink, and a light pink used on the website — were visually striking but didn't convey the genre. On top of that, the branding was applied inconsistently across platforms, with variations in type, spacing, and colour that made it harder to recognize in real-life contexts. These two issues became the foundation for my redesign.",
      image: moodboard,
    },
    {
      title: "Style",
      body: "I started by building a moodboard using classic horror movie posters as reference, then pulled a colour palette from that imagery. I paired two contrasting typefaces — Bebas Neue and Roboto Slab — to set the tone for the new brand. The goal was to create a clear set of rules that could be applied consistently across all touchpoints, so the brand would feel cohesive no matter where it showed up.",
      image: typography,
    },
    {
      title: "Logo",
      body: 'One issue with the existing logo was that spelling out "Vancouver Horror Show Film Festival" in full made it long and hard to use effectively. My solution was to use the acronym "VHS" as the primary logo, which freed up space for more creative execution and made it more distinct. I also created longer lockup variations for contexts where the full name is needed. The final logo features a melting effect with horns growing from the first and last letters to reinforce the horror theme.',
      image: logo,
    },
    {
      title: "Mockups",
      body: "With the brand guide and logo finalized, I created mockups showing real-life applications of the new design. For the website, I focused on information architecture and visual consistency — centering the navigation, featuring the new logo in the hero, and removing borders from the feature video for a cleaner, more modern feel. I then designed social media posts, merchandise (t-shirts, tote bags), and event ticket mockups, all using the updated design rules.",
      image: website,
      keypoints: [
          'A logo should be versatile and adapt to different applications',
          'A well-established brand will have consistency across all touchpoints, from digital to physical',
          'Genre-appropriate design choices are essential for effective communication',
      ],
    },
  ],

  suggested: ["submarine-cd-booklet-print-design", "mythbusters-motion-graphics"],
};
