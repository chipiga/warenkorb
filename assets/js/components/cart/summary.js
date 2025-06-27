'use strict';

import { cartData } from './data.js'; // cart/data.js
import { catalogData } from '../catalog/data.js'; // catalog/data.js
import { createDOM, numberCurrency } from '../utils.js'; // components/utils.js

export const cartSummary = {
    render(targetElement) { // Changed parent to targetElement to match render.js style
        if (!targetElement) {
            console.error('cartSummary.render: targetElement must be provided.');
            return;
        }
        targetElement.innerHTML = ''; // Clear existing summary

        const summary = {
            cost: 0,
            delivery: 0,
            tax: 0,
            total: 0,
        };

        cartData.data.forEach((item) => {
            const product = catalogData.findById(item.id);
            if (!product) {
                return;
            } // Produkt nicht gefunden, überspringen
            summary.cost += product.price * item.quantity;
            // Ensure product.weight is a number, default to 0 if not
            const weight = typeof product.weight === 'number' ? product.weight : 0;
            summary.delivery += weight * item.quantity * 7; // 7 Euro pro kg

        });

        // Tax calculation should be on the cost after iterating all items
        summary.tax = summary.cost * 0.19; // 19% Steuern
        summary.total = summary.cost + summary.delivery + summary.tax;


        createDOM( // Use imported createDOM
            `
            <div class="space-y-2">
                <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Cost</dt>
                    <dd class="text-base font-medium text-gray-900 dark:text-white">${numberCurrency(summary.cost)}</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Delivery</dt>
                    <dd class="text-base font-medium text-gray-900 dark:text-white">${numberCurrency(summary.delivery)}</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                    <dd class="text-base font-medium text-gray-900 dark:text-white">${numberCurrency(summary.tax)}</dd>
                </dl>
            </div>
            <dl
                class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                <dd class="text-base font-bold text-gray-900 dark:text-white">${numberCurrency(summary.total)}</dd>
            </dl>
        `,
            'div', // type, assuming createDOM default is div, but explicit is fine
            targetElement // parent renamed to targetElement
            // className is not needed as the content itself is a full structure.
        );
    },
};
