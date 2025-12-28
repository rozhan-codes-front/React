import React, { useState, useRef, useEffect } from 'react';

// === DATA CONFIGURATION ===
// Extracted from your HTML for easier management
const SUCCESS_DATA = [
    {
        id: 1,
        title: 'جواهری حقانی',
        badge: 'CASE STUDY 01',
        img: 'https://dmhouse.agency/wp-content/uploads/2024/06/%D8%AD%D9%82%D8%A7%D9%86%DB%8C-min.png',
        metric: { val: '100', unit: 'میلیارد+', label: 'فروش آنلاین ماهانه (تومان)', colorClass: '' },
        grid: [
            { label: 'چالش', val: 'فروش صفر', type: 'text-danger' },
            { label: 'راهکار', val: 'طراحی سایت حرفه ای و سئو', type: 'text-accent' }
        ]
    },
    {
        id: 2,
        title: 'وکیل قدیری',
        badge: 'CASE STUDY 02',
        img: 'https://alireza-ghadiri.com/wp-content/uploads/2023/10/%D8%B9%DA%A9%D8%B3-%D8%B9%D9%84%DB%8C%D8%B1%D8%B6%D8%A7-%D9%82%D8%AF%DB%8C%D8%B1%DB%8C-min.jpg',
        metric: { val: '1000', unit: 'تماس', label: 'در ماه', colorClass: 'text-blue' },
        grid: [
            { label: 'چالش', val: 'تماس کم', type: 'text-danger' },
            { label: 'راهکار', val: 'سئوی حرفه ای روی تمام کلمات حقوقی مشهد', type: 'text-accent' }
        ]
    },
    {
        id: 3,
        title: 'عسل راوان',
        badge: 'CASE STUDY 03',
        img: 'https://ravanhoney.com/wp-content/uploads/2025/11/h1-rev-img-12-removebg-preview-min.png',
        metric: { val: 'هویت', unit: 'منحصر به فرد', label: 'و شناسایی برند', colorClass: 'text-purple' },
        grid: [
            { label: 'چالش', val: 'نداشتن هویت', type: 'text-danger' },
            { label: 'راهکار', val: 'طراحی لوگو و رنگ و هویت بصری', type: 'text-accent' }
        ]
    }
];

export default function SuccessSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const trackRef = useRef(null);

    // Navigation Logic
    const goNext = () => {
        setActiveIndex((prev) => (prev + 1) % SUCCESS_DATA.length);
    };

    const goPrev = () => {
        setActiveIndex((prev) => (prev - 1 + SUCCESS_DATA.length) % SUCCESS_DATA.length);
    };

    // Drag / Swipe Logic
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let isDragging = false;
        let startX = 0;
        let deltaX = 0;

        const onDown = (e) => {
            if (e.target.closest('button')) return; // Ignore buttons
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

            // Swipe Threshold (80px)
            if (deltaX < -80) goNext();
            else if (deltaX > 80) goPrev();
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

    return (
        <section id="success" className="success-story page-container">
            <header className="head">
                <h2>داستان موفقیت</h2>
                <p className="subtitle">
                    داستان موفقیت ما از دیدگاه مشتریان
                </p>
            </header>

            <div className="success-carousel">
                <div className="success-cards" ref={trackRef}>
                    {SUCCESS_DATA.map((card, index) => {
                        // Determine Classes
                        let className = 'success-card';
                        if (index === activeIndex) className += ' is-active';
                        else if (index === (activeIndex + 1) % SUCCESS_DATA.length) className += ' is-next';

                        // Note: For 'is-exit' animations in React, you typically need
                        // a 'prevIndex' ref to determine direction, but this base logic
                        // covers the static and active states requested.

                        return (
                            <article key={card.id} className={className}>
                                <div className="success-card__visual">
                                    <img src={card.img} alt={card.title} />
                                </div>

                                <div className="success-card__content">
                                    <div className="sc-header">
                                        <span className="sc-badge">{card.badge}</span>
                                        <h3 className="sc-title">{card.title}</h3>
                                    </div>

                                    <div className="sc-hero-metric">
                                        <div className={`sc-hero-val ${card.metric.colorClass}`}>
                                            {card.metric.val}
                                            <span className="sc-hero-unit">{card.metric.unit}</span>
                                        </div>
                                        <p className="sc-hero-label">{card.metric.label}</p>
                                    </div>

                                    <div className="sc-grid">
                                        {card.grid.map((item, i) => (
                                            <div className="sc-box" key={i}>
                                                <span className="sc-box-label">{item.label}</span>
                                                <div className={`sc-box-val ${item.type}`}>
                                                    {item.val}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="success-controls">
                    <button
                        className="success-btn success-btn--prev"
                        aria-label="Previous Project"
                        onClick={goPrev}
                    >
                        <span className="btn-icon">
                            <img
                                src="/svg/left.svg"
                                alt=""
                                width="25px"
                                style={{ transform: 'rotate(180deg)' }}
                            />
                        </span>
                    </button>

                    <button
                        className="success-btn success-btn--next"
                        aria-label="Next Project"
                        onClick={goNext}
                    >
                        <span className="btn-text">پروژه بعدی</span>
                        <span className="btn-icon">
                            <img src="/svg/left.svg" alt="" width="25px" />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}