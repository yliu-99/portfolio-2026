import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import MenuTemplate from './MenuTemplate';
import { useContactModal } from '../../../../context/ContactModalContext';

function Status({ isOpen, onToggle, className }) {
    const { openContact } = useContactModal();
    const btnRef = useRef(null);

    useEffect(() => {
        const shake = () => gsap.timeline({ defaults: { ease: 'sine.inOut' } })
            .to(btnRef.current, { x:  3, rotation:  2, duration: 0.12 })
            .to(btnRef.current, { x: -3, rotation: -2, duration: 0.14 })
            .to(btnRef.current, { x:  2, rotation:  1.5, duration: 0.13 })
            .to(btnRef.current, { x: -2, rotation: -1.5, duration: 0.13 })
            .to(btnRef.current, { x:  1, rotation:  0.5, duration: 0.11 })
            .to(btnRef.current, { x:  0, rotation:  0, duration: 0.1, ease: 'power1.out' });

        shake();
        const id = setInterval(shake, 2500);
        return () => clearInterval(id);
    }, []);

    return (
        <MenuTemplate title="Current Status" isOpen={isOpen} onToggle={onToggle} className={className}>
            <div className="flex flex-col items-center gap-5 w-full">
                <p className="font-title text-red text-[2rem] leading-tight tracking-[0.05em] text-center">
                    LOOKING<br />FOR WORK
                </p>
                <div className="text-center">
                    <p className="text-[0.85rem] tracking-[0.12em] ">TYPE:</p>
                    <p className="text-[0.85rem] tracking-[0.08em]">AGENCY AND FREELANCE</p>
                </div>
                <button
                    ref={btnRef}
                    className="text-[0.85rem] tracking-[0.12em] opacity-50 underline underline-offset-2 cursor-pointer hover:opacity-100 transition-opacity duration-150"
                    onClick={openContact}
                >
                    CONTACT ME
                </button>
            </div>
        </MenuTemplate>
    );
}

export default Status;
