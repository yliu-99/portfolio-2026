export const trueHorizonsDetail = {
    id: 'horizons',
    slug: 'true-horizons',

    sections: [

        {
            type: 'textBlock',
            heading: 'The Brief',
            body: '',
        },

        {
            type: 'videoEmbed',
            url: 'https://www.youtube.com/embed/EbJEhks53lA?si=RYiRPDSJ0d7MVQMW',
            caption: '',
        },

        {
            type: 'textBlock',
            heading: 'The Story',
            body: '',
        },

        {
            type: 'splitSection',
            layout: 'imageRight',
            heading: 'Pre-Production',
            body: '',
            image: '',
        },

        {
            type: 'splitSection',
            layout: 'imageLeft',
            heading: 'Production',
            body: '',
            image: '',
        },

        {
            type: 'imageGrid',
            columns: 3,
            images: [
                { src: '', alt: 'Behind the scenes' },
                { src: '', alt: 'Production still' },
                { src: '', alt: 'On set' },
            ],
        },

        {
            type: 'textBlock',
            heading: 'Sound & Post',
            body: '',
        },

        {
            type: 'pullQuote',
            quote: '',
            author: '',
        },

        {
            type: 'textBlock',
            heading: 'The Outcome',
            body: '',
        },

    ],

    suggested: ['mythbusters', 'apex-mountain-bikes'],
};
