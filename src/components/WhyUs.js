import React from 'react';
import './WhyUs.css';

const WHY_ITEMS = [
  {
    icon: '🌍',
    title: 'Global Presence, Local Care',
    desc: 'Operations across 6 countries with teams who understand each market deeply and personally.',
  },
  {
    icon: '🔧',
    title: 'One-Stop Solution',
    desc: 'From academics to fintech, no need to juggle multiple vendors. We handle everything.',
  },
  {
    icon: '⚡',
    title: 'Fast Onboarding',
    desc: 'Smooth, quick onboarding across all services so you get started without delays.',
  },
  {
    icon: '🤝',
    title: 'Tailored to You',
    desc: 'Custom solutions for students, startups, established businesses and individual investors.',
  },
];

const METRICS = [
  { num: '6', label: 'Countries', accent: true },
  { num: '8+', label: 'Services', green: true },
  { num: '24/7', label: 'Support', accent: false },
  { num: '100%', label: 'Tailored', accent: true },
];

export default function WhyUs() {
  return (
    <section id="about" className="whyus-section">
      <div className="why-grid">
        <div className="why-left reveal">
          <span className="section-label">Why Lucintel</span>
          <h2 className="section-title">Built for Real<br /><span>Results</span></h2>
          <p className="section-sub">
            We combine expertise, global reach, and personalized support so every client —
            student, business, or investor — gets exactly what they need.
          </p>
          <ul className="why-list">
            {WHY_ITEMS.map(item => (
              <li key={item.title} className="why-item">
                <div className="why-icon">{item.icon}</div>
                <div className="why-item-text">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="why-right reveal">
          <div className="why-visual">
            <div className="why-visual-header">
              <p className="wy-sub">At a Glance</p>
              <h3>Lucintel By Numbers</h3>
            </div>
            <div className="metrics-grid">
              {METRICS.map(m => (
                <div key={m.label} className={`metric-box ${m.accent ? 'accent' : ''}`}>
                  <span className={`mnum ${m.green ? 'green' : ''}`}>{m.num}</span>
                  <span className="mlabel">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="why-quote">
              <p>
                "The solutions you are looking for" — every service, every client, every country.
              </p>
              <div className="why-quote-author">
                <div className="wqa-avatar">LS</div>
                <span>Lucintel Solutions, Thrikkakara, Kerala</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
