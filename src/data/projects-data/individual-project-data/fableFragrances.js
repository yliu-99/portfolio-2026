import swatchScreenshot  from '../../../assets/project-assets/fable/swatch-screenshot.png';
import sabreBusinessCard from '../../../assets/project-assets/fable/sabre-businesscard.png';
import bansheeBackPanel  from '../../../assets/project-assets/fable/banshee-back-panel.jpeg';
import fableBansheeAd   from '../../../assets/project-assets/fable/fable-banshee-ad.png';

export const fableFragrancesDetail = {
    id:   'fable',
    slug: 'fable-fragrances',

    overview: {
        description: 'A complete branding and packaging design project for a niche fragrance line — focusing on mystical, enchanting visual storytelling across logo, packaging, and brand system.',
        teamType: 'solo',
    },

    gallery: [
        { src: swatchScreenshot,  caption: 'Colour Swatches' },
        { src: sabreBusinessCard, caption: 'Business Card — Sabre' },
        { src: bansheeBackPanel,  caption: 'Back Panel — Banshee' },
        { src: fableBansheeAd,    caption: 'Ad — Banshee' },
    ],

    sections: [
        { title: 'Challenge',  body: 'Content coming soon.', image: swatchScreenshot },
        { title: 'Discovery',  body: 'Content coming soon.' },
        { title: 'Process',    body: 'Content coming soon.', image: sabreBusinessCard },
        { title: 'Delivery',   body: 'Content coming soon.', image: bansheeBackPanel },
        { title: 'Takeaway',   body: 'Content coming soon.' },
    ],

    suggested: ['vhs-film-festival', 'thrash-hair-color'],
};
