import React, { useState } from 'react';
import '../styles/SeoContentSection.css';

const SEO_DATA = [
    {
        id: 1,
        title: "چرا سئو پادشاه دیجیتال مارکتینگ است؟",
        text: "سئو (SEO) یا بهینه‌سازی موتورهای جستجو، تنها راه برای دیده‌شدن ارگانیک و پایدار در دنیای دیجیتال است. برخلاف تبلیغات کلیکی که با قطع بودجه متوقف می‌شوند، سئو سرمایه‌گذاری روی زیرساخت کسب‌وکار شماست. با یک استراتژی سئو قدرتمند، برند شما به مرجعی قابل اعتماد در صنعت تبدیل می‌شود و مشتریان به‌صورت خودکار شما را پیدا می‌کنند. این فرآیند شامل بهینه‌سازی فنی، تولید محتوای ارزشمند و ایجاد اعتبار برای دامنه است که در نهایت منجر به افزایش ترافیک، نرخ تبدیل و فروش می‌شود. سئو یک بازی طولانی‌مدت است که صبر و تخصص می‌طلبد، اما بازدهی آن بی‌رقیب است." +
            "سئو (SEO) یا بهینه‌سازی موتورهای جستجو، تنها راه برای دیده‌شدن ارگانیک و پایدار در دنیای دیجیتال است. برخلاف تبلیغات کلیکی که با قطع بودجه متوقف می‌شوند، سئو سرمایه‌گذاری روی زیرساخت کسب‌وکار شماست. با یک استراتژی سئو قدرتمند، برند شما به مرجعی قابل اعتماد در صنعت تبدیل می‌شود و مشتریان به‌صورت خودکار شما را پیدا می‌کنند. این فرآیند شامل بهینه‌سازی فنی، تولید محتوای ارزشمند و ایجاد اعتبار برای دامنه است که در نهایت منجر به افزایش ترافیک، نرخ تبدیل و فروش می‌شود. سئو یک بازی طولانی‌مدت است که صبر و تخصص می‌طلبد، اما بازدهی آن بی‌رقیب است.",
        image: "https://dmhouse.agency/wp-content/uploads/2025/12/05.jpg"
    },
    {
        id: 2,
        title: "تولید محتوا: قلب تپنده سئو",
        text: "محتوا پادشاه است، اما نه هر محتوایی. الگوریتم‌های گوگل به‌دنبال محتوایی هستند که نیاز کاربر را برطرف کند، یونیک باشد و تجربه کاربری فوق‌العاده‌ای ارائه دهد. تیم محتوای ما با ترکیب دانش فنی سئو و هنر نویسندگی، محتوایی خلق می‌کند که هم گوگل عاشق آن باشد و هم مخاطب نتواند از خواندن آن دست بکشد. ما با تحقیق کلمات کلیدی، ساختاردهی مناسب و استفاده از مدیاهای جذاب، محتوایی تولید می‌کنیم که نه‌تنها رتبه می‌گیرد، بلکه مخاطب را به مشتری وفادار تبدیل می‌کند.",
        image: "https://dmhouse.agency/wp-content/uploads/2025/12/2112.w039.n003.47B.p1.47.jpg"
    },
    {
        id: 3,
        title: "سئو تکنیکال: فونداسیون موفقیت",
        text: "بدون یک سایت سریع، امن و بهینه، بهترین محتواها هم دیده نمی‌شوند. سئو تکنیکال به معنای صحبت کردن به زبان ربات‌های گوگل است. ما با بهینه‌سازی سرعت سایت (Core Web Vitals)، اصلاح ساختار URLها و رفع خطاهای خزش، جاده‌ای هموار برای رسیدن به رتبه‌های برتر گوگل می‌سازیم. این خدمات شامل بهینه‌سازی موبایل، اسکیما مارک‌آپ، سایت‌مپ و فایل robots.txt است که همگی نقش حیاتی در ایندکس شدن صحیح سایت شما دارند.",
        image: "https://dmhouse.agency/wp-content/uploads/2025/12/searching-engine-optimizing-seo-browsing-concept.jpg"
    },
    {
        id: 4,
        title: "لینک‌سازی و اعتبار دامنه",
        text: "اعتبار دامنه شما در گرو لینک‌هایی است که دریافت می‌کنید. استراتژی آف‌پیج (Off-Page) ما بر اساس روابط عمومی دیجیتال و دریافت بک‌لینک‌های باکیفیت از سایت‌های معتبر بنا شده است. ما از روش‌های کلاه سیاه دوری می‌کنیم و اعتباری ماندگار برای دامنه شما می‌سازیم. این استراتژی شامل رپورتاژ آگهی، فعالیت در شبکه‌های اجتماعی و سیگنال‌های برندینگ است که به گوگل نشان می‌دهد شما یک کسب‌وکار واقعی و قابل اعتماد هستید.",
        image: "https://dmhouse.agency/wp-content/uploads/2025/11/representation-user-experience-interface-design.jpg"
    }
];

export default function SeoContentSection() {
    const [isExpanded, setIsExpanded] = useState(false);

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

            {/* Global Wrapper that controls height */}
            <div className={`seo-global-wrapper ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}>

                <div className="seo-grid-layout">
                    {SEO_DATA.map((item) => (
                        <article key={item.id} className="seo-row">
                            {/* TEXT ROW */}
                            <div className="seo-text-block">
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </div>

                            {/* IMAGE ROW */}
                            <div className="seo-image-block">
                                <img src={item.image} alt={item.title} loading="lazy" />
                            </div>
                        </article>
                    ))}
                </div>

                {/* Fade Overlay (Only visible when collapsed) */}
                {!isExpanded && <div className="seo-global-fade"></div>}
            </div>

            {/* Global Toggle Button */}
            <div className="seo-action-area">
                <button
                    className="seo-global-btn"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'بستن' : 'مشاهده بیشتر'}
                    <span className="btn-icon">
                        <img
                            src="https://dmhouse.agency/wp-content/uploads/2025/12/top.svg"
                            alt=""
                            style={{
                                transform: isExpanded ? 'rotate(0deg)' : 'rotate(-180deg)',
                                transition: 'transform 0.3s'
                            }}
                        />
                    </span>
                </button>
            </div>
        </section>
    );
}