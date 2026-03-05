import React from 'react'
import './Contact.css'

const Contact = ({ personal }) => {
  return (
    <section className="contact section" id="contact">
      <div className="section-inner">

        {/* Heading */}
        <div className="contact__heading-area">
          <div className="section-label">
            <span className="section-label__line" />
            <span className="section-label__text">Contact</span>
          </div>
          <h2 className="contact__headline">
            Let's <em>connect.</em>
          </h2>
        </div>

        {/* 3-Card Grid */}
        <div className="contact__cards">

          {/* Email */}
          <a href={`mailto:${personal.email}`} className="contact__card">
            <div className="contact__card-icon">✉</div>
            <h3 className="contact__card-title">Email</h3>
            <p className="contact__card-desc">Drop me a line anytime</p>
            <span className="contact__card-value">{personal.email}</span>
          </a>

          {/* LinkedIn */}
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="contact__card">
            <div className="contact__card-icon">in</div>
            <h3 className="contact__card-title">LinkedIn</h3>
            <p className="contact__card-desc">Let's connect professionally</p>
            <span className="contact__card-value">View Profile ↗</span>
          </a>

          {/* GitHub */}
          <a href={personal.github} target="_blank" rel="noreferrer" className="contact__card">
            <div className="contact__card-icon">⌥</div>
            <h3 className="contact__card-title">GitHub</h3>
            <p className="contact__card-desc">Check out my open source code</p>
            <span className="contact__card-value">View Repos ↗</span>
          </a>

        </div>

        <div className="contact__footer">
          <p className="contact__footer-text">
            Designed & Built by {personal.name} · 2026<br/>
            AIML Intern · TheSmartBridge
          </p>
          
        </div>
      </div>
    </section>
  )
}

export default Contact