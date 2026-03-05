import React from 'react'
import './About.css'

const About = ({ personal }) => {
  return (
    <section className="about section" id="about">
      <div className="section-inner about__inner">

        {/* Text */}
        <div className="about__content">
          <p className="about__greeting">Hi, my name is</p>
          <h1 className="about__name">{personal.name}</h1>
          <h2 className="about__tagline">{personal.tagline}</h2>
          <p className="about__bio">{personal.bio}</p>
          <div className="about__actions">
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </button>
            <a className="about__resume-link" target='_blank' href="https://drive.google.com/file/d/1vw2fn3lZeb3PQ0Hd4c6Vw2yDrFa4sBk0/view?usp=sharing" >Download CV ↓</a>
          </div>

          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-value">0.5+</span>
              <span className="about__stat-label">Years Exp.</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-value">5+</span>
              <span className="about__stat-label">Projects</span>
            </div>
          </div>
        </div>

        {/* Decoration */}
        <div className="about__decoration">
          <img src={personal.image} className="about__avatar"></img>
          <div className="about__deco-ring"></div>
          <div className="about__deco-ring-2"></div>
          <div className="about__deco-dot about__deco-dot--1"></div>
          <div className="about__deco-dot about__deco-dot--2"></div>
          <div className="about__deco-dot about__deco-dot--3"></div>
        </div>

      </div>
    </section>
  )
}

export default About