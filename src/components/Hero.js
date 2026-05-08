import React from 'react';
import './Hero.css';

const SERVICES = [
  '📚 Academic Help', '🌐 Web Dev', '✈️ Visa Handling',
  '📈 Investments', '🎯 Digital Marketing', '💼 CRM & Billing',
  '🏪 E-Commerce', '🖥️ Hosting',
];

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <svg className="hero-bg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="1200" height="800" fill="url(#grid)" />
        <circle cx="950" cy="80" r="220" fill="#3AABDC" opacity="0.07" />
        <circle cx="80" cy="620" r="160" fill="#8DC63F" opacity="0.05" />
        <circle cx="600" cy="400" r="300" fill="#3AABDC" opacity="0.03" />
      </svg>

      <div className="hero-content">
        {/* Left */}
        <div className="hero-left">
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            🌍 The Solutions You Are Looking For
          </div>
          <h1>
            Your One-Stop<br />
            <span>Multi-Service</span><br />
            Partner
          </h1>
          <p>
            From academic support and visa handling to web development, digital marketing,
            financial advisory and business software — Lucintel Solutions powers individuals
            and businesses across 6 countries.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo('#services')}>
              Explore Services
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('#contact')}>
              Talk to Us
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-num">6</span>
              <span className="stat-label">Countries</span>
            </div>
            <div className="hero-divider" />
            <div className="hero-stat">
              <span className="stat-num">8+</span>
              <span className="stat-label">Service Lines</span>
            </div>
            <div className="hero-divider" />
            <div className="hero-stat">
              <span className="stat-num">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="hero-right">
          <div className="hero-card-main">
            <h3>Our Services At a Glance</h3>
            <div className="service-pills">
              {SERVICES.map((s) => (
                <span key={s} className="service-pill">{s}</span>
              ))}
            </div>
          </div>

          <div className="hero-float hf-1">
            <div className="hf-label">Presence</div>
            <div className="hf-val">6 <span>Countries</span></div>
            <div className="hf-countries">
              <span className="hf-dot" />
              IN · UK · AU · CA · DE · FR
            </div>
          </div>

          <div className="hero-float hf-2">
            <div className="hf-label">Mantra</div>
            <div className="hf-mantra">"The solutions you are looking for"</div>
          </div>
        </div>
      </div>
    </section>
  );
}
