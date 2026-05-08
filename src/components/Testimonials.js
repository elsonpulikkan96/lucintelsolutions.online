import React from 'react';
import './Testimonials.css';

const REVIEWS = [
  {
    stars: 5,
    text: 'Lucintel helped me with my final year dissertation when I was completely stuck. The quality was exceptional and they delivered right on time.',
    name: 'Arun Raj',
    location: 'Student, UK',
    initials: 'AR',
    color: 'var(--blue)',
  },
  {
    stars: 5,
    text: 'They built our e-commerce website from scratch and also handled the domain and hosting. Professional team, great communication throughout.',
    name: 'Sarah Mitchell',
    location: 'Business Owner, Australia',
    initials: 'SM',
    color: 'var(--green)',
  },
  {
    stars: 5,
    text: 'The visa handling service was flawless. Documentation was organized perfectly and I had zero stress throughout the entire process.',
    name: 'Priya Kumar',
    location: 'Professional, Canada',
    initials: 'PK',
    color: '#e9a234',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="section-header reveal">
        <span className="section-label">Client Reviews</span>
        <h2 className="section-title">
          What Our <span>Clients</span> Say
        </h2>
        <p className="section-sub">
          Real experiences from students, businesses, and investors we have served across the globe.
        </p>
      </div>
      <div className="testimonials-grid reveal">
        {REVIEWS.map(r => (
          <div key={r.name} className="tcard">
            <div className="tcard-stars">{'★'.repeat(r.stars)}</div>
            <p>"{r.text}"</p>
            <div className="tcard-author">
              <div className="tcard-avatar" style={{ background: r.color }}>
                {r.initials}
              </div>
              <div>
                <div className="tcard-name">{r.name}</div>
                <div className="tcard-loc">{r.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
