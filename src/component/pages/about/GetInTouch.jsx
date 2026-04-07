import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLinkedin } from "../../../data/icons";
import TeapotHillImg from "../../../assets/page-assets/about/teapot-hill.jpg";

const SOCIALS = [
  { icon: faLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/yuhan-liu-1a571524b/", display: "yuhan-liu" },
  { icon: faEnvelope, label: "Email",    href: "mailto:yuhancreates@gmail.com",                     display: "yuhancreates@gmail.com" },
];

function GetInTouch() {
  return (
    <section className="py-8 grid grid-cols-12">
      <div className="col-span-12 lg:col-start-3 lg:col-span-8 grid grid-cols-1 lg:grid-cols-[2fr_6fr] gap-12 items-center">

        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={TeapotHillImg}
            alt="Yuhan at Teapot Hill"
            className="w-full object-cover"
          />
        </div>

        {/* Text + socials */}
        <div className="flex flex-col gap-8">
          <p className="font-body text-h5 leading-loose text-black">
            "Would you like an adventure now, or would you like to have your tea first?"
          </p>

          <div className="flex gap-6">
            {SOCIALS.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-black hover:text-red transition-colors duration-200"
              >
                <FontAwesomeIcon icon={icon} className="text-3xl" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default GetInTouch;
