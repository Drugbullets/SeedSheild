import { useState } from 'react';

export default function SeedInput({ onSplit }) {
  const [seed, setSeed] = useState('');

  return (
    <div>
      <textarea 
        placeholder="Enter 12/24-word seed phrase" 
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        rows={4}
      />
      <button onClick={() => onSplit(seed)}>Generate Fragments</button>
    </div>
  );
}