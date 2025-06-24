'use strict';

const render = {
    catalog(payload) {
        elements.catalogData.innerHTML = '';
        catalogIndex(elements.catalogData, payload);
    },
    cart() {
        elements.cartData.innerHTML = '';
        cartIndex(elements.cartData);
    },
    summary() {
        elements.cartSummary.innerHTML = '';
        cartSummary(elements.cartSummary);
    },
}