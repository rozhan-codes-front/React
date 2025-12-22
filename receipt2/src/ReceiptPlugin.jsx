import React, { useEffect, useMemo, useState } from 'react';
import themes from './Themes';
import templates from './Templates';
import { defaultConfig, fallbackItems } from './config';

const toRgba = (color) => {
    if (!color) return [0, 0, 0, 1];

    if (color === 'transparent') {
        return [0, 0, 0, 0];
    }

    const hexMatch = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hexMatch) {
        const hex = hexMatch[1];
        const expanded = hex.length === 3
            ? hex.split('').map((ch) => ch + ch).join('')
            : hex;
        const intVal = parseInt(expanded, 16);
        return [
            (intVal >> 16) & 255,
            (intVal >> 8) & 255,
            intVal & 255,
            1,
        ];
    }

    const rgbaMatch = color.match(
        /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0|0?\.\d+|1(?:\.0)?))?\s*\)$/i
    );

    if (rgbaMatch) {
        return [
            Number(rgbaMatch[1]),
            Number(rgbaMatch[2]),
            Number(rgbaMatch[3]),
            rgbaMatch[4] === undefined ? 1 : Number(rgbaMatch[4]),
        ];
    }

    return [0, 0, 0, 1];
};

const mixColors = (a, b, weightA = 50) => {
    const [rA, gA, bA, aA] = toRgba(a);
    const [rB, gB, bB, aB] = toRgba(b);

    const ratioA = Math.max(0, Math.min(100, weightA)) / 100;
    const ratioB = 1 - ratioA;

    const r = Math.round(rA * ratioA + rB * ratioB);
    const g = Math.round(gA * ratioA + gB * ratioB);
    const bVal = Math.round(bA * ratioA + bB * ratioB);
    const alpha = Math.round((aA * ratioA + aB * ratioB) * 100) / 100;

    return `rgba(${r}, ${g}, ${bVal}, ${alpha})`;
};

