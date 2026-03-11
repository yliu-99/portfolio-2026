import { useState, useEffect } from 'react';
import MenuTemplate from './MenuTemplate';
import { energyLines } from '../../../../data/component-data/energyData';

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

function Energy() {
  const [clock, setClock] = useState('');
  const [energyLevel, setEnergyLevel] = useState(0);
  const [energyLine, setEnergyLine] = useState('');

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

  return (
    <MenuTemplate title="Energy Meter">
      <div className="text-red text-lg tracking-[0.1em] text-center">{clock}</div>
      <div className="text-h1 text-red leading-none">{energyLevel}%</div>
      <div className="flex gap-[0.3rem]">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <span
            key={i}
            className={`block w-7 h-2.5 ${i < filledBars ? 'bg-blue' : 'bg-black/15'}`}
          />
        ))}
      </div>
      <div className="flex flex-col items-center w-full text-[0.85rem] tracking-[0.1em] leading-relaxed opacity-80 text-center shrink overflow-hidden">
        <span>MOOD:</span>
        <span>{energyLine}</span>
      </div>
    </MenuTemplate>
  );
}

export default Energy;
