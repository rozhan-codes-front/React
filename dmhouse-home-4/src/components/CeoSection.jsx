import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CeoSection() {
    const wrapperRef = useRef(null);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        // Target inner elements for animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        // 3D Effects
        tl.to(el.querySelector('.ceo-rolling-token'), { x: '120vw', rotation: 720, ease: 'none' }, 0);
        tl.fromTo(el.querySelector('.ceo-bg img'), { y: '-10%' }, { y: '10%', ease: 'none' }, 0);
        tl.to(el.querySelector('.ceo-name'), { xPercent: -15, yPercent: 20, opacity: 1, ease: 'none' }, 0);
        tl.fromTo(el.querySelector('.ceo-card'), { y: 100, rotationX: 10 }, { y: -50, rotationX: -5, ease: 'none' }, 0);

        return () => tl.kill();
    }, []);

    return (
        <section id="ceoSection" className="ceo-section-wrapper" ref={wrapperRef}>
            <header className="head">
                <div className="title-group">
                    <span className="en-title">Elias Alipour</span>
                    <h2>
                        <span className="highlight">الیاس علی پور</span>
                    </h2>
                </div>
                <p className="subtitle">مدیر کل مجموعه دی ام هاوس</p>
            </header>

            <div className="ceo-section">
                <div className="ceo-bg">
                    <div className="ceo-bg__inner">
                        <img src="https://dmhouse.agency/wp-content/uploads/2025/12/111.jpg" alt="Elias Alipour" />
                    </div>
                    <div className="ceo-overlay"></div>
                </div>

                <div className="ceo-content page-container">
                    <h2 className="ceo-name">الیاس<br/>علی‌پور</h2>
                    <div className="ceo-card">
                        <div className="ceo-card__glass">
                            <span className="ceo-quote-icon">“</span>
                            <h3 className="ceo-quote-text">
                                رضایت مشتری، تنها معیار واقعی موفقیت ماست. ما اینجا نیستیم تا فقط بفروشیم، اینجاییم تا <span className="highlight">آرامش خیال</span> بسازیم.
                            </h3>
                            <div className="ceo-meta">
                                <span className="ceo-role">بنیان‌گذار و مدیرعامل</span>
                                <span className="ceo-sign">DMHouse</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ceo-rolling-token">
                    <img src="https://dmhouse.agency/wp-content/uploads/2025/12/dmhouse-logo.png" alt="DM Logo" />
                </div>
            </div>
        </section>
    );
}