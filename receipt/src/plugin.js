import React from 'react';
import { createRoot } from 'react-dom/client';
import ReceiptPlugin from './ReceiptPlugin';
import { defaultConfig } from './config';
import './App.css';

const roots = new WeakMap();

const mergeConfig = (userConfig = {}) => ({
    ...defaultConfig,
    ...userConfig,
    charges: userConfig.charges?.length ? userConfig.charges : defaultConfig.charges,
});

export function mountReceipt(target, config = {}) {
    if (!target) {
        throw new Error('A target DOM element is required to mount the receipt plugin.');
    }

    const merged = mergeConfig(config);
    let root = roots.get(target);

    if (!root) {
        root = createRoot(target);
        roots.set(target, root);
    }

    root.render(<ReceiptPlugin {...merged} />);
    return () => unmountReceipt(target);
}

export function unmountReceipt(target) {
    const root = roots.get(target);
    if (root) {
        root.unmount();
        roots.delete(target);
    }
}

export { defaultConfig };
export default ReceiptPlugin;