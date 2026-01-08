import React, { useEffect, useRef } from 'react';

export default function Cursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Variables for Smooth Interpolation
        let mx = window.innerWidth / 2;
        let my = window.innerHeight / 2;
        let cx = mx;
        let cy = my;
        let rafId;

        // 1. Track Mouse Position
        const onMouseMove = (e) => {
            mx = e.clientX;
            my = e.clientY;
        };

        // 2. Animation Loop (60fps Smoothness)
        const animate = () => {
            // Lerp (Linear Interpolation) for delay effect
            cx += (mx - cx) * 0.18;
            cy += (my - cy) * 0.18;

            // Apply transform directly for performance (avoids React re-renders)
            cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;

            rafId = requestAnimationFrame(animate);
        };

        // 3. Smart Hover Logic (Event Delegation)
        // Detects hover on ANY current or future element dynamically
        const onMouseOver = (e) => {
            const target = e.target;

            // General Hover (Links, Buttons, Cards)
            if (target.closest('a') || target.closest('button') || target.closest('.serviceStackCard')) {
                cursor.classList.add('is-hover');
            }

            // Video Specific Hover
            if (target.closest('.videoThumb') || target.closest('.serviceVideo') || target.closest('.videoPreview')) {
                cursor.classList.add('is-video');
            }
        };

        const onMouseOut = (e) => {
            const target = e.target;

            if (target.closest('a') || target.closest('button') || target.closest('.serviceStackCard')) {
                cursor.classList.remove('is-hover');
            }

            if (target.closest('.videoThumb') || target.closest('.serviceVideo') || target.closest('.videoPreview')) {
                cursor.classList.remove('is-video');
            }
        };

        const onMouseDown = () => cursor.classList.add('is-active');
        const onMouseUp = () => cursor.classList.remove('is-active');

        // Attach Listeners
        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onMouseOver); // Use document to catch bubbling events
        document.addEventListener('mouseout', onMouseOut);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        // Start Animation
        animate();

        // Cleanup on Unmount
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="cursor" ref={cursorRef}>
            <div className="cursor__inner">
                <span className="cursor__icon">▶</span>
            </div>
        </div>
    );
}