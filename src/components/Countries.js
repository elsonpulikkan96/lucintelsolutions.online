import React from 'react';
import './Countries.css';

const COUNTRIES = [
  { flag: '🇮🇳', name: 'India' },
  { flag: '🇬🇧', name: 'United Kingdom' },
  { flag: '🇦🇺', name: 'Australia' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇩🇪', name: 'Germany' },
  { flag: '🇫🇷', name: 'France' },
];

export default function Countries() {
  return (
    <div className="countries-bar">
      <div className="countries-inner">
        <span className="countries-label">Operating In</span>
        <div className="countries-list">
          {COUNTRIES.map((c, i) => (
            <React.Fragment key={c.name}>
              <div className="country-item">
                <span className="country-flag">{c.flag}</span>
                <span className="country-name">{c.name}</span>
              </div>
              {i < COUNTRIES.length - 1 && <div className="country-div" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
