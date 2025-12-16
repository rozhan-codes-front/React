import React from 'react';
import ReceiptPlugin from './ReceiptPlugin';
import {defaultConfig} from './config';

const App = () => (
    <>
        <ReceiptPlugin
            companyName={defaultConfig.companyName}
            invoiceNumber={defaultConfig.invoiceNumber}
            date={defaultConfig.date}
            paymentMethod={defaultConfig.paymentMethod}
            charges={defaultConfig.charges}
            initialThemeId={defaultConfig.initialThemeId}
            defaultAccent={defaultConfig.defaultAccent}
            initialTemplateId={defaultConfig.initialTemplateId}
            locale={defaultConfig.locale}
            currencyLabel={defaultConfig.currencyLabel}
            enableDrag
        />
    </>

);

export default App;