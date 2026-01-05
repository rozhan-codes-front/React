import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { HEADER_DATA } from '../config/siteData';
import gsap from 'gsap';
import '../styles/Header.css';

// === CONFIGURATION ===
// Adjust the video widget content here
const VIDEO_WIDGET_DATA = {
    show: true,
    videoUrl: 'https://dmhouse.agency/wp-content/uploads/2025/12/tech.mp4', // Loop video URL
    poster: 'https://dmhouse.agency/wp-content/uploads/2023/10/video-poster.jpg',
    text: 'به راهنمایی نیاز دارید؟',
    link: '#consultation'
};

export default function Header() {
    const [showBottomBar, setShowBottomBar] = useState(false);
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
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    window.dispatchEvent(new CustomEvent('intro-complete'));
                    setIsLoaded(true);
                }
            });

            // 1. Initial State
            gsap.set(headerLogoRef.current, { autoAlpha: 0 });
            gsap.set([navRef.current, actionsRef.current], {
                autoAlpha: 0,
                x: 60 // Start slightly offset
            });

            // 2. Preloader Phase
            tl.to({}, { duration: 2.5 });

            // 3. Fade Out Preloader
            tl.to('.preloader-blob', { opacity: 0, duration: 0.5, scale: 0.5 }, "fade");
            tl.to(preloaderRef.current, { backgroundColor: 'transparent', duration: 0.8, ease: "power2.inOut" }, "fade");
            gsap.to('.site-header', { opacity: 1, y: 0, duration: 0.1 }, "fade");

            // 4. Move Logo from Center to Header
            tl.add(() => {
                const startState = preloaderLogoRef.current.getBoundingClientRect();
                const endState = headerLogoRef.current.getBoundingClientRect();
                const xDiff = endState.left - startState.left;
                const yDiff = endState.top - startState.top;
                const scaleDiff = endState.width / startState.width;

                gsap.to(preloaderLogoRef.current, {
                    x: xDiff,
                    y: yDiff,
                    scale: scaleDiff,
                    duration: 1.2,
                    ease: "power4.inOut",
                    onComplete: () => {
                        gsap.set(headerLogoRef.current, { autoAlpha: 1 });
                        gsap.set(preloaderRef.current, { display: 'none' });
                    }
                });
            }, "move");

            // 5. Reveal Nav & Actions
            tl.to([navRef.current, actionsRef.current], {
                autoAlpha: 1,
                x: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out"
            }, "move+=1.2");

        }, headerRef);

        return () => ctx.revert();
    }, []);

    // === SCROLL LOGIC ===
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setShowBottomBar(currentScroll > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // === MOBILE MENU LOGIC ===
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
                    <div className="preloader-blob blob-1"></div>
                    <div className="preloader-blob blob-2"></div>
                    <div className="preloader-blob blob-3"></div>
                    <img ref={preloaderLogoRef} src={brand.logoUrl} alt="Loading..." className="preloader-logo" />
                </div>
            </div>

            {/* === MAIN HEADER (Top) === */}
            <header className={`site-header ${showBottomBar ? 'is-hidden' : ''} ${isLoaded ? 'is-loaded' : ''}`}>
                <div className="header-glass">
                    {/* Logo */}
                    <a href={brand.homeLink} className="header-brand" onClick={handleLinkClick}>
                        <img ref={headerLogoRef} src={brand.logoUrl} alt={brand.name} className="brand-logo-img" />
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="header-nav-desktop" ref={navRef}>
                        <ul className="nav-list">
                            {navigation.map((item) => (
                                <li key={item.id} className={`nav-item ${item.hasMegaMenu ? 'has-mega' : ''}`}>
                                    <a href={item.href} className="nav-link">
                                        {item.title}
                                        {item.hasMegaMenu && <span className="arrow-down">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                        </span>}
                                    </a>
                                    {/* Mega Menu */}
                                    {item.hasMegaMenu && (
                                        <div className="mega-menu-wrapper">
                                            <div className="mega-menu-glass">
                                                {item.columns.map((col, idx) => (
                                                    <div key={idx} className="mega-column">
                                                        <h4 className="column-title" style={{ '--accent': col.color }}>
                                                            {col.title} <span className="title-line"></span>
                                                        </h4>
                                                        <ul className="mega-list">
                                                            {col.items.map((subItem, subIdx) => (
                                                                <li key={subIdx}>
                                                                    <a href={subItem.href} className="mega-link">
                                                                        <span className="mega-icon">{subItem.icon}</span>
                                                                        {subItem.label} <span className="mega-arrow">←</span>
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

                    {/* Actions (CTA + Mobile Toggle) */}
                    <div className="header-actions" ref={actionsRef}>
                        <a href={cta.href} className="header-cta primary-btn">
                            <span>{cta.title}</span>
                            <div className="cta-mask">
                                <div className="cta-shine"></div>
                            </div>
                            <span className="cta-icon-phone">📞</span>
                        </a>

                        <button type="button" className={`mobile-toggle ${mobileMenuOpen ? 'is-active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                            <span className="bar"></span><span className="bar"></span><span className="bar"></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* === MOBILE MENU OVERLAY === */}
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

            {/* === BOTTOM STICKY BAR + VIDEO WIDGET === */}
            <div className={`bottom-sticky-wrapper ${showBottomBar ? 'is-visible' : ''}`}>

                {/* 1. Glass Bar: Logo + CTA (Preserved) */}
                <div className="bottom-glass">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <img src={brand.logoUrl} alt="Logo" className="bottom-logo" />
                    </a>
                    <a href={cta.href} className="bottom-cta primary-btn">
                        <span>{cta.title}</span>
                        <div className="cta-mask"><div className="cta-shine"></div></div>
                        <span className="bottom-cta-icon">
                            <img src="https://dmhouse.agency/wp-content/uploads/2025/12/left-white.svg" alt="Arrow" style={{ width: '24px', height: 'auto' }} />
                        </span>
                    </a>
                </div>

                {/* 2. Video Widget (Right Side) */}
                {VIDEO_WIDGET_DATA.show && (
                    <a href={VIDEO_WIDGET_DATA.link} className="bottom-video-widget">
                        <div className="b-video-circle">
                            <video
                                src={VIDEO_WIDGET_DATA.videoUrl}
                                poster={VIDEO_WIDGET_DATA.poster}
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </div>
                        {/* Play Button Icon (Overlapping) */}
                        <div className="b-video-play-btn">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                        {/* Text Bubble */}
                        <div className="b-video-text">
                            {VIDEO_WIDGET_DATA.text}
                        </div>
                    </a>
                )}
            </div>
        </div>
    );
}