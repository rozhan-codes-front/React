import React, { useRef } from 'react';
import '../styles/SeoContentSection.css';

const SEO_DATA = [
    {
        id: 1,
        title: "چرا سئو پادشاه دیجیتال مارکتینگ است؟",
        text: "سئو (SEO) یا بهینه‌سازی موتورهای جستجو، تنها راه برای دیده‌شدن ارگانیک و پایدار در دنیای دیجیتال است. برخلاف تبلیغات کلیکی که با قطع بودجه متوقف می‌شوند، سئو سرمایه‌گذاری روی زیرساخت کسب‌وکار شماست. با یک استراتژی سئو قدرتمند، برند شما به مرجعی قابل اعتماد در صنعت تبدیل می‌شود و مشتریان به‌صورت خودکار شما را پیدا می‌کنند.",
        image: "https://dmhouse.agency/wp-content/uploads/2025/12/05.jpg"
    },
    {
        id: 2,
        title: "تولید محتوا: قلب تپنده سئو",
        text: "محتوا پادشاه است، اما نه هر محتوایی. الگوریتم‌های گوگل به‌دنبال محتوایی هستند که نیاز کاربر را برطرف کند، یونیک باشد و تجربه کاربری فوق‌العاده‌ای ارائه دهد. تیم محتوای ما با ترکیب دانش فنی سئو و هنر نویسندگی، محتوایی خلق می‌کند که هم گوگل عاشق آن باشد و هم مخاطب نتواند از خواندن آن دست بکشد.",
        image: "https://dmhouse.agency/wp-content/uploads/2025/12/2112.w039.n003.47B.p1.47.jpg"
    },
    {
        id: 3,
        title: "سئو تکنیکال: فونداسیون موفقیت",
        text: "بدون یک سایت سریع، امن و بهینه، بهترین محتواها هم دیده نمی‌شوند. سئو تکنیکال به معنای صحبت کردن به زبان ربات‌های گوگل است. ما با بهینه‌سازی سرعت سایت (Core Web Vitals)، اصلاح ساختار URLها و رفع خطاهای خزش، جاده‌ای هموار برای رسیدن به رتبه‌های برتر گوگل می‌سازیم.",
        image: "https://dmhouse.agency/wp-content/uploads/2025/12/searching-engine-optimizing-seo-browsing-concept.jpg"
    },
    {
        id: 4,
        title: "لینک‌سازی و اعتبار دامنه",
        text: "اعتبار دامنه شما در گرو لینک‌هایی است که دریافت می‌کنید. استراتژی آف‌پیج (Off-Page) ما بر اساس روابط عمومی دیجیتال و دریافت بک‌لینک‌های باکیفیت از سایت‌های معتبر بنا شده است. ما از روش‌های کلاه سیاه دوری می‌کنیم و اعتباری ماندگار برای دامنه شما می‌سازیم.",
        image: "https://dmhouse.agency/wp-content/uploads/2025/11/representation-user-experience-interface-design.jpg"
    }
];

export default function SeoContentSection() {
    return (
        <section className="seo-section page-container">
            <header className="head">
                <h2>
                    <span className="highlight">دانش</span> و استراتژی
                </h2>
                <p className="subtitle">
                    مروری بر اصول و استراتژی‌هایی که ما برای رشد کسب‌وکار شما به کار می‌گیریم.
                </p>
            </header>

            <div className="seo-scroll-mask">
                <div
                    className="seo-scroll-content"
                    data-lenis-prevent="true"
                    data-scroll-lock
                >
                    {SEO_DATA.map((item, index) => (
                        <article
                            key={item.id}
                            className="seo-card"
                            style={{ top: `${index * 20}px` }}
                        >
                            <div className="seo-card-content">
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </div>
                            <div className="seo-card-image">
                                <img src={item.image} alt={item.title} loading="lazy" />
                            </div>
                        </article>
                    ))}

                    {/* Spacer to ensure last card scrolls fully into view */}
                    <div style={{ height: '20px' }}></div>
                </div>
            </div>
        </section>
    );
}