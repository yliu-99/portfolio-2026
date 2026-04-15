import { useRef, useEffect } from 'react';
import gsap from 'gsap';

import Energy     from './home-menu-components/Energy';
import Status     from './home-menu-components/Status';
import AboutMenu  from './home-menu-components/AboutMenu';
import Obsessions from './home-menu-components/Obsessions';

function FloatingMenu() {
    const wrapRef = useRef(null);

    useEffect(() => {
        if (!wrapRef.current) return;
        // Target the neutral wrapper divs, NOT the MenuTemplate roots.
        // This keeps the inner CSS opacity-70 / hover:opacity-100 untouched.
        const wrappers = [...wrapRef.current.children];

        gsap.set(wrappers, { opacity: 0, y: -10 });
        const tween = gsap.to(wrappers, {
            opacity:    1,
            y:          0,
            duration:   0.5,
            ease:       'power2.out',
            stagger:    0.3,
            delay:      1.0,
            onComplete: () => gsap.set(wrappers, { clearProps: 'opacity,y' }),
        });

        return () => {
            tween.kill();
            gsap.set(wrappers, { clearProps: 'opacity,y' });
        };
    }, []);

    return (
        <div
            ref={wrapRef}
            className="absolute top-5 left-4 right-4 md:left-5 md:right-5 lg:left-16 lg:right-16 z-1 hidden md:flex items-start justify-center gap-[clamp(1rem,4vw,4rem)] max-[950px]:gap-[clamp(0px,1.5vw,1rem)]"
        >
            {/* Each menu is wrapped in a plain div so GSAP only touches that
                neutral layer — the inner MenuTemplate opacity-70/hover CSS is preserved. */}
            <div><AboutMenu /></div>
            <div><Energy /></div>
            <div><Status /></div>
            <div><Obsessions /></div>
        </div>
    );
}

export default FloatingMenu;
