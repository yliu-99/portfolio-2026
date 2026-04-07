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
        <section className="ai-and-design col-span-12">

            <div className="ai-layout">

                {/* Left — content */}
                <div className="ai-body font-body text-black leading-relaxed">
                    <p className="mb-6">AI is powerful, and undeniably here. I try to approach it with cautious curiosity by learning to use it well as <strong>a tool</strong>, while being aware that it's <strong>not a crutch</strong>.</p>
                    <div className="flex flex-col gap-4 pl-8">
                        <div>
                            <p className="font-title text-red not-last:0 text-sm tracking-primary mb-2">WHAT I DO</p>
                            <ul className="flex flex-col gap-2 list-none pl-4">
                                <li>✦ Use it for efficiency, brainstorming, coding support</li>
                                <li>✦ Stay informed about how to personalize its use for maximum productivity</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-title text-blue 0 text-sm tracking-primary mb-2 ">BUT</p>
                            <ul className="flex flex-col gap-2 list-none pl-4">
                                <li>✦ Understand its risks and limitations</li>
                                <li>✦ The human perspective remains valuable</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right — floating icons */}
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

            </div>

        </section>
    );
}

export default AIAndDesign;
