import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const WHY_US_DATA = [
    {
        id: 1,
        title: "فقط مجری نیستیم",
        desc: "ما شریک تجاری شما هستیم.",
        image: "/business.jpg" // Make sure these exist in /public
    },
    {
        id: 2,
        title: "شفافیت کامل",
        desc: "گزارش دهی منظم و برگزاری جلسات (اسپرینت ها).",
        image: "/honesty.jpg"
    },
    {
        id: 3,
        title: "تیم متخصص",
        desc: "تیم ما برخلاف فریلنسرها بر پروژه ما متمرکز است.",
        image: "/team.jpg"
    },
    {
        id: 4,
        title: "نتیجه‌گرا",
        desc: "تمرکز بر RoI و فروش. نه فقط لایک و بازدید.",
        image: "/result.jpg"
    }
];

export default function WhyUsSection() {
    const previewContainerRef = useRef(null);
    const imagesRef = useRef([]);

    useEffect(() => {
        const preview = previewContainerRef.current;

        // 1. SETUP GSAP QUICKTO (The fastest way to move things)
        const xTo = gsap.quickTo(preview, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(preview, "y", { duration: 0.4, ease: "power3.out" });

        // Center the preview initially
        gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.8, autoAlpha: 0 });

        // 2. MOUSE MOVE (Global listener for smoothness)
        const onMove = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener('mousemove', onMove);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', onMove);
        };
    }, []);

    const handleMouseEnter = (index) => {
        const preview = previewContainerRef.current;
        const targetImage = imagesRef.current[index];

        // 1. Show Container
        gsap.to(preview, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)"
        });

        // 2. Show Specific Image (Instant, no loading)
        imagesRef.current.forEach((img, i) => {
            if(i === index) {
                gsap.to(img, { autoAlpha: 1, duration: 0.2, overwrite: true });
            } else {
                gsap.to(img, { autoAlpha: 0, duration: 0.2, overwrite: true });
            }
        });
    };

    const handleMouseLeave = () => {
        const preview = previewContainerRef.current;
        // Hide Container
        gsap.to(preview, {
            autoAlpha: 0,
            scale: 0.8,
            duration: 0.2,
            ease: "power2.out"
        });
    };

    return (
        <section id="whyUs" className="why-us page-container">
            <header className="head">
                <h2>چرا دی ام هاوس</h2>
                <p className="subtitle">ارائه بهترین و به‌روزترین خدمات با ما</p>
            </header>

            <ul className="why-us__list">
                {WHY_US_DATA.map((item, index) => (
                    <li
                        key={item.id}
                        className="why-us__item"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div>
                            <span className="why-us__index">0{item.id}</span>
                            <span className="why-us__text">{item.title}</span>
                        </div>
                        <span className="why-us__more">{item.desc}</span>
                    </li>
                ))}
            </ul>

            {/* PRE-RENDERED IMAGES (Hidden by default) */}
            <div className="why-us__preview" ref={previewContainerRef}>
                {WHY_US_DATA.map((item, index) => (
                    <img
                        key={item.id}
                        ref={el => imagesRef.current[index] = el}
                        src={item.image}
                        alt={item.title}
                        className="why-us__preview-img"
                    />
                ))}
            </div>
        </section>
    );
}