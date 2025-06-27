'use strict';

import { cartData } from './data.js';
import { catalogData } from '../catalog/data.js';
import { createDOM, numberCurrency } from '../utils.js';
import { render } from '../../render.js'; // main render.js
import { elements } from '../../dom.js';   // main dom.js

export const cartIndex = {
    render(targetElement) { // parent renamed to targetElement
        if (!targetElement) {
            console.error("cartIndex.render: targetElement must be provided.");
            return;
        }
        // Clearing is done by render.cart before calling this.
        // targetElement.innerHTML = '';

        if (cartData.data.length === 0) {
            // If cart is empty, a "No data" message could be shown by render.cart
            // or here, if this component is solely responsible for its content.
            // For now, render.cart handles clearing, and if no items, it remains empty.
            // The "No data" HTML is in index.html as a placeholder.
            // To make it reappear, render.cart would need to add it when cartData is empty.
            // Let's assume render.cart (from main render.js) handles this.
            return;
        }

        cartData.data.forEach((item) => {
            const product = catalogData.findById(item.id);
            if (!product) {
                return;
            }
            const el = createDOM(
                `
                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0" data-product-id="${product.id}">
                    <a href="#" class="shrink-0 md:order-1">
                        <img class="h-20 w-20" src="${product.image}" alt="${product.name}" />
                    </a>

                    <label for="counter-input-${product.id}" class="sr-only">Choose quantity:</label>
                    <div class="flex items-center justify-between md:order-3 md:justify-end">
                        <div class="flex items-center">
                            <button type="button" data-action="decrement"
                                class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                </svg>
                            </button>
                            <input type="text" id="counter-input-${product.id}"
                                class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                value="${item.quantity}" required readonly />
                            <button type="button" data-action="increment"
                                class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                        </div>
                        <div class="text-end md:order-4 md:w-32">
                            <p class="text-base font-bold text-gray-900 dark:text-white">${numberCurrency(product.price * item.quantity)}</p>
                        </div>
                    </div>

                    <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a href="#" class="text-base font-medium text-gray-900 hover:underline dark:text-white">
                            ${product.name}
                        </a>
                        <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                            ${product.description}
                        </p>

                        <div class="flex items-center gap-4">
                            <button type="button" data-action="remove"
                                class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                <svg class="me-1.5 h-5 w-5" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2"
                                        d="M6 18 17.94 6M18 18 6.06 6" />
                                </svg>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            `,
                'div',
                targetElement,
                'rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6'
            );
            // Bind 'this' to ensure correct context in event handlers
            el.querySelector('button[data-action="remove"]').addEventListener('click', (e) => this.handleRemove(e));
            el.querySelector('button[data-action="increment"]').addEventListener('click', (e) => this.handleQuantityChange(e));
            el.querySelector('button[data-action="decrement"]').addEventListener('click', (e) => this.handleQuantityChange(e));
        });
    },
    handleRemove(e) {
        e.preventDefault();
        const productId = this.getProductId(e.target); // Use this.getProductId
        cartData.delete(productId);

        // Instead of directly removing, re-render the cart and summary
        // elements.cart.data and elements.cart.summary are the targets
        if (elements.cart && elements.cart.data) {
            render.cart(elements.cart.data);
        }
        if (elements.cart && elements.cart.summary) {
            render.summary(elements.cart.summary);
        }
    },
    handleQuantityChange(e) {
        e.preventDefault();
        const action = e.currentTarget.dataset.action;
        const productRow = e.currentTarget.closest('[data-product-id]');
        const input = productRow.querySelector('input[id^="counter-input-"]');
        let value = parseInt(input.value);

        if (action === 'increment') {
            value++;
        } else if (action === 'decrement') {
            if (value > 1) {
                value--;
            } else {
                // Optionally, remove item if quantity goes to 0, or just prevent going below 1
                return; // Do nothing if trying to decrement below 1
            }
        }

        const productId = this.getProductId(e.currentTarget); // Use this.getProductId
        cartData.update(productId, value);

        // Update the specific input field and item total directly for responsiveness
        input.value = value;
        const product = catalogData.findById(productId);
        if (product) {
            const priceElement = productRow.querySelector('.md\\:order-4 .dark\\:text-white');
            if (priceElement) {
                priceElement.textContent = numberCurrency(product.price * value);
            }
        }

        // Update the overall cart summary
        if (elements.cart && elements.cart.summary) {
            render.summary(elements.cart.summary);
        }
    },
    getProductId(el) {
        return parseInt(el.closest('[data-product-id]').getAttribute('data-product-id'));
    },
};
