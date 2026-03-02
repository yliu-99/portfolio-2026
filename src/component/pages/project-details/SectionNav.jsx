import { useState, useEffect, useMemo } from 'react';

// Derive a nav label from a section object, or null if it shouldn't appear.
function sectionLabel(section) {
    if (section.type === 'goals')     return 'Overview';
    if (section.type === 'comingSoon') return 'Coming Soon';
    if (section.heading)               return section.heading;
    return null;
}

function SectionNav({ sections }) {
    const [activeId, setActiveId] = useState(null);

    // Build the list of nav entries once (sections are stable)
    const navEntries = useMemo(() =>
        sections.flatMap((s, i) => {
            const label = sectionLabel(s);
            return label ? [{ id: `section-${i}`, label }] : [];
        }),
    [sections]);

    // Initialise active to the first entry
    useEffect(() => {
        setActiveId(navEntries[0]?.id ?? null);
    }, [navEntries]);

    // IntersectionObserver — update active as sections enter the viewport
    useEffect(() => {
        if (!navEntries.length) return;

        const observers = navEntries.map(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
                { rootMargin: '-20% 0px -65% 0px' },
            );
            obs.observe(el);
            return obs;
        });

        return () => observers.forEach(obs => obs?.disconnect());
    }, [navEntries]);

    const handleClick = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (!navEntries.length) return null;

    return (
        <nav className="sticky top-24 flex flex-col pt-20 pr-6">

            <span className="font-body font-bold text-[0.65rem] tracking-[0.2em] uppercase text-black opacity-35 mb-3 pl-4">
                Contents
            </span>

            {navEntries.map(({ id, label }) => {
                const isActive = activeId === id;
                return (
                    <button
                        key={id}
                        onClick={() => handleClick(id)}
                        className={[
                            'text-left font-body text-[0.78rem] leading-snug py-[0.4rem] pl-4',
                            'bg-transparent cursor-pointer',
                            'border-0 border-l-[2px] border-solid',
                            'transition-[color,opacity,border-color] duration-200',
                            isActive
                                ? 'border-blue text-blue opacity-100'
                                : 'border-transparent text-black opacity-35 hover:opacity-60',
                        ].join(' ')}
                    >
                        {label}
                    </button>
                );
            })}

        </nav>
    );
}

export default SectionNav;
