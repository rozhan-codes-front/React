import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const wrapperRef = useRef(null);
    const videoRef = useRef(null);

    // === 1. FORCE VIDEO PLAYBACK ===
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // Force these attributes directly on the DOM element
            // This is more reliable than React props for autoplay policies
            video.muted = true;
            video.defaultMuted = true;
            video.setAttribute("playsinline", "");
            video.setAttribute("muted", "");
            video.setAttribute("autoplay", "");

            // Attempt to play immediately
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Auto-play was prevented; typically user interaction is required
                    // We mute again just to be safe and try one more time
                    video.muted = true;
                    video.play();
                });
            }
        }
    }, []);

    // === 2. GSAP ANIMATIONS ===
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(contentRef.current, { autoAlpha: 0, y: 50 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            tl.to(heroRef.current, {
                width: "calc(100% - 24px)",
                marginTop: "12px",
                height: "calc(100vh - 24px)",
                borderRadius: "40px",
                duration: 1,
                ease: "power2.out"
            }, "start")
                .to(contentRef.current, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "start+=0.1");

        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    // Manual loop enforcer
    const handleVideoEnded = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    return (
        <div ref={wrapperRef} className="hero-scroll-wrapper">
            <section className="heroVisual" ref={heroRef}>

                {/* Video Layer */}
                <div className="heroVisual__video-container">
                    <video
                        ref={videoRef}
                        className="heroVisual__video"
                        src="/hero-video.mp4"

                        // React Props for standard behavior
                        autoPlay
                        loop
                        muted
                        playsInline

                        // Fail-safe: If loop attr fails, this JS forces it
                        onEnded={handleVideoEnded}
                    />
                    <div className="heroVisual__overlay"></div>
                </div>

                {/* Content Layer */}
                <div className="heroVisual__content" ref={contentRef}>
                    <div className="heroVisual__glass">
                        <div className="hero-badge">
                            <span className="badge-icon">★</span>
                            <p>بیش از 10 سال سابقه و تخصص</p>
                        </div>

                        <h2 className="hero-title">
                            توسعه کسب و کار شما با <br />
                            <span className="text-gradient">استراتژی‌های داده‌محور و شفاف</span>
                        </h2>

                        <h3 className="hero-subtitle">
                            توسعه کسب و کار مبتنی بر داده‌ها و لذت نتیجه
                        </h3>
                    </div>
                </div>
            </section>
        </div>
    );
}