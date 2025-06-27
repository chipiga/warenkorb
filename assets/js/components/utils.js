'use strict';

// Individual functions will be linted based on their usage via imports.

export function loadJSON(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 400) {
            callback(JSON.parse(xhr.response));
        } else {
            // console.warn is fine, will be caught by linter if rule is active
            console.warn(`${xhr.responseURL} konnte nicht geladen werden: ${xhr.statusText}!`);
        }
    });
    xhr.send();
}

export function numberCurrency(value) {
    // The existing toLocaleString is concise and effective.
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}

export function createDOM(content = false, type = 'div', parent = false, className = false) {
    const el = document.createElement(type);
    if (content) {
        el.innerHTML = content;
    }
    if (className) {
        el.className = className;
    }
    if (parent) {
        parent.append(el);
    }
    return el;
}
