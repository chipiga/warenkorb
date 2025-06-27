'use strict';

// Import necessary components
import { catalogIndex } from './components/catalog/index.js';
import { cartIndex } from './components/cart/index.js';
import { cartSummary } from './components/cart/summary.js';
// elements is not directly used here as targetElement is passed.

export const render = {
    catalog(targetElement, payload) {
        if (!targetElement) {
            console.error('render.catalog: targetElement must be provided.');
            return;
        }
        targetElement.innerHTML = ''; // Clear previous content
        // catalogIndex is now imported
        catalogIndex.renderProducts(targetElement, payload);
    },
    cart(targetElement) {
        if (!targetElement) {
            console.error('render.cart: targetElement must be provided.');
            return;
        }
        targetElement.innerHTML = ''; // Clear previous content
        // cartIndex is now imported
        // cartIndex.render itself should handle the "No data" case if cart is empty
        cartIndex.render(targetElement);
    },
    summary(targetElement) {
        if (!targetElement) {
            console.error('render.summary: targetElement must be provided.');
            return;
        }
        targetElement.innerHTML = ''; // Clear previous content
        // cartSummary is now imported
        cartSummary.render(targetElement);
    },
};
