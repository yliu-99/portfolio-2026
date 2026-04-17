import bansheeAdGraphics from '../assets/project-assets/fable/banshee-ad-graphics.png';
import bansheeBackPanel  from '../assets/project-assets/fable/banshee-back-panel.jpeg';

// Media items can be a plain image path (string) or { type: 'youtube', videoId }
export const PASSION_PROJECTS = [
    {
        id: 'vortex-sounds-intro',
        title: 'Vortex Sounds Intro',
        category: 'Motion Graphics',
        description: 'A motion graphic intro sequence created for Vortex Sounds.',
        thumbnail: { type: 'youtube', videoId: 'kf8Tf30LLHg' },
        media: [
            { type: 'youtube', videoId: 'kf8Tf30LLHg' },
        ],
    },
    {
        id: 'fable-fragrances',
        title: 'Fable Fragrances',
        category: 'Branding & Packaging',
        description: 'A complete branding and packaging design for a niche fragrance line. Built around mystical, enchanting visual storytelling — spanning logo design, colour systems, packaging, and print collateral.',
        thumbnail: bansheeAdGraphics,
        media: [
            bansheeAdGraphics,
            bansheeBackPanel,
        ],
    },
];
