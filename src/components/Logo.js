import React from 'react';

export default function Logo({ size = 38 }) {
  return (
    <img
      src="/logo.png"
      alt="Lucintel Solutions"
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
}
