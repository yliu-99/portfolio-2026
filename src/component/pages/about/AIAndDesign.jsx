// import dependencies
import { Icon } from '@iconify/react';

// import assets
import claudeImg  from '../../../assets/icons/claude.png';
import chatgptImg from '../../../assets/icons/chatgpt.svg';

// import styles
import './AIAndDesign.scss';

const AI_TOOLS = [
    { name: 'Claude',  imgSrc: claudeImg },
    { name: 'ChatGPT', imgSrc: chatgptImg },
    { name: 'Gemini',  icon: 'simple-icons:googlegemini' },
];

function AIAndDesign() {
    return (
        <section className="ai-and-design col-span-12 -mx-4 md:-mx-5 lg:-mx-16">

            <div className="title flex flex-col items-center mb-12">
                <h2 className="text-h3 tracking-primary text-center">AI &amp; DESIGN</h2>
                <div className="border-b-3 border-blue w-24"></div>
            </div>

            <div className="ai-layout">

                {/* Left — floating icons */}
                <div className="ai-icons">
                    {AI_TOOLS.map((tool, i) => (
                        <div key={tool.name} className="ai-icon-item" style={{ animationDelay: `${i * 0.6}s` }}>
                            {tool.imgSrc
                                ? <img src={tool.imgSrc} alt={tool.name} />
                                : <Icon icon={tool.icon} />
                            }
                        </div>
                    ))}
                </div>

                {/* Right — paragraph */}
                <p className="ai-body font-body text-black leading-relaxed">
                    AI is undoubtedly powerful, and undeniably here. I maintain a <strong className="text-blue">cautious curiosity</strong> and use it as <strong className="text-blue">a tool</strong> to help with efficiency, organization, brainstorming, coding, and more. As much as it is important to stay informed and learn to utilize AI effectively, I think it is just as important to understand its <strong className="text-blue">risks and limitations</strong>, and continue to value the human perspective in our work. As someone with an arts background, I remain hopeful that the unique ways in which we <strong className="text-blue">humans</strong> experience the world <strong className="text-blue">persists as the essential ingredient in connection</strong>, and while AI can be a powerful assistant in our endeavors, it <strong className="text-blue">cannot replace the human touch</strong> that make our work truly meaningful.
                </p>

            </div>

        </section>
    );
}

export default AIAndDesign;
