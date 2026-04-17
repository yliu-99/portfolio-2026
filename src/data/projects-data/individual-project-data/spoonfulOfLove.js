import mainBanner from '../../../assets/project-assets/spoonful-of-love/main-banner-opt.jpg';
import banner     from '../../../assets/project-assets/spoonful-of-love/banner-opt.jpg';
import logoFull   from '../../../assets/project-assets/spoonful-of-love/logo-full.jpg';
import concept1          from '../../../assets/project-assets/spoonful-of-love/concept-1.jpg';
import concept2          from '../../../assets/project-assets/spoonful-of-love/concept-2.jpg';
import designAssessment  from '../../../assets/project-assets/spoonful-of-love/design-assessment.jpg';
import designAssessment2 from '../../../assets/project-assets/spoonful-of-love/design-assessment2.jpg';
import ogBrand           from '../../../assets/project-assets/spoonful-of-love/og-brand.jpeg';
import research          from '../../../assets/project-assets/spoonful-of-love/research.jpg';
import pitch             from '../../../assets/project-assets/spoonful-of-love/pitch.jpg';
import styleGuide        from '../../../assets/project-assets/spoonful-of-love/style-guide.pdf';

export const spoonfulOfLoveDetail = {
    id:   'spoonful-of-love',
    slug: 'spoonful-of-love-brand-redesign',

    overview: {
        description: 'A brand redesign for Spoonful of Love, a non-profit providing food, education, and essential resources to children living in extreme poverty in Lomas de la Primavera, Mexico. The redesign focuses on polish and brand storytelling — reinforcing the organization\'s core initiatives through a cohesive, purposeful visual identity.',
        teamType: 'team',
    },

    gallery: [
        { src: mainBanner,        caption: 'Main Banner',           featured: true },
        { src: banner,            caption: 'Banner',                featured: true },
        { src: logoFull,          caption: 'Logo',                  featured: true },
        { src: concept1,          caption: 'Concept Direction 1' },
        { src: concept2,          caption: 'Concept Direction 2' },
        { src: designAssessment,  caption: 'Design Assessment' },
        { src: designAssessment2, caption: 'Design Assessment 2' },
    ],

    sections: [
        {
            title: 'Challenge',
            body: 'Spoonful of Love already had heart — but its visual identity wasn\'t communicating the weight of its mission. The challenge was to audit the existing brand: identifying what was working, what was holding it back, and where the storytelling was falling flat. From there, the goal was to make deliberate design decisions that would bring more polish, cohesion, and emotional clarity to the brand — reinforcing the organization\'s core initiatives and helping it connect more meaningfully with the people it serves and the donors it needs to reach.',
            image: ogBrand,
        },
        {
            title: 'Analysis',
            body: 'A review of the existing brand revealed several clear pain points: the logo needed more polish and a heavier typeface with better legibility at scale; the colour palette had room to feel more vibrant and child-like; and typography was inconsistently applied across their website and online channels — fragmenting the brand\'s visual voice. These findings shaped every design decision that followed.',
            image: designAssessment,
        },
        {
            title: 'Research',
            body: 'Three children-focused non-profits were analyzed to identify what makes their branding work. Common strengths emerged: bold, intentional colour, rounded and approachable typography, full-width media, strong calls to action, and clear information hierarchy. These became the benchmarks for the redesign.',
            image: research,
        },
        {
            title: 'Direction',
            body: 'Two concept directions were pitched to the team. Concept 1 — A building block visual identity using the metaphor of constructing a house to represent the organization\'s core initiatives working together, each one a pillar of the whole. Concept 2 — Overlapping blobs with transparencies and illustrated faces, centered on community and framing the organization\'s work as a shared commitment to collective wellbeing. My team chose concept 1 for its stronger storytelling and more versatile visual system.',
            image: pitch,
        },
        {
            title: 'Delivery',
            body: 'The original logo was recreated and enhanced in Illustrator — refined with a heavier typeface and polished details, while keeping the warmth of the original. A set of brand shapes was developed alongside it, building a visual language that feels fun and friendly while keeping the organization\'s mission front and centre.\n\nA full style guide was produced for the team, along with a complete asset export package: 1×, 2× PNGs, SVGs, an .ase colour swatch file, and an icon library — everything needed to apply the brand consistently across any channel.',
            image: mainBanner,
            pdfLink: styleGuide,
        },
        {
            title: 'Reflection',
            body: 'This project gave me the rare opportunity to apply my skills to something real — a living organization with a genuine mission and an audience that needs to be reached. Getting to use what I know about effective visual identity to amplify Spoonful of Love\'s voice, rather than just completing an exercise, made every decision feel more meaningful.\n\nThe brand has since been handed off to the team, and a full website redesign is currently in development by the other members — bringing the visual system to life across a new digital presence.',
            keypoints: [
                'A strong visual identity is a tool for impact, not just aesthetics',
                'Effective brand redesign starts with honest analysis of what isn\'t working',
                'Design for real organizations demands decisions that serve the mission, not just the portfolio',
            ],
        },
    ],

    suggested: ['vhs-film-festival-branding', 'submarine-cd-booklet-print-design'],
};
