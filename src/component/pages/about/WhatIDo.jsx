import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { toolIcons } from '../../../data/icons';

const allTools = toolIcons.flatMap(g => g.tools);
const imgSrcs  = allTools.filter(t => t.imgSrc).map(t => t.imgSrc);

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

    // Triple items so the seam never shows during the loop
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
        <div className="font-body text-black py-8">
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-start-3 lg:col-span-8">
                    <p className="text-black/40 italic">Content coming soon.</p>
                </div>
            </div>
            <ToolsMarquee />
        </div>
    );
}

export default WhatIDo;
