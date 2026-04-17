import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import MenuTemplate from './MenuTemplate';
import { energyLines } from '../../../../data/component-data/energyData';
import { useMenuOpen } from '../../../../context/MenuOpenContext';

const curve = [
  80,  // 0
  85,  // 1
  70,  // 2
  50,  // 3
  30,  // 4
  20,  // 5
  35,  // 6
  55,  // 7
  65,  // 8
  80,  // 9
  90,  // 10
  95,  // 11
  85,  // 12
  55,  // 13
  40,  // 14
  60,  // 15
  75,  // 16
  80,  // 17
  85,  // 18
  90,  // 19
  95,  // 20
  100, // 21
  95,  // 22
  90,  // 23
];

const BAR_COUNT = 5;

function Energy({ isOpen: controlledOpen, onToggle, className }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const { register } = useMenuOpen() ?? {};

  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      // Uncontrolled (desktop) — manage state and register with context
      // so the greyscale/pause effects still fire
      const next = !internalOpen;
      setInternalOpen(next);
      register?.(next);
    }
  };

  const [clock, setClock] = useState('');
  const [energyLevel, setEnergyLevel] = useState(0);
  const [energyLine, setEnergyLine] = useState('');
  const barFillRefs = useRef([]);
  const percentRef = useRef(null);
  const counterObj = useRef({ val: 0 });

  // live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setClock(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // energy curve + mood line, recalculates each hour
  useEffect(() => {
    const calculate = () => {
      const hour = new Date().getHours();
      setEnergyLevel(curve[hour]);
      const lines = energyLines[hour] || ['Energy!'];
      setEnergyLine(lines[Math.floor(Math.random() * lines.length)]);
    };
    calculate();

    const now = new Date();
    const msUntilNextHour =
      (60 - now.getMinutes()) * 60000 - now.getSeconds() * 1000 - now.getMilliseconds();
    const timeout = setTimeout(() => {
      calculate();
      const id = setInterval(calculate, 3600000);
      return () => clearInterval(id);
    }, msUntilNextHour);

    return () => clearTimeout(timeout);
  }, []);

  const filledBars = Math.round((energyLevel / 100) * BAR_COUNT);

  // Fade bars up + count percentage when menu opens, reset when closed
  useEffect(() => {
    const bars = barFillRefs.current.filter(Boolean);
    if (isOpen) {
      // bars
      gsap.set(bars, { opacity: 0, y: 6 });
      gsap.to(bars, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out', stagger: 0.08, delay: 0.2 });
      // percentage counter
      counterObj.current.val = 0;
      gsap.to(counterObj.current, {
        val: energyLevel,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2,
        onUpdate: () => {
          if (percentRef.current)
            percentRef.current.textContent = `${Math.round(counterObj.current.val)}%`;
        },
      });
    } else {
      gsap.to(bars, { opacity: 0, y: 6, duration: 0.2, ease: 'power2.in', delay: 0.5 });
      gsap.to(counterObj.current, {
        val: 0,
        duration: 0.3,
        ease: 'power2.in',
        delay: 0.5,
        onUpdate: () => {
          if (percentRef.current)
            percentRef.current.textContent = `${Math.round(counterObj.current.val)}%`;
        },
      });
    }
  }, [isOpen, energyLevel]);

  return (
    <MenuTemplate title="Energy Meter" isOpen={isOpen} onToggle={handleToggle} className={className}>
      <div className="text-red text-lg tracking-[0.1em] text-center">{clock}</div>
      <div ref={percentRef} className="text-h1 text-red leading-none">0%</div>
      <div className="flex gap-[0.3rem]">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <span
            key={i}
            ref={el => barFillRefs.current[i] = el}
            className={`block w-7 h-2.5 ${i < filledBars ? 'bg-blue' : 'bg-black/15'}`}
            style={{ opacity: 0 }}
          />
        ))}
      </div>
      <div className="flex flex-col items-center w-full text-[0.85rem] tracking-[0.1em] leading-relaxed opacity-80 text-center shrink overflow-hidden">
        <span>YUHAN'S MOOD RN:</span>
        <span>{energyLine}</span>
      </div>
    </MenuTemplate>
  );
}

export default Energy;
