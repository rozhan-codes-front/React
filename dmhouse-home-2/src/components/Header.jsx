import React, { useState, useEffect } from 'react';
import { SITE_DATA } from '../config/siteData';
import '../styles/Header.css';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { brand, nav, cta } = SITE_DATA;

    return (
        <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
            <div className="header-glass">

                {/* UPDATED: Image Logo */}
                <div className="header-brand">
                    <img src={brand.logoUrl} alt={brand.name} className="brand-logo-img" />
                    {/* Optional: Keep text if you want it next to logo, otherwise remove */}
                    {/* <span className="brand-text">{brand.name}</span> */}
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
    );
}