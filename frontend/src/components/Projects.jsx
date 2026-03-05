import React, { useState, useEffect, useCallback } from 'react'
import './Projects.css'

/* ── Status badge colours ─────────────────────────────── */
const STATUS_COLORS = {
  'Live': { dot: '#4ade80', label: '#4ade80' },
  'In Development': { dot: '#facc15', label: '#facc15' },
  'Completed': { dot: '#94a3b8', label: '#94a3b8' },
}

/* ── Modal ────────────────────────────────────────────── */
const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const status = STATUS_COLORS[project.status] || STATUS_COLORS['Archived']

  return (
    <div className="pm-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pm-panel" onClick={(e) => e.stopPropagation()}>

        <button className="pm-close" onClick={onClose} aria-label="Close">
          <span>✕</span>
        </button>

        <div className="pm-content">

          <div className="pm-meta-row">
            <div className="pm-status">
              <span className="pm-status-dot" style={{ background: status.dot, boxShadow: `0 0 8px ${status.dot}` }} />
              <span className="pm-status-label" style={{ color: status.label }}>{project.status}</span>
            </div>
            <span className="pm-year-chip">{project.year}</span>
            <span className="pm-role-badge">{project.role}</span>
          </div>

          <h2 className="pm-title">{project.title}</h2>
          <p className="pm-long-desc">{project.longDescription}</p>

          <div className="pm-section">
            <h4 className="pm-section-title">Key Highlights</h4>
            <ul className="pm-highlights">
              {project.highlights.map((h, i) => (
                <li key={i} className="pm-highlight">
                  <span className="pm-bullet">▹</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="pm-section">
            <h4 className="pm-section-title">Tech Stack</h4>
            <div className="pm-tags">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="pm-actions">
            {project.link && project.link !== '#' && (
              <a href={project.link} className="btn btn-primary" target="_blank" rel="noreferrer">
                View Live ↗
              </a>
            )}
            {project.github && (
              <a href={project.github} className="btn btn-outline" target="_blank" rel="noreferrer">
                GitHub →
              </a>
            )}
            {project.docs && (
              <a href={project.docs} className="btn btn-outline" target="_blank" rel="noreferrer">
                Docs →
              </a>
            )}
            {project.video && (
              <a href={project.video} className="btn btn-outline" target="_blank" rel="noreferrer">
                Video →
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

/* ── Card (Text-only layout, no image) ────────────────── */
const ProjectCard = ({ project, onClick }) => (
  <div className="project-card" onClick={() => onClick(project)} role="button" tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter') onClick(project) }}>

    <div className="project-card__content">
      <div className="project-card__header">
        <span className="project-card__year">{project.year}</span>
        <span className="project-card__expand-hint">Expand ↗</span>
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>

      <div className="project-card__tags">
        {project.tags.slice(0, 3).map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
        {project.tags.length > 3 && (
          <span className="tag tag--more">+{project.tags.length - 3}</span>
        )}
      </div>

      <div className="project-card__footer">
        <span className="project-card__status" style={{ color: (STATUS_COLORS[project.status] || {}).label || '#94a3b8' }}>
          <span className="project-card__status-dot" style={{ background: (STATUS_COLORS[project.status] || {}).dot || '#94a3b8' }} />
          {project.status}
        </span>
        <span className="project-card__role">{project.role}</span>
      </div>
    </div>
  </div>
)

/* ── Section ──────────────────────────────────────────── */
const Projects = ({ projects }) => {
  const [active, setActive] = useState(null)
  const close = useCallback(() => setActive(null), [])

  return (
    <section className="projects section" id="projects">
      <div className="section-inner">
        <div className="section-label">
          <span className="section-label__line"></span>
          <span className="section-label__text">Projects</span>
        </div>
        <h2 className="section-title">Projects I've Worked On</h2>

        <div className="projects__grid">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} onClick={setActive} />
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  )
}

export default Projects