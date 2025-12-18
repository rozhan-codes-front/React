import themes from './Themes';
import templates from './Templates';

export const fallbackItems = [
    {
        id: 'sku-2411',
        name: 'هدفون بی‌سیم',
        sku: 'HD-2411',
        variant: 'رنگ: مشکی مات',
        quantity: 1,
        unitPrice: 185,
        discount: 10,
        meta: [
            { label: 'گارانتی', value: '۱۸ ماه' },
            { label: 'بیمه حمل', value: 'فعال' },
        ],
    },
    {
        id: 'sku-7702',
        name: 'ماوس ارگونومیک',
        sku: 'MS-7702',
        variant: 'بی‌صدا | USB-C',
        quantity: 2,
        unitPrice: 62,
        discount: 0,
        meta: [
            { label: 'رنگ', value: 'طلایی' },
            { label: 'موجودی', value: 'انبار مرکزی' },
        ],
    },
    {
        id: 'sku-9941',
        name: 'کابل شارژ سریع',
        sku: 'CB-9941',
        variant: 'طول ۱.۵ متر | نایلونی',
        quantity: 3,
        unitPrice: 19,
        discount: 5,
        meta: [
            { label: 'سازگاری', value: 'USB-C / Lightning' },
        ],
    },
];

export const defaultConfig = {
    companyName: 'فروشگاه آنلاین اورورا',
    orderNumber: 'ORD-10544',
    invoiceNumber: 'INV-10544',
    orderDate: '۱۴۰۳/۰۱/۱۵',
    paymentMethod: 'پرداخت آنلاین',
    shippingMethod: 'ارسال سریع',
    buyer: {
        name: 'سحر رضایی',
        nationalId: '۱۲۳۴۵۶۷۸۹۰',
        phone: '۰۹۱۲۳۴۵۶۷۸۹',
        email: 'buyer@example.com',
        address: 'تهران، بلوار کشاورز، پلاک ۱۲۳، واحد ۷',
        logoUrl: '',
    },
    sender: {
        name: 'اورورا شاپ',
        phone: '۰۲۱-۷۶۶۶۶۶۶',
        address: 'تهران، خیابان ولیعصر، برج تجارت، طبقه ۱۰',
    },
    receiver: {
        name: 'مرکز توزیع منطقه ۲',
        phone: '۰۲۱-۴۴۴۴۴۴۴',
        address: 'تهران، پونک، خیابان سردار جنگل، پلاک ۹۲',
    },
    summaryNote: 'این رسید برای خرید آنلاین صادر شده و شامل جزئیات سفارش، شیوه ارسال و اطلاعات هویتی خریدار است.',
    items: fallbackItems,
    orderTotals: {
        shipping: 12,
        tax: 18,
    },
    initialLayout: [
        'logo',
        'orderMeta',
        'buyer',
        'sender',
        'receiver',
        'items',
        'summary',
    ],
    initialThemeId: themes[0].id,
    defaultAccent: themes[0].accent,
    initialTemplateId: templates[0].id,
    locale: 'fa-IR',
    currencyLabel: 'دلار',
    enableDrag: true,
};

export default defaultConfig;