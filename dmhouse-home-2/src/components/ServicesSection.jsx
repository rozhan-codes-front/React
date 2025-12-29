import React, { useEffect, useRef } from 'react';

// === DATA CONFIGURATION ===
const SERVICES_DATA = [
    {
        id: 1,
        href: '/seo',
        title: 'سئو',
        shortDesc: 'افزایش ترافیک هدفمند، رشد پایدار و نتایج قابل اندازه‌گیری',
        video: '/tech.mp4',
        tag: 'سرویس تخصصی',
        hoverTitle: 'سئو و رشد ارگانیک',
        // hoverDesc removed from usage but kept in data if needed later
        hoverDesc: 'بهینه‌سازی ساختار سایت، تولید محتوای هدفمند و افزایش جایگاه در نتایج گوگل با تمرکز بر جذب لید و فروش واقعی.',
        features: ['تحلیل رقبا و کیورد ریسرچ', 'سئو تکنیکال و بهبود سرعت', 'استراتژی محتوای بلندمدت'],
        ctaPrimary: 'مشاهده جزئیات سرویس',
        ctaSecondary: 'مشاوره رایگان'
    },
    {
        id: 2,
        href: '/web-design',
        title: 'طراحی سایت',
        shortDesc: 'طراحی تجربه کاربری مدرن، سریع و تبدیل‌محور',
        video: '/tech.mp4',
        tag: 'سرویس تخصصی',
        hoverTitle: 'طراحی سایت مدرن',
        hoverDesc: 'طراحی و توسعه وب‌سایت‌های سریع، مقیاس‌پذیر و کاربرمحور با تمرکز بر تجربه کاربری و افزایش نرخ تبدیل.',
        features: ['UI/UX اختصاصی و حرفه‌ای', 'طراحی ریسپانسیو و بهینه', 'بهینه‌سازی برای سئو و سرعت'],
        ctaPrimary: 'مشاهده جزئیات سرویس',
        ctaSecondary: 'دریافت مشاوره'
    },
    {
        id: 3,
        href: '/digital-marketing',
        title: 'دیجیتال مارکتینگ و ادز',
        shortDesc: 'کمپین‌های داده‌محور برای جذب لید و فروش بیشتر',
        video: '/tech.mp4',
        tag: 'سرویس رشد',
        hoverTitle: 'دیجیتال مارکتینگ و تبلیغات',
        hoverDesc: 'اجرای کمپین‌های تبلیغاتی هدفمند و داده‌محور برای جذب لید باکیفیت و افزایش فروش قابل اندازه‌گیری.',
        features: ['تبلیغات گوگل و شبکه‌های اجتماعی', 'تحلیل داده و بهینه‌سازی کمپین', 'استراتژی قیف فروش'],
        ctaPrimary: 'شروع کمپین',
        ctaSecondary: 'مشاوره تبلیغات'
    },
    {
        id: 4,
        href: '/branding',
        title: 'گرافیک و برندینگ',
        shortDesc: 'هویت بصری منسجم برای ماندگاری در ذهن مخاطب',
        video: '/tech.mp4',
        tag: 'هویت بصری',
        hoverTitle: 'گرافیک و برندینگ',
        hoverDesc: 'خلق هویت بصری منسجم و متمایز برای ایجاد اعتماد، تمایز برند و ماندگاری در ذهن مخاطب.',
        features: ['طراحی لوگو و سیستم هویت برند', 'راهنمای برند (Brand Book)', 'طراحی گرافیک دیجیتال و چاپی'],
        ctaPrimary: 'مشاهده نمونه‌کارها',
        ctaSecondary: 'شروع برندینگ'
    },
    {
        id: 5,
        href: '/social-media',
        title: 'شبکه‌های اجتماعی',
        shortDesc: 'ساخت ارتباط واقعی با مخاطب و رشد ارگانیک',
        video: '/tech.mp4',
        tag: 'مدیریت ارتباط',
        hoverTitle: 'شبکه‌های اجتماعی',
        hoverDesc: 'مدیریت و رشد حضور برند در شبکه‌های اجتماعی با تولید محتوای هدفمند و تعامل واقعی با مخاطبان.',
        features: ['استراتژی محتوا و تقویم انتشار', 'طراحی پست و ویدیو', 'افزایش تعامل و رشد ارگانیک'],
        ctaPrimary: 'مشاهده پلن‌ها',
        ctaSecondary: 'مشاوره شبکه اجتماعی'
    }
];

