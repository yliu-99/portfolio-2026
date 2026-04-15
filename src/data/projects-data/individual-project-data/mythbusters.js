import realMythbusters    from '../../../assets/project-assets/mythbusters/real-mythbusters.jpg';
import mythbustersImg     from '../../../assets/project-assets/mythbusters/mythbusters.jpg';
import character          from '../../../assets/project-assets/mythbusters/Character.jpg';
import blinking           from '../../../assets/project-assets/mythbusters/blinking.mp4';
import editing            from '../../../assets/project-assets/mythbusters/editing.png';
import mythbustersPreview from '../../../assets/project-assets/mythbusters/mythbusters-preview.mp4';

export const mythbustersDetail = {
    id:   'mythbusters',
    slug: 'mythbusters-motion-graphics',

    overview: {
        description: 'A Mythbusters-style motion graphics explainer video debunking the personal myth of perfectionism — combining original sound design, script, and animation.',
        teamType: 'solo',
    },

    gallery: [
        { src: 'https://www.youtube.com/embed/ioG4kkKj6ZM', caption: 'Mythbusters', type: 'video' },
    ],

    sections: [
        {
            title: 'Challenge',
            body: 'The challenge was to create a compelling 1-minute explainer video in After Effects using a Mythbusters format, for the Motion Graphics course in Term 3 of BCIT\'s New Media program. The constraints were tight — one minute is not a lot of time to set up a myth, build an argument, and land a conclusion — so finding the right topic and keeping the storytelling focused and effective was the core challenge of this project.',
            image: realMythbusters,
        },
        {
            title: 'Narrative',
            body: 'One of the main challenges was finding the right topic that could be told effectively within one minute. I decided to go with a more personal myth: perfectionism, because I wanted to craft something relatable. From there, I wrote and trimmed the script with pacing in mind, then recorded the voiceover in Adobe Audition, running multiple takes to keep the tone consistent.',
            image: mythbustersImg,
        },
        {
            title: 'Assets',
            body: 'I designed the main character in Illustrator, modelling her after myself — including the bright blue hair I had when I was around 20. I created both the front and back of the character along with different facial expressions, then separated everything into layers and exported into Photoshop for animation prep. Smaller assets were drawn in Illustrator or sourced from Adobe Stock, and backgrounds were generated in Adobe AI to help meet the deadline.',
            image: character,
        },
        {
            title: 'Animation',
            body: 'To bring the character to life, I created a blinking animation by cycling through three eye states — open, half-closed, and closed. I used directional movement, rotation, and scaling to add subtle motion throughout the scenes, and applied masks to create variety in transitions. The Puppet Warp tool helped add more organic movement to the character, Easy Ease was applied to keyframes to smooth things out, and motion blur was added to faster movements.',
            image: blinking,
        },
        {
            title: 'Sound',
            body: 'Sound was an important part of making this video feel complete. I chose a quiet, ambient music track to match the personal tone of the story, added environment sounds to the nature scenes, and timed sound effects to key transitions. All audio was royalty-free and downloaded from Pixabay, then edited in Adobe Audition. This was the final step in putting the whole thing together.',
            image: editing,
        },
        {
            title: 'Reflection',
            body: 'This project helped me practice storytelling through motion graphics and get more comfortable working in After Effects. Choosing a personal topic made the creative decisions feel more purposeful, and working within a one-minute constraint pushed me to be more deliberate about what stays in and what gets cut. In a future iteration, I would like to explore more complex character rigs and experiment further with transitions and scene variety.',
            image: mythbustersPreview,
            keypoints: [
                'Choosing a personal topic leads to more purposeful and authentic creative decisions.',
                'Storytelling within tight constraints demands deliberate clarity over quantity.',
                'Working in chunks — script, assets, animation, sound — helps manage complexity and keep the project on track.',
            ],
        },
    ],

    suggested: ['true-horizons-narrative-film', 'apex-mountain-bikes-brand-commercial'],
};
