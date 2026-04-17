import typographicAlphabet  from '../assets/playground-assets/typographic-alphabet.jpg';
import catLineArt           from '../assets/playground-assets/cat line art.mp4';

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
        id: 'svg-cat-animation',
        title: 'SVG Cat Animation',
        category: 'Web Animation',
        description: 'A minimalist SVG cat animation built with plain HTML and CSS. Uses layered vector paths and stroke-dash animations to create a hand-drawn line art effect — the cat\'s outline and details are gradually revealed in a continuous loop. Built for Web Animations at BCIT, Term 2.',
        repo: 'https://github.com/yliu-99/SVG-cat-animation.git',
        thumbnail: { type: 'video', src: catLineArt },
        media: [
            { type: 'video', src: catLineArt },
        ],
    },
    {
        id: 'typographic-alphabet',
        title: 'Typographic Alphabet',
        category: 'Graphic Design',
        description: 'A typographic alphabet project created in Term 1 at BCIT for Graphic Design class — exploring letterform, composition, and visual consistency across a full character set.',
        thumbnail: typographicAlphabet,
        media: [
            typographicAlphabet,
        ],
    },
];
