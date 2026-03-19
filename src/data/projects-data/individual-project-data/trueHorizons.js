const characterDesignImage  = 'https://i.postimg.cc/sDkxmN1d/a-aesthetic.png';
const filmingSetupImage     = 'https://i.postimg.cc/7YGMbdjp/Screenshot-2025-08-15-152626.png';
const editingImage          = 'https://i.postimg.cc/NFhTXf3S/Screenshot-2025-08-15-152858.png';
const motionGraphicsImage   = 'https://i.postimg.cc/Gh89kCLx/motion-graphics.jpg';
const soundEditingImage     = 'https://i.postimg.cc/15q58rBW/adobe-audition.jpg';

export const trueHorizonsDetail = {
    id:   'horizons',
    slug: 'true-horizons',

    overview: {
        description: 'A narrative-driven commercial exploring the relationship of two long-distance friends, emphasizing the value of personal connection over external and online validation.',
        teamType: 'team',
    },

    gallery: [
        { src: 'https://www.youtube.com/embed/EbJEhks53lA', caption: 'True Horizons', type: 'video' },
    ],

    sections: [
        { title: 'Challenge',  body: 'Content coming soon.', image: characterDesignImage },
        { title: 'Discovery',  body: 'Content coming soon.', image: filmingSetupImage },
        { title: 'Process',    body: 'Content coming soon.', image: editingImage },
        { title: 'Delivery',   body: 'Content coming soon.', image: motionGraphicsImage },
        { title: 'Takeaway',   body: 'Content coming soon.', image: soundEditingImage },
    ],

    suggested: ['mythbusters', 'apex-mountain-bikes'],
};
