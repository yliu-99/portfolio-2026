import mainBanner  from '../../../assets/project-assets/breast-cancer/main-banner.jpg';
import mainPoster  from '../../../assets/project-assets/breast-cancer/main-poster.jpg';
import variation   from '../../../assets/project-assets/breast-cancer/variation.jpg';

export const getAGripDetail = {
    id: 'get-a-grip',
    slug: 'get-a-grip-breast-cancer-awareness',

    // ── Overview ──────────────────────────────────────────────────────────────
    overview: {
        description:
            '(Project in Development) A breast cancer awareness campaign that tackles the "awareness gap" in women\'s health in Canada by encouraging self-examinations as an important preventive measure — driving traffic to the BC Women\'s Health Foundation for more detailed information.',
        teamType: 'solo',
    },

    // ── Gallery ───────────────────────────────────────────────────────────────
    gallery: [
        { src: mainBanner, caption: 'Main Banner',  featured: true },
        { src: mainPoster, caption: 'Main Poster',  featured: true },
        { src: variation,  caption: 'Variation',    featured: true },
    ],

    // ── Tabbed narrative sections ─────────────────────────────────────────────
    sections: [
        {
            title: 'Challenge',
            body: 'Stay tuned, this project is in progress.',
        },
    ],

    // ── Suggested ─────────────────────────────────────────────────────────────
    suggested: ['submarine-cd-booklet-print-design', 'vhs-film-festival-branding'],
};
