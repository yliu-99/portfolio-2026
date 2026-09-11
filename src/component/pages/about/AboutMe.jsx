import SingingImg        from "../../../assets/page-assets/about/singing.jpg";
import MovingToCanadaImg from "../../../assets/page-assets/about/moving-to-canada.jpg";
import BabyImg           from "../../../assets/page-assets/about/baby.jpg";
import BcitImg           from "../../../assets/page-assets/about/bcit.jpg";
import './AboutMe.scss';

const TIMELINE = [
  {
    year: "1999",
    img: BabyImg,
    imgAlt: "Yuhan as a baby",
    text: "Born and raised in Shenyang, China, I grew up loving stories. You'd find me reading and writing all the time. I took acting lessons. I was always telling stories at family gatherings. Chinese became my favourite subject in elementary school. I think this is where my love for storytelling and creativity started.",
  },
  {
    year: "2010",
    img: MovingToCanadaImg,
    imgAlt: "A building with a Canadian flag on top",
    text: "Moving to Canada with my mom was a curious but challenging adventure. I learned how to adapt to a new culture, navigate language barriers, and find my identity in between. It was tough at times, but it also made me more resilient and open-minded. During this time, I started to write music as a way to express myself and connect with others.",
  },
  {
    year: "2017–2022",
    img: SingingImg,
    imgAlt: "Yuhan singing on stage",
    text: "My interest in music developed into a passion, and I decided to get a degree in music performance. This was where I learned to be disciplined, collaborative, open to feedback, and to effectively tell a story through art. I also became a voice teacher, which taught me how to practice patience and empathy, and how to translate abstract concepts into something tangible and understandable for others.",
  },
  {
    year: "2023-TODAY",
    img: BcitImg,
    imgAlt: "Yuhan's classmates from BCIT",
    text: "Moved to Vancouver, and decided to explore the world of design as a new creative outlet. I discover the New Media program, and not only did I learn a new set of skills, but I also found valuable friends and a supportive community who encourage and inspire me. I am really excited to continue growing as a designer and storyteller, and to see where this journey takes me.",
  },
];

function TimelineItem({ year, text, img, imgAlt, isLast }) {
  return (
    <div className="grid grid-cols-[auto_1fr] lg:grid-cols-[1fr_auto_1fr] gap-x-8 mb-10">

      {/* Left — image (desktop only) */}
      <div className="hidden lg:flex justify-end items-start pt-1">
        {img && <img src={img} alt={imgAlt} className="w-full object-cover" />}
      </div>

      {/* Centre — dot + line */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-black shrink-0 mt-1" />
        {!isLast && <div className="flex-1 w-px bg-black/20 mt-1" />}
      </div>

      {/* Right — year + image (mobile) + text */}
      <div className="pt-0">
        <span className={`font-title text-h6 tracking-primary block mb-2 ${year === "Now" || year === "2023-TODAY" ? "text-red" : "text-black"}`}>{year}</span>
        {img && <img src={img} alt={imgAlt} className="lg:hidden w-full object-cover mb-3" />}
        <p className="font-body text-h6 leading-loose">{text}</p>
      </div>

    </div>
  );
}

function AboutMe() {
  return (
    <div className="font-body text-black py-8 grid grid-cols-12">
      <div className="col-span-12 lg:col-start-3 lg:col-span-8">
        {TIMELINE.map((item, i) => (
          <TimelineItem key={i} {...item} isLast={i === TIMELINE.length - 1} />
        ))}
      </div>
    </div>
  );
}

export default AboutMe;
