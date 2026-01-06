import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../styles/ConsultationModal.css';

export default function ConsultationModal({ isOpen, onClose }) {
    const bubbleRef = useRef(null);
    const [formStatus, setFormStatus] = useState('idle');

    // === HANDLE CLICKS OUTSIDE ===
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && bubbleRef.current && !bubbleRef.current.contains(event.target)) {
                onClose();
            }
        };
        // Add listener only when open
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    // === ANIMATION LOGIC ===
    useEffect(() => {
        if (isOpen) {
            // POP OPEN
            gsap.fromTo(bubbleRef.current,
                { scale: 0, opacity: 0, transformOrigin: "bottom left", rotation: -5, display: 'none' },
                {
                    display: 'block',
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.6)"
                }
            );
        } else if (bubbleRef.current) {
            // POP CLOSE
            gsap.to(bubbleRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.2,
                ease: "back.in(1.5)",
                onComplete: () => {
                    gsap.set(bubbleRef.current, { display: 'none' });
                    setFormStatus('idle');
                }
            });
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        setTimeout(() => setFormStatus('success'), 1500);
    };

    return (
        <div className="consult-bubble-container" ref={bubbleRef}>

            {/* TAIL */}
            <div className="bubble-tail"></div>

            {/* CLOSE BUTTON */}
            <button className="consult-close-btn" onClick={(e) => { e.stopPropagation(); onClose(); }}>✕</button>

            {formStatus === 'success' ? (
                <div className="consult-success-view">
                    <div className="success-icon">🎉</div>
                    <h3>دریافت شد!</h3>
                    <p>به زودی با شما تماس می‌گیریم.</p>
                </div>
            ) : (
                <>
                    <div className="consult-header">
                        <span className="consult-emoji">💬</span>
                        <div>
                            <h3>مشاوره فوری</h3>
                            <p>شماره خود را بگذارید تا تماس بگیریم.</p>
                        </div>
                    </div>

                    <form className="consult-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="نام شما" className="compact-input" required />
                        <input type="tel" placeholder="شماره تماس" className="compact-input" dir="ltr" style={{textAlign: 'right'}} required />

                        <button type="submit" className="consult-submit-btn" disabled={formStatus === 'submitting'}>
                            {formStatus === 'submitting' ? '...' : 'ثبت درخواست'}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}