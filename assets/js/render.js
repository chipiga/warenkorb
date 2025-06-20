'use strict';

const render = {
    catalog(payload) {
        elements.catalog.innerHTML = '';
        catalogIndex(elements.catalog, payload);
    }
}