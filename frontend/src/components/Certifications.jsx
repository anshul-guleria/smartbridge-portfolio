import React from 'react'
import './Certifications.css'

const Certifications = ({ certifications }) => {
    if (!certifications || !certifications.length) return null;

    return (
        <section id="certifications" className="certifications section">
            <div className="section-inner">
                <div className="section-label">
                    <span className="section-label__line" />
                    <span className="section-label__text">Certifications</span>
                </div>
                <h2 className="section-title">My Certifications & Achievements</h2>

                <div className="cert-grid">
                    {certifications.map((cert, i) => (
                        <div key={`cert-${i}`} className="cert-card">
                            <div className="cert-card__img-wrapper">
                                <img src={cert.image} alt={cert.name} loading="lazy" />
                            </div>
                            <div className="cert-card__content">
                                <h3 className="cert-card__title">{cert.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Certifications
