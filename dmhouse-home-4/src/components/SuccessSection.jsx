import React, { useState, useRef, useEffect } from 'react';
import '../styles/SuccessSection.css';

const SUCCESS_DATA = [
    {
        id: 1,
        title: 'جواهری حقانی',
        badge: 'CASE STUDY 01',
        img: 'https://dmhouse.agency/wp-content/uploads/2024/06/%D8%AD%D9%82%D8%A7%D9%86%DB%8C-min.png',
        metric: { val: '100', unit: 'میلیارد+', label: 'فروش آنلاین ماهانه (تومان)', colorClass: 'text-gradient-gold' },
        grid: [
            { label: 'چالش اصلی', val: 'فروش صفر', type: 'is-danger' },
            { label: 'راهکار ما', val: 'طراحی سایت حرفه ای و سئو', type: 'is-success' }
        ]
    },
    {
        id: 2,
        title: 'وکیل قدیری',
        badge: 'CASE STUDY 02',
        img: 'https://alireza-ghadiri.com/wp-content/uploads/2023/10/%D8%B9%DA%A9%D8%B3-%D8%B9%D9%84%DB%8C%D8%B1%D8%B6%D8%A7-%D9%82%D8%AF%DB%8C%D8%B1%DB%8C-min.jpg',
        metric: { val: '1000', unit: 'تماس', label: 'در ماه', colorClass: 'text-gradient-blue' },
        grid: [
            { label: 'چالش اصلی', val: 'تماس کم', type: 'is-danger' },
            { label: 'راهکار ما', val: 'سئوی حرفه ای کلمات حقوقی', type: 'is-success' }
        ]
    },
    {
        id: 3,
        title: 'عسل راوان',
        badge: 'CASE STUDY 03',
        img: 'https://ravanhoney.com/wp-content/uploads/2025/11/h1-rev-img-12-removebg-preview-min.png',
        metric: { val: 'هویت', unit: 'بصری', label: 'خلق برند یونیک', colorClass: 'text-gradient-purple' },
        grid: [
            { label: 'چالش اصلی', val: 'نداشتن هویت', type: 'is-danger' },
            { label: 'راهکار ما', val: 'طراحی لوگو و هویت بصری', type: 'is-success' }
        ]
    }
];

export default function SuccessSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Refs for Drag Logic
    const trackRef = useRef(null);

    // Refs for 3D Nav Logic
    const navRef = useRef(null);
    const [navRotation, setNavRotation] = useState({ x: 0, y: 0 });

    const goNext = () => setActiveIndex((prev) => (prev + 1) % SUCCESS_DATA.length);
    const goPrev = () => setActiveIndex((prev) => (prev - 1 + SUCCESS_DATA.length) % SUCCESS_DATA.length);

    // === DRAG LOGIC FOR CARDS ===
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let isDragging = false;
        let startX = 0;
        let deltaX = 0;

        const onDown = (e) => {
            if (e.target.closest('button')) return;
            startX = e.clientX;
            isDragging = true;
            track.style.cursor = 'grabbing';
            track.setPointerCapture(e.pointerId);
        };

        const onMove = (e) => {
            if (!isDragging) return;
            deltaX = e.clientX - startX;
        };

        const onUp = () => {
            if (!isDragging) return;
            isDragging = false;
            track.style.cursor = 'grab';
            if (deltaX < -50) goNext();
            else if (deltaX > 50) goPrev();
            deltaX = 0;
        };

        track.addEventListener('pointerdown', onDown);
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);

        return () => {
            track.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
        };
    }, []);

    // === 3D NAV HOVER LOGIC ===
    const handleNavMouseMove = (e) => {
        if (!navRef.current) return;
        const rect = navRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation based on cursor position relative to center
        // Max tilt: 15deg
        const rotY = ((mouseX / width) - 0.5) * 20;
        const rotX = ((mouseY / height) - 0.5) * -20;

        setNavRotation({ x: rotX, y: rotY });
    };

    const handleNavMouseLeave = () => {
        setNavRotation({ x: 0, y: 0 });
    };

    return (
        <section id="success" className="success-story page-container">
            <header className="head">
                <div className="title-group">
                    <span className="en-title">Our Success</span>
                    <h2>
                        داستان موفقیت <span className="highlight">ما</span>
                    </h2>
                </div>
                <p className="subtitle">
                    داستان موفقیت ما از دیدگاه مشتریان
                </p>
            </header>

            <div className="success-carousel-wrapper">
                {/* 1. CARDS CONTAINER */}
                <div className="success-carousel">
                    <div
                        className="success-cards"
                        ref={trackRef}
                        onDragStart={(e) => e.preventDefault()}
                    >
                        {SUCCESS_DATA.map((card, index) => {
                            let className = 'success-card';
                            if (index === activeIndex) className += ' is-active';
                            else if (index === (activeIndex + 1) % SUCCESS_DATA.length) className += ' is-next';

                            return (
                                <article key={card.id} className={className}>
                                    <div className="success-card__visual">
                                        <div className="visual-backdrop"></div>
                                        <img
                                            src={card.img}
                                            alt={card.title}
                                            loading="lazy"
                                            draggable={false}
                                            style={{ userSelect: 'none' }}
                                        />
                                    </div>

                                    <div className="success-card__content">
                                        <div className="sc-meta">
                                            <span className="sc-badge">{card.badge}</span>
                                            <h3 className="sc-title">{card.title}</h3>
                                        </div>

                                        <div className="sc-metric-wrapper">
                                            <div className={`sc-metric-val ${card.metric.colorClass}`}>
                                                {card.metric.val}
                                            </div>
                                            <div className="sc-metric-info">
                                                <span className="sc-metric-unit">{card.metric.unit}</span>
                                                <span className="sc-metric-label">{card.metric.label}</span>
                                            </div>
                                        </div>

                                        <div className="sc-comparison-grid">
                                            {card.grid.map((item, i) => (
                                                <div className={`sc-compare-box ${item.type}`} key={i}>
                                                    <span className="sc-cp-label">{item.label}</span>
                                                    <div className="sc-cp-val">{item.val}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                {/* 2. DYNAMIC 3D CONTROLS */}
                <div className="success-controls-3d-wrapper">
                    <div
                        className="success-controls-3d"
                        ref={navRef}
                        onMouseMove={handleNavMouseMove}
                        onMouseLeave={handleNavMouseLeave}
                        style={{
                            '--navRotX': `${navRotation.x}deg`,
                            '--navRotY': `${navRotation.y}deg`
                        }}
                    >
                        <button className="nav-btn nav-btn--next" onClick={goNext} aria-label="Next Project">
                            <span className="btn-text">پروژه بعدی</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <div className="nav-divider"></div>
                        <button className="nav-btn nav-btn--prev" onClick={goPrev} aria-label="Previous Project">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}