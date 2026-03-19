import challenge   from '../../../assets/project-assets/apex/challenge.jpg';
import apexShot    from '../../../assets/project-assets/apex/apex-screenshot.png';
import sicbeat     from '../../../assets/project-assets/apex/sicbeat.m4a';
import filmingImg  from '../../../assets/project-assets/apex/filming.jpg';
import editingImg  from '../../../assets/project-assets/apex/editing.jpg';
import reflection  from '../../../assets/project-assets/apex/reflection.jpg';

export const apexMountainBikesDetail = {
    id:   'apex',
    slug: 'apex-mountain-bikes',

    overview: {
        description: 'A 2-minute talking head commercial for a fictional mountain bike company — combining original music production, 3-point lighting, and an interview format built around emotion over product specs.',
        teamType: 'team',
    },

    gallery: [
        { src: 'https://www.youtube.com/embed/dO7TxaDxEjk', caption: 'Apex Mountain Bikes', type: 'video' },
    ],

    sections: [
        {
            title: 'Challenge',
            body: 'This project was created for the Video Storytelling course during Term 2 at BCIT. The goal was to write, film, produce music, and edit a 2-minute talking head commercial for a fictional mountain bike company — using the 3-point lighting technique and incorporating provided mountain bike footage. It was our first video project as a group, and our first time working hands-on with video composition, live audio recording, set design, and lighting all at once.',
            image: challenge,
        },
        {
            title: 'Concept',
            body: 'None of us had any real experience with mountain biking, which actually worked in our favour — it pushed us to focus on how the sport makes people feel rather than getting caught up in technical details. We built the brand Apex around four core feelings: action, energy, style, and reliability. Instead of a scripted monologue, we chose an interview format with improvised responses from our actor playing a professional mountain biker. We felt this would come across as more natural and avoid the hard-sell feel. Our target audience was a younger demographic that values style and authenticity.',
            image: apexShot,
        },
        {
            title: 'Music',
            body: 'I produced the music in GarageBand, going for an R&B/Hip Hop sound to match the laid-back and stylish vibe of the brand. I layered loops to build different sections, added pitched vocal samples for harmonies in the A section, and created a separate Hip Hop drum beat for the B section — intended to play over the product action shots. After sharing the first draft with the team, we agreed it ran a bit long, so I trimmed parts of the A section to bring the total under two minutes.',
            image: sicbeat,
            startTime: 75,
        },
        {
            title: 'Filming',
            body: 'On filming day, we started by reviewing the process and running lines with the actor before setting up props, costume elements, and lighting. After testing the camera and mic setup, we ran a few takes to get the actor comfortable. The main interview was captured in one continuous take to keep the performance consistent. We also filmed behind-the-scenes clips — the actor walking in, sitting down, adjusting his clothes — to add a natural, relatable feel to the opening and closing of the video.',
            image: filmingImg,
        },
        {
            title: 'Editing',
            body: 'Once the music was finalized, we synced the video to the track in Premiere Pro. We opened with the behind-the-scenes footage to set the tone and intercut mountain biking clips that matched what was being said in the interview. During sound editing in Audition, I noticed room echo in the voice recordings — caused by filming in a large room with the shotgun mic placed too far from the speaker — and reduced it as much as possible. I adjusted panning and music volume to keep the speaker clear throughout, and we finished with an ending screen featuring the logo and website link.',
            image: editingImg,
        },
        {
            title: 'Reflection',
            body: 'This project gave me a solid introduction to video production and showed me how much of the final result depends on decisions made before the camera starts rolling. The audio echo was the biggest technical setback, and it came down to mic placement during the shoot — something I\'d prioritize much earlier next time. That said, the interview format worked really well for what we were going for, and producing the music was one of the most enjoyable parts of the project. I came away with a better understanding of how audio, visuals, and pacing work together to shape how a viewer feels.',
            image: reflection,
        },
    ],

    suggested: ['true-horizons', 'mythbusters'],
};
