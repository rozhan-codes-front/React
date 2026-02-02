import React from 'react';
import '../styles/TrustedLogos.css';

// 1. Define your logos
const RAW_LOGOS = [
    "https://haghanigold.com/wp-content/uploads/2024/11/cropped-haghani-logo.png",
    "https://dmhouse.agency/wp-content/uploads/2022/10/JBH.jpg",
    "https://dmhouse.agency/wp-content/uploads/2024/03/logo-14-min.png",
    "https://dmhouse.agency/wp-content/uploads/2024/01/cropped-ieltsmix-fav-icon.png",
    "https://dmhouse.agency/wp-content/uploads/2023/05/%D8%A7%D8%B1%D8%B4%D8%AF-%D9%BE%DB%8C.jpg"
];

const LOGO_BATCH = [...RAW_LOGOS, ...RAW_LOGOS, ...RAW_LOGOS, ...RAW_LOGOS, ...RAW_LOGOS, ...RAW_LOGOS];

export default function TrustedLogos() {

    return (
        <section className="trustedLogos">
            <header className="head">
                <div className="title-group">
                    <span className="en-title">Our Partners</span>
                    <h2>
                        همکاری های <span className="highlight">ما</span>
                    </h2>
                </div>
                <p className="subtitle">
                    برندهایی که به ما اعتماد کرده اند
                </p>
            </header>

            {/* 3D Perspective Stage */}
            <div className="logoStage">

                {/* Row 1: Tilted Left/Forward */}
                <div className="logoStream stream-top" dir="ltr">
                    <div className="logoStream__track">
                        {LOGO_BATCH.map((src, index) => (
                            <div className="logoCard" key={`top-${index}`}>
                                <div className="logoCard__glass"></div>
                                <div className="logoCard__content">
                                    <img src={src} alt="Partner Logo" loading="lazy" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2: Tilted Right/Backward */}
                <div className="logoStream stream-bottom" dir="ltr">
                    <div className="logoStream__track">
                        {LOGO_BATCH.map((src, index) => (
                            <div className="logoCard" key={`bottom-${index}`}>
                                <div className="logoCard__glass"></div>
                                <div className="logoCard__content">
                                    <img src={src} alt="Partner Logo" loading="lazy" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Background Decoration */}
            <div className="trusted-glow"></div>
        </section>
    );
}