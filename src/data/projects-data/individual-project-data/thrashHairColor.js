const thrashHairImage      = 'https://i.postimg.cc/X796SjnJ/Logo-Dark-OG.png';
const proposalImage        = 'https://i.postimg.cc/26RDWs53/Illustration-Proposal-4.jpg';
const visualElementsImage  = 'https://i.postimg.cc/wvVGBZyC/thrash-assets.jpg';
const mockupsImage         = 'https://i.postimg.cc/Jn2jK59y/3-D-Mockup.png';

const logoSketch1 = 'https://i.postimg.cc/y8mWWyjm/sketch-1.jpg';

export const thrashHairColorDetail = {
    id:   'thrash',
    slug: 'thrash-hair-color',

    overview: {
        description: 'Brand design for a bold, pink-inspired hair color company — including logo, style guide, brand assets, and packaging designs created entirely in Illustrator.',
        teamType: 'solo',
    },

    gallery: [
        { src: thrashHairImage,     caption: 'Logo — Dark' },
        { src: proposalImage,       caption: 'Illustration Proposal' },
        { src: visualElementsImage, caption: 'Brand Assets' },
        { src: mockupsImage,        caption: '3D Mockup' },
    ],

    sections: [
        { title: 'Challenge',  body: 'Content coming soon.', image: proposalImage },
        { title: 'Discovery',  body: 'Content coming soon.', image: logoSketch1 },
        { title: 'Process',    body: 'Content coming soon.', image: visualElementsImage },
        { title: 'Delivery',   body: 'Content coming soon.', image: mockupsImage },
        { title: 'Takeaway',   body: 'Content coming soon.' },
    ],

    suggested: ['fable-fragrances', 'vhs-film-festival-branding'],
};
