import React from 'react';
import './Footer.css';
import Logo from './Logo';

export default function Footer() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <Logo size={32} />
            <span>Lucintel Solutions</span>
          </div>
          <p>
            "The solutions you are looking for" — serving students, businesses, and investors
            across India, UK, Australia, Canada, Germany &amp; France.
          </p>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <button onClick={() => scrollTo('#services')}>Academic Support</button>
          <button onClick={() => scrollTo('#services')}>Visa Handling</button>
          <button onClick={() => scrollTo('#services')}>Web Development</button>
          <button onClick={() => scrollTo('#services')}>Digital Marketing</button>
        </div>

        <div className="footer-col">
          <h4>Business</h4>
          <button onClick={() => scrollTo('#services')}>CRM Systems</button>
          <button onClick={() => scrollTo('#services')}>E-Commerce</button>
          <button onClick={() => scrollTo('#services')}>Hosting &amp; Domain</button>
          <button onClick={() => scrollTo('#services')}>Investment Advisory</button>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a href="tel:+916238097506">+91 62380 97506</a>
          <a href="mailto:info@lucintelsolutions.online">info@lucintelsolutions.online</a>
          <span>Thrikkakara, Kerala, India</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Lucintel Solutions. All rights reserved.</span>
        <span>Built with ❤️ in Kerala, India</span>
      </div>
    </footer>
  );
}
