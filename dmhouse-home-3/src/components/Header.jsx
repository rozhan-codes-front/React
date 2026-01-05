import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { HEADER_DATA } from '../config/siteData';
import gsap from 'gsap';
import '../styles/Header.css';

// === CONFIGURATION ===
const VIDEO_WIDGET_DATA = {
    show: true,
    videoUrl: 'https://dmhouse.agency/wp-content/uploads/2025/12/tech.mp4',
    poster: 'https://dmhouse.agency/wp-content/uploads/2023/10/video-poster.jpg',
    text: 'به راهنمایی نیاز دارید؟',
    link: '#consultation'
};

export default function Header() {
    const [showBottomBar, setShowBottomBar] = useState(false);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMobileSub, setActiveMobileSub] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Animation Refs
    const preloaderRef = useRef(null);
    const preloaderLogoRef = useRef(null);
    const headerLogoRef = useRef(null);
    const navRef = useRef(null);
    const actionsRef = useRef(null);
    const headerRef = useRef(null);

    // === INTRO ANIMATION SEQUENCE ===
    // === INTRO ANIMATION SEQUENCE ===
    // === INTRO ANIMATION SEQUENCE ===
    useLayoutEffect(() => {
        let xDiff = 0, yDiff = 0, scaleDiff = 1;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    window.dispatchEvent(new CustomEvent('intro-complete'));
                    setIsLoaded(true);
                    gsap.set(preloaderRef.current, { display: 'none' });
                }
            });

            // 1. Initial State
            // FIX: Force header to y:0 immediately so calculations are correct (removes the jump)
            gsap.set('.site-header', { y: 0 });
            gsap.set(headerLogoRef.current, { autoAlpha: 0 });
            gsap.set([navRef.current, actionsRef.current], { autoAlpha: 0, x: 60 });
            gsap.set('.scroll-indicator', { autoAlpha: 0, y: 20 });

            // 2. Preloader Wait Phase
            tl.to({}, { duration: 2.5 });

            // --- CALCULATION STEP ---
            // Now that header is at y:0, this will calculate the REAL destination
            tl.call(() => {
                if (preloaderLogoRef.current && headerLogoRef.current) {
                    const startRect = preloaderLogoRef.current.getBoundingClientRect();
                    const endRect = headerLogoRef.current.getBoundingClientRect();

                    xDiff = (endRect.left + endRect.width / 2) - (startRect.left + startRect.width / 2);
                    yDiff = (endRect.top + endRect.height / 2) - (startRect.top + startRect.height / 2);
                    scaleDiff = endRect.width / startRect.width;
                }
            }, null, "colorPhase");

            // 3. COLOR PHASE (Ripple)
            tl.to('.preloader-blob', { opacity: 0, duration: 0.5, scale: 0.5 }, "colorPhase");
            tl.to('.preloader-ripple', {
                scale: 150,
                duration: 1.2,
                ease: "expo.inOut"
            }, "colorPhase");

            // Only animate opacity now (y is already 0)
            gsap.to('.site-header', { opacity: 1, duration: 0.1 }, "colorPhase");

            // 4. MOVE PHASE
            tl.addLabel("moveStart", "colorPhase+=0.5");

            tl.to(preloaderLogoRef.current, {
                x: () => xDiff,
                y: () => yDiff,
                scale: () => scaleDiff,
                rotation: 0.01,
                transformOrigin: "50% 50%",
                duration: 1.0,
                ease: "power4.inOut"
            }, "moveStart");

            // 5. HANDOFF & POP
            tl.add(() => {
                gsap.set(headerLogoRef.current, { autoAlpha: 1 });
                gsap.set(preloaderLogoRef.current, { autoAlpha: 0 });
                gsap.to(headerLogoRef.current, {
                    keyframes: [
                        { scale: 1.15, duration: 0.15, ease: "sine.out" },
                        { scale: 1, duration: 0.8, ease: "elastic.out(1, 0.3)" }
                    ]
                });
            });

            // 6. REVEAL BACKGROUND
            tl.to('.preloader-ripple', {
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut"
            }, "moveStart+=0.5");

            tl.to(preloaderRef.current, { backgroundColor: 'transparent' }, "moveStart+=0.5");

            // 7. Nav & Actions Entry
            tl.to([navRef.current, actionsRef.current], {
                autoAlpha: 1,
                x: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out"
            }, "-=0.5");

            tl.to('.scroll-indicator', {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=1.0");

        }, headerRef);

        return () => ctx.revert();
    }, []);

    // ... (SCROLL LOGIC - UNCHANGED) ...
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setShowBottomBar(currentScroll > 500);
            setShowScrollIndicator(currentScroll < 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ... (MOBILE MENU LOGIC - UNCHANGED) ...
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            const timer = setTimeout(() => setActiveMobileSub(null), 300);
            return () => clearTimeout(timer);
        }
    }, [mobileMenuOpen]);

    const { brand, navigation, cta } = HEADER_DATA;
    const handleLinkClick = () => setMobileMenuOpen(false);
    const toggleMobileSub = (id) => setActiveMobileSub(prev => (prev === id ? null : id));

    return (
        <div ref={headerRef}>
            {/* === PRELOADER === */}
            <div className="site-preloader" ref={preloaderRef}>
                <div className="preloader-center">
                    {/* ADDED RIPPLE ELEMENT HERE */}
                    <div className="preloader-ripple"></div>

                    <div className="preloader-blob blob-1"></div>
                    <div className="preloader-blob blob-2"></div>
                    <div className="preloader-blob blob-3"></div>
                    <img ref={preloaderLogoRef} src={brand.logoUrl} alt="Loading..." className="preloader-logo" style={{ willChange: 'transform' }} />
                </div>
            </div>

            {/* === MAIN HEADER (Rest is Unchanged) === */}
            <header className={`site-header ${showBottomBar ? 'is-hidden' : ''} ${isLoaded ? 'is-loaded' : ''}`}>
                <div className="header-glass">
                    <nav className="header-nav-desktop" ref={navRef}>
                        <ul className="nav-list">
                            {navigation.map((item) => (
                                <li key={item.id} className={`nav-item ${item.hasMegaMenu ? 'has-mega' : ''}`}>
                                    <a href={item.href} className="nav-link">
                                        {item.title}
                                        {item.hasMegaMenu && <span className="arrow-down"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>}
                                    </a>
                                    {item.hasMegaMenu && (
                                        <div className="mega-menu-wrapper">
                                            <div className="mega-menu-glass">
                                                {item.columns.map((col, idx) => (
                                                    <div key={idx} className="mega-column">
                                                        <h4 className="column-title" style={{ '--accent': col.color }}>{col.title} <span className="title-line"></span></h4>
                                                        <ul className="mega-list">
                                                            {col.items.map((subItem, subIdx) => (
                                                                <li key={subIdx}>
                                                                    <a href={subItem.href} className="mega-link">
                                                                        <span className="mega-icon">{subItem.icon}</span>{subItem.label} <span className="mega-arrow">←</span>
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                                <div className="mega-decoration"></div>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <a href={brand.homeLink} className="header-brand" onClick={handleLinkClick}>
                        <img ref={headerLogoRef} src={brand.logoUrl} alt={brand.name} className="brand-logo-img" style={{ transformOrigin: 'center center' }} />
                    </a>

                    <div className="header-actions" ref={actionsRef}>
                        <a href={cta.href} className="header-cta primary-btn">
                            <span>{cta.title}</span>
                            <div className="cta-mask"><div className="cta-shine"></div></div>
                            <span className="cta-icon-phone">📞</span>
                        </a>
                        <button type="button" className={`mobile-toggle ${mobileMenuOpen ? 'is-active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu"><span className="bar"></span><span className="bar"></span><span className="bar"></span></button>
                    </div>
                </div>
            </header>

            {/* === SCROLL INDICATOR === */}
            <div className={`scroll-indicator ${showScrollIndicator ? 'is-visible' : ''}`} onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                <span className="scroll-text">اسکرول کنید</span>
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
            </div>

            {/* === MOBILE MENU (Unchanged) === */}
            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'is-open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
                    <div className="mobile-menu-header">
                        <img src={brand.logoUrl} alt={brand.name} className="mobile-logo" />
                        <button type="button" className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>✕</button>
                    </div>
                    <nav className="mobile-nav-list">
                        {navigation.map((item) => (
                            <div key={item.id} className="mobile-nav-group">
                                {item.hasMegaMenu ? (
                                    <button type="button" className={`mobile-main-link toggle-btn ${activeMobileSub === item.id ? 'is-active' : ''}`} onClick={() => toggleMobileSub(item.id)}>
                                        <span className="link-text">{item.title}</span>
                                        <span className="mobile-chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 10L12 14L16 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                    </button>
                                ) : (
                                    <a href={item.href} className="mobile-main-link" onClick={handleLinkClick}><span className="link-text">{item.title}</span></a>
                                )}
                                {item.hasMegaMenu && (
                                    <div className={`mobile-accordion ${activeMobileSub === item.id ? 'is-open' : ''}`}>
                                        <div className="mobile-accordion-inner">
                                            {item.columns && item.columns.map((col, colIdx) => (
                                                <div key={colIdx} className="mobile-sub-group">
                                                    <span className="mobile-group-title" style={{ color: col.color }}>{col.title}</span>
                                                    {col.items.map((subItem, subIdx) => (
                                                        <a key={subIdx} href={subItem.href} className="mobile-sub-item" onClick={handleLinkClick}>{subItem.label}</a>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                    <div className="mobile-menu-footer">
                        <a href={cta.href} className="mobile-cta-btn" onClick={handleLinkClick}>{cta.title}</a>
                    </div>
                </div>
            </div>

            {/* === BOTTOM BAR (Unchanged) === */}
            <div className={`bottom-sticky-wrapper ${showBottomBar ? 'is-visible' : ''}`}>
                <div className="bottom-glass">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <img src={brand.logoUrl} alt="Logo" className="bottom-logo" />
                    </a>
                    <a href={cta.href} className="bottom-cta primary-btn">
                        <span>{cta.title}</span>
                        <div className="cta-mask"><div className="cta-shine"></div></div>
                        <span className="bottom-cta-icon"><img src="https://dmhouse.agency/wp-content/uploads/2025/12/left-white.svg" alt="Arrow" style={{ width: '24px', height: 'auto' }} /></span>
                    </a>
                </div>
                {VIDEO_WIDGET_DATA.show && (
                    <a href={VIDEO_WIDGET_DATA.link} className="bottom-video-widget">
                        <div className="b-video-circle"><video src={VIDEO_WIDGET_DATA.videoUrl} poster={VIDEO_WIDGET_DATA.poster} autoPlay loop muted playsInline /></div>
                        <div className="b-video-play-btn"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></div>
                        <div className="b-video-text">{VIDEO_WIDGET_DATA.text}</div>
                    </a>
                )}
            </div>
        </div>
    );
}