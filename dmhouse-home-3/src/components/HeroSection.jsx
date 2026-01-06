import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

const FLOATING_CARDS = [
    { id: 1, label: 'پروژه‌های موفق', value: '+150', icon: '🚀' },
    { id: 2, label: 'رضایت مشتریان', value: '%98', icon: '❤️' },
    { id: 3, label: 'تیم متخصص', value: '+4', icon: '👨‍💻' },
];

export default function HeroSection() {
    const wrapperRef = useRef(null);
    const sceneRef = useRef(null);
    const videoCardRef = useRef(null);
    const contentRef = useRef(null);
    const cardsRef = useRef(null);
    const videoElementRef = useRef(null);

    // State to track if intro is done
    const [introFinished, setIntroFinished] = useState(false);

    // === 1. FORCE VIDEO PLAYBACK ===
    useEffect(() => {
        const video = videoElementRef.current;
        if (video) {
            video.muted = true;
            video.setAttribute("playsinline", "");
            video.setAttribute("autoplay", "");
            video.play().catch(() => video.play());
        }
    }, []);

    // === 2. SETUP INITIAL STATES ===
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // HIDE everything initially
            gsap.set(contentRef.current, { autoAlpha: 0, y: 50, filter: "blur(10px)" });

            // IMPORTANT: Target the NEW class name '.float-card-3d'
            gsap.set('.float-card-3d', { autoAlpha: 0, y: 300, z: 0, rotationX: -45 });

            // Listen for header intro
            const unlockMouse = () => setIntroFinished(true);
            window.addEventListener('intro-complete', unlockMouse);
            return () => window.removeEventListener('intro-complete', unlockMouse);
        }, wrapperRef);
        return () => ctx.revert();
    }, []);

    // === 3. THE SCROLL SEQUENCE ===
    useEffect(() => {
        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            mm.add("(min-width: 992px)", () => {
                // --- DESKTOP SEQUENCE ---
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top top",
                        end: "+=3000",
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                    }
                });

                // PHASE 1: REVEAL TEXT
                tl.to(contentRef.current, {
                    autoAlpha: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 3,
                    ease: "power2.out"
                });

                // Small Pause for reading
                tl.to({}, { duration: 1 });

                // PHASE 2: SWITCH TO 3D
                tl.addLabel("switch_to_3d");

                // A. Text Fades Out
                tl.to(contentRef.current, {
                    autoAlpha: 0,
                    y: -100,
                    filter: "blur(10px)",
                    duration: 3
                }, "switch_to_3d");

                // B. Video Tilts Back
                tl.to(videoCardRef.current, {
                    rotationX: 35,
                    y: 150,
                    z: -250,
                    scale: 0.8,
                    borderRadius: "50px",
                    boxShadow: "0 50px 100px rgba(0,0,0,0.6)",
                    duration: 5,
                    ease: "power1.inOut"
                }, "switch_to_3d");

                // C. Cards Pop Up (Selector fixed here)
                // We use the NEW class '.float-card-3d'
                const cards = gsap.utils.selector(cardsRef.current)('.float-card-3d');
                tl.to(cards, {
                    autoAlpha: 1,
                    y: -50,
                    z: 200,
                    rotationX: 0,
                    stagger: 0.2,
                    duration: 4,
                    ease: "back.out(1.2)"
                }, "switch_to_3d+=1");
            });

            mm.add("(max-width: 991px)", () => {
                // --- MOBILE SEQUENCE ---
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top top",
                        end: "+=1200",
                        scrub: 1,
                        pin: true
                    }
                });

                // 1. Reveal Text
                tl.to(contentRef.current, { autoAlpha: 1, y: 0, duration: 1 });

                // 2. Hide Text / Shrink Video
                tl.addLabel("mobile_switch");
                tl.to(contentRef.current, { autoAlpha: 0, y: -30, duration: 1 }, "mobile_switch+=0.5");
                tl.to(videoCardRef.current, { scale: 0.92, borderRadius: "24px", duration: 1 }, "mobile_switch+=0.5");

                // 3. Show Cards (Selector fixed here too)
                tl.to('.float-card-3d', { autoAlpha: 1, y: 0, stagger: 0.2 }, "mobile_switch+=1");
            });

        }, wrapperRef);

        return () => {
            ctx.revert();
            mm.revert();
        };
    }, []);

    // === 4. MOUSE PARALLAX ===
    const handleMouseMove = (e) => {
        if (!introFinished || !sceneRef.current) return;
        const { clientX, clientY, currentTarget } = e;
        const { width, height } = currentTarget.getBoundingClientRect();
        const xPos = (clientX / width) - 0.5;
        const yPos = (clientY / height) - 0.5;

        gsap.to(sceneRef.current, {
            rotationY: xPos * 4,
            rotationX: -yPos * 4,
            duration: 1,
            ease: "power2.out"
        });
    };

    return (
        <div ref={wrapperRef} className="hero-3d-wrapper" onMouseMove={handleMouseMove}>
            <div className="hero-perspective-stage">
                <div className="hero-3d-scene" ref={sceneRef}>

                    {/* VIDEO PLANE */}
                    <div className="video-card-3d" ref={videoCardRef}>
                        <video
                            ref={videoElementRef}
                            className="hero-video"
                            src="https://dmhouse.agency/wp-content/uploads/2025/12/hero-video.mp4"
                            loop
                            muted
                            playsInline
                        />
                        <div className="hero-overlay-gradient"></div>

                        {/* MAIN CONTENT */}
                        <div className="hero-main-content" ref={contentRef}>
                            <div className="hero-badge-glass">
                                <span className="pulse-dot"></span>
                                <span>بیش از 10 سال سابقه و تخصص</span>
                            </div>
                            <h1 className="hero-h1">
                                توسعه <span className="text-glow">کسب و کار</span> <br/>
                                مبتنی بر داده ها و لذت نتیجه
                            </h1>
                            <p className="hero-desc">
                                توسعه کسب و کار شما با استراتژی های داده محور و شفاف
                            </p>
                        </div>
                    </div>

                    {/* === FLOATING CARDS (Using New JSX Structure) === */}
                    <div className="floating-cards-container" ref={cardsRef}>
                        {FLOATING_CARDS.map((card) => (
                            <div key={card.id} className="float-card-3d">
                                <div className="card-glass-stack">
                                    {/* Layer 1: The glowing edge and base */}
                                    <div className="card-layer-base"></div>

                                    {/* Layer 2: Content Layer */}
                                    <div className="card-layer-content">
                                        <div className="card-icon-wrapper">
                                            {/* The spinning ring effect */}
                                            <div className="icon-energy-ring"></div>
                                            <span className="card-icon-emoji">{card.icon}</span>
                                        </div>
                                        <div className="card-data-block">
                                            <span className="data-value">{card.value}</span>
                                            <span className="data-label">{card.label}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}