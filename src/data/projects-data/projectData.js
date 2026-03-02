// !! update image links
const fableFragrancesImage = "https://i.postimg.cc/NjVMJGD0/fable-fragrances.png";
const vancouverHorrorShowImage = "https://i.postimg.cc/VNCN3yZW/vancouver-horror-show.png";
const thrashHairImage = "https://i.postimg.cc/X796SjnJ/Logo-Dark-OG.png";
const apexMountainBikesVid = "https://www.youtube.com/embed/dO7TxaDxEjk?si=Z77HXMo1kgau1YqQ";
const trueHorizonsVid = "https://www.youtube.com/embed/EbJEhks53lA?si=RYiRPDSJ0d7MVQMW";
const mythbustersVid = "https://www.youtube.com/embed/ioG4kkKj6ZM?si=ymFZFlZC33jhShYV";


export const projectsData = [
    {
        id:'mythbusters',
        title:'MYTHBUSTERS',
        slug:'mythbusters',
        type:'vid',
        media: mythbustersVid,
        year:'Jul 2025',
        timeline:'Jun 11 - Jul 5 2025',
        description:'A Mythbusters explainer style motion graphics video focusing on debunking the biggest personal myth -- "perfectionism',
        shortDescription: 'Motion graphics debunking the personal myth of perfectionism.',
        chips: ['motion graphics', 'storytelling', 'sound design'],
        category:'motion',
        tools: ['after effects', 'photoshop', 'audition', 'illustrator'],
        role: ['concept development', 'scriptwriter', 'motion design', 'sound design'],
        featured: true
    },
    {
        id:'horizons',
        title:'TRUE HORIZONS',
        slug:'true-horizons',
        type:'vid',
        media: trueHorizonsVid,
        year:'Apr 2025',
        timeline:'Dec 5 2024 - Jun 11 2025',
        description:'A narrative-driven commercial exploring the relationship of two long distance friends, emphasizing the value of personal connection over external/online validation.',
        shortDescription: 'A narrative commercial about long-distance friendship and real connection.',
        chips:['video production','storytelling','sound design'],
        category:'video',
        tools: ['premier','audition','after effects'],
        role: ['concept development', 'actor', 'director', 'editor', 'sound design'],
        featured: true
    },
    {
        id:'apex',
        title:'APEX MOUNTAIN BIKES',
        slug:'apex-mountain-bikes',
        type:'vid',
        media: apexMountainBikesVid,
        year:'Feb 2025',
        timeline:'Jan 30 - Feb 27 2025',
        description:'A 2-minute talking head commercial for a fictitious mountain bike company with energetic storytelling, featuring original music made in GarageBand.',
        shortDescription: 'Talking head commercial with original music for a fictional mountain bike brand.',
        chips:['video production','storytelling','sound design','music production'],
        category:'video',
        tools: ['premier','audition','garageband'],
        role: ['brand development', 'scriptwriter','director', 'music production', 'sound design'],
        featured: true
    },
    {
        id:'fable',
        title:'FABLE FRAGRANCES',
        slug:'fable-fragrances',
        type:'img',
        media: fableFragrancesImage,
        year:'Dec 2024',
        timeline:'Oct 11 - Dec 17 2025',
        description:'A complete branding and packaging design project for a niche fragrance line, focusing on mystical and enchanting visual storytelling.',
        shortDescription: 'Branding and packaging for an enchanting niche fragrance line.',
        chips: ['graphic design', 'brand design', 'photoshop'],
        category:'graphic design',
        tools: ['photoshop', 'aftereffects','canva'],
        role: ['brand development', 'graphic design', 'illustration'],
        featured: false
    },
    {
        id:'vhs',
        title:'VHS FILM FESTIVAL',
        slug:'vhs-film-festival',
        type:'img',
        media:vancouverHorrorShowImage,
        year:'Dec 2024',
        timeline:' Nov 14 2024 - Dec 12 2025',
        description:'A redesign project for a Vancouver-based horror film festival focusing on improved branding.',
        shortDescription: 'Redesigned branding and identity for a Vancouver horror film festival.',
        chips:['graphic design', 'redesign', 'branding'],
        category:'graphic design',
        tools: ['photoshop', 'illustrator','indesign'],
        role: ['graphic design', 'web design', 'brand development'],
        featured: true
    },
    {
        id:'thrash',
        title:'THRASH! HAIR COLOR',
        slug:'thrash-hair-color',
        type:'img',
        media:thrashHairImage,
        year:'Apr 2025',
        timeline:'Mar 24 - Jun 3 2025',
        description:'Brand design for a pink-inspired hair color company, featuring, logo, style guide, assets, packaging designs made in Illustrator.',
        shortDescription: 'Logo, style guide, and packaging for a bold hair color brand.',
        chips:['graphic design', 'branding', 'illustrator'],
        category:'graphic design',
        tools: ['illustrator', 'photoshop', 'canva'],
        role: ['brand development', 'graphic design', 'packaging design'],
        featured: false
    },
    {
        id:'',
        title:'',
        slug:'',
        type:'',
        media:'',
        year:'',
        timeline:'',
        description:'',
        chips:'',
        category:'',
        featured: true
    },
]