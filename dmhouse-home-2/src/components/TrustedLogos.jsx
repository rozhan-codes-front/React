import React from 'react';

// 1. Define your logos once
const RAW_LOGOS = [
    "https://haghanigold.com/wp-content/uploads/2024/11/cropped-haghani-logo.png",
    "https://dmhouse.agency/wp-content/uploads/2022/10/JBH.jpg",
    "https://dmhouse.agency/wp-content/uploads/2024/03/logo-14-min.png",
    "https://dmhouse.agency/wp-content/uploads/2024/01/cropped-ieltsmix-fav-icon.png",
    "https://dmhouse.agency/wp-content/uploads/2023/05/%D8%A7%D8%B1%D8%B4%D8%AF-%D9%BE%DB%8C.jpg"
];

// 2. Create a "Batch" that is definitely wider than any screen (repeat 4 times)
const LOGO_BATCH = [...RAW_LOGOS, ...RAW_LOGOS, ...RAW_LOGOS, ...RAW_LOGOS];

export default function TrustedLogos() {

    // Helper to render the items
    const renderLogoTrack = () => (
        <>
            {LOGO_BATCH.map((src, index) => (
                <div className="logoItem" key={`set1-${index}`}>
                    <img src={src} alt="Brand Logo" />
                </div>
            ))}
            {LOGO_BATCH.map((src, index) => (
                <div className="logoItem" key={`set2-${index}`}>
                    <img src={src} alt="Brand Logo" />
                </div>
            ))}
        </>
    );

    return (
        <section className="trustedLogos">
            <header className="servicesStack__header">
                <h2 className="servicesStack__title">
                    همکاری ها
                </h2>
                <p className="servicesStack__subtitle">
                    برندهایی که به ما اعتماد کرده اند
                </p>
            </header>

            <div className="logoStage">
                <div className="logoStage__center">
                    <img src="https://dmhouse.agency/wp-content/uploads/2024/08/team1-min-min.png" alt="DMHouse" />
                </div>

                {/* Row 1: Moves Left */}
                <div className="logoMarquee" dir="ltr">
                    <div className="logoMarquee__track">
                        {renderLogoTrack()}
                    </div>
                </div>

                {/* Row 2: Moves Right (Reverse) */}
                <div className="logoMarquee logoMarquee--reverse" dir="ltr">
                    <div className="logoMarquee__track">
                        {renderLogoTrack()}
                    </div>
                </div>
            </div>
        </section>
    );
}