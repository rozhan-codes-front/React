import themes from './Themes';
import templates from './Templates';

export const fallbackCharges = [
    { item: 'هزینه مشاوره', amount: 120 },
    { item: 'هزینه خدمات', amount: 45 },
    { item: 'کارمزد پردازش', amount: 25 },
    { item: 'اجاره تجهیزات', amount: 35 },
    { item: 'مالیات', amount: 18 },
];

export const defaultConfig = {
    companyName: 'خرید اسنپ پی',
    invoiceNumber: 'INV-1045',
    date: '۴ آوریل ۲۰۲۴',
    paymentMethod: 'کارت اعتباری',
    charges: fallbackCharges,
    initialThemeId: themes[0].id,
    defaultAccent: themes[0].accent,
    initialTemplateId: templates[0].id,
    locale: 'fa-IR',
    currencyLabel: 'دلار',
    enableDrag: true,
};

export default defaultConfig;