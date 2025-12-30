import React, {useState, useEffect} from 'react';
import {HEADER_DATA} from '../config/siteData';
import '../styles/Header.css';

export default function Header() {
    const [showBottomBar, setShowBottomBar] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMobileSub, setActiveMobileSub] = useState(null); // Accordion State
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 1000);

        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setShowBottomBar(currentScroll > 500);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    // Reset accordion when menu closes
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            // Optional: Delay clearing active sub to prevent "snap" closing effect
            const timer = setTimeout(() => setActiveMobileSub(null), 300);
            return () => clearTimeout(timer);
        }
    }, [mobileMenuOpen]);

    const {brand, navigation, cta} = HEADER_DATA;

    const handleLinkClick = () => setMobileMenuOpen(false);

    const toggleMobileSub = (id) => {
        setActiveMobileSub(prev => (prev === id ? null : id));
    };

    return (
        <>
            <header className={`site-header ${showBottomBar ? 'is-hidden' : ''} ${isLoaded ? 'is-loaded' : ''}`}>
                <div className="header-glass">

                    <a href={brand.homeLink} className="header-brand" onClick={handleLinkClick}>
                        <img src={brand.logoUrl} alt={brand.name} className="brand-logo-img"/>
                    </a>

                    <nav className="header-nav-desktop">
                        <ul className="nav-list">
                            {navigation.map((item) => (
                                <li key={item.id} className={`nav-item ${item.hasMegaMenu ? 'has-mega' : ''}`}>
                                    <a href={item.href} className="nav-link">
                                        {item.title}
                                        {item.hasMegaMenu && <span className="arrow-down">
                                             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g
                                                 id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                                                 id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                 stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path
                                                 d="M8 10L12 14L16 10" stroke-width="2"
                                                 stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                        </span>}
                                    </a>

                                    {item.hasMegaMenu && (
                                        <div className="mega-menu-wrapper">
                                            <div className="mega-menu-glass">
                                                {item.columns.map((col, idx) => (
                                                    <div key={idx} className="mega-column">
                                                        <h4 className="column-title" style={{'--accent': col.color}}>
                                                            {col.title}
                                                            <span className="title-line"></span>
                                                        </h4>
                                                        <ul className="mega-list">
                                                            {col.items.map((subItem, subIdx) => (
                                                                <li key={subIdx}>
                                                                    <a href={subItem.href} className="mega-link">
                                                                        <span
                                                                            className="mega-icon">{subItem.icon}</span>
                                                                        {subItem.label}
                                                                        <span className="mega-arrow">←</span>
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

                    <div className="header-actions">
                        <a href={cta.href} className="header-cta primary-btn">
                            <span>{cta.title}</span>
                            <div className="cta-mask">
                                <div className="cta-shine"></div>
                            </div>
                            <span className="cta-icon-phone">📞</span>
                        </a>

                        <button
                            type="button"
                            className={`mobile-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </button>
                    </div>
                </div>
            </header>

            <div
                className={`mobile-menu-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
            >
                <div
                    className="mobile-menu-content"
                    onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing menu
                >
                    <div className="mobile-menu-header">
                        <img src={brand.logoUrl} alt={brand.name} className="mobile-logo"/>
                        <button
                            type="button"
                            className="mobile-close-btn"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="mobile-nav-list">
                        {navigation.map((item) => (
                            <div key={item.id} className="mobile-nav-group">
                                {item.hasMegaMenu ? (
                                    // BUTTON FOR ACCORDION
                                    <button
                                        type="button" // CRITICAL FIX: Ensures it acts as a button, not submit
                                        className={`mobile-main-link toggle-btn ${activeMobileSub === item.id ? 'is-active' : ''}`}
                                        onClick={() => toggleMobileSub(item.id)}
                                    >
                                        <span className="link-text">{item.title}</span>
                                        <span className="mobile-chevron">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g
                                                id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                                                id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path
                                                d="M8 10L12 14L16 10" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                        </span>
                                    </button>
                                ) : (
                                    // ANCHOR FOR DIRECT LINKS
                                    <a
                                        href={item.href}
                                        className="mobile-main-link"
                                        onClick={handleLinkClick}
                                    >
                                        <span className="link-text">{item.title}</span>
                                    </a>
                                )}

                                {item.hasMegaMenu && (
                                    <div className={`mobile-accordion ${activeMobileSub === item.id ? 'is-open' : ''}`}>
                                        <div className="mobile-accordion-inner">
                                            {item.columns && item.columns.map((col, colIdx) => (
                                                <div key={colIdx} className="mobile-sub-group">
                                                    <span className="mobile-group-title" style={{color: col.color}}>
                                                        {col.title}
                                                    </span>
                                                    {col.items.map((subItem, subIdx) => (
                                                        <a
                                                            key={subIdx}
                                                            href={subItem.href}
                                                            className="mobile-sub-item"
                                                            onClick={handleLinkClick}
                                                        >
                                                            {subItem.label}
                                                        </a>
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
                        <a href={cta.href} className="mobile-cta-btn" onClick={handleLinkClick}>
                            {cta.title}
                        </a>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className={`bottom-sticky-wrapper ${showBottomBar ? 'is-visible' : ''}`}>
                <div className="bottom-glass">
                    <a href="#" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                        <img src={brand.logoUrl} alt="Logo" className="bottom-logo"/>
                    </a>
                    <a href={cta.href} className="bottom-cta primary-btn">
                        <span>{cta.title}</span>
                        <div className="cta-mask">
                            <div className="cta-shine"></div>
                        </div>
                        <span style={{fontSize: '1.2em', lineHeight: 1, display: 'flex', alignItems: 'center'}}>
                             <img src="https://dmhouse.agency/wp-content/uploads/2025/12/left-white.svg" alt="Arrow" style={{width: '24px', height: 'auto'}}/>
                        </span>
                    </a>
                </div>
            </div>
        </>
    );
}