import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "../../../../data/icons";
import MenuTemplate from "./MenuTemplate";
import { ENCOURAGEMENT } from "../../../../data/component-data/boostData";

function Boost() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * ENCOURAGEMENT.length));

  const shuffle = () => {
    if (ENCOURAGEMENT.length <= 1) return;
    let next;
    do {
      next = Math.floor(Math.random() * ENCOURAGEMENT.length);
    } while (next === index);
    setIndex(next);
  };

  const { headline } = ENCOURAGEMENT[index];

  return (
    <MenuTemplate title="Need a Boost?">
      <div className="w-full flex flex-col items-center text-center gap-6 px-1 py-2">
        <button
          onClick={shuffle}
          className="opacity-30 hover:opacity-100 transition-opacity duration-150 cursor-pointer"
          aria-label="Shuffle advice"
          title="Shuffle"
        >
          <FontAwesomeIcon icon={faShuffle} />
        </button>
        <p className="font-title text-red text-[1.35rem] leading-tight tracking-[0.03em] h-24 flex items-center justify-center">
          {headline}
        </p>
        <p className="font-body lowercase text-[0.85rem] tracking-[0.04em] leading-snug opacity-60">
          (if you ever need encouragement <br />
          from a wise-ish 26 yr old)
        </p>
      </div>
    </MenuTemplate>
  );
}

export default Boost;
