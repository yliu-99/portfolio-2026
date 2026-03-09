import MenuTemplate from './MenuTemplate';

const data = {
    coffee: 3,
    coffeeMax: 4,
    focus: 'HIGH',
    vibes: 'LO-FI BEATS',
    streak: 7,
};

function Boost() {
    return (
        <MenuTemplate title="Need a Boost?">
            <div className="flex justify-between items-center w-full gap-2">
                <span className="text-[0.8rem] tracking-[0.1em] opacity-50 shrink-0">COFFEE</span>
                <div className="flex gap-1">
                    {Array.from({ length: data.coffeeMax }).map((_, i) => (
                        <span
                            key={i}
                            className={`block w-4.5 h-2 ${i < data.coffee ? 'bg-blue' : 'bg-black/15'}`}
                        />
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center w-full gap-2">
                <span className="text-[0.8rem] tracking-[0.1em] opacity-50 shrink-0">FOCUS</span>
                <span className="text-[0.85rem] tracking-[0.05em] text-red">{data.focus}</span>
            </div>
            <div className="flex justify-between items-center w-full gap-2">
                <span className="text-[0.8rem] tracking-[0.1em] opacity-50 shrink-0">VIBES</span>
                <span className="text-[0.85rem] tracking-[0.05em]">{data.vibes}</span>
            </div>
            <div className="flex justify-between items-center w-full gap-2">
                <span className="text-[0.8rem] tracking-[0.1em] opacity-50 shrink-0">STREAK</span>
                <span className="text-[0.85rem] tracking-[0.05em] text-red">{data.streak} DAYS</span>
            </div>
        </MenuTemplate>
    );
}

export default Boost;
