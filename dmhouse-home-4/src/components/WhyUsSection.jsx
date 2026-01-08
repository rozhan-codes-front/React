import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/WhyUsSection.css';

gsap.registerPlugin(ScrollTrigger);

const WHY_US_DATA = [
    {
        id: 1,
        title: "فقط مجری نیستیم",
        desc: "ما شریک تجاری شما هستیم.",
        image: "https://dmhouse.agency/wp-content/uploads/2025/11/2149142115.jpg"
    },
    {
        id: 2,
        title: "شفافیت کامل",
        desc: "گزارش دهی منظم و برگزاری جلسات (اسپرینت ها).",
        image: "https://dmhouse.agency/wp-content/uploads/2025/11/representation-user-experience-interface-design.jpg"
    },
    {
        id: 3,
        title: "تیم متخصص",
        desc: "تیم ما برخلاف فریلنسرها بر پروژه ما متمرکز است.",
        image: "https://dmhouse.agency/wp-content/uploads/2025/10/young-female-logo-designer-working-graphic-tablet.jpg"
    },
    {
        id: 4,
        title: "نتیجه‌گرا",
        desc: "تمرکز بر RoI و فروش. نه فقط لایک و بازدید.",
        image: "https://dmhouse.agency/wp-content/uploads/2025/12/result.jpg"
    }
];

export default function WhyUsSection() {
    const [activeId, setActiveId] = useState(1);
    const sectionRef = useRef(null);
    const itemsRef = useRef([]);

    // --- 1. HANDLE SCROLL SYNC (Desktop) ---
    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 993px)", () => {
            // Create scroll triggers for each item to update image on scroll
            itemsRef.current.forEach((item, index) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: "top center", // When item hits center of viewport
                    end: "bottom center",
                    onEnter: () => setActiveId(WHY_US_DATA[index].id),
                    onEnterBack: () => setActiveId(WHY_US_DATA[index].id)
                });
            });
        });

        return () => mm.revert();
    }, []);

    // --- 2. HANDLE HOVER (Overrides Scroll) ---
    const handleMouseEnter = (id) => {
        if (window.innerWidth > 992) {
            setActiveId(id);
        }
    };

    return (
        <section id="whyUs" className="why-us page-container" ref={sectionRef}>
            {/* --- REUSABLE HEADER (Kept Exactly as Requested) --- */}
            <header className="head">
                <div className="title-group">
                    <span className="en-title">Why Us</span>
                    <h2>چرا <span className="highlight">دی ام هاوس</span></h2>
                </div>
                <p className="subtitle">ارائه بهترین و به‌روزترین خدمات با ما</p>
            </header>

            <div className="why-us__content">
                {/* --- RIGHT: THE CONTENT LIST --- */}
                {/* (Listed first in HTML for accessibility/mobile flow) */}
                <div className="why-us__list">
                    {WHY_US_DATA.map((item, index) => (
                        <div
                            key={item.id}
                            ref={el => itemsRef.current[index] = el}
                            className={`why-us__item ${activeId === item.id ? 'active' : ''}`}
                            onMouseEnter={() => handleMouseEnter(item.id)}
                        >
                            <div className="why-us__item-head">
                                <span className="why-us__index">0{item.id}</span>
                                <h3 className="why-us__title">{item.title}</h3>
                            </div>
                            <p className="why-us__desc">{item.desc}</p>

                            {/* Mobile Image (Visible only on small screens) */}
                            <div className="why-us__mobile-img">
                                <img src={item.image} alt={item.title} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- LEFT: STICKY IMAGE STAGE (Desktop Only) --- */}
                <div className="why-us__visual">
                    <div className="why-us__visual-inner">
                        {WHY_US_DATA.map((item) => (
                            <img
                                key={item.id}
                                src={item.image}
                                alt={item.title}
                                className={`why-us__bg-img ${activeId === item.id ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}