import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { HEADER_DATA } from '../config/siteData';
import gsap from 'gsap';
import ConsultationModal from './ConsultationModal';
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
    const [modalOpen, setModalOpen] = useState(false);

    // Refs
    const preloaderRef = useRef(null);
    const preloaderLogoRef = useRef(null);
    const headerLogoRef = useRef(null);
    const navRef = useRef(null);
    const actionsRef = useRef(null);
    const headerRef = useRef(null);

    // === ANIMATION SEQUENCE ===
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

            gsap.set('.site-header', { y: 0, opacity: 1 });
            gsap.set(headerLogoRef.current, { autoAlpha: 0 });
            gsap.set([navRef.current, actionsRef.current], { autoAlpha: 0, y: -20 });
            gsap.set('.scroll-indicator', { autoAlpha: 0, y: 20 });
            gsap.set('.preloader-ripple', { clipPath: "circle(0% at 50% 50%)" });
            gsap.set('.holographic-field', { scale: 1.5, rotation: 0 });

            tl.to({}, { duration: 2.0 });

            tl.call(() => {
                if (preloaderLogoRef.current && headerLogoRef.current) {
                    const startRect = preloaderLogoRef.current.getBoundingClientRect();
                    const endRect = headerLogoRef.current.getBoundingClientRect();
                    xDiff = (endRect.left + endRect.width / 2) - (startRect.left + startRect.width / 2);
                    yDiff = (endRect.top + endRect.height / 2) - (startRect.top + startRect.height / 2);
                    scaleDiff = endRect.width / startRect.width;
                }
            }, null, "calc");

            tl.addLabel("implode");
            tl.to('.preloader-blob', { scale: 0, opacity: 0, x: 0, y: 0, duration: 0.4, ease: "back.in(2)", stagger: 0 }, "implode");
            tl.to(preloaderLogoRef.current, { scale: 0.85, duration: 0.3, ease: "power2.out" }, "implode");

            tl.addLabel("explode", ">");
            tl.to('.preloader-ripple', { clipPath: "circle(150% at 50% 50%)", duration: 1.6, ease: "power4.inOut" }, "explode");
            tl.to('.holographic-field', { scale: 1, duration: 1.6, ease: "power4.inOut" }, "explode");
            tl.to(preloaderLogoRef.current, { x: () => xDiff, y: () => yDiff, scale: () => scaleDiff, duration: 1.6, ease: "power4.inOut" }, "explode");

            tl.add(() => {
                gsap.set(headerLogoRef.current, { autoAlpha: 1 });
                gsap.set(preloaderLogoRef.current, { autoAlpha: 0 });
                gsap.to(headerLogoRef.current, { keyframes: [{ scale: 1.15, duration: 0.2, ease: "sine.out" }, { scale: 1, duration: 0.8, ease: "elastic.out(1, 0.4)" }] });
            });

            tl.to(preloaderRef.current, { autoAlpha: 0, duration: 0.6 }, "+=0.1");
            tl.to([navRef.current, actionsRef.current], { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" }, "-=0.3");
            tl.to('.scroll-indicator', { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.7");
        }, headerRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setShowBottomBar(currentScroll > 500);
            setShowScrollIndicator(currentScroll < 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const handleOpenConsultation = (e) => {
        e.preventDefault();
        setModalOpen(!modalOpen);
        setMobileMenuOpen(false);
    };

    return (
        <div ref={headerRef}>
            {/* === PRELOADER === */}
            <div className="site-preloader" ref={preloaderRef}>
                <div className="preloader-center">
                    <div className="preloader-ripple">
                        {/* CHANGED: Removed scanline overlay, just the field remains */}
                        <div className="holographic-field"></div>
                    </div>
                    <div className="blobs-container">
                        <div className="preloader-blob blob-1"></div>
                        <div className="preloader-blob blob-2"></div>
                        <div className="preloader-blob blob-3"></div>
                        <div className="preloader-blob blob-4"></div>
                        <div className="preloader-blob blob-5"></div>
                        <div className="preloader-blob blob-6"></div>
                    </div>
                    <img ref={preloaderLogoRef} src={brand.logoUrl} alt="Loading..." className="preloader-logo" style={{ willChange: 'transform' }} />
                </div>
            </div>

            {/* === MAIN HEADER === */}
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
                        <a href={cta.href} className="header-cta primary-btn" onClick={handleOpenConsultation}>
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

            {/* === MOBILE MENU === */}
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
                        <a href={cta.href} className="mobile-cta-btn" onClick={handleOpenConsultation}>{cta.title}</a>
                    </div>
                </div>
            </div>

            {/* === BOTTOM STICKY BAR === */}
            <div className={`bottom-sticky-wrapper ${showBottomBar ? 'is-visible' : ''}`}>
                <div className="bottom-glass">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <img src={brand.logoUrl} alt="Logo" className="bottom-logo" />
                    </a>

                    <div className="cta-anchor-wrapper" style={{ position: 'relative' }}>
                        <ConsultationModal
                            isOpen={modalOpen}
                            onClose={() => setModalOpen(false)}
                        />

                        <a href={cta.href} className="bottom-cta primary-btn" onClick={handleOpenConsultation}>
                            <span>{cta.title}</span>
                            <div className="cta-mask"><div className="cta-shine"></div></div>
                            <span className="bottom-cta-icon"><img src="https://dmhouse.agency/wp-content/uploads/2025/12/left-white.svg" alt="Arrow" style={{ width: '24px', height: 'auto' }} /></span>
                        </a>
                    </div>
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