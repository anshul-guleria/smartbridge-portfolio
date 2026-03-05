import React, { useState } from 'react'
import './Experience.css'

const Experience = ({ experience }) => {
  const [expanded, setExpanded] = useState(0) // first (most recent) open by default

  const toggle = (i) => setExpanded(expanded === i ? null : i)

  return (
    <section className="experience section" id="experience">
      <div className="section-inner">

        {/* Header */}
        <div className="section-label">
          <span className="section-label__line" />
          <span className="section-label__text">Experience and education</span>
        </div>
        <h2 className="section-title">A look at my journey so far . . .</h2>

        {/* Timeline */}
        <div className="tl">

          {/* The vertical spine */}
          <div className="tl__spine" />

          {experience.map((exp, i) => {
            const isOpen   = expanded === i
            const isLeft   = i % 2 === 0   // even → card on left
            const isMostRecent = i === 0

            return (
              <div
                key={exp.id}
                className={`tl__row ${isLeft ? 'tl__row--left' : 'tl__row--right'}`}
                style={{ '--delay': `${i * 0.1}s` }}
              >
                {/* ── Spacer (opposite side) ── */}
                <div className="tl__spacer" />

                {/* ── Node on the spine ── */}
                <div className={`tl__node ${isMostRecent ? 'tl__node--current' : ''}`}>
                  <div className="tl__node-ring" />
                  <div className="tl__node-dot" />
                </div>

                {/* ── Branch connector ── */}
                <div className="tl__branch" />

                {/* ── Card ── */}
                <div
                  className={`tl__card ${isOpen ? 'tl__card--open' : ''}`}
                  onClick={() => toggle(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') toggle(i) }}
                  aria-expanded={isOpen}
                >
                  {/* Card top: date badge + company */}
                  <div className="tl__card-header">
                    <div className="tl__card-meta">
                      <span className="tl__duration">{exp.duration}</span>
                      {isMostRecent && <span className="tl__badge-current">Current</span>}
                    </div>
                    <span className={`tl__chevron ${isOpen ? 'tl__chevron--open' : ''}`}>›</span>
                  </div>

                  {/* Role + company */}
                  <h3 className="tl__role">{exp.role}</h3>
                  <div className="tl__company-row">
                    <span className="tl__company">{exp.company}</span>
                    <span className="tl__sep">·</span>
                    <span className="tl__location">{exp.location}</span>
                  </div>

                  {/* Expandable details */}
                  <div className={`tl__details ${isOpen ? 'tl__details--visible' : ''}`}>
                    <p className="tl__description">{exp.description}</p>
                    {exp.highlights ? <ul className="tl__highlights">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="tl__highlight">
                          <span className="tl__bullet">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul> : <></>}
                  </div>
                </div>

              </div>
            )
          })}

          {/* Timeline end cap */}
          <div className="tl__endcap">
            <div className="tl__endcap-dot" />
            <span className="tl__endcap-label">Start</span>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Experience