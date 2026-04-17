import banner     from '../../../assets/project-assets/revolve/banner.jpg';
import storeSign  from '../../../assets/project-assets/revolve/store-sign.jpg';
import logos      from '../../../assets/project-assets/revolve/logos.jpg';
import type1  from '../../../assets/project-assets/revolve/type.jpg';
import type2  from '../../../assets/project-assets/revolve/type-2.jpg';

export const revolveVinylDetail = {
    id:   'revolve',
    slug: 'revolve-vinyl-brand-design',

    overview: {
        description: 'Concept and brand design for Revolve Vinyl, a fictitious online vinyl store. The identity leans into a modern, bold aesthetic — balancing the warmth of analog music culture with a clean, contemporary visual system built for a digital-first platform.',
        teamType: 'solo',
    },

    gallery: [
        { src: banner,    caption: 'Brand Banner', featured: true },
        { src: storeSign, caption: 'Store Sign',  featured: true },
        { src: logos,     caption: 'Logo Suite',  featured: true },
        { src: type1,  caption: 'Typography',   featured: true },
        { src: type2,  caption: 'Typography 2', featured: true },
    ],

    sections: [
        {
            title: 'Challenge',
            body: 'Content coming soon.',
        },
    ],

    suggested: ['spoonful-of-love-brand-redesign', 'vhs-film-festival-branding'],
};
