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
            image: 'https://dmhouse.agency/wp-content/uploads/2023/03/بی-کروات-2.png'
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
            {
                id: 1,
                name: 'Instagram',
                href: '#',
                iconPath: 'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22H7.75A5.75 5.75 0 0 1 2 16.25V7.75A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25V7.75A4.25 4.25 0 0 0 16.25 3.5H7.75zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z'
            },
            {
                id: 2,
                name: 'WhatsApp',
                href: '#',
                iconPath: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'
            },
            {
                id: 3,
                name: 'Facebook',
                href: '#',
                iconPath: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.648 0-2.928 1.67-2.928 3.403v.575h3.98l-.588 3.667h-3.392v7.98H9.101Z'
            }
        ]
    }
};

export const HEADER_DATA = {
    brand: {
        name: "DMHouse",
        logoUrl: "https://dmhouse.agency/wp-content/uploads/2026/01/dmhouselogo-10.svg",
        homeLink: "/"
    },
    cta: {
        title: "دریافت مشاوره",
        href: "#"
    },
    navigation: [
        {
            id: 1,
            title: "خدمات", // Single parent item
            href: "/services",
            hasMegaMenu: true,
            columns: [
                // Column 1: Marketing & Social
                {
                    title: "دیجیتال مارکتینگ و سوشال",
                    color: "#EF3E63",
                    items: [
                        { label: "گوگل ادز", href: "/google-ads", icon: "📈" },
                        { label: "بازاریابی اینترنتی", href: "/internet-marketing", icon: "🌐" },
                        { label: "مدیریت پیج اینستاگرام", href: "/instagram-management", icon: "❤️" },
                        { label: "تولید محتوا", href: "/content-creation", icon: "🎥" }
                    ]
                },
                // Column 2: Web Design & Development
                {
                    title: "طراحی سایت و توسعه",
                    color: "#2E2F7E",
                    items: [
                        { label: "طراحی سایت شرکتی", href: "/web-design/corporate", icon: "🏢" },
                        { label: "طراحی سایت فروشگاهی", href: "/web-design/ecommerce", icon: "🛍️" },
                        { label: "راه اندازی استارتاپ", href: "/startup", icon: "🚀" },
                        { label: "پشتیبانی فنی", href: "/support", icon: "🛠️" }
                    ]
                },
                // Column 3: SEO & Graphics
                {
                    title: "سئو و گرافیک",
                    color: "#FFD700", // Gold accent for the 3rd column
                    items: [
                        { label: "خدمات سئو (SEO)", href: "/seo", icon: "🔍" },
                        { label: "بهینه سازی سرعت", href: "/speed-optimization", icon: "⚡" },
                        { label: "طراحی رابط کاربری (UI/UX)", href: "/ui-ux", icon: "🎨" },
                        { label: "خدمات گرافیکی", href: "/graphic-design", icon: "🖌️" }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "دی ام هاوس مارکت",
            href: "/market",
            hasMegaMenu: false
        },
        {
            id: 3,
            title: "درباره ما", // Optional: Added to balance the nav
            href: "/about",
            hasMegaMenu: false
        },
        {
            id: 4,
            title: "ارتباط با ما",
            href: "/contact",
            hasMegaMenu: false
        }
    ]
};