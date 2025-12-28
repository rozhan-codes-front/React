// src/config/siteData.js

export const SITE_DATA = {
    brand: { name: 'DMHouse', mark: 'DM' },
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
            image: '/client-2.png' // Ensure this image exists in public folder
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