const relativeLuminance = (color) => {
    const [r, g, b] = toRgba(color);
    const channel = (value) => {
        const c = value / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };

    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

const pickContrastColor = (background, { light = '#fdfdfd', dark = '#0b1021', threshold = 0.62 } = {}) =>
    relativeLuminance(background) > threshold ? dark : light;

const sectionTitles = {
    logo: 'لوگو فروشنده',
    orderMeta: 'جزئیات سفارش',
    buyer: 'اطلاعات خریدار',
    sender: 'فرستنده',
    // receiver: 'گیرنده',
    items: 'محصولات خریداری‌شده',
    summary: 'یادداشت / توضیحات',
};

const ReceiptPlugin = ({
                           companyName,
                           invoiceNumber,
                           orderNumber,
                           orderDate,
                           paymentMethod,
                           shippingMethod,
                           buyer = {},
                           sender = {},
                           // receiver = {},
                           items = fallbackItems,
                           orderTotals = {},
                           summaryNote = '',
                           initialLayout = defaultConfig.initialLayout,
                           initialThemeId = defaultConfig.initialThemeId,
                           defaultAccent = defaultConfig.defaultAccent,
                           initialTemplateId = defaultConfig.initialTemplateId,
                           locale = defaultConfig.locale,
                           currencyLabel = defaultConfig.currencyLabel,
                           enableDrag = defaultConfig.enableDrag,
                       }) => {
    const [products, setProducts] = useState(items);
    const [sectionOrder, setSectionOrder] = useState(initialLayout);
    const [themeId, setThemeId] = useState(initialThemeId);
    const [customAccent, setCustomAccent] = useState(defaultAccent);
    const [templateId, setTemplateId] = useState(initialTemplateId);
    const [dragIndex, setDragIndex] = useState(null);
    const [sectionDragIndex, setSectionDragIndex] = useState(null);

    useEffect(() => {
        setProducts(items);
    }, [items]);

    useEffect(() => {
        setSectionOrder(initialLayout || defaultConfig.initialLayout);
    }, [initialLayout]);

    const lineTotal = (item) => {
        const qty = Number(item.quantity || 0);
        const unit = Number(item.unitPrice || 0);
        const discount = Number(item.discount || 0);
        return Math.max(0, qty * unit - discount);
    };

    const totals = useMemo(() => {
        const itemsTotal = products.reduce((sum, line) => sum + lineTotal(line), 0);
        const shipping = Number(orderTotals.shipping || 0);
        const tax = Number(orderTotals.tax || 0);
        return {
            itemsTotal,
            shipping,
            tax,
            grand: itemsTotal + shipping + tax,
        };
    }, [products, orderTotals]);

    const activeTheme = useMemo(
        () => themes.find((theme) => theme.id === themeId) ?? themes[0],
        [themeId]
    );

    useEffect(() => {
        document.documentElement.lang = 'fa';
        document.documentElement.dir = 'rtl';
    }, []);

    useEffect(() => {
        if (activeTheme?.accent) {
            setCustomAccent(activeTheme.accent);
        }
    }, [themeId, activeTheme]);

    useEffect(() => {
        const accent = customAccent || activeTheme.accent;
        const textStrong = activeTheme.id === 'midnight' ? '#f4f6fb' : activeTheme.primary;
        const textMuted = activeTheme.id === 'midnight' ? '#c5d1e1' : '#5c6b80';
        const headerTone = pickContrastColor(mixColors(activeTheme.primary, accent, 58));

        document.documentElement.style.setProperty('--primary', activeTheme.primary);
        document.documentElement.style.setProperty('--accent', accent);
        document.documentElement.style.setProperty('--surface', activeTheme.surface);
        document.documentElement.style.setProperty('--background', activeTheme.background);
        document.documentElement.style.setProperty('--soft', activeTheme.soft);
        document.documentElement.style.setProperty('--text-strong', textStrong);
        document.documentElement.style.setProperty('--text-muted', textMuted);

        const headerGradient = `linear-gradient(135deg, ${mixColors(
            activeTheme.primary,
            accent,
            70
        )}, ${mixColors(accent, activeTheme.primary, 32)})`;

        document.documentElement.style.setProperty('--header-bg', headerGradient);
        document.documentElement.style.setProperty('--header-text', headerTone);
        document.documentElement.style.setProperty('--body-text', mixColors(textStrong, accent, 85));
        document.documentElement.style.setProperty('--row-even', mixColors(activeTheme.soft || '#f4f9ff', accent, 82));
        document.documentElement.style.setProperty('--row-odd', mixColors(activeTheme.surface || '#ffffff', accent, 90));
        document.documentElement.style.setProperty('--total-border', mixColors(accent, 'transparent', 55));
        document.documentElement.style.setProperty('--meta-chip-bg', mixColors(activeTheme.soft || '#f4f9ff', accent, 78));
        document.documentElement.style.setProperty('--meta-chip-border', mixColors(accent, 'transparent', 18));
    }, [activeTheme, customAccent]);

    const handlePrint = () => window.print();
    const handleDownload = () => window.print();

    const handleRowDragStart = (index) => enableDrag && setDragIndex(index);
    const handleRowDrop = (index) => {
        if (!enableDrag || dragIndex === null || dragIndex === index) return;

        const updated = [...products];
        const [moved] = updated.splice(dragIndex, 1);
        updated.splice(index, 0, moved);

        setProducts(updated);
        setDragIndex(null);
    };

    const handleRowDragOver = (event) => enableDrag && event.preventDefault();

    const handleSectionDragStart = (index) => enableDrag && setSectionDragIndex(index);
    const handleSectionDrop = (index) => {
        if (!enableDrag || sectionDragIndex === null || sectionDragIndex === index) return;

        const updated = [...sectionOrder];
        const [moved] = updated.splice(sectionDragIndex, 1);
        updated.splice(index, 0, moved);

        setSectionOrder(updated);
        setSectionDragIndex(null);
    };

    const handleSectionDragOver = (event) => enableDrag && event.preventDefault();

    const formatCurrency = (value) =>
        `${Number(value || 0).toLocaleString(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })} ${currencyLabel}`;

    const renderMetaLine = (label, value) => (
        <div className="meta-line">
            <span>{label}</span>
            <strong>{value || '—'}</strong>
        </div>
    );

    const renderSectionContent = (sectionId) => {
        switch (sectionId) {
            case 'logo': {
                const hasLogo = Boolean(buyer?.logoUrl);
                return (
                    <div className="logo-stack">
                        <a href="#" className="logo-box" aria-label="لوگوی خریدار">
                            {hasLogo ? (
                                <img src={buyer.logoUrl} alt="لوگوی خریدار" />
                            ) : (
                                <div className="logo-empty" role="presentation">
                                    <span>لوگو افزوده نشده</span>
                                    <small>در تنظیمات، آدرس تصویر لوگو را وارد کنید</small>
                                </div>
                            )}
                        </a>
                        {/*<div className="logo-text">*/}
                        {/*    <strong>{buyer?.name || 'نام خریدار'}</strong>*/}
                        {/*    <span>{buyer?.email || buyer?.phone || 'اطلاعات تماس'}</span>*/}
                        {/*</div>*/}
                    </div>
                );
            }
            case 'orderMeta':
                return (
                    <div className="meta-grid">
                        {renderMetaLine('شماره سفارش', orderNumber)}
                        {renderMetaLine('شماره فاکتور', invoiceNumber)}
                        {renderMetaLine('تاریخ سفارش', orderDate)}
                        {renderMetaLine('روش پرداخت', paymentMethod)}
                        {renderMetaLine('روش ارسال', shippingMethod)}
                        {/*{renderMetaLine('جمع محصولات', formatCurrency(totals.itemsTotal))}*/}
                        {/*{renderMetaLine('هزینه ارسال', formatCurrency(totals.shipping))}*/}
                        {/*{renderMetaLine('مالیات', formatCurrency(totals.tax))}*/}
                        {/*{renderMetaLine('مبلغ نهایی', formatCurrency(totals.grand))}*/}
                    </div>
                );
            case 'buyer':
                return (
                    <div className="info-block">
                        <p><strong>نام:</strong> {buyer?.name || '—'}</p>
                        <p><strong>کد ملی:</strong> {buyer?.nationalId || '—'}</p>
                        <p><strong>شماره تماس:</strong> {buyer?.phone || '—'}</p>
                        <p><strong>ایمیل:</strong> {buyer?.email || '—'}</p>
                        <p className="address-line"><strong>آدرس:</strong> {buyer?.address || '—'}</p>
                    </div>
                );
            case 'sender':
                return (
                    <div className="info-block">
                        <p><strong>نام فرستنده:</strong> {sender?.name || '—'}</p>
                        <p><strong>تلفن:</strong> {sender?.phone || '—'}</p>
                        <p className="address-line"><strong>آدرس:</strong> {sender?.address || '—'}</p>
                    </div>
                );
            // case 'receiver':
            //     return (
            //         <div className="info-block">
            //             <p><strong>نام گیرنده:</strong> {receiver?.name || '—'}</p>
            //             <p><strong>تلفن:</strong> {receiver?.phone || '—'}</p>
            //             <p className="address-line"><strong>آدرس:</strong> {receiver?.address || '—'}</p>
            //         </div>
            //     );
            case 'items':
                return (
                    <div className="table-wrapper">
                        <table aria-label="محصولات سفارش">
                            <thead>
                            <tr>
                                <th>محصول</th>
                                <th>جزئیات</th>
                                <th>تعداد</th>
                                <th>قیمت واحد</th>
                                <th>تخفیف</th>
                                <th>جمع</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((item, index) => (
                                <tr
                                    key={`${item.id}-${index}`}
                                    draggable={enableDrag}
                                    onDragStart={() => handleRowDragStart(index)}
                                    onDragOver={handleRowDragOver}
                                    onDrop={() => handleRowDrop(index)}
                                    className={dragIndex === index ? 'dragging' : ''}
                                >
                                    <td>
                                        <div className="product-name">{item.name}</div>
                                        <div className="muted">{item.sku}</div>
                                    </td>
                                    <td>
                                        <div className="muted">{item.variant}</div>
                                        <div className="meta-tags">
                                            {(item.meta || []).map((meta) => (
                                                <span key={`${item.id}-${meta.label}`} className="chip">
                            {meta.label}: {meta.value}
                          </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="qty">{item.quantity}</td>
                                    <td className="num">{formatCurrency(item.unitPrice)}</td>
                                    <td className="num">{formatCurrency(item.discount || 0)}</td>
                                    <td className="num strong">{formatCurrency(lineTotal(item))}</td>
                                </tr>
                            ))}
                            <tr className="totals-row">
                                <td colSpan={5}>جمع محصولات</td>
                                <td className="num">{formatCurrency(totals.itemsTotal)}</td>
                            </tr>
                            <tr className="totals-row">
                                <td colSpan={5}>هزینه ارسال</td>
                                <td className="num">{formatCurrency(totals.shipping)}</td>
                            </tr>
                            <tr className="totals-row">
                                <td colSpan={5}>مالیات</td>
                                <td className="num">{formatCurrency(totals.tax)}</td>
                            </tr>
                            <tr className="totals-row grand">
                                <td colSpan={5}>مبلغ نهایی</td>
                                <td className="num strong">{formatCurrency(totals.grand)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                );
            case 'summary':
                return (
                    <p className="summary">{summaryNote || '—'}</p>
                );
            default:
                return null;
        }
    };

    return (
        <main className="page">
            <section className="controls" aria-label="گزینه‌های شخصی‌سازی">
                <div className="control">
                    <label htmlFor="template">طرح رسید</label>
                    <select
                        id="template"
                        value={templateId}
                        onChange={(event) => setTemplateId(event.target.value)}
                    >
                        {templates.map((template) => (
                            <option key={template.id} value={template.id}>
                                {template.name}
                            </option>
                        ))}
                    </select>
                    <small className="control-hint">
                        {templates.find((tpl) => tpl.id === templateId)?.description}
                    </small>
                </div>

                <div className="control">
                    <label htmlFor="theme">رنگ‌بندی</label>
                    <select
                        id="theme"
                        value={themeId}
                        onChange={(event) => setThemeId(event.target.value)}
                    >
                        {themes.map((theme) => (
                            <option key={theme.id} value={theme.id}>
                                {theme.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="control">
                    <label htmlFor="accent">رنگ تأکید</label>
                    <input
                        id="accent"
                        type="color"
                        value={customAccent}
                        onChange={(event) => setCustomAccent(event.target.value)}
                        aria-label="انتخاب رنگ تأکیدی رسید"
                    />
                </div>
            </section>

            <section className={`receipt-card template-${templateId}`}>
                <header>
                    <h1 className="company-name">{companyName}</h1>
                    <div className="meta" aria-label="اطلاعات فاکتور">
                        <span>شماره فاکتور: {invoiceNumber}</span>
                        <span>شماره سفارش: {orderNumber}</span>
                        <span>تاریخ: {orderDate}</span>
                        <span>مبلغ نهایی: {formatCurrency(totals.grand)}</span>
                    </div>
                </header>

                <div className="receipt-body" aria-label="چیدمان یکپارچه رسید">
                    <div className="layout-grid">
                        {sectionOrder.map((sectionId, index) => {
                            const wide = sectionId === 'items' || sectionId === 'summary';
                            return (
                                <article
                                    key={sectionId}
                                    className={`panel panel-${sectionId} ${wide ? 'panel-wide' : ''} ${
                                        sectionDragIndex === index ? 'dragging' : ''
                                    }`}
                                    draggable={enableDrag}
                                    onDragStart={() => handleSectionDragStart(index)}
                                    onDragOver={handleSectionDragOver}
                                    onDrop={() => handleSectionDrop(index)}
                                    aria-label={`بخش ${sectionTitles[sectionId]}`}
                                >
                                    <div className="panel-head">
                                        <span className="panel-title">{sectionTitles[sectionId]}</span>
                                        {enableDrag && <span className="drag-hint" aria-hidden>⠿</span>}
                                    </div>
                                    {renderSectionContent(sectionId)}
                                </article>
                            );
                        })}
                    </div>
                </div>

                <div className="actions">
                    <button type="button" className="download" onClick={handleDownload}>
                        دانلود PDF
                    </button>
                    <button type="button" className="print" onClick={handlePrint}>
                        چاپ رسید
                    </button>
                </div>
            </section>
        </main>
    );
};

export default ReceiptPlugin;