// Animation Helper
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

export default function ServicesSection() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // --- 1. Video Autoplay Logic ---
        const videos = container.querySelectorAll('.serviceVideo');
        const handleVideoPlay = () => {
            videos.forEach(video => {
                video.muted = true;
                video.play().catch(() => {});
                video.closest('.serviceStackCard')?.addEventListener('mouseenter', () => video.play());
            });
        };
        handleVideoPlay();

        // --- 2. Stack Scroll Animation Logic ---
        const cards = Array.from(container.querySelectorAll('.serviceStackCard'));
        let animId;

        const updateStackScroll = () => {
            const viewportHeight = window.innerHeight;

            cards.forEach((card, index) => {
                const nextCard = cards[index + 1];

                if (!nextCard) {
                    card.style.transform = '';
                    card.style.opacity = '';
                    card.style.filter = '';
                    return;
                }

                const nextRect = nextCard.getBoundingClientRect();
                const triggerStart = viewportHeight * 0.9;
                const triggerEnd = viewportHeight * 0.1;

                let progress = 0;

                if (nextRect.top < triggerStart) {
                    progress = (triggerStart - nextRect.top) / (triggerStart - triggerEnd);
                    progress = Math.min(Math.max(progress, 0), 1);
                }

                if (progress > 0) {
                    const eased = easeOutCubic(progress);
                    const translateY = -eased * 48;
                    const scale = 1 - eased * 0.08;
                    const opacity = 1 - eased * 0.12;
                    const blur = eased * 1.8;

                    card.style.transform = `translateY(${translateY}px) scale(${scale})`;
                    card.style.opacity = opacity.toFixed(3);
                    card.style.filter = `blur(${blur.toFixed(2)}px)`;
                } else {
                    card.style.transform = '';
                    card.style.opacity = '';
                    card.style.filter = '';
                }
            });

            animId = requestAnimationFrame(updateStackScroll);
        };

        animId = requestAnimationFrame(updateStackScroll);

        return () => {
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <section id="services" className="servicesStack page-container" ref={containerRef}>
            <header className="head">
                <h2>
                    <span className="highlight">خدمات</span> ما
                </h2>
                <p className="subtitle">
                    هر سرویس، یک مسیر مشخص برای رشد کسب‌وکار شما
                </p>
            </header>

            <div className="servicesStack__list">
                {SERVICES_DATA.map((service) => (
                    <a key={service.id} href={service.href} className="serviceStackCard">
                        {/* Default State */}
                        <div className="serviceStackCard__inner">
                            <h3>{service.title}</h3>
                            <p>{service.shortDesc}</p>
                            <span>مشاهده سرویس</span>
                        </div>

                        {/* Background Video */}
                        <video
                            className="serviceVideo"
                            muted
                            loop
                            playsInline
                            preload="auto"
                        >
                            <source src={service.video} type="video/mp4" />
                        </video>

                        {/* Hover Overlay State */}
                        <div className="serviceStackCard__hover">
                            <div className="serviceStackCard__hoverInner">
                                <span className="serviceStackCard__tag">{service.tag}</span>

                                <h4 className="serviceStackCard__hoverTitle">
                                    {service.hoverTitle}
                                </h4>

                                {/* REMOVED <p className="serviceStackCard__hoverDesc"> here */}

                                <ul className="serviceStackCard__features">
                                    {service.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>

                                <div className="serviceStackCard__actions">
                                    <span className="serviceStackCard__ctaPrimary">{service.ctaPrimary}</span>
                                    <span className="serviceStackCard__ctaSecondary">{service.ctaSecondary}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}