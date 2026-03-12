import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import MenuTemplate from './MenuTemplate';
import { useContactModal } from '../../../../context/ContactModalContext';

function Status() {
    const { openContact } = useContactModal();
    const dotRef = useRef(null);

    useEffect(() => {
        const tween = gsap.to(dotRef.current, {
            opacity: 0.2,
            duration: 0.9,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
        });
        return () => tween.kill();
    }, []);

    return (
        <MenuTemplate title="Current Status">
            <div className="flex flex-col items-center gap-5 w-full">
                <div className="flex items-start gap-2">
                    <span
                        ref={dotRef}
                        className="font-title text-red text-[2.5rem] leading-none mt-[0.6rem]"
                        aria-hidden="true"
                    >●</span>
                    <p className="font-title text-red text-[2rem] leading-tight tracking-[0.05em] text-center">
                        LOOKING<br />FOR WORK
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-[0.85rem] tracking-[0.12em] ">TYPE:</p>
                    <p className="text-[0.85rem] tracking-[0.08em]">DESIGN INTERNSHIP</p>
                </div>
                <button
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
