import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom'; // Import Portal
import { TESTIMONIALS_DATA } from '../config/testimonialsData';
import '../styles/TestimonialsSection.css';

export default function TestimonialsSection() {
    const [activeId, setActiveId] = useState(TESTIMONIALS_DATA[0].id);
    const [isHovering, setIsHovering] = useState(false);

    // Video State
    const [hoveredVideo, setHoveredVideo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState(null);

    // Ref for the thumbnail element to follow mouse directly
    const thumbRef = useRef(null);

    const activeData = TESTIMONIALS_DATA.find(d => d.id === activeId) || TESTIMONIALS_DATA[0];

    // Tracks
    const track1 = TESTIMONIALS_DATA;
    const track2 = [...TESTIMONIALS_DATA].reverse();
    const midPoint = Math.floor(TESTIMONIALS_DATA.length / 2);
    const track3 = [...TESTIMONIALS_DATA.slice(midPoint), ...TESTIMONIALS_DATA.slice(0, midPoint)];

    // 1. Auto Rotation (Pauses on hover or modal)
    useEffect(() => {
        if (isHovering || isModalOpen) return;
        const interval = setInterval(() => {
            setActiveId(prevId => {
                const currentIndex = TESTIMONIALS_DATA.findIndex(item => item.id === prevId);
                const nextIndex = (currentIndex + 1) % TESTIMONIALS_DATA.length;
                return TESTIMONIALS_DATA[nextIndex].id;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [isHovering, isModalOpen]);

    // 2. Mouse Tracking Logic (Only active when a video is hovered)
    useEffect(() => {
        if (!hoveredVideo) return;

        const moveThumb = (e) => {
            if (thumbRef.current) {
                // Center the thumbnail on the cursor
                // We use fixed positioning in CSS, so clientX/Y works perfectly
                thumbRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            }
        };

        window.addEventListener('mousemove', moveThumb);
        return () => window.removeEventListener('mousemove', moveThumb);
    }, [hoveredVideo]);

    const handleMouseEnter = (item) => {
        setIsHovering(true);
        setActiveId(item.id);
        setHoveredVideo(item);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setHoveredVideo(null);
    };

    const openModal = (item) => {
        if (item.videoUrl) {
            setCurrentVideoUrl(item.videoUrl);
            setIsModalOpen(true);
            setIsHovering(false);
            setHoveredVideo(null);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentVideoUrl(null);
    };

    const renderTrack = (items, direction = 'normal') => (
        <div className={`logo-track-wrapper ${direction}`}>
            <div className="logo-track">
                {[...items, ...items, ...items].map((item, idx) => (
                    <div
                        key={`${item.id}-${idx}`}
                        // Add 'videoThumb' class here so your Cursor.jsx detects it!
                        className={`logo-item videoThumb ${activeId === item.id ? 'is-active' : ''}`}
                        onMouseEnter={() => handleMouseEnter(item)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => openModal(item)}
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
                {/* STAGE COL */}
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

                {/* TRACKS COL */}
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

            {/* PORTALS: Render outside of the section to avoid overflow:hidden clipping */}
            {typeof document !== 'undefined' && createPortal(
                <>
                    {/* Floating Thumbnail */}
                    <div
                        ref={thumbRef}
                        className={`t-floating-thumb ${hoveredVideo ? 'is-visible' : ''}`}
                    >
                        {hoveredVideo && (
                            <>
                                <div className="thumb-overlay"></div>
                                {/* Fallback to main image if videoThumb is missing */}
                                <img
                                    src={hoveredVideo.videoThumb || hoveredVideo.image}
                                    alt="Video Preview"
                                />
                            </>
                        )}
                    </div>

                    {/* Video Modal */}
                    {isModalOpen && (
                        <div className="t-video-modal">
                            <div className="t-modal-backdrop" onClick={closeModal}></div>
                            <div className="t-modal-content">
                                <button className="t-close-btn" onClick={closeModal}>✕</button>
                                <div className="t-video-wrapper">
                                    <video
                                        src={currentVideoUrl}
                                        controls
                                        autoPlay
                                        className="t-modal-video"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </>,
                document.body
            )}
        </section>
    );
}