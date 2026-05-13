import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquareMinus } from '../../../../data/icons';
import { useMenuOpen } from '../../../../context/MenuOpenContext';

const BODY_HEIGHT = 330;
const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
const openHeight = () => isMobile() ? 'auto' : BODY_HEIGHT;

// Supports both uncontrolled (defaultOpen) and controlled (isOpen + onToggle) modes.
// In controlled mode the parent owns the open state; register() is skipped so the
// mobile strip doesn't trigger the desktop greyscale effect.
function MenuTemplate({ title, children, defaultOpen = false, headerAction, isOpen: controlledOpen, onToggle, className = 'w-64' }) {
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const bodyRef = useRef(null);
    const isFirst = useRef(true);
    const { register } = useMenuOpen() ?? {};

    // set initial height before first paint — no animation
    useLayoutEffect(() => {
        gsap.set(bodyRef.current, { height: isOpen ? openHeight() : 0 });
        if (isOpen && register && !isControlled) register(true);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // animate whenever open state changes (works for both controlled & uncontrolled)
    useEffect(() => {
        if (isFirst.current) { isFirst.current = false; return; }
        gsap.to(bodyRef.current, {
            height: isOpen ? openHeight() : 0,
            duration: 0.4,
            ease: isOpen ? 'power2.out' : 'power2.in',
        });
        if (register && !isControlled) register(isOpen);
    }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleToggle = () => {
        if (isControlled) onToggle?.();
        else setInternalOpen(p => !p);
    };

    return (
        <div className={`${className} border-2 border-black bg-white font-title uppercase select-none shadow-[3px_7px_6.5px_rgba(0,0,0,0.25)] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>
            <div
                className="flex justify-between items-center px-3 py-2 cursor-pointer border-b-2 border-black gap-2"
                onClick={handleToggle}
            >
                <span className="text-[0.95rem] tracking-secondary">{title}</span>
                <div className="flex items-center gap-2 shrink-0" onClick={e => headerAction && e.stopPropagation()}>
                    {headerAction}
                    <FontAwesomeIcon icon={isOpen ? faSquareMinus : faSquarePlus} className="text-blue" />
                </div>
            </div>
            <div ref={bodyRef} className="overflow-hidden">
                <div className="md:h-82.5 px-3 py-5 flex flex-col items-center justify-center gap-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default MenuTemplate;
