import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/OurTeam.css';

gsap.registerPlugin(ScrollTrigger);

export default function OurTeam() {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const image = imageRef.current;
        const content = contentRef.current;
        const card = cardRef.current;

        if (!section || !image || !content || !card) return;

        // Use matchMedia to handle responsive animations
        const mm = gsap.matchMedia();

        // === DESKTOP ANIMATIONS ( > 992px ) ===
        mm.add("(min-width: 993px)", () => {

            // 1. PARALLAX IMAGE (Only on Desktop)
            gsap.fromTo(image,
                { y: '-15%' },
                {
                    y: '15%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );

            // 2. TEXT REVEAL
            gsap.fromTo(content,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // 3. 3D MOUSE TILT
            const xTo = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
            const yTo = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });

            const onMouseMove = (e) => {
                const { clientX, clientY } = e;
                const { left, top, width, height } = section.getBoundingClientRect();
                const xPos = (clientX - left) / width - 0.5;
                const yPos = (clientY - top) / height - 0.5;
                xTo(xPos * 15);
                yTo(-yPos * 15);
            };

            const onMouseLeave = () => {
                xTo(0);
                yTo(0);
            };

            section.addEventListener('mousemove', onMouseMove);
            section.addEventListener('mouseleave', onMouseLeave);

            return () => {
                section.removeEventListener('mousemove', onMouseMove);
                section.removeEventListener('mouseleave', onMouseLeave);
            };
        });

        // === MOBILE CLEANUP ( <= 992px ) ===
        mm.add("(max-width: 992px)", () => {
            // Ensure properties are reset if resizing window
            gsap.set(image, { y: 0 });
            gsap.set(content, { y: 0, opacity: 1 });
            gsap.set(card, { rotationY: 0, rotationX: 0 });
        });

        return () => mm.revert();

    }, []);

    return (
        <section className="our-team-section-wrapper" >
            <header className="head">
                <h2 className="ceo-heading">
                    <span className="highlight">تیم</span> ما
                </h2>
                <p className="subtitle">هر سرویس، یک مسیر مشخص برای رشد کسب‌وکار شما</p>
            </header>
            <div className="our-team-section" ref={sectionRef}>
                <div className="team-visual">
                    <div className="team-image-wrapper">
                        <img
                            ref={imageRef}
                            src="https://dmhouse.agency/wp-content/uploads/2025/12/ourTeam.jpg"
                            alt="DMHouse Team"
                            className="team-img"
                        />
                    </div>
                    <div className="team-overlay-gradient"></div>
                </div>
                <div className="team-content-layer page-container" ref={contentRef}>
                    <div className="team-glass-card" ref={cardRef}>

                        <header className="team-header">
                            <span className="team-badge">خانواده دی‌ام هاوس</span>
                            <h2 className="team-title">
                                خلاقیت، <br/>
                                در کنار تخصص
                            </h2>
                        </header>

                        <div className="team-body">
                            <p className="team-desc">
                                ما مجموعه‌ای از طراحان، توسعه‌دهندگان و استراتژیست‌هایی هستیم که عاشق چالش‌های دیجیتال هستند. در DMHouse، هر پروژه یک اثر هنری است که با دقت و وسواس خلق می‌شود.
                            </p>

                            <div className="team-stats-grid">
                                <div className="t-stat">
                                    <span className="ts-val">15+</span>
                                    <span className="ts-label">متخصص ارشد</span>
                                </div>
                                <div className="t-stat">
                                    <span className="ts-val">4</span>
                                    <span className="ts-label">واحد تخصصی</span>
                                </div>
                                <div className="t-stat">
                                    <span className="ts-val">∞</span>
                                    <span className="ts-label">ایده خلاقانه</span>
                                </div>
                            </div>

                            <a href="/about-us" className="team-btn">
                                <span>آشنایی با اعضا</span>
                                <span className="team-btn-icon">←</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}