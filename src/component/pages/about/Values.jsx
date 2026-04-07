import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "../../../data/icons";
import LoveImg      from "../../../assets/page-assets/about/love.png";
import MapleSeedsImg from "../../../assets/page-assets/about/maple-seeds-blue.png";
import DragonflyImg  from "../../../assets/global-assets/dragonfly-red.png";
import BumbleBeeImg  from "../../../assets/page-assets/about/bumble-bee-red.png";
import "./Values.scss";

const hl = (text, color) => (
  <span className={`font-bold ${color === "blue" ? "text-blue" : "text-red"}`}>{text}</span>
);

const CARDS = [
  {
    title: "Wonder",
    titleBg: "bg-blue",
    cardImg: MapleSeedsImg,
    content: <>My {hl("creativity", "blue")} stems from wonder — a belief that {hl("possibilities are endless", "blue")}. It pushes me to {hl("take risks", "blue")}, {hl("think bigger", "blue")}, and {hl("ask more questions", "blue")}.</>,
    imgSrc: "https://i.postimg.cc/5y1jBP3q/yuhan-singing-with-guitar.jpg",
    imgAlt: "Yuhan Singing at friends's product launch event",
    description: "Music is my largest source of wonder and creativity, I use it to share my thoughts, feelings, story, and to connect with people in a way that words alone cannot. Here I am singing at my friend Ella's product launch event.",
  },
  {
    title: "Love",
    titleBg: "bg-red",
    cardImg: DragonflyImg,
    content: <>Love means {hl("leading with intention", "red")} in everything you do. It motivates me to {hl("embrace challenges", "red")}, act with {hl("kindness", "red")}, and always {hl("centre people", "red")} in my decisions.</>,
    imgSrc: LoveImg,
    imgAlt: "Yuhan's moved walking on a sunny morning",
    description: "When thinking of love, I think of people. For the last while, it comes up frequently as my mother. This was taken on a morning walk with her in China, shortly after finding out she had cancer. I took a break from school to support her through chemotherapy, and it was one of the most meaningful experiences of my life and solidified love as one of my greatest values.",
  },
  {
    title: "Humility",
    titleBg: "bg-black",
    cardImg: BumbleBeeImg,
    cardImgBW: true,
    content: <>Humility keeps me <span className="font-bold">grounded</span> and <span className="font-bold">open</span>. I stay curious about <span className="font-bold">learning</span>, embrace <span className="font-bold">growth</span>, and commit to <span className="font-bold">living authentically</span> — in work and in life.</>,
    imgSrc: "https://i.postimg.cc/7hVhmgtv/yuhan-young.jpg",
    imgAlt: "Child Yuhan",
    description: "Can you see the colour palette inspirations from this image? Before becoming a creative, I have always been first and foremost the daughter of a single mother, a first-gen Chinese immigrant, and a child who strived for better living. These brightly-coloured sweaters my mom knitted for me in the 2000s always remind of me of my roots. ",
  },
];

function Values() {
  const [flippedCards, setFlippedCards] = useState({});
  const [showDesc, setShowDesc] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const cardInnerRefs = useRef([]);
  const cardRefs = useRef([]);
  const hasMounted = useRef(false);

  // Carousel fade-in on index change (skip initial mount)
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const el = cardRefs.current[currentIndex];
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
  }, [currentIndex]);

  const handleCardClick = (cardIndex) => {
    const inner = cardInnerRefs.current[cardIndex];
    if (!inner) return;
    const isFlipped = !!flippedCards[cardIndex];
    gsap.to(inner, { rotateY: isFlipped ? 0 : 180, duration: 0.55, ease: "power2.inOut" });
    setFlippedCards((prev) => ({ ...prev, [cardIndex]: !prev[cardIndex] }));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) setCurrentIndex((i) => Math.min(i + 1, CARDS.length - 1));
      else setCurrentIndex((i) => Math.max(i - 1, 0));
    }
    touchStartX.current = null;
  };

  return (
    <section className="col-span-12 py-16 px-8">
      <div className="values-content">
        <div
          className="values-grid mt-8 mb-8"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`carousel-item perspective-distant cursor-pointer ${i === currentIndex ? "active" : ""}`}
              onClick={() => handleCardClick(i)}
            >
              <div
                ref={(el) => (cardInnerRefs.current[i] = el)}
                className="relative w-full transform-3d"
              >
                {/* Front */}
                <div className="w-full bg-white p-10 flex flex-col gap-5 border-3 border-black backface-hidden">
                  <h3 className={`${card.titleBg} font-title text-h4 tracking-secondary text-center text-white`}>{card.title}</h3>
                  {card.cardImg && (
                    <div className="h-36 flex items-center justify-center">
                      <img src={card.cardImg} alt="" aria-hidden="true" className={`max-h-full w-48 object-contain mix-blend-multiply${card.cardImgBW ? ' grayscale' : ''}`} />
                    </div>
                  )}
                  <p className="font-body text-center text-[1.3rem] leading-[1.7] text-black">{card.content}</p>
                  <span className={`mt-auto text-center font-body text-[0.8rem] tracking-[0.08em] uppercase text-black transition-opacity duration-300 ${flippedCards[i] ? "opacity-0" : "opacity-35"}`}>
                    tap to flip
                  </span>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 transform-[rotateY(180deg)] overflow-hidden border-3 border-black backface-hidden min-h-full"
                  onMouseLeave={() => setShowDesc(prev => ({ ...prev, [i]: false }))}
                >
                  <img src={card.imgSrc} alt={card.imgAlt} className="w-full h-full object-cover object-center" />
                  <div className={`card-desc-overlay${showDesc[i] ? ' visible' : ''}`}>
                    <p>{card.description}</p>
                  </div>
                  <button
                    className="card-desc-btn"
                    onMouseEnter={() => setShowDesc(prev => ({ ...prev, [i]: true }))}
                    onClick={(e) => { e.stopPropagation(); setShowDesc(prev => ({ ...prev, [i]: !prev[i] })); }}
                    aria-label="View description"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators — only visible in single-column (carousel) mode */}
        <div className="carousel-dots">
          {CARDS.map((card, i) => (
            <button
              key={card.title}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to ${card.title}`}
              className={`transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? "w-6 h-2.5 bg-blue"
                  : "w-2.5 h-2.5 bg-blue/25 hover:bg-blue/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Values;
