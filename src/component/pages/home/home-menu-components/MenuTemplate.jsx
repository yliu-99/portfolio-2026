import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '../../../../data/icons';

const BODY_HEIGHT = 300;

function MenuTemplate({ title, children, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const bodyRef = useRef(null);
    const isFirst = useRef(true);

    // set initial height before first paint — no animation
    useLayoutEffect(() => {
        gsap.set(bodyRef.current, { height: defaultOpen ? BODY_HEIGHT : 0 });
    }, []);

    // animate on every subsequent toggle
    useEffect(() => {
        if (isFirst.current) { isFirst.current = false; return; }
        gsap.to(bodyRef.current, {
            height: isOpen ? BODY_HEIGHT : 0,
            duration: 0.4,
            ease: isOpen ? 'power2.out' : 'power2.in',
        });
    }, [isOpen]);

    return (
        <div className="w-64 border-2 border-black bg-white font-title uppercase select-none">
            <div
                className="flex justify-between items-center px-3 py-2 cursor-pointer border-b-2 border-black gap-2"
                onClick={() => setIsOpen(p => !p)}
            >
                <span className="text-[0.95rem] tracking-secondary">{title}</span>
                <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} className="text-blue shrink-0" />
            </div>
            <div ref={bodyRef} className="overflow-hidden">
                <div className="h-75 px-3 py-5 flex flex-col items-center justify-center gap-6 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default MenuTemplate;
