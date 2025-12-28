import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function WhyUsSection() {
    const previewRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const preview = previewRef.current;
        const items = document.querySelectorAll('.why-us__item');

        const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });

        // Center the initial position
        // We use xPercent/yPercent to ensure the mouse is always in the center of the image
        gsap.set(preview, { xPercent: -50, yPercent: -50 });

        // 2. MOUSE MOVE HANDLER
        const onMove = (e) => {
            // Feed coordinates directly to GSAP
            xTo(e.clientX);
            yTo(e.clientY);
        };

        // 3. HOVER HANDLERS
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const src = item.getAttribute('data-image');
                if (imgRef.current && src) {
                    imgRef.current.src = src;
                }
                // Animate Opacity and Scale In
                gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.3, overwrite: 'auto' });
            });

            item.addEventListener('mouseleave', () => {
                // Animate Opacity and Scale Out
                gsap.to(preview, { autoAlpha: 0, scale: 0.8, duration: 0.3, overwrite: 'auto' });
            });
        });

        window.addEventListener('mousemove', onMove);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', onMove);
            // Optional: Kill GSAP tweens if component unmounts
            gsap.killTweensOf(preview);
        };
    }, []);

    return (
        <section id="whyUs" className="why-us page-container">
            <header className="head">
                <h2>چرا دی ام هاوس</h2>
                <p className="subtitle">ارائه بهترین و به‌روزترین خدمات با ما</p>
            </header>

            <ul className="why-us__list">
                <li className="why-us__item" data-image="/business.jpg">
                    <div><span className="why-us__index">01</span><span className="why-us__text">فقط مجری نیستیم</span></div>
                    <span className="why-us__more">ما شریک تجاری شما هستیم.</span>
                </li>
                <li className="why-us__item" data-image="/honesty.jpg">
                    <div><span className="why-us__index">02</span><span className="why-us__text">شفافیت کامل</span></div>
                    <span className="why-us__more">گزارش دهی منظم و برگزاری جلسات (اسپرینت ها).</span>
                </li>
                <li className="why-us__item" data-image="/team.jpg">
                    <div><span className="why-us__index">03</span><span className="why-us__text">تیم متخصص</span></div>
                    <span className="why-us__more">تیم ما برخلاف فریلنسرها بر پروژه ما متمرکز است.</span>
                </li>
                <li className="why-us__item" data-image="/result.jpg">
                    <div><span className="why-us__index">04</span><span className="why-us__text">نتیجه‌گرا</span></div>
                    <span className="why-us__more">تمرکز بر RoI و فروش. نه فقط لایک و بازدید.</span>
                </li>
            </ul>

            <div className="why-us__preview" ref={previewRef}>
                <img src="" alt="" ref={imgRef} />
            </div>
        </section>
    );
}