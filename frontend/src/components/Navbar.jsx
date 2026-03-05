import React, { useState, useEffect } from 'react'
import './Navbar.css'

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isDark = theme === 'dark'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} navbar--${theme}`}>

      {/* Logo */}
      <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
        <img src="/logo.png" alt="SmartBridge" style={{ height: '56px', width: 'auto', objectFit: 'contain', display: 'block' }} />
      </div>

      {/* Nav links */}
      <ul className={`nav-links-area ${menuOpen ? 'nav-links-area--open' : ''}`}>
        <li className="nav-link" onClick={() => scrollTo('about')}>About</li>
        <li className="nav-link" onClick={() => scrollTo('skills')}>Skills</li>
        <li className="nav-link" onClick={() => scrollTo('projects')}>Projects</li>
        <li className="nav-link" onClick={() => scrollTo('experience')}>Experience</li>
        <li className="nav-link" onClick={() => scrollTo('mentoring')}>Mentoring</li>
        <li className="nav-link" onClick={() => scrollTo('certifications')}>Certifications</li>
      </ul>

      {/* Right side controls */}
      <div className="navbar__right">

        {/* Theme toggle */}
        <button
          className={`theme-toggle ${isDark ? 'theme-toggle--dark' : 'theme-toggle--light'}`}
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          <span className="theme-toggle__track">
            <span className="theme-toggle__thumb">
              {/* Sun icon */}
              <svg className="theme-toggle__icon theme-toggle__icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              {/* Moon icon */}
              <svg className="theme-toggle__icon theme-toggle__icon--moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </span>
          </span>
        </button>

        {/* Contact CTA (hidden on mobile) */}
        <button className="btn btn-primary navbar__cta" onClick={() => scrollTo('contact')}>
          Contact Me →
        </button>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

    </nav>
  )
}

export default Navbar
