export const mythbustersDetail = {
    id: 'mythbusters',
    slug: 'mythbusters',

    sections: [

        {
            type: 'textBlock',
            heading: 'The Brief',
            body: '',
        },

        {
            type: 'videoEmbed',
            url: 'https://www.youtube.com/embed/ioG4kkKj6ZM?si=ymFZFlZC33jhShYV',
            caption: '',
        },

        {
            type: 'textBlock',
            heading: 'The Concept',
            body: '',
        },

        {
            type: 'splitSection',
            layout: 'imageRight',
            heading: 'Design & Style Frames',
            body: '',
            image: '',
        },

        {
            type: 'imageGrid',
            columns: 3,
            images: [
                { src: '', alt: 'Storyboard frames' },
                { src: '', alt: 'Style frames' },
                { src: '', alt: 'Animation still' },
            ],
        },

        {
            type: 'splitSection',
            layout: 'imageLeft',
            heading: 'Sound Design',
            body: '',
            image: '',
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

    suggested: ['true-horizons', 'apex-mountain-bikes'],
};
