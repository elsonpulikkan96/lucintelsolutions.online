import React from 'react';
import './Process.css';

const STEPS = [
  {
    num: '01',
    title: 'Reach Out',
    desc: 'Contact us via phone, email, or our form. Tell us what you need — we are ready to listen.',
  },
  {
    num: '02',
    title: 'Consultation',
    desc: 'We understand your goals and craft a tailored plan that fits your timeline and budget.',
  },
  {
    num: '03',
    title: 'Execution',
    desc: 'Our expert team gets to work — whether it is an assignment, a website, or a visa application.',
  },
  {
    num: '04',
    title: 'Delivery & Support',
    desc: 'We deliver results and stay with you for ongoing support, updates, and monitoring.',
  },
];

export default function Process() {
  return (
    <section id="process" className="process-section">
      <div className="section-header reveal">
        <span className="section-label">How It Works</span>
        <h2 className="section-title">
          From Inquiry to <span>Outcome</span>
        </h2>
        <p className="section-sub">
          A simple four-step journey that takes you from first contact to successful results.
        </p>
      </div>

      <div className="steps reveal">
        {STEPS.map((step, i) => (
          <div key={step.num} className="step">
            <div className="step-connector">
              <div className="step-num">{step.num}</div>
              {i < STEPS.length - 1 && <div className="step-line" />}
            </div>
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
