import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/OurTeam.css';

gsap.registerPlugin(ScrollTrigger);

const TEAM_MEMBERS = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `عضو تیم ${i + 1}`,
    role: i % 3 === 0 ? 'توسعه‌دهنده ارشد' : (i % 3 === 1 ? 'طراح محصول' : 'خالق رویاها'),
    image: `https://picsum.photos/seed/creative${i * 13}/500/700`
}));

export default function OurTeam() {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const cards = gsap.utils.toArray('.team-3d-card');
        const mm = gsap.matchMedia();

        // === DESKTOP ANIMATION (The Fun 3D Entrance) ===
        mm.add("(min-width: 993px)", () => {
            gsap.set(cards, { clearProps: 'all' });
            gsap.fromTo(cards,
                {
                    y: 120,
                    opacity: 0,
                    scale: 0.8,
                    rotationX: -20
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotationX: 0,
                    duration: 1,
                    stagger: 0.05,
                    ease: 'elastic.out(1, 0.8)',
                    scrollTrigger: {
                        trigger: grid,
                        start: 'top 85%', // Starts earlier so they don't show up late
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // === MOBILE ANIMATION (Simple Clean Entry) ===
        mm.add("(max-width: 992px)", () => {
            gsap.set(cards, { clearProps: 'all' });
            gsap.fromTo(cards,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: grid,
                        start: 'top 90%'
                    }
                }
            );
        });

        return () => mm.revert();
    }, []);

    return (
        <section className="our-team-creative-wrapper" ref={sectionRef}>
            <header className="head page-container" style={{textAlign: 'center', marginBottom: '80px'}}>
                <div className="title-group">
                    <span className="en-title">The Creators</span>
                    <h2>
                        تیم <span className="highlight">ما</span>
                    </h2>
                </div>
                <p className="subtitle">
                    با ۲۰ ذهن خلاق پشت پروژه‌های دی‌ام هاوس آشنا شوید
                </p>
            </header>

            <div className="team-3d-container" ref={gridRef}>
                {TEAM_MEMBERS.map((member) => (
                    <div className="team-3d-card" key={member.id}>
                        {/* Visual Layer */}
                        <div className="t-card-visual">
                            <div className="t-card-blob"></div>
                            <img
                                src={member.image}
                                alt={member.name}
                                className="t-card-img"
                                loading="lazy"
                            />
                            <div className="t-img-overlay"></div>
                        </div>

                        {/* Info Layer */}
                        <div className="t-card-info">
                            <h3 className="t-name">{member.name}</h3>
                            <span className="t-role">{member.role}</span>
                            <div className="t-social-dots">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}