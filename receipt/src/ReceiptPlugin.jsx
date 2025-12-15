import React, { useEffect, useMemo, useState } from 'react';
import themes from './Themes';
import { defaultConfig, fallbackCharges } from './config';

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

const ReceiptPlugin = ({
                           companyName,
                           invoiceNumber,
                           date,
                           paymentMethod,
                           charges = fallbackCharges,
                           initialThemeId = defaultConfig.initialThemeId,
                           defaultAccent = defaultConfig.defaultAccent,
                           locale = defaultConfig.locale,
                           currencyLabel = defaultConfig.currencyLabel,
                           enableDrag = defaultConfig.enableDrag,
                       }) => {
    const [rows, setRows] = useState(charges);
    const [themeId, setThemeId] = useState(initialThemeId);
    const [customAccent, setCustomAccent] = useState(defaultAccent);
    const [dragIndex, setDragIndex] = useState(null);

    useEffect(() => {
        setRows(charges);
    }, [charges]);

    const total = useMemo(
        () => rows.reduce((sum, line) => sum + Number(line.amount || 0), 0),
        [rows]
    );

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

    const handleDragStart = (index) => enableDrag && setDragIndex(index);

    const handleDrop = (index) => {
        if (!enableDrag || dragIndex === null || dragIndex === index) return;

        const updated = [...rows];
        const [moved] = updated.splice(dragIndex, 1);
        updated.splice(index, 0, moved);

        setRows(updated);
        setDragIndex(null);
    };

    const handleDragOver = (event) => enableDrag && event.preventDefault();

    const formatCurrency = (value) =>
        `${Number(value || 0).toLocaleString(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })} ${currencyLabel}`;

    return (
        <main className="page">
            <section className="controls" aria-label="گزینه‌های شخصی‌سازی">
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
                    <label htmlFor="accent">رنگ تم</label>
                    <input
                        id="accent"
                        type="color"
                        value={customAccent}
                        onChange={(event) => setCustomAccent(event.target.value)}
                        aria-label="انتخاب رنگ تم رسید"
                    />
                </div>
            </section>

            <section className="receipt-card">
                <header>
                    <h1 className="company-name">{companyName}</h1>
                    <div className="meta" aria-label="اطلاعات فاکتور">
                        <span>شماره فاکتور: {invoiceNumber}</span>
                        <span>تاریخ: {date}</span>
                        <span>مبلغ پرداختی: {formatCurrency(total)}</span>
                        <span>روش پرداخت: {paymentMethod}</span>
                    </div>
                </header>

                <table aria-label="ریز هزینه‌ها">
                    <thead>
                    <tr>
                        <th>شرح هزینه</th>
                        <th style={{ textAlign: 'right' }}>مبلغ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map(({ item, amount }, index) => (
                        <tr
                            key={`${item}-${index}`}
                            draggable={enableDrag}
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(index)}
                            className={dragIndex === index ? 'dragging' : ''}
                        >
                            <td>{item}</td>
                            <td style={{ textAlign: 'right' }}>{formatCurrency(amount)}</td>
                        </tr>
                    ))}
                    <tr className="totals-row">
                        <td>جمع کل</td>
                        <td style={{ textAlign: 'right' }}>{formatCurrency(total)}</td>
                    </tr>
                    </tbody>
                </table>

                <p className="summary">
                    از پرداخت شما سپاسگزاریم. این رسید تأیید می‌کند که تراکنش شما انجام شده و
                    جزئیات هزینه‌ها از جمله کارمزد پردازش و اجاره تجهیزات را نمایش می‌دهد.
                    در صورت نیاز می‌توانید ترتیب خطوط را با کشیدن و رها کردن تغییر دهید.
                </p>

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