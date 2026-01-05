import React, { useState, useEffect } from 'react';
import { TESTIMONIALS_DATA } from '../config/testimonialsData';
import '../styles/TestimonialsSection.css';

export default function TestimonialsSection() {
    const [activeId, setActiveId] = useState(TESTIMONIALS_DATA[0].id);
    const [isHovering, setIsHovering] = useState(false);

    const activeData = TESTIMONIALS_DATA.find(d => d.id === activeId) || TESTIMONIALS_DATA[0];

    const track1 = TESTIMONIALS_DATA;

    const track2 = [...TESTIMONIALS_DATA].reverse();

    const midPoint = Math.floor(TESTIMONIALS_DATA.length / 2);
    const track3 = [
        ...TESTIMONIALS_DATA.slice(midPoint),
        ...TESTIMONIALS_DATA.slice(0, midPoint)
    ];

    useEffect(() => {
        if (isHovering) return;
        const interval = setInterval(() => {
            setActiveId(prevId => {
                const currentIndex = TESTIMONIALS_DATA.findIndex(item => item.id === prevId);
                const nextIndex = (currentIndex + 1) % TESTIMONIALS_DATA.length;
                return TESTIMONIALS_DATA[nextIndex].id;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [isHovering]);

    const handleMouseEnter = (id) => {
        setIsHovering(true);
        setActiveId(id);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const renderTrack = (items, direction = 'normal') => (
        <div className={`logo-track-wrapper ${direction}`}>
            <div className="logo-track">
                {/* We triple the list to ensure the infinite scroll has no gaps */}
                {[...items, ...items, ...items].map((item, idx) => (
                    <div
                        key={`${item.id}-${idx}`}
                        className={`logo-item ${activeId === item.id ? 'is-active' : ''}`}
                        onMouseEnter={() => handleMouseEnter(item.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={item.logo} alt="Client Logo" />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section className="testimonials-section page-container">
            <div className="testimonials-layout">
                <div className="t-stage-col">
                    <div className="t-stage-header">
                        <h2 className="t-title">مشتریان ما <br /> <span className="t-highlight">چه می‌گویند؟</span></h2>
                    </div>

                    <div
                        key={activeData.id}
                        className="t-display-card"
                        style={{ backgroundColor: activeData.cardColor }}
                    >
                        <div className="t-card-content">
                            <div className="t-quote-icon">❝</div>
                            <p className="t-quote-text">{activeData.quote}</p>

                            <div className="t-author-block">
                                <h4 className="t-name">{activeData.name}</h4>
                                <span className="t-role">{activeData.role}</span>
                            </div>
                        </div>

                        <div className="t-image-pop">
                            <img src={activeData.image} alt={activeData.name} />
                        </div>
                    </div>
                </div>

                <div className="t-tracks-col">
                    <div className="tracks-overlay-top"></div>
                    <div className="tracks-container">
                        {renderTrack(track1, 'up')}
                        {renderTrack(track2, 'down')}
                        {renderTrack(track3, 'up')}
                    </div>
                    <div className="tracks-overlay-bottom"></div>
                </div>
            </div>
        </section>
    );
}