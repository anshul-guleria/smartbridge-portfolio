import React from 'react'
import './Skills.css'

const Skills = ({ skills }) => {
  const categories = Object.entries(skills)

  return (
    <section className="skills section" id="skills">
      <div className="section-inner">
        <div className="section-label">
          <span className="section-label__line"></span>
          <span className="section-label__text">Skills</span>
        </div>
        <h2 className="section-title">What I Work With</h2>
        <div className="skills__grid">
          {categories.map(([category, items]) => (
            <div key={category} className="skills__category">
              <h4 className="skills__category-name">{category}</h4>
              <div className="skills__items">
                {items.map(skill => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills