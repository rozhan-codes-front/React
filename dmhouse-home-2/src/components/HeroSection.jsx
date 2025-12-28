import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 1. Zoom the image in slightly on load
            tl.fromTo(".heroVisual__bg",
                { scale: 1.1, filter: "brightness(0.4)" },
                { scale: 1, filter: "brightness(0.6)", duration: 2, ease: "power2.out" }
            )
                // 2. Staggered Text Reveal
                .fromTo(".hero-badge",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6 },
                    "-=1.5"
                )
                .fromTo(".hero-title",
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.4"
                )
                .fromTo(".hero-subtitle",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.6"
                );

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="heroVisual" ref={heroRef}>
            {/* 1. Animated Background Layer */}
            <div className="heroVisual__bg"></div>

            {/* 2. Glass Content Card */}
            <div className="heroVisual__content">
                <div className="heroVisual__glass">

                    {/* Badge (The 'p' tag moved up for hierarchy) */}
                    <div className="hero-badge">
                        <span className="badge-icon">★</span>
                        <p>بیش از 10 سال سابقه و تخصص</p>
                    </div>

                    {/* Main Title (h2) */}
                    <h2 className="hero-title">
                        توسعه کسب و کار شما با <br />
                        <span className="text-gradient">استراتژی‌های داده‌محور و شفاف</span>
                    </h2>

                    {/* Subtitle (h3) */}
                    <h3 className="hero-subtitle">
                        توسعه کسب و کار مبتنی بر داده‌ها و لذت نتیجه
                    </h3>

                </div>
            </div>
        </section>
    );
}