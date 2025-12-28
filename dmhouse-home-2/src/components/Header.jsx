import React, { useState, useEffect } from 'react';
import { SITE_DATA } from '../config/siteData';
import '../styles/Header.css';

export default function Header() {
    const [showBottomBar, setShowBottomBar] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show bottom bar after scrolling past 500px (header is out of view)
            setShowBottomBar(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { brand, nav, cta } = SITE_DATA;

    return (
        <>
            {/* 1. TOP HEADER (Scrolls Away) */}
            <header className="site-header">
                <div className="header-glass">
                    <div className="header-brand">
                        <img src={brand.logoUrl} alt={brand.name} className="brand-logo-img" />
                    </div>

                    <nav className={`header-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                        {nav.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                className="nav-link"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="nav-text">{item.title}</span>
                            </a>
                        ))}
                    </nav>

                    <div className="header-actions">
                        <a href={cta.href} className="header-cta">
                            <span>{cta.title}</span>
                            <div className="cta-shine"></div>
                        </a>

                        {/* Mobile Toggle only needs to exist in top header */}
                        <button
                            className="mobile-toggle"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Menu"
                        >
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </header>

            <div className={`bottom-sticky-wrapper ${showBottomBar ? 'is-visible' : ''}`}>
                <div className="bottom-glass">

                    <a href="#" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                        <img src={brand.logoUrl} alt="Logo" className="bottom-logo" />
                    </a>

                    <a href={cta.href} className="bottom-cta">
                        {/* You can add a phone icon here if preferred */}
                        <span>{cta.title}</span>
                        <span style={{ fontSize: '1.2em', lineHeight: 1 }}>
                             <img src="../../public/svg/left-white.svg" alt="Logo" className="bottom-logo" />
                        </span>
                    </a>
                </div>
            </div>
        </>
    );
}