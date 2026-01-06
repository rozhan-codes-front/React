import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/ServicesSection.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
    {
        id: 1,
        href: '#',
        title: 'سئو و رشد ارگانیک',
        shortDesc: 'افزایش ترافیک هدفمند و جایگاه پایدار در گوگل',
        video: 'https://dmhouse.agency/wp-content/uploads/2025/12/tech.mp4',
        tag: 'تخصصی',
        features: ['کیورد ریسرچ پیشرفته', 'سئو تکنیکال', 'لینک‌سازی استراتژیک'],
        ctaPrimary: 'جزئیات سرویس',
    },
    {
        id: 2,
        href: '#',
        title: 'طراحی سایت مدرن',
        shortDesc: 'تجربه کاربری سریع، زیبا و تبدیل‌محور',
        video: 'https://dmhouse.agency/wp-content/uploads/2025/12/tech.mp4',
        tag: 'UI/UX',
        features: ['طراحی اختصاصی', 'ریسپانسیو و سریع', 'بهینه برای فروش'],
        ctaPrimary: 'نمونه‌کارها',
    },
    {
        id: 3,
        href: '#',
        title: 'دیجیتال مارکتینگ',
        shortDesc: 'کمپین‌های داده‌محور برای جذب لید باکیفیت',
        video: 'https://dmhouse.agency/wp-content/uploads/2025/12/tech.mp4',
        tag: 'رشد',
        features: ['تبلیغات گوگل/ادز', 'سوشال مدیا مارکتینگ', 'تحلیل داده و CRO'],
        ctaPrimary: 'شروع کمپین',
    },
    {
        id: 4,
        href: '#',
        title: 'برندینگ و گرافیک',
        shortDesc: 'خلق هویت بصری متمایز و ماندگار',
        video: 'https://dmhouse.agency/wp-content/uploads/2025/12/tech.mp4',
        tag: 'هویت',
        features: ['طراحی لوگو', 'تدوین برند‌بوک', 'هویت بصری کامل'],
        ctaPrimary: 'مشاهده پکیج',
    },
    {
        id: 5,
        href: '#',
        title: 'شبکه‌های اجتماعی',
        shortDesc: 'تعامل واقعی و رشد حضور برند شما',
        video: 'https://dmhouse.agency/wp-content/uploads/2025/12/tech.mp4',
        tag: 'تعامل',
        features: ['تولید محتوای خلاق', 'تقویم محتوایی', 'مدیریت کمپین و رشد'],
        ctaPrimary: 'مشاهده خدمات',
    }
];

// === 3D TILT CARD ===
const TiltCard = ({ service }) => {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        // Optimization: Disable tilt calculation on small screens
        if (window.innerWidth < 993 || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const rotateY = ((mouseX / width) - 0.5) * 15;
        const rotateX = ((mouseY / height) - 0.5) * -15;
        setRotation({ x: rotateX, y: rotateY });
    };

    return (
        <a
            href={service.href}
            className={`holo-card ${isHovered ? 'is-hovered' : ''}`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setRotation({ x: 0, y: 0 }); }}
            onDragStart={(e) => e.preventDefault()}
            // Reset variables on mobile via CSS, but nice to keep clean here
            style={{ '--rotX': `${rotation.x}deg`, '--rotY': `${rotation.y}deg` }}
        >
            <div className="holo-card__content-box">
                {/* 1. Video Layer */}
                <div className="holo-layer video-layer">
                    <video src={service.video} muted loop autoPlay playsInline />
                    <div className="video-overlay"></div>
                </div>

                {/* 2. Glass/Tag Layer */}
                <div className="holo-layer glass-layer">
                    <div className="glass-reflection"></div>
                    <span className="service-tag">{service.tag}</span>
                </div>

                {/* 3. Info Layer */}
                <div className="holo-layer info-layer">
                    <div className="info-default">
                        <h3>{service.title}</h3>
                        <p className="short-desc">{service.shortDesc}</p>
                    </div>
                    <div className="info-reveal">
                        <ul className="feature-list">
                            {service.features.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                        <span className="cta-btn">
                            {service.ctaPrimary}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                        </span>
                    </div>
                </div>

                {/* 4. Shine Border */}
                <div className="holo-layer border-shine"></div>
            </div>
        </a>
    );
};

export default function ServicesSection() {
    const wrapperRef = useRef(null);
    const layersRef = useRef([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();
            const layers = layersRef.current;

            // === DESKTOP LOGIC (UNCHANGED) ===
            mm.add("(min-width: 993px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                });
                tl.to({}, { duration: 1 });
                layers.forEach((layer, index) => {
                    if (index === 0) return;
                    tl.fromTo(layer,
                        { xPercent: 105, opacity: 1 },
                        { xPercent: 0, opacity: 1, ease: "none", duration: 1 }
                    );
                });
            });
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    const scrollPerCard = 100;
    const numberOfMovingCards = SERVICES_DATA.length - 1;
    const initialBuffer = 500;
    const totalHeight = `${(numberOfMovingCards * scrollPerCard) + initialBuffer + 100}vh`;

    return (
        <section
            id="services"
            className="services-scroll-wrapper"
            ref={wrapperRef}
            style={{ height: totalHeight }} // CSS !important will override this on mobile
        >
            <div className="services-sticky-viewport">
                <div className="holo-ambient-light l1"></div>
                <div className="holo-ambient-light l2"></div>

                <div className="services-container-inner">
                    <header className="head services-head-flex">
                        <div className="title-group-wrapper">
                            <div className="title-group">
                                <span className="en-title">Our Services</span>
                                <h2>
                                    خدمات <span className="highlight">ما</span>
                                </h2>
                            </div>
                        </div>
                    </header>

                    <div className="hologram-stack-container">
                        {SERVICES_DATA.map((service, index) => (
                            <div
                                key={service.id}
                                className="stack-layer"
                                ref={el => layersRef.current[index] = el}
                                style={{ zIndex: index + 1 }}
                            >
                                <TiltCard service={service} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}