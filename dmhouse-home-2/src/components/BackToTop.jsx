import React, { useState, useEffect } from 'react';
import '../styles/BackToTop.css';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;

            const scrollPercent = (scrollTop / docHeight) * 100;
            setProgress(scrollPercent);

            if (scrollTop > window.innerHeight * 1.5) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // SVG Circle Math
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <button
            className={`back-to-top ${isVisible ? 'is-visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Back to Top"
        >
            <div className="btt-content">
                {/* Progress Ring SVG */}
                <svg className="btt-progress" width="44" height="44" viewBox="0 0 44 44">
                    <circle
                        className="btt-bg-ring"
                        cx="22" cy="22" r={radius}
                        fill="transparent"
                        strokeWidth="3"
                    />
                    <circle
                        className="btt-fill-ring"
                        cx="22" cy="22" r={radius}
                        fill="transparent"
                        strokeWidth="3"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                    />
                </svg>

                {/* Arrow Icon */}
                <span className="btt-icon">
                    <img src="/svg/top.svg" alt="Up" style={{ width: '14px' }} />
                </span>
            </div>
        </button>
    );
}