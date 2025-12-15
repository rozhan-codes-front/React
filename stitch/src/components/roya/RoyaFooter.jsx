export default function RoyaFooter({ socialLinks, footerLinks, trustBadges }) {
    return (
        <footer className="bg-gray-100 mt-12 py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <img
                            className="h-12 mb-4"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp0d-7wGHL4jYWY7P0YqrgJTQ1TsMMrE07P9VY1QgDwLd7X8Ko244RoeeqoGvupIUJQbF9Z8o4U3IygJynWcX_CeMXCJu-4Vf3v732wu9La7BGJsSZlbE4dH_ug0x8onw0g5xhR9JmDftEU2c5kceJGEvdUyHEMFVYEzq3VIeBAqby2eq2uFY7Ng0PkAWKmIcocEA3wmE3bXBlqeWO0N7TLj0K5WjYb3neRQW_e9Kq4TX9bsIWJANP30zuC0xIiPCXV3SCYLrYcvE3"
                            alt="Royas Logo"
                        />
                        <p className="text-gray-600">
                            آژانس مسافرتی رویاس، برگزارکننده تورهای داخلی و خارجی با بهترین کیفیت و مناسب‌ترین قیمت.
                        </p>
                        <div className="flex space-x-4 space-x-reverse mt-4 text-gray-500">
                            {socialLinks.map((link) => (
                                <a key={link.icon} className="hover:text-primary-color" href={link.href} aria-label={link.label}>
                                    <span className="material-icons">{link.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">لینک‌های مفید</h3>
                        <ul className="space-y-2 text-gray-600">
                            {footerLinks.useful.map((item) => (
                                <li key={item.label}>
                                    <a className="hover:text-primary-color transition-colors duration-300" href={item.href}>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">خدمات ما</h3>
                        <ul className="space-y-2 text-gray-600">
                            {footerLinks.services.map((item) => (
                                <li key={item.label}>
                                    <a className="hover:text-primary-color transition-colors duration-300" href={item.href}>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">نمادهای اعتماد</h3>
                        <div className="flex gap-4">
                            {trustBadges.map((badge) => (
                                <img
                                    key={badge.alt}
                                    className="h-20 w-20 object-contain bg-white p-2 rounded-custom border"
                                    src={badge.src}
                                    alt={badge.alt}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-500 mt-10 border-t pt-6">
                    <p>تمامی حقوق این وبسایت متعلق به آژانس مسافرتی رویاس می‌باشد. ❤️</p>
                </div>
            </div>
        </footer>
    );
}