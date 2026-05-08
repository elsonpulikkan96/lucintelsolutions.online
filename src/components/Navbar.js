import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#home" className="logo-wrap" onClick={e => handleNav(e, '#home')}>
            <Logo size={38} />
            <div className="logo-text">
              <span className="logo-lucintel">Lucintel</span>
              <span className="logo-solutions">Solutions</span>
            </div>
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a href={link.href} onClick={e => handleNav(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="nav-cta" onClick={e => handleNav(e, '#contact')}>
            Get Started
          </a>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(link => (
          <a key={link.href} href={link.href} onClick={e => handleNav(e, link.href)}>
            {link.label}
          </a>
        ))}
        <a href="#contact" className="mobile-cta" onClick={e => handleNav(e, '#contact')}>
          Get Started
        </a>
      </div>
    </>
  );
}
