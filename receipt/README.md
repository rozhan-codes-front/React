# DMMarket

## Using custom fonts

1. Place your font files (e.g., `CustomFont-Regular.woff2` and `CustomFont-Regular.woff`) in `public/fonts/`.
2. Update the `@font-face` rule in `src/App.css` if your file names or weights differ.
3. Keep `'CustomFont'` (or your chosen name) first in the `font-family` stack in `src/App.css` so the receipt uses it by default.

Notes:
- Use `/fonts/...` (no `../public`) because Vite serves assets from the `public` folder at the site root.
- Ensure every URL is wrapped in matching quotes to avoid PostCSS "unclosed string" errors.
- If you prefer a hosted font (such as Google Fonts), add its `<link>` tag to `index.html` and reference its family name in the same `font-family` declaration.

## Interactive receipt controls
- از منوی «رنگ‌بندی» می‌توانید سه تم پیش‌فرض (دریایی، شبانه، طلوع) را انتخاب کنید؛ رنگ تأکیدی را هم از طریق انتخاب‌گر رنگ تغییر دهید.
- ردیف‌های جدول قابل کشیدن و رها کردن هستند تا ترتیب نمایش هزینه‌ها را خودتان تعیین کنید.

## استفاده به‌عنوان پلاگین
برای کم کردن کار سمت بک‌اند، می‌توانید ماژول را مثل یک پلاگین جاوااسکریپتی در هر صفحه‌ای سوار کنید. همه پردازش‌ها (محاسبه جمع، رنگ‌بندی، راست‌به‌چپ، انتخاب تم و فونت) در خود پلاگین انجام می‌شود و تنها ورودی لازم یک آبجکت پیکربندی ساده است.

### نحوه سوار کردن
1. در صفحه مقصد یک المان ظرف بسازید:
   ```html
   <div id="receipt"></div>
   ```
2. ماژول را ایمپورت و سوار کنید:
   ```jsx
   import { mountReceipt } from './src/plugin';

   const teardown = mountReceipt(document.getElementById('receipt'), {
     companyName: 'استودیو سپهر',
     invoiceNumber: 'INV-2048',
     date: '۱۴۰۳/۰۷/۰۲',
     paymentMethod: 'کیف پول',
     currencyLabel: 'تومان',
     charges: [
       { item: 'آموزش', amount: 180 },
       { item: 'پشتیبانی', amount: 45.5 },
     ],
     // accent یا theme دلخواه اختیاری است
   });

   // اگر لازم شد:
   teardown(); // رسید را از روی DOM برمی‌دارد
   ```

### چرا کار بک‌اند ساده‌تر می‌شود؟
- اگر لیست هزینه‌ها خالی باشد، پلاگین خودش نمونه‌های پیش‌فرض را قرار می‌دهد.
- جمع کل، فرمت اعداد (بر اساس locale و برچسب واحد پول) و راست‌به‌چپ بودن در فرانت‌اند محاسبه می‌شود؛ بک‌اند فقط JSON هزینه‌ها را می‌دهد.
- تم‌ها و رنگ تأکیدی از سمت کاربر انتخاب می‌شوند و نیازی به ذخیره‌سازی یا محاسبه سمت سرور ندارند.
- API نصب/حذف (`mountReceipt`/`teardown`) ساده است و می‌توانید در هر فریم‌ورک یا حتی یک صفحه استاتیک استفاده کنید.

### مقادیر پیش‌فرض آماده
`defaultConfig` در `src/plugin.js` موجود است و شامل نام شرکت، شماره فاکتور، روش پرداخت، لیست نمونه و رنگ‌های پایه است؛ می‌توانید همین را ایمپورت کنید و تنها فیلدهایی که لازم دارید override کنید.