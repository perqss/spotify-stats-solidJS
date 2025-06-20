import { createMemo } from 'solid-js';

const Waveform = ({ songId }) => {
  const waveform = () => {
    const hash = [...songId].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const data = [];
    // kosztowne obliczenia – symulacja CPU load
    for (let i = 0; i < 1700; i++) {
      let val = Math.abs(Math.sin(i * 0.2 + hash % 50)) * 25;
      for (let j = 0; j < 1000; j++) 
        val += Math.sqrt(j + val); // sztuczne obciążenie
      data.push(val % 50); // przycięcie wartości
    }

    return data;
  };

  return (
    <svg width="100%" height="50" >
      {waveform().map((val, i) => (
        <rect
          key={i}
          x={i}
          y={50 - val}
          width="1"
          height={val}
          fill="#888"
        />
      ))}
    </svg>
  );
};

export default Waveform;
