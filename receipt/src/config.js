import themes from './Themes';

export const fallbackCharges = [
    { item: 'هزینه مشاوره', amount: 120 },
    { item: 'هزینه خدمات', amount: 45 },
    { item: 'کارمزد پردازش', amount: 25 },
    { item: 'اجاره تجهیزات', amount: 35 },
    { item: 'مالیات', amount: 18 },
];

export const defaultConfig = {
    companyName: 'فاکتور خرید اسنپ پی',
    invoiceNumber: 'INV-1045',
    date: '23 آذر 1404',
    paymentMethod: 'کارت اعتباری',
    charges: fallbackCharges,
    initialThemeId: themes[4].id,
    defaultAccent: themes[4].accent,
    locale: 'fa-IR',
    currencyLabel: 'تومان',
    enableDrag: true,
};

export default defaultConfig;