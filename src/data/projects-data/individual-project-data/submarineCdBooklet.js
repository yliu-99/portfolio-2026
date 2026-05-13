import poolMockup from "../../../assets/project-assets/submarine/pool-mockup-opt.jpg";
import cdFrontBack from "../../../assets/project-assets/submarine/CD-front-and-back.jpg";
import bookletMockup from "../../../assets/project-assets/submarine/booklet-mockup-tall.jpg";
import styleguide from "../../../assets/project-assets/submarine/styleguide.jpg";
import moodboard from "../../../assets/project-assets/submarine/Moodboard.jpg";
import research from "../../../assets/project-assets/submarine/research.jpg";
import frontCover from "../../../assets/project-assets/submarine/pages/front-cover.jpg";
import trackList from "../../../assets/project-assets/submarine/pages/track-list.jpg";
import pg1 from "../../../assets/project-assets/submarine/pages/pg-1.jpg";
import pg2 from "../../../assets/project-assets/submarine/pages/pg-2.jpg";
import pg3 from "../../../assets/project-assets/submarine/pages/pg-3.jpg";
import pg4 from "../../../assets/project-assets/submarine/pages/pg-4.jpg";
import pg5 from "../../../assets/project-assets/submarine/pages/pg-5.jpg";
import backCover from "../../../assets/project-assets/submarine/pages/back-cover.jpg";
import original from "../../../assets/project-assets/submarine/original-art.webp";

export const submarineCdBookletDetail = {
  id: "submarine",
  slug: "submarine-cd-booklet-print-design",

  // ── Overview ──────────────────────────────────────────────────────────────
  overview: {
    description:
      'A CD Booklet design project focused on supporting music and lyrical storytelling using graphic, colour, and typography — built for "Submarine" by The Marías.',
    teamType: "solo",
  },

  // ── Gallery ───────────────────────────────────────────────────────────────
  gallery: [
    { src: cdFrontBack, caption: "Mockup (Front + Back)", featured: true },
    { src: poolMockup, caption: "Underwater Mockup", featured: true },
    { src: bookletMockup, caption: "Booklet Spread", featured: true },
    { src: frontCover, caption: "Front Cover" },
    { src: trackList, caption: "Track List" },
    { src: pg1, caption: "Page 1" },
    { src: pg2, caption: "Page 2" },
    { src: pg3, caption: "Page 3" },
    { src: pg4, caption: "Page 4" },
    { src: pg5, caption: "Page 5" },
    { src: backCover, caption: "Back Cover" },
    { src: moodboard, caption: "Moodboard" },
    { src: styleguide, caption: "Style Guide" },
  ],

  // ── Tabbed narrative sections (single-word titles, up to 6) ───────────────
  sections: [
    {
      title: "Challenge",
      body: 'Design and reimagine a CD booklet for an existing album, "Submarine" by The Marías. This album already has a well established visual identity and storytelling through its cover art, promotional materials, and music videos. The challenge was to create a physical booklet that supports and reinforces the existing narrative and aesthetic, offer a different perspective on the thematic focus, without drifting too far from the original intent.',
      image: original,
    },
    {
      title: "Discovery",
      body: "During my research, Maria mentioned in one of her interviews that loneliness and technology are intertwined, and I decided to further explore this idea in this project. This will bring a slight shift in perspective to the existing narrative while not detracting from the overarching storytelling. My mood board consists of these types of imagery: ripples, distortion, and blurriness to represent water and images of old technology to add a surreal, dissociative feel.",
      image: moodboard,
    },
    {
      title: "Process",
      body: "In order to achieve the style I wanted, I needed to use a mixture of photos, illustrations, textures, and typography. This work was completed across Photoshop, Illustrator, Figma, and InDesign. The most important part of the process was the use of blend modes, which allowed me to bring unexpected elements together and create a surreal, dreamlike quality. I used a lot of distortion, blurring, and textures to apply water-like qualities, and used an almost monochromatic colour palette to craft a solitary, introspective mood.",
      image: pg1,
    },
    {
      title: "Delivery",
      body: "The final booklet spans 8 pages with a front cover, back cover, tracklisting page, and 5 lyric and imagery spreads. Some pages contain the complete lyrics, while other feature important excerpts to bring more focus to the imagery. The layout was initially created in Figma for the easy utilization of all design features, but the final design was completed in InDesign to ensure print quality. ",
      image: bookletMockup,
    },
    {
      title: "Takeaway",
      body: "This project allowed me to apply my own creative interpretation to an existing design, and also help me practice storytelling through the use of graphics, typography, colours, and layout. In my next iteration of this project, I would like to explore expanding on this thematic idea and applying it on a larger scale, such as a design for a tour poster, merchandise, and a social media marketing reel. It is entirely possible to apply motion to some of the elements in this booklet, and I would be interested to see the entire system being applied across different mediums and formats.",
      image: poolMockup,
      keypoints: [
        "A concept can expand and gain depth through a shift in perspective",
        "Use consistent application of design techniques",
        "Extract the 'key' component for storytelling",
      ],
    },
  ],

  // ── Suggested ─────────────────────────────────────────────────────────────
  suggested: ["vhs-film-festival-branding", "spoonful-of-love-brand-redesign"],
};
