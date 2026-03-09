import MenuTemplate from './MenuTemplate';

const items = [
    'BRUTALIST UI',
    'GENERATIVE ART',
    'DARK SYNTH',
    'TYPE DESIGN',
    'MOTION BLUR',
];

function Obsessions() {
    return (
        <MenuTemplate title="Latest Obsessions">
            <ul className="list-none p-0 m-0 w-full flex flex-col gap-2">
                {items.map((item, i) => (
                    <li key={i} className="flex items-baseline gap-2 w-full">
                        <span className="text-[0.85rem] text-red shrink-0 tracking-[0.05em]">0{i + 1}</span>
                        <span className="text-[0.85rem] tracking-[0.08em] leading-snug">{item}</span>
                    </li>
                ))}
            </ul>
        </MenuTemplate>
    );
}

export default Obsessions;
