import React, { useState } from 'react';
import './Contact.css';

const SERVICES = [
  'Academic Support', 'Visa Handling', 'Web Development', 'Digital Marketing',
  'CRM & Business Software', 'E-Commerce Solutions', 'Investment Advisory', 'Hosting & Domain',
];

export default function Contact() {
  const [form, setForm] = useState({ fname: '', lname: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.fname || !form.email) {
      setError('Please fill in your name and email.');
      return;
    }
    setError('');
    setSubmitted(true);
    setForm({ fname: '', lname: '', email: '', service: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-grid">
        {/* Info */}
        <div className="contact-info reveal">
          <span className="section-label" style={{ color: '#8DC63F' }}>Get In Touch</span>
          <h2 className="section-title" style={{ color: 'white' }}>
            Ready to Start?<br />Let's Talk.
          </h2>
          <p>
            Whether you're a student needing academic help, a startup looking to launch,
            or an investor seeking guidance — we're here for you. Reach out today.
          </p>
          <div className="contact-details">
            <div className="contact-detail">
              <div className="cdet-icon">📍</div>
              <div className="cdet-text">
                <span>Address</span>
                <p>Near Bharat Matha College, Thrikkakara,<br />Ernakulam, Kerala, India</p>
              </div>
            </div>
            <div className="contact-detail">
              <div className="cdet-icon">📞</div>
              <div className="cdet-text">
                <span>Phone</span>
                <a href="tel:+916238097506">+91 62380 97506</a>
              </div>
            </div>
            <div className="contact-detail">
              <div className="cdet-icon">✉️</div>
              <div className="cdet-text">
                <span>Email</span>
                <a href="mailto:info@lucintelsolutions.online">info@lucintelsolutions.online</a>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="contact-form-wrap reveal">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="fname"
                  placeholder="John"
                  value={form.fname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lname"
                  placeholder="Doe"
                  value={form.lname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Service Needed</label>
              <select name="service" value={form.service} onChange={handleChange}>
                <option value="">Select a service...</option>
                {SERVICES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Tell us about your requirement..."
                value={form.message}
                onChange={handleChange}
                rows={4}
              />
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="form-submit">
              Send Message →
            </button>
            {submitted && (
              <div className="form-success">
                ✅ Message received! We'll get back to you shortly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
