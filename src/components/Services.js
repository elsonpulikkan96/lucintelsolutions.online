import React, { useState } from 'react';
import './Services.css';

const ALL_SERVICES = [
  {
    icon: '📚', title: 'Academic Support', cat: 'academic',
    desc: 'Assignments, reports, coursework, and final year dissertations for all university courses worldwide. Expert guidance at every level.',
    cta: 'Get Help',
  },
  {
    icon: '✈️', title: 'Visa Handling', cat: 'academic',
    desc: 'Complete documentation and application support for students and professionals planning to move abroad. Smooth, stress-free visa processes.',
    cta: 'Learn More',
  },
  {
    icon: '🌐', title: 'Web Development', cat: 'digital',
    desc: 'Full-scale websites and applications including e-commerce for startups and shops. Domain acquisition, hosting, and ongoing technical support.',
    cta: 'Build Now',
  },
  {
    icon: '🎯', title: 'Digital Marketing', cat: 'digital',
    desc: 'Poster design, branded reports, and online brand promotion to help your business grow its digital footprint and reach the right audience.',
    cta: 'Grow Online',
  },
  {
    icon: '💼', title: 'CRM & Business Software', cat: 'business',
    desc: 'CRM systems, billing software, and end-to-end business solutions tailored for growing startups. Automate and streamline your operations.',
    cta: 'Streamline',
  },
  {
    icon: '🏪', title: 'E-Commerce Solutions', cat: 'digital',
    desc: 'Tailored online store setups for small-scale startups and shops, with product management, payment integration, and full launch support.',
    cta: 'Start Selling',
  },
  {
    icon: '📈', title: 'Investment Advisory', cat: 'finance',
    desc: 'Expert guidance on future investments, large-scale mutual fund management, and real-time portfolio and market monitoring apps.',
    cta: 'Invest Smart',
  },
  {
    icon: '🖥️', title: 'Hosting & Domain', cat: 'business',
    desc: 'One-stop destination for domain registration and reliable website hosting. Keep your online presence fast, secure, and always accessible.',
    cta: 'Get Hosted',
  },
];

const TABS = [
  { key: 'all', label: 'All Services' },
  { key: 'academic', label: 'Academic' },
  { key: 'digital', label: 'Digital' },
  { key: 'business', label: 'Business' },
  { key: 'finance', label: 'Finance' },
];

export default function Services() {
  const [active, setActive] = useState('all');

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filtered = active === 'all'
    ? ALL_SERVICES
    : ALL_SERVICES.filter(s => s.cat === active);

  return (
    <section id="services" className="services-section">
      <div className="section-header reveal">
        <span className="section-label">What We Offer</span>
        <h2 className="section-title">
          Comprehensive <span>Solutions</span><br />Under One Roof
        </h2>
        <p className="section-sub">
          From academics to investment management, we cover every dimension of your growth journey.
        </p>
      </div>

      <div className="tabs-wrap">
        <div className="tabs">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`tab ${active === t.key ? 'active' : ''}`}
              onClick={() => setActive(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="services-grid reveal">
        {filtered.map(svc => (
          <div key={svc.title} className="svc-card">
            <div className={`svc-icon ${svc.cat === 'finance' || svc.cat === 'business' ? 'blue' : svc.cat === 'digital' ? 'green' : 'blue'}`}>
              {svc.icon}
            </div>
            <h3>{svc.title}</h3>
            <p>{svc.desc}</p>
            <button className="svc-more" onClick={scrollToContact}>
              {svc.cta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
