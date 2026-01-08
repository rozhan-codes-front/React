import React, { useState, useEffect, useRef } from 'react';
import '../styles/BackToTop.css';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const progressRef = useRef(null);
    const rafId = useRef(null);

    // Constants
    const radius = 18;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const handleScroll = () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);

            rafId.current = requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.body.scrollHeight - window.innerHeight;

                const shouldBeVisible = scrollTop > window.innerHeight * 1.5;
                setIsVisible(prev => (prev !== shouldBeVisible ? shouldBeVisible : prev));

                if (progressRef.current && docHeight > 0) {
                    const scrollPercent = scrollTop / docHeight;
                    const dashoffset = circumference - (scrollPercent * circumference);

                    progressRef.current.style.strokeDashoffset = dashoffset;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [circumference]);

    const handleTouchEnd = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className={`back-to-top ${isVisible ? 'is-visible' : ''}`}
            onClick={handleClick}
            onTouchEnd={handleTouchEnd}
            aria-label="Back to Top"
        >
            <div className="btt-content">
                <svg className="btt-progress" width="44" height="44" viewBox="0 0 44 44">
                    <circle
                        className="btt-bg-ring"
                        cx="22" cy="22" r={radius}
                        fill="transparent"
                        strokeWidth="3"
                    />
                    <circle
                        ref={progressRef}
                        className="btt-fill-ring"
                        cx="22" cy="22" r={radius}
                        fill="transparent"
                        strokeWidth="3"
                        strokeDasharray={circumference}
                        style={{ strokeDashoffset: circumference }}
                    />
                </svg>

                <span className="btt-icon">
                    <img src="https://dmhouse.agency/wp-content/uploads/2025/12/top.svg" alt="Up" style={{ width: '14px' }} />
                </span>
            </div>
        </button>
    );
}