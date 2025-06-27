'use strict';

// eslint-disable-next-line no-redeclare, no-unused-vars
const utils = {
    loadJSON(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 400) {
                callback(JSON.parse(xhr.response));
            } else {
                console.warn(`${xhr.responseURL} konnte nicht geladen werden: ${xhr.statusText}!`);
            }
        });
        xhr.send();
    },
    numberCurrency(value) {
        return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
        // if (typeof value !== 'number') {
        //     console.warn('utils.numberCurrency: value is not a number!');
        //     return '';
        // }
        // return new Intl.NumberFormat('de-DE', {
        //     style: 'currency',
        //     currency: 'EUR',
        //     minimumFractionDigits: 2,
        //     maximumFractionDigits: 2
        // }).format(value);
    },
    createDOM(content = false, type = 'div', parent = false, className = false) {
        const el = document.createElement(type);
        if (content) {el.innerHTML = content;}
        if (className) {el.className = className;}
        if (parent) {parent.append(el);}

        return el;
    },
};
