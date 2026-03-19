const apexScreenshot = 'https://i.postimg.cc/MHdZyzXq/apex-screenshot.png';
const apexInterview  = 'https://i.postimg.cc/nVkL8G2g/apex-interview.png';
const garageBand     = 'https://i.postimg.cc/X7YYnBDJ/garage-band.jpg';
const premierPro     = 'https://i.postimg.cc/RhMV6WSg/premier-pro.jpg';

export const apexMountainBikesDetail = {
    id:   'apex',
    slug: 'apex-mountain-bikes',

    overview: {
        description: 'A 2-minute talking head commercial for a fictitious mountain bike company — combining original music production, energetic storytelling, and 3-point lighting technique.',
        teamType: 'team',
    },

    gallery: [
        { src: 'https://www.youtube.com/embed/dO7TxaDxEjk', caption: 'Apex Mountain Bikes', type: 'video' },
    ],

    sections: [
        { title: 'Challenge',  body: 'Content coming soon.', image: apexScreenshot },
        { title: 'Discovery',  body: 'Content coming soon.', image: apexInterview },
        { title: 'Process',    body: 'Content coming soon.', image: garageBand },
        { title: 'Delivery',   body: 'Content coming soon.', image: premierPro },
        { title: 'Takeaway',   body: 'Content coming soon.' },
    ],

    suggested: ['true-horizons', 'mythbusters'],
};
