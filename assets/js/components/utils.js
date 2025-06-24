'use strict';

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
        })
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
    }
}