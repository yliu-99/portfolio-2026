import submarineImage from '../../assets/project-assets/submarine/pool-mockup-opt.jpg';

// !! update image links
const vancouverHorrorShowImage = "https://i.postimg.cc/VNCN3yZW/vancouver-horror-show.png";
const apexMountainBikesVid = "https://www.youtube.com/embed/dO7TxaDxEjk?si=Z77HXMo1kgau1YqQ";
const trueHorizonsVid = "https://www.youtube.com/embed/EbJEhks53lA?si=RYiRPDSJ0d7MVQMW";
const mythbustersVid = "https://www.youtube.com/embed/ioG4kkKj6ZM?si=ymFZFlZC33jhShYV";


export const projectsData = [
    // 03/26
    {
        id:'submarine',
        title:'SUBMARINE CD BOOKLET',
        slug:'submarine-cd-booklet-print-design',
        type:'img',
        media:submarineImage,
        heroVideoId: 'KsUM108TayE',   // looping bg video for the project detail hero
        hoverVideoId: 'KsUM108TayE',  // preloaded hover video for the project grid card
        year:'03/26',
        timeline:'Feb 23 - Mar 16, 2026',
        description:'CD booklet design for the "Submarine" album by the Marias, focusing on reinforcing the existing storytelling and aesthetic of the music through design and layout.',
        shortDescription: 'CD booklet design for the "Submarine" album by the Marias.',
        chips:['graphic design', 'print', 'indesign'],
        category:'graphic design',
        tools: ['figma', 'photoshop', 'indesign', 'illustrator'],
        role: ['graphic design','layout design'],
        featured: true
    },
    // 07/25
    {
        id:'mythbusters',
        title:'MYTHBUSTERS',
        slug:'mythbusters-motion-graphics',
        type:'vid',
        media: mythbustersVid,
        year:'07/25',
        timeline:'Jun 11 - Jul 5, 2025',
        description:'A Mythbusters explainer style motion graphics video focusing on debunking the biggest personal myth -- "perfectionism',
        shortDescription: 'Motion graphics debunking the personal myth of perfectionism.',
        chips: ['motion graphics', 'storytelling', 'sound design'],
        category:'motion',
        tools: ['after effects', 'photoshop', 'audition', 'illustrator'],
        role: ['concept development', 'scriptwriter', 'motion design', 'sound design'],
        featured: true
    },
    // 04/25
    {
        id:'horizons',
        title:'TRUE HORIZONS',
        slug:'true-horizons-narrative-film',
        type:'vid',
        media: trueHorizonsVid,
        year:'04/25',
        timeline:'Dec 5, 2024 - Jun 11, 2025',
        description:'A narrative-driven commercial exploring the relationship of two long distance friends, emphasizing the value of personal connection over external/online validation.',
        shortDescription: 'A narrative commercial about long-distance friendship and real connection.',
        chips:['video production','storytelling','sound design'],
        category:'video',
        tools: ['premier','audition','after effects'],
        role: ['concept development', 'actor', 'director', 'editor', 'sound design'],
        featured: true
    },
    // 02/25
    {
        id:'apex',
        title:'APEX MOUNTAIN BIKES',
        slug:'apex-mountain-bikes-brand-commercial',
        type:'vid',
        media: apexMountainBikesVid,
        heroVideoId:  'Sr4oXdiLrzE',  // preview shown on hero bg + cards/featured
        hoverVideoId: 'Sr4oXdiLrzE',
        year:'02/25',
        timeline:'Jan 30 - Feb 27, 2025',
        description:'A 2-minute talking head commercial for a fictitious mountain bike company with energetic storytelling, featuring original music made in GarageBand.',
        shortDescription: 'Talking head commercial with original music for a fictional mountain bike brand.',
        chips:['video production','storytelling','sound design','music production'],
        category:'video',
        tools: ['premier','audition','garageband'],
        role: ['brand development', 'scriptwriter','director', 'music production', 'sound design'],
        featured: true
    },
    // 12/24
    // { id:'fable', hidden: true },
    {
        id:'vhs',
        title:'VHS FILM FESTIVAL',
        slug:'vhs-film-festival-branding',
        type:'img',
        media:vancouverHorrorShowImage,
        year:'12/24',
        timeline:' Nov 14, 2024 - Dec 12, 2025',
        description:'A redesign project for a Vancouver-based horror film festival focusing on improved branding.',
        shortDescription: 'Redesigned branding and identity for a Vancouver horror film festival.',
        chips:['graphic design', 'redesign', 'branding'],
        category:'graphic design',
        tools: ['photoshop', 'illustrator','indesign'],
        role: ['graphic design', 'web design', 'brand development'],
        featured: false
    },

    // ── Section style-guide (local dev only — sectionMapDemo.js is gitignored) ──
    // Uncomment to enable /projects/section-map locally:
    // {
    //     id: 'section-map',
    //     slug: 'section-map',
    //     hidden: true,
    //     featured: false,
    //     title: 'Section Style Guide',
    //     type: 'img',
    //     media: 'https://picsum.photos/seed/styleguide/1600/900',
    //     year: '2025',
    //     timeline: 'Ongoing',
    //     description: 'Internal style-guide page showing every SectionMap component.',
    //     shortDescription: 'Internal section style guide.',
    //     chips: ['style guide', 'dev'],
    //     category: 'dev',
    //     tools: ['vscode'],
    //     role: ['developer'],
    // },
]
