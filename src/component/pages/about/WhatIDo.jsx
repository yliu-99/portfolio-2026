import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { toolIcons } from '../../../data/icons';

const allTools = toolIcons.flatMap(g => g.tools);
const imgSrcs  = allTools.filter(t => t.imgSrc).map(t => t.imgSrc);

const POINTS = [
    {
        label: 'I started with music, not design.',
        body: 'Before I ever touched Figma, I spent years performing, teaching voice, and writing songs. That background taught me how to hold an audience, how to pace a story, and how to make someone feel something in under three minutes. I carry that into every project.',
    },
    {
        label: 'I think in stories, not just visuals.',
        body: 'I don\'t start with aesthetics — I start with the question of what needs to be communicated and why it matters. The visual language comes after. That order of thinking is what separates design that looks good from design that actually works.',
    },
    {
        label: 'I work across mediums on purpose.',
        body: 'Video, motion, print, campaign — the medium is just the delivery. Knowing how to work across all of them means I can choose the right one for the message, not just the one I\'m most comfortable with.',
    },
];

function ToolsMarquee() {
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

                    <p className="mb-10 text-black/80">
                       A design itself might catch someone's eye, but it's the story that makes someone really care. My approach to design is rooted in this belief — that good design isn't just about looking nice, it's about communicating something meaningful in a way that resonates with people. Only then can it inspire action.
                    </p>

                    <div className="flex flex-col gap-5">
                        {POINTS.map(({ label, body }) => (
                            <div key={label} className="border-2 border-black bg-white p-6 shadow-[3px_7px_6.5px_rgba(0,0,0,0.25)]">
                                <p className="font-title text-red tracking-primary mb-3" style={{ fontSize: '20pt' }}>✦ {label}</p>
                                <p className="text-black/70">{body}</p>
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
