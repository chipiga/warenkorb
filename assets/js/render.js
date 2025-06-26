'use strict';

const render = {
    catalog(payload) {
        elements.catalogData.innerHTML = '';
        catalogIndex.renderProducts(elements.catalogData, payload);
    },
    cart() {
        elements.cartData.innerHTML = '';
        cartIndex.render(elements.cartData);
    },
    summary() {
        elements.cartSummary.innerHTML = '';
        cartSummary.render(elements.cartSummary);
    },
}