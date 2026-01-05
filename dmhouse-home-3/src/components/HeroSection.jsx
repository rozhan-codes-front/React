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
    const videoContainerRef = useRef(null); // Ref for the container to fade in
    const scrollIconRef = useRef(null);     // Ref for the new scroll icon

    // === 1. FORCE VIDEO PLAYBACK ===
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.muted = true;
            video.defaultMuted = true;
            video.setAttribute("playsinline", "");
            video.setAttribute("muted", "");
            video.setAttribute("autoplay", "");

            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    video.muted = true;
                    video.play();
                });
            }
        }
    }, []);

    // === 2. GSAP ANIMATIONS & INTRO LISTENER ===
    useEffect(() => {
        const mm = gsap.matchMedia();

        // Listen for Header animation completion
        const onIntroComplete = () => {
            gsap.to(videoContainerRef.current, {
                opacity: 1,
                duration: 1.5,
                ease: "power2.out"
            });

            gsap.to(scrollIconRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.5,
                ease: "power2.out"
            });
        };

        window.addEventListener('intro-complete', onIntroComplete);

        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(contentRef.current, { autoAlpha: 0, y: 50 });
            gsap.set(videoContainerRef.current, { opacity: 0 }); // Start hidden
            gsap.set(scrollIconRef.current, { opacity: 0, y: 20 }); // Start hidden

            mm.add({
                isMobile: "(max-width: 768px)",
                isDesktop: "(min-width: 769px)",
            }, (context) => {
                const { isMobile } = context.conditions;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top top",
                        end: isMobile ? "+=600" : "+=1800",
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
            });

        }, wrapperRef);

        return () => {
            ctx.revert();
            mm.revert();
            window.removeEventListener('intro-complete', onIntroComplete);
        };
    }, []);

    const handleVideoEnded = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    return (
        <div ref={wrapperRef} className="hero-scroll-wrapper">
            <section className="heroVisual" ref={heroRef}>

                {/* Updated: Added ref to container for fade-in effect */}
                <div className="heroVisual__video-container" ref={videoContainerRef}>
                    <video
                        ref={videoRef}
                        className="heroVisual__video"
                        src="https://dmhouse.agency/wp-content/uploads/2025/12/hero-video.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        onEnded={handleVideoEnded}
                    />
                    <div className="heroVisual__overlay"></div>
                </div>

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

                {/* NEW: Animated Scroll Icon */}
                <div className="hero-scroll-indicator" ref={scrollIconRef}>
                    <div className="hero-scroll-icon">
                        <div className="hero-scroll-dot"></div>
                    </div>
                    <span className="hero-scroll-text">اسکرول کنید</span>
                </div>

            </section>
        </div>
    );
}