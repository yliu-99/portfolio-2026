import click      from '../../../assets/project-assets/true-horizons/click.jpg';
import storyboard  from '../../../assets/project-assets/true-horizons/Storyboard.pdf';
import aesthetic   from '../../../assets/project-assets/true-horizons/aesthetic.jpg';
import filming     from '../../../assets/project-assets/true-horizons/filming.jpg';
import editingImg  from '../../../assets/project-assets/true-horizons/editing.jpg';
import story       from '../../../assets/project-assets/true-horizons/story.jpg';

export const trueHorizonsDetail = {
    id:   'horizons',
    slug: 'true-horizons-narrative-film',

    overview: {
        description: 'A narrative-driven commercial exploring the relationship of two long-distance friends, emphasizing the value of personal connection over external and online validation. This project was completed as a team along with my classmates Ella Jade and Alden Talavera.',
        teamType: 'team',
    },

    gallery: [
        { src: 'https://www.youtube.com/embed/EbJEhks53lA', caption: 'True Horizons', type: 'video' },
    ],

    sections: [
        {
            title: 'Challenge',
            body: 'This video was created as my Term 2 Final Project for the Video Storytelling course at BCIT. The goal was to produce a 4–5 minute story-driven commercial for a fictional company — covering the full production pipeline from pre-visualization to post-production. Working in a team of three, we were responsible for every aspect of production, which meant taking on multiple roles while meeting strict technical requirements for audio, pacing, and framing.',
            image: click,
        },
        {
            title: 'Narrative',
            body: 'We built our story around a fictional travel company called True Horizons, whose brand value focused on forging meaningful connections through travel. The story follows two long-distance friends who reconnect to help one of them through the emotional weight of online criticism — emphasizing real-world connection over fleeting validation. We limited the cast to two main characters close to our own age so the acting would feel authentic and the dynamics relatable. I developed Pinterest boards for each character to establish their personality through costume and appearance.',
            image: storyboard,
        },
        {
            title: 'Planning',
            body: 'The story was first developed as a storyboard in a previous term, which became the foundation for the full production. After presenting our initial storyboard, our instructor gave us feedback that pushed us to add scenes with more emotional context and clearer visual cues to distinguish a platonic friendship from a romantic one. We catalogued every shot, assigned locations, and listed props before setting a shoot schedule. Dialogue was added later as a project requirement — we focused spoken lines around the most emotionally tense moment of the story to keep them purposeful.',
            image: aesthetic,
        },
        {
            title: 'Filming',
            body: 'Filming took place over several weeks and required a lot of coordination and on-the-fly problem-solving. We filmed multiple takes of each scene and experimented with angles and framing to give ourselves flexibility in editing. Lav mics were used for audio and carefully concealed in costumes, with audio tests before every shoot. We used both natural and artificial lighting to create different moods, and simulated time shifts by changing outfits and adjusting sets while filming at the same locations.',
            image: filming,
        },
        {
            title: 'Editing',
            body: 'We edited in Adobe Premiere Pro, assembling a primary timeline and making selective cuts to preserve the core narrative. One creative workaround was using a side-by-side layout to show both characters\' perspectives simultaneously, which saved time and added visual interest. After our first cut, we identified areas where the story felt disjointed, so we returned to film additional scenes to bridge those gaps. We also added motion graphics — text bubbles, notifications, and message effects — to represent the characters\' social media interactions, customized to match the iPhone aesthetic. Sound was mixed in Adobe Audition, where I equalized and normalized dialogue to industry standards, layered in music, and used panning and volume changes to support the emotional arc.',
            image: editingImg,
        },
        {
            title: 'Reflection',
            body: 'This project was a major learning experience in creative problem-solving, collaboration, and production planning. Despite limited resources and no prior experience producing a video at this scale, our team stayed committed and found solutions as obstacles came up. Looking back, I would approach pre-production with more precision — a more detailed storyboard would have clarified our vision early and saved time during filming. I\'d also experiment more with close-up shots to better convey emotion. This project deepened my appreciation for video storytelling and showed me how much small creative decisions shape the final experience.',
            image: story,
            keypoints: [
                'Pre-production precision shapes the quality of every moment captured on camera.',
                'Creative problem-solving and adaptability are just as essential as technical skill on set.',
                'Small decisions — framing, pacing, audio — collectively define how a story feels to an audience.',
            ],
        },
    ],

    suggested: ['mythbusters-motion-graphics', 'apex-mountain-bikes-brand-commercial'],
};
