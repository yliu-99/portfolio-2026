import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '../../../../data/icons';
import MenuTemplate from './MenuTemplate';
import { ADVICE } from '../../../../data/component-data/boostData';

function Boost() {
    const [index, setIndex] = useState(0);

    const shuffle = () => {
        if (ADVICE.length <= 1) return;
        let next;
        do { next = Math.floor(Math.random() * ADVICE.length); } while (next === index);
        setIndex(next);
    };

    const { headline, body } = ADVICE[index];

    const shuffleBtn = (
        <button
            onClick={shuffle}
            className="opacity-30 hover:opacity-100 transition-opacity duration-150 cursor-pointer"
            aria-label="Shuffle advice"
            title="Shuffle"
        >
            <FontAwesomeIcon icon={faShuffle} />
        </button>
    );

    return (
        <MenuTemplate title="Need a Boost?" headerAction={shuffleBtn}>
            <div className="w-full flex flex-col gap-6 px-1 py-2">
                <p className="font-body lowercase text-[0.85rem] tracking-[0.04em] leading-snug opacity-60">
                    (if you ever need advice from<br />a wise-ish 26 yr old):
                </p>
                <p className="font-title text-red text-[1.35rem] leading-tight tracking-[0.03em]">
                    {headline}
                </p>

                <p className="font-body lowercase text-[1rem] tracking-[0.04em] leading-relaxed text-red">
                    {body}
                </p>
            </div>
        </MenuTemplate>
    );
}

export default Boost;
