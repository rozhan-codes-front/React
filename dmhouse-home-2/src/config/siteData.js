export const SITE_DATA = {
    brand: {
        name: 'DMHouse',
        // UPDATED: Added logo image URL
        logoUrl: 'https://dmhouse.agency/wp-content/uploads/2024/06/logo2-min.png'
    },
    nav: [
        { id: 1, title: 'خدمات ما', href: '#services' },
        { id: 2, title: 'نمونه‌کارها', href: '#portfolio' },
        { id: 3, title: 'فرآیند', href: '#process' },
        { id: 4, title: 'درباره ما', href: '#ceoSection' }
    ],
    cta: { title: 'مشاوره رایگان', href: '#cta' },
    footer: {
        description: 'هدف ما در آژانس دیجیتال مارکتینگ DMHouse این است که خلاءهای موجود در جامعه دیجیتال مارکتینگ را برای کارفرمایان به حداقل برسانیم.',
        consultation: {
            title: 'دریافت مشاوره رایگان',
            subtitle: 'جهت دریافت مشاوره رایگان فرم زیر را تکمیل کنید.',
            placeholder: '09XX-XXX-XXXX',
            image: '../../../public/logo-img.png'
        },
        contact: [
            { id: 1, icon: '📍', label: 'آدرس', value: 'مشهد، سیدرضی ۴۸' },
            { id: 2, icon: '✉️', label: 'ایمیل', value: 'info@dmhouse.agency' },
            { id: 3, icon: '📞', label: 'تلفن', value: '0903-884-6494' }
        ],
        columns: [
            {
                id: 1,
                title: 'دسترسی سریع',
                links: [
                    { label: 'دی ام هاوس', href: '#' },
                    { label: 'بلاگ', href: '#' },
                    { label: 'تماس با ما', href: '#' },
                    { label: 'قوانین و مقررات', href: '#' }
                ]
            },
            {
                id: 2,
                title: 'خدمات',
                links: [
                    { label: 'طراحی سایت', href: '#' },
                    { label: 'سئو و بهینه‌سازی', href: '#' },
                    { label: 'کمپین‌های تبلیغاتی', href: '#' },
                    { label: 'شبکه‌های اجتماعی', href: '#' }
                ]
            },
            {
                id: 3,
                title: 'خدمات تخصصی',
                links: [
                    { label: 'طراحی سایت هتل', href: '#' },
                    { label: 'طراحی سایت خبری', href: '#' },
                    { label: 'سایت مهاجرتی', href: '#' },
                    { label: 'سایت دندانپزشکی', href: '#' }
                ]
            }
        ],
        socials: [
            { id: 1, icon: 'instagram', href: '#' },
            { id: 2, icon: 'whatsapp', href: '#' },
            { id: 3, icon: 'linkedin', href: '#' }
        ]
    }
};

export const HEADER_DATA = {
    brand: {
        name: "DMHouse",
        logoUrl: "https://dmhouse.agency/wp-content/uploads/2024/06/logo2-min.png",
        homeLink: "/"
    },
    cta: {
        title: "دریافت مشاوره",
        href: "/consultation"
    },
    // MEGA MENU NAVIGATION STRUCTURE
    navigation: [
        {
            id: 1,
            title: "آژانس دیجیتال مارکتینگ",
            href: "/digital-marketing",
            hasMegaMenu: true,
            columns: [
                {
                    title: "خدمات دیجیتال مارکتینگ",
                    color: "#EF3E63",
                    items: [
                        { label: "گوگل ادز", href: "/google-ads", icon: "📈" },
                        { label: "بازاریابی اینترنتی", href: "/internet-marketing", icon: "🌐" },
                        { label: "راه اندازی کسب و کار", href: "/startup", icon: "🚀" },
                        { label: "مشاوره دیجیتال مارکتینگ", href: "/consulting", icon: "💡" }
                    ]
                },
                {
                    title: "سوشال",
                    color: "#2E2F7E",
                    items: [
                        { label: "سوشال مدیا", href: "/social-media", icon: "📱" },
                        { label: "تولید محتوا اینستاگرام", href: "/content-creation", icon: "🎥" },
                        { label: "مدیریت پیج اینستاگرام", href: "/instagram-management", icon: "❤️" }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "خدمات طراحی سایت",
            href: "/web-design",
            hasMegaMenu: false
        },
        {
            id: 3,
            title: "خدمات سئو",
            href: "/seo",
            hasMegaMenu: false
        },
        {
            id: 4,
            title: "خدمات گرافیکی",
            href: "/graphic-design",
            hasMegaMenu: false
        },
        {
            id: 5,
            title: "ارتباط با ما",
            href: "/contact",
            hasMegaMenu: false
        },
        {
            id: 6,
            title: "دی ام هاوس مارکت",
            href: "/market",
            hasMegaMenu: false
        }
    ]
};