import React from 'react';

export default function FragmentManager({ fragments }) {
  return (
    <div>
      <h3>Your Seed Fragments:</h3>
      {fragments.map((frag, i) => (
        <div key={i}>Fragment {i+1}: {frag}</div>
      ))}
    </div>
  );
}