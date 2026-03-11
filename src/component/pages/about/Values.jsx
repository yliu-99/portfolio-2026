import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "../../../data/icons";
import LoveImg from "../../../assets/page-assets/about/love.png";
import "./Values.scss";

const hl = (text, color) => (
  <span className={`font-bold ${color === "blue" ? "text-blue" : "text-red"}`}>{text}</span>
);

const CARDS = [
  {
    title: "Wonder",
    titleBg: "bg-blue",
    content: <>My {hl("creativity", "blue")} always stems from the sense of wonder I hold for the world. It has always been immensely exciting to me to imagine that {hl("the possibilities could be endless", "blue")}, and to explore these opportunities with appreciation. This inspires me to {hl("take risks", "blue")}, {hl("think further", "blue")}, {hl("remain optimistic", "blue")}, and {hl("ask more questions", "blue")} in my work.</>,
    imgSrc: "https://i.postimg.cc/5y1jBP3q/yuhan-singing-with-guitar.jpg",
    imgAlt: "Yuhan Singing at friends's product launch event",
    description: "Music is my largest source of wonder and creativity, I use it to share my thoughts, feelings, story, and to connect with people in a way that words alone cannot. Here I am singing at my friend Ella's product launch event.",
  },
  {
    title: "Love",
    titleBg: "bg-red",
    content: <>To me, love means {hl("committing", "red")} fully to your relationship with people, yourself, and the world at large. I feel most fulfilled when living and {hl("leading with love", "red")}, so I try to carry that principle into everything. In my work, love motivates me to {hl("embrace challenges", "red")}, {hl("show gratitude", "red")} and {hl("kindness", "red")}, act with {hl("intention", "red")}, and make decisions that {hl("centre in people", "red")}.</>,
    imgSrc: LoveImg,
    imgAlt: "Yuhan's moved walking on a sunny morning",
    description: "When thinking of love, I think of people. For the last while, it comes up frequently as my mother. This was taken on a morning walk with her in China, shortly after finding out she had cancer. I took a break from school to support her through chemotherapy, and it was one of the most meaningful experiences of my life and solidified love as one of my greatest values.",
  },
  {
    title: "Humility",
    titleBg: "bg-black",
    content: <>Humility, for me, is a way of honoring the vastness of the world around me. It motivates me to be <span className="font-bold">introspective</span>, <span className="font-bold">reflective</span>, and <span className="font-bold">aware</span> in my work. I strive to stay open to <span className="font-bold">learning</span>, <span className="font-bold">growth</span>, and <span className="font-bold">change</span>, and to approach these opportunities with curiosity and excitement, as a part of my commitment to myself in <span className="font-bold">living authentically</span>.</>,
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
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-h3 tracking-primary text-center">MY Deck of Values</h2>
          <div className="border-b-3 border-blue w-24"></div>
        </div>

        <div
          className="values-grid mt-8"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`carousel-item perspective-distant cursor-pointer aspect-7/13 ${i === currentIndex ? "active" : ""}`}
              onClick={() => handleCardClick(i)}
            >
              <div
                ref={(el) => (cardInnerRefs.current[i] = el)}
                className="relative w-full h-full transform-3d"
              >
                {/* Front */}
                <div className="absolute inset-0 bg-white p-10 flex flex-col gap-5 border-3 border-black backface-hidden">
                  <h3 className={`${card.titleBg} font-title text-h4 tracking-secondary text-center text-white`}>{card.title}</h3>
                  <p className="font-body text-center text-[1.3rem] leading-[1.7] text-black">{card.content}</p>
                  <span className={`mt-auto text-center font-body text-[0.8rem] tracking-[0.08em] uppercase text-black transition-opacity duration-300 ${flippedCards[i] ? "opacity-0" : "opacity-35"}`}>
                    tap to flip
                  </span>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 transform-[rotateY(180deg)] overflow-hidden border-3 border-black backface-hidden"
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
