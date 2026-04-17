import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { toolIcons } from '../../../data/icons';

const allTools = toolIcons.flatMap(g => g.tools);
const imgSrcs  = allTools.filter(t => t.imgSrc).map(t => t.imgSrc);

const POINTS = [
    {
        label: 'Graphic Design',
        skills: ['Logo & identity systems', 'Packaging & print design', 'Typography & colour systems', 'Brand guidelines & collateral'],
        tools: ['Illustrator', 'InDesign', 'Photoshop', 'Canva'],
    },
    {
        label: 'Motion & Video',
        skills: ['Motion graphics & animation', 'Video editing & post-production', 'Audio mixing & sound design', 'Social & broadcast formats'],
        tools: ['After Effects', 'Premiere Pro', 'Audition', 'GarageBand'],
    },
    {
        label: 'Marketing & Storytelling',
        skills: ['Campaign concept & strategy', 'Copywriting & content direction', 'Social media & digital content', 'Audience research & positioning'],
        tools: ['Canva', 'Photoshop', 'Premiere Pro', 'Figma'],
    },
    {
        label: 'UX / UI Design',
        skills: ['User research & personas', 'Wireframing & prototyping', 'Interface & interaction design', 'Developer handoff & specs'],
        tools: ['Figma', 'Illustrator', 'Photoshop'],
    },
];

export function ToolsMarquee() {
    const [ready, setReady] = useState(imgSrcs.length === 0);

    useEffect(() => {
        if (imgSrcs.length === 0) return;
        let loaded = 0;
        imgSrcs.forEach(src => {
            const img = new Image();
            img.onload = img.onerror = () => {
                if (++loaded === imgSrcs.length) setReady(true);
            };
            img.src = src;
        });
    }, []);

    const items = [...allTools, ...allTools, ...allTools];

    return (
        <div className="tools-marquee py-8 overflow-hidden">
            <div className={`tools-marquee__track flex gap-8${ready ? '' : ' paused'}`}>
                {items.map((tool, i) => (
                    <div key={i} className="tools-marquee__item shrink-0 flex items-center justify-center w-8 h-8 text-black/70">
                        {tool.imgSrc
                            ? <img src={tool.imgSrc} alt={tool.name} className="w-8 h-8 object-contain" />
                            : <Icon icon={tool.icon} width={32} height={32} />
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

function WhatIDo() {
    return (
        <div className="font-body text-black py-4">
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-start-3 lg:col-span-8" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', lineHeight: 1.85 }}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {POINTS.map(({ label, skills }) => (
                            <div key={label} className="border-2 border-black bg-white shadow-[3px_7px_6.5px_rgba(0,0,0,0.25)] flex flex-col gap-4 overflow-hidden">
                                <p className="font-body font-bold text-white bg-blue px-6 py-3 tracking-primary" style={{ fontSize: '16pt' }}>{label}</p>
                                <ul className="flex flex-col gap-1 px-6 pb-6">
                                    {skills.map(s => (
                                        <li key={s} className="text-black flex items-start gap-2" style={{ fontSize: '16px' }}>
                                            <span className="mt-[0.35em] shrink-0 w-1.5 h-1.5 rounded-full bg-black/40 inline-block" />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div className="mt-10 grid grid-cols-12">
                <div className="col-span-12 lg:col-start-3 lg:col-span-8">
                <p className="font-title uppercase tracking-primary text-[0.7rem] text-black/30 text-center">Tools &amp; Software</p>
                <ToolsMarquee />
                </div>
            </div>
        </div>
    );
}

export default WhatIDo;
