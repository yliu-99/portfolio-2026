// import dependencies
import { useState, useEffect, useRef, useCallback } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';

// import data
import { toolIcons } from '../../../data/icons';

// import style
import './MyTools.scss';

const CYCLE_INTERVAL = 2200;
const RED   = '#E91A14';
const BLACK = '#25242F';

function MyTools() {
    const [activeCategory, setActiveCategory] = useState(toolIcons[0].category);
    const intervalRef  = useRef(null);
    const categoryRefs = useRef([]);
    const groupRefs    = useRef([]);

    // ── GSAP: animate on active category change ──────────────────────────────
    useEffect(() => {
        toolIcons.forEach((group, i) => {
            const isActive   = group.category === activeCategory;
            const categoryEl = categoryRefs.current[i];
            const groupEl    = groupRefs.current[i];
            if (!categoryEl || !groupEl) return;

            const items = groupEl.querySelectorAll('.tool-item');
            const imgs  = groupEl.querySelectorAll('.tool-item img');

            // Category label
            gsap.to(categoryEl, {
                color:    isActive ? RED   : BLACK,
                opacity:  isActive ? 1     : 0.35,
                duration: 0.4,
                ease:     'power2.out',
            });

            // Icons — lift + colour with stagger on enter, snap back on exit
            if (isActive) {
                gsap.to(items, {
                    color:    RED,
                    opacity:  1,
                    y:        -5,
                    duration: 0.4,
                    ease:     'power2.out',
                    stagger:  0.06,
                });
                if (imgs.length) {
                    gsap.to(imgs, {
                        filter:   'grayscale(0%) brightness(1)',
                        opacity:  1,
                        duration: 0.4,
                        ease:     'power2.out',
                        stagger:  0.06,
                    });
                }
            } else {
                gsap.to(items, {
                    color:    BLACK,
                    opacity:  0.3,
                    y:        0,
                    duration: 0.25,
                    ease:     'power2.in',
                });
                if (imgs.length) {
                    gsap.to(imgs, {
                        filter:   'grayscale(100%) brightness(0.4)',
                        opacity:  0.3,
                        duration: 0.25,
                        ease:     'power2.in',
                    });
                }
            }
        });
    }, [activeCategory]);

    // ── Auto-cycle ──────────────────────────────────────────────────────────
    const startCycle = useCallback(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveCategory(prev => {
                const idx = toolIcons.findIndex(g => g.category === prev);
                return toolIcons[(idx + 1) % toolIcons.length].category;
            });
        }, CYCLE_INTERVAL);
    }, []);

    useEffect(() => {
        startCycle();
        return () => clearInterval(intervalRef.current);
    }, [startCycle]);

    // ── Hover handlers ──────────────────────────────────────────────────────
    const handleCategoryEnter = (category) => {
        clearInterval(intervalRef.current);
        setActiveCategory(category);
    };

    const handleNavLeave = () => startCycle();

    // ── Render ──────────────────────────────────────────────────────────────
    return (
        <section className='my-tools col-span-12'>

            <div className="title flex flex-col items-center mb-12">
                <h2 className="text-h3 tracking-primary">MY TOOLS</h2>
                <div className="border-b-3 border-blue w-24"></div>
            </div>

            <div className='tools-container'>

                {/* Category names — body font, slash-separated via CSS */}
                <div className='category-nav' onMouseLeave={handleNavLeave}>
                    {toolIcons.map((group, idx) => (
                        <span
                            key={group.category}
                            ref={el => categoryRefs.current[idx] = el}
                            className='tool-category'
                            onMouseEnter={() => handleCategoryEnter(group.category)}
                        >
                            {group.category}
                        </span>
                    ))}
                </div>

                {/* Icon row — all groups inline on lg */}
                <div className='tools-row'>
                    {toolIcons.map((group, idx) => (
                        <div key={group.category} className='tools-row-inner'>
                            <div
                                ref={el => groupRefs.current[idx] = el}
                                className='tool-group-icons'
                            >
                                {group.tools.map((tool) => (
                                    <div key={tool.name} className='tool-item'>
                                        {tool.imgSrc
                                            ? <img src={tool.imgSrc} alt={tool.name} />
                                            : <Icon icon={tool.icon} />
                                        }
                                    </div>
                                ))}
                            </div>
                            {idx < toolIcons.length - 1 && (
                                <span className='group-divider' aria-hidden="true" />
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default MyTools;
