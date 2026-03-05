import React from 'react'
import './Mentoring.css'

const Mentoring = ({ mentoring }) => {
    if (!mentoring || !mentoring.photos) return null;

    return (
        <section id="mentoring" className="mentoring section">
            <div className="section-inner">

                {/* Header */}
                <div className="section-label">
                    <span className="section-label__line" />
                    <span className="section-label__text">Mentoring & Engagement</span>
                </div>
                <h2 className="section-title">{mentoring.title}</h2>
                <p className="mentoring__desc">{mentoring.description}</p>

                <div className="mentoring__marquee">
                    <div className="mentoring__track">
                        {mentoring.photos.map((photo, i) => (
                            <div key={`photo-${i}`} className="mentoring__card">
                                <img src={photo} alt={`Mentoring Hackathon ${i + 1}`} loading="lazy" />
                                <div className="mentoring__card-overlay">
                                    <span className="mentoring__card-icon"></span>
                                </div>
                            </div>
                        ))}
                        {/* Duplicate set for infinite seamless scrolling */}
                        {mentoring.photos.map((photo, i) => (
                            <div key={`photo-dup-${i}`} className="mentoring__card">
                                <img src={photo} alt={`Mentoring Hackathon ${i + 1} (Duplicate)`} loading="lazy" />
                                <div className="mentoring__card-overlay">
                                    <span className="mentoring__card-icon"></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Mentoring
