import React from 'react';
import { SITE_DATA } from '../config/siteData';
import '../styles/Footer.css';

export default function Footer() {
    const { footer, brand } = SITE_DATA;

    return (
        <footer className="site-footer">

            <div className="footer-float-card">
                <div className="float-card-content">
                    <div className="float-text">
                        <h3>{footer.consultation.title}</h3>
                        <p>{footer.consultation.subtitle}</p>
                    </div>

                    <form className="float-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="tel" placeholder={footer.consultation.placeholder} />
                        <button type="submit" className="float-btn">
                            ارسال
                        </button>
                    </form>
                </div>

                <div className="float-card-image">
                    <img src={footer.consultation.image} alt="Consultation" />
                </div>
            </div>

            <div className="footer-main">
                <div className="footer-grid page-container">

                    {/* Brand Column */}
                    <div className="footer-brand-col">
                        {/* UPDATED: Image Logo instead of H2 Text */}
                        <div className="footer-logo-wrapper">
                            <img src={brand.logoUrl} alt={brand.name} className="footer-logo-img" />
                        </div>

                        <p className="footer-desc">{footer.description}</p>

                        <div className="footer-socials">
                            {footer.socials.map((s) => (
                                <a key={s.id} href={s.href} className={`social-btn is-${s.icon}`}></a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info Column */}
                    <div className="footer-contact-col">
                        {footer.contact.map((c) => (
                            <div key={c.id} className="contact-pill">
                                <span className="cp-icon">{c.icon}</span>
                                <div className="cp-data">
                                    <span className="cp-label">{c.label}</span>
                                    <span className="cp-val">{c.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dynamic Links Columns */}
                    <div className="footer-links-col">
                        {footer.columns.map((col) => (
                            <div key={col.id} className="link-group">
                                <h4 className="link-head">{col.title}</h4>
                                <ul>
                                    {col.links.map((link, idx) => (
                                        <li key={idx}>
                                            <a href={link.href}>{link.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="footer-bottom">
                    © 2024 DMHouse Agency. All rights reserved.
                </div>
            </div>
        </footer>
    );
}