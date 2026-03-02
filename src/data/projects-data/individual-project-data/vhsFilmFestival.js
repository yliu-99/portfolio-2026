export const vhsFilmFestivalDetail = {
    id: 'vhs',
    slug: 'vhs-film-festival',

    sections: [

        {
            type: 'textBlock',
            heading: 'The Brief',
            body: '',
        },

        {
            type: 'splitSection',
            layout: 'imageRight',
            heading: 'The Audit',
            body: '',
            image: '',
        },

        {
            type: 'fullImage',
            image: '',
            alt: 'Before and after brand comparison',
        },

        {
            type: 'textBlock',
            heading: 'The Redesign',
            body: '',
        },

        {
            type: 'imageGrid',
            columns: 3,
            images: [
                { src: '', alt: 'Logo redesign' },
                { src: '', alt: 'Color system' },
                { src: '', alt: 'Typography' },
            ],
        },

        {
            type: 'splitSection',
            layout: 'imageLeft',
            heading: 'Collateral',
            body: '',
            image: '',
        },

        {
            type: 'fullImage',
            image: '',
            alt: 'Final brand board',
        },

        {
            type: 'textBlock',
            heading: 'The Outcome',
            body: '',
        },

    ],

    suggested: ['fable-fragrances', 'thrash-hair-color'],
